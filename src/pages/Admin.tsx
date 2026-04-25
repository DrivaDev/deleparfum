import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, Package, ShoppingBag, Plus, Edit2, Trash2, X, Save,
  DollarSign, Tag, Clock, CheckCircle2, Truck, XCircle,
  AlertCircle, ImagePlus, Percent, Hash,
  ArrowUpRight, ExternalLink, Search,
} from 'lucide-react';
import { products as initialProducts } from '../data/products';
import { Product, OlfactoryFamily, Gender, ProductSize } from '../types';
import { formatPrice } from '../store/cartStore';
import { useOrdersStore, Order } from '../store/ordersStore';

type Tab = 'dashboard' | 'products' | 'orders' | 'discounts';
type Granularity = 'hora' | 'dia' | 'semana' | 'mes' | 'trimestre';

const GRAN_LABELS: Record<Granularity, string> = {
  hora: 'Por hora',
  dia: 'Por día',
  semana: 'Por semana',
  mes: 'Por mes',
  trimestre: 'Por trimestre',
};

// Build chart buckets from orders
function buildBuckets(orders: Order[], gran: Granularity): { label: string; revenue: number; count: number }[] {
  const now = new Date();

  const getBucketKey = (dateStr: string): string => {
    const d = new Date(dateStr);
    if (gran === 'hora') return `${d.getHours()}:00`;
    if (gran === 'dia') return ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'][d.getDay()];
    if (gran === 'semana') return `S${Math.ceil(d.getDate() / 7)}`;
    if (gran === 'mes') return ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][d.getMonth()];
    // trimestre
    return `T${Math.ceil((d.getMonth() + 1) / 3)}`;
  };

  const cutoff = new Date(now);
  if (gran === 'hora') cutoff.setDate(cutoff.getDate() - 1);
  else if (gran === 'dia') cutoff.setDate(cutoff.getDate() - 7);
  else if (gran === 'semana') cutoff.setDate(cutoff.getDate() - 28);
  else if (gran === 'mes') cutoff.setFullYear(cutoff.getFullYear() - 1);
  else cutoff.setFullYear(cutoff.getFullYear() - 1);

  const map = new Map<string, { revenue: number; count: number }>();
  orders
    .filter(o => o.status !== 'cancelado' && new Date(o.date) >= cutoff)
    .forEach(o => {
      const key = getBucketKey(o.date);
      const prev = map.get(key) ?? { revenue: 0, count: 0 };
      map.set(key, { revenue: prev.revenue + o.total, count: prev.count + 1 });
    });

  return Array.from(map.entries()).map(([label, v]) => ({ label, ...v }));
}

interface DiscountCode {
  id: string;
  code: string;
  type: 'porcentaje' | 'fijo';
  value: number;
  expiry: string;
  maxUses: number;
  usedCount: number;
  active: boolean;
}

