import { useEffect } from 'react';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore, formatPrice } from '../store/cartStore';

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const total = getTotalPrice();
  const itemCount = getTotalItems();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[55] bg-luxury-black/50 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[56] flex flex-col shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} strokeWidth={1.5} className="text-luxury-charcoal" />
            <h2 className="font-serif text-lg text-luxury-black">
              Mi Bolsa
            </h2>
            {itemCount > 0 && (
              <span className="bg-gold text-luxury-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="text-luxury-lightgray hover:text-luxury-black transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <ShoppingBag size={40} strokeWidth={1} className="text-gray-200" />
            <p className="font-serif text-xl text-luxury-black">Tu bolsa está vacía</p>
            <p className="font-sans font-light text-sm text-luxury-lightgray text-center">
              Descubrí nuestra colección de fragancias exclusivas.
            </p>
            <button onClick={closeCart} className="btn-primary mt-4">
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto cart-scrollbar px-6 py-4 space-y-5">
            {items.map((item) => (
              <li
                key={`${item.product.id}-${item.selectedSize.ml}`}
                className="flex gap-4 pb-5 border-b border-gray-100 last:border-0 animate-fade-in"
              >
                <Link
                  to={`/producto/${item.product.id}`}
                  onClick={closeCart}
                  className="flex-shrink-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-0.5">
                    {item.product.brand}
                  </p>
                  <Link
                    to={`/producto/${item.product.id}`}
                    onClick={closeCart}
                    className="font-serif text-sm text-luxury-black hover:text-gold transition-colors block"
                  >
                    {item.product.name}
                  </Link>
                  <p className="font-sans font-light text-xs text-luxury-lightgray mt-0.5">
                    {item.selectedSize.ml} ml
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize.ml, item.quantity - 1)}
                        aria-label="Reducir cantidad"
                        className="p-1.5 text-luxury-gray hover:text-luxury-black transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-sans font-light text-xs text-luxury-charcoal w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize.ml, item.quantity + 1)}
                        aria-label="Aumentar cantidad"
                        className="p-1.5 text-luxury-gray hover:text-luxury-black transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="font-sans font-light text-sm text-luxury-black">
                        {formatPrice(item.selectedSize.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize.ml)}
                        aria-label="Eliminar producto"
                        className="text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 bg-cream/40">
            <div className="flex justify-between items-center mb-1">
              <p className="font-sans font-light text-xs tracking-widest uppercase text-luxury-lightgray">
                Subtotal
              </p>
              <p className="font-serif text-xl text-luxury-black">{formatPrice(total)}</p>
            </div>
            <p className="font-sans font-light text-xs text-luxury-lightgray mb-5">
              Envío e impuestos calculados al finalizar la compra
            </p>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="btn-primary w-full text-center block"
            >
              Finalizar Compra
            </Link>
            <Link
              to="/carrito"
              onClick={closeCart}
              className="btn-secondary w-full text-center block mt-3"
            >
              Ver Carrito
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
