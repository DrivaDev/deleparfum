import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Valentina M.',
    location: 'Buenos Aires',
    rating: 5,
    text: 'Minuit Éternel cambió mi relación con los perfumes. Es imposible describirlo con palabras; hay que vivirlo en la piel.',
    product: 'Minuit Éternel',
  },
  {
    name: 'Sebastián R.',
    location: 'Rosario',
    rating: 5,
    text: 'Oud Royal es el perfume más sofisticado que he usado. La atención al detalle de De Leparfum es impecable.',
    product: 'Oud Royal',
  },
  {
    name: 'Luciana P.',
    location: 'Córdoba',
    rating: 5,
    text: 'Rose Impériale es exactamente lo que estaba buscando: una rosa real, sin artificios. Llegó perfectamente empaquetado.',
    product: 'Rose Impériale',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-luxury-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-sans font-light text-[10px] tracking-[0.4em] uppercase text-gold mb-3">
            Experiencias Reales
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white">Lo Que Dicen Nuestros Clientes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="relative bg-luxury-charcoal p-8 border border-white/5 hover:border-gold/20 transition-colors duration-300"
            >
              <Quote
                size={32}
                className="text-gold/20 mb-4"
                strokeWidth={1}
              />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-gold text-gold" />
                ))}
              </div>

              <p className="font-sans font-light text-sm text-white/70 leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              <div className="border-t border-white/10 pt-5">
                <p className="font-serif text-sm text-white">{t.name}</p>
                <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mt-1">
                  {t.location} · <span className="text-gold">{t.product}</span>
                </p>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
