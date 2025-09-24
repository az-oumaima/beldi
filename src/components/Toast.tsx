import { CheckCircle2, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error';

export default function Toast({
  message,
  type = 'success',
  open,
  onClose
}: {
  message: string;
  type?: ToastType;
  open: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      className={
        `pointer-events-none fixed inset-0 z-[70] flex items-center justify-center transition-all duration-300` +
        ` ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`
      }
      aria-live="polite"
      role="status"
    >
      <div
        className={
          `pointer-events-auto mx-4 flex items-center gap-3 rounded-xl shadow-xl px-5 py-3.5 text-sm font-medium` +
          ` ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-100 text-red-900 border border-red-200'}`
        }
      >
        {type === 'success' ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <AlertTriangle className="w-5 h-5" />
        )}
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 rounded-lg px-2 py-1 text-xs border border-beige-300/60 hover:bg-beige-100/60"
          >
            إغلاق
          </button>
        )}
      </div>
    </div>
  );
}


