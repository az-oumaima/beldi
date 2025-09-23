import React from 'react';
import { Shield, Truck, BadgeCheck } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container">
        <h2 className="section-title text-3xl md:text-4xl mb-6 text-center">من نحن</h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-morocco-800 leading-relaxed mb-10 text-center">
          نقدم منتجات طبيعية أصيلة، مختارة بعناية من قلب المغرب. نحن ملتزمون بتقديم أجود أنواع العسل والزيوت الطبيعية والأملو التقليدي، محافظين على الجودة العالية والطعم الأصيل.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-right">
          <div className="rounded-xl border border-beige-300 bg-beige-50 p-5 flex items-start gap-3">
            <Shield className="w-6 h-6 text-morocco-700 flex-shrink-0" />
            <div>
              <div className="font-display text-morocco-900 mb-1">جودة ممتازة</div>
              <div className="text-sm text-morocco-800">مكونات أصلية مختارة بعناية ومراقبة صارمة للجودة.</div>
            </div>
          </div>
          <div className="rounded-xl border border-beige-300 bg-beige-50 p-5 flex items-start gap-3">
            <Truck className="w-6 h-6 text-morocco-700 flex-shrink-0" />
            <div>
              <div className="font-display text-morocco-900 mb-1">الدفع عند الاستلام</div>
              <div className="text-sm text-morocco-800">راحة وأمان كامل، ادفع فقط عند تسلمك للطلب.</div>
            </div>
          </div>
          <div className="rounded-xl border border-beige-300 bg-beige-50 p-5 flex items-start gap-3">
            <BadgeCheck className="w-6 h-6 text-morocco-700 flex-shrink-0" />
            <div>
              <div className="font-display text-morocco-900 mb-1">رضا مضمون</div>
              <div className="text-sm text-morocco-800">إذا لم تكن راضياً، نضمن لك حلولاً سريعة وعادلة.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
