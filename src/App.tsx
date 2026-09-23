import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/search/SearchModal';
import { QuickViewModal } from './components/shop/QuickViewModal';
import { ToastContainer } from './components/common/ToastContainer';
import { SEOHead } from './components/common/SEOHead';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { TryTheLookStudio } from './components/try-look/TryTheLookStudio';
import { CollectionsHubPage } from './pages/CollectionsHubPage';
import { CheckoutForm } from './components/checkout/CheckoutForm';
import { OrderConfirmationView } from './components/order/OrderConfirmationView';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { ReturnPolicyPage } from './pages/ReturnPolicyPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Order } from './types';

const MainAppContent: React.FC = () => {
  const { isCartOpen, setIsCartOpen } = useStore();
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Sync with browser URL / hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      if (hash.includes('custom-studio') || hash === '/custom-nails' || hash === '/design-your-own') {
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById('custom-studio');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return;
      }
      setCurrentPath(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (hash.includes('custom-studio') || hash === '/custom-nails' || hash === '/design-your-own') {
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById('custom-studio');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 250);
      } else {
        setCurrentPath(hash);
      }
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    if (path.includes('custom-studio') || path === '/custom-nails' || path === '/design-your-own') {
      window.location.hash = '/#custom-studio';
      setCurrentPath('/');
      setTimeout(() => {
        const el = document.getElementById('custom-studio');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (slug: string) => {
    navigate(`/product/${slug}`);
  };

  const handleOrderSuccess = (order: Order) => {
    setLastPlacedOrder(order);
    navigate('/order-confirmation');
  };

  // Route Resolution
  const renderRoute = () => {
    // 1. Home & Custom Studio Route
    if (currentPath === '/' || currentPath === '' || currentPath === '/custom-nails' || currentPath === '/design-your-own') {
      return (
        <HomePage
          onNavigate={navigate}
          onProductClick={handleProductClick}
        />
      );
    }

    // 2. Shop Normal
    if (currentPath === '/shop/normal') {
      return (
        <ShopPage
          initialTier="normal"
          onProductClick={handleProductClick}
        />
      );
    }

    // 3. Shop Premium
    if (currentPath === '/shop/premium') {
      return (
        <ShopPage
          initialTier="premium"
          onProductClick={handleProductClick}
        />
      );
    }

    // 4. Shop All
    if (currentPath === '/shop') {
      return (
        <ShopPage
          initialTier="all"
          onProductClick={handleProductClick}
        />
      );
    }

    // 5. Product Detail Page: /product/:slug
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '');
      return (
        <ProductDetailPage
          slug={slug}
          onNavigateShop={() => navigate('/shop')}
          onNavigateCheckout={() => navigate('/checkout')}
          onProductClick={handleProductClick}
        />
      );
    }

    // 6. Collections Hub & Filtered Collections
    if (currentPath === '/collections') {
      return (
        <CollectionsHubPage
          onNavigateShop={(category, tier) => {
            if (tier) navigate(`/shop/${tier}`);
            else if (category) navigate(`/collections/${category.toLowerCase()}`);
            else navigate('/shop');
          }}
        />
      );
    }

    if (currentPath.startsWith('/collections/')) {
      const colSlug = currentPath.replace('/collections/', '');
      if (colSlug === 'new-arrivals') {
        return <ShopPage initialCategory="New Arrivals" onProductClick={handleProductClick} />;
      }
      if (colSlug === 'best-sellers') {
        return <ShopPage initialCategory="Luxury" onProductClick={handleProductClick} />;
      }
      return (
        <ShopPage
          initialCategory={colSlug.charAt(0).toUpperCase() + colSlug.slice(1)}
          onProductClick={handleProductClick}
        />
      );
    }

    // 7. Try The Look Virtual Studio
    if (currentPath === '/try-the-look') {
      return <TryTheLookStudio />;
    }

    // 8. Checkout Page
    if (currentPath === '/checkout') {
      return (
        <CheckoutForm
          onOrderSuccess={handleOrderSuccess}
          onBackToCart={() => setIsCartOpen(true)}
        />
      );
    }

    // 9. Order Confirmation
    if (currentPath === '/order-confirmation' && lastPlacedOrder) {
      return (
        <OrderConfirmationView
          order={lastPlacedOrder}
          onNavigateHome={() => navigate('/')}
          onNavigateShop={() => navigate('/shop')}
        />
      );
    }

    // 10. Account & Orders
    if (currentPath === '/account' || currentPath === '/wishlist') {
      return (
        <AccountPage
          onNavigateShop={() => navigate('/shop')}
          onProductClick={handleProductClick}
        />
      );
    }

    // 11. About
    if (currentPath === '/about') {
      return <AboutPage onNavigateShop={() => navigate('/shop')} />;
    }

    // 12. Contact
    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // 13. Privacy Policy
    if (currentPath === '/privacy-policy') {
      return <PrivacyPolicyPage />;
    }

    // 14. Terms and Conditions
    if (currentPath === '/terms' || currentPath === '/terms-and-conditions') {
      return <TermsPage />;
    }

    // 15. Shipping Policy
    if (currentPath === '/shipping-policy' || currentPath === '/shipping') {
      return <ShippingPolicyPage />;
    }

    // 16. Return & Refund Policy
    if (currentPath === '/return-policy' || currentPath === '/returns') {
      return <ReturnPolicyPage />;
    }

    // 17. Admin Dashboard
    if (currentPath === '/admin') {
      return <AdminDashboard onNavigateHome={() => navigate('/')} />;
    }

    // Fallback: Shop
    return <ShopPage onProductClick={handleProductClick} />;
  };

  const isAdminPage = currentPath === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-[#08080A] text-gray-100 selection:bg-blue-600 selection:text-white">
      <SEOHead />

      {/* Top Announcement Bar */}
      {!isAdminPage && (
        <AnnouncementBar onNavigateShop={() => navigate('/shop')} />
      )}

      {/* Main Glass Navigation */}
      {!isAdminPage && (
        <Navbar
          currentPath={currentPath}
          onNavigate={navigate}
        />
      )}

      {/* Main Content View */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Luxury Footer */}
      {!isAdminPage && (
        <Footer onNavigate={navigate} />
      )}

      {/* Global Slide-Over Cart Drawer */}
      <CartDrawer
        onNavigateCheckout={() => navigate('/checkout')}
        onNavigateShop={() => navigate('/shop')}
      />

      {/* Global Search Modal */}
      <SearchModal
        onSelectProduct={slug => navigate(`/product/${slug}`)}
      />

      {/* Global Quick View Modal */}
      <QuickViewModal
        onNavigateToProduct={slug => navigate(`/product/${slug}`)}
        onNavigateCheckout={() => navigate('/checkout')}
      />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}

export default App;
