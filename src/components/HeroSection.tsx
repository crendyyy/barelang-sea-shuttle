import { Button } from "@/components/ui/button";
import { MessageCircle, Anchor } from "lucide-react";

const HeroSection = () => {
  const whatsappNumber = "6283163007652";
  const whatsappMessage = encodeURIComponent(
    "Halo Rental Boot Batam! Saya ingin bertanya tentang layanan sewa kapal."
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-ocean overflow-hidden">
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(210 40% 98%)"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-full p-4">
            <Anchor className="w-16 h-16 text-primary-foreground" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4 drop-shadow-lg">
          Rental Boot Batam
        </h1>

        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-2 font-medium">
          Solusi Transportasi Laut Terpercaya Sejak 2008
        </p>

        <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Mempermudah akses transportasi laut untuk kebutuhan wisata, mancing, angkut barang, dan jasa lainnya di perairan Batam
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6 rounded-full shadow-lg"
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
            className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-full bg-transparent"
            asChild
          >
            <a href="#armada">Lihat Armada Kami</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-foreground">16+</div>
            <div className="text-sm text-primary-foreground/80">Tahun Pengalaman</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-foreground">24/7</div>
            <div className="text-sm text-primary-foreground/80">Operasional</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-foreground">3</div>
            <div className="text-sm text-primary-foreground/80">Lokasi</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
