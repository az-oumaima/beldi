import React from 'react';
import { Plus, Minus } from 'lucide-react';
import type { Product } from '../data/types';

export function ProductCard({
  product,
  selectedSizeId,
  onSelectSize,
  qty,
  onChangeQty,
  onMountDefault,
  onAdd,
}: {
  product: Product;
  selectedSizeId: string;
  onSelectSize: (sizeId: string) => void;
  qty: number;
  onChangeQty: (n: number) => void;
  onMountDefault: () => void;
  onAdd: () => void;
}) {
  React.useEffect(() => { onMountDefault(); }, []);
  const selected = product.sizes.find(s => s.id === selectedSizeId) || product.sizes[0];
  return (
    <div className="group bg-white border border-beige-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="h-40 sm:h-48 bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
      </div>
      <div className="p-3 sm:p-4 text-center">
        <h3 className="text-base sm:text-lg font-display text-morocco-900 mb-2 flex items-baseline justify-center gap-2">
          <span>{product.name}</span>
          <span className="text-morocco-700 font-bold text-sm sm:text-base">{selected.price} درهم</span>
        </h3>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map(s => (
              <button
                key={s.id}
                onClick={() => onSelectSize(s.id)}
                className={`px-2.5 py-1 rounded-full border text-xs ${selectedSizeId === s.id ? 'bg-morocco-700 text-white border-morocco-700' : 'border-beige-300 text-morocco-900 hover:bg-beige-100'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => onChangeQty(qty - 1)}
              className="bg-gray-200 text-gray-700 w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-300"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold text-morocco-900 w-8 text-center text-sm">{Math.max(1, qty)}</span>
            <button
              onClick={() => onChangeQty(qty + 1)}
              className="bg-beige-200 text-morocco-800 w-7 h-7 rounded-full flex items-center justify-center hover:bg-beige-300"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <button
          onClick={onAdd}
          className="w-full bg-morocco-700 text-white px-3 py-2 rounded-lg font-bold hover:bg-morocco-800 transition-colors text-sm"
        >
          أضف إلى السلة
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
