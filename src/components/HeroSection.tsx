import { Button } from "@/components/ui/button";
import { MessageCircle, Anchor, Waves, Award, ChevronRight, Clock, Zap, MapPin } from "lucide-react";
import imageHero from "@/components/assets/image.png";
import { useEffect, useState, useMemo } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const whatsappNumber = "6281534475202";

  // OPTIMIZED: Memoize URL
  const whatsappUrl = useMemo(() => {
    const message = encodeURIComponent(
      "Halo Rental Boot Batam! Saya ingin bertanya tentang layanan sewa kapal."
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  }, [whatsappNumber]);

  // OPTIMIZED: Memoize stats data
  const stats = useMemo(() => [
    { value: "16+", label: "Tahun Pengalaman", icon: Clock },
    { value: "24/7", label: "Operasional", icon: Zap },
    { value: "3", label: "Lokasi", icon: MapPin }
  ], []);

  useEffect(() => {
    // Non-blocking visibility trigger
    requestAnimationFrame(() => {
      setTimeout(() => setIsVisible(true), 100);
    });
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        contain: 'layout paint',
        willChange: 'auto'
      }}
    >
      {/* OPTIMIZED: Background image with better loading */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageHero})`,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />
      <div className="absolute inset-0 bg-primary/60 pointer-events-none" />

      <div
        className="container mx-auto px-4 text-center relative z-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease'
        }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
          <Award className="w-4 h-4 text-yellow-400" />
          <span className="text-white text-sm font-medium">Terpercaya sejak 2008</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Rental Boot Batam
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-3 font-medium">
          Solusi Transportasi Laut Terpercaya
        </p>

        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Mempermudah akses transportasi laut untuk wisata, mancing, angkut barang,
          dan jasa lainnya di perairan Batam
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            Pesan Sekarang
          </a>
          <a
            href="#armada"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Lihat Armada
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-200">
                {stat.value}
              </div>
              <div className="text-sm text-white/80 flex items-center justify-center gap-1">
                <stat.icon className="w-4 h-4" />
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;