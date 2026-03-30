import {
  Wallet,
  Clock,
  Wrench,
  ClipboardCheck,
  Percent,
  CheckCircle,
} from "lucide-react";
import DecorativeBackground from "./DecorativeBackground";

const advantages = [
  {
    icon: Wallet,
    title: "Harga Fleksibel",
    description:
      "Solusi harga yang menyesuaikan budget Anda tanpa mengorbankan kualitas layanan.",
  },
  {
    icon: Clock,
    title: "Operasional 24/7",
    description:
      "Siap melayani kapan saja Anda butuhkan, setiap hari tanpa libur.",
  },
  {
    icon: Wrench,
    title: "Maintenance Rutin",
    description:
      "Pengecekan dan perawatan kapal setiap minggu untuk keamanan dan kenyamanan Anda.",
  },
  {
    icon: ClipboardCheck,
    title: "Survei H-1",
    description:
      "Konfirmasi dan survei kondisi kapal H-1 sebelum keberangkatan untuk memastikan kesiapan.",
  },
  {
    icon: Percent,
    title: "Diskon Weekdays",
    description: "Hemat 5% untuk sewa di hari kerja (Senin - Jumat).",
  },
  {
    icon: CheckCircle,
    title: "Semua Kebutuhan Terlayani",
    description:
      "Kami berusaha menyediakan semua yang Anda butuhkan untuk perjalanan laut.",
  },
];

const AdvantagesSection = () => {
  return (
    <section
      id="keunggulan"
      className="py-20 bg-muted/50 relative overflow-hidden"
    >
      <DecorativeBackground variant="alternate" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mengapa{" "}
            <span className="bg-gradient-to-r from-primary to-[hsl(210_100%_60%)] bg-clip-text text-transparent">
              Memilih Kami?
            </span>
          </h2>
          <div className="w-20 h-1 gradient-ocean mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Keunggulan yang membuat Rental Boat Batam menjadi pilihan terpercaya
            sejak 2008
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {advantages.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-12 h-12 gradient-ocean rounded-lg flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
