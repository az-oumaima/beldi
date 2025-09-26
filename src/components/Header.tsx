import { useMemo, useState } from 'react';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import type { Category } from '../data/types';

export function Header({ totalItems, totalPrice, onOpenCart }: {
  totalItems: number;
  totalPrice: number;
  onOpenCart: () => void;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const categories = useMemo(() => {
    const set = new Set<Category>();
    for (const p of products) set.add(p.category);
    return Array.from(set);
  }, []);
  return (
    <header className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40 border-b border-beige-200">
      <div className="container py-3 md:py-4">
        {/* Mobile header: menu + cart | centered logo | spacer */}
        <div className="md:hidden relative h-16">
          <div className="absolute top-2 right-2">
            <button
              aria-label="فتح القائمة"
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-beige-100 text-morocco-900 hover:bg-beige-200"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-2 left-2">
            <button
              onClick={onOpenCart}
              className="relative bg-morocco-700 text-white px-4 py-2 rounded-full hover:bg-morocco-800 transition-colors shadow-lg flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-bold">{totalItems}</span>
              <span className="text-xs bg-gold-500 text-morocco-900 rounded-full px-2 py-0.5 font-bold">
                {totalPrice} DH
              </span>
            </button>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <a href="#home" aria-label="العودة إلى الرئيسية" className="pointer-events-auto">
              <img src="/logo.png" alt="Beldi Logo" className="h-16 w-auto" />
            </a>
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden md:flex flex-row-reverse items-center justify-between gap-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="#home" aria-label="العودة إلى الرئيسية">
              <img src="/logo.png" alt="Beldi Logo" className="h-20 md:h-24 w-auto" />
            </a>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-base relative">
            <a href="#home" className="font-medium text-morocco-800 hover:text-morocco-600 transition-colors">الرئيسية</a>
            <div className="relative"
                 onMouseEnter={() => setOpenProducts(true)}
                 onMouseLeave={() => setOpenProducts(false)}>
              <button className="inline-flex items-center gap-1 font-bold text-morocco-800 hover:text-morocco-600 transition-colors">
                منتجاتنا
                <ChevronDown className="w-4 h-4" />
              </button>
              {openProducts && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-beige-200 rounded-xl shadow-xl py-2 z-50">
                  {categories.map(cat => (
                    <a key={cat} href="#products" className="block px-4 py-2 text-morocco-900 bg-white hover:bg-beige-100 font-semibold pr-6 border-r-2 border-transparent hover:border-beige-300 transition-colors">
                      {cat}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="#contact" className="font-medium text-morocco-800 hover:text-morocco-600 transition-colors">اتصل بنا</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="relative bg-morocco-700 text-white px-4 py-2 rounded-full hover:bg-morocco-800 transition-colors shadow-lg flex items-center gap-3"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-bold">{totalItems}</span>
              <span className="text-xs bg-gold-500 text-morocco-900 rounded-full px-2 py-0.5 font-bold">
                DH {totalPrice} 
              </span>
            </button>
          </div>
        </div>

        {/* Sidebar for mobile */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-[1000]">
            <div className="absolute inset-0 bg-white" onClick={() => setIsSidebarOpen(false)} />
            <div className="absolute inset-y-0 right-0 w-80 max-w-[85%] h-full bg-white shadow-2xl border-l border-beige-200 p-5 flex flex-col rounded-s-2xl">
              <div className="relative flex flex-col items-center mb-3">
                <a href="#home" onClick={() => setIsSidebarOpen(false)}>
                  <img src="/logo.png" alt="Beldi" className="h-10 w-auto mx-auto" />
                </a>
                <button
                  aria-label="إغلاق القائمة"
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute top-0 right-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-beige-100 text-morocco-900 hover:bg-beige-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col text-morocco-900 -mx-5">
                <a href="#home" className="block w-full px-5 py-4 bg-white hover:bg-beige-50 font-medium" onClick={() => setIsSidebarOpen(false)}>الرئيسية</a>
                <a href="#products" className="block w-full px-5 py-3 bg-white text-morocco-900 font-bold hover:bg-beige-50" onClick={() => setIsSidebarOpen(false)}>منتجاتنا</a>
                {categories.map(cat => (
                  <a key={cat} href="#products" className="block w-full px-5 py-3 bg-white hover:bg-beige-50 font-semibold pr-6 border-r-2 border-beige-200" onClick={() => setIsSidebarOpen(false)}>
                    {cat}
                  </a>
                ))}
                <a href="#contact" className="block w-full px-5 py-4 bg-white hover:bg-beige-50 font-medium" onClick={() => setIsSidebarOpen(false)}>اتصل بنا</a>
              </nav>
              <div className="mt-auto pt-4">
                <button
                  onClick={() => { setIsSidebarOpen(false); onOpenCart(); }}
                  className="w-full bg-morocco-700 text-white px-4 py-3 rounded-2xl hover:bg-morocco-800 transition-colors shadow-lg flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm font-bold">{totalItems}</span>
                  <span className="text-xs bg-gold-500 text-morocco-900 rounded-full px-2 py-0.5 font-bold"> DH {totalPrice} </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
