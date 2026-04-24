import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Package, ShoppingBag, Plus, Edit2, Trash2, X, Save, TrendingUp, DollarSign } from 'lucide-react';
import { products as initialProducts } from '../data/products';
import { Product, OlfactoryFamily, Gender, ProductSize } from '../types';
import { formatPrice } from '../store/cartStore';

type Tab = 'dashboard' | 'products' | 'orders';

const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Valentina Martínez', email: 'vale@email.com', total: 145000, status: 'entregado', date: '2026-04-20', items: 2 },
  { id: 'ORD-002', customer: 'Santiago López', email: 'santi@email.com', total: 89500, status: 'en_camino', date: '2026-04-22', items: 1 },
  { id: 'ORD-003', customer: 'Camila Rodríguez', email: 'cami@email.com', total: 234500, status: 'procesando', date: '2026-04-23', items: 3 },
  { id: 'ORD-004', customer: 'Matías García', email: 'mati@email.com', total: 49500, status: 'cancelado', date: '2026-04-19', items: 1 },
  { id: 'ORD-005', customer: 'Lucía Fernández', email: 'luci@email.com', total: 179000, status: 'procesando', date: '2026-04-24', items: 2 },
];

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  procesando: { label: 'Procesando', cls: 'bg-yellow-100 text-yellow-700' },
  en_camino: { label: 'En camino', cls: 'bg-blue-100 text-blue-700' },
  entregado: { label: 'Entregado', cls: 'bg-green-100 text-green-700' },
  cancelado: { label: 'Cancelado', cls: 'bg-red-100 text-red-700' },
};

const FAMILIES: OlfactoryFamily[] = ['floral', 'amaderada', 'oriental', 'fresca', 'chipre', 'fougere'];
const GENDERS: Gender[] = ['women', 'men', 'unisex'];

const blankProduct = (): Omit<Product, 'id'> => ({
  name: '', brand: '', description: '', longDescription: '',
  notes: { top: [], heart: [], base: [] },
  price: 0, category: 'floral', gender: 'unisex',
  sizes: [{ ml: 50, price: 0 }],
  image: '', images: [],
  rating: 5, reviews: 0,
  inStock: true, isNew: false, isFeatured: false, tags: [],
});

