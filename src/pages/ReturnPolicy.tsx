import { Link } from 'react-router-dom';
import { RotateCcw, Clock, ShieldCheck, AlertCircle, Package, Mail } from 'lucide-react';

const sections = [
  {
    icon: Clock,
    title: 'Plazo de Devolución',
    body: 'Aceptamos devoluciones dentro de los 30 días corridos desde la fecha de recepción del pedido. Pasado ese plazo, no podremos procesar cambios ni reembolsos.',
  },
  {
    icon: ShieldCheck,
    title: 'Condiciones del Producto',
    body: 'El producto debe estar sin uso, en su embalaje original sellado y acompañado de todos sus accesorios (caja, bolsa, factura). Los perfumes con el precinto roto no son elegibles para devolución, salvo defecto de fabricación comprobado.',
  },
  {
    icon: Package,
    title: 'Productos con Defecto',
    body: 'Si recibís un producto defectuoso o dañado durante el envío, comunicate con nosotros dentro de las 48 horas de recibido el paquete. Te repondremos el producto sin costo alguno o realizaremos el reembolso total según tu preferencia.',
  },
  {
    icon: AlertCircle,
    title: 'Productos Excluidos',
    body: 'Por razones de higiene y seguridad, no aceptamos devoluciones de: fragancias ya usadas o con el precinto violado, sets con algún componente abierto, y productos adquiridos en liquidación o con descuento especial mayor al 40%.',
  },
];

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-cream pt-24">
      {/* Hero */}
      <div className="bg-luxury-charcoal text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 border border-gold/40 flex items-center justify-center">
              <RotateCcw size={24} strokeWidth={1} className="text-gold" />
            </div>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Política de Devoluciones
          </h1>
          <p className="font-sans font-light text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
            Tu satisfacción es nuestra prioridad. Si por algún motivo no quedás conforme con tu compra, estamos aquí para ayudarte.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20">

        {/* Quick summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200 mb-16">
          {[
            { label: '30 días', sub: 'para solicitar devolución' },
            { label: 'Gratis', sub: 'en cambios por defecto' },
            { label: '5–7 días', sub: 'para acreditar el reembolso' },
          ].map(item => (
            <div key={item.label} className="bg-white p-6 text-center">
              <p className="font-serif text-2xl text-luxury-black mb-1">{item.label}</p>
              <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-10 mb-16">
          {sections.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-6">
              <div className="flex-shrink-0 w-10 h-10 border border-gold/30 flex items-center justify-center mt-0.5">
                <Icon size={16} strokeWidth={1.5} className="text-gold" />
              </div>
              <div>
                <h2 className="font-serif text-lg text-luxury-black mb-2">{title}</h2>
                <p className="font-sans font-light text-sm text-luxury-gray leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="bg-white border border-gray-100 p-8 mb-16">
          <h2 className="font-serif text-xl text-luxury-black mb-8">¿Cómo solicitar una devolución?</h2>
          <ol className="space-y-6">
            {[
              { n: '01', title: 'Contactanos', desc: 'Enviá un email a devoluciones@deleparfum.com con tu número de pedido y el motivo de la devolución.' },
              { n: '02', title: 'Aprobación', desc: 'Nuestro equipo revisará tu solicitud y te responderá dentro de las 24 horas hábiles con las instrucciones de envío.' },
              { n: '03', title: 'Envío del producto', desc: 'Embalá el producto en su caja original y envialo a nuestra dirección. El costo de envío corre por tu cuenta, salvo productos defectuosos.' },
              { n: '04', title: 'Reembolso o cambio', desc: 'Una vez recibido e inspeccionado el producto (2–3 días hábiles), procesaremos tu reembolso o envío de cambio. El crédito aparecerá en tu cuenta en 5–7 días hábiles.' },
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

        {/* CTA */}
        <div className="text-center border-t border-gray-200 pt-12">
          <div className="flex justify-center mb-4">
            <Mail size={20} strokeWidth={1.5} className="text-luxury-lightgray" />
          </div>
          <h3 className="font-serif text-xl text-luxury-black mb-3">¿Tenés alguna pregunta?</h3>
          <p className="font-sans font-light text-sm text-luxury-gray mb-6">
            Nuestro equipo de atención está disponible de lunes a viernes de 10 a 18 hs.
          </p>
          <a
            href="mailto:devoluciones@deleparfum.com"
            className="btn-primary inline-block"
          >
            devoluciones@deleparfum.com
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
