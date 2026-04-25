import { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, MessageCircle, ArrowRight } from 'lucide-react';
import { formatPrice } from '../store/cartStore';
import { useOrdersStore } from '../store/ordersStore';
import Logo from '../components/Logo';

const WA_NUMBER = '5491139399189';

function buildWhatsAppMessage(
  orderNumber: string,
  form: Record<string, string>,
  total: number,
  items: { name: string; size: number; qty: number; price: number }[]
): string {
  const sep = '*----------------------------*';

  const lines: string[] = [
    '✨ *NUEVO PEDIDO - De Leparfum* ✨',
    sep,
    '',
    `*Pedido:* ${orderNumber}`,
    '',
    '👤 *Cliente*',
    `   ${form.firstName} ${form.lastName}`,
    `   📧 ${form.email}`,
    `   📱 ${form.phone}`,
    '',
    '📦 *Productos*',
    ...items.map((i) => `   - ${i.name} ${i.size}ml x${i.qty}  ->  ${formatPrice(i.price * i.qty)}`),
    '',
    '🏠 *Direccion de envio*',
    `   ${form.address}`,
    `   ${form.city}, ${form.province} ${form.postalCode}`,
    '',
    '💳 *Metodo de pago:* Transferencia bancaria',
    '',
    sep,
    `💰 *TOTAL: ${formatPrice(total)}*`,
    sep,
  ];

  return lines.join('\n');
}

export default function OrderConfirmation() {
  const { state } = useLocation();
  const addOrder = useOrdersStore((s) => s.addOrder);
  const orderNumber = useRef(`DLP-${Date.now().toString().slice(-6)}`).current;
  const total: number = state?.total ?? 0;
  const form: Record<string, string> = state?.form ?? {};
  const cartItems: {
    product: { name: string };
    selectedSize: { ml: number; price: number };
    quantity: number;
  }[] = state?.items ?? [];

  const itemDetails = cartItems.map((i) => ({
    name: i.product.name,
    size: i.selectedSize.ml,
    qty: i.quantity,
    price: i.selectedSize.price,
  }));

  useEffect(() => {
    if (!form.firstName) return;

    // Persist order to global store
    addOrder({
      id: orderNumber,
      customer: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      province: form.province,
      postalCode: form.postalCode,
      items: cartItems.reduce((s, i) => s + i.quantity, 0),
      itemDetails,
      total,
      status: 'procesando',
      date: new Date().toISOString().slice(0, 10),
      paymentMethod: 'transferencia',
    });

    // Open WhatsApp
    const msg = buildWhatsAppMessage(orderNumber, form, total, itemDetails);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    const timer = setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 800);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(orderNumber, form, total, itemDetails)
  )}`;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-4xl mx-auto px-4 flex justify-center">
          <Link to="/"><Logo variant="dark" size="sm" /></Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full text-center animate-fade-in">
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
            Tu pedido fue procesado. Nos contactaremos a la brevedad para coordinar el envío.
          </p>

          <div className="bg-white border border-gray-100 p-6 mt-8 text-left space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">
                Número de pedido
              </p>
              <p className="font-serif text-base text-gold">{orderNumber}</p>
            </div>
            {total > 0 && (
              <div className="flex justify-between items-center">
                <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">Total</p>
                <p className="font-serif text-lg text-luxury-black">{formatPrice(total)}</p>
              </div>
            )}
            {form?.address && (
              <div className="pt-2 border-t border-gray-100">
                <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-2">
                  Dirección de envío
                </p>
                <p className="font-sans font-light text-xs text-luxury-charcoal">{form.firstName} {form.lastName}</p>
                <p className="font-sans font-light text-xs text-luxury-gray">{form.address}</p>
                <p className="font-sans font-light text-xs text-luxury-gray">{form.city}, {form.province} {form.postalCode}</p>
              </div>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 p-4 flex flex-col items-center gap-3">
              <MessageCircle size={20} strokeWidth={1} className="text-gold" />
              <p className="font-sans font-light text-[10px] tracking-wide text-luxury-gray text-center">
                Detalle enviado por WhatsApp
              </p>
            </div>
            <div className="bg-white border border-gray-100 p-4 flex flex-col items-center gap-3">
              <Package size={20} strokeWidth={1} className="text-gold" />
              <p className="font-sans font-light text-[10px] tracking-wide text-luxury-gray text-center">
                Preparando tu envío en 24-48hs
              </p>
            </div>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-sans font-light text-xs tracking-widest uppercase hover:bg-[#20bc59] transition-colors"
          >
            <MessageCircle size={14} strokeWidth={1.5} />
            Abrir WhatsApp con el pedido
          </a>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
            <Link to="/catalogo" className="btn-primary flex items-center justify-center gap-2">
              Seguir comprando <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
            <Link to="/" className="btn-secondary flex items-center justify-center gap-2">
              Ir al inicio
            </Link>
          </div>

          <p className="font-sans font-light text-[10px] text-luxury-lightgray mt-8">
            ¿Consultas?{' '}
            <a href="https://instagram.com/deleparfum" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              @deleparfum
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
