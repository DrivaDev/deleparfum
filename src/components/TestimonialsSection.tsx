import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Martina G.',
    location: 'Buenos Aires',
    rating: 5,
    text: 'La calidad de la Pana Murano es increíble. La relación calidad-precio es muy buena y el envío llegó rápido y bien embalado.',
    product: 'PANA MURANO',
  },
  {
    name: 'Carlos T.',
    location: 'Córdoba',
    rating: 5,
    text: 'Usé THOR para retapizar mi living y quedó espectacular. La tela es muy resistente y los colores son exactamente iguales a las fotos.',
    product: 'THOR',
  },
  {
    name: 'Alejandra R.',
    location: 'Rosario',
    rating: 5,
    text: 'Compré CUEROTEX para las sillas del comedor. Facilísima de limpiar y se ve de lujo. Recomiendo 100% Telas Web 2026.',
    product: 'CUEROTEX',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-luxury-charcoal">
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
              className="relative p-8 border border-gold/20 hover:border-gold/40 transition-colors duration-300"
              style={{ backgroundColor: '#fdf4f8' }}
            >
              <Quote size={32} className="text-gold/30 mb-4" strokeWidth={1} />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-gold text-gold" />
                ))}
              </div>

              <p className="font-sans font-light text-sm text-luxury-gray leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              <div className="border-t border-gray-200 pt-5">
                <p className="font-serif text-sm text-luxury-black">{t.name}</p>
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
