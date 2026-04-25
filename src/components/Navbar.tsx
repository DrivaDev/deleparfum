import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import Logo from './Logo';
import SearchModal from './SearchModal';

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Catálogo', path: '/catalogo' },
  { label: 'Envíos', path: '/envios' },
  { label: 'Devoluciones', path: '/politica-de-devoluciones' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 50);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-white border-b border-gray-100 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop layout */}
          <div className="hidden md:flex items-center justify-between h-20">
            <nav className="flex items-center gap-8 flex-1">
              {navLinks.slice(0, 2).map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-sans font-light text-xs tracking-widest uppercase transition-colors duration-200 ${
                    isTransparent
                      ? 'text-white/90 hover:text-gold'
                      : 'text-luxury-gray hover:text-luxury-black'
                  } ${location.pathname === link.path ? (isTransparent ? 'text-gold' : 'text-luxury-black') : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link to="/" className="flex-shrink-0 mx-4">
              <Logo variant={isTransparent ? 'light' : 'dark'} size="lg" />
            </Link>

            <div className="flex items-center gap-8 flex-1 justify-end">
              {navLinks.slice(2).map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-sans font-light text-xs tracking-widest uppercase transition-colors duration-200 ${
                    isTransparent
                      ? 'text-white/90 hover:text-gold'
                      : 'text-luxury-gray hover:text-luxury-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Buscar"
                className={`transition-colors duration-200 ${
                  isTransparent ? 'text-white/80 hover:text-gold' : 'text-luxury-gray hover:text-luxury-black'
                }`}
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={openCart}
                aria-label={`Carrito (${totalItems} items)`}
                className={`relative transition-colors duration-200 ${
                  isTransparent ? 'text-white/80 hover:text-gold' : 'text-luxury-gray hover:text-luxury-black'
                }`}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-luxury-black text-[10px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile layout — 3 columns: spacer | logo | icons */}
          <div className="flex md:hidden items-center h-16">
            {/* Left spacer — same width as right icons to keep logo truly centered */}
            <div className="flex-1" />

            {/* Logo — centered */}
            <Link to="/" className="flex-shrink-0">
              <Logo variant={isTransparent ? 'light' : 'dark'} size="md" compact />
            </Link>

            {/* Right icons */}
            <div className="flex-1 flex items-center justify-end gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Buscar"
                className={isTransparent ? 'text-white/80' : 'text-luxury-gray'}
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={openCart}
                aria-label="Carrito"
                className={`relative ${isTransparent ? 'text-white/80' : 'text-luxury-gray'}`}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-luxury-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menú"
                className={isTransparent ? 'text-white/80' : 'text-luxury-gray'}
              >
                {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up">
            <nav className="flex flex-col py-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-6 py-3 font-sans font-light text-xs tracking-widest uppercase text-luxury-gray hover:text-luxury-black hover:bg-cream transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      {/* Render CartSidebar via App-level store open state */}
    </>
  );
}
