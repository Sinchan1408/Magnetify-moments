export type MagnetType = 'polaroid' | 'classic-square';

export interface ProductPreset {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'couple' | 'baby' | 'family' | 'pet' | 'gift';
  themeColor: string;
  badge?: string;
  defaultCaption?: string;
}

export interface CustomMagnet {
  id: string;
  imageSrc: string; // Base64 or placeholder URL
  type: MagnetType;
  caption: string;
  hasStand: boolean;
  size: '2x2' | '3x3' | '4x4';
  quantity: number;
  price: number;
}

export interface CartItem {
  id: string;
  magnet: CustomMagnet;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  magnetImage?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
