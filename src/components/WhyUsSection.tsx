import { Heart, TreePine, Compass, Headphones } from "lucide-react";
import elephantsImg from "@/assets/safari-elephants.jpg";

const reasons = [
  { icon: TreePine, title: "Local Roots & Knowledge", desc: "Based in Tanzania with on-the-ground teams across East Africa." },
  { icon: Heart, title: "Sustainable Travel", desc: "Every trip supports youth and community programs." },
  { icon: Compass, title: "Total Freedom", desc: "Choose your own pace, with or without a guide." },
  { icon: Headphones, title: "24/7 Backup", desc: "Roadside support and expert help throughout your journey." },
];

const WhyUsSection = () => {
  return (
    <section className="py-20 bg-earth text-sand">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-3">
              Why Choose Balbina Safari?
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Travel Responsibly and Support Local Communities
            </h2>
            <p className="font-body text-sand/70 leading-relaxed mb-10">
              We design luxury safaris that deliver more than unforgettable wildlife experiences; they change lives. 20% of every safari profit goes directly to supporting children, education, and local communities in Tanzania.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((r) => (
                <div key={r.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <r.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold mb-1">{r.title}</h4>
                    <p className="font-body text-sand/60 text-sm">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-block mt-10 font-body text-sm uppercase tracking-widest px-8 py-3.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-sm"
            >
              See Where Your 20% Goes
            </a>
          </div>

          <div className="relative">
            <img
              src={elephantsImg}
              alt="Elephants in African savannah"
              className="rounded-lg w-full h-[500px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
