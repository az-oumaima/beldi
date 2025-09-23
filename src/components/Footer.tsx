import React from 'react';
import { Instagram, Facebook, MessageCircle, Phone, Mail } from 'lucide-react';

export function Footer() {
  const waLink = 'https://wa.me/212687978925';
  const igLink = 'https://instagram.com/beldi.ma';
  const fbLink = 'https://facebook.com/beldi.ma';
  const phoneDisplay = '0687978925';
  const phoneLink = 'tel:0687978925';
  const email = 'info@beldi.ma';

  return (
    <footer className="border-t border-beige-200 bg-white">
      <div className="container py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <img src="/1@2x.png" alt="Beldi" className="h-8 w-auto" />
          <span className="text-sm text-morocco-800">© {new Date().getFullYear()} Beldi</span>
        </div>
        <div className="flex items-center gap-4 text-morocco-900">
          <a href={phoneLink} className="flex items-center gap-1.5 text-sm hover:opacity-80"><Phone className="w-4 h-4" />{phoneDisplay}</a>
          <a href={`mailto:${email}`} className="flex items-center gap-1.5 text-sm hover:opacity-80"><Mail className="w-4 h-4" />{email}</a>
          <div className="w-px h-5 bg-beige-300" />
          <a href={igLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-beige-100 hover:bg-beige-200 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href={fbLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-beige-100 hover:bg-beige-200 transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-beige-100 hover:bg-beige-200 transition-colors">
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
