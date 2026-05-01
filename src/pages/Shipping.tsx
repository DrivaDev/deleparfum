import { Link } from 'react-router-dom';
import { Truck, MapPin, Clock, Package, ShieldCheck, MessageCircle } from 'lucide-react';

const zones = [
  {
    name: 'CABA y GBA',
    time: '24–48 hs hábiles',
    price: 'Envío gratis',
    priceAlt: 'En todos los pedidos',
  },
  {
    name: 'Interior del país',
    time: '3–7 días hábiles',
    price: 'Envío gratis',
    priceAlt: 'En todos los pedidos',
  },
  {
    name: 'Zonas remotas',
    time: '7–15 días hábiles',
    price: 'Consultar',
    priceAlt: 'Patagonia, NOA, Cuyo profundo',
  },
];

const faqs = [
  {
    q: '¿Cómo sé que mi pedido está en camino?',
    a: 'Cuando tu pedido sea despachado, te contactaremos por WhatsApp con el número de seguimiento y el enlace para rastrearlo.',
  },
  {
    q: '¿Puedo cambiar la dirección de entrega?',
    a: 'Podés modificar la dirección mientras el pedido esté en estado "Procesando". Una vez despachado, no es posible cambiarla.',
  },
  {
    q: '¿Qué pasa si no estoy cuando llega el paquete?',
    a: 'El correo realiza hasta 2 intentos de entrega. Si no hay nadie, el paquete queda en la sucursal más cercana por 5 días hábiles.',
  },
  {
    q: '¿Cómo se embala la tela?',
    a: 'Las telas se enrollan y embalan correctamente para evitar arrugas y daños durante el transporte.',
  },
];

export default function Shipping() {
  return (
    <div className="min-h-screen bg-cream pt-20 md:pt-32">
      {/* Hero */}
      <div className="bg-luxury-charcoal text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 border border-gold/40 flex items-center justify-center">
              <Truck size={24} strokeWidth={1} className="text-gold" />
            </div>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Envíos a todo el país
          </h1>
          <p className="font-sans font-light text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
            Despachamos a toda la Argentina. Envío gratis en todos los pedidos.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20">

        {/* Free shipping banner */}
        <div className="bg-luxury-black text-white px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 mb-14">
          <div className="flex items-center gap-3">
            <Truck size={18} strokeWidth={1.5} className="text-gold flex-shrink-0" />
            <p className="font-sans font-light text-sm text-white">
              <span className="text-gold">Envío gratis</span> en todos los pedidos, sin mínimo de compra
            </p>
          </div>
          <Link to="/catalogo" className="font-sans font-light text-[10px] tracking-widest uppercase text-white/50 hover:text-gold transition-colors border-b border-white/20 hover:border-gold pb-0.5 whitespace-nowrap">
            Ver catálogo →
          </Link>
        </div>

        {/* Zones */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <MapPin size={16} strokeWidth={1.5} className="text-gold" />
            <h2 className="font-serif text-xl text-luxury-black">Zonas y tiempos de entrega</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {zones.map(z => (
              <div key={z.name} className="bg-white p-6">
                <p className="font-sans font-light text-[10px] tracking-widest uppercase text-gold mb-3">{z.name}</p>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={12} strokeWidth={1.5} className="text-luxury-lightgray flex-shrink-0" />
                  <p className="font-serif text-base text-luxury-black">{z.time}</p>
                </div>
                <p className="font-sans font-light text-xs text-luxury-gray">{z.price}</p>
                <p className="font-sans font-light text-[10px] text-luxury-lightgray mt-1">{z.priceAlt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Package size={16} strokeWidth={1.5} className="text-gold" />
            <h2 className="font-serif text-xl text-luxury-black">¿Cómo funciona el envío?</h2>
          </div>
          <div className="bg-white border border-gray-100 p-8">
            <ol className="space-y-6">
              {[
                { n: '01', title: 'Confirmás tu pedido', desc: 'Completás el checkout y se abre WhatsApp con el detalle de tu compra para confirmar.' },
                { n: '02', title: 'Coordinamos el pago', desc: 'Te enviamos los datos bancarios y confirmamos la recepción de la transferencia.' },
                { n: '03', title: 'Preparamos y despachamos', desc: 'Preparamos tu pedido y lo entregamos al transporte en 1–2 días hábiles.' },
                { n: '04', title: 'Entrega en puerta', desc: 'El envío llega a tu domicilio. Te avisamos por WhatsApp cuando sea despachado.' },
              ].map(step => (
                <li key={step.n} className="flex gap-5">
                  <span className="font-serif text-2xl text-gold/40 flex-shrink-0 leading-none">{step.n}</span>
                  <div>
                    <p className="font-sans font-light text-xs tracking-widest uppercase text-luxury-black mb-1">{step.title}</p>
                    <p className="font-sans font-light text-sm text-luxury-gray leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Package, title: 'Embalaje seguro', desc: 'Las telas se enrollan y protegen correctamente para que lleguen en perfecto estado.' },
            { icon: ShieldCheck, title: 'Envío asegurado', desc: 'Todos los paquetes viajan asegurados contra daños o pérdidas durante el transporte.' },
            { icon: Truck, title: 'Seguimiento incluido', desc: 'Te enviamos el número de seguimiento por WhatsApp para que puedas rastrear tu pedido.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 border border-gold/30 flex items-center justify-center mt-0.5">
                <Icon size={16} strokeWidth={1.5} className="text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-base text-luxury-black mb-1">{title}</h3>
                <p className="font-sans font-light text-xs text-luxury-gray leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="font-serif text-xl text-luxury-black mb-6">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqs.map(faq => (
              <div key={faq.q} className="border-b border-gray-100 pb-4">
                <p className="font-sans font-light text-sm text-luxury-black mb-2">{faq.q}</p>
                <p className="font-sans font-light text-sm text-luxury-gray leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center border-t border-gray-200 pt-12">
          <div className="flex justify-center mb-4">
            <MessageCircle size={20} strokeWidth={1.5} className="text-luxury-lightgray" />
          </div>
          <h3 className="font-serif text-xl text-luxury-black mb-3">¿Tenés alguna consulta?</h3>
          <p className="font-sans font-light text-sm text-luxury-gray mb-6">
            Escribinos por WhatsApp y te respondemos a la brevedad.
          </p>
          <a
            href="https://wa.me/5491179047144"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Escribir por WhatsApp
          </a>
          <p className="mt-6">
            <Link to="/catalogo" className="font-sans font-light text-xs text-luxury-lightgray hover:text-luxury-black transition-colors underline underline-offset-4">
              Volver al catálogo
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
