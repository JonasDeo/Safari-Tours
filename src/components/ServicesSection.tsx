import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import selfDriveImg from "@/assets/self-drive.png";
import guidedImg    from "@/assets/guided-safari.jpeg";
import kiliImg      from "@/assets/kilimanjaro.jpg";
import beachImg     from "@/assets/beach.jpg";

const services = [
  {
    title: "Self-Drive Safari Adventures",
    desc:  "Plan your own route. We provide the 4×4, maps, support, and insider tips.",
    image: selfDriveImg,
    href:  "/tours/self-drive",
  },
  {
    title: "Balbina Guided Safaris",
    desc:  "Travel with an experienced guide for a richer and more relaxed safari experience.",
    image: guidedImg,
    href:  "/tours/guided",
  },
  {
    title: "Mountain Climbing",
    desc:  "Whether it's your first major trek or your next big summit, we'll help you prepare, pace, and reach the top.",
    image: kiliImg,
    href:  "/tours/mountain",
  },
  {
    title: "Beach Holidays",
    desc:  "After your safari or climb, unwind on the white sands of Zanzibar, Mafia Island, or the Kenyan coast.",
    image: beachImg,
    href:  "/tours/beach",
  },
];

const ServicesSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((svc) => (
          <Link
            key={svc.title}
            to={svc.href}
            className="group relative overflow-hidden rounded-lg aspect-[3/4] block"
          >
            <img
              src={svc.image}
              alt={svc.title}
              className="absolute inset-0 w-full h-full object-cover
                group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-overlay/90
              via-dark-overlay/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-display text-xl font-semibold text-sand mb-2">
                {svc.title}
              </h3>
              <p className="font-body text-sand/70 text-sm leading-relaxed mb-3">
                {svc.desc}
              </p>
              {/* Arrow appears on hover */}
              <span className="inline-flex items-center gap-1.5 font-body text-xs
                tracking-widest uppercase text-primary opacity-0 group-hover:opacity-100
                translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA — matches site button style */}
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