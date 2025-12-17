import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Ship, Anchor, Fish, ArrowLeft, X } from "lucide-react";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const galleryItems = [
  {
    id: 1,
    category: "kapal",
    title: "Kapal Pancung Full",
    description: "Kapal cepat dengan kapasitas 15 orang",
    placeholder: true,
    icon: Ship,
  },
  {
    id: 2,
    category: "kapal",
    title: "Kapal Kerubut",
    description: "Tersedia dalam kapasitas 7, 15, dan 24 orang",
    placeholder: true,
    icon: Ship,
  },
  {
    id: 3,
    category: "kegiatan",
    title: "Trip Mancing",
    description: "Pengalaman mancing seru di perairan Batam",
    placeholder: true,
    icon: Fish,
  },
  {
    id: 4,
    category: "kapal",
    title: "Pompong Karbo",
    description: "Khusus untuk angkut barang dan logistik",
    placeholder: true,
    icon: Anchor,
  },
  {
    id: 5,
    category: "kegiatan",
    title: "Wisata Barelang",
    description: "Jelajahi keindahan jembatan Barelang",
    placeholder: true,
    icon: Camera,
  },
  {
    id: 6,
    category: "kegiatan",
    title: "Jasa Nyelam",
    description: "Inspeksi bawah laut profesional",
    placeholder: true,
    icon: Anchor,
  },
  {
    id: 7,
    category: "kapal",
    title: "Interior Kapal",
    description: "Kenyamanan di dalam kapal kami",
    placeholder: true,
    icon: Ship,
  },
  {
    id: 8,
    category: "kegiatan",
    title: "Sunset Trip",
    description: "Nikmati matahari terbenam di laut",
    placeholder: true,
    icon: Camera,
  },
];

const categories = [
  { id: "semua", label: "Semua" },
  { id: "kapal", label: "Kapal" },
  { id: "kegiatan", label: "Kegiatan" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems =
    activeCategory === "semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-cinematic text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Beranda</span>
          </Link>
          
          <div className="text-center py-12">
            <span className="text-ocean-glow font-medium tracking-wider uppercase text-sm">Dokumentasi</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mt-3 mb-4 glow-text">
              Galeri Kami
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Lihat koleksi foto armada kapal dan berbagai kegiatan pelanggan kami
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? "gradient-ocean text-primary-foreground shadow-glow"
                  : "bg-card text-foreground hover:bg-secondary border border-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group aspect-square rounded-2xl overflow-hidden cursor-pointer relative bg-card border border-border hover:border-primary/50 hover-lift"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Placeholder Content */}
              <div className="absolute inset-0 gradient-cinematic flex flex-col items-center justify-center p-6 text-center">
                <item.icon className="w-16 h-16 text-primary-foreground/40 mb-4 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-lg font-display font-semibold text-primary-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-primary-foreground/60">
                  {item.description}
                </p>
                <span className="text-xs text-ocean-glow mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  (Foto segera hadir)
                </span>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <div className="text-center mt-16 p-8 rounded-2xl glass">
          <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-display font-semibold text-foreground mb-2">
            Foto Akan Segera Ditambahkan
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Hubungi kami untuk melihat armada secara langsung atau request foto tertentu
          </p>
          <Button className="gradient-ocean text-primary-foreground" asChild>
            <a
              href="https://wa.me/6283163007652?text=Halo,%20saya%20ingin%20melihat%20foto%20armada%20kapal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Minta Foto via WhatsApp
            </a>
          </Button>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-0">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="aspect-video gradient-cinematic flex flex-col items-center justify-center p-8">
            {selectedImage && (
              <>
                <selectedImage.icon className="w-24 h-24 text-primary-foreground/40 mb-6" />
                <h3 className="text-2xl font-display font-semibold text-primary-foreground mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-primary-foreground/70 text-center max-w-md">
                  {selectedImage.description}
                </p>
                <span className="text-ocean-glow mt-6 text-sm">
                  Foto akan segera tersedia
                </span>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <FloatingWhatsApp />
    </div>
  );
};

export default Gallery;