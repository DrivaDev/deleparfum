import { Link } from 'react-router-dom';
import { Truck, MapPin, Clock, Package, ShieldCheck, Phone } from 'lucide-react';

const zones = [
  {
    name: 'CABA y GBA',
    time: '24–48 hs hábiles',
    price: 'Gratis en compras +$50.000',
    priceAlt: '$3.500 en compras menores',
  },
  {
    name: 'Interior del país',
    time: '3–7 días hábiles',
    price: 'Gratis en compras +$50.000',
    priceAlt: '$3.500 en compras menores',
  },
  {
    name: 'Zonas remotas',
    time: '7–15 días hábiles',
    price: 'Consultar costo',
    priceAlt: 'Patagonia, NOA, Cuyo profundo',
  },
];

const faqs = [
  {
    q: '¿Cómo sé que mi pedido está en camino?',
    a: 'Cuando tu pedido sea despachado, te enviaremos un email con el número de seguimiento y el enlace para rastrearlo en tiempo real.',
  },
  {
    q: '¿Puedo cambiar la dirección de entrega?',
    a: 'Podés modificar la dirección mientras el pedido todavía esté en estado "Procesando". Una vez despachado, no es posible cambiarla.',
  },
  {
    q: '¿Qué pasa si no estoy cuando llega el paquete?',
    a: 'El correo realiza hasta 2 intentos de entrega. Si no hay nadie, el paquete queda en la sucursal más cercana por 5 días hábiles.',
  },
  {
    q: '¿Cómo viajan los frascos?',
    a: 'Todos los envíos se embalan con protección especial anti-golpes y doble caja. Los frascos están asegurados para que lleguen en perfecto estado.',
  },
];

export default function Shipping() {
  return (
    <div className="min-h-screen bg-cream pt-24">
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
            Despachamos a toda la Argentina con packaging de lujo y seguimiento en tiempo real.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20">

        {/* Free shipping banner */}
        <div className="bg-luxury-black text-white px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 mb-14">
          <div className="flex items-center gap-3">
            <Truck size={18} strokeWidth={1.5} className="text-gold flex-shrink-0" />
            <p className="font-sans font-light text-sm text-white">
              <span className="text-gold">Envío gratis</span> en compras superiores a <span className="text-gold">$50.000</span>
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
                { n: '01', title: 'Confirmás tu pedido', desc: 'Completás el checkout y recibís un email de confirmación con el detalle de tu compra.' },
                { n: '02', title: 'Preparamos tu pedido', desc: 'Nuestro equipo selecciona y embala cada fragancia con el packaging exclusivo de De Leparfum en 1–2 días hábiles.' },
                { n: '03', title: 'Despacho', desc: 'El paquete es entregado a la empresa de transporte y recibís el número de seguimiento por email.' },
                { n: '04', title: 'Entrega', desc: 'El envío llega a tu puerta. Si no estás, el correo deja aviso o lo retiras en la sucursal más cercana.' },
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
            { icon: Package, title: 'Packaging de lujo', desc: 'Caja rígida con papel tissue, cinta satinada y tarjeta personalizada incluida.' },
            { icon: ShieldCheck, title: 'Envío asegurado', desc: 'Todos los paquetes viajan asegurados contra roturas o pérdidas durante el transporte.' },
            { icon: Truck, title: 'Seguimiento en tiempo real', desc: 'Recibís el link de tracking para monitorear tu pedido desde que sale hasta que llega.' },
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
            <Phone size={20} strokeWidth={1.5} className="text-luxury-lightgray" />
          </div>
          <h3 className="font-serif text-xl text-luxury-black mb-3">¿Tenés alguna consulta?</h3>
          <p className="font-sans font-light text-sm text-luxury-gray mb-6">
            Escribinos por Instagram o por email y te respondemos a la brevedad.
          </p>
          <a
            href="https://instagram.com/deleparfum"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            @deleparfum
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
