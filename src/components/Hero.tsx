import React from 'react';


export function Hero({ onShopNow }: { onShopNow: () => void }) {
  return (
    <section id="home" className="relative py-20 md:py-28 bg-white">
      <div className="container text-center">
        <h1 className="section-title text-4xl md:text-6xl lg:text-7xl mb-4 leading-[1.1]">
          منتجات طبيعية 100%
          <br />
          <span className="text-gold-600">من قلب المغرب</span>
        </h1>
        <p className="hero-subtitle max-w-2xl mx-auto text-morocco-800 mb-8 font-medium">
          عسل أصيل - زيوت طبيعية - أملو
        </p>
        <button
          onClick={onShopNow}
          className="btn-hover bg-gold-600 text-morocco-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-gold-500 transition-all duration-300 shadow-lg"
        >
          تسوق الآن
        </button>
      </div>
    </section>
  );
}

export default Hero;
