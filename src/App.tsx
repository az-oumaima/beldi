import React, { useEffect, useState } from 'react';
import type { CartItem, Product } from './data/types';
import { products as PRODUCT_DATA } from './data/products';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductsSection from './sections/ProductsSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FloatingCart from './components/FloatingCart';
import Toast, { type ToastType } from './components/Toast';

const SHEETS_ENDPOINT = '';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; message: string; type: ToastType }>({ open: false, message: '', type: 'success' });
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '',
    phone: '',
    city: ''
  });

  const [selectedSizeByProduct, setSelectedSizeByProduct] = useState<Record<string, string>>({});
  const [selectedQtyByProduct, setSelectedQtyByProduct] = useState<Record<string, number>>({});

  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: Product) => {
    const sizeId = selectedSizeByProduct[product.id] || product.sizes[0].id;
    const size = product.sizes.find(s => s.id === sizeId)!;
    const qty = selectedQtyByProduct[product.id] || 1;

    setCartItems(prev => {
      const keyMatch = (ci: CartItem) => ci.productId === product.id && ci.sizeId === size.id;
      const existing = prev.find(keyMatch);
      if (existing) {
        return prev.map(ci => keyMatch(ci) ? { ...ci, quantity: ci.quantity + qty } : ci);
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          category: product.category,
          sizeId: size.id,
          sizeLabel: size.label,
          unitPrice: size.price,
          quantity: qty
        }
      ];
    });
  };

  const updateQuantity = (productId: string, sizeId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(ci => !(ci.productId === productId && ci.sizeId === sizeId)));
    } else {
      setCartItems(prev => prev.map(ci => (ci.productId === productId && ci.sizeId === sizeId) ? { ...ci, quantity: newQuantity } : ci));
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderPayload = {
      ...checkoutForm,
      items: cartItems,
      total: getTotalPrice(),
      timestamp: new Date().toISOString()
    };

    try {
      if (SHEETS_ENDPOINT) {
        await fetch(SHEETS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        });
      }
      console.log('Order submitted:', orderPayload);
      setToast({ open: true, message: 'تم إرسال طلبك بنجاح! سنتصل بك قريباً.', type: 'success' });
      setCheckoutForm({ fullName: '', phone: '', city: '' });
    setCartItems([]);
    setIsCheckoutOpen(false);
    } catch (err) {
      console.error(err);
      setToast({ open: true, message: 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.', type: 'error' });
    }
  };

  useEffect(() => {
    if (!toast.open) return;
    const id = window.setTimeout(() => {
      setToast(prev => ({ ...prev, open: false }));
    }, 3500);
    return () => window.clearTimeout(id);
  }, [toast.open]);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div dir="rtl">
      <div className="min-h-screen bg-beige-50">
        <Header
          totalItems={getTotalItems()}
          totalPrice={getTotalPrice()}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <Hero onShopNow={scrollToProducts} />

        <ProductsSection
          products={PRODUCT_DATA}
          selectedSizeByProduct={selectedSizeByProduct}
          setSelectedSizeByProduct={setSelectedSizeByProduct}
          selectedQtyByProduct={selectedQtyByProduct}
          setSelectedQtyByProduct={setSelectedQtyByProduct}
          onAdd={addToCart}
        />

        <AboutSection />
        <ContactSection />

        {isCartOpen && (
          <CartModal
            items={cartItems}
            onClose={() => setIsCartOpen(false)}
            onChangeQty={updateQuantity}
            total={getTotalPrice()}
            onCheckout={handleCheckout}
          />
        )}

      {isCheckoutOpen && (
          <CheckoutModal
            cart={cartItems}
            total={getTotalPrice()}
            values={checkoutForm}
            onChange={(patch) => setCheckoutForm(prev => ({ ...prev, ...patch }))}
            onClose={() => setIsCheckoutOpen(false)}
            onSubmit={handleFormSubmit}
          />
        )}

        <FloatingWhatsApp />
        <FloatingCart onOpenCart={() => setIsCartOpen(true)} count={getTotalItems()} />
        <Toast
          open={toast.open}
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(prev => ({ ...prev, open: false }))}
        />
        </div>
    </div>
  );
}

export default App;