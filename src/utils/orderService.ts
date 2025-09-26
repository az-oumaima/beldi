import { buildApiUrl, API_BASE_URL } from './config';
import type { OrderRecord } from './orderStorage';
import { getOrders as lsGetOrders, addOrder as lsAddOrder, updateOrder as lsUpdateOrder, deleteOrder as lsDeleteOrder } from './orderStorage';

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

const useApi = () => Boolean(API_BASE_URL);

export async function listOrders(): Promise<OrderRecord[]> {
  if (useApi()) {
    return await http<OrderRecord[]>(buildApiUrl('/orders'));
  }
  return lsGetOrders();
}

export async function createOrder(order: Omit<OrderRecord, 'id'>): Promise<OrderRecord> {
  if (useApi()) {
    return await http<OrderRecord>(buildApiUrl('/orders'), {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }
  return lsAddOrder(order);
}

export async function modifyOrder(id: number, patch: Partial<OrderRecord>): Promise<void> {
  if (useApi()) {
    await http<void>(buildApiUrl(`/orders/${id}`), {
      method: 'PATCH',
      body: JSON.stringify(patch),
    });
    return;
  }
  lsUpdateOrder(id, patch);
}

export async function removeOrder(id: number): Promise<void> {
  if (useApi()) {
    await http<void>(buildApiUrl(`/orders/${id}`), { method: 'DELETE' });
    return;
  }
  lsDeleteOrder(id);
}


