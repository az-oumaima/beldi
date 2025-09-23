import React from 'react';
import { Phone, Mail, MessageCircle, Instagram, Facebook } from 'lucide-react';

export function ContactSection() {
  const phoneDisplay = '0687978925';
  const phoneLink = 'tel:0687978925';
  const waLink = 'https://wa.me/212687978925';
  const igLink = 'https://instagram.com/beldi.ma';
  const fbLink = 'https://facebook.com/beldi.ma';
  const email = 'info@beldi.ma';

  return (
    <section id="contact" className="py-12 bg-beige-100">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left: Logo and socials */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src="/logo.png" alt="Beldi" className="h-24 md:h-36 w-auto" />
            <div className="flex items-center gap-3">
              <a href={igLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-beige-200 hover:bg-beige-300 text-morocco-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={fbLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-beige-200 hover:bg-beige-300 text-morocco-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-beige-200 hover:bg-beige-300 text-morocco-900 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right: Contact details */}
          <div className="text-right">
            <h2 className="text-3xl font-display text-morocco-900 mb-4">اتصل بنا</h2>
            <div className="space-y-3">
              <a href={phoneLink} className="flex items-center justify-between gap-3 rounded-lg border border-beige-300 bg-white px-3 py-2.5 hover:shadow-sm">
                <span className="text-morocco-900 font-medium">{phoneDisplay}</span>
                <Phone className="w-5 h-5 text-morocco-700" />
              </a>
              <a href={`mailto:${email}`} className="flex items-center justify-between gap-3 rounded-lg border border-beige-300 bg-white px-3 py-2.5 hover:shadow-sm">
                <span className="text-morocco-900 font-medium">{email}</span>
                <Mail className="w-5 h-5 text-morocco-700" />
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-lg border border-beige-300 bg-white px-3 py-2.5 hover:shadow-sm">
                <span className="text-morocco-900 font-medium">واتساب</span>
                <MessageCircle className="w-5 h-5 text-morocco-700" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
