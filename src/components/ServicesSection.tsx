import { Fish, Waves, Palmtree, Package, Sparkles, Clock, Plus, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import DecorativeBackground from "./DecorativeBackground";

const services = [
  {
    id: 1,
    icon: Fish,
    title: "Trip Mancing",
    description: "Layanan paling populer! Nikmati pengalaman mancing di spot-spot terbaik perairan Batam.",
    features: [
      "Spot mancing terbaik",
      "Peralatan lengkap tersedia",
      "Guide berpengalaman",
      "Konsumsi & es tersedia"
    ],
    highlight: true,
  },
  {
    id: 2,
    icon: Waves,
    title: "Jasa Nyelam",
    description: "Servis bawah kapal, pembersihan, dan kebutuhan penyelaman lainnya dengan tim profesional.",
    features: [
      "Tim penyelam profesional",
      "Peralatan diving lengkap",
      "Servis bawah kapal",
      "Dokumentasi underwater"
    ],
  },
  {
    id: 3,
    icon: Palmtree,
    title: "Wisata Barelang",
    description: "Jelajahi keindahan pulau-pulau sekitar Barelang dengan kapal kami yang nyaman.",
    features: [
      "Rute wisata menarik",
      "Kapal nyaman & aman",
      "Foto spot instagramable",
      "Snorkeling equipment"
    ],
  },
  {
    id: 4,
    icon: Package,
    title: "Angkut Barang",
    description: "Layanan logistik laut untuk pengiriman barang antar pulau dengan aman.",
    features: [
      "Pengiriman antar pulau",
      "Tracking real-time",
      "Asuransi barang",
      "Handling profesional"
    ],
  },
  {
    id: 5,
    icon: Sparkles,
    title: "Cleaning Kapal",
    description: "Jasa pembersihan kapal di tengah laut dengan peralatan dan tim yang berpengalaman.",
    features: [
      "Pembersihan menyeluruh",
      "Peralatan modern",
      "Tim berpengalaman",
      "Hasil maksimal terjamin"
    ],
  },
  {
    id: 6,
    icon: Clock,
    title: "Sewa Harian",
    description: "Sewa kapal per hari (8 jam) untuk berbagai kebutuhan sesuai keinginan Anda.",
    features: [
      "Sewa 8 jam penuh",
      "Fleksibel sesuai kebutuhan",
      "BBM included",
      "Crew profesional"
    ],
  },
];

const ServicesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // WhatsApp contact
  const phoneNumber = "6281234567890";
  const getWhatsAppUrl = (serviceName: string) => {
    const message = encodeURIComponent(
      `Halo, saya tertarik dengan layanan ${serviceName}. Bisakah saya mendapatkan informasi lebih lanjut?`
    );
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <section id="layanan" className="py-20 bg-background relative overflow-hidden">
            <DecorativeBackground variant="default" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Layanan <span className="bg-gradient-to-r from-primary to-[hsl(210_100%_60%)] bg-clip-text text-transparent">Kami</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-[hsl(210_100%_60%)] mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kami menyediakan berbagai layanan transportasi laut untuk memenuhi semua kebutuhan Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card-wrapper z-10"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
                 {/* Popular Badge */}
                  {service.highlight && (
                    <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full z-50">
                      Populer
                    </div>
                  )}
              <div 
                className={`
                  service-card relative overflow-hidden rounded-2xl 
                  ${service.highlight 
                    ? 'bg-gradient-to-br from-primary to-[hsl(210_100%_60%)] text-primary-foreground' 
                    : 'bg-card border-2 border-border/50'
                  }
                  ${hoveredCard === service.id ? 'is-hovered' : ''}
                `}
              >
               
                <div className="p-6 flex flex-col min-h-[320px]">

                  {/* Icon */}
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center mb-4
                    ${service.highlight ? 'bg-primary-foreground/20' : 'bg-gradient-to-br from-primary to-[hsl(210_100%_60%)]'}
                  `}>
                    <service.icon className={`w-7 h-7 ${service.highlight ? 'text-primary-foreground' : 'text-primary-foreground'}`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-semibold mb-3 ${service.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {service.title}
                  </h3>

                  {/* Content Area - Description and Features in same position */}
                  <div className="relative flex-1 mb-4">
                    {/* Description */}
                    <div className="service-description absolute inset-0">
                      <p className={`text-sm leading-relaxed ${service.highlight ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                        {service.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="service-features absolute inset-0">
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div 
                            key={idx} 
                            className="service-feature-item flex items-start gap-2"
                            style={{ '--delay': `${idx * 50}ms` } as React.CSSProperties}
                          >
                            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${service.highlight ? 'text-primary-foreground' : 'text-green-500'}`} />
                            <span className={`text-sm ${service.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Buttons Container */}
                  <div className="mt-auto relative h-10">
                    {/* Plus Button */}
                    <button className={`
                      service-plus-btn absolute inset-0 w-10 h-10 rounded-full border-2 flex items-center justify-center
                      ${service.highlight ? 'border-primary-foreground' : 'border-primary'}
                    `}>
                      <Plus className={`w-5 h-5 ${service.highlight ? 'text-primary-foreground' : 'text-primary'}`} />
                    </button>

                    {/* CTA Button */}
                    <a 
                      href={getWhatsAppUrl(service.title)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="service-cta-btn absolute inset-0 w-full"
                    >
                      <button className={`
                        w-full h-full rounded-lg border-2 font-medium transition-colors group
                        ${service.highlight 
                          ? 'border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary' 
                          : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                        }
                      `}>
                        <span className="flex items-center justify-center">
                          Hubungi Kami
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </a>
                  </div>
                </div>

                {/* Top Border */}
                <div className={`service-top-border absolute top-0 left-0 right-0 h-1 ${service.highlight ? 'bg-primary-foreground' : 'bg-primary'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .service-card-wrapper {
          will-change: transform;
        }

        .service-card {
          cursor: pointer;
          height: 100%;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;
        }

        .service-card.is-hovered {
          transform: scale(1.05) translateZ(0);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          z-index: 10;
        }

        /* Description */
        .service-description {
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity;
          opacity: 1;
          pointer-events: auto;
        }

        .service-card.is-hovered .service-description {
          opacity: 0;
          pointer-events: none;
        }

        /* Features */
        .service-features {
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity;
          opacity: 0;
          pointer-events: none;
        }

        .service-card.is-hovered .service-features {
          opacity: 1;
          pointer-events: auto;
        }

        .service-feature-item {
          transform: translateX(10px) translateZ(0);
          opacity: 0;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: var(--delay);
          will-change: transform, opacity;
        }

        .service-card.is-hovered .service-feature-item {
          transform: translateX(0) translateZ(0);
          opacity: 1;
        }

        /* Buttons */
        .service-plus-btn,
        .service-cta-btn {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }

        .service-plus-btn {
          transform: scale(1) translateZ(0);
          opacity: 1;
        }

        .service-card.is-hovered .service-plus-btn {
          transform: scale(0) translateZ(0);
          opacity: 0;
          pointer-events: none;
        }

        .service-cta-btn {
          transform: scale(0.95) translateZ(0);
          opacity: 0;
          pointer-events: none;
        }

        .service-card.is-hovered .service-cta-btn {
          transform: scale(1) translateZ(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* Top Border */
        .service-top-border {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scaleX(0) translateZ(0);
          transform-origin: left;
          will-change: transform;
        }

        .service-card.is-hovered .service-top-border {
          transform: scaleX(1) translateZ(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .service-card,
          .service-description,
          .service-features,
          .service-feature-item,
          .service-plus-btn,
          .service-cta-btn,
          .service-top-border {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;