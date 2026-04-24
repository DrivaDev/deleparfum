import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCartStore, formatPrice } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

const categoryLabels: Record<string, string> = {
  floral: 'Floral',
  amaderada: 'Amaderada',
  oriental: 'Oriental',
  fresca: 'Fresca',
  chipre: 'Chipre',
  fougere: 'Fougère',
};

const genderLabels: Record<string, string> = {
  women: 'Mujer',
  men: 'Hombre',
  unisex: 'Unisex',
};

export default function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const [wishlist, setWishlist] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCartStore();

  const defaultSize = product.sizes[0];
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, defaultSize);
  };

  if (layout === 'list') {
    return (
      <article className="flex gap-6 bg-white border border-gray-100 hover:border-gold/30 transition-all duration-300 group">
        <Link to={`/producto/${product.id}`} className="flex-shrink-0 w-40 h-40 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="flex-1 py-4 pr-4 flex flex-col justify-between">
          <div>
            <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">{product.brand}</p>
            <Link to={`/producto/${product.id}`}>
              <h3 className="font-serif text-lg text-luxury-black hover:text-gold transition-colors mt-1">{product.name}</h3>
            </Link>
            <p className="font-sans font-light text-xs text-luxury-gray mt-2 line-clamp-2">{product.description}</p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="font-serif text-xl text-luxury-black">{formatPrice(product.price)}</p>
              {product.originalPrice && (
                <p className="font-sans font-light text-xs text-luxury-lightgray line-through">{formatPrice(product.originalPrice)}</p>
              )}
            </div>
            <button onClick={handleAddToCart} className="btn-primary text-xs px-5 py-2">
              Agregar
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative bg-white">
      {/* Image container */}
      <div className="relative overflow-hidden bg-cream aspect-[3/4]">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-cream animate-pulse" />
        )}
        <Link to={`/producto/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-luxury-black text-white text-[9px] font-sans font-light tracking-widest uppercase px-2 py-1">
              Nuevo
            </span>
          )}
          {discount && (
            <span className="bg-gold text-luxury-black text-[9px] font-sans font-bold px-2 py-1">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWishlist(!wishlist)}
          aria-label={wishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            className={wishlist ? 'fill-red-400 text-red-400' : 'text-luxury-gray'}
          />
        </button>

        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-luxury-black text-white font-sans font-light text-[10px] tracking-widest uppercase py-3 flex items-center justify-center gap-2 hover:bg-gold hover:text-luxury-black transition-colors duration-200"
          >
            <ShoppingBag size={12} strokeWidth={1.5} />
            Agregar al Carrito
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">
            {product.brand}
          </p>
          <div className="flex items-center gap-1">
            <Star size={10} className="fill-gold text-gold" />
            <span className="font-sans text-[10px] text-luxury-lightgray">{product.rating}</span>
          </div>
        </div>

        <Link to={`/producto/${product.id}`}>
          <h3 className="font-serif text-base text-luxury-black hover:text-gold transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>

        <p className="font-sans font-light text-[10px] tracking-wide text-luxury-lightgray mt-1">
          {categoryLabels[product.category]} · {genderLabels[product.gender]}
        </p>

        <div className="flex items-baseline gap-2 mt-2">
          <p className="font-serif text-lg text-luxury-black">{formatPrice(product.price)}</p>
          {product.originalPrice && (
            <p className="font-sans font-light text-xs text-luxury-lightgray line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
