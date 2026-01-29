import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Camera, Ship, Anchor, Fish, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import DecorativeBackground from "@/components/DecorativeBackground";


const imagesInput = import.meta.glob('@/components/assets/galeri/*.{png,jpg,jpeg,jfif,webp,mp4}', { eager: true });

const galleryItems = Object.entries(imagesInput).map(([path, module]: [string, any], index) => {
  const fileName = path.split('/').pop()?.split('.')[0] || `Image ${index + 1}`;
  // Format title: replace hyphens/underscores with spaces, add spaces before capital letters
  const title = fileName
    .replace(/[-_]/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim();
  const isVideo = fileName.toLowerCase().endsWith('.mp4') || path.toLowerCase().endsWith('.mp4');

  return {
    id: index + 1,
    category: "semua",
    title: title,
    src: module.default,
    type: isVideo ? 'video' : 'image',
    icon: isVideo ? Play : Camera,
  };
});

const categories = [
  { id: "semua", label: "Semua" },
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
          <DecorativeBackground variant="alternate" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Galeri <span className="bg-gradient-to-r from-primary to-[hsl(210_100%_60%)] bg-clip-text text-transparent">Kami</span>
              </h1>
              <div className="w-20 h-1 gradient-ocean mx-auto rounded-full mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Lihat koleksi foto armada kapal dan berbagai kegiatan pelanggan kami
              </p>
            </div>

            {/* Category Filter */}
            {/* Category Filter - Hidden for simple view */
              /* 
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
              */
            }

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative bg-muted border border-border hover:shadow-lg transition-all"
                >
                  {item.src ? (
                    item.type === 'video' ? (
                      <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
                        <video
                          src={item.src}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          loop
                          onMouseOver={event => event.currentTarget.play()}
                          onMouseOut={event => event.currentTarget.pause()}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-black/30 rounded-full p-3 backdrop-blur-sm">
                            <Play className="w-6 h-6 text-white fill-current" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-primary/60 bg-primary/10">
                      <item.icon className="w-12 h-12 mb-2" />
                      <span className="text-xs">{item.title}</span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white font-medium text-sm truncate w-full">
                      {item.title}
                    </span>
                  </div> */}
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
          <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm border-none">
            <div className="relative flex flex-col items-center justify-center min-h-[50vh] max-h-[90vh]">
              {selectedImage && (
                <>
                  <div className="w-full h-full flex items-center justify-center bg-black/5 p-4">
                    {selectedImage.type === 'video' ? (
                      <video
                        src={selectedImage.src}
                        className="max-w-full max-h-[80vh] object-contain rounded-md shadow-lg"
                        controls
                        autoPlay
                      />
                    ) : (
                      <img
                        src={selectedImage.src}
                        alt={selectedImage.title}
                        className="max-w-full max-h-[80vh] object-contain rounded-md shadow-lg"
                      />
                    )}
                  </div>
                  {/* <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 text-white backdrop-blur-md">
                    <h3 className="text-lg font-semibold text-center">
                      {selectedImage.title}
                    </h3>
                  </div> */}
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
