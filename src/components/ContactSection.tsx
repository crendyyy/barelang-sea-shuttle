import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import DecorativeBackground from "./DecorativeBackground";
import { contactAPI } from "@/lib/api";

interface ContactSettings {
  whatsapp_number: string;
  whatsapp_display: string;
  phone: string;
  email: string;
  address: string;
  instagram_handle: string;
  instagram_url: string;
  facebook_name: string;
  facebook_url: string;
  tiktok_handle: string;
  tiktok_url: string;
  youtube_name: string;
  youtube_url: string;
}

const DEFAULT: ContactSettings = {
  whatsapp_number: "6281534475202",
  whatsapp_display: "081534475202",
  phone: "081534475202",
  email: "rentalboatbatam@gmail.com",
  address: "Tanjung Riau, Barelang & Punggur, Batam",
  instagram_handle: "@rentalboatbatam",
  instagram_url: "https://instagram.com/rentalboatbatam",
  facebook_name: "Rental Boat Batam",
  facebook_url: "https://facebook.com/rentalboatbatam",
  tiktok_handle: "@rentalboatbatam",
  tiktok_url: "https://tiktok.com/@rentalboatbatam",
  youtube_name: "Rental Boat Batam",
  youtube_url: "https://youtube.com/@rentalboatbatam",
};

// Icon TikTok (SVG karena tidak ada di Lucide)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
  </svg>
);

// Icon YouTube (SVG)
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const ContactSection = () => {
  const [contact, setContact] = useState<ContactSettings>(DEFAULT);

  useEffect(() => {
    contactAPI.getAll()
      .then(res => setContact({ ...DEFAULT, ...res.data }))
      .catch(err => console.error("ContactSection fetch error:", err));
  }, []);

  const contactInfo = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact.whatsapp_display,
      href: `https://wa.me/${contact.whatsapp_number}`,
      color: "text-green-500",
    },
    {
      icon: Phone,
      label: "Telepon",
      value: contact.phone,
      href: `tel:${contact.phone}`,
      color: "text-primary",
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: "text-red-400",
    },
    {
      icon: MapPin,
      label: "Alamat",
      value: contact.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(contact.address)}`,
      color: "text-blue-400",
    },
  ];

  const socialMedia = [
    {
      icon: Instagram,
      label: "Instagram",
      value: contact.instagram_handle,
      href: contact.instagram_url,
      color: "text-pink-500",
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: contact.facebook_name,
      href: contact.facebook_url,
      color: "text-blue-500",
    },
    {
      icon: TikTokIcon,
      label: "TikTok",
      value: contact.tiktok_handle,
      href: contact.tiktok_url,
      color: "text-slate-800 dark:text-slate-200",
    },
    {
      icon: YouTubeIcon,
      label: "YouTube",
      value: contact.youtube_name,
      href: contact.youtube_url,
      color: "text-red-500",
    },
  ];

  return (
    <section id="kontak" className="py-20 bg-background relative overflow-hidden">
      <DecorativeBackground variant="default" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hubungi{" "}
            <span className="bg-gradient-to-r from-primary to-[hsl(210_100%_60%)] bg-clip-text text-transparent">
              Kami
            </span>
          </h2>
          <div className="w-20 h-1 gradient-ocean mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Siap melayani kebutuhan transportasi laut Anda 24/7
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Contact Info */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">Kontak</h3>
              <div className="space-y-5">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group hover:bg-muted/50 p-3 rounded-xl transition-colors -mx-3"
                  >
                    <div className={`p-3 rounded-xl bg-muted ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">Media Sosial</h3>
              <div className="space-y-5">
                {socialMedia.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group hover:bg-muted/50 p-3 rounded-xl transition-colors -mx-3"
                  >
                    <div className={`p-3 rounded-xl bg-muted ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* CTA WhatsApp */}
              <div className="mt-8 pt-6 border-t border-border">
                <a
                  href={`https://wa.me/${contact.whatsapp_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl gradient-ocean text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat via WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;