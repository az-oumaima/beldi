import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  const waLink = 'https://wa.me/212687978925';
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-[60] inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
      style={{
        right: `calc(1rem + env(safe-area-inset-right))`,
        bottom: `calc(1rem + env(safe-area-inset-bottom))`
      }}
      aria-label="WhatsApp Chat"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}

export default FloatingWhatsApp;
