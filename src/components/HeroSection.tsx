import { Button } from "@/components/ui/button";
import { MessageCircle, Anchor, Waves, Award, ChevronRight, Clock, Zap, MapPin } from "lucide-react";
import imageHero from "@/components/assets/imageHero.png";
import logoHero from "@/components/assets/MainLogo.png";
import { useEffect, useState } from "react";

const HeroSection = () => {
const [scrollY, setScrollY] = useState(0);
  const whatsappNumber = "6283163007652";
  const whatsappMessage = encodeURIComponent(
    "Halo Rental Boot Batam! Saya ingin bertanya tentang layanan sewa kapal."
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageHero})` }}
      />
      <div className="absolute inset-0 bg-primary/60" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
          <Award className="w-4 h-4 text-yellow-400" />
          <span className="text-white text-sm font-medium">Terpercaya sejak 2008</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          Rental Boot Batam
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-3 font-medium">
          Solusi Transportasi Laut Terpercaya
        </p>

        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Mempermudah akses transportasi laut untuk wisata, mancing, angkut barang, 
          dan jasa lainnya di perairan Batam
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 group"
          >
            <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Pesan Sekarang
          </a>
          <a
            href="#armada"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            Lihat Armada
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>

        {/* Stats with icons */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
              16+
            </div>
            <div className="text-sm text-white/80 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              Tahun Pengalaman
            </div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
              24/7
            </div>
            <div className="text-sm text-white/80 flex items-center justify-center gap-1">
              <Zap className="w-4 h-4" />
              Operasional
            </div>
          </div>
          <div className="text-center group">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
              3
            </div>
            <div className="text-sm text-white/80 flex items-center justify-center gap-1">
              <MapPin className="w-4 h-4" />
              Lokasi
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
