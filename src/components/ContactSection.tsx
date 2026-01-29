import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import DecorativeBackground from "./DecorativeBackground";

const ContactSection = () => {
  const whatsappNumber = "6281534475202";
  const whatsappDisplay = "081534475202";

  const contactInfo = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: whatsappDisplay,
      href: `https://wa.me/${whatsappNumber}`,
      color: "text-green-500",
    },
    {
      icon: Phone,
      label: "Telepon",
      value: whatsappDisplay,
      href: `tel:${whatsappDisplay}`,
      color: "text-primary",
    },
    {
      icon: Mail,
      label: "Email",
      value: "rentalboatbatam@gmail.com",
      href: "mailto:rentalboatbatam@gmail.com",
      color: "text-red-400",
    },
    {
      icon: MapPin,
      label: "Alamat",
      value: "Tanjung Riau, Barelang & Punggur, Batam",
      href: "https://maps.google.com/?q=Tanjung+Riau+Batam",
      color: "text-blue-400",
    },
  ];

  const socialMedia = [
    {
      icon: Instagram,
      label: "Instagram",
      value: "@rentalboatbatam",
      href: "https://instagram.com/rentalboatbatam",
      color: "text-pink-500",
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "Rental Boot Batam",
      href: "https://facebook.com/rentalboatbatam",
      color: "text-blue-500",
    },
  ];

  return (
    <section id="kontak" className="py-20 bg-background relative overflow-hidden">
      <DecorativeBackground variant="default" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hubungi <span className="bg-gradient-to-r from-primary to-[hsl(210_100%_60%)] bg-clip-text text-transparent">Kami</span>
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
                  href={`https://wa.me/${whatsappNumber}`}
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