export default function Admin() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const totalRevenue = orders.filter(o => o.status !== 'cancelado').reduce((s, o) => s + o.total, 0);
  const activeOrders = orders.filter(o => o.status === 'procesando' || o.status === 'en_camino').length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-luxury-charcoal text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <p className="font-serif text-lg text-gold">ÉLIXIR</p>
          <p className="font-sans font-light text-[10px] text-white/40 tracking-widest uppercase mt-0.5">Panel Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {([
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'products', label: 'Productos', icon: Package },
            { id: 'orders', label: 'Pedidos', icon: ShoppingBag },
          ] as { id: Tab; label: string; icon: React.ElementType }[]).map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left font-sans font-light text-xs tracking-wide transition-colors rounded ${
                  tab === item.id ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={14} strokeWidth={1.5} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-2 font-sans font-light text-[10px] text-white/40 hover:text-white/70 transition-colors"
          >
            ← Ir al sitio
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">

          {/* DASHBOARD */}
          {tab === 'dashboard' && (
            <div>
              <h1 className="font-serif text-2xl text-luxury-black mb-8">Dashboard</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {[
                  { label: 'Ingresos totales', value: formatPrice(totalRevenue), icon: DollarSign, color: 'text-green-600' },
                  { label: 'Pedidos activos', value: String(activeOrders), icon: ShoppingBag, color: 'text-blue-600' },
                  { label: 'Productos', value: String(productList.length), icon: Package, color: 'text-purple-600' },
                  { label: 'Pedidos totales', value: String(orders.length), icon: TrendingUp, color: 'text-gold' },
                ].map(stat => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white border border-gray-100 p-5 rounded">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">{stat.label}</p>
                        <Icon size={16} strokeWidth={1.5} className={stat.color} />
                      </div>
                      <p className="font-serif text-2xl text-luxury-black">{stat.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent orders */}
                <div className="bg-white border border-gray-100 rounded p-6">
                  <h2 className="font-serif text-base text-luxury-black mb-4">Pedidos recientes</h2>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="pb-2 text-left font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">ID</th>
                        <th className="pb-2 text-left font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">Cliente</th>
                        <th className="pb-2 text-right font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">Total</th>
                        <th className="pb-2 text-right font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.slice(0, 4).map(o => (
                        <tr key={o.id}>
                          <td className="py-2.5 font-sans font-light text-[10px] text-luxury-lightgray">{o.id}</td>
                          <td className="py-2.5 font-sans font-light text-xs text-luxury-black">{o.customer}</td>
                          <td className="py-2.5 text-right font-sans font-light text-xs text-luxury-black">{formatPrice(o.total)}</td>
                          <td className="py-2.5 text-right">
                            <StatusBadge status={o.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Top products */}
                <div className="bg-white border border-gray-100 rounded p-6">
                  <h2 className="font-serif text-base text-luxury-black mb-4">Productos destacados</h2>
                  <ul className="space-y-3">
                    {productList.filter(p => p.isFeatured).slice(0, 4).map(p => (
                      <li key={p.id} className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-xs text-luxury-black truncate">{p.name}</p>
                          <p className="font-sans font-light text-[10px] text-luxury-lightgray">{p.brand}</p>
                        </div>
                        <p className="font-sans font-light text-xs text-luxury-black flex-shrink-0">{formatPrice(p.price)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {tab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-serif text-2xl text-luxury-black">Productos ({productList.length})</h1>
                <button
                  onClick={() => { setEditing({ id: String(Date.now()), ...blankProduct() }); setIsNew(true); }}
                  className="flex items-center gap-2 bg-luxury-black text-white font-sans font-light text-xs px-4 py-2.5 hover:bg-luxury-charcoal transition-colors"
                >
                  <Plus size={14} strokeWidth={1.5} />
                  Nuevo producto
                </button>
              </div>

              <div className="bg-white border border-gray-100 rounded overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-gray-100">
                    <tr>
                      <th className="p-4 text-left font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">Producto</th>
                      <th className="p-4 text-left font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray hidden md:table-cell">Marca</th>
                      <th className="p-4 text-left font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray hidden lg:table-cell">Categoría</th>
                      <th className="p-4 text-right font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">Precio</th>
                      <th className="p-4 text-center font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray hidden sm:table-cell">Stock</th>
                      <th className="p-4" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {productList.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-cover flex-shrink-0" />
                            <div>
                              <p className="font-serif text-sm text-luxury-black">{p.name}</p>
                              {p.isNew && (
                                <span className="font-sans font-light text-[9px] tracking-widest uppercase text-gold">Nuevo</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="font-sans font-light text-xs text-luxury-gray">{p.brand}</span>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <span className="font-sans font-light text-xs text-luxury-gray capitalize">{p.category}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-sans font-light text-xs text-luxury-black">{formatPrice(p.price)}</span>
                        </td>
                        <td className="p-4 text-center hidden sm:table-cell">
                          <span className={`inline-block px-2 py-0.5 font-sans font-light text-[10px] rounded-full ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {p.inStock ? 'En stock' : 'Sin stock'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => { setEditing(p); setIsNew(false); }}
                              className="p-1.5 text-luxury-lightgray hover:text-luxury-black transition-colors"
                              aria-label="Editar"
                            >
                              <Edit2 size={14} strokeWidth={1.5} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(p.id)}
                              className="p-1.5 text-luxury-lightgray hover:text-red-500 transition-colors"
                              aria-label="Eliminar"
                            >
                              <Trash2 size={14} strokeWidth={1.5} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {tab === 'orders' && (
            <div>
              <h1 className="font-serif text-2xl text-luxury-black mb-8">Pedidos ({orders.length})</h1>
              <div className="bg-white border border-gray-100 rounded overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-gray-100">
                    <tr>
                      <th className="p-4 text-left font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">ID</th>
                      <th className="p-4 text-left font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">Cliente</th>
                      <th className="p-4 text-left font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray hidden md:table-cell">Email</th>
                      <th className="p-4 text-left font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray hidden lg:table-cell">Fecha</th>
                      <th className="p-4 text-center font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray hidden sm:table-cell">Items</th>
                      <th className="p-4 text-right font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">Total</th>
                      <th className="p-4 text-center font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <span className="font-sans font-light text-[10px] text-luxury-lightgray">{o.id}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-sans font-light text-sm text-luxury-black">{o.customer}</span>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="font-sans font-light text-xs text-luxury-gray">{o.email}</span>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <span className="font-sans font-light text-xs text-luxury-gray">{o.date}</span>
                        </td>
                        <td className="p-4 text-center hidden sm:table-cell">
                          <span className="font-sans font-light text-xs text-luxury-gray">{o.items}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-sans font-light text-sm text-luxury-black">{formatPrice(o.total)}</span>
                        </td>
                        <td className="p-4 text-center">
                          <select
                            value={o.status}
                            onChange={e => setOrders(prev => prev.map(ord => ord.id === o.id ? { ...ord, status: e.target.value } : ord))}
                            className="font-sans font-light text-[10px] border border-gray-200 rounded px-2 py-1 bg-white cursor-pointer"
                          >
                            <option value="procesando">Procesando</option>
                            <option value="en_camino">En camino</option>
                            <option value="entregado">Entregado</option>
                            <option value="cancelado">Cancelado</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Product edit modal */}
      {editing && (
        <ProductModal
          product={editing}
          isNew={isNew}
          onSave={p => {
            if (isNew) {
              setProductList(prev => [p, ...prev]);
            } else {
              setProductList(prev => prev.map(x => x.id === p.id ? p : x));
            }
            setEditing(null);
          }}
          onClose={() => setEditing(null)}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 max-w-sm w-full">
            <h3 className="font-serif text-lg text-luxury-black mb-3">¿Eliminar producto?</h3>
            <p className="font-sans font-light text-sm text-luxury-gray mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button
                onClick={() => { setProductList(prev => prev.filter(p => p.id !== deleteConfirm)); setDeleteConfirm(null); }}
                className="flex-1 bg-red-500 text-white font-sans font-light text-xs py-2.5 hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-200 font-sans font-light text-xs py-2.5 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_LABELS[status] ?? { label: status, cls: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-block px-2 py-0.5 font-sans font-light text-[10px] rounded-full ${s.cls}`}>
      {s.label}
    </span>
  );
}

function ProductModal({ product, isNew, onSave, onClose }: {
  product: Product;
  isNew: boolean;
  onSave: (p: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Product>(product);

  const set = (field: keyof Product, value: unknown) =>
    setForm(f => ({ ...f, [field]: value }));

  const updateSize = (i: number, field: keyof ProductSize, value: number) =>
    setForm(f => {
      const sizes = [...f.sizes];
      sizes[i] = { ...sizes[i], [field]: value };
      return { ...f, sizes };
    });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-serif text-lg text-luxury-black">{isNew ? 'Nuevo producto' : 'Editar producto'}</h2>
          <button onClick={onClose} className="text-luxury-lightgray hover:text-luxury-black transition-colors">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <MField label="Nombre">
              <input className="input-field" value={form.name} onChange={e => set('name', e.target.value)} />
            </MField>
            <MField label="Marca">
              <input className="input-field" value={form.brand} onChange={e => set('brand', e.target.value)} />
            </MField>
          </div>
          <MField label="Descripción corta">
            <input className="input-field" value={form.description} onChange={e => set('description', e.target.value)} />
          </MField>
          <div className="grid grid-cols-2 gap-4">
            <MField label="Categoría">
              <select className="input-field" value={form.category} onChange={e => set('category', e.target.value as OlfactoryFamily)}>
                {FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </MField>
            <MField label="Género">
              <select className="input-field" value={form.gender} onChange={e => set('gender', e.target.value as Gender)}>
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </MField>
          </div>
          <MField label="URL imagen principal">
            <input className="input-field" value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://..." />
          </MField>

          {/* Sizes */}
          <div>
            <label className="block font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-3">
              Tamaños y precios
            </label>
            <div className="space-y-2">
              {form.sizes.map((s, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <input
                    type="number"
                    className="input-field w-24"
                    value={s.ml}
                    onChange={e => updateSize(i, 'ml', Number(e.target.value))}
                    placeholder="ml"
                  />
                  <input
                    type="number"
                    className="input-field flex-1"
                    value={s.price}
                    onChange={e => updateSize(i, 'price', Number(e.target.value))}
                    placeholder="Precio"
                  />
                  {form.sizes.length > 1 && (
                    <button
                      onClick={() => setForm(f => ({ ...f, sizes: f.sizes.filter((_, j) => j !== i) }))}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <X size={14} strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setForm(f => ({ ...f, sizes: [...f.sizes, { ml: 0, price: 0 }] }))}
                className="flex items-center gap-1 font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray hover:text-luxury-black transition-colors"
              >
                <Plus size={12} strokeWidth={1.5} />
                Añadir talla
              </button>
            </div>
          </div>

          {/* Flags */}
          <div className="flex gap-6">
            {([
              { field: 'inStock', label: 'En stock' },
              { field: 'isNew', label: 'Nuevo' },
              { field: 'isFeatured', label: 'Destacado' },
            ] as { field: 'inStock' | 'isNew' | 'isFeatured'; label: string }[]).map(f => (
              <label key={f.field} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!form[f.field]}
                  onChange={e => set(f.field, e.target.checked)}
                  className="accent-gold"
                />
                <span className="font-sans font-light text-xs text-luxury-gray">{f.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
          <button onClick={onClose} className="btn-secondary text-xs px-6">Cancelar</button>
          <button
            onClick={() => { if (form.name && form.brand) onSave(form); }}
            className="btn-primary text-xs px-6 flex items-center gap-2"
          >
            <Save size={14} strokeWidth={1.5} />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

function MField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-sans font-light text-[10px] tracking-widest uppercase text-luxury-lightgray mb-2">{label}</label>
      {children}
    </div>
  );
}
