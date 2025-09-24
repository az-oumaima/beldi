import { ShoppingCart } from 'lucide-react';

export function FloatingCart({ onOpenCart, count }: { onOpenCart: () => void; count: number; }) {
  return (
    <button
      onClick={onOpenCart}
      className="fixed z-[60] inline-flex items-center justify-center w-14 h-14 rounded-full bg-morocco-700 hover:bg-morocco-800 text-white shadow-lg md:hidden"
      style={{
        right: `calc(1rem + env(safe-area-inset-right) + 3.75rem + 0.5rem)`,
        bottom: `calc(1rem + env(safe-area-inset-bottom))`
      }}
      aria-label="Open Cart"
    >
      <ShoppingCart className="w-7 h-7" />
      {count > 0 && (
        <span className="absolute -top-1 -left-1 min-w-[1.25rem] h-5 px-1 rounded-full bg-gold-500 text-morocco-900 text-xs font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

export default FloatingCart;


