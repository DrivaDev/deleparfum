import { Link } from 'react-router-dom';
import { RotateCcw, Clock, ShieldCheck, AlertCircle, Package, MessageCircle } from 'lucide-react';

const sections = [
  {
    icon: Clock,
    title: 'Plazo de Devolución',
    body: 'Aceptamos devoluciones dentro de los 30 días corridos desde la fecha de recepción del pedido. Pasado ese plazo, no podremos procesar cambios ni reembolsos.',
  },
  {
    icon: ShieldCheck,
    title: 'Condiciones del Producto',
    body: 'La tela debe estar sin cortar, en su estado original tal como fue recibida. No se aceptan devoluciones de productos que hayan sido cortados, lavados o modificados de cualquier forma.',
  },
  {
    icon: Package,
    title: 'Productos con Defecto',
    body: 'Si recibís una tela con defecto de fabricación o dañada durante el envío, comunicate con nosotros dentro de las 48 horas de recibido el paquete. Repondremos el producto sin costo o realizaremos el reembolso total.',
  },
  {
    icon: AlertCircle,
    title: 'Productos Excluidos',
    body: 'No aceptamos devoluciones de telas que hayan sido cortadas, de productos en liquidación con descuento especial mayor al 40%, ni de compras realizadas hace más de 30 días.',
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
            { label: 'Plazo', value: '30 días' },
            { label: 'Condición', value: 'Sin cortar' },
            { label: 'Reembolso', value: '100%' },
          ].map(item => (
            <div key={item.label} className="bg-white p-6 text-center">
              <p className="font-serif text-3xl text-gold mb-1">{item.value}</p>
              <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-8 mb-16">
          {sections.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-5">
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
          <h2 className="font-serif text-xl text-luxury-black mb-6">¿Cómo iniciar una devolución?</h2>
          <ol className="space-y-5">
            {[
              { n: '01', text: 'Contactanos por WhatsApp indicando tu número de pedido y el motivo de la devolución.' },
              { n: '02', text: 'Te indicaremos cómo proceder con el envío de la tela de vuelta.' },
              { n: '03', text: 'Una vez recibida y verificada la tela, procesamos el reembolso o cambio.' },
            ].map(step => (
              <li key={step.n} className="flex gap-4">
                <span className="font-serif text-xl text-gold/40 flex-shrink-0 leading-none">{step.n}</span>
                <p className="font-sans font-light text-sm text-luxury-gray leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="text-center border-t border-gray-200 pt-12">
          <div className="flex justify-center mb-4">
            <MessageCircle size={20} strokeWidth={1.5} className="text-luxury-lightgray" />
          </div>
          <h3 className="font-serif text-xl text-luxury-black mb-3">¿Tenés alguna consulta?</h3>
          <p className="font-sans font-light text-sm text-luxury-gray mb-2">
            Escribinos por WhatsApp o por email a{' '}
            <a href="mailto:telasweb2026@gmail.com" className="text-gold hover:underline">
              telasweb2026@gmail.com
            </a>
          </p>
          <a
            href="https://wa.me/5491179047144"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block mt-4"
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
