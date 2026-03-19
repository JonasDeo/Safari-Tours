import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

const AboutMissionVision = () => (
  <section className="py-20 lg:py-28" style={{ background: "hsl(var(--muted)/0.35)" }}>
    <div className="container mx-auto px-6 lg:px-12">

      <Reveal>
        <div className="mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">What Drives Us</p>
          <h2 className="font-display text-foreground"
            style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: 600, lineHeight: 1.15 }}>
            Mission & Vision
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Mission — light */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl p-8 lg:p-10 h-full bg-background border border-border">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-6">Our Mission</p>
            <h3 className="font-display text-foreground mb-4"
              style={{ fontSize: "1.4rem", fontWeight: 600, lineHeight: 1.2 }}>
              Exceptional Service, Every Journey
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Balbina Safari Limited is committed to providing our clients with exceptional service
              to meet their demands — accomplishing high customer satisfaction and complete travel
              solutions covering all aspects of their needs, tailored at an affordable price with
              pro-active customer service.
            </p>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-primary">
                Loyalty · Simplicity · Respect
              </p>
            </div>
          </div>
        </Reveal>

        {/* Vision — dark */}
        <Reveal delay={0.18}>
          <div className="rounded-2xl p-8 lg:p-10 h-full"
            style={{ background: "hsl(var( --charcoal))" }}>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-6">Our Vision</p>
            <h3 className="font-display text-sand mb-4"
              style={{ fontSize: "1.4rem", fontWeight: 600, lineHeight: 1.2 }}>
              Leaders & Ambassadors of Tanzania
            </h3>
            <p className="font-body text-sm leading-relaxed text-sand/55">
              To be leaders and ambassadors of our country as well as our clients' best partner —
              always providing the best possible products with the highest quality of services,
              and demonstrating faithfully our commitment towards social and environmental
              responsibility.
            </p>
            <div className="mt-8 pt-6" style={{ borderTop: "1px solid hsl(var(--sand)/0.12)" }}>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-primary">
                Honesty · Integrity · Authenticity
              </p>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  </section>
);

export default AboutMissionVision;
