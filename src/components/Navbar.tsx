import { useState } from "react";
import { Link } from "react-router-dom";
import { Anchor, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#tentang", label: "Tentang", isExternal: false },
  { href: "#armada", label: "Armada", isExternal: false },
  { href: "#layanan", label: "Layanan", isExternal: false },
  { href: "/galeri", label: "Galeri", isExternal: true },
  { href: "#keunggulan", label: "Keunggulan", isExternal: false },
  { href: "#kontak", label: "Kontak", isExternal: false },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-dark">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="gradient-ocean p-2.5 rounded-xl shadow-glow">
              <Anchor className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-primary-foreground">Rental Boot Batam</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isExternal ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium"
                >
                  {link.label}
                </a>
              )
            ))}
            <Button className="gradient-gold text-foreground font-semibold rounded-full px-6 hover:opacity-90 transition-opacity" asChild>
              <a href="https://wa.me/6283163007652" target="_blank" rel="noopener noreferrer">
                Hubungi Kami
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary-foreground/20">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                link.isExternal ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors py-2 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors py-2 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <Button className="gradient-gold text-foreground font-semibold mt-2 rounded-full" asChild>
                <a href="https://wa.me/6283163007652" target="_blank" rel="noopener noreferrer">
                  Hubungi Kami
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;