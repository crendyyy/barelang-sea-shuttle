import { Anchor, MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-ocean-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-foreground/20 rounded-full p-2">
                <Anchor className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Rental Boot Batam</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Solusi transportasi laut terpercaya sejak 2008.
              Melayani berbagai kebutuhan perjalanan laut di perairan Batam.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  Tanjung Riau, Barelang, Punggur - Batam
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a
                  href="https://wa.me/6281534475202"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  081534475202
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">Buka 24/7</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Ikuti Kami</h3>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/rentalbootbatam"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/20 hover:bg-primary-foreground/30 p-3 rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/rentalbootbatam"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/20 hover:bg-primary-foreground/30 p-3 rounded-full transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <p className="text-primary-foreground/80 text-sm mt-4">
              @rentalbootbatam
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Rental Boot Batam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
