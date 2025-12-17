import { Fish, Waves, Palmtree, Package, Sparkles, Clock } from "lucide-react";

const services = [
  {
    icon: Fish,
    title: "Trip Mancing",
    description: "Layanan paling populer! Nikmati pengalaman mancing di spot-spot terbaik perairan Batam.",
    highlight: true,
  },
  {
    icon: Waves,
    title: "Jasa Nyelam",
    description: "Servis bawah kapal, pembersihan, dan kebutuhan penyelaman lainnya dengan tim profesional.",
  },
  {
    icon: Palmtree,
    title: "Wisata Barelang",
    description: "Jelajahi keindahan pulau-pulau sekitar Barelang dengan kapal kami yang nyaman.",
  },
  {
    icon: Package,
    title: "Angkut Barang",
    description: "Layanan logistik laut untuk pengiriman barang antar pulau dengan aman.",
  },
  {
    icon: Sparkles,
    title: "Cleaning Kapal",
    description: "Jasa pembersihan kapal di tengah laut dengan peralatan dan tim yang berpengalaman.",
  },
  {
    icon: Clock,
    title: "Sewa Harian",
    description: "Sewa kapal per hari (8 jam) untuk berbagai kebutuhan sesuai keinginan Anda.",
  },
];

const ServicesSection = () => {
  return (
    <section id="layanan" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Layanan Kami
          </h2>
          <div className="w-20 h-1 gradient-ocean mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kami menyediakan berbagai layanan transportasi laut untuk memenuhi semua kebutuhan Anda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 transition-all hover:-translate-y-1 ${
                service.highlight
                  ? "gradient-ocean text-primary-foreground shadow-xl"
                  : "bg-card border border-border shadow-lg hover:shadow-xl"
              }`}
            >
              {service.highlight && (
                <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Populer
                </div>
              )}

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  service.highlight
                    ? "bg-primary-foreground/20"
                    : "gradient-ocean"
                }`}
              >
                <service.icon
                  className={`w-7 h-7 ${
                    service.highlight ? "text-primary-foreground" : "text-primary-foreground"
                  }`}
                />
              </div>

              <h3
                className={`text-xl font-semibold mb-2 ${
                  service.highlight ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {service.title}
              </h3>

              <p
                className={
                  service.highlight ? "text-primary-foreground/90" : "text-muted-foreground"
                }
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
