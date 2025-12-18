import { MapPin, Target, Heart } from "lucide-react";
import DecorativeBackground from "./DecorativeBackground";

const AboutSection = () => {
  return (
    <section id="tentang" className="py-20 bg-background relative overflow-hidden">
      <DecorativeBackground variant="default" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tentang 
            <span className="bg-gradient-to-r from-primary to-[hsl(210_100%_60%)] bg-clip-text text-transparent"> Kami</span>
          </h2>
          <div className="w-20 h-1 gradient-ocean mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground text-center mb-12">
            <span className="font-semibold text-primary">Rental Boot Batam</span> berdiri sejak tahun 2008 
            dan mulai hadir secara online pada tahun 2021. Kami berkomitmen untuk memberikan 
            solusi transportasi laut yang mudah, aman, dan terjangkau bagi masyarakat Batam dan sekitarnya.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 gradient-ocean rounded-xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Visi</h3>
              <p className="text-muted-foreground">
                Menjadi penyedia jasa transportasi laut terpercaya yang mempermudah 
                akses perairan Batam untuk semua kalangan.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 gradient-ocean rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Misi</h3>
              <p className="text-muted-foreground">
                Membantu nelayan mendapat pekerjaan sekaligus mempermudah 
                customer dalam memenuhi kebutuhan transportasi laut mereka.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 gradient-ocean rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Lokasi Operasional</h3>
              <p className="text-muted-foreground">
                Melayani di tiga area utama: <span className="font-medium">Tanjung Riau</span>, 
                <span className="font-medium"> Barelang</span>, dan 
                <span className="font-medium"> Punggur</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
