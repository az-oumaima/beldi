import React from 'react';
import type { Product } from '../data/types';
import { ProductCard } from '../components/ProductCard';

export function ProductsSection({
  products,
  selectedSizeByProduct,
  setSelectedSizeByProduct,
  selectedQtyByProduct,
  setSelectedQtyByProduct,
  onAdd
}: {
  products: Product[];
  selectedSizeByProduct: Record<string, string>;
  setSelectedSizeByProduct: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  selectedQtyByProduct: Record<string, number>;
  setSelectedQtyByProduct: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  onAdd: (product: Product) => void;
}) {
  const byCategory = (cat: Product['category']) => products.filter(p => p.category === cat);

  const setDefaults = (product: Product) => {
    setSelectedSizeByProduct(prev => prev[product.id] ? prev : ({ ...prev, [product.id]: product.sizes[0].id }));
    setSelectedQtyByProduct(prev => prev[product.id] ? prev : ({ ...prev, [product.id]: 1 }));
  };

  const renderBlock = (title: string, list: Product[]) => (
    <div className="mb-12">
      <div className="text-center mb-6">
        <h3 className="font-display text-morocco-900 text-2xl md:text-3xl font-semibold">{title}</h3>
        <div className="mx-auto mt-3 h-px w-24 bg-beige-300" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {list.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            selectedSizeId={selectedSizeByProduct[product.id] || product.sizes[0].id}
            onSelectSize={(sizeId) => setSelectedSizeByProduct(prev => ({ ...prev, [product.id]: sizeId }))}
            qty={selectedQtyByProduct[product.id] || 1}
            onChangeQty={(n) => setSelectedQtyByProduct(prev => ({ ...prev, [product.id]: Math.max(1, n) }))}
            onMountDefault={() => setDefaults(product)}
            onAdd={() => onAdd(product)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section id="products" className="py-16 bg-beige-50">
      <div className="container">
        <h2 className="section-title text-center text-3xl md:text-4xl mb-12">منتجاتنا الطبيعية</h2>
        {renderBlock('العسل', byCategory('عسل'))}
        {renderBlock('الأملو', byCategory('أملو'))}
        {renderBlock('الزيوت', byCategory('زيوت'))}
        {renderBlock('عروض مميزة', byCategory('عروض'))}
      </div>
    </section>
  );
}

export default ProductsSection;
