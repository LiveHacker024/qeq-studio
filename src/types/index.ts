export type QualityTier = 'normal' | 'premium';

export type NailShape = 'Almond' | 'Coffin' | 'Square' | 'Oval' | 'Stiletto' | 'Ballerina';

export type NailLength = 'Short' | 'Medium' | 'Long';

export type NailFinish = 
  | 'High Gloss Gel' 
  | 'Velvet Matte' 
  | '3D Embellished' 
  | 'Magnetic Cat Eye' 
  | 'Mirror Chrome' 
  | 'Glitter Accent' 
  | 'French Luxe' 
  | 'Blush Ombre' 
  | 'Hand-Painted';

export type NailCategory = 
  | 'All Nails'
  | 'Everyday'
  | 'Premium'
  | 'Bridal'
  | 'Party'
  | 'Minimal'
  | 'Glitter'
  | 'Chrome'
  | 'Floral'
  | 'Luxury';

export type NailSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'CUSTOM';

export interface Product {
  id: string;
  name: string;
  slug: string;
  quality_tier: QualityTier;
  price: number;
  compare_price?: number;
  pack_count: number;
  nails_per_pack: number;
  total_nails: number;
  is_handmade: boolean;
  shape?: string;
  length?: string;
  finish?: string;
  category?: string;
  collection?: string;
  color?: string;
  color_hex?: string;
  description: string;
  short_description?: string;
  features?: string[];
  whats_included?: string[];
  application_guide?: string;
  images: string[];
  thumbnail: string;
  sizes: NailSize[];
  stock?: number;
  sku: string;
  featured?: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function validateProduct(product: Product): { valid: boolean; error?: string } {
  if (!product.id || !product.name || !product.slug) {
    return { valid: false, error: 'Product ID, name and slug are required.' };
  }
  if (!product.pack_count || product.pack_count <= 0) {
    return { valid: false, error: 'Pack count must be positive.' };
  }
  if (!product.nails_per_pack || product.nails_per_pack <= 0) {
    return { valid: false, error: 'Nails per pack must be positive.' };
  }
  if (product.total_nails !== product.pack_count * product.nails_per_pack) {
    return { 
      valid: false, 
      error: `Inconsistent total nails: ${product.pack_count} packs × ${product.nails_per_pack} nails !== ${product.total_nails} total.` 
    };
  }
  if (product.price <= 0) {
    return { valid: false, error: 'Price must be greater than 0.' };
  }
  return { valid: true };
}

export interface CartItem {
  product: Product;
  selectedSize: NailSize;
  customSizes?: {
    thumb: string;
    index: string;
    middle: string;
    ring: string;
    pinky: string;
  };
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export type OrderStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface Order {
  id: string;
  order_number: string;
  customer_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: {
    productId: string;
    productName: string;
    productImage: string;
    qualityTier: QualityTier;
    size: NailSize;
    price: number;
    packCount: number;
    totalNails: number;
    isHandmade: boolean;
    quantity: number;
    subtotal: number;
  }[];
  subtotal: number;
  shipping: number;
  discount: number;
  coupon_code?: string;
  total: number;
  payment_method: PaymentMethod;
  payment_status: 'Paid' | 'Pending' | 'COD' | 'Failed';
  order_status: OrderStatus;
  shipping_address: ShippingAddress;
  tracking_id?: string;
  estimated_delivery: string;
  created_at: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
}

export interface PromoOffer {
  id: string;
  code: string;
  title: string;
  description: string;
  type: 'buy_x_get_y' | 'percentage' | 'fixed_amount';
  buy_qty?: number;
  get_qty?: number;
  discount_percentage?: number;
  discount_amount?: number;
  min_order_amount?: number;
  is_active: boolean;
}

export interface DynamicStoreConfig {
  normalPrice: number;
  premiumPrice: number;
  freeShippingThreshold: number;
  shippingCost: number;
  announcementText: string;
  announcementActive: boolean;
  offers: PromoOffer[];
}
