interface LogoProps {
  variant?: 'dark' | 'light' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  compact?: boolean;
}

const heights = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-14',
};

// Logos are white SVGs.
// 'light' → white logo on dark bg → show as-is
// 'dark'  → dark logo on white bg → invert to black
// 'gold'  → apply gold tint
const filters: Record<string, string> = {
  light: '',
  dark: 'brightness(0)',
  gold: 'brightness(0) saturate(100%) invert(72%) sepia(40%) saturate(500%) hue-rotate(5deg)',
};

export default function Logo({ variant = 'dark', size = 'md', compact = false }: LogoProps) {
  const h = heights[size];
  const filter = filters[variant] ?? filters.dark;

  return (
    <img
      src={compact ? '/Logo2.svg' : '/Logo1.svg'}
      alt="De Le Parfum"
      className={`${h} w-auto object-contain select-none`}
      style={filter ? { filter } : undefined}
      draggable={false}
    />
  );
}
