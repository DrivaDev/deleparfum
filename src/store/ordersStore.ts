import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  items: number;
  itemDetails: { name: string; size: number; color?: string; qty: number; price: number }[];
  total: number;
  status: string;
  date: string;
  paymentMethod: string;
}

interface OrdersStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (id: string, status: string) => void;
  removeOrder: (id: string) => void;
}

const SEED_ORDERS: Order[] = [
  { id: 'TW-001', customer: 'Valentina Martínez', email: 'vale@email.com', phone: '+54 11 1234-5678', address: 'Av. Corrientes 1234', city: 'Buenos Aires', province: 'CABA', postalCode: '1414', items: 3, itemDetails: [{ name: 'THOR', size: 1, color: 'Gamuza', qty: 3, price: 14990 }], total: 44970, status: 'entregado',  date: '2026-04-20', paymentMethod: 'transferencia' },
  { id: 'TW-002', customer: 'Santiago López',     email: 'santi@email.com', phone: '+54 11 2345-6789', address: 'Av. Santa Fe 567',  city: 'Buenos Aires', province: 'CABA', postalCode: '1059', items: 2, itemDetails: [{ name: 'CUEROTEX', size: 1, color: 'Black', qty: 2, price: 6690 }], total: 13380, status: 'en_camino', date: '2026-04-22', paymentMethod: 'transferencia' },
  { id: 'TW-003', customer: 'Camila Rodríguez',   email: 'cami@email.com',  phone: '+54 11 3456-7890', address: 'Sarmiento 890',      city: 'Rosario',      province: 'Santa Fe',    postalCode: '2000', items: 5, itemDetails: [{ name: 'MECHA', size: 1, color: 'Petróleo', qty: 5, price: 12990 }], total: 64950, status: 'procesando', date: '2026-04-23', paymentMethod: 'transferencia' },
  { id: 'TW-004', customer: 'Matías García',      email: 'mati@email.com',  phone: '+54 11 4567-8901', address: 'Belgrano 456',       city: 'Córdoba',      province: 'Córdoba',     postalCode: '5000', items: 1, itemDetails: [{ name: 'SPAZIO', size: 1, color: 'Topo', qty: 1, price: 9890 }], total: 9890, status: 'cancelado',  date: '2026-04-19', paymentMethod: 'transferencia' },
  { id: 'TW-005', customer: 'Lucía Fernández',    email: 'luci@email.com',  phone: '+54 11 5678-9012', address: 'Italia 123',          city: 'Mendoza',      province: 'Mendoza',     postalCode: '5500', items: 4, itemDetails: [{ name: 'PANA MURANO', size: 1, color: 'Negro', qty: 4, price: 7100 }], total: 28400, status: 'procesando', date: '2026-04-24', paymentMethod: 'transferencia' },
  { id: 'TW-006', customer: 'Tomás Peralta',      email: 'tomas@email.com', phone: '+54 11 6789-0123', address: 'San Martín 789',      city: 'Tucumán',      province: 'Tucumán',     postalCode: '4000', items: 6, itemDetails: [{ name: 'MAUI', size: 1, color: 'Gris', qty: 6, price: 7390 }], total: 44340, status: 'entregado',  date: '2026-03-15', paymentMethod: 'transferencia' },
  { id: 'TW-007', customer: 'Florencia Ríos',     email: 'flor@email.com',  phone: '+54 11 7890-1234', address: 'Mitre 321',            city: 'La Plata',     province: 'Buenos Aires',postalCode: '1900', items: 2, itemDetails: [{ name: 'MICA', size: 1, color: 'Granate', qty: 2, price: 11990 }], total: 23980, status: 'entregado',  date: '2026-02-10', paymentMethod: 'transferencia' },
];

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: SEED_ORDERS,
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      updateStatus: (id, status) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),
      removeOrder: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),
    }),
    { name: 'dlp-orders' }
  )
);
