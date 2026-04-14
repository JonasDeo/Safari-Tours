import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logoSrc from "@/assets/logo_thumbnail.png";
import { useSiteSettings } from "@/hooks/use-site-settings";

const FacebookIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const InstagramIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></svg>;
const WhatsAppIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.335-1.508A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.489-5.19-1.345l-.372-.22-3.862.92.978-3.768-.242-.387A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>;
const YoutubeIcon     = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>;
const TripAdvisorIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm-5.5 8.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm11 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM12 14c-1.5 0-2.8.6-3.75 1.57l-.53-.94A6.97 6.97 0 0 1 12 13c1.62 0 3.1.55 4.28 1.63l-.53.94A4.97 4.97 0 0 0 12 14z" /></svg>;

const VisaIcon       = () => <svg viewBox="0 0 48 48" className="h-5 w-auto" fill="none"><rect width="48" height="48" rx="6" fill="#1A1F71" /><text x="7" y="31" fontFamily="Arial" fontWeight="bold" fontSize="16" fill="white">VISA</text></svg>;
const MastercardIcon = () => <svg viewBox="0 0 48 48" className="h-5 w-auto" fill="none"><rect width="48" height="48" rx="6" fill="#252525" /><circle cx="18" cy="24" r="10" fill="#EB001B" /><circle cx="30" cy="24" r="10" fill="#F79E1B" /><path d="M24 16.26a10 10 0 0 1 0 15.48 10 10 0 0 1 0-15.48z" fill="#FF5F00" /></svg>;
const PaypalIcon     = () => <svg viewBox="0 0 48 48" className="h-5 w-auto" fill="none"><rect width="48" height="48" rx="6" fill="#003087" /><text x="7" y="31" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="#009CDE">Pay</text><text x="22" y="31" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="white">Pal</text></svg>;

// SOCIALS built dynamically in component from useSiteSettings

const SAFARI_TYPES = [
  { label: "Guided Safaris",  href: "/tours/guided"     },
  { label: "Self-Drive",      href: "/tours/self-drive" },
  { label: "Mountain Treks",  href: "/tours/mountain"   },
  { label: "Beach Holidays",  href: "/tours/beach"      },
  { label: "Car Rental",      href: "/tours/car-rental" },
];

const DESTINATIONS = [
  { label: "Tanzania Safari", href: "/destinations" },
  { label: "Kenya Safari",    href: "/destinations" },
  { label: "Uganda Safari",   href: "/destinations" },
  { label: "Rwanda Safari",   href: "/destinations" },
  { label: "Zanzibar",        href: "/destinations" },
];

const QUICK_LINKS = [
  { label: "About Us",      href: "/about"        },
  { label: "FAQ",           href: "/faq"          },
  { label: "Our Blog",      href: "/blog"         },
  { label: "Contact Us",    href: "/contact"      },
  { label: "Plan a Safari", href: "/quote"        },
];

const BrandLockup = () => (
  <div className="leading-none flex flex-col gap-0.5">
    <span className="text-sand" style={{ fontFamily: '"Yeseva One", serif', fontSize: "1.55rem", lineHeight: 1, letterSpacing: "0.02em" }}>
      Native
    </span>
    <span className="text-primary" style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic", fontSize: "0.65rem", letterSpacing: "0.28em", lineHeight: 1, textTransform: "uppercase" }}>
      Kilimanjaro
    </span>
  </div>
);

const FooterSection = () => {
  const { contact, socials } = useSiteSettings();

  const SOCIALS = [
    { Icon: FacebookIcon,    href: socials.facebook,                                 label: "Facebook"    },
    { Icon: InstagramIcon,   href: socials.instagram,                                label: "Instagram"   },
    { Icon: WhatsAppIcon,    href: `https://wa.me/${contact.whatsapp.replace(/\D/g,"")}`, label: "WhatsApp" },
    { Icon: YoutubeIcon,     href: socials.youtube,                                  label: "YouTube"     },
    { Icon: TripAdvisorIcon, href: socials.tripadvisor,                              label: "TripAdvisor" },
  ];

  return (
  <footer className="bg-earth text-sand border-t border-sand/8">
    <div className="container mx-auto px-6 py-16">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
        <Link to="/" className="flex items-center mb-5 group w-fit">
  <img src={logoSrc} alt="Native Kilimanjaro"
    className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-200 -my-2"
    style={{ filter: "brightness(0) invert(1)", maxWidth: "200px" }} />
</Link>

          <p className="font-body text-sand/55 text-sm leading-relaxed mb-5 max-w-xs">
            Based in Tanzania with on-the-ground teams across East Africa.
            Your safari, your way.
          </p>

          <div className="flex flex-col gap-2.5 font-body text-sm text-sand/60 mb-6">
            <a href={`tel:${contact.phone.replace(/\s/g,"")}`}
              className="flex items-center gap-2 hover:text-primary transition-colors w-fit group">
              <Phone className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-primary transition-colors" />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`}
              className="flex items-center gap-2 hover:text-primary transition-colors w-fit group">
              <Mail className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-primary transition-colors" />
              {contact.email}
            </a>
            <span className="flex items-center gap-2 text-sand/45">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-primary/50" />
              {contact.address}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="w-8 h-8 rounded-full border border-sand/12 flex items-center
                  justify-center text-sand/45 hover:text-primary hover:border-primary/45
                  transition-all duration-200">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Safari Types */}
        <div>
          <h4 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            Safari Types
          </h4>
          <ul className="space-y-3 font-body text-sm text-sand/55">
            {SAFARI_TYPES.map(({ label, href }) => (
              <li key={label}>
                <Link to={href} className="hover:text-sand transition-colors duration-200 flex items-center gap-1.5 group">
                  <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-200 overflow-hidden" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            Destinations
          </h4>
          <ul className="space-y-3 font-body text-sm text-sand/55">
            {DESTINATIONS.map(({ label, href }) => (
              <li key={label}>
                <Link to={href} className="hover:text-sand transition-colors duration-200 flex items-center gap-1.5 group">
                  <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-200 overflow-hidden" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            Quick Links
          </h4>
          <ul className="space-y-3 font-body text-sm text-sand/55">
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link to={href} className="hover:text-sand transition-colors duration-200 flex items-center gap-1.5 group">
                  <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-200 overflow-hidden" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sand/8 mt-12 pt-8
        flex flex-col sm:flex-row items-center justify-between gap-5">
        <p className="font-body text-xs text-sand/35 order-2 sm:order-1">
          © {new Date().getFullYear()} Native Kilimanjaro. All rights reserved.
        </p>
        <div className="flex items-center gap-2 flex-wrap justify-center order-1 sm:order-2">
          <span className="font-body text-xs text-sand/30 mr-1">We accept</span>
          <VisaIcon /><MastercardIcon /><PaypalIcon />
        </div>
      </div>

    </div>
  </footer>
  );
};

export default FooterSection;