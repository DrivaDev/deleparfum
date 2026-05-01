import { OlfactoryNotes as NotesType } from '../types';

interface FabricSpecsProps {
  notes: NotesType;
  compact?: boolean;
}

export default function FabricSpecs({ notes, compact = false }: FabricSpecsProps) {
  const tiers = [
    { label: 'Composición', notes: notes.top, description: 'Material y medidas' },
    { label: 'Características', notes: notes.heart, description: 'Propiedades de la tela' },
    { label: 'Usos recomendados', notes: notes.base, description: 'Aplicaciones ideales' },
  ];

  if (compact) {
    return (
      <div className="space-y-3">
        {tiers.map((tier, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 rounded-full border border-gold" style={{ opacity: 1 - i * 0.2 }} />
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
      <div className="flex flex-col gap-0 mb-8">
        {tiers.map((tier, i) => {
          const backgrounds = ['bg-gold/15', 'bg-gold/10', 'bg-gold/5'];
          return (
            <div
              key={i}
              className={`${backgrounds[i]} px-6 py-5 border-b border-gold/10`}
            >
              <span className="font-sans font-light text-[9px] tracking-widest uppercase text-gold mb-1 block">
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
