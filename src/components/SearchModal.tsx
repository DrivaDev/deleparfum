import { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';
import { formatPrice } from '../store/cartStore';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const found = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
    ).slice(0, 6);
    setResults(found);
  }, [query]);

  const handleSelect = (product: Product) => {
    navigate(`/producto/${product.id}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-luxury-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl shadow-2xl animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-5 border-b border-gray-100">
          <Search size={18} className="text-luxury-lightgray flex-shrink-0" strokeWidth={1.5} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar perfumes, marcas..."
            className="flex-1 font-sans font-light text-sm text-luxury-charcoal placeholder-luxury-lightgray outline-none"
          />
          <button onClick={onClose} className="text-luxury-lightgray hover:text-luxury-black transition-colors">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {results.length > 0 && (
          <ul className="max-h-96 overflow-y-auto">
            {results.map(product => (
              <li key={product.id}>
                <button
                  onClick={() => handleSelect(product)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-cream transition-colors text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-luxury-black">{product.name}</p>
                    <p className="font-sans font-light text-xs text-luxury-lightgray tracking-wide">{product.brand}</p>
                  </div>
                  <p className="font-sans font-light text-sm text-gold flex-shrink-0">
                    {formatPrice(product.price)}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="p-8 text-center">
            <p className="font-sans font-light text-sm text-luxury-lightgray">
              No se encontraron resultados para "{query}"
            </p>
          </div>
        )}

        {query.length === 0 && (
          <div className="px-5 py-6">
            <p className="font-sans font-light text-xs tracking-widest uppercase text-luxury-lightgray mb-4">
              Búsquedas populares
            </p>
            <div className="flex flex-wrap gap-2">
              {['Rosa', 'Oud', 'Floral', 'Amaderado', 'Unisex'].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 border border-gray-200 font-sans font-light text-xs text-luxury-gray hover:border-gold hover:text-luxury-black transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
