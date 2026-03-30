import { MapPin, Target, Heart, CheckCircle2 } from "lucide-react";
import DecorativeBackground from "./DecorativeBackground";

const AboutSection = () => {
  const misiList = [
    "Memberikan layanan rental boat yang profesional, tepat waktu, dan berorientasi pada kepuasan pelanggan.",
    "Mengutamakan standar keselamatan dan kenyamanan dalam setiap perjalanan.",
    "Menyediakan armada boat yang terawat, bersih, dan siap beroperasi.",
    "Menawarkan harga yang kompetitif dengan kualitas layanan terbaik.",
    "Membangun kepercayaan dan hubungan jangka panjang dengan pelanggan dan mitra bisnis.",
    "Terus berinovasi dalam meningkatkan kualitas layanan dan pengalaman pelanggan."
  ];

  return (
    <section id="tentang" className="py-20 bg-background relative overflow-hidden">
      <DecorativeBackground variant="alternate" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tentang
            <span className="bg-gradient-to-r from-primary to-[hsl(210_100%_60%)] bg-clip-text text-transparent"> Kami</span>
          </h2>
          <div className="w-20 h-1 gradient-ocean mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <p className="text-lg text-muted-foreground text-center mb-12">
            <span className="font-semibold text-primary">Rental Boat Batam</span> berdiri sejak tahun 2008
            dan mulai hadir secara online pada tahun 2021. Kami berkomitmen untuk memberikan
            solusi transportasi laut yang mudah, aman, dan terjangkau bagi masyarakat Batam dan sekitarnya.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Visi Card */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 gradient-ocean rounded-xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Visi</h3>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi perusahaan rental boat terdepan di Batam yang dikenal atas layanan yang aman,
                profesional, dan berkualitas tinggi dalam menghadirkan pengalaman perjalanan laut yang
                berkesan bagi setiap pelanggan.
              </p>
            </div>

            {/* Misi Card */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 gradient-ocean rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Misi</h3>
              <div className="space-y-2">
                {misiList.map((misi, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {misi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lokasi Operasional - Full Width */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 gradient-ocean rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Lokasi Operasional</h3>
                <p className="text-muted-foreground">
                  Melayani di tiga area utama: <span className="font-medium text-foreground">Tanjung Riau / Sekupang</span>,
                  <span className="font-medium text-foreground"> Tanjung Banon / Rempang</span>, dan
                  <span className="font-medium text-foreground"> Punggur</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;