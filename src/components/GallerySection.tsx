import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Camera, Ship, Anchor, Fish } from "lucide-react";

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

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems =
    activeCategory === "semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="galeri" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Galeri Kami
          </h2>
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
    </section>
  );
};

export default GallerySection;
