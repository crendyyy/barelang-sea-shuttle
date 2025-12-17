import { Button } from "@/components/ui/button";
import { Users, Package, MessageCircle, Ship } from "lucide-react";

const boats = [
  {
    name: "Pancung Full",
    capacity: "15 orang",
    price: "Rp 1.500.000",
    description: "Kapal cepat untuk perjalanan grup sedang, cocok untuk wisata dan mancing.",
    icon: Ship,
    features: ["Cepat & Stabil", "Cocok untuk Wisata", "Nyaman"],
  },
  {
    name: "Kerubut 7",
    capacity: "7 orang",
    price: "Rp 800.000",
    description: "Kapal kecil untuk perjalanan privat atau grup kecil.",
    icon: Ship,
    features: ["Privat", "Ekonomis", "Fleksibel"],
  },
  {
    name: "Kerubut 15",
    capacity: "15 orang",
    price: "Rp 1.200.000",
    description: "Kapal menengah untuk kebutuhan grup standar dengan kenyamanan optimal.",
    icon: Ship,
    features: ["Kapasitas Sedang", "Nyaman", "Populer"],
  },
  {
    name: "Kerubut 24",
    capacity: "24 orang",
    price: "Rp 1.800.000",
    description: "Kapal besar untuk rombongan, acara keluarga, atau kegiatan perusahaan.",
    icon: Ship,
    features: ["Kapasitas Besar", "Untuk Rombongan", "Luas"],
  },
  {
    name: "Pompong Karbo",
    capacity: "Angkut barang",
    price: "Hubungi Kami",
    description: "Khusus untuk pengangkutan barang dan logistik laut.",
    icon: Package,
    features: ["Angkut Barang", "Kapasitas Besar", "Andal"],
  },
];

const FleetSection = () => {
  const whatsappNumber = "6283163007652";

  const getWhatsAppLink = (boatName: string) => {
    const message = encodeURIComponent(
      `Halo Rental Boot Batam! Saya ingin bertanya tentang sewa kapal ${boatName}.`
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <section id="armada" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-cinematic opacity-5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm">Armada Kami</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-3 mb-4">
            Pilih Kapal Terbaik
          </h2>
          <div className="w-24 h-1 gradient-ocean mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Armada lengkap untuk berbagai kebutuhan transportasi laut Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {boats.map((boat, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover-lift hover:border-primary/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Placeholder Image */}
              <div className="h-52 gradient-cinematic flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent z-10" />
                <boat.icon className="w-24 h-24 text-primary-foreground/30 group-hover:scale-110 transition-transform duration-500" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-glow">
                    {boat.price}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">{boat.name}</h3>
                
                <div className="flex items-center gap-2 text-primary font-medium mb-4">
                  {boat.capacity === "Angkut barang" ? (
                    <Package className="w-5 h-5" />
                  ) : (
                    <Users className="w-5 h-5" />
                  )}
                  <span className="text-lg">{boat.capacity}</span>
                </div>

                <p className="text-muted-foreground mb-5 leading-relaxed">{boat.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {boat.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button className="w-full gradient-ocean text-primary-foreground hover:opacity-90 transition-opacity h-12 text-base font-semibold" asChild>
                  <a
                    href={getWhatsAppLink(boat.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Tanya via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12 text-sm">
          💡 Harga sewanya 8 jam/hari. Diskon 5% untuk penyewaan di hari kerja (Senin-Jumat)
        </p>
      </div>
    </section>
  );
};

export default FleetSection;