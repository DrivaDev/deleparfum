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
              Filosofía ÉLIXIR
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
    </main>
  );
}
