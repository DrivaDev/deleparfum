import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';
import Logo from './Logo';

const footerLinks = [
  { label: 'Catálogo', path: '/catalogo' },
  { label: 'Envíos', path: '/envios' },
  { label: 'Política de devoluciones', path: '/politica-de-devoluciones' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-luxury-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {/* Brand column */}
          <div>
            <Logo variant="light" size="lg" />
            <p className="font-sans font-light text-xs text-white/50 leading-relaxed mt-6 max-w-xs">
              Las mejores telas para tapicería y decoración. Calidad premium y envío a todo el país.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com/telasweb2026"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @telasweb2026"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
              >
                <Instagram size={14} strokeWidth={1.5} />
              </a>
              <a
                href="https://wa.me/5491179047144"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-200"
              >
                <MessageCircle size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Links column */}
          <div>
            <p className="font-sans font-light text-[9px] tracking-[0.3em] uppercase text-gold mb-5">
              Telas Web 2026
            </p>
            <ul className="space-y-3">
              {footerLinks.map(link => (
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
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans font-light text-[10px] text-white/30 tracking-wide">
            © {year} Telas Web 2026. Todos los derechos reservados.
          </p>
          <p className="font-sans font-light text-[10px] text-white/30">
            Desarrollado por{' '}
            <a href="#" className="text-gold/60 hover:text-gold transition-colors">
              Driva Dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
