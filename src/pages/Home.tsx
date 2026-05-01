import { Link } from 'react-router-dom';
import { Truck, RotateCcw, ShieldCheck, MessageCircle } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';

const categories = [
  {
    name: 'Panas',
    desc: 'Suavidad y textura premium',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
    filter: 'panas',
  },
  {
    name: 'Telas',
    desc: 'Variedad y calidad para cada proyecto',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    filter: 'telas',
  },
  {
    name: 'Cuerinas',
    desc: 'Resistencia y estilo moderno',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    filter: 'cuerinas',
  },
];

const benefits = [
  { icon: Truck, title: 'Envío gratis', desc: 'A todo el país, sin mínimo de compra.' },
  { icon: RotateCcw, title: 'Devoluciones', desc: '30 días para cambios o reembolso.' },
  { icon: ShieldCheck, title: 'Calidad garantizada', desc: 'Todos nuestros productos son verificados.' },
  { icon: MessageCircle, title: 'Atención por WhatsApp', desc: 'Respondemos rápido, todos los días.' },
];

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Benefits bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 py-5 px-4 md:px-6">
                <Icon size={20} strokeWidth={1.5} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-sm font-semibold text-luxury-black">{title}</p>
                  <p className="font-sans font-light text-xs text-luxury-gray mt-0.5 leading-snug hidden sm:block">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="py-14 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl md:text-3xl text-luxury-black mb-8">Nuestras líneas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={`/catalogo?categoria=${cat.filter}`}
                className="group relative overflow-hidden bg-white border border-gray-200 hover:border-gold transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg text-luxury-black">{cat.name}</h3>
                  <p className="font-sans font-light text-xs text-luxury-gray mt-1">{cat.desc}</p>
                  <p className="font-sans font-light text-xs text-gold mt-3 group-hover:underline">Ver productos →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <TestimonialsSection />

      {/* WhatsApp CTA */}
      <section className="py-14 md:py-20 bg-luxury-charcoal text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <MessageCircle size={32} strokeWidth={1} className="text-gold mx-auto mb-5" />
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">¿Necesitás ayuda para elegir?</h2>
          <p className="font-sans font-light text-sm text-white/60 mb-8 leading-relaxed">
            Escribinos por WhatsApp y te asesoramos sin compromiso. También podés consultar por cantidades mayoristas.
          </p>
          <a
            href="https://wa.me/5491179047144"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white font-sans font-light text-sm tracking-widest uppercase hover:bg-[#1ebd58] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escribir por WhatsApp
          </a>
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
}
