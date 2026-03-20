import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Compass, Handshake } from "lucide-react";

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

const PILLARS = [
  {
    icon: Globe,
    label: "Our Staff",
    heading: "Multilingual Professionals",
    body: "Highly experienced, well-trained, and speaking a variety of languages. We invest in our staff through regular meetings, site inspections, and annual training — their passion and dedication shows in every interaction.",
  },
  {
    icon: Compass,
    label: "Our Guides",
    heading: "Ambassadors in the Field",
    body: "With more than 5 years of experience each, our guides are your representatives from the moment you arrive to your final departure. Their passion and love for Tanzania makes every game drive extraordinary.",
  },
  {
    icon: Handshake,
    label: "Our Partners",
    heading: "A Global Network",
    body: "We recognise that our strength lies in the expertise of our partners worldwide. We welcome all agencies and travellers — building positive, long-term relationships to share the beauty of East Africa.",
  },
];

const AboutTeam = () => (
  <section className="py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-6 lg:px-12">

      {/* Header */}
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-14">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
              The People Behind the Safari
            </p>
            <h2 className="font-display text-foreground"
              style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: 600, lineHeight: 1.15 }}>
              Passionate &<br />Deeply Knowledgeable
            </h2>
          </div>
          <p className="font-body text-sm leading-relaxed text-muted-foreground lg:max-w-xs lg:ml-auto">
            We recruit based on in-depth knowledge, love for Africa, careful attention
            to detail, and a friendly approach — qualities that meet the challenges of
            a changing industry.
          </p>
        </div>
      </Reveal>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PILLARS.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.1}>
            <div className="p-7 rounded-2xl h-full border border-border bg-background
              hover:border-primary/40 hover:bg-muted/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <p className="font-body text-xs tracking-[0.25em] uppercase" style={{ color: "hsl(var(--foreground)/0.35)" }}>{p.label}</p>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/10">
                  <p.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <h3 className="font-display text-foreground mb-3"
                style={{ fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.2 }}>
                {p.heading}
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

    </div>
  </section>
);

export default AboutTeam;