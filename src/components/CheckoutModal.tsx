import React from 'react';
import type { CartItem } from '../data/types';

export function CheckoutModal({
  cart,
  total,
  values,
  onChange,
  onClose,
  onSubmit
}: {
  cart: CartItem[];
  total: number;
  values: { fullName: string; phone: string; city: string };
  onChange: (patch: Partial<{ fullName: string; phone: string; city: string }>) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-2xl font-display text-morocco-900">تأكيد الطلب</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <div>
            <label className="block text-morocco-900 font-display mb-2">الاسم الكامل</label>
            <input
              type="text"
              required
              value={values.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-morocco-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-morocco-900 font-display mb-2">رقم الهاتف</label>
            <input
              type="tel"
              required
              value={values.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-morocco-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-morocco-900 font-display mb-2">المدينة</label>
            <input
              type="text"
              required
              value={values.city}
              onChange={(e) => onChange({ city: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-morocco-500 focus:outline-none"
            />
          </div>
          <div className="p-4 bg-beige-100 rounded-lg">
            <div className="flex justify-between items-center font-bold text-morocco-900">
              <span>المجموع الكلي:</span>
              <span>{total} درهم</span>
            </div>
          </div>
          <button type="submit" className="w-full bg-morocco-700 text-white py-3 rounded-lg font-bold hover:bg-morocco-800 transition-colors">
            إرسال الطلب
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;
