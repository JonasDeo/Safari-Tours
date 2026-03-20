import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-safari.jpeg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[120px]">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="African safari landscape at golden hour"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        <p className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-sand/70 mb-6">
          East Africa Safari Adventure & Island Bliss
        </p>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-sand leading-tight mb-6 text-shadow-hero">
          Step into Safari Where <br />
          <span className="text-primary italic">Every Sunrise Brings a New Adventure</span>
        </h1>

        <p className="font-body text-lg md:text-xl text-sand/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover East Africa's most extraordinary wildlife encounters, cultural experiences, and pristine landscapes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/tours"
            className="group flex items-center gap-2 font-body text-sm uppercase tracking-widest text-primary hover:text-terracotta-light transition-colors"
          >
            View Our Signature Tours
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/quote"
            className="font-body text-sm uppercase tracking-widest px-8 py-3.5 border border-sand/40 text-sand hover:bg-sand/10 transition-all rounded-sm"
          >
            Plan Your African Safari
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;