import { Link } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCartStore, formatPrice } from '../store/cartStore';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const total = getTotalPrice();
  const itemCount = getTotalItems();
  const shipping = total >= 50000 ? 0 : 3500;

  if (items.length === 0) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex flex-col items-center justify-center gap-5 bg-cream">
        <ShoppingBag size={48} strokeWidth={0.8} className="text-gray-300" />
        <h1 className="font-serif text-3xl text-luxury-black">Tu bolsa está vacía</h1>
        <p className="font-sans font-light text-sm text-luxury-lightgray">
          Explorá nuestra colección y encontrá tu fragancia perfecta.
        </p>
        <Link to="/catalogo" className="btn-primary mt-2">
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="mb-8">
          <p className="section-subtitle mb-2">Mi compra</p>
          <h1 className="section-title">
            Mi Bolsa{' '}
            <span className="font-sans font-normal text-xl text-luxury-lightgray">({itemCount})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-5">
            {items.map(item => {
              const subtotal = item.selectedSize.price * item.quantity;
              return (
                <div
                  key={`${item.product.id}-${item.selectedSize.ml}`}
                  className="flex gap-5 bg-white p-5 border border-gray-100 animate-fade-in"
                >
                  <Link to={`/producto/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 md:w-28 md:h-28 object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">
                      {item.product.brand}
                    </p>
                    <Link to={`/producto/${item.product.id}`}>
                      <h3 className="font-serif text-lg text-luxury-black hover:text-gold transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="font-sans font-light text-xs text-luxury-lightgray mt-1">
                      {item.selectedSize.ml} ml — {formatPrice(item.selectedSize.price)} c/u
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize.ml, item.quantity - 1)}
                            className="px-3 py-2 text-luxury-gray hover:text-luxury-black transition-colors"
                            aria-label="Reducir"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center font-sans font-light text-sm text-luxury-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize.ml, item.quantity + 1)}
                            className="px-3 py-2 text-luxury-gray hover:text-luxury-black transition-colors"
                            aria-label="Aumentar"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id, item.selectedSize.ml)}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <p className="font-serif text-lg text-luxury-black">{formatPrice(subtotal)}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 font-sans font-light text-xs tracking-widest uppercase text-luxury-gray hover:text-luxury-black transition-colors mt-2"
            >
              <ArrowLeft size={12} />
              Continuar comprando
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 p-6 sticky top-24">
              <h2 className="font-serif text-xl text-luxury-black mb-6 pb-5 border-b border-gray-100">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between">
                  <p className="font-sans font-light text-xs text-luxury-gray">Subtotal</p>
                  <p className="font-sans font-light text-sm text-luxury-charcoal">{formatPrice(total)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-sans font-light text-xs text-luxury-gray">Envío</p>
                  <p className="font-sans font-light text-sm text-luxury-charcoal">
                    {shipping === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : formatPrice(shipping)}
                  </p>
                </div>
                {shipping > 0 && (
                  <p className="font-sans font-light text-[10px] text-luxury-lightgray">
                    Enviá gratis desde {formatPrice(50000)}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-5 mb-6">
                <div className="flex justify-between items-baseline">
                  <p className="font-sans font-light text-xs tracking-widest uppercase text-luxury-lightgray">Total</p>
                  <p className="font-serif text-2xl text-luxury-black">{formatPrice(total + shipping)}</p>
                </div>
              </div>

              <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
                Finalizar Compra
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>

              {/* Promo code placeholder */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-3">
                  Código de descuento
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ÉLIXIR20"
                    className="input-field text-xs py-2 flex-1"
                  />
                  <button className="px-4 border border-gray-200 font-sans font-light text-xs text-luxury-gray hover:border-gold transition-colors">
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
