import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { formatPrice } from '../store/cartStore';
import Logo from '../components/Logo';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const orderNumber = `ELX-${Date.now().toString().slice(-6)}`;
  const total = state?.total ?? 0;
  const form = state?.form;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-4xl mx-auto px-4 flex justify-center">
          <Link to="/">
            <Logo variant="dark" size="sm" showTagline />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full text-center animate-fade-in">
          {/* Success icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gold/10 border-2 border-gold rounded-full flex items-center justify-center">
              <CheckCircle size={36} className="text-gold" strokeWidth={1.5} />
            </div>
          </div>

          <p className="font-sans font-light text-[10px] tracking-[0.4em] uppercase text-gold mb-3">
            Pedido Confirmado
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-luxury-black mb-4">
            ¡Gracias por tu compra!
          </h1>
          <p className="font-sans font-light text-sm text-luxury-gray leading-relaxed mb-2">
            Tu pedido ha sido procesado exitosamente.
            {form?.email && ` Te enviamos la confirmación a ${form.email}.`}
          </p>

          {/* Order info */}
          <div className="bg-white border border-gray-100 p-6 mt-8 text-left space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">
                Número de pedido
              </p>
              <p className="font-serif text-base text-gold">{orderNumber}</p>
            </div>

            {total > 0 && (
              <div className="flex justify-between items-center">
                <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">
                  Total
                </p>
                <p className="font-serif text-lg text-luxury-black">{formatPrice(total)}</p>
              </div>
            )}

            {form?.address && (
              <div className="pt-2 border-t border-gray-100">
                <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-2">
                  Dirección de envío
                </p>
                <p className="font-sans font-light text-xs text-luxury-charcoal">
                  {form.firstName} {form.lastName}
                </p>
                <p className="font-sans font-light text-xs text-luxury-gray">{form.address}</p>
                <p className="font-sans font-light text-xs text-luxury-gray">
                  {form.city}, {form.province} {form.postalCode}
                </p>
              </div>
            )}
          </div>

          {/* Status steps */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 p-4 flex flex-col items-center gap-3">
              <Mail size={20} strokeWidth={1} className="text-gold" />
              <p className="font-sans font-light text-[10px] tracking-wide text-luxury-gray text-center">
                Confirmación enviada por email
              </p>
            </div>
            <div className="bg-white border border-gray-100 p-4 flex flex-col items-center gap-3">
              <Package size={20} strokeWidth={1} className="text-gold" />
              <p className="font-sans font-light text-[10px] tracking-wide text-luxury-gray text-center">
                Preparando tu envío en 24-48hs
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Link to="/catalogo" className="btn-primary flex items-center justify-center gap-2">
              Seguir comprando
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
            <Link to="/" className="btn-secondary flex items-center justify-center gap-2">
              Ir al inicio
            </Link>
          </div>

          <p className="font-sans font-light text-[10px] text-luxury-lightgray mt-8">
            ¿Consultas? Escribinos a{' '}
            <a href="mailto:hola@elixir.com.ar" className="text-gold hover:underline">
              hola@elixir.com.ar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
