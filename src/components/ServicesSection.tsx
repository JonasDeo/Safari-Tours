import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import guidedImg    from "@/assets/guided-safari.jpg";
import kiliImg      from "@/assets/kilimanjaro.jpg";
import beachImg     from "@/assets/beach.jpg";

const services = [
  {
    title: "Guided Safaris",
    desc:  "Travel with expert local guides for richer wildlife encounters, smooth logistics, and deeper cultural connection.",
    image: guidedImg,
    href:  "/tours/guided",
    label: "Most Popular",
  },
  {
    title: "Mountain Climbing",
    desc:  "Summit Kilimanjaro with certified mountain crews, acclimatisation-focused itineraries, and full safety support.",
    image: kiliImg,
    href:  "/tours/mountain",
    label: "Adventure",
  },
  {
    title: "Beach Holidays",
    desc:  "Unwind in Zanzibar and the Swahili Coast with carefully matched lodges, transfers, and island experiences.",
    image: beachImg,
    href:  "/tours/beach",
    label: "Relax & Recharge",
  },
];

const ServicesSection = () => (
  <section className="py-20 md:py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
          Plan Your Trip
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
          Signature Experiences by Native Kilimanjaro
        </h2>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          Choose from expertly guided safaris, high-altitude trekking, and beach extensions crafted for comfort, impact, and unforgettable memories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((svc) => (
          <Link
            key={svc.title}
            to={svc.href}
            className="group relative overflow-hidden rounded-2xl aspect-[4/5] block"
            style={{ border: "1px solid hsl(var(--border)/0.45)" }}
          >
            <img
              src={svc.image}
              alt={svc.title}
              className="absolute inset-0 w-full h-full object-cover
                group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] tracking-widest uppercase font-body"
                style={{ background: "hsl(var(--primary)/0.2)", color: "hsl(var(--sand))", border: "1px solid hsl(var(--primary)/0.45)" }}>
                {svc.label}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-display text-2xl font-semibold text-sand mb-2">
                {svc.title}
              </h3>
              <p className="font-body text-sand/75 text-sm leading-relaxed mb-4">
                {svc.desc}
              </p>

              <span className="inline-flex items-center gap-1.5 font-body text-[11px]
                tracking-[0.2em] uppercase text-primary-foreground bg-primary/85 rounded-full px-4 py-2
                group-hover:bg-primary transition-colors duration-300">
                Explore Trip <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link
          to="/quote"
          className="group inline-flex items-center gap-3 font-body text-xs
            tracking-[0.2em] uppercase font-semibold px-10 py-4 rounded-full
            border border-foreground text-foreground hover:bg-foreground
            hover:text-background transition-all duration-300"
        >
          Plan Your Dream Safari
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300
            group-hover:translate-x-1" />
        </Link>
      </div>

    </div>
  </section>
);

export default ServicesSection;