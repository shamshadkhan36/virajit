export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  processor: string;
  ram: string;
  storage: string;
  screen: string;
  gpu: string;
  touchScreen?: string;
  color?: string;
  bestFor?: string;
  warrantyText?: string;
  warrantyDuration?: string;
  batteryHealth: number;
  conditionGrade: string; // "Grade A+ (Pristine)", "Grade A (Excellent)", "Grade B+ (Very Good)", "Grade B (Good)"
  price: number;
  originalPrice: number;
  stock: number;
  warrantyMonths: number;
  includedAccessories: string;
  description: string;
  images: string; // JSON string
  isFeatured: boolean;
  isPremium?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;

  // Computed fields
  availableStock?: number;
  activeLocksCount?: number;
  isLockedByMe?: boolean;
  lockExpiresAt?: string | null;
  lockSecondsRemaining?: number;
}

export interface StockLock {
  id: string;
  productId: string;
  sessionToken: string;
  customerIp?: string | null;
  lockedAt: string | Date;
  lockedUntil: string | Date;
  status: 'ACTIVE' | 'EXPIRED' | 'PURCHASED' | 'RELEASED';
  createdAt: string | Date;
  updatedAt: string | Date;
  product?: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  productId: string;
  product?: Product;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  totalAmount: number;
  paymentMethod: string;
  status: 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  sessionToken?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Page Builder Block Types
export type BlockType =
  | 'hero'
  | 'paragraph'
  | 'heading'
  | 'image_banner'
  | 'laptop_showcase'
  | 'comparison_table'
  | 'quote'
  | 'faq'
  | 'cta'
  | 'features_grid'
  | 'pros_cons'
  | 'benchmark_bars'
  | 'video_embed'
  | 'columns'
  | 'countdown_deal'
  | 'html_code';

export interface BlockStyleSettings {
  align?: 'left' | 'center' | 'right' | 'justify';
  bgPreset?: 'transparent' | 'dark' | 'glass' | 'emerald_glow' | 'purple_velvet' | 'ocean_blue' | 'cyberpunk' | 'sunset';
  padding?: 'none' | 'compact' | 'normal' | 'spacious';
  borderRadius?: 'none' | 'md' | 'xl' | '2xl' | '3xl' | 'full';
  shadowGlow?: 'none' | 'subtle' | 'elevated' | 'brand_glow' | 'purple_glow' | 'amber_glow';
  textColor?: string;
  borderStyle?: 'none' | 'subtle' | 'accent' | 'dashed';
}

export interface PageBuilderBlock {
  id: string;
  type: BlockType;
  data: any;
  style?: BlockStyleSettings;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  readTime: string;
  isPublished: boolean;
  blocks: string; // JSON array of PageBuilderBlock
  publishedAt: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}
