interface LogoProps {
  variant?: 'dark' | 'light' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

const sizes = {
  sm: { title: 'text-xl', tagline: 'text-[8px]', spacing: 'tracking-[0.3em]' },
  md: { title: 'text-2xl', tagline: 'text-[9px]', spacing: 'tracking-[0.35em]' },
  lg: { title: 'text-3xl', tagline: 'text-[10px]', spacing: 'tracking-[0.4em]' },
};

const colors = {
  dark: { title: 'text-luxury-black', tagline: 'text-luxury-lightgray', line: '#0A0A0A' },
  light: { title: 'text-white', tagline: 'text-white/70', line: '#ffffff' },
  gold: { title: 'text-gold', tagline: 'text-gold/80', line: '#C9A96E' },
};

export default function Logo({ variant = 'dark', size = 'md', showTagline = true }: LogoProps) {
  const s = sizes[size];
  const c = colors[variant];

  return (
    <div className="flex flex-col items-center select-none">
      <span className={`font-serif font-light ${s.title} ${c.title} ${s.spacing} uppercase leading-none`}>
        Élixir
      </span>
      {showTagline && (
        <>
          <div className="flex items-center gap-2 my-1 w-full">
            <div className="flex-1 h-px opacity-40" style={{ background: c.line }} />
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
              <rect x="3" y="0" width="4" height="4" transform="rotate(45 3 3)" fill={c.line} opacity="0.6" />
            </svg>
            <div className="flex-1 h-px opacity-40" style={{ background: c.line }} />
          </div>
          <span className={`font-sans font-light ${s.tagline} ${c.tagline} tracking-[0.25em] uppercase`}>
            Parfumerie de Luxe
          </span>
        </>
      )}
    </div>
  );
}
