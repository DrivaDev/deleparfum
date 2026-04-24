import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore, Product, ProductSize } from '../types';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, size: ProductSize) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          item => item.product.id === product.id && item.selectedSize.ml === size.ml
        );

        if (existingIndex >= 0) {
          const updated = [...items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
          set({ items: updated, isOpen: true });
        } else {
          set({
            items: [...items, { product, quantity: 1, selectedSize: size }],
            isOpen: true,
          });
        }
      },

      removeItem: (productId: string, sizeMl: number) => {
        set(state => ({
          items: state.items.filter(
            item => !(item.product.id === productId && item.selectedSize.ml === sizeMl)
          ),
        }));
      },

      updateQuantity: (productId: string, sizeMl: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId, sizeMl);
          return;
        }
        set(state => ({
          items: state.items.map(item =>
            item.product.id === productId && item.selectedSize.ml === sizeMl
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.selectedSize.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'elixir-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
