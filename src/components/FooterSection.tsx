import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="bg-earth text-sand">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="font-display text-2xl font-bold mb-4 block">
              Balbina<span className="text-primary">Safaris</span>
            </Link>
            <p className="font-body text-sand/60 text-sm leading-relaxed mb-6">
              Based in Tanzania with on-the-ground teams across East Africa. Your safari, your way.
            </p>
            <div className="flex flex-col gap-2 font-body text-sm text-sand/70">
              <a href="tel:+255685808332" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> +255 685 808332
              </a>
              <a href="mailto:info@Balbinasafaris.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> info@Balbinasafaris.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Arusha, Tanzania
              </span>
            </div>
          </div>

          {/* Safari Types */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4">Safari Types</h4>
            <ul className="space-y-2 font-body text-sm text-sand/60">
              <li><Link to="/tours" className="hover:text-primary transition-colors">Self-Drive Safari</Link></li>
              <li><Link to="/tours" className="hover:text-primary transition-colors">Balbina Guided Safaris</Link></li>
              <li><Link to="/tours" className="hover:text-primary transition-colors">Mountain Climbing</Link></li>
              <li><Link to="/tours" className="hover:text-primary transition-colors">Beach Holidays</Link></li>
              <li><Link to="/tours" className="hover:text-primary transition-colors">Car Rental</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 font-body text-sm text-sand/60">
              <li><Link to="/destinations" className="hover:text-primary transition-colors">Tanzania Safari</Link></li>
              <li><Link to="/destinations" className="hover:text-primary transition-colors">Kenya Safari</Link></li>
              <li><Link to="/destinations" className="hover:text-primary transition-colors">Uganda Safari</Link></li>
              <li><Link to="/destinations" className="hover:text-primary transition-colors">Rwanda Safari</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-sm text-sand/60">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/destinations" className="hover:text-primary transition-colors">Travel Guide</Link></li>
              <li><Link to="/destinations" className="hover:text-primary transition-colors">Our Blog</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sand/10 mt-12 pt-8 text-center">
          <p className="font-body text-xs text-sand/40">
            © 2025 Balbina Safari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
