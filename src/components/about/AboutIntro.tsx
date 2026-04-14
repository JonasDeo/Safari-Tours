import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import guidedImg from "@/assets/guided-safari.jpeg";

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

const AboutIntro = () => (
  <section className="py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-6 lg:px-12">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* Image */}
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl aspect-[4/5]">
              <img src={guidedImg} alt="Our experienced safari guides"
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-5 -right-4 md:-right-8 rounded-2xl px-6 py-5 shadow-xl"
              style={{ background: "hsl(var(--earth))", minWidth: 156 }}>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-1">Experience</p>
              <p className="font-display text-sand/90 leading-none mb-1" style={{ fontSize: "2.6rem", fontWeight: 700 }}>4+</p>
              <p className="font-body text-xs text-sand/45 leading-snug">Years of crafting<br />extraordinary safaris</p>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={0.12}>
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">Who We Are</p>

            <h2 className="font-display text-foreground mb-6"
              style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: 600, lineHeight: 1.15 }}>
              A Fully Registered<br />Tanzania Tour Operator
            </h2>

            <div className="space-y-4 font-body text-sm leading-relaxed text-muted-foreground">
              <p>
                Native Kilimanjaro is a locally owned company, fully registered to operate
                tourism business in Tanzania. For 4 years, we have been providing an unrivalled
                full spectrum of top quality travel services.
              </p>
              <p>
                Our well-experienced consultants offer clients the most economical, practical, and
                convenient travel solutions — from the northern circuit's iconic plains to the
                pristine shores of Zanzibar and the peaks of Kilimanjaro.
              </p>
              <p>
                All our packages are tailor-made to meet your preferences and budget. Our team of
                professionals will ensure you have the right experience in the field.
              </p>
            </div>

            {/* Divider + values preview */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="font-body text-xs tracking-[0.25em] uppercase" style={{ color: "hsl(var(--foreground)/0.35)" }}>
                Honesty · Integrity · Authenticity · Trust
              </p>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  </section>
);

export default AboutIntro;