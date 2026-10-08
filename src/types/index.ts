export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: 'combos' | 'collares' | 'aritos' | 'besties';
  categoryLabel: string;
  image: string;
  secondaryImages?: string[];
  description: string;
  includes: string[];
  inStock: boolean;
  isFeatured?: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerOrderInfo {
  name: string;
  phone: string;
  city: string;
  address: string;
  deliveryMethod: 'retiro' | 'envio_catamarca' | 'envio_nacional';
  paymentMethod: 'transferencia' | 'efectivo';
  notes: string;
}
