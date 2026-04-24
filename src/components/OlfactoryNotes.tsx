import { OlfactoryNotes as OlfactoryNotesType } from '../types';

interface OlfactoryNotesProps {
  notes: OlfactoryNotesType;
  compact?: boolean;
}

export default function OlfactoryNotes({ notes, compact = false }: OlfactoryNotesProps) {
  const tiers = [
    { label: 'Notas de Salida', notes: notes.top, description: 'Primera impresión' },
    { label: 'Notas de Corazón', notes: notes.heart, description: 'La esencia del perfume' },
    { label: 'Notas de Fondo', notes: notes.base, description: 'La huella que deja' },
  ];

  if (compact) {
    return (
      <div className="space-y-3">
        {tiers.map((tier, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="flex-shrink-0 mt-1">
              <div
                className="w-2 h-2 rounded-full border border-gold"
                style={{ opacity: 1 - i * 0.2 }}
              />
            </div>
            <div>
              <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">{tier.label}</p>
              <p className="font-sans font-light text-xs text-luxury-charcoal">{tier.notes.join(' · ')}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Pyramid visual */}
      <div className="flex flex-col items-center gap-0 mb-8">
        {tiers.map((tier, i) => {
          const widths = ['w-3/5', 'w-4/5', 'w-full'];
          const backgrounds = ['bg-gold/20', 'bg-gold/12', 'bg-gold/6'];
          return (
            <div
              key={i}
              className={`${widths[i]} ${backgrounds[i]} flex flex-col items-center py-5 px-6 text-center border-b border-gold/10`}
            >
              <span className="font-sans font-light text-[9px] tracking-widest uppercase text-gold mb-1">
                {tier.description}
              </span>
              <p className="font-sans font-light text-xs tracking-widest uppercase text-luxury-lightgray mb-2">
                {tier.label}
              </p>
              <p className="font-sans font-light text-sm text-luxury-charcoal">
                {tier.notes.join(' · ')}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
