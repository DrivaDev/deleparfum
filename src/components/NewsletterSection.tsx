import { useState } from 'react';
import { Send, Check } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Ingresá un email válido');
      return;
    }
    setSubmitted(true);
    setError('');
  };

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="section-subtitle mb-3">Acceso Exclusivo</p>
        <h2 className="section-title mb-5">Suscribite a Nuestro Universo</h2>
        <p className="font-sans font-light text-sm text-luxury-gray leading-relaxed mb-10 max-w-md mx-auto">
          Recibí primero las novedades de colección, lanzamientos exclusivos y
          los secretos del mundo de la haute parfumerie.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center">
              <Check size={24} className="text-luxury-black" strokeWidth={2} />
            </div>
            <p className="font-serif text-xl text-luxury-black">¡Bienvenido/a al universo De Leparfum!</p>
            <p className="font-sans font-light text-sm text-luxury-lightgray">
              Pronto recibirás contenido exclusivo en {email}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="tu@email.com"
                className="input-field h-12 border-luxury-black/20"
                aria-label="Correo electrónico"
              />
              {error && (
                <p className="font-sans font-light text-xs text-red-500 mt-1 text-left">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="h-12 px-6 bg-luxury-black text-white font-sans font-light text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gold hover:text-luxury-black transition-all duration-300 flex-shrink-0"
            >
              <Send size={12} strokeWidth={1.5} />
              Suscribirme
            </button>
          </form>
        )}

        <p className="font-sans font-light text-[10px] text-luxury-lightgray mt-5">
          Sin spam. Solo lo más selecto. Podés darte de baja en cualquier momento.
        </p>
      </div>
    </section>
  );
}
