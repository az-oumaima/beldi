import { useEffect, useMemo, useState } from 'react';
import { listOrders, createOrder, modifyOrder, removeOrder } from '../utils/orderService';
import { products } from '../data/products';
import { Edit3, X } from 'lucide-react';
import type { OrderRecord } from '../utils/orderStorage';

export default function Dashboard({ onToast }: { onToast?: (message: string, type: 'success' | 'error') => void }) {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [q, setQ] = useState('');
  const [filterConfirmed, setFilterConfirmed] = useState<'all' | 'yes' | 'no'>('all');
  const [filterDelivered, setFilterDelivered] = useState<'all' | 'yes' | 'no'>('all');

  const [tick, setTick] = useState(0);
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await listOrders();
      if (!cancelled) setOrders(data);
    })();
    return () => { cancelled = true; };
  }, [tick]);
  // Order edit mode state
  const [editOrderId, setEditOrderId] = useState<number | null>(null);
  const [editFullName, setEditFullName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editCity, setEditCity] = useState('');
  type NewItem = { productId: string; name: string; quantity: number; sizeId: string; sizeLabel: string; unitPrice: number };
  const [editItems, setEditItems] = useState<NewItem[]>([]);
  const [confirmToast, setConfirmToast] = useState<null | { message: string; onConfirm: () => void }>(null);
  const addEditItemRow = () => setEditItems(prev => [...prev, { productId: '', name: '', quantity: 1, sizeId: '', sizeLabel: '', unitPrice: 0 }]);
  const removeEditItemRow = (idx: number) => setEditItems(prev => prev.filter((_, i) => i !== idx));
  const updateEditItem = (idx: number, patch: Partial<NewItem>) => setEditItems(prev => prev.map((it, i) => i === idx ? { ...it, ...patch } : it));
  const totalEdit = useMemo(() => editItems.reduce((sum, it) => sum + (Number(it.unitPrice) || 0) * (Number(it.quantity) || 0), 0), [editItems]);

  useEffect(() => {
    const ok = sessionStorage.getItem('beldi_auth_ok') === '1';
    if (ok) setAuthed(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'beldi' && password === 'beldi@beldi') {
      setAuthed(true);
      sessionStorage.setItem('beldi_auth_ok', '1');
    } else {
      alert('Invalid credentials');
    }
  };

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return orders.filter((o: OrderRecord) => {
      const matchQ = !s || o.fullName.toLowerCase().includes(s) || o.phone.toLowerCase().includes(s) || o.city.toLowerCase().includes(s) || String(o.id).includes(s);
      const matchC = filterConfirmed === 'all' || (filterConfirmed === 'yes' ? o.status.confirmed : !o.status.confirmed);
      const matchD = filterDelivered === 'all' || (filterDelivered === 'yes' ? o.status.delivered : !o.status.delivered);
      return matchQ && matchC && matchD;
    });
  }, [orders, q, filterConfirmed, filterDelivered]);

  // CSV export removed per request

  // Create order form state
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newItems, setNewItems] = useState<NewItem[]>([{ productId: '', name: '', quantity: 1, sizeId: '', sizeLabel: '', unitPrice: 0 }]);

  const addNewItemRow = () => setNewItems(prev => [...prev, { productId: '', name: '', quantity: 1, sizeId: '', sizeLabel: '', unitPrice: 0 }]);
  const removeNewItemRow = (idx: number) => setNewItems(prev => prev.filter((_, i) => i !== idx));
  const updateNewItem = (idx: number, patch: Partial<NewItem>) => setNewItems(prev => prev.map((it, i) => i === idx ? { ...it, ...patch } : it));

  const totalNew = useMemo(() => newItems.reduce((sum, it) => sum + (Number(it.unitPrice) || 0) * (Number(it.quantity) || 0), 0), [newItems]);

  const submitNewOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const items = newItems.filter(it => (it.productId || it.name) && it.quantity > 0).map(it => ({
      productId: it.productId || it.name,
      name: it.name,
      category: '',
      sizeId: it.sizeId || it.sizeLabel,
      sizeLabel: it.sizeLabel,
      unitPrice: Number(it.unitPrice) || 0,
      quantity: Number(it.quantity) || 0,
    })) as any;
    const total = (items as any[]).reduce((s: number, it: any) => s + it.unitPrice * it.quantity, 0);
    await createOrder({
      timestamp: new Date().toISOString(),
      fullName: newFullName,
      phone: newPhone,
      city: newCity,
      items,
      total,
      status: { confirmed: false, delivered: false }
    });
    setNewFullName('');
    setNewPhone('');
    setNewCity('');
    setNewItems([{ productId: '', name: '', quantity: 1, sizeId: '', sizeLabel: '', unitPrice: 0 }]);
    setTick(t => t + 1);
  };

  // Enter edit mode for a specific order
  const startEditOrder = (orderId: number) => {
    const o = orders.find((x: OrderRecord) => x.id === orderId);
    if (!o) return;
    setEditOrderId(orderId);
    setEditFullName(o.fullName);
    setEditPhone(o.phone);
    setEditCity(o.city);
    const mapped: NewItem[] = o.items.map((it: OrderRecord['items'][number]) => ({
      productId: it.productId,
      name: it.name,
      quantity: it.quantity,
      sizeId: it.sizeId,
      sizeLabel: it.sizeLabel,
      unitPrice: it.unitPrice,
    }));
    setEditItems(mapped.length ? mapped : [{ productId: '', name: '', quantity: 1, sizeId: '', sizeLabel: '', unitPrice: 0 }]);
  };

  const saveEditOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editOrderId == null) return;
    const items = editItems.filter(it => (it.productId || it.name) && it.quantity > 0).map(it => ({
      productId: it.productId || it.name,
      name: it.name,
      category: '',
      sizeId: it.sizeId || it.sizeLabel,
      sizeLabel: it.sizeLabel,
      unitPrice: Number(it.unitPrice) || 0,
      quantity: Number(it.quantity) || 0,
    })) as any;
    const total = (items as any[]).reduce((s: number, it: any) => s + it.unitPrice * it.quantity, 0);
    await modifyOrder(editOrderId, {
      fullName: editFullName,
      phone: editPhone,
      city: editCity,
      items,
      total,
    });
    setEditOrderId(null);
    onToast?.('تم تحديث الطلب', 'success');
    setTick(t => t + 1);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-beige-50 flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 w-full max-w-sm border border-beige-200">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="Beldi" className="h-16 w-auto" />
          </div>
          <h1 className="text-2xl font-display text-morocco-900 mb-4 text-center">لوحة الإدارة</h1>
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="w-full border border-beige-300 focus:border-morocco-700 focus:ring-0 rounded-lg px-3 py-2 mb-3 outline-none" />
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border border-beige-300 focus:border-morocco-700 focus:ring-0 rounded-lg px-3 py-2 mb-4 outline-none" />
          <button className="w-full bg-morocco-700 text-white rounded-lg py-2 font-bold hover:bg-morocco-800 transition-colors">دخول</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-50 p-4 md:p-8">
      <div className="container max-w-[1400px] mx-auto">
        {/* Header with Logo */}
        <div className="flex flex-col items-center justify-center mb-6">
          <img src="/logo.png" alt="Beldi" className="h-20 md:h-24 w-auto" />
        </div>

        <div className="mb-5 items-center">
          <h1 className="text-2xl md:text-3xl font-display text-morocco-900 text-center">الطلبات</h1>

          <div className="flex items-center justify-center mt-3">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="ابحث بالاسم، الهاتف، المدينة أو رقم الطلب" className="w-full max-w-xl border border-beige-300 focus:border-morocco-700 rounded-full px-4 py-2 outline-none bg-white/90" />
          </div>
        </div>

        

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-2xl border border-beige-200 max-w-[1400px] mx-auto overflow-hidden">
          <div className="overflow-auto">
            <table className="min-w-[1200px] w-full text-base md:text-lg border-separate border-spacing-0">
              <thead className="bg-morocco-700 text-white text-left">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">التاريخ</th>
                <th className="px-3 py-2">الوقت</th>
                  <th className="px-3 py-2">الاسم</th>
                  <th className="px-3 py-2">الهاتف</th>
                  <th className="px-3 py-2">المدينة</th>
                <th className="px-3 py-2">العنصر</th>
                <th className="px-3 py-2">الكمية</th>
                <th className="px-3 py-2">الحجم</th>
                <th className="px-3 py-2">السعر</th>
                <th className="px-3 py-2">الإجمالي</th>
                  <th className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span>تأكيد</span>
                      <button onClick={()=>{
                        setFilterConfirmed(prev => prev === 'all' ? 'yes' : prev === 'yes' ? 'no' : 'all');
                      }} className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white" title="تبديل الفلتر">
                        {filterConfirmed === 'all' ? '•' : filterConfirmed === 'yes' ? '✓' : '×'}
                      </button>
                    </div>
                  </th>
                  <th className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span>تم التسليم</span>
                      <button onClick={()=>{
                        setFilterDelivered(prev => prev === 'all' ? 'yes' : prev === 'yes' ? 'no' : 'all');
                      }} className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white" title="تبديل الفلتر">
                        {filterDelivered === 'all' ? '•' : filterDelivered === 'yes' ? '✓' : '×'}
                      </button>
                    </div>
                  </th>
                  <th className="px-3 py-2">إجراءات</th>
              </tr>
            </thead>
              <tbody>
              {filtered.flatMap((o: OrderRecord) => {
                const date = new Date(o.timestamp);
                const dateStr = date.toLocaleDateString();
                const timeStr = date.toLocaleTimeString();
                const rowBg = o.status.confirmed && o.status.delivered
                  ? 'bg-green-200'
                  : o.status.confirmed
                  ? 'bg-green-100'
                  : '';
                if (o.items.length === 0) {
                  return (
                    <tr key={o.id} className={`border-t transition-colors ${rowBg || 'hover:bg-beige-50'}`}>
                      <td className="px-3 py-2">{o.id}</td>
                      <td className="px-3 py-2">{dateStr}</td>
                      <td className="px-3 py-2">{timeStr}</td>
                      <td className="px-3 py-2 font-semibold">{o.fullName}</td>
                      <td className="px-3 py-2 font-semibold">{o.phone}</td>
                      <td className="px-3 py-2 font-semibold">{o.city}</td>
                      <td className="px-3 py-2"></td>
                      <td className="px-3 py-2"></td>
                      <td className="px-3 py-2"></td>
                      <td className="px-3 py-2"></td>
                      <td className="px-3 py-2">{o.total}</td>
                      <td className="px-3 py-2"><input type="checkbox" checked={o.status.confirmed} onChange={async e=>{await modifyOrder(o.id,{ status:{...o.status, confirmed:e.target.checked}}); setTick(t=>t+1);}} /></td>
                      <td className="px-3 py-2"><input type="checkbox" checked={o.status.delivered} onChange={async e=>{await modifyOrder(o.id,{ status:{...o.status, delivered:e.target.checked}}); setTick(t=>t+1);}} /></td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <button onClick={()=> startEditOrder(o.id)} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-beige-100 text-morocco-900 hover:bg-beige-200" title="تعديل">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={()=>{
                            setConfirmToast({
                              message: `هل تريد حذف الطلب #${o.id}؟`,
                              onConfirm: async () => { await removeOrder(o.id); setTick(t=>t+1); onToast?.('تم حذف الطلب', 'success'); }
                            });
                          }} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100" title="حذف">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
                return o.items.map((item: OrderRecord['items'][number], idx: number) => (
                  <tr key={`${o.id}-${idx}`} className={`border-t transition-colors ${rowBg || 'hover:bg-beige-50'}`}>
                    <td className="px-3 py-2">{idx === 0 ? o.id : ''}</td>
                    <td className="px-3 py-2">{idx === 0 ? dateStr : ''}</td>
                    <td className="px-3 py-2">{idx === 0 ? timeStr : ''}</td>
                    <td className="px-3 py-2 font-semibold">{idx === 0 ? o.fullName : ''}</td>
                    <td className="px-3 py-2 font-semibold">{idx === 0 ? o.phone : ''}</td>
                    <td className="px-3 py-2 font-semibold">{idx === 0 ? o.city : ''}</td>
                    <td className="px-3 py-2">{item.name}</td>
                    <td className="px-3 py-2">{item.quantity}</td>
                    <td className="px-3 py-2">{item.sizeLabel}</td>
                    <td className="px-3 py-2">{item.unitPrice}</td>
                    <td className="px-3 py-2">{idx === 0 ? o.total : ''}</td>
                    <td className="px-3 py-2">{idx === 0 ? <input type="checkbox" checked={o.status.confirmed} onChange={async e=>{await modifyOrder(o.id,{ status:{...o.status, confirmed:e.target.checked}}); setTick(t=>t+1);}} /> : ''}</td>
                    <td className="px-3 py-2">{idx === 0 ? <input type="checkbox" checked={o.status.delivered} onChange={async e=>{await modifyOrder(o.id,{ status:{...o.status, delivered:e.target.checked}}); setTick(t=>t+1);}} /> : ''}</td>
                    <td className="px-3 py-2">
                      {idx === 0 ? (
                      <div className="flex items-center gap-2">
                          <button onClick={()=> startEditOrder(o.id)} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-beige-100 text-morocco-900 hover:bg-beige-200" title="تعديل">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={()=>{
                            setConfirmToast({
                              message: `هل تريد حذف الطلب #${o.id}؟`,
                              onConfirm: async () => { await removeOrder(o.id); setTick(t=>t+1); onToast?.('تم حذف الطلب', 'success'); }
                            });
                          }} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100" title="حذف">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button onClick={()=>{
                            setConfirmToast({
                              message: `حذف العنصر من الطلب #${o.id}؟`,
                              onConfirm: async () => {
                                const newItems = o.items.filter((_: OrderRecord['items'][number], i: number) => i !== idx);
                                const newTotal = newItems.reduce((s: number, it: OrderRecord['items'][number]) => s + it.unitPrice * it.quantity, 0);
                                await modifyOrder(o.id, { items: newItems as any, total: newTotal });
                                setTick(t=>t+1);
                                onToast?.('تم حذف العنصر من الطلب', 'success');
                              }
                            });
                          }} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100" title="حذف">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ));
              })}
              </tbody>
            </table>
          </div>
        </div>

        {editOrderId != null && (
          <form onSubmit={saveEditOrder} className="bg-white rounded-2xl shadow-xl p-5 mb-6 border border-beige-200 max-w-4xl mx-auto">
            <h2 className="text-xl font-display text-morocco-900 mb-3 text-center">تعديل الطلب #{editOrderId}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <input value={editFullName} onChange={e=>setEditFullName(e.target.value)} placeholder="الاسم" className="border border-beige-300 rounded-full px-4 py-2 outline-none" />
              <input value={editPhone} onChange={e=>setEditPhone(e.target.value)} placeholder="الهاتف" className="border border-beige-300 rounded-full px-4 py-2 outline-none" />
              <input value={editCity} onChange={e=>setEditCity(e.target.value)} placeholder="المدينة" className="border border-beige-300 rounded-full px-4 py-2 outline-none" />
            </div>
            <div className="space-y-2">
              {editItems.map((it, idx) => {
                const product = products.find(p => p.id === it.productId);
                const sizes = product ? product.sizes : [];
                return (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-2">
                    <select value={it.productId} onChange={e=>{ const pid = e.target.value; const p = products.find(pp=>pp.id===pid); updateEditItem(idx,{ productId: pid, name: p? p.name:'', sizeId:'', sizeLabel:'', unitPrice:0 }); }} className="border border-beige-300 rounded-full px-4 py-2 outline-none" required>
                      <option value="" disabled>اختر العنصر</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <input type="number" min={1} value={it.quantity} onChange={e=>updateEditItem(idx,{ quantity: Number(e.target.value) })} className="border border-beige-300 rounded-full px-4 py-2 outline-none" required />
                    <select value={it.sizeId} onChange={e=>{ const sid = e.target.value; const s = sizes.find(ss=>ss.id===sid); updateEditItem(idx,{ sizeId: sid, sizeLabel: s? s.label:'', unitPrice: s? s.price: 0 }); }} className="border border-beige-300 rounded-full px-4 py-2 outline-none" disabled={!product}>
                      <option value="" disabled>اختر الحجم</option>
                      {sizes.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                    <input type="number" step="0.01" value={it.unitPrice} disabled className="border border-beige-300 rounded-full px-4 py-2 outline-none bg-beige-100" />
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={()=>removeEditItemRow(idx)} className="inline-flex items-center justify-center w-full h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100">×</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-3">
                <button type="button" onClick={addEditItemRow} className="bg-morocco-700 text-white rounded-full px-5 py-2 font-bold hover:bg-morocco-800">إضافة عنصر</button>
                <div className="flex-1 text-center text-morocco-900 font-bold">الإجمالي: {totalEdit}</div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={()=> setEditOrderId(null)} className="rounded-full px-5 py-2 bg-beige-100 hover:bg-beige-200">إلغاء</button>
                  <button className="bg-gold-600 text-morocco-900 rounded-full px-8 py-2.5 font-bold hover:bg-gold-500 shadow">حفظ التعديلات</button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Create Order moved under table */}
        <form onSubmit={submitNewOrder} className="bg-white rounded-2xl shadow-xl p-5 mt-6 border border-beige-200 max-w-4xl mx-auto">
          <h2 className="text-xl font-display text-morocco-900 mb-3 text-center">إنشاء طلب جديد</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <input value={newFullName} onChange={e=>setNewFullName(e.target.value)} placeholder="الاسم" className="border border-beige-300 focus:border-morocco-700 rounded-full px-4 py-2 outline-none bg-white/90" required />
            <input value={newPhone} onChange={e=>setNewPhone(e.target.value)} placeholder="الهاتف" className="border border-beige-300 focus:border-morocco-700 rounded-full px-4 py-2 outline-none bg-white/90" required />
            <input value={newCity} onChange={e=>setNewCity(e.target.value)} placeholder="المدينة" className="border border-beige-300 focus:border-morocco-700 rounded-full px-4 py-2 outline-none bg-white/90" required />
          </div>
          <div className="space-y-2">
            {newItems.map((it, idx) => {
              const product = products.find(p => p.id === it.productId);
              const sizes = product ? product.sizes : [];
              return (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-2">
                  <select
                    value={it.productId}
                    onChange={e=>{
                      const pid = e.target.value;
                      const p = products.find(pp => pp.id === pid);
                      updateNewItem(idx, {
                        productId: pid,
                        name: p ? p.name : '',
                        sizeId: '',
                        sizeLabel: '',
                        unitPrice: 0
                      });
                    }}
                    className="border border-beige-300 rounded-full px-4 py-2 outline-none bg-white/90"
                    required
                  >
                    <option value="" disabled>اختر العنصر</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>

                  <input type="number" min={1} value={it.quantity} onChange={e=>updateNewItem(idx,{ quantity:Number(e.target.value) })} placeholder="الكمية" className="border border-beige-300 rounded-full px-4 py-2 outline-none bg-white/90" required />

                  <select
                    value={it.sizeId}
                    onChange={e=>{
                      const sid = e.target.value;
                      const s = sizes.find(ss => ss.id === sid);
                      updateNewItem(idx, {
                        sizeId: sid,
                        sizeLabel: s ? s.label : '',
                        unitPrice: s ? s.price : 0
                      });
                    }}
                    className="border border-beige-300 rounded-full px-4 py-2 outline-none bg-white/90"
                    disabled={!product}
                  >
                    <option value="" disabled>اختر الحجم</option>
                    {sizes.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>

                  <input type="number" step="0.01" value={it.unitPrice} disabled className="border border-beige-300 rounded-full px-4 py-2 outline-none bg-beige-100 text-morocco-800" />
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={()=>removeNewItemRow(idx)} className="inline-flex items-center justify-center w-full h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100">×</button>
                    <button type="button" onClick={addNewItemRow} className="bg-morocco-700 text-white rounded-full px-5 py-2 font-bold hover:bg-morocco-800">+</button>

                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 text-center text-morocco-900 font-bold">الإجمالي: {totalNew}</div>
              <button className="bg-gold-600 text-morocco-900 rounded-full px-8 py-2.5 font-bold hover:bg-gold-500 shadow">حفظ الطلب</button>
            </div>
          </div>
        </form>
      </div>
      {confirmToast && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={()=>setConfirmToast(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
            <span className="text-morocco-900 font-medium">{confirmToast.message}</span>
            <div className="ml-4 flex items-center gap-2">
              <button onClick={()=>{ confirmToast.onConfirm(); setConfirmToast(null); }} className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700">حذف</button>
              <button onClick={()=> setConfirmToast(null)} className="px-4 py-2 rounded-full bg-beige-100 text-morocco-900 hover:bg-beige-200">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





