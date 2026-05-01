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
          <p className="section-subtitle mb-3">Telas Web 2026</p>
          <h1 className="section-title">{pageTitle}</h1>
          <p className="font-sans font-light text-sm text-luxury-gray mt-3">
            {filtered.length} línea{filtered.length !== 1 ? 's' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-0">
        <FilterSidebar filters={filters} onChange={setFilters} isOpen={filterOpen} onClose={() => setFilterOpen(false)} />

        <div className="flex-1 py-8 lg:px-8">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 font-sans font-light text-xs tracking-widest uppercase text-luxury-gray border border-gray-200 px-4 py-2 hover:border-gold transition-colors"
            >
              <SlidersHorizontal size={14} strokeWidth={1.5} />
              Filtros
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => setLayout('grid')} className={`p-2 transition-colors ${layout === 'grid' ? 'text-luxury-black' : 'text-gray-300 hover:text-luxury-gray'}`}>
                <LayoutGrid size={16} strokeWidth={1.5} />
              </button>
              <button onClick={() => setLayout('list')} className={`p-2 transition-colors ${layout === 'list' ? 'text-luxury-black' : 'text-gray-300 hover:text-luxury-gray'}`}>
                <List size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-luxury-black mb-3">Sin resultados</p>
              <p className="font-sans font-light text-sm text-luxury-lightgray">Probá con otros filtros.</p>
            </div>
          ) : (
            <div className={layout === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7' : 'space-y-4'}>
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} layout={layout} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
