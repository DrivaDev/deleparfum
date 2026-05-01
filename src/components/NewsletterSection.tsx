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
        <p className="section-subtitle mb-3">Novedades y Ofertas</p>
        <h2 className="section-title mb-5">Suscribite y Enterate Primero</h2>
        <p className="font-sans font-light text-sm text-luxury-gray leading-relaxed mb-10 max-w-md mx-auto">
          Recibí primero los lanzamientos de nuevas líneas, ofertas exclusivas y
          consejos de tapicería y decoración.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center">
              <Check size={24} className="text-white" strokeWidth={2} />
            </div>
            <p className="font-serif text-xl text-luxury-black">¡Te suscribiste a Telas Web 2026!</p>
            <p className="font-sans font-light text-sm text-luxury-lightgray">
              Pronto recibirás novedades en {email}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              placeholder="tu@email.com"
              className="flex-1 border border-gray-300 px-5 py-3.5 font-sans font-light text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-luxury-black text-white px-6 py-3.5 font-sans font-light text-xs tracking-widest uppercase hover:bg-gold transition-colors"
            >
              <Send size={14} strokeWidth={1.5} />
              Suscribirme
            </button>
          </form>
        )}
        {error && <p className="font-sans font-light text-xs text-red-500 mt-3">{error}</p>}
      </div>
    </section>
  );
}
