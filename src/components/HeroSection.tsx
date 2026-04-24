import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1600&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-luxury-black/20" />
      </div>

      {/* Content — bottom-anchored editorial layout */}
      <div className="relative z-10 w-full pb-16 md:pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="font-sans font-light text-[10px] tracking-[0.5em] uppercase text-gold mb-5">
            Nouvelle Collection · 2025
          </p>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-7">
            L'Art<br />
            <em className="not-italic text-gold">du Parfum</em>
          </h1>

          <p className="font-sans font-light text-sm text-white/60 max-w-sm mb-10 leading-loose">
            Fragancias que trascienden el tiempo. Para quienes entienden que el lujo verdadero se percibe, no se ve.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/catalogo"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-luxury-black font-sans font-light tracking-widest uppercase text-xs transition-all duration-300 hover:bg-white"
            >
              Explorar
              <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
