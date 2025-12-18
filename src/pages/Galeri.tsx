import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Camera, Ship, Anchor, Fish } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const galleryItems = [
  {
    id: 1,
    category: "kapal",
    title: "Kapal Pancung Full",
    placeholder: true,
    icon: Ship,
  },
  {
    id: 2,
    category: "kapal",
    title: "Kapal Kerubut",
    placeholder: true,
    icon: Ship,
  },
  {
    id: 3,
    category: "kegiatan",
    title: "Trip Mancing",
    placeholder: true,
    icon: Fish,
  },
  {
    id: 4,
    category: "kapal",
    title: "Pompong Karbo",
    placeholder: true,
    icon: Anchor,
  },
  {
    id: 5,
    category: "kegiatan",
    title: "Wisata Barelang",
    placeholder: true,
    icon: Camera,
  },
  {
    id: 6,
    category: "kegiatan",
    title: "Jasa Nyelam",
    placeholder: true,
    icon: Anchor,
  },
];

const categories = [
  { id: "semua", label: "Semua" },
  { id: "kapal", label: "Kapal" },
  { id: "kegiatan", label: "Kegiatan" },
];

const Galeri = () => {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems =
    activeCategory === "semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Gradient Circles */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
            
            {/* Wave Pattern Top */}
            <svg className="absolute top-0 left-0 right-0 w-full opacity-30" viewBox="0 0 1440 120" fill="none">
              <path
                d="M0 60L60 52C120 44 240 28 360 32C480 36 600 60 720 68C840 76 960 68 1080 56C1200 44 1320 28 1380 20L1440 12V0H0V60Z"
                fill="hsl(var(--primary))"
                fillOpacity="0.1"
              />
            </svg>
            
            {/* Wave Pattern Bottom */}
            <svg className="absolute bottom-0 left-0 right-0 w-full opacity-20" viewBox="0 0 1440 120" fill="none">
              <path
                d="M0 60L60 68C120 76 240 92 360 88C480 84 600 60 720 52C840 44 960 52 1080 64C1200 76 1320 92 1380 100L1440 108V120H0V60Z"
                fill="hsl(var(--primary))"
                fillOpacity="0.15"
              />
            </svg>
            
            {/* Floating Dots Pattern */}
            <div className="absolute top-20 right-20 grid grid-cols-3 gap-3 opacity-20">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-primary rounded-full" />
              ))}
            </div>
            <div className="absolute bottom-40 left-20 grid grid-cols-3 gap-3 opacity-20">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-primary rounded-full" />
              ))}
            </div>
            
            {/* Decorative Lines */}
            <div className="absolute top-40 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute bottom-60 left-1/4 w-48 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Galeri Kami
              </h1>
              <div className="w-20 h-1 gradient-ocean mx-auto rounded-full mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Lihat koleksi foto armada kapal dan berbagai kegiatan pelanggan kami
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground hover:bg-primary/10 border border-border"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative bg-primary/10 border border-border hover:border-primary/50 transition-all"
                >
                  {/* Placeholder Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/60 group-hover:text-primary transition-colors">
                    <item.icon className="w-12 h-12 mb-2" />
                    <span className="text-sm font-medium text-center px-2">
                      {item.title}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      (Foto segera hadir)
                    </span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground mt-8 text-sm">
              📸 Foto-foto akan segera ditambahkan. Hubungi kami untuk melihat armada secara langsung!
            </p>
          </div>
        </section>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden">
            <div className="aspect-video bg-primary/10 flex flex-col items-center justify-center">
              {selectedImage && (
                <>
                  <selectedImage.icon className="w-20 h-20 text-primary/60 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground">
                    {selectedImage.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Foto akan segera tersedia
                  </p>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Galeri;
