import type { CartItem } from '../data/types';

export type OrderStatus = {
  confirmed: boolean;
  delivered: boolean;
};

export type OrderRecord = {
  id: number;
  timestamp: string; // ISO
  fullName: string;
  phone: string;
  city: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
};

const STORAGE_KEY = 'beldi_orders_v1';

export function getOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as OrderRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: OrderRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function addOrder(order: Omit<OrderRecord, 'id'>): OrderRecord {
  const orders = getOrders();
  const id = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;
  const record: OrderRecord = { id, ...order };
  orders.push(record);
  saveOrders(orders);
  return record;
}

export function updateOrder(id: number, patch: Partial<OrderRecord>) {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return;
  orders[idx] = { ...orders[idx], ...patch };
  saveOrders(orders);
}

export function deleteOrder(id: number) {
  const orders = getOrders().filter(o => o.id !== id);
  saveOrders(orders);
}

export function ordersToCsv(orders: OrderRecord[]): string {
  const headers = [
    'Order Number','Date','Time','Name','Phone','City',
    'Order Item','Quantity','Size','Unit Price','Order Total','Confirmed','Delivered'
  ];
  const rows: string[] = [];
  rows.push(headers.join(','));
  for (const o of orders) {
    const d = new Date(o.timestamp);
    const ds = d.toLocaleDateString();
    const ts = d.toLocaleTimeString();
    if (!o.items.length) {
      rows.push([o.id, ds, ts, e(o.fullName), e(o.phone), e(o.city), '', '', '', '', o.total, o.status.confirmed?'Yes':'No', o.status.delivered?'Yes':'No'].join(','));
      continue;
    }
    for (const it of o.items) {
      rows.push([
        o.id,
        ds,
        ts,
        e(o.fullName),
        e(o.phone),
        e(o.city),
        e(it.name),
        it.quantity,
        e(it.sizeLabel || ''),
        it.unitPrice,
        o.total,
        o.status.confirmed?'Yes':'No',
        o.status.delivered?'Yes':'No'
      ].join(','));
    }
  }
  return rows.join('\n');
}

function e(v: string): string {
  if (v.includes(',') || v.includes('"') || v.includes('\n')) {
    return '"' + v.replace(/"/g, '""') + '"';
  }
  return v;
}


