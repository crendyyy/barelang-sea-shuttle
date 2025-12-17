import { Button } from "@/components/ui/button";
import { Users, Package, MessageCircle, Ship } from "lucide-react";

const boats = [
  {
    name: "Pancung Full",
    capacity: "15 orang",
    description: "Kapal cepat untuk perjalanan grup sedang, cocok untuk wisata dan mancing.",
    icon: Ship,
    features: ["Cepat & Stabil", "Cocok untuk Wisata", "Nyaman"],
  },
  {
    name: "Kerubut 7",
    capacity: "7 orang",
    description: "Kapal kecil untuk perjalanan privat atau grup kecil.",
    icon: Ship,
    features: ["Privat", "Ekonomis", "Fleksibel"],
  },
  {
    name: "Kerubut 15",
    capacity: "15 orang",
    description: "Kapal menengah untuk kebutuhan grup standar dengan kenyamanan optimal.",
    icon: Ship,
    features: ["Kapasitas Sedang", "Nyaman", "Populer"],
  },
  {
    name: "Kerubut 24",
    capacity: "24 orang",
    description: "Kapal besar untuk rombongan, acara keluarga, atau kegiatan perusahaan.",
    icon: Ship,
    features: ["Kapasitas Besar", "Untuk Rombongan", "Luas"],
  },
  {
    name: "Pompong Karbo",
    capacity: "Angkut barang",
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
    <section id="armada" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Armada Kapal Kami
          </h2>
          <div className="w-20 h-1 gradient-ocean mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pilih kapal sesuai kebutuhan Anda. Hubungi kami untuk informasi harga dan ketersediaan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {boats.map((boat, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Placeholder Image */}
              <div className="h-48 gradient-ocean-dark flex items-center justify-center">
                <boat.icon className="w-20 h-20 text-primary-foreground/50" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{boat.name}</h3>
                
                <div className="flex items-center gap-2 text-primary font-medium mb-3">
                  {boat.capacity === "Angkut barang" ? (
                    <Package className="w-4 h-4" />
                  ) : (
                    <Users className="w-4 h-4" />
                  )}
                  <span>{boat.capacity}</span>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{boat.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {boat.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button className="w-full gradient-ocean text-primary-foreground" asChild>
                  <a
                    href={getWhatsAppLink(boat.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Tanya via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
