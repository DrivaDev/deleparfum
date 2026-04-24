import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '../data/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-subtitle mb-3">Selección Curada</p>
          <h2 className="section-title">Fragancias Destacadas</h2>
          <div className="luxury-divider max-w-xs mx-auto mt-6">
            <span className="text-gold text-xs">✦</span>
          </div>
          <p className="font-sans font-light text-sm text-luxury-gray max-w-md mx-auto mt-5 leading-relaxed">
            Una cuidadosa selección de las fragancias más extraordinarias de nuestra colección.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 font-sans font-light text-xs tracking-widest uppercase text-luxury-black hover:text-gold transition-colors border-b border-current pb-1"
          >
            Ver toda la colección
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
