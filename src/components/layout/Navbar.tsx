import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { 
    cartItemCount, 
    setIsCartOpen, 
    setIsSearchOpen 
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop Center navigation links
  const centerNavLinks = [
    { label: 'HOME', path: '/' },
    { label: 'SHOP', path: '/shop' },
    { label: 'COLLECTIONS', path: '/collections', isDropdown: true },
    { label: 'CUSTOM NAILS', path: '/#custom-studio' },
    { label: 'ABOUT', path: '/about' },
  ];

  const collectionDropdownItems = [
    { title: 'All Collections', path: '/collections', desc: 'Curated studio showcase' },
    { title: 'Normal Collection (₹249)', path: '/shop/normal', desc: '3 Packs × 24 Nails (72 Total)' },
    { title: 'Premium Collection (₹299)', path: '/shop/premium', desc: '1 Premium Pack (10 Nails)' },
    { title: 'New Arrivals', path: '/collections/new-arrivals', desc: 'Fresh salon drops' },
    { title: 'Bridal & Couture', path: '/collections/bridal', desc: 'Wedding & statement sets' },
    { title: 'Cat-Eye & Chrome', path: '/collections/chrome', desc: 'Reflective mirror finish' },
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    setIsCollectionsHovered(false);

    if (path.includes('#custom-studio')) {
      if (currentPath === '/' || currentPath === '' || currentPath === '/#custom-studio') {
        const el = document.getElementById('custom-studio');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById('custom-studio');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    onNavigate(path);
  };

  const isLinkActive = (path: string) => {
    if (path === '/') return currentPath === '/' || currentPath === '';
    if (path === '/shop') return currentPath === '/shop' || currentPath.startsWith('/shop/');
    if (path === '/collections') return currentPath.startsWith('/collections');
    if (path === '/about') return currentPath === '/about';
    return currentPath === path;
  };

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-white/10 shadow-lg shadow-black/40 py-2.5' 
          : 'bg-[#0B0B0B] border-white/10 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* LEFT: Brand Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 focus:outline-none group text-left"
              aria-label="QeQ STUDIO Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden p-0.5 bg-white border border-white/20 shadow-md group-hover:scale-105 transition-transform shrink-0">
                <img
                  src={getAssetUrl('/assets/logo/company-logo.jpeg')}
                  alt="QeQ STUDIO"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-editorial text-base sm:text-lg font-bold tracking-widest text-white group-hover:text-gray-300 transition-colors">
                  Q<span className="text-[#C8A96B]">e</span>Q <span className="font-light tracking-[0.2em] text-xs sm:text-sm text-gray-300">STUDIO</span>
                </span>
                <span className="text-[9px] tracking-[0.22em] uppercase text-gray-400 font-medium -mt-1 hidden sm:block">
                  Handmade Press-On Nails
                </span>
              </div>
            </button>
          </div>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {centerNavLinks.map(link => {
              const active = isLinkActive(link.path);

              if (link.isDropdown) {
                return (
                  <div 
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setIsCollectionsHovered(true)}
                    onMouseLeave={() => setIsCollectionsHovered(false)}
                  >
                    <button
                      onClick={() => handleNavClick('/collections')}
                      className={`text-xs font-semibold tracking-[0.16em] py-2 flex items-center gap-1.5 transition-colors ${
                        active ? 'text-white font-bold' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {isCollectionsHovered && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-[#151515] rounded-xl shadow-2xl p-2.5 border border-white/15 animate-fade-in z-50">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 px-3 py-1 border-b border-white/10 mb-1">
                          Curated Collections
                        </div>
                        {collectionDropdownItems.map(item => (
                          <button
                            key={item.title}
                            onClick={() => handleNavClick(item.path)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex flex-col group"
                          >
                            <span className="text-xs font-medium text-gray-200 group-hover:text-[#E2C98A] transition-colors">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-gray-400">
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
                  className={`relative text-xs font-semibold tracking-[0.16em] py-2 transition-colors ${
                    active ? 'text-white font-bold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8A96B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Search, Account, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Search Catalog"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <button
              onClick={() => handleNavClick('/account')}
              className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors hidden sm:flex items-center"
              aria-label="Customer Account & Orders"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Icon with Item Count */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors relative"
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] rounded-full bg-[#1A56DB] text-white text-[10px] font-bold flex items-center justify-center px-1 shadow-sm">
                  {cartItemCount}
                </span>
              )}
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

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-[#0B0B0B]/98 backdrop-blur-xl z-50 border-t border-white/10 overflow-y-auto p-5 animate-fade-in">
          <div className="flex flex-col gap-2 max-w-md mx-auto">
            
            <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 pb-2 border-b border-white/10">
              Menu
            </div>

            {centerNavLinks.map(link => {
              const active = isLinkActive(link.path);
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className={`w-full text-left text-sm font-semibold tracking-wider py-3 px-3.5 rounded-xl transition-colors ${
                    active ? 'bg-white/10 text-white font-bold border border-white/10' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 pt-4 pb-2 border-b border-white/10">
              Collections
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              <button
                onClick={() => handleNavClick('/shop/normal')}
                className="w-full text-left p-3 rounded-xl bg-white/5 text-xs text-gray-300 hover:text-white flex items-center justify-between"
              >
                <span>Normal Collection (72 Nails)</span>
                <span className="font-mono text-[#E2C98A] font-bold">₹249</span>
              </button>
              <button
                onClick={() => handleNavClick('/shop/premium')}
                className="w-full text-left p-3 rounded-xl bg-white/5 text-xs text-gray-300 hover:text-white flex items-center justify-between"
              >
                <span>Premium Collection (10 Nails)</span>
                <span className="font-mono text-[#E2C98A] font-bold">₹299</span>
              </button>
              <button
                onClick={() => handleNavClick('/try-the-look')}
                className="w-full text-left p-3 rounded-xl bg-white/5 text-xs text-gray-300 hover:text-white"
              >
                Try The Look (Virtual Fitting)
              </button>
            </div>

            <div className="border-t border-white/10 pt-4 mt-2 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('/account')}
                className="flex items-center gap-2.5 text-xs text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5"
              >
                <User className="w-4 h-4 text-[#C8A96B]" />
                <span>My Account & Orders</span>
              </button>
              <button
                onClick={() => handleNavClick('/contact')}
                className="text-left text-xs text-gray-400 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5"
              >
                Contact & Support
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
