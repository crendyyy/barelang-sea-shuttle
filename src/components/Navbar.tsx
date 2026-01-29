import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoNavbar from "@/components/assets/MainLogo.webp";

const navLinks = [
  { href: "#tentang", label: "Tentang", isPage: false, id: "tentang" },
  { href: "#armada", label: "Armada", isPage: false, id: "armada" },
  { href: "#layanan", label: "Layanan", isPage: false, id: "layanan" },
  { href: "/galeri", label: "Galeri", isPage: true, id: null },
  { href: "#keunggulan", label: "Keunggulan", isPage: false, id: "keunggulan" },
  { href: "#kontak", label: "Kontak", isPage: false, id: "kontak" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleClick = (link: typeof navLinks[0]) => {
    // Jika ini adalah page (bukan section), gunakan navigate biasa
    if (link.isPage) {
      navigate(link.href);
      setIsOpen(false);
      return;
    }

    // Jika ada id section, navigate dan scroll
    if (link.id) {
      navigate(`/#${link.id}`);

      // Smooth scroll after navigation
      setTimeout(() => {
        const element = document.getElementById(link.id!);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }

    setIsOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return location.hash === href;
    }
    return location.pathname === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoNavbar}
              alt="Logo"
              className="h-10 w-auto"
            />
            <span className="font-bold text-foreground">Rental Boat Batam</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link)}
                className={`text-sm font-medium transition-colors relative group cursor-pointer ${isActive(link.href)
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </button>
            ))}
            <Button className="gradient-ocean text-primary-foreground" asChild>
              <a href="https://wa.me/6281534475202" target="_blank" rel="noopener noreferrer">
                Hubungi Kami
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link)}
                  className={`text-left transition-colors py-2 cursor-pointer ${isActive(link.href)
                      ? "text-blue-600 font-semibold"
                      : "text-muted-foreground hover:text-primary"
                    }`}
                >
                  {link.label}
                </button>
              ))}
              <Button className="gradient-ocean text-primary-foreground mt-2" asChild>
                <a href="https://wa.me/6281534475202" target="_blank" rel="noopener noreferrer">
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