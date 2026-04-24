import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1600&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-luxury-black/40 to-luxury-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <p className="font-sans font-light text-[10px] tracking-[0.4em] uppercase text-gold mb-6">
          Nouvelle Collection
        </p>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6 text-balance">
          L'Art du<br />
          <em className="not-italic text-gold">Parfum</em>
        </h1>

        <p className="font-sans font-light text-sm md:text-base text-white/70 max-w-lg mx-auto mb-10 leading-relaxed">
          Fragancias que trascienden el tiempo. Creadas para quienes entienden
          que el lujo verdadero se percibe, no se ve.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/catalogo"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gold text-luxury-black font-sans font-light tracking-widest uppercase text-xs transition-all duration-300 hover:bg-gold-light"
          >
            Explorar Colección
          </Link>
          <Link
            to="/catalogo?filter=new"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/40 text-white font-sans font-light tracking-widest uppercase text-xs transition-all duration-300 hover:border-gold hover:text-gold backdrop-blur-sm"
          >
            Novedades
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 mt-16">
          {[
            { value: '200+', label: 'Fragancias' },
            { value: '50+', label: 'Marcas exclusivas' },
            { value: '15+', label: 'Años de tradición' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-2xl text-gold">{stat.value}</p>
              <p className="font-sans font-light text-[10px] tracking-widest uppercase text-white/50 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        aria-label="Desplazarse hacia abajo"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-gold transition-colors animate-bounce"
      >
        <ChevronDown size={24} strokeWidth={1} />
      </button>
    </section>
  );
}
