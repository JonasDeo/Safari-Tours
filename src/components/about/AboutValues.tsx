import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.32, 0.72, 0, 1] }}>
      {children}
    </motion.div>
  );
};

const VALUES = [
  { word: "Honesty",      desc: "Open, transparent communication — no hidden agendas, ever." },
  { word: "Integrity",    desc: "We stand by every promise and deliver on every commitment." },
  { word: "Authenticity", desc: "Genuine experiences, deeply rooted in East African culture." },
  { word: "Loyalty",      desc: "Lasting relationships with clients, guides, and communities." },
  { word: "Simplicity",   desc: "Elegant, stress-free travel that feels effortless." },
  { word: "Respect",      desc: "For the land, the wildlife, the cultures, and the people." },
  { word: "Trust",        desc: "Your safety is our number one priority, start to finish." },
];

const AboutValues = () => (
  <section className="py-20 lg:py-28"
    style={{ background: "hsl(var( --charcoal))" }}>
    <div className="container mx-auto px-6 lg:px-12">

      <Reveal>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
              What We Stand For
            </p>
            <h2 className="font-display text-sand"
              style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: 600, lineHeight: 1.15 }}>
              Our Core Values
            </h2>
          </div>
          <p className="font-body text-sm text-sand/45 max-w-xs leading-relaxed">
            These values guide every decision we make — from how we design an itinerary
            to how we communicate on the ground.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
        style={{ background: "hsl(var(--sand)/0.08)" }}>
        {VALUES.map((v, i) => (
          <Reveal key={v.word} delay={i * 0.05}>
            <div className="p-7 h-full transition-colors duration-200 cursor-default"
              style={{ background: "hsl(var( --charcoal))" }}
              onMouseEnter={e => (e.currentTarget.style.background = "hsl(var(--dark-overlay)/0.5)")}
              onMouseLeave={e => (e.currentTarget.style.background = "hsl(var( --charcoal))")}>
              <span className="font-body text-xs tracking-[0.25em] uppercase text-primary/60 block mb-3">
                0{i + 1}
              </span>
              <h3 className="font-display text-sand mb-2"
                style={{ fontSize: "1.3rem", fontWeight: 600 }}>
                {v.word}
              </h3>
              <p className="font-body text-xs leading-relaxed text-sand/45">{v.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

    </div>
  </section>
);

export default AboutValues;
