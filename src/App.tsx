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
import Toast, { type ToastType } from './components/Toast';
import { addOrder } from './utils/orderStorage';
import Dashboard from './pages/Dashboard';

const SHEETS_ENDPOINT = '';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '',
    phone: '',
    city: ''
  });
  // Contact form state (Google Sheets form)
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

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

  const [toast, setToast] = useState<{ open: boolean; message: string; type: ToastType }>({ open: false, message: '', type: 'success' });

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
        const params = new URLSearchParams();
        Object.entries(orderPayload).forEach(([key, value]) => {
          params.append(key, typeof value === 'string' ? value : JSON.stringify(value));
        });
        await fetch(SHEETS_ENDPOINT, {
          method: 'POST',
          body: params,
        });
      }
      console.log('Order submitted:', orderPayload);
      // Save locally to CSV store
      addOrder({
        timestamp: new Date().toISOString(),
        fullName: checkoutForm.fullName,
        phone: checkoutForm.phone,
        city: checkoutForm.city,
        items: cartItems,
        total: getTotalPrice(),
        status: { confirmed: false, delivered: false }
      });
      setToast({ open: true, message: 'تم إرسال طلبك بنجاح! سنتصل بك قريباً.', type: 'success' });
      setCheckoutForm({ fullName: '', phone: '', city: '' });
      setCartItems([]);
      setIsCheckoutOpen(false);
    } catch (err) {
      console.error(err);
      setToast({ open: true, message: 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.', type: 'error' });
    }
  };

  // Contact form submit to Google Apps Script
  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    };

    try {
      const params = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => params.append(k, v));
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbzR_KZls49F7zeQ6zAq6IPVkUbWBw1Hdhp2uOfhJgnCfLfHRJvlySzJVNqDQ_OQnIQIgA/exec',
        {
          method: 'POST',
          body: params,
        }
      );

      const result = await response.json();
      console.log(result);

      if (result.result === 'success') {
        setToast({ open: true, message: 'تم إرسال النموذج بنجاح!', type: 'success' });
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      } else {
        setToast({ open: true, message: 'حدث خطأ أثناء إرسال النموذج.', type: 'error' });
      }
    } catch (error) {
      console.error(error);
      setToast({ open: true, message: 'حدث خطأ غير متوقع.', type: 'error' });
    }
  };

  useEffect(() => {
    if (!toast.open) return;
    const id = window.setTimeout(() => {
      setToast(prev => ({ ...prev, open: false }));
    }, 3500);
    return () => window.clearTimeout(id);
  }, [toast.open]);

  const [route, setRoute] = useState<string>(window.location.hash);
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#home');
    window.addEventListener('hashchange', onHash);
    if (!window.location.hash) window.location.hash = '#home';
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (route.startsWith('#/dashboard')) {
    return (
      <div dir="rtl">
        <Dashboard onToast={(message, type) => setToast({ open: true, message, type })} />
        <Toast open={toast.open} type={toast.type} message={toast.message} onClose={() => setToast(prev => ({ ...prev, open: false }))} />
      </div>
    );
  }

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
        {/* <FloatingCart onOpenCart={() => setIsCartOpen(true)} count={getTotalItems()} /> */}
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