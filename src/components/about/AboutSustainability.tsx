import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Car, MessageSquare, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.32, 0.72, 0, 1] }}>
      {children}
    </motion.div>
  );
};

const FEATURES = [
  {
    icon: Heart,
    title: "Social Responsibility",
    body: "We donate a portion of our profits to support our local orphanage, assisting less fortunate children who are our hope for a bright future.",
  },
  {
    icon: Leaf,
    title: "Environmental Commitment",
    body: "Sustainability is a key driver for our business. We support a wide range of environmental causes and practices in every region we operate.",
  },
  {
    icon: Car,
    title: "Our Fleet",
    body: "All safari vehicles are Toyota Land Cruiser 4×4s with pop-up roofs, equipped with a fridge, binoculars, and charging terminals. Maintained meticulously before and after every safari.",
  },
  {
    icon: MessageSquare,
    title: "Communication",
    body: "Our greatest strength is active communication. We listen, then we deliver — openly and honestly, ensuring every specific demand is met on the ground.",
  },
];

const AboutSustainability = () => (
  <section className="py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-6 lg:px-12">

      {/* Header */}
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
              How We Operate
            </p>
            <h2 className="font-display text-foreground"
              style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: 600, lineHeight: 1.15 }}>
              Travel Responsibly,<br />Give Back Generously
            </h2>
          </div>
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
            We believe the community we operate in has played a significant role in our development.
            Every safari you book ripples outward — into education, conservation, and
            the lives of Tanzanian families.
          </p>
        </div>
      </Reveal>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="flex gap-5 p-7 rounded-2xl border border-border
              bg-background hover:border-primary/40 hover:bg-muted/30 transition-all duration-300">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 mt-0.5">
                <f.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-foreground mb-2"
                  style={{ fontSize: "1.15rem", fontWeight: 600 }}>
                  {f.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal delay={0.2}>
        <div className="rounded-2xl p-8 lg:p-12 flex flex-col md:flex-row items-center
          justify-between gap-8 border border-border bg-muted/30">
          <div>
            <h3 className="font-display text-foreground mb-2"
              style={{ fontSize: "clamp(1.4rem, 2vw, 1.9rem)", fontWeight: 600 }}>
              Ready to explore East Africa?
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              Let us design your perfect safari — tailor-made, responsibly run.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link to="/quote"
              className="px-6 py-2.5 rounded-full font-body text-xs font-semibold tracking-widest
                uppercase bg-primary text-primary-foreground hover:bg-primary/85 transition-colors duration-200">
              Plan My Safari
            </Link>
            <Link to="/tours"
              className="px-6 py-2.5 rounded-full font-body text-xs font-semibold tracking-widest
                uppercase border border-border text-foreground hover:bg-muted transition-colors duration-200">
              View Tours
            </Link>
          </div>
        </div>
      </Reveal>

    </div>
  </section>
);

export default AboutSustainability;
