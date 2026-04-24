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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <p className="section-subtitle mb-3">Selección Curada</p>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-black leading-none">Fragancias<br /><em className="not-italic text-gold">Destacadas</em></h2>
          </div>
          <p className="font-sans font-light text-xs text-luxury-gray max-w-xs leading-relaxed md:text-right">
            Una selección extraordinaria de las fragancias más icónicas de nuestra colección.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
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
