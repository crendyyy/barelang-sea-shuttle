import { Button } from "@/components/ui/button";
import { MessageCircle, Anchor, Waves } from "lucide-react";

const HeroSection = () => {
  const whatsappNumber = "6283163007652";
  const whatsappMessage = encodeURIComponent(
    "Halo Rental Boot Batam! Saya ingin bertanya tentang layanan sewa kapal."
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 gradient-cinematic" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean-light/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ocean-glow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Gradient Overlay untuk foto background nanti */}
      {/* 
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
      />
      <div className="absolute inset-0 gradient-hero" />
      */}
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10 pt-20">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-ocean-glow/30 rounded-full blur-xl animate-pulse-slow" />
            <div className="relative bg-primary-foreground/10 backdrop-blur-md rounded-full p-5 border border-primary-foreground/20 glow-ocean">
              <Anchor className="w-16 h-16 md:w-20 md:h-20 text-primary-foreground" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground mb-6 glow-text animate-fade-up">
          Rental Boot Batam
        </h1>

        <p className="text-xl md:text-2xl text-ocean-glow font-medium mb-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Solusi Transportasi Laut Terpercaya Sejak 2008
        </p>

        <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Mempermudah akses transportasi laut untuk kebutuhan wisata, mancing, angkut barang, dan jasa lainnya di perairan Batam
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Button
            size="lg"
            className="gradient-gold text-foreground hover:opacity-90 text-lg px-10 py-7 rounded-full shadow-glow font-semibold"
            asChild
          >
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Hubungi via WhatsApp
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-10 py-7 rounded-full bg-primary-foreground/5 backdrop-blur-sm font-medium"
            asChild
          >
            <a href="#armada">
              <Waves className="mr-2 h-5 w-5" />
              Lihat Armada Kami
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center p-6 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
            <div className="text-4xl md:text-5xl font-display font-bold text-primary-foreground glow-text">16+</div>
            <div className="text-sm text-primary-foreground/60 mt-2 font-medium">Tahun Pengalaman</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
            <div className="text-4xl md:text-5xl font-display font-bold text-ocean-glow">24/7</div>
            <div className="text-sm text-primary-foreground/60 mt-2 font-medium">Operasional</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
            <div className="text-4xl md:text-5xl font-display font-bold text-primary-foreground glow-text">3</div>
            <div className="text-sm text-primary-foreground/60 mt-2 font-medium">Lokasi</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;