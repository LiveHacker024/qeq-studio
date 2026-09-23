import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { 
    cartItemCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen 
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'SHOP', path: '/shop' },
    { label: 'COLLECTIONS', path: '/collections', isDropdown: true },
    { label: 'PREMIUM', path: '/shop/premium', badge: '₹299' },
    { label: 'CUSTOM NAILS', path: '/#custom-studio', badge: 'STUDIO' },
    { label: 'TRY THE LOOK', path: '/try-the-look' },
    { label: 'ABOUT', path: '/about' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const collectionItems = [
    { title: 'New Arrivals', path: '/collections/new-arrivals', desc: 'Latest salon drops' },
    { title: 'Normal Collection (₹249)', path: '/shop/normal', desc: 'Everyday elegance' },
    { title: 'Premium Collection (₹299)', path: '/shop/premium', desc: 'Handcrafted luxury' },
    { title: 'Bridal & Couture', path: '/collections/bridal', desc: 'Wedding & statement sets' },
    { title: 'Cat-Eye & Chrome', path: '/collections/chrome', desc: 'Reflective mirror finish' },
    { title: 'Minimal Elegance', path: '/collections/minimal', desc: 'Clean nude aesthetics' },
  ];

  const handleNavClick = (path: string) => {
    if (path.includes('#custom-studio')) {
      if (currentPath === '/' || currentPath === '' || currentPath === '/#custom-studio') {
        const el = document.getElementById('custom-studio');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setIsMobileMenuOpen(false);
          setIsCollectionsHovered(false);
          return;
        }
      }
      onNavigate('/');
      setIsMobileMenuOpen(false);
      setIsCollectionsHovered(false);
      setTimeout(() => {
        const el = document.getElementById('custom-studio');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    onNavigate(path);
    setIsMobileMenuOpen(false);
    setIsCollectionsHovered(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'glass-nav-scrolled py-3 bg-[#08080A]/90' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LEFT: Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('/')}
              className="group flex items-center gap-3 focus:outline-none"
              aria-label="QeQ STUDIO Home"
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden p-0.5 bg-white shadow-md group-hover:scale-105 transition-transform duration-300 border border-blue-500/40">
                <img
                  src="/assets/logo/company-logo.jpeg"
                  alt="QeQ STUDIO Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-editorial text-lg sm:text-xl font-bold tracking-widest text-white group-hover:text-blue-400 transition-colors">
                  Q<span className="text-blue-500">e</span>Q <span className="font-light tracking-[0.25em] text-xs sm:text-sm text-gray-300">STUDIO</span>
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-medium -mt-1 hidden sm:block">
                  Luxury Press-On Nails
                </span>
              </div>
            </button>
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = currentPath === link.path;

              if (link.isDropdown) {
                return (
                  <div 
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setIsCollectionsHovered(true)}
                    onMouseLeave={() => setIsCollectionsHovered(false)}
                  >
                    <button
                      onClick={() => handleNavClick('/shop')}
                      className={`text-xs font-semibold tracking-[0.18em] transition-all duration-200 flex items-center gap-1 py-2 ${
                        currentPath.startsWith('/collections') ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </button>

                    {/* Dropdown Menu */}
                    {isCollectionsHovered && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 glass-dark-elevated rounded-xl shadow-2xl p-3 border border-white/15 animate-fade-in z-50">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 px-3 py-1.5 border-b border-white/10 mb-1">
                          Curated Collections
                        </div>
                        {collectionItems.map(item => (
                          <button
                            key={item.title}
                            onClick={() => handleNavClick(item.path)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-all flex flex-col group/item"
                          >
                            <span className="text-xs font-semibold text-gray-200 group-hover/item:text-blue-400 transition-colors">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-gray-400 group-hover/item:text-gray-300">
                              {item.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className={`relative text-xs font-semibold tracking-[0.18em] transition-all duration-200 py-2 flex items-center gap-1.5 ${
                    isActive ? 'text-blue-400 font-bold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/40 font-bold tracking-wider">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-champagne-gold rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Quick Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-colors relative"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('/wishlist')}
              className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-colors relative group"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-blue-600/50">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Account / Admin */}
            <button
              onClick={() => handleNavClick('/account')}
              className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-colors hidden sm:flex items-center"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Admin shortcut badge */}
            <button
              onClick={() => handleNavClick('/admin')}
              className="hidden xl:flex items-center gap-1 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white border border-white/10 transition-colors"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span>ADMIN</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-1"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[68px] bg-[#08080A]/98 backdrop-blur-2xl z-50 border-t border-white/10 overflow-y-auto animate-fade-in p-6">
          <div className="flex flex-col gap-4">
            
            <div className="text-[10px] uppercase font-bold tracking-widest text-blue-400 border-b border-white/10 pb-2">
              Menu Navigation
            </div>

            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className={`text-left text-base font-semibold tracking-wider py-2.5 px-3 rounded-lg flex items-center justify-between ${
                  currentPath === link.path ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'text-gray-200 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600/40 text-blue-200 border border-blue-500/40 font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 border-b border-white/10 pb-2 pt-4">
              Explore Collections
            </div>

            <div className="grid grid-cols-2 gap-2">
              {collectionItems.map(item => (
                <button
                  key={item.title}
                  onClick={() => handleNavClick(item.path)}
                  className="p-3 text-left rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-gray-300 hover:text-white"
                >
                  <div className="font-semibold text-blue-300 text-xs mb-0.5">{item.title}</div>
                  <div className="text-[10px] text-gray-400">{item.desc}</div>
                </button>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 mt-2 flex items-center justify-between">
              <button
                onClick={() => handleNavClick('/account')}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white py-2"
              >
                <User className="w-4 h-4 text-blue-400" />
                <span>My Account & Orders</span>
              </button>

              <button
                onClick={() => handleNavClick('/admin')}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-300 py-2"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Admin Studio</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
