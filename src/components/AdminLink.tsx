import { Shield } from 'lucide-react';

export default function AdminLink() {
  const go = () => {
    // Simple hash-based navigation
    window.location.hash = '#/dashboard';
  };
  return (
    <button
      onClick={go}
      className="fixed z-[55] bottom-4 left-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-morocco-700 hover:bg-morocco-800 text-white shadow-lg"
      aria-label="Open dashboard"
    >
      <Shield className="w-5 h-5" />
    </button>
  );
}


