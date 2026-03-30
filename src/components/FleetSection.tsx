import { Users, Package, MessageCircle, Ship, Plus, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import DecorativeBackground from "./DecorativeBackground";
import { fleetAPI, contactAPI } from "@/lib/api";

interface FleetItem {
  id: number;
  name: string;
  capacity: string;
  price: string;
  price_per_mile: string;
  description: string;
  features: string[];
  image_url: string | null;
  is_active: boolean;
}

const FleetSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [boats, setBoats]             = useState<FleetItem[]>([]);
  const [whatsappNumber, setWa]       = useState("6281534475202");
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fleetRes, contactRes] = await Promise.all([
          fleetAPI.getAll(),
          contactAPI.getAll(),
        ]);
        setBoats(fleetRes.data);
        if (contactRes.data?.whatsapp_number) {
          setWa(contactRes.data.whatsapp_number);
        }
      } catch (err) {
        console.error("FleetSection fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getWhatsAppLink = (boatName: string) => {
    const message = encodeURIComponent(
      `Halo Rental Boat Batam! Saya ingin bertanya tentang sewa kapal ${boatName}.`
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

        {/* Loading skeleton */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl bg-card border-2 border-border/50 overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
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
                    ${hoveredCard === boat.id ? "is-hovered" : ""}
                  `}
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-primary to-[hsl(210_100%_60%)] flex items-center justify-center overflow-hidden">
                    {boat.image_url ? (
                      <img
                        src={boat.image_url}
                        alt={boat.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Ship className="w-16 h-16 text-primary-foreground/50" />
                    )}
                  </div>

                  <div className="p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {boat.name}
                    </h3>

                    <div className="flex items-center gap-2 text-primary font-medium mb-2">
                      {boat.capacity === "Angkut barang" ? (
                        <Package className="w-4 h-4" />
                      ) : (
                        <Users className="w-4 h-4" />
                      )}
                      <span>{boat.capacity}</span>
                    </div>

                    <div className="mb-3">
                      <div className="text-lg font-bold text-primary">
                        {boat.price_per_mile}
                      </div>
                    </div>

                    <div className="relative mb-4" style={{ minHeight: "120px" }}>
                      {/* Description */}
                      <div className="fleet-description absolute inset-0">
                        <p className="text-muted-foreground text-sm">
                          {boat.description}
                        </p>
                      </div>

                      {/* Features List */}
                      <div className="fleet-features absolute inset-0">
                        <div className="space-y-2">
                          {(boat.features ?? []).map((feature, idx) => (
                            <div
                              key={idx}
                              className="fleet-feature-item flex items-start gap-2"
                              style={{ "--delay": `${idx * 50}ms` } as React.CSSProperties}
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
        )}
      </div>

      <style>{`
        .fleet-card-wrapper { will-change: transform; }

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
          .fleet-card, .fleet-description, .fleet-features,
          .fleet-feature-item, .fleet-plus-btn, .fleet-cta-btn,
          .fleet-top-border { transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
};

export default FleetSection;
