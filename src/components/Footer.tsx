import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import Logo from './Logo';

const footerLinks = {
  'La Boutique': [
    { label: 'Catálogo', path: '/catalogo' },
    { label: 'Marcas', path: '/catalogo' },
    { label: 'Política de devoluciones', path: '/politica-de-devoluciones' },
  ],
  'Ayuda': [
    { label: 'Envíos', path: '/envios' },
    { label: 'Devoluciones', path: '/politica-de-devoluciones' },
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
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com/deleparfum"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @deleparfum"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
              >
                <Instagram size={14} strokeWidth={1.5} />
              </a>
              <a
                href="https://tiktok.com/@deleparfum_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok @deleparfum_"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
              >
                {/* TikTok icon (not in lucide, use SVG) */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                </svg>
              </a>
            </div>
            <div className="flex gap-3 mt-2">
              <p className="font-sans font-light text-[10px] text-white/30">@deleparfum</p>
              <p className="font-sans font-light text-[10px] text-white/30">@deleparfum_</p>
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