const INITIAL_CODES: DiscountCode[] = [
  { id: '1', code: 'BIENVENIDA20', type: 'porcentaje', value: 20, expiry: '2026-06-30', maxUses: 100, usedCount: 34, active: true },
  { id: '2', code: 'VERANO10K',    type: 'fijo', value: 10000, expiry: '2026-05-01', maxUses: 50, usedCount: 50, active: false },
];

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string; icon: React.ElementType }> = {
  procesando: { label: 'Procesando', bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-300',  icon: Clock },
  en_camino:  { label: 'En camino',  bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-300',   icon: Truck },
  entregado:  { label: 'Entregado',  bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300', icon: CheckCircle2 },
  cancelado:  { label: 'Cancelado',  bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-300',    icon: XCircle },
};

const FAMILIES: OlfactoryFamily[] = ['floral', 'amaderada', 'oriental', 'fresca', 'chipre', 'fougere'];
const GENDERS: Gender[] = ['women', 'men', 'unisex'];

const blankProduct = (): Omit<Product, 'id'> => ({
  name: '', brand: '', description: '', longDescription: '',
  notes: { top: [], heart: [], base: [] },
  price: 0, originalPrice: undefined,
  category: 'floral', gender: 'unisex',
  sizes: [{ ml: 50, price: 0 }],
  image: '', images: [],
  rating: 5, reviews: 0,
  inStock: true, isNew: false, isFeatured: false, tags: [],
});

// Simple SVG bar chart
function BarChart({ data, valueKey, color }: {
  data: { label: string; revenue: number; count: number }[];
  valueKey: 'revenue' | 'count';
  color: string;
}) {
  if (data.length === 0) {
    return <div className="h-24 flex items-center justify-center text-[10px] text-gray-300">Sin datos en este período</div>;
  }
  const values = data.map(d => d[valueKey]);
  const max = Math.max(...values, 1);
  const w = 100 / data.length;

  return (
    <div className="pt-2">
      <svg viewBox={`0 0 100 30`} className="w-full h-20" preserveAspectRatio="none">
        {data.map((d, i) => {
          const h = (d[valueKey] / max) * 24;
          const x = i * w + w * 0.1;
          const barW = w * 0.8;
          return (
            <rect
              key={i}
              x={x}
              y={24 - h}
              width={barW}
              height={h}
              fill={color}
              opacity="0.8"
              rx="0.5"
            />
          );
        })}
      </svg>
      <div className="flex" style={{ gap: 0 }}>
        {data.map((d, i) => (
          <div key={i} className="text-center flex-1">
            <span className="text-[8px] text-gray-400">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [gran, setGran] = useState<Granularity>('dia');
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>(INITIAL_CODES);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);
  const [newCodeOpen, setNewCodeOpen] = useState(false);

  // Orders from global store
  const { orders, updateStatus, removeOrder } = useOrdersStore();

  // Orders tab filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  // Dashboard stats
  const nonCancelled = orders.filter(o => o.status !== 'cancelado');
  const totalRevenue = nonCancelled.reduce((s, o) => s + o.total, 0);
  const buckets = buildBuckets(orders, gran);

  const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products',  label: 'Productos', icon: Package },
    { id: 'orders',    label: 'Pedidos',   icon: ShoppingBag },
    { id: 'discounts', label: 'Descuentos',icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex font-sans">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1A1A1A] text-white flex flex-col flex-shrink-0 shadow-xl">
        <div className="px-6 py-7 border-b border-white/10">
          <p className="font-serif text-xl text-[#C9A96E] tracking-wide">De Leparfum</p>
          <p className="text-[10px] text-white/30 tracking-[0.25em] uppercase mt-0.5">Panel Admin</p>
        </div>
        <nav className="flex-1 px-3 py-5 space-y-0.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-xs tracking-wide transition-all duration-150 ${
                  active ? 'bg-[#C9A96E]/15 text-[#C9A96E]' : 'text-white/45 hover:text-white/80 hover:bg-white/5 font-light'
                }`}
              >
                <Icon size={15} strokeWidth={active ? 2 : 1.5} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-4 py-5 border-t border-white/10">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] text-white/35 hover:text-white/60 hover:bg-white/5 transition-all">
            <ExternalLink size={12} strokeWidth={1.5} />
            Ver sitio
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="font-serif text-xl text-[#1A1A1A]">{navItems.find(n => n.id === tab)?.label}</h1>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-400 font-light">Admin</span>
            <div className="w-8 h-8 rounded-full bg-[#C9A96E]/20 flex items-center justify-center">
              <span className="text-[11px] text-[#C9A96E] font-medium">A</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">

          {/* ── DASHBOARD ── */}
          {tab === 'dashboard' && (
            <div className="space-y-8">
              {/* Granularity filter */}
              <div className="flex items-center gap-2 flex-wrap">
                {(Object.entries(GRAN_LABELS) as [Granularity, string][]).map(([g, label]) => (
                  <button
                    key={g}
                    onClick={() => setGran(g)}
                    className={`px-4 py-1.5 rounded-full text-[11px] tracking-wide transition-all ${
                      gran === g ? 'bg-[#1A1A1A] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-400'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* 2 KPI + chart cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ingresos */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#05966918' }}>
                      <DollarSign size={16} strokeWidth={1.5} style={{ color: '#059669' }} />
                    </div>
                    <ArrowUpRight size={13} className="text-gray-300" />
                  </div>
                  <p className="font-serif text-3xl text-[#1A1A1A] mb-0.5">{formatPrice(totalRevenue)}</p>
                  <p className="text-[10px] text-gray-400 font-light mb-1">Ingresos totales</p>
                  <p className="text-[10px] text-gray-300 font-light">{nonCancelled.length} pedidos confirmados</p>
                  <BarChart data={buckets} valueKey="revenue" color="#059669" />
                </div>

                {/* Pedidos */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#2563EB18' }}>
                      <ShoppingBag size={16} strokeWidth={1.5} style={{ color: '#2563EB' }} />
                    </div>
                    <ArrowUpRight size={13} className="text-gray-300" />
                  </div>
                  <p className="font-serif text-3xl text-[#1A1A1A] mb-0.5">{orders.length}</p>
                  <p className="text-[10px] text-gray-400 font-light mb-1">Pedidos totales</p>
                  <p className="text-[10px] text-gray-300 font-light">
                    {orders.filter(o => o.status === 'procesando' || o.status === 'en_camino').length} activos
                  </p>
                  <BarChart data={buckets} valueKey="count" color="#2563EB" />
                </div>
              </div>

              {/* Recent orders */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                  <h2 className="font-serif text-base text-[#1A1A1A]">Pedidos recientes</h2>
                  <button onClick={() => setTab('orders')} className="text-[10px] text-[#C9A96E] hover:underline">Ver todos →</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {orders.slice(0, 5).map(o => {
                    const s = STATUS_CONFIG[o.status];
                    const SIcon = s?.icon ?? AlertCircle;
                    return (
                      <div key={o.id} className="flex items-center gap-4 px-6 py-3.5">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${s?.bg}`}>
                          <SIcon size={13} strokeWidth={1.5} className={s?.text} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#1A1A1A] truncate">{o.customer}</p>
                          <p className="text-[10px] text-gray-400">{o.id} · {o.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-[#1A1A1A]">{formatPrice(o.total)}</p>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full border font-light ${s?.bg} ${s?.text} ${s?.border}`}>
                            {s?.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {tab === 'products' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400 font-light">{productList.length} productos</p>
                <button
                  onClick={() => { setEditing({ id: String(Date.now()), ...blankProduct() }); setIsNew(true); }}
                  className="flex items-center gap-2 bg-[#1A1A1A] text-white text-[11px] px-4 py-2.5 rounded-lg hover:bg-[#333] transition-colors"
                >
                  <Plus size={13} strokeWidth={2} />
                  Nuevo producto
                </button>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="px-5 py-3.5 text-left text-[10px] font-light tracking-widest uppercase text-gray-400">Producto</th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-light tracking-widest uppercase text-gray-400 hidden md:table-cell">Marca</th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-light tracking-widest uppercase text-gray-400 hidden lg:table-cell">Categoría</th>
                      <th className="px-5 py-3.5 text-right text-[10px] font-light tracking-widest uppercase text-gray-400">Precio</th>
                      <th className="px-5 py-3.5 text-center text-[10px] font-light tracking-widest uppercase text-gray-400 hidden sm:table-cell">Stock</th>
                      <th className="px-5 py-3.5" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {productList.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/60 transition-colors group">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                              {p.image
                                ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                : <div className="w-full h-full flex items-center justify-center text-gray-300"><Package size={16} /></div>
                              }
                            </div>
                            <div>
                              <p className="text-sm text-[#1A1A1A] font-serif">{p.name}</p>
                              <div className="flex gap-1.5 mt-0.5">
                                {p.isNew && <span className="text-[9px] text-[#C9A96E] border border-[#C9A96E]/40 px-1.5 py-0.5 rounded">Nuevo</span>}
                                {p.isFeatured && <span className="text-[9px] text-purple-500 border border-purple-200 px-1.5 py-0.5 rounded">Destacado</span>}
                                {p.originalPrice && <span className="text-[9px] text-red-500 border border-red-200 px-1.5 py-0.5 rounded">Descuento</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell"><span className="text-xs text-gray-500 font-light">{p.brand}</span></td>
                        <td className="px-5 py-3.5 hidden lg:table-cell"><span className="text-xs text-gray-400 font-light capitalize">{p.category}</span></td>
                        <td className="px-5 py-3.5 text-right">
                          <p className="text-xs text-[#1A1A1A]">{formatPrice(p.price)}</p>
                          {p.originalPrice && <p className="text-[10px] text-gray-300 line-through">{formatPrice(p.originalPrice)}</p>}
                        </td>
                        <td className="px-5 py-3.5 text-center hidden sm:table-cell">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-light ${p.inStock ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-emerald-400' : 'bg-red-400'}`} />
                            {p.inStock ? 'En stock' : 'Sin stock'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditing(p); setIsNew(false); }} className="p-2 text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 rounded-lg transition-all" aria-label="Editar">
                              <Edit2 size={13} strokeWidth={1.5} />
                            </button>
                            <button onClick={() => setDeleteProductId(p.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" aria-label="Eliminar">
                              <Trash2 size={13} strokeWidth={1.5} />
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

          {/* ── ORDERS ── */}
          {tab === 'orders' && (
            <div className="space-y-5">
              {/* Status cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(STATUS_CONFIG).map(([key, s]) => {
                  const SIcon = s.icon;
                  const count = orders.filter(o => o.status === key).length;
                  return (
                    <button
                      key={key}
                      onClick={() => setStatusFilter(statusFilter === key ? 'all' : key)}
                      className={`rounded-xl border p-4 flex items-center gap-3 transition-all ${s.bg} ${s.border} ${statusFilter === key ? 'ring-2 ring-offset-1' : 'opacity-80 hover:opacity-100'}`}
                    >
                      <SIcon size={18} strokeWidth={1.5} className={s.text} />
                      <div className="text-left">
                        <p className={`font-serif text-xl leading-none ${s.text}`}>{count}</p>
                        <p className={`text-[10px] font-light mt-0.5 ${s.text} opacity-70`}>{s.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Search + filter toolbar */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
                  <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nombre o código..."
                    className="w-full pl-8 pr-4 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A96E] bg-white"
                  />
                </div>
                {(statusFilter !== 'all' || searchQuery) && (
                  <button
                    onClick={() => { setStatusFilter('all'); setSearchQuery(''); }}
                    className="text-[11px] text-gray-400 hover:text-[#1A1A1A] flex items-center gap-1 transition-colors"
                  >
                    <X size={12} /> Limpiar
                  </button>
                )}
                <p className="text-[11px] text-gray-400 ml-auto">{filteredOrders.length} pedidos</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="px-5 py-3.5 text-left text-[10px] font-light tracking-widest uppercase text-gray-400">Pedido</th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-light tracking-widest uppercase text-gray-400 hidden md:table-cell">Email</th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-light tracking-widest uppercase text-gray-400 hidden lg:table-cell">Fecha</th>
                      <th className="px-5 py-3.5 text-right text-[10px] font-light tracking-widest uppercase text-gray-400">Total</th>
                      <th className="px-5 py-3.5 text-center text-[10px] font-light tracking-widest uppercase text-gray-400">Estado</th>
                      <th className="px-5 py-3.5" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-12 text-center text-xs text-gray-400">No hay pedidos que coincidan</td>
                      </tr>
                    ) : filteredOrders.map(o => {
                      const s = STATUS_CONFIG[o.status];
                      const SIcon = s?.icon ?? AlertCircle;
                      return (
                        <tr key={o.id} className="hover:bg-gray-50/60 transition-colors group">
                          <td className="px-5 py-4">
                            <p className="text-sm text-[#1A1A1A]">{o.customer}</p>
                            <p className="text-[10px] text-gray-400 font-light">{o.id}</p>
                          </td>
                          <td className="px-5 py-4 hidden md:table-cell">
                            <span className="text-xs text-gray-500 font-light">{o.email}</span>
                          </td>
                          <td className="px-5 py-4 hidden lg:table-cell">
                            <span className="text-xs text-gray-400 font-light">{o.date}</span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span className="text-sm font-serif text-[#1A1A1A]">{formatPrice(o.total)}</span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex justify-center">
                              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[10px] font-light ${s?.bg} ${s?.text} ${s?.border}`}>
                                <SIcon size={11} strokeWidth={1.5} />
                                <select
                                  value={o.status}
                                  onChange={e => updateStatus(o.id, e.target.value)}
                                  className={`bg-transparent border-none outline-none text-[10px] font-light cursor-pointer ${s?.text}`}
                                >
                                  <option value="procesando">Procesando</option>
                                  <option value="en_camino">En camino</option>
                                  <option value="entregado">Entregado</option>
                                  <option value="cancelado">Cancelado</option>
                                </select>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => setDeleteOrderId(o.id)}
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                              aria-label="Eliminar pedido"
                            >
                              <Trash2 size={13} strokeWidth={1.5} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── DISCOUNTS ── */}
          {tab === 'discounts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400 font-light">{discountCodes.length} códigos</p>
                <button
                  onClick={() => setNewCodeOpen(true)}
                  className="flex items-center gap-2 bg-[#1A1A1A] text-white text-[11px] px-4 py-2.5 rounded-lg hover:bg-[#333] transition-colors"
                >
                  <Plus size={13} strokeWidth={2} />
                  Nuevo código
                </button>
              </div>
              <div className="grid gap-4">
                {discountCodes.map(code => {
                  const expired = new Date(code.expiry) < new Date();
                  const exhausted = code.usedCount >= code.maxUses;
                  const usagePct = Math.min(100, Math.round(code.usedCount / code.maxUses * 100));
                  return (
                    <div key={code.id} className={`bg-white rounded-xl border border-gray-100 shadow-sm p-5 ${(!code.active || expired || exhausted) ? 'opacity-60' : ''}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0">
                            {code.type === 'porcentaje' ? <Percent size={18} strokeWidth={1.5} className="text-[#C9A96E]" /> : <Hash size={18} strokeWidth={1.5} className="text-[#C9A96E]" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-mono text-base text-[#1A1A1A] tracking-widest">{code.code}</p>
                              {expired && <span className="text-[9px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded">Expirado</span>}
                              {exhausted && !expired && <span className="text-[9px] bg-orange-50 text-orange-500 border border-orange-200 px-1.5 py-0.5 rounded">Agotado</span>}
                              {code.active && !expired && !exhausted && <span className="text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-1.5 py-0.5 rounded">Activo</span>}
                            </div>
                            <p className="text-xs text-gray-500 font-light">
                              {code.type === 'porcentaje' ? `${code.value}% de descuento` : `${formatPrice(code.value)} de descuento`}
                              {' · '}Vence {code.expiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={code.active}
                              onChange={e => setDiscountCodes(prev => prev.map(c => c.id === code.id ? { ...c, active: e.target.checked } : c))} />
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#C9A96E] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow after:transition-all peer-checked:after:translate-x-4" />
                          </label>
                          <button onClick={() => setDiscountCodes(prev => prev.filter(c => c.id !== code.id))} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                          <span>Uso: {code.usedCount} / {code.maxUses}</span>
                          <span>{usagePct}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 ${usagePct >= 100 ? 'bg-red-400' : usagePct >= 70 ? 'bg-amber-400' : 'bg-[#C9A96E]'}`} style={{ width: `${usagePct}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {newCodeOpen && (
                <NewCodeModal
                  onSave={code => { setDiscountCodes(prev => [...prev, { ...code, id: String(Date.now()), usedCount: 0 }]); setNewCodeOpen(false); }}
                  onClose={() => setNewCodeOpen(false)}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Product modal */}
      {editing && (
        <ProductModal
          product={editing}
          isNew={isNew}
          onSave={p => {
            if (isNew) setProductList(prev => [p, ...prev]);
            else setProductList(prev => prev.map(x => x.id === p.id ? p : x));
            setEditing(null);
          }}
          onClose={() => setEditing(null)}
        />
      )}

      {/* Delete product confirm */}
      {deleteProductId && (
        <ConfirmModal
          title="¿Eliminar producto?"
          onConfirm={() => { setProductList(prev => prev.filter(p => p.id !== deleteProductId)); setDeleteProductId(null); }}
          onClose={() => setDeleteProductId(null)}
        />
      )}

      {/* Delete order confirm */}
      {deleteOrderId && (
        <ConfirmModal
          title="¿Eliminar pedido?"
          onConfirm={() => { removeOrder(deleteOrderId); setDeleteOrderId(null); }}
          onClose={() => setDeleteOrderId(null)}
        />
      )}
    </div>
  );
}

function ConfirmModal({ title, onConfirm, onClose }: { title: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Trash2 size={20} className="text-red-500" strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-lg text-[#1A1A1A] text-center mb-2">{title}</h3>
        <p className="text-sm text-gray-400 text-center font-light mb-6">Esta acción no se puede deshacer.</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="flex-1 bg-red-500 text-white text-xs py-2.5 rounded-lg hover:bg-red-600 transition-colors">Eliminar</button>
          <button onClick={onClose} className="flex-1 border border-gray-200 text-xs py-2.5 rounded-lg hover:bg-gray-50 transition-colors">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, isNew, onSave, onClose }: {
  product: Product; isNew: boolean;
  onSave: (p: Product) => void; onClose: () => void;
}) {
  const [form, setForm] = useState<Product>(product);
  const [imagePreview, setImagePreview] = useState<string>(product.image || '');
  const [hasDiscount, setHasDiscount] = useState(!!product.originalPrice);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof Product, value: unknown) => setForm(f => ({ ...f, [field]: value }));

  const updateSize = (i: number, field: keyof ProductSize, value: number) =>
    setForm(f => { const sizes = [...f.sizes]; sizes[i] = { ...sizes[i], [field]: value }; return { ...f, sizes }; });

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { const r = ev.target?.result as string; setImagePreview(r); set('image', r); };
    reader.readAsDataURL(file);
  };

  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl my-8 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <h2 className="font-serif text-lg text-[#1A1A1A]">{isNew ? 'Nuevo producto' : 'Editar producto'}</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 rounded-lg transition-all"><X size={16} strokeWidth={1.5} /></button>
        </div>
        <div className="px-7 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Image */}
          <div>
            <label className="block text-[10px] font-light tracking-widest uppercase text-gray-400 mb-2">Imagen</label>
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer hover:border-[#C9A96E] transition-colors group" onClick={() => fileRef.current?.click()}>
                {imagePreview
                  ? <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                  : <div className="text-center p-2"><ImagePlus size={20} strokeWidth={1} className="text-gray-300 mx-auto mb-1 group-hover:text-[#C9A96E] transition-colors" /><p className="text-[9px] text-gray-300">Subir</p></div>
                }
              </div>
              <div className="flex-1 space-y-2">
                <button type="button" onClick={() => fileRef.current?.click()} className={`${inp} flex items-center justify-center gap-2`}><ImagePlus size={13} strokeWidth={1.5} />Subir JPG / PNG</button>
                <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleImageFile} className="hidden" />
                <p className="text-[10px] text-gray-400 text-center">— o —</p>
                <input className={inp} value={form.image.startsWith('data:') ? '' : form.image} onChange={e => { set('image', e.target.value); setImagePreview(e.target.value); }} placeholder="URL de imagen..." />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MField label="Nombre"><input className={inp} value={form.name} onChange={e => set('name', e.target.value)} /></MField>
            <MField label="Marca"><input className={inp} value={form.brand} onChange={e => set('brand', e.target.value)} /></MField>
          </div>
          <MField label="Descripción corta"><input className={inp} value={form.description} onChange={e => set('description', e.target.value)} /></MField>
          <div className="grid grid-cols-2 gap-4">
            <MField label="Categoría">
              <select className={inp} value={form.category} onChange={e => set('category', e.target.value as OlfactoryFamily)}>
                {FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </MField>
            <MField label="Género">
              <select className={inp} value={form.gender} onChange={e => set('gender', e.target.value as Gender)}>
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </MField>
          </div>
          {/* Sizes */}
          <div>
            <label className="block text-[10px] font-light tracking-widest uppercase text-gray-400 mb-2">Tamaños y precios</label>
            <div className="space-y-2">
              {form.sizes.map((s, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input type="number" className={`${inp} w-20 text-center`} value={s.ml} onChange={e => updateSize(i, 'ml', Number(e.target.value))} placeholder="ml" />
                  <span className="text-[11px] text-gray-400">ml</span>
                  <input type="number" className={`${inp} flex-1`} value={s.price} onChange={e => updateSize(i, 'price', Number(e.target.value))} placeholder="Precio $" />
                  {form.sizes.length > 1 && <button onClick={() => setForm(f => ({ ...f, sizes: f.sizes.filter((_, j) => j !== i) }))} className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"><X size={12} strokeWidth={1.5} /></button>}
                </div>
              ))}
              <button onClick={() => setForm(f => ({ ...f, sizes: [...f.sizes, { ml: 0, price: 0 }] }))} className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-[#1A1A1A] transition-colors mt-1"><Plus size={11} strokeWidth={2} />Añadir talla</button>
            </div>
          </div>
          {/* Discount */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input type="checkbox" checked={hasDiscount} onChange={e => { setHasDiscount(e.target.checked); if (!e.target.checked) set('originalPrice', undefined); }} className="accent-[#C9A96E] w-3.5 h-3.5" />
              <span className="text-[10px] font-light tracking-widest uppercase text-gray-400">Aplicar descuento</span>
            </label>
            {hasDiscount ? (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-4 items-end">
                <MField label="Precio original">
                  <input type="number" className={inp} value={form.originalPrice ?? ''} onChange={e => set('originalPrice', Number(e.target.value))} placeholder="120000" />
                </MField>
                <MField label="Precio con descuento">
                  <input type="number" className={inp} value={form.price} onChange={e => set('price', Number(e.target.value))} placeholder="89500" />
                </MField>
                {form.originalPrice && form.price && form.originalPrice > form.price && (
                  <div className="mb-0.5 flex-shrink-0">
                    <span className="text-[11px] bg-red-100 text-red-600 px-2 py-1 rounded-lg font-light">-{Math.round((1 - form.price / form.originalPrice) * 100)}%</span>
                  </div>
                )}
              </div>
            ) : (
              <MField label="Precio"><input type="number" className={inp} value={form.price} onChange={e => set('price', Number(e.target.value))} /></MField>
            )}
          </div>
          {/* Flags */}
          <div className="flex gap-4 pt-1">
            {([{ field: 'inStock', label: 'En stock' }, { field: 'isNew', label: 'Nuevo' }, { field: 'isFeatured', label: 'Destacado' }] as { field: 'inStock' | 'isNew' | 'isFeatured'; label: string }[]).map(f => (
              <label key={f.field} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!form[f.field]} onChange={e => set(f.field, e.target.checked)} className="accent-[#C9A96E] w-3.5 h-3.5" />
                <span className="text-xs text-gray-500 font-light">{f.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3 px-7 py-5 border-t border-gray-100 bg-gray-50/50">
          <button onClick={onClose} className="px-5 py-2.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">Cancelar</button>
          <button onClick={() => { if (form.name && form.brand) onSave(form); }} className="flex items-center gap-2 px-5 py-2.5 text-xs bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] transition-colors">
            <Save size={13} strokeWidth={1.5} />Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

function NewCodeModal({ onSave, onClose }: { onSave: (c: Omit<DiscountCode, 'id' | 'usedCount'>) => void; onClose: () => void }) {
  const [form, setForm] = useState<Omit<DiscountCode, 'id' | 'usedCount'>>({ code: '', type: 'porcentaje', value: 10, expiry: '', maxUses: 100, active: true });
  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) => setForm(f => ({ ...f, [k]: v }));
  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <h2 className="font-serif text-lg text-[#1A1A1A]">Nuevo código de descuento</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 rounded-lg"><X size={16} strokeWidth={1.5} /></button>
        </div>
        <div className="px-7 py-6 space-y-4">
          <MField label="Código"><input className={`${inp} uppercase tracking-widest font-mono`} value={form.code} onChange={e => set('code', e.target.value.toUpperCase().replace(/\s/g, ''))} placeholder="PROMO20" /></MField>
          <div className="grid grid-cols-2 gap-4">
            <MField label="Tipo">
              <select className={inp} value={form.type} onChange={e => set('type', e.target.value as 'porcentaje' | 'fijo')}>
                <option value="porcentaje">Porcentaje (%)</option>
                <option value="fijo">Monto fijo ($)</option>
              </select>
            </MField>
            <MField label={form.type === 'porcentaje' ? 'Descuento (%)' : 'Descuento ($)'}>
              <input type="number" className={inp} value={form.value} onChange={e => set('value', Number(e.target.value))} min={1} />
            </MField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MField label="Vencimiento"><input type="date" className={inp} value={form.expiry} onChange={e => set('expiry', e.target.value)} /></MField>
            <MField label="Usos máximos"><input type="number" className={inp} value={form.maxUses} onChange={e => set('maxUses', Number(e.target.value))} min={1} /></MField>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-7 py-5 border-t border-gray-100 bg-gray-50/50">
          <button onClick={onClose} className="px-5 py-2.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">Cancelar</button>
          <button onClick={() => { if (form.code && form.expiry) onSave(form); }} className="flex items-center gap-2 px-5 py-2.5 text-xs bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] transition-colors">
            <Tag size={13} strokeWidth={1.5} />Crear código
          </button>
        </div>
      </div>
    </div>
  );
}

function MField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-light tracking-widest uppercase text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
