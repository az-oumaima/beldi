export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '';

export function buildApiUrl(path: string): string {
  const base = API_BASE_URL?.replace(/\/$/, '') || '';
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}


