import React from 'react';
import { Plus, Minus, X } from 'lucide-react';
import type { CartItem } from '../data/types';

export function CartModal({
  items,
  onClose,
  onChangeQty,
  total,
  onCheckout
}: {
  items: CartItem[];
  onClose: () => void;
  onChangeQty: (productId: string, sizeId: string, newQty: number) => void;
  total: number;
  onCheckout: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-2xl font-display text-morocco-900">سلة التسوق</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-96">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">السلة فارغة</p>
          ) : (
            <>
              {items.map(item => (
                <div key={`${item.productId}-${item.sizeId}`} className="flex justify-between items-center py-4 border-b">
                  <div className="flex-1">
                    <h4 className="font-display text-morocco-900">{item.name} • {item.sizeLabel}</h4>
                    <p className="text-morocco-700">{item.unitPrice} درهم</p>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button onClick={() => onChangeQty(item.productId, item.sizeId, item.quantity - 1)} className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-morocco-900 w-8 text-center">{item.quantity}</span>
                    <button onClick={() => onChangeQty(item.productId, item.sizeId, item.quantity + 1)} className="bg-beige-200 text-morocco-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-beige-300">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-6 p-4 bg-beige-100 rounded-lg">
                <div className="flex justify-between items-center text-xl font-bold text-morocco-900">
                  <span>المجموع الكلي:</span>
                  <span>{total} درهم</span>
                </div>
              </div>
            </>
          )}
        </div>
        {items.length > 0 && (
          <div className="p-6 border-t">
            <button onClick={onCheckout} className="w-full bg-morocco-700 text-white py-3 rounded-lg font-bold hover:bg-morocco-800 transition-colors">
              تأكيد الطلب
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartModal;
