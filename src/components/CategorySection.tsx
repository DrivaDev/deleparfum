import { Link } from 'react-router-dom';

const categories = [
  {
    label: 'Florales',
    slug: 'floral',
    description: 'Delicadeza en cada nota',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
    count: 4,
  },
  {
    label: 'Orientales',
    slug: 'oriental',
    description: 'Misterio y profundidad',
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80',
    count: 4,
  },
  {
    label: 'Amaderadas',
    slug: 'amaderada',
    description: 'Fuerza y naturaleza',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffedbe47425?w=800&q=80',
    count: 3,
  },
  {
    label: 'Frescas',
    slug: 'fresca',
    description: 'Libertad y ligereza',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80',
    count: 2,
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-subtitle mb-3">Descubrí tu esencia</p>
          <h2 className="section-title">Familias Olfativas</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/catalogo?category=${cat.slug}`}
              className="group relative overflow-hidden aspect-[3/4]"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-sans font-light text-[9px] tracking-widest uppercase text-gold mb-1">
                  {cat.count} fragancias
                </p>
                <h3 className="font-serif text-xl text-white">{cat.label}</h3>
                <p className="font-sans font-light text-[10px] text-white/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.description}
                </p>
                <div className="mt-3 w-0 group-hover:w-8 h-px bg-gold transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
