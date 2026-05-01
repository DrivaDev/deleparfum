import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="bg-luxury-charcoal" style={{ minHeight: '520px' }}>
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 flex flex-col items-center text-center">
        <p className="font-sans font-light text-xs tracking-[0.35em] uppercase text-gold mb-4">
          Panas · Telas · Cuerinas
        </p>

        <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-5 max-w-2xl">
          Las mejores telas para tapicería y decoración
        </h1>

        <p className="font-sans font-light text-sm text-white/70 max-w-lg mb-8 leading-relaxed">
          Más de 100 colores disponibles. Calidad premium, precios directos y envío gratis a todo el país.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/catalogo"
            className="px-8 py-3 bg-gold text-white font-sans font-light text-sm tracking-widest uppercase hover:bg-gold-dark transition-colors"
          >
            Ver catálogo
          </Link>
          <a
            href="https://wa.me/5491179047144"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-white/40 text-white font-sans font-light text-sm tracking-widest uppercase hover:border-white hover:bg-white/10 transition-colors"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
