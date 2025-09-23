import React from 'react';
import { ShoppingCart } from 'lucide-react';

export function Header({ totalItems, totalPrice, onOpenCart }: {
  totalItems: number;
  totalPrice: number;
  onOpenCart: () => void;
}) {
  return (
    <header className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40 border-b border-beige-200">
      <div className="container py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="#home" aria-label="العودة إلى الرئيسية">
              <img src="/logo.png" alt="Beldi Logo" className="h-20 md:h-24 w-auto" />
            </a>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a href="#home" className="text-morocco-800 hover:text-morocco-600 transition-colors">الرئيسية</a>
            <a href="#products" className="text-morocco-800 hover:text-morocco-600 transition-colors">منتجاتنا</a>
            <a href="#contact" className="text-morocco-800 hover:text-morocco-600 transition-colors">اتصل بنا</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="relative bg-morocco-700 text-white px-4 py-2 rounded-full hover:bg-morocco-800 transition-colors shadow-lg flex items-center gap-3"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-bold">{totalItems}</span>
              <span className="text-xs bg-gold-500 text-morocco-900 rounded-full px-2 py-0.5 font-bold">
                {totalPrice} درهم
              </span>
            </button>
          </div>
        </div>
        {/* Mobile nav row */}
        <nav className="mt-3 flex md:hidden items-center justify-center gap-3 text-sm font-medium flex-wrap">
          <a href="#home" className="px-3 py-2 rounded-full bg-beige-100 text-morocco-900">الرئيسية</a>
          <a href="#products" className="px-3 py-2 rounded-full bg-beige-100 text-morocco-900">منتجاتنا</a>
          <a href="#contact" className="px-3 py-2 rounded-full bg-beige-100 text-morocco-900">اتصل بنا</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
