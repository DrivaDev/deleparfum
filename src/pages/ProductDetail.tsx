import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Heart, ChevronLeft, Minus, Plus, Package, RotateCcw, Shield } from 'lucide-react';
import { getProductById, products } from '../data/products';
import { useCartStore, formatPrice } from '../store/cartStore';
import { ProductSize } from '../types';
import OlfactoryNotes from '../components/OlfactoryNotes';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id ?? '');
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(product?.sizes[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const { addItem } = useCartStore();

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <p className="font-serif text-2xl text-luxury-black mb-4">Producto no encontrado</p>
        <Link to="/catalogo" className="btn-primary">Ver catálogo</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    for (let i = 0; i < quantity; i++) addItem(product, selectedSize);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const related = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const categoryLabels: Record<string, string> = {
    floral: 'Floral', amaderada: 'Amaderada', oriental: 'Oriental',
    fresca: 'Fresca', chipre: 'Chipre', fougere: 'Fougère',
  };
  const genderLabels: Record<string, string> = {
    women: 'Mujer', men: 'Hombre', unisex: 'Unisex',
  };

  return (
    <div className="pt-16 md:pt-20">
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 font-sans font-light text-[10px] tracking-wide text-luxury-lightgray">
            <Link to="/" className="hover:text-luxury-black transition-colors">Inicio</Link>
            <span>/</span>
            <Link to="/catalogo" className="hover:text-luxury-black transition-colors">Catálogo</Link>
            <span>/</span>
            <span className="text-luxury-charcoal">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-cream overflow-hidden">
              <img
                src={product.images[activeImage] ?? product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-gold' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <button
              onClick={() => navigate(-1)}
              className="hidden lg:flex items-center gap-2 font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray hover:text-luxury-black mb-6 self-start transition-colors"
            >
              <ChevronLeft size={12} />
              Volver
            </button>

            {/* Badge row */}
            <div className="flex items-center gap-3 mb-3">
              {product.isNew && (
                <span className="bg-luxury-black text-white text-[9px] font-sans tracking-widest uppercase px-2 py-1">
                  Nuevo
                </span>
              )}
              <span className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">
                {categoryLabels[product.category]} · {genderLabels[product.gender]}
              </span>
            </div>

            <p className="font-sans font-light text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
              {product.brand}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-luxury-black leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-200 fill-gray-200'}
                  />
                ))}
              </div>
              <span className="font-sans font-light text-xs text-luxury-lightgray">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>

            <p className="font-sans font-light text-sm text-luxury-gray leading-relaxed mb-6">
              {product.longDescription}
            </p>

            {/* Size selector */}
            <div className="mb-6">
              <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-3">
                Tamaño
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size.ml}
                    onClick={() => setSelectedSize(size)}
                    className={`flex flex-col items-center px-5 py-3 border transition-all duration-200 ${
                      selectedSize?.ml === size.ml
                        ? 'border-gold bg-gold/10 text-luxury-black'
                        : 'border-gray-200 text-luxury-gray hover:border-gold/50'
                    }`}
                  >
                    <span className="font-sans font-light text-sm">{size.ml} ml</span>
                    <span className="font-serif text-xs text-luxury-lightgray mt-0.5">{formatPrice(size.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <p className="font-serif text-3xl text-luxury-black">
                {formatPrice(selectedSize?.price ?? product.price)}
              </p>
              {product.originalPrice && (
                <p className="font-sans font-light text-base text-luxury-lightgray line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>

            {/* Quantity + CTA */}
            <div className="flex gap-3 mb-8">
              <div className="flex items-center border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 text-luxury-gray hover:text-luxury-black transition-colors"
                  aria-label="Reducir cantidad"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-sans font-light text-sm text-luxury-charcoal">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3 text-luxury-gray hover:text-luxury-black transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 flex items-center justify-center gap-2 py-3 font-sans font-light text-xs tracking-widest uppercase transition-all duration-300 ${
                  addedFeedback
                    ? 'bg-green-600 text-white'
                    : 'bg-luxury-black text-white hover:bg-gold hover:text-luxury-black'
                }`}
              >
                <ShoppingBag size={14} strokeWidth={1.5} />
                {addedFeedback ? '¡Agregado!' : 'Agregar al Carrito'}
              </button>

              <button
                onClick={() => setWishlist(!wishlist)}
                aria-label="Favoritos"
                className="border border-gray-200 px-4 hover:border-gold transition-colors"
              >
                <Heart
                  size={16}
                  strokeWidth={1.5}
                  className={wishlist ? 'fill-red-400 text-red-400' : 'text-luxury-lightgray'}
                />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 py-5 border-t border-gray-100">
              {[
                { icon: Package, text: 'Envío express' },
                { icon: RotateCcw, text: '30 días devolución' },
                { icon: Shield, text: '100% auténtico' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-2 text-center">
                  <Icon size={16} strokeWidth={1} className="text-gold" />
                  <p className="font-sans font-light text-[10px] tracking-wide text-luxury-lightgray">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Olfactory notes section */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-12">
          <div>
            <p className="section-subtitle mb-3">El alma del perfume</p>
            <h2 className="font-serif text-2xl text-luxury-black mb-8">Pirámide Olfativa</h2>
            <OlfactoryNotes notes={product.notes} />
          </div>

          <div>
            <p className="section-subtitle mb-3">Sobre la fragancia</p>
            <h2 className="font-serif text-2xl text-luxury-black mb-5">Notas del Perfumista</h2>
            <p className="font-sans font-light text-sm text-luxury-gray leading-relaxed mb-5">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.tags?.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 border border-gray-200 font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 md:py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="section-subtitle mb-2">También te puede gustar</p>
              <h2 className="font-serif text-2xl text-luxury-black">Fragancias Relacionadas</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
