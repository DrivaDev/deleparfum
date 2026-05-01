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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-luxury-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop layout */}
          <div className="hidden md:flex items-center justify-between h-32">
            <nav className="flex items-center gap-8 flex-1">
              {navLinks.slice(0, 2).map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-sans font-light text-xs tracking-widest uppercase transition-colors duration-200 text-white/70 hover:text-white ${
                    location.pathname === link.path ? 'text-white' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link to="/" className="flex-shrink-0 mx-4">
              <Logo variant="light" size="xl" />
            </Link>

            <div className="flex items-center gap-8 flex-1 justify-end">
              {navLinks.slice(2).map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-sans font-light text-xs tracking-widest uppercase transition-colors duration-200 text-white/70 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Buscar"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={openCart}
                aria-label={`Carrito (${totalItems} items)`}
                className="relative text-white/70 hover:text-white transition-colors"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex md:hidden items-center h-20">
            <div className="flex-1" />

            <Link to="/" className="flex-shrink-0">
              <Logo variant="light" size="lg" compact />
            </Link>

            <div className="flex-1 flex items-center justify-end gap-4">
              <button onClick={() => setSearchOpen(true)} aria-label="Buscar" className="text-white/70">
                <Search size={18} strokeWidth={1.5} />
              </button>
              <button onClick={openCart} aria-label="Carrito" className="relative text-white/70">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menú" className="text-white/70">
                {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-luxury-charcoal border-t border-white/10 animate-slide-up">
            <nav className="flex flex-col py-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-6 py-3 font-sans font-light text-xs tracking-widest uppercase text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
