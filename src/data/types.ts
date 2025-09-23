export type Language = 'ar' | 'en';

export type ProductSize = {
  id: string;
  label: string; // e.g., "250g", "500g", "1kg", "لتر"
  price: number;
};

export type Category = 'عسل' | 'أملو' | 'زيوت' | 'عروض';

export interface Product {
  id: string;
  name: string;
  category: Category;
  image: string;
  sizes: ProductSize[];
}

export interface CartItem {
  productId: string;
  name: string;
  category: Category;
  sizeId: string;
  sizeLabel: string;
  unitPrice: number;
  quantity: number;
}
