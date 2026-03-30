import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Camera, Play, FolderOpen, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import DecorativeBackground from "@/components/DecorativeBackground";
import { galleryFoldersAPI, galleryItemsAPI } from "@/lib/api";

interface GalleryFolder {
  id: number;
  name: string;
  item_count: number;
}

interface GalleryItem {
  id: number;
  folder_id: number | null;
  title: string | null;
  file_url: string;
  file_type: "image" | "video";
  file_name: string;
}

const Galeri = () => {
  const [folders, setFolders] = useState<GalleryFolder[]>([]);
  const [totalAll, setTotalAll] = useState<number>(0);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeFolder, setActiveFolder] = useState<number | null>(null); // null = semua
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loadingFolders, setLF] = useState(true);
  const [loadingItems, setLI] = useState(true);

  // Load folders + total count sekali
  useEffect(() => {
    galleryFoldersAPI.getAll()
      .then(res => {
        // Response baru: { folders: [...], total_all: N }
        setFolders(res.data.folders ?? []);
        setTotalAll(res.data.total_all ?? 0);
      })
      .catch(err => console.error("Galeri folders error:", err))
      .finally(() => setLF(false));
  }, []);

  // Load items saat folder berubah
  useEffect(() => {
    setLI(true);
    const req = activeFolder === null
      ? galleryItemsAPI.getAll()
      : galleryItemsAPI.getAll(activeFolder);

    req
      .then(res => setItems(res.data))
      .catch(err => console.error("Galeri items error:", err))
      .finally(() => setLI(false));
  }, [activeFolder]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <DecorativeBackground variant="alternate" />
          <div className="container mx-auto px-4 relative z-10">

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Galeri{" "}
                <span className="bg-gradient-to-r from-primary to-[hsl(210_100%_60%)] bg-clip-text text-transparent">
                  Kami
                </span>
              </h1>
              <div className="w-20 h-1 gradient-ocean mx-auto rounded-full mb-4" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Lihat koleksi foto armada kapal dan berbagai kegiatan pelanggan kami
              </p>
            </div>

            {/* Folder Filter Tabs */}
            {!loadingFolders && (
              <div className="flex justify-center gap-2 mb-8 flex-wrap">
                {/* Tab: Semua */}
                <button
                  onClick={() => setActiveFolder(null)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${activeFolder === null
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-background text-foreground hover:bg-primary/10 border border-border"
                    }`}
                >
                  <FolderOpen className="w-4 h-4" />
                  Semua
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFolder === null ? "bg-primary-foreground/20" : "bg-muted"
                    }`}>
                    {totalAll}
                  </span>
                </button>

                {/* Tab: Per Folder */}
                {folders.map(folder => (
                  <button
                    key={folder.id}
                    onClick={() => setActiveFolder(folder.id)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${activeFolder === folder.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-background text-foreground hover:bg-primary/10 border border-border"
                      }`}
                  >
                    <FolderOpen className="w-4 h-4" />
                    {folder.name}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFolder === folder.id ? "bg-primary-foreground/20" : "bg-muted"
                      }`}>
                      {folder.item_count}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Gallery Grid */}
            {loadingItems ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Camera className="w-12 h-12 mb-3 opacity-40" />
                <p className="text-sm">
                  {activeFolder === null
                    ? "Belum ada foto. Hubungi kami untuk melihat armada secara langsung!"
                    : "Folder ini belum memiliki foto."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative bg-muted border border-border hover:shadow-lg transition-all"
                  >
                    {item.file_type === "video" ? (
                      <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
                        <video
                          src={item.file_url}
                          className="w-full h-full object-cover"
                          muted playsInline loop
                          onMouseOver={e => e.currentTarget.play()}
                          onMouseOut={e => e.currentTarget.pause()}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-black/30 rounded-full p-3 backdrop-blur-sm">
                            <Play className="w-6 h-6 text-white fill-current" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.file_url}
                        alt={item.title ?? item.file_name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <p className="text-center text-muted-foreground mt-8 text-sm">
                Menampilkan {items.length} foto/video
              </p>
            )}
          </div>
        </section>

        {/* Lightbox */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm border-none">
            <div className="relative flex flex-col items-center justify-center min-h-[50vh] max-h-[90vh]">
              {selectedItem && (
                <div className="w-full h-full flex items-center justify-center bg-black/5 p-4">
                  {selectedItem.file_type === "video" ? (
                    <video
                      src={selectedItem.file_url}
                      className="max-w-full max-h-[80vh] object-contain rounded-md shadow-lg"
                      controls autoPlay
                    />
                  ) : (
                    <img
                      src={selectedItem.file_url}
                      alt={selectedItem.title ?? selectedItem.file_name}
                      className="max-w-full max-h-[80vh] object-contain rounded-md shadow-lg"
                    />
                  )}
                </div>
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