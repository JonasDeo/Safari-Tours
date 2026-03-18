import { motion } from "framer-motion";
import elephantsImg from "@/assets/safari-elephants.jpg";

const AboutHero = () => (
  <section
    className="relative flex items-end overflow-hidden"
    style={{ minHeight: "65vh", paddingTop: "var(--nav-total-h, 100px)" }}
  >
    <img src={elephantsImg} alt="Balbina Safari"
      className="absolute inset-0 w-full h-full object-cover" loading="eager" />

    {/* Gradient — subtle fade, ends dark for text legibility */}
    <div className="absolute inset-0 bg-gradient-to-b from-dark-overlay/20 via-dark-overlay/45 to-dark-overlay/85" />

    <div className="relative z-10 w-full pb-14 md:pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>

          <p className="font-body text-xs tracking-[0.35em] uppercase text-primary mb-4">
            Est. 2020 · Arusha, Tanzania
          </p>

          <h1 className="font-display text-sand text-shadow-hero mb-4"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 700, lineHeight: 1.05 }}>
            About<br />
            <span style={{ fontWeight: 400, fontStyle: "italic" }}>Balbina Safaris</span>
          </h1>

          <p className="font-body text-sand/65 text-sm max-w-sm leading-relaxed">
            A locally owned Tanzania tour operator — born from a deep love for
            the land, its people, and the wildlife that calls it home.
          </p>

        </motion.div>
      </div>
    </div>

    {/* Thin gold rule at the very bottom */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/40" />
  </section>
);

export default AboutHero;