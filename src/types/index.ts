export interface OlfactoryNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductSize {
  ml: number;
  price: number;
}

export type OlfactoryFamily = 'floral' | 'amaderada' | 'oriental' | 'fresca' | 'chipre' | 'fougere';
export type Gender = 'women' | 'men' | 'unisex';

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  longDescription: string;
  notes: OlfactoryNotes;
  price: number;
  originalPrice?: number;
  category: OlfactoryFamily;
  gender: Gender;
  sizes: ProductSize[];
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: ProductSize;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: ProductSize) => void;
  removeItem: (productId: string, sizeMl: number) => void;
  updateQuantity: (productId: string, sizeMl: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface FilterState {
  categories: OlfactoryFamily[];
  genders: Gender[];
  priceMin: number;
  priceMax: number;
  brands: string[];
  search: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  paymentMethod: 'debito' | 'credito' | 'transferencia' | '';
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
}
