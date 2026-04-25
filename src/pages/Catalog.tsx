import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { products, getMaxPrice } from '../data/products';
import { FilterState, OlfactoryFamily } from '../types';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

const defaultFilters: FilterState = {
  categories: [],
  genders: [],
  priceMin: 0,
  priceMax: getMaxPrice(),
  brands: [],
  search: '',
  sortBy: 'featured',
};

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => {
    const category = searchParams.get('category') as OlfactoryFamily | null;
    return {
      ...defaultFilters,
      categories: category ? [category] : [],
    };
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const isNewFilter = searchParams.get('filter') === 'new';

  const filtered = useMemo(() => {
    let result = [...products];

    if (isNewFilter) result = result.filter(p => p.isNew);
    if (filters.categories.length > 0)
      result = result.filter(p => filters.categories.includes(p.category));
    if (filters.genders.length > 0)
      result = result.filter(p => filters.genders.includes(p.gender));
    if (filters.brands.length > 0)
      result = result.filter(p => filters.brands.includes(p.brand));
    result = result.filter(p => p.price <= filters.priceMax);

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (filters.sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [filters, isNewFilter]);

  const pageTitle = isNewFilter ? 'Novedades' : 'Catálogo';

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-cream py-12 md:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-subtitle mb-3">De Leparfum</p>
          <h1 className="section-title">{pageTitle}</h1>
          <p className="font-sans font-light text-sm text-luxury-gray mt-3">
            {filtered.length} fragancia{filtered.length !== 1 ? 's' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-0">
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0 py-8 lg:pl-8">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-7 pb-5 border-b border-gray-100">
            <button
              onClick={() => setFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 font-sans font-light text-xs tracking-widest uppercase text-luxury-gray hover:text-luxury-black"
            >
              <SlidersHorizontal size={14} strokeWidth={1.5} />
              Filtros
              {(filters.categories.length > 0 || filters.genders.length > 0 || filters.brands.length > 0) && (
                <span className="bg-gold text-luxury-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {filters.categories.length + filters.genders.length + filters.brands.length}
                </span>
              )}
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <span className="font-sans font-light text-xs text-luxury-lightgray">
                {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Search input */}
            <input
              type="text"
              value={filters.search}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
              placeholder="Buscar en catálogo..."
              className="hidden md:block input-field max-w-xs text-xs py-2"
            />

            {/* Layout toggle */}
            <div className="flex items-center gap-1 border border-gray-200 p-1">
              <button
                onClick={() => setLayout('grid')}
                className={`p-1.5 transition-colors ${layout === 'grid' ? 'bg-luxury-black text-white' : 'text-luxury-lightgray hover:text-luxury-black'}`}
                aria-label="Vista en grilla"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-1.5 transition-colors ${layout === 'list' ? 'bg-luxury-black text-white' : 'text-luxury-lightgray hover:text-luxury-black'}`}
                aria-label="Vista en lista"
              >
                <List size={14} />
              </button>
            </div>
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-luxury-black mb-3">Sin resultados</p>
              <p className="font-sans font-light text-sm text-luxury-lightgray">
                Probá con otros filtros o términos de búsqueda.
              </p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="btn-secondary mt-6 text-xs"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : layout === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} layout="list" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
