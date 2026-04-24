import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import Logo from './Logo';

const footerLinks = {
  'La Boutique': [
    { label: 'Catálogo', path: '/catalogo' },
    { label: 'Novedades', path: '/catalogo?filter=new' },
    { label: 'Colecciones', path: '/catalogo?category=featured' },
    { label: 'Marcas', path: '/catalogo' },
  ],
  'Ayuda': [
    { label: 'Envíos', path: '#' },
    { label: 'Devoluciones', path: '#' },
    { label: 'Preguntas frecuentes', path: '#' },
    { label: 'Contacto', path: '#' },
  ],
  'ÉLIXIR': [
    { label: 'Nuestra historia', path: '#' },
    { label: 'Filosofía', path: '#' },
    { label: 'Prensa', path: '#' },
    { label: 'Trabaja con nosotros', path: '#' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-luxury-charcoal text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo variant="light" size="lg" showTagline />
            <p className="font-sans font-light text-xs text-white/50 leading-relaxed mt-6 max-w-xs">
              La maison de perfumería más exclusiva de Argentina. Traemos el mundo
              de la haute parfumerie directamente a vos.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
              >
                <Instagram size={14} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
              >
                <Facebook size={14} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
              >
                <Twitter size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="font-sans font-light text-[9px] tracking-[0.3em] uppercase text-gold mb-5">
                {title}
              </p>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="font-sans font-light text-xs text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <p className="font-sans font-light text-[10px] text-white/30 tracking-wide">
              © {year} ÉLIXIR Parfumerie de Luxe. Todos los derechos reservados.
            </p>
            {/* Payment methods */}
            <div className="flex items-center gap-2">
              {['VISA', 'MC', 'AMEX', 'MP'].map(card => (
                <span
                  key={card}
                  className="px-2 py-1 border border-white/10 font-sans font-light text-[9px] text-white/30 tracking-widest"
                >
                  {card}
                </span>
              ))}
            </div>
          </div>

          <p className="font-sans font-light text-[10px] text-white/30">
            Desarrollado por{' '}
            <a
              href="#"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              Driva Dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
