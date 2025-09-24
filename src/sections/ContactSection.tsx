import { Phone, Mail, MessageCircle, Instagram, Facebook } from 'lucide-react';

export function ContactSection() {
  const phoneDisplay = '0687978925';
  const phoneLink = 'tel:0687978925';
  const waLink = 'https://wa.me/212687978925';
  const igLink = 'https://www.instagram.com/beldi__ma?igsh=eDVwanQ0bnB0MTZy';
  const fbLink = 'https://www.facebook.com/share/1DBqMUGofH/?mibextid=wwXIfr';
  const email = 'info@beldi.ma';

  return (
    <section id="contact" className="relative pt-8 pb-16 bg-beige-100">
      <div className="container center-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Swapped: Logo and socials moved to the right on md+ */}
          <div className="md:order-2 flex flex-col items-center md:items-center gap-4">
            <img src="/logo.png" alt="Beldi" className="h-28 md:h-40 w-auto" />
            <div className="flex items-center justify-center gap-3">
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

          {/* Swapped: Contact details moved to the left on md+ */}
          <div className="md:order-1 md:mr-40 mr-0 text-right">
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
            </div>
          </div>
        </div>
        {/* Dashboard icon fixed to bottom inside section */}
        <button
          onClick={() => { window.location.hash = '#/dashboard'; }}
          aria-label="Open dashboard"
          className="absolute left-4 bottom-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-morocco-700 hover:bg-morocco-800 text-white shadow-lg"
        >
          <span className="text-sm">⚙️</span>
        </button>
      </div>
    </section>
  );
}

export default ContactSection;
