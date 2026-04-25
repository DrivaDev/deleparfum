import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import TestimonialsSection from '../components/TestimonialsSection';
import ProductCard from '../components/ProductCard';
import { getNewProducts } from '../data/products';

export default function Home() {
  const newProducts = getNewProducts();

  return (
    <main>
      <HeroSection />

      {/* Brand promise strip */}
      <div className="bg-luxury-black py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
            {[
              'Fragancias 100% Auténticas',
              'Envío Gratuito +$50.000',
              'Packaging de Lujo Incluido',
              'Devolución en 30 días',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                {i > 0 && <div className="w-px h-3 bg-white/20" />}
                <p className="font-sans font-light text-[10px] tracking-[0.3em] uppercase text-white/50 whitespace-nowrap">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FeaturedProducts />

      {/* Editorial split banner */}
      <section className="grid md:grid-cols-2 min-h-[520px]">
        <div
          className="relative min-h-[300px] md:min-h-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541643600914-78b084683702?w=900&q=80')` }}
        >
          <div className="absolute inset-0 bg-luxury-black/30" />
        </div>
        <div className="bg-luxury-black flex items-center justify-center px-10 md:px-16 py-20">
          <div className="max-w-sm">
            <p className="font-sans font-light text-[9px] tracking-[0.5em] uppercase text-gold mb-6">
              De Leparfum
            </p>
            <blockquote className="font-serif text-3xl md:text-4xl text-white leading-tight mb-6">
              "Un perfume es la última y más perfecta expresión de la memoria"
            </blockquote>
            <p className="font-sans font-light text-xs text-white/40 mb-10 tracking-wider">
              — Christian Dior
            </p>
            <Link
              to="/catalogo"
              className="group inline-flex items-center gap-3 font-sans font-light text-[10px] tracking-widest uppercase text-gold hover:text-white transition-colors"
            >
              Descubrí la colección
              <ArrowRight size={12} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      {newProducts.length > 0 && (
        <section className="py-20 md:py-28 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-subtitle mb-3">Recién llegadas</p>
                <h2 className="font-serif text-4xl md:text-5xl text-luxury-black leading-none">Novedades</h2>
              </div>
              <Link
                to="/catalogo?filter=new"
                className="hidden sm:flex items-center gap-2 font-sans font-light text-xs tracking-widest uppercase text-luxury-black hover:text-gold transition-colors border-b border-current pb-1"
              >
                Ver todas
                <ArrowRight size={12} strokeWidth={1.5} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7">
              {newProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <TestimonialsSection />

      {/* Social media section */}
      <section className="py-20 md:py-24 bg-luxury-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-sans font-light text-[9px] tracking-[0.5em] uppercase text-gold mb-5">
            Seguinos en redes
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">
            Viví la experiencia<br />
            <em className="not-italic text-gold">De Leparfum</em>
          </h2>
          <p className="font-sans font-light text-sm text-white/50 max-w-md mx-auto mb-10 leading-relaxed">
            Descubrí nuevas fragancias, looks del día y contenido exclusivo en nuestras redes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://instagram.com/deleparfum"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-gold hover:text-gold transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <div className="text-left">
                <p className="font-sans font-light text-xs tracking-widest uppercase">Instagram</p>
                <p className="font-sans font-light text-[10px] text-white/40 group-hover:text-gold/60 transition-colors">@deleparfum</p>
              </div>
            </a>

            <a
              href="https://tiktok.com/@deleparfum_"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-gold hover:text-gold transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
              <div className="text-left">
                <p className="font-sans font-light text-xs tracking-widest uppercase">TikTok</p>
                <p className="font-sans font-light text-[10px] text-white/40 group-hover:text-gold/60 transition-colors">@deleparfum_</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
