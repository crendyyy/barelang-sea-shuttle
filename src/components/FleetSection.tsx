import { Users, Package, MessageCircle, Ship, Plus, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import DecorativeBackground from "./DecorativeBackground";

const boats = [
  {
    id: 1,
    name: "Pancung Full",
    capacity: "15 orang",
    price: "Rp 1.500.000",
    description: "Kapal cepat untuk perjalanan grup sedang, cocok untuk wisata dan mancing.",
    icon: Ship,
    features: ["Cepat & Stabil", "Cocok untuk Wisata", "Nyaman", "Kapasitas 15 orang"],
  },
  {
    id: 2,
    name: "Kerubut 7",
    capacity: "7 orang",
    price: "Rp 800.000",
    description: "Kapal kecil untuk perjalanan privat atau grup kecil.",
    icon: Ship,
    features: ["Privat", "Ekonomis", "Fleksibel", "Cocok untuk keluarga"],
  },
  {
    id: 3,
    name: "Kerubut 15",
    capacity: "15 orang",
    price: "Rp 1.200.000",
    description: "Kapal menengah untuk kebutuhan grup standar dengan kenyamanan optimal.",
    icon: Ship,
    features: ["Kapasitas Sedang", "Nyaman", "Populer", "Value for money"],
  },
  {
    id: 4,
    name: "Kerubut 24",
    capacity: "24 orang",
    price: "Rp 1.800.000",
    description: "Kapal besar untuk rombongan, acara keluarga, atau kegiatan perusahaan.",
    icon: Ship,
    features: ["Kapasitas Besar", "Untuk Rombongan", "Luas", "Cocok acara"],
  },
  {
    id: 5,
    name: "Pompong Karbo",
    capacity: "Angkut barang",
    price: "Hubungi Kami",
    description: "Khusus untuk pengangkutan barang dan logistik laut.",
    icon: Package,
    features: ["Angkut Barang", "Kapasitas Besar", "Andal", "Logistik laut"],
  },
];

const FleetSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const whatsappNumber = "6283163007652";

  const getWhatsAppLink = (boatName: string) => {
    const message = encodeURIComponent(
      `Halo Rental Boot Batam! Saya ingin bertanya tentang sewa kapal ${boatName}.`
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <section id="armada" className="py-20 bg-muted/50 relative overflow-hidden">
      <DecorativeBackground variant="alternate" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Armada{" "}
            <span className="bg-gradient-to-r from-primary to-[hsl(210_100%_60%)] bg-clip-text text-transparent">
              Kapal Kami
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-[hsl(210_100%_60%)] mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pilih kapal sesuai kebutuhan Anda. Hubungi kami untuk informasi harga dan ketersediaan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {boats.map((boat) => (
            <div
              key={boat.id}
              className="fleet-card-wrapper"
              onMouseEnter={() => setHoveredCard(boat.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div 
                className={`
                  fleet-card relative overflow-hidden rounded-2xl bg-card border-2 border-border/50
                  ${hoveredCard === boat.id ? 'is-hovered' : ''}
                `}
              >
                {/* Placeholder Image */}
                <div className="h-48 bg-gradient-to-br from-primary to-[hsl(210_100%_60%)] flex items-center justify-center">
                  <boat.icon className="w-20 h-20 text-primary-foreground/50" />
                </div>

                <div className="p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {boat.name}
                  </h3>

                  <div className="flex items-center gap-2 text-primary font-medium mb-3">
                    {boat.capacity === "Angkut barang" ? (
                      <Package className="w-4 h-4" />
                    ) : (
                      <Users className="w-4 h-4" />
                    )}
                    <span>{boat.capacity}</span>
                  </div>

                  <div className="text-lg font-bold text-primary mb-3">
                    {boat.price}
                    {boat.price !== "Hubungi Kami" && (
                      <span className="text-xs text-muted-foreground font-normal ml-1">
                        /8 jam
                      </span>
                    )}
                  </div>

                  <div className="relative mb-4" style={{ minHeight: '120px' }}>
                    {/* Description */}
                    <div className="fleet-description absolute inset-0">
                      <p className="text-muted-foreground text-sm">
                        {boat.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="fleet-features absolute inset-0">
                      <div className="space-y-2">
                        {boat.features.map((feature, idx) => (
                          <div 
                            key={idx} 
                            className="fleet-feature-item flex items-start gap-2"
                            style={{ '--delay': `${idx * 50}ms` } as React.CSSProperties}
                          >
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-500" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Buttons Container */}
                  <div className="mt-auto relative h-10">
                    {/* Plus Button */}
                    <button className="fleet-plus-btn absolute inset-0 w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
                      <Plus className="w-5 h-5 text-primary" />
                    </button>

                    {/* CTA Button */}
                    <a 
                      href={getWhatsAppLink(boat.name)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="fleet-cta-btn absolute inset-0 w-full"
                    >
                      <button className="w-full h-full rounded-lg bg-gradient-to-r from-primary to-[hsl(210_100%_60%)] text-primary-foreground font-medium hover:opacity-90 transition-opacity group">
                        <span className="flex items-center justify-center">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Tanya via WhatsApp
                        </span>
                      </button>
                    </a>
                  </div>
                </div>

                {/* Top Border */}
                <div className="fleet-top-border absolute top-0 left-0 right-0 h-1 bg-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .fleet-card-wrapper {
          will-change: transform;
        }

        .fleet-card {
          cursor: pointer;
          height: 100%;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;
        }

        .fleet-card.is-hovered {
          transform: scale(1.05) translateZ(0);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          z-index: 10;
        }

        /* Description */
        .fleet-description {
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity;
          opacity: 1;
          pointer-events: auto;
        }

        .fleet-card.is-hovered .fleet-description {
          opacity: 0;
          pointer-events: none;
        }

        /* Features */
        .fleet-features {
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity;
          opacity: 0;
          pointer-events: none;
        }

        .fleet-card.is-hovered .fleet-features {
          opacity: 1;
          pointer-events: auto;
        }

        .fleet-feature-item {
          transform: translateX(10px) translateZ(0);
          opacity: 0;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: var(--delay);
          will-change: transform, opacity;
        }

        .fleet-card.is-hovered .fleet-feature-item {
          transform: translateX(0) translateZ(0);
          opacity: 1;
        }

        /* Buttons */
        .fleet-plus-btn,
        .fleet-cta-btn {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }

        .fleet-plus-btn {
          transform: scale(1) translateZ(0);
          opacity: 1;
        }

        .fleet-card.is-hovered .fleet-plus-btn {
          transform: scale(0) translateZ(0);
          opacity: 0;
          pointer-events: none;
        }

        .fleet-cta-btn {
          transform: scale(0.95) translateZ(0);
          opacity: 0;
          pointer-events: none;
        }

        .fleet-card.is-hovered .fleet-cta-btn {
          transform: scale(1) translateZ(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* Top Border */
        .fleet-top-border {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scaleX(0) translateZ(0);
          transform-origin: left;
          will-change: transform;
        }

        .fleet-card.is-hovered .fleet-top-border {
          transform: scaleX(1) translateZ(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .fleet-card,
          .fleet-description,
          .fleet-features,
          .fleet-feature-item,
          .fleet-plus-btn,
          .fleet-cta-btn,
          .fleet-top-border {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FleetSection;