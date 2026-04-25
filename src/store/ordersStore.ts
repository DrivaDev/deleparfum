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
  itemDetails: { name: string; size: number; qty: number; price: number }[];
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
  { id: 'DLP-001', customer: 'Valentina Martínez', email: 'vale@email.com', phone: '+54 11 1234-5678', address: 'Av. Corrientes 1234', city: 'Buenos Aires', province: 'CABA', postalCode: '1414', items: 2, itemDetails: [], total: 145000, status: 'entregado',  date: '2026-04-20', paymentMethod: 'transferencia' },
  { id: 'DLP-002', customer: 'Santiago López',     email: 'santi@email.com', phone: '+54 11 2345-6789', address: 'Av. Santa Fe 567',  city: 'Buenos Aires', province: 'CABA', postalCode: '1059', items: 1, itemDetails: [], total: 89500,  status: 'en_camino', date: '2026-04-22', paymentMethod: 'transferencia' },
  { id: 'DLP-003', customer: 'Camila Rodríguez',   email: 'cami@email.com',  phone: '+54 11 3456-7890', address: 'Sarmiento 890',      city: 'Rosario',      province: 'Santa Fe',    postalCode: '2000', items: 3, itemDetails: [], total: 234500, status: 'procesando', date: '2026-04-23', paymentMethod: 'transferencia' },
  { id: 'DLP-004', customer: 'Matías García',      email: 'mati@email.com',  phone: '+54 11 4567-8901', address: 'Belgrano 456',       city: 'Córdoba',      province: 'Córdoba',     postalCode: '5000', items: 1, itemDetails: [], total: 49500,  status: 'cancelado',  date: '2026-04-19', paymentMethod: 'transferencia' },
  { id: 'DLP-005', customer: 'Lucía Fernández',    email: 'luci@email.com',  phone: '+54 11 5678-9012', address: 'Italia 123',          city: 'Mendoza',      province: 'Mendoza',     postalCode: '5500', items: 2, itemDetails: [], total: 179000, status: 'procesando', date: '2026-04-24', paymentMethod: 'transferencia' },
  { id: 'DLP-006', customer: 'Tomás Peralta',      email: 'tomas@email.com', phone: '+54 11 6789-0123', address: 'San Martín 789',      city: 'Tucumán',      province: 'Tucumán',     postalCode: '4000', items: 4, itemDetails: [], total: 320000, status: 'entregado',  date: '2026-03-15', paymentMethod: 'transferencia' },
  { id: 'DLP-007', customer: 'Florencia Ríos',     email: 'flor@email.com',  phone: '+54 11 7890-1234', address: 'Mitre 321',            city: 'La Plata',     province: 'Buenos Aires',postalCode: '1900', items: 1, itemDetails: [], total: 98000,  status: 'entregado',  date: '2026-02-10', paymentMethod: 'transferencia' },
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
