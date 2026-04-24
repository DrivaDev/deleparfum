import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, Package, ShoppingBag, Plus, Edit2, Trash2, X, Save,
  DollarSign, Tag, Clock, CheckCircle2, Truck, XCircle,
  AlertCircle, ImagePlus, Percent, Hash, ChevronDown,
  ArrowUpRight, ExternalLink,
} from 'lucide-react';
import { products as initialProducts } from '../data/products';
import { Product, OlfactoryFamily, Gender, ProductSize } from '../types';
import { formatPrice } from '../store/cartStore';

type Tab = 'dashboard' | 'products' | 'orders' | 'discounts';
type Period = '24h' | '7d' | '30d' | '90d' | '365d';

const PERIOD_LABELS: Record<Period, string> = {
  '24h': 'Últimas 24hs',
  '7d': 'Última semana',
  '30d': 'Último mes',
  '90d': 'Últimos 3 meses',
  '365d': 'Este año',
};

const NOW = new Date('2026-04-24');
function daysAgo(d: string) {
  return (NOW.getTime() - new Date(d).getTime()) / 86_400_000;
}

const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Valentina Martínez', email: 'vale@email.com', total: 145000, status: 'entregado', date: '2026-04-20', items: 2 },
  { id: 'ORD-002', customer: 'Santiago López',     email: 'santi@email.com', total: 89500,  status: 'en_camino', date: '2026-04-22', items: 1 },
  { id: 'ORD-003', customer: 'Camila Rodríguez',   email: 'cami@email.com',  total: 234500, status: 'procesando', date: '2026-04-23', items: 3 },
  { id: 'ORD-004', customer: 'Matías García',      email: 'mati@email.com',  total: 49500,  status: 'cancelado',  date: '2026-04-19', items: 1 },
  { id: 'ORD-005', customer: 'Lucía Fernández',    email: 'luci@email.com',  total: 179000, status: 'procesando', date: '2026-04-24', items: 2 },
  { id: 'ORD-006', customer: 'Tomás Peralta',      email: 'tomas@email.com', total: 320000, status: 'entregado',  date: '2026-03-15', items: 4 },
  { id: 'ORD-007', customer: 'Florencia Ríos',     email: 'flor@email.com',  total: 98000,  status: 'entregado',  date: '2026-02-10', items: 1 },
];

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
  { id: '2', code: 'VERANO10K',    type: 'fijo',       value: 10000, expiry: '2026-05-01', maxUses: 50,  usedCount: 50, active: false },
];

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string; icon: React.ElementType }> = {
  procesando: { label: 'Procesando', bg: 'bg-amber-50',   text: 'text-amber-700',  border: 'border-amber-300', icon: Clock },
  en_camino:  { label: 'En camino',  bg: 'bg-blue-50',    text: 'text-blue-700',   border: 'border-blue-300',  icon: Truck },
  entregado:  { label: 'Entregado',  bg: 'bg-emerald-50', text: 'text-emerald-700',border: 'border-emerald-300',icon: CheckCircle2 },
  cancelado:  { label: 'Cancelado',  bg: 'bg-red-50',     text: 'text-red-700',    border: 'border-red-300',   icon: XCircle },
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

const PERIOD_DAYS: Record<Period, number> = { '24h': 1, '7d': 7, '30d': 30, '90d': 90, '365d': 365 };

export default function Admin() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [period, setPeriod] = useState<Period>('30d');
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>(INITIAL_CODES);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [newCodeOpen, setNewCodeOpen] = useState(false);

  const filteredOrders = orders.filter(o => daysAgo(o.date) <= PERIOD_DAYS[period]);
  const revenue = filteredOrders.filter(o => o.status !== 'cancelado').reduce((s, o) => s + o.total, 0);
  const activeOrders = filteredOrders.filter(o => o.status === 'procesando' || o.status === 'en_camino').length;
  const delivered = filteredOrders.filter(o => o.status === 'entregado').length;

  const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard',  label: 'Dashboard',  icon: BarChart3 },
    { id: 'products',   label: 'Productos',  icon: Package },
    { id: 'orders',     label: 'Pedidos',    icon: ShoppingBag },
    { id: 'discounts',  label: 'Descuentos', icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-60 bg-[#1A1A1A] text-white flex flex-col flex-shrink-0 shadow-xl">
        <div className="px-6 py-7 border-b border-white/10">
          <p className="font-serif text-xl text-[#C9A96E] tracking-wide">ÉLIXIR</p>
          <p className="text-[10px] text-white/30 tracking-[0.25em] uppercase mt-0.5">Panel de Administración</p>
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
                  active
                    ? 'bg-[#C9A96E]/15 text-[#C9A96E] font-normal'
                    : 'text-white/45 hover:text-white/80 hover:bg-white/5 font-light'
                }`}
              >
                <Icon size={15} strokeWidth={active ? 2 : 1.5} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-5 border-t border-white/10 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] text-white/35 hover:text-white/60 hover:bg-white/5 transition-all"
          >
            <ExternalLink size={12} strokeWidth={1.5} />
            Ver sitio
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="font-serif text-xl text-[#1A1A1A]">
              {navItems.find(n => n.id === tab)?.label}
            </h1>
          </div>
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
              {/* Period filter */}
              <div className="flex items-center gap-2">
                {(Object.entries(PERIOD_LABELS) as [Period, string][]).map(([p, label]) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-4 py-1.5 rounded-full text-[11px] tracking-wide transition-all ${
                      period === p
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-400'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Ingresos', value: formatPrice(revenue), icon: DollarSign, accent: '#059669', sub: `${filteredOrders.filter(o=>o.status!=='cancelado').length} pedidos` },
                  { label: 'Pedidos activos', value: String(activeOrders), icon: ShoppingBag, accent: '#2563EB', sub: 'procesando + en camino' },
                  { label: 'Entregados', value: String(delivered), icon: CheckCircle2, accent: '#7C3AED', sub: `en ${PERIOD_LABELS[period].toLowerCase()}` },
                  { label: 'Productos', value: String(productList.length), icon: Package, accent: '#C9A96E', sub: `${productList.filter(p=>p.inStock).length} en stock` },
                ].map(card => {
                  const Icon = card.icon;
                  return (
                    <div key={card.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ background: card.accent + '18' }}
                        >
                          <Icon size={16} strokeWidth={1.5} style={{ color: card.accent }} />
                        </div>
                        <ArrowUpRight size={13} className="text-gray-300" />
                      </div>
                      <p className="font-serif text-2xl text-[#1A1A1A] mb-1">{card.value}</p>
                      <p className="text-[10px] text-gray-400 font-light">{card.label}</p>
                      <p className="text-[10px] text-gray-300 font-light mt-0.5">{card.sub}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Recent orders */}
                <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm">
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

                {/* Status breakdown */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-50">
                    <h2 className="font-serif text-base text-[#1A1A1A]">Estado de pedidos</h2>
                    <p className="text-[10px] text-gray-400 mt-0.5">{PERIOD_LABELS[period]}</p>
                  </div>
                  <div className="px-6 py-4 space-y-3">
                    {Object.entries(STATUS_CONFIG).map(([key, s]) => {
                      const SIcon = s.icon;
                      const count = filteredOrders.filter(o => o.status === key).length;
                      const pct = filteredOrders.length > 0 ? Math.round(count / filteredOrders.length * 100) : 0;
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <SIcon size={12} strokeWidth={1.5} className={s.text} />
                              <span className={`text-[11px] font-light ${s.text}`}>{s.label}</span>
                            </div>
                            <span className="text-[11px] text-gray-500">{count}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${s.bg.replace('bg-', 'bg-').replace('-50', '-400')}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-6 py-4 border-t border-gray-50">
                    <h3 className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Top productos</h3>
                    <ul className="space-y-2.5">
                      {productList.filter(p => p.isFeatured).slice(0, 3).map(p => (
                        <li key={p.id} className="flex items-center gap-2">
                          <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] text-[#1A1A1A] truncate">{p.name}</p>
                          </div>
                          <p className="text-[11px] text-gray-500">{formatPrice(p.price)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <span className="text-xs text-gray-500 font-light">{p.brand}</span>
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          <span className="text-xs text-gray-400 font-light capitalize">{p.category}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div>
                            <p className="text-xs text-[#1A1A1A]">{formatPrice(p.price)}</p>
                            {p.originalPrice && (
                              <p className="text-[10px] text-gray-300 line-through">{formatPrice(p.originalPrice)}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-center hidden sm:table-cell">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-light ${
                            p.inStock ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-emerald-400' : 'bg-red-400'}`} />
                            {p.inStock ? 'En stock' : 'Sin stock'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => { setEditing(p); setIsNew(false); }}
                              className="p-2 text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 rounded-lg transition-all"
                              aria-label="Editar"
                            >
                              <Edit2 size={13} strokeWidth={1.5} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(p.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              aria-label="Eliminar"
                            >
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
              {/* Status filter summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(STATUS_CONFIG).map(([key, s]) => {
                  const SIcon = s.icon;
                  const count = orders.filter(o => o.status === key).length;
                  return (
                    <div key={key} className={`rounded-xl border p-4 flex items-center gap-3 ${s.bg} ${s.border}`}>
                      <SIcon size={18} strokeWidth={1.5} className={s.text} />
                      <div>
                        <p className={`font-serif text-xl leading-none ${s.text}`}>{count}</p>
                        <p className={`text-[10px] font-light mt-0.5 ${s.text} opacity-70`}>{s.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="px-5 py-3.5 text-left text-[10px] font-light tracking-widest uppercase text-gray-400">Pedido</th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-light tracking-widest uppercase text-gray-400 hidden md:table-cell">Email</th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-light tracking-widest uppercase text-gray-400 hidden lg:table-cell">Fecha</th>
                      <th className="px-5 py-3.5 text-center text-[10px] font-light tracking-widest uppercase text-gray-400 hidden sm:table-cell">Items</th>
                      <th className="px-5 py-3.5 text-right text-[10px] font-light tracking-widest uppercase text-gray-400">Total</th>
                      <th className="px-5 py-3.5 text-center text-[10px] font-light tracking-widest uppercase text-gray-400">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.map(o => {
                      const s = STATUS_CONFIG[o.status];
                      const SIcon = s?.icon ?? AlertCircle;
                      return (
                        <tr key={o.id} className="hover:bg-gray-50/60 transition-colors">
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
                          <td className="px-5 py-4 text-center hidden sm:table-cell">
                            <span className="text-xs text-gray-500">{o.items}</span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span className="text-sm font-serif text-[#1A1A1A]">{formatPrice(o.total)}</span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex justify-center">
                              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-light ${s?.bg} ${s?.text} ${s?.border}`}>
                                <SIcon size={11} strokeWidth={1.5} />
                                {s?.label}
                                <ChevronDown size={10} className="opacity-50" />
                                <select
                                  value={o.status}
                                  onChange={e => setOrders(prev => prev.map(ord => ord.id === o.id ? { ...ord, status: e.target.value } : ord))}
                                  className="absolute opacity-0 cursor-pointer w-full h-full inset-0"
                                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                                >
                                  <option value="procesando">Procesando</option>
                                  <option value="en_camino">En camino</option>
                                  <option value="entregado">Entregado</option>
                                  <option value="cancelado">Cancelado</option>
                                </select>
                              </div>
                            </div>
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
                <p className="text-sm text-gray-400 font-light">{discountCodes.length} códigos configurados</p>
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
                  const expired = new Date(code.expiry) < NOW;
                  const exhausted = code.usedCount >= code.maxUses;
                  const usagePct = Math.min(100, Math.round(code.usedCount / code.maxUses * 100));
                  return (
                    <div key={code.id} className={`bg-white rounded-xl border shadow-sm p-5 transition-all ${
                      code.active && !expired && !exhausted ? 'border-gray-100' : 'border-gray-100 opacity-60'
                    }`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0">
                            {code.type === 'porcentaje' ? (
                              <Percent size={18} strokeWidth={1.5} className="text-[#C9A96E]" />
                            ) : (
                              <Hash size={18} strokeWidth={1.5} className="text-[#C9A96E]" />
                            )}
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
                              {' · '}
                              Vence {code.expiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={code.active}
                              onChange={e => setDiscountCodes(prev => prev.map(c => c.id === code.id ? { ...c, active: e.target.checked } : c))}
                            />
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#C9A96E] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow after:transition-all peer-checked:after:translate-x-4" />
                          </label>
                          <button
                            onClick={() => setDiscountCodes(prev => prev.filter(c => c.id !== code.id))}
                            className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
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
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${usagePct >= 100 ? 'bg-red-400' : usagePct >= 70 ? 'bg-amber-400' : 'bg-[#C9A96E]'}`}
                            style={{ width: `${usagePct}%` }}
                          />
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

      {/* ── Product modal ── */}
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

      {/* ── Delete confirm ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-lg text-[#1A1A1A] text-center mb-2">¿Eliminar producto?</h3>
            <p className="text-sm text-gray-400 text-center font-light mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button
                onClick={() => { setProductList(prev => prev.filter(p => p.id !== deleteConfirm)); setDeleteConfirm(null); }}
                className="flex-1 bg-red-500 text-white text-xs py-2.5 rounded-lg hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-200 text-xs py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
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

/* ── Product Modal ── */
function ProductModal({ product, isNew, onSave, onClose }: {
  product: Product;
  isNew: boolean;
  onSave: (p: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Product>(product);
  const [imagePreview, setImagePreview] = useState<string>(product.image || '');
  const [hasDiscount, setHasDiscount] = useState(!!product.originalPrice);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof Product, value: unknown) =>
    setForm(f => ({ ...f, [field]: value }));

  const updateSize = (i: number, field: keyof ProductSize, value: number) =>
    setForm(f => {
      const sizes = [...f.sizes];
      sizes[i] = { ...sizes[i], [field]: value };
      return { ...f, sizes };
    });

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const result = ev.target?.result as string;
      setImagePreview(result);
      set('image', result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl my-8 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <h2 className="font-serif text-lg text-[#1A1A1A]">{isNew ? 'Nuevo producto' : 'Editar producto'}</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 rounded-lg transition-all">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-7 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Image upload */}
          <div>
            <label className="block text-[10px] font-light tracking-widest uppercase text-gray-400 mb-2">Imagen del producto</label>
            <div className="flex gap-4 items-start">
              <div
                className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer hover:border-[#C9A96E] transition-colors group"
                onClick={() => fileRef.current?.click()}
              >
                {imagePreview
                  ? <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                  : <div className="text-center p-2">
                      <ImagePlus size={20} strokeWidth={1} className="text-gray-300 mx-auto mb-1 group-hover:text-[#C9A96E] transition-colors" />
                      <p className="text-[9px] text-gray-300">Subir</p>
                    </div>
                }
              </div>
              <div className="flex-1 space-y-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 text-[11px] text-[#1A1A1A] border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full justify-center"
                >
                  <ImagePlus size={13} strokeWidth={1.5} />
                  Subir JPG / PNG
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleImageFile}
                  className="hidden"
                />
                <p className="text-[10px] text-gray-400 text-center">— o —</p>
                <input
                  className="w-full text-[11px] border border-gray-200 rounded-lg px-3 py-2 text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E]"
                  value={form.image.startsWith('data:') ? '' : form.image}
                  onChange={e => { set('image', e.target.value); setImagePreview(e.target.value); }}
                  placeholder="URL de imagen (https://...)"
                />
              </div>
            </div>
          </div>

          {/* Name / Brand */}
          <div className="grid grid-cols-2 gap-4">
            <MField label="Nombre">
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors" value={form.name} onChange={e => set('name', e.target.value)} />
            </MField>
            <MField label="Marca">
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors" value={form.brand} onChange={e => set('brand', e.target.value)} />
            </MField>
          </div>

          {/* Description */}
          <MField label="Descripción corta">
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors" value={form.description} onChange={e => set('description', e.target.value)} />
          </MField>

          {/* Category / Gender */}
          <div className="grid grid-cols-2 gap-4">
            <MField label="Categoría">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors" value={form.category} onChange={e => set('category', e.target.value as OlfactoryFamily)}>
                {FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </MField>
            <MField label="Género">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors" value={form.gender} onChange={e => set('gender', e.target.value as Gender)}>
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
                  <input
                    type="number"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors w-20 text-center"
                    value={s.ml}
                    onChange={e => updateSize(i, 'ml', Number(e.target.value))}
                    placeholder="ml"
                  />
                  <span className="text-[11px] text-gray-400">ml</span>
                  <input
                    type="number"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors flex-1"
                    value={s.price}
                    onChange={e => updateSize(i, 'price', Number(e.target.value))}
                    placeholder="Precio $"
                  />
                  {form.sizes.length > 1 && (
                    <button
                      onClick={() => setForm(f => ({ ...f, sizes: f.sizes.filter((_, j) => j !== i) }))}
                      className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"
                    >
                      <X size={12} strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setForm(f => ({ ...f, sizes: [...f.sizes, { ml: 0, price: 0 }] }))}
                className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-[#1A1A1A] transition-colors mt-1"
              >
                <Plus size={11} strokeWidth={2} />
                Añadir talla
              </button>
            </div>
          </div>

          {/* Discount */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={hasDiscount}
                onChange={e => {
                  setHasDiscount(e.target.checked);
                  if (!e.target.checked) set('originalPrice', undefined);
                }}
                className="accent-[#C9A96E] w-3.5 h-3.5"
              />
              <span className="text-[10px] font-light tracking-widest uppercase text-gray-400">Aplicar descuento</span>
            </label>
            {hasDiscount && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-4 items-end">
                <MField label="Precio original (sin desc.)">
                  <input
                    type="number"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    value={form.originalPrice ?? ''}
                    onChange={e => set('originalPrice', Number(e.target.value))}
                    placeholder="Ej: 120000"
                  />
                </MField>
                <MField label="Precio con descuento">
                  <input
                    type="number"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors"
                    value={form.price}
                    onChange={e => set('price', Number(e.target.value))}
                    placeholder="Ej: 89500"
                  />
                </MField>
                {form.originalPrice && form.price && form.originalPrice > form.price && (
                  <div className="mb-0.5 flex-shrink-0">
                    <span className="text-[11px] bg-red-100 text-red-600 px-2 py-1 rounded-lg font-light">
                      -{Math.round((1 - form.price / form.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            )}
            {!hasDiscount && (
              <MField label="Precio">
                <input
                  type="number"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors"
                  value={form.price}
                  onChange={e => set('price', Number(e.target.value))}
                />
              </MField>
            )}
          </div>

          {/* Flags */}
          <div className="flex gap-4 pt-1">
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
                  className="accent-[#C9A96E] w-3.5 h-3.5"
                />
                <span className="text-xs text-gray-500 font-light">{f.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 px-7 py-5 border-t border-gray-100 bg-gray-50/50">
          <button onClick={onClose} className="px-5 py-2.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
            Cancelar
          </button>
          <button
            onClick={() => { if (form.name && form.brand) onSave(form); }}
            className="flex items-center gap-2 px-5 py-2.5 text-xs bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] transition-colors"
          >
            <Save size={13} strokeWidth={1.5} />
            Guardar producto
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── New Discount Code Modal ── */
function NewCodeModal({ onSave, onClose }: {
  onSave: (c: Omit<DiscountCode, 'id' | 'usedCount'>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<DiscountCode, 'id' | 'usedCount'>>({
    code: '', type: 'porcentaje', value: 10, expiry: '', maxUses: 100, active: true,
  });

  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <h2 className="font-serif text-lg text-[#1A1A1A]">Nuevo código de descuento</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 rounded-lg transition-all">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
        <div className="px-7 py-6 space-y-4">
          <MField label="Código">
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors uppercase tracking-widest font-mono"
              value={form.code}
              onChange={e => set('code', e.target.value.toUpperCase().replace(/\s/g, ''))}
              placeholder="PROMO20"
            />
          </MField>
          <div className="grid grid-cols-2 gap-4">
            <MField label="Tipo">
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors" value={form.type} onChange={e => set('type', e.target.value as 'porcentaje' | 'fijo')}>
                <option value="porcentaje">Porcentaje (%)</option>
                <option value="fijo">Monto fijo ($)</option>
              </select>
            </MField>
            <MField label={form.type === 'porcentaje' ? 'Descuento (%)' : 'Descuento ($)'}>
              <input
                type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors"
                value={form.value}
                onChange={e => set('value', Number(e.target.value))}
                min={1}
                max={form.type === 'porcentaje' ? 100 : undefined}
              />
            </MField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MField label="Fecha de vencimiento">
              <input
                type="date"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors"
                value={form.expiry}
                onChange={e => set('expiry', e.target.value)}
              />
            </MField>
            <MField label="Usos máximos">
              <input
                type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#C9A96E] transition-colors"
                value={form.maxUses}
                onChange={e => set('maxUses', Number(e.target.value))}
                min={1}
              />
            </MField>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-7 py-5 border-t border-gray-100 bg-gray-50/50">
          <button onClick={onClose} className="px-5 py-2.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
            Cancelar
          </button>
          <button
            onClick={() => { if (form.code && form.expiry) onSave(form); }}
            className="flex items-center gap-2 px-5 py-2.5 text-xs bg-[#1A1A1A] text-white rounded-lg hover:bg-[#333] transition-colors"
          >
            <Tag size={13} strokeWidth={1.5} />
            Crear código
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
