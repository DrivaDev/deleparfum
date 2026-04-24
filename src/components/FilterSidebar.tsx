import { X, SlidersHorizontal } from 'lucide-react';
import { FilterState, OlfactoryFamily, Gender } from '../types';
import { getBrands, getMaxPrice } from '../data/products';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

const categoryOptions: { value: OlfactoryFamily; label: string }[] = [
  { value: 'floral', label: 'Floral' },
  { value: 'amaderada', label: 'Amaderada' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'fresca', label: 'Fresca' },
  { value: 'chipre', label: 'Chipre' },
  { value: 'fougere', label: 'Fougère' },
];

const genderOptions: { value: Gender; label: string }[] = [
  { value: 'women', label: 'Mujer' },
  { value: 'men', label: 'Hombre' },
  { value: 'unisex', label: 'Unisex' },
];

const sortOptions = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'newest', label: 'Novedades' },
  { value: 'rating', label: 'Mejor valorados' },
];

export default function FilterSidebar({ filters, onChange, isOpen, onClose }: FilterSidebarProps) {
  const brands = getBrands();
  const maxPrice = getMaxPrice();

  const toggleCategory = (cat: OlfactoryFamily) => {
    const updated = filters.categories.includes(cat)
      ? filters.categories.filter(c => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: updated });
  };

  const toggleGender = (g: Gender) => {
    const updated = filters.genders.includes(g)
      ? filters.genders.filter(x => x !== g)
      : [...filters.genders, g];
    onChange({ ...filters, genders: updated });
  };

  const toggleBrand = (brand: string) => {
    const updated = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: updated });
  };

  const clearAll = () => {
    onChange({
      categories: [],
      genders: [],
      priceMin: 0,
      priceMax: maxPrice,
      brands: [],
      search: '',
      sortBy: 'featured',
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.genders.length > 0 ||
    filters.brands.length > 0 ||
    filters.priceMax < maxPrice;

  const content = (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} strokeWidth={1.5} className="text-luxury-charcoal" />
          <h2 className="font-serif text-base text-luxury-black">Filtros</h2>
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="font-sans font-light text-[10px] tracking-widest uppercase text-gold hover:text-gold-dark transition-colors"
            >
              Limpiar
            </button>
          )}
          <button onClick={onClose} className="lg:hidden text-luxury-lightgray hover:text-luxury-black">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">
        {/* Sort */}
        <div>
          <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-3">Ordenar por</p>
          <select
            value={filters.sortBy}
            onChange={e => onChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
            className="input-field text-xs"
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <div>
          <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-3">Familia Olfativa</p>
          <div className="space-y-2">
            {categoryOptions.map(opt => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(opt.value)}
                  onChange={() => toggleCategory(opt.value)}
                  className="w-3.5 h-3.5 border-gray-300 text-gold focus:ring-gold focus:ring-offset-0"
                />
                <span className="font-sans font-light text-xs text-luxury-gray group-hover:text-luxury-black transition-colors">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div>
          <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-3">Género</p>
          <div className="flex gap-2 flex-wrap">
            {genderOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => toggleGender(opt.value)}
                className={`px-4 py-1.5 border text-xs font-sans font-light transition-all duration-200 ${
                  filters.genders.includes(opt.value)
                    ? 'border-gold bg-gold/10 text-luxury-black'
                    : 'border-gray-200 text-luxury-gray hover:border-gold/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <div className="flex justify-between mb-3">
            <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">Precio máximo</p>
            <p className="font-sans font-light text-xs text-gold">
              ${(filters.priceMax / 1000).toFixed(0)}K
            </p>
          </div>
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={5000}
            value={filters.priceMax}
            onChange={e => onChange({ ...filters, priceMax: Number(e.target.value) })}
            className="w-full accent-gold"
          />
          <div className="flex justify-between mt-1">
            <span className="font-sans font-light text-[10px] text-luxury-lightgray">$0</span>
            <span className="font-sans font-light text-[10px] text-luxury-lightgray">${(maxPrice / 1000).toFixed(0)}K</span>
          </div>
        </div>

        {/* Brands */}
        <div>
          <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-3">Marca</p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map(brand => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="w-3.5 h-3.5 border-gray-300 text-gold focus:ring-gold focus:ring-offset-0"
                />
                <span className="font-sans font-light text-xs text-luxury-gray group-hover:text-luxury-black transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 bg-white border-r border-gray-100 min-h-screen sticky top-20">
        {content}
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-luxury-black/50" onClick={onClose} />
          <aside className="absolute bottom-0 left-0 right-0 bg-white max-h-[85vh] rounded-t-xl shadow-2xl overflow-hidden animate-slide-up">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
