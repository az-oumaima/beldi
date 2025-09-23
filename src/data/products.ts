import { Product } from './types';

export const products: Product[] = [
  // Honey
  {
    id: 'h1',
    name: 'عسل حر',
    category: 'عسل',
    image: '/honey.jpg',
    sizes: [
      { id: '250', label: '250g', price: 70 },
      { id: '500', label: '500g', price: 120 },
      { id: '1000', label: '1kg', price: 220 },
    ]
  },
  {
    id: 'h2',
    name: 'عسل الزهور',
    category: 'عسل',
    image: '/honey.jpg',
    sizes: [
      { id: '250', label: '250g', price: 60 },
      { id: '500', label: '500g', price: 100 },
      { id: '1000', label: '1kg', price: 180 },
    ]
  },
  {
    id: 'h3',
    name: 'عسل الجبل',
    category: 'عسل',
    image: '/honey.jpg',
    sizes: [
      { id: '250', label: '250g', price: 85 },
      { id: '500', label: '500g', price: 140 },
      { id: '1000', label: '1kg', price: 260 },
    ]
  },
  {
    id: 'h4',
    name: 'عسل الزعتر',
    category: 'عسل',
    image: '/honey.jpg',
    sizes: [
      { id: '250', label: '250g', price: 90 },
      { id: '500', label: '500g', price: 150 },
      { id: '1000', label: '1kg', price: 280 },
    ]
  },

  // Amlou
  {
    id: 'a1',
    name: 'أملو تقليدي',
    category: 'أملو',
    image: '/amlou.jpg',
    sizes: [
      { id: '250', label: '250g', price: 90 },
      { id: '500', label: '500g', price: 150 },
      { id: '1000', label: '1kg', price: 270 },
    ]
  },
  {
    id: 'a2',
    name: 'أملو بالعسل',
    category: 'أملو',
    image: '/amlou.jpg',
    sizes: [
      { id: '250', label: '250g', price: 100 },
      { id: '500', label: '500g', price: 160 },
      { id: '1000', label: '1kg', price: 290 },
    ]
  },
  {
    id: 'a3',
    name: 'املو',
    category: 'أملو',
    image: '/amlou.jpg',
    sizes: [
      { id: '250', label: '250g', price: 110 },
      { id: '500', label: '500g', price: 170 },
      { id: '1000', label: '1kg', price: 300 },
    ]
  },

  // Oils
  {
    id: 'o1',
    name: 'زيت أركان',
    category: 'زيوت',
    image: '/arganoil.jpg',
    sizes: [
      { id: '500', label: '500ml', price: 120 },
      { id: '1000', label: 'لتر', price: 200 },
      { id: '2000', label: '2 لتر', price: 380 },
    ]
  },
  {
    id: 'o2',
    name: 'زيت الزيتون',
    category: 'زيوت',
    image: '/oliveoil.jpg',
    sizes: [
      { id: '500', label: '500ml', price: 50 },
      { id: '1000', label: 'لتر', price: 80 },
      { id: '2000', label: '2 لتر', price: 150 },
    ]
  },
  {
    id: 'o3',
    name: 'زيت اللوز',
    category: 'زيوت',
    image: '/louzoil.jpg',
    sizes: [
      { id: '500', label: '500ml', price: 110 },
      { id: '1000', label: 'لتر', price: 180 },
      { id: '2000', label: '2 لتر', price: 340 },
    ]
  },

  // Popular pack
  {
    id: 'p1',
    name: 'باقة الشعبية: عسل حر + أملو + زيت أركان',
    category: 'عروض',
    image: '/pack.jpg',
    sizes: [
      { id: 'std', label: 'Standard', price: 420 },
    ]
  }
];
