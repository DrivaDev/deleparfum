import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import CategorySection from '../components/CategorySection';
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
      <div className="bg-luxury-black py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {[
              'Fragancias 100% Auténticas',
              'Envío Gratuito +$50.000',
              'Packaging de Lujo Incluido',
              'Devolución en 30 días',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                <p className="font-sans font-light text-[10px] tracking-widest uppercase text-white/70 whitespace-nowrap">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FeaturedProducts />

      {/* Editorial banner */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1600&q=80')` }}
        >
          <div className="absolute inset-0 bg-luxury-black/75" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="font-sans font-light text-[10px] tracking-[0.4em] uppercase text-gold mb-5">
            Filosofía ÉLIXIR
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
            "Un perfume es la última y más perfecta expresión de la memoria"
          </h2>
          <p className="font-sans font-light text-sm text-white/60 mb-8 italic">
            — Christian Dior
          </p>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 font-sans font-light text-xs tracking-widest uppercase text-gold hover:text-gold-light border-b border-gold pb-1 transition-colors"
          >
            Descubrí nuestra colección
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <CategorySection />

      {/* New arrivals */}
      {newProducts.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-subtitle mb-2">Recién llegadas</p>
                <h2 className="section-title">Novedades</h2>
              </div>
              <Link
                to="/catalogo?filter=new"
                className="hidden sm:flex items-center gap-2 font-sans font-light text-xs tracking-widest uppercase text-luxury-black hover:text-gold transition-colors border-b border-current pb-1"
              >
                Ver todas
                <ArrowRight size={12} strokeWidth={1.5} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
              {newProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <TestimonialsSection />
      <NewsletterSection />
    </main>
  );
}
