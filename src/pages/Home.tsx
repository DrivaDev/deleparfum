import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
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
              'Telas 100% Garantizadas',
              'Envío Gratis en toda la web',
              '13% de Descuento',
              'Pago por Transferencia',
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
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80')` }}
        >
          <div className="absolute inset-0 bg-luxury-black/20" />
        </div>
        <div className="bg-luxury-black flex items-center justify-center px-10 md:px-16 py-20">
          <div className="max-w-sm">
            <p className="font-sans font-light text-[9px] tracking-[0.5em] uppercase text-gold mb-6">
              Telas Web 2026
            </p>
            <blockquote className="font-serif text-3xl md:text-4xl text-white leading-tight mb-6">
              "La mejor tela para cada proyecto, al mejor precio"
            </blockquote>
            <p className="font-sans font-light text-xs text-white/40 mb-10 tracking-wider">
              Panas · Telas · Cuerinas
            </p>
            <Link
              to="/catalogo"
              className="group inline-flex items-center gap-3 font-sans font-light text-[10px] tracking-widest uppercase text-gold hover:text-white transition-colors"
            >
              Ver toda la colección
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
            Encontranos en<br />
            <em className="not-italic text-gold">Instagram y WhatsApp</em>
          </h2>
          <p className="font-sans font-light text-sm text-white/50 max-w-md mx-auto mb-10 leading-relaxed">
            Mirá nuestros proyectos, consultá por colores y hacé tu pedido directo por WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://instagram.com/telasweb2026"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-gold hover:text-gold transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span className="font-sans font-light text-xs tracking-widest uppercase">@telasweb2026</span>
            </a>
            <a
              href="https://wa.me/5491179047144"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-gold hover:text-gold transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="font-sans font-light text-xs tracking-widest uppercase">Escribinos</span>
            </a>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
}
