import { motion } from "framer-motion";
import { Heart, TreePine, Compass, Headphones, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import img1 from "@/assets/safari-elephants.jpg";
import img2 from "@/assets/safari-landscape.jpg";
import img3 from "@/assets/safari-lions.jpg";
import logoSrc from "@/assets/balbina-logo.png";

const reasons = [
  { icon: TreePine,   title: "Local & On the Ground",  desc: "Based in Tanzania. Our guides live the land — no middlemen, no guesswork." },
  { icon: Heart,      title: "Travel That Gives Back",  desc: "20% of every safari profit funds education and youth programs locally." },
  { icon: Compass,    title: "Your Safari, Your Rules", desc: "Self-drive or guided, budget or luxury — we build around you." },
  { icon: Headphones, title: "Support the Whole Way",   desc: "From first enquiry to last day — reachable, responsive, and real." },
];

const WhyUsSection = () => (
  <section
    className="relative py-14 lg:py-16 overflow-hidden"
    style={{ background: "hsl(var( --charcoal))" }}
  >
    <div className="container mx-auto px-6 lg:px-10 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

        {/* LEFT — Asymmetric image collage */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="relative order-1 lg:order-1 select-none"
          style={{ height: "520px" }}
        >
          {/* Large hero image — left, full height */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute overflow-hidden rounded-lg"
            style={{ top: 0, left: 0, width: "57%", height: "100%", zIndex: 10 }}
          >
            <img src={img1} alt="Elephants at dusk, Serengeti"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.88) saturate(1.05)" }} loading="lazy" />
          </motion.div>

          {/* Top-right image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="absolute overflow-hidden rounded-lg"
            style={{ top: 0, right: 0, width: "41%", height: "calc(50% - 3px)", zIndex: 10 }}
          >
            <img src={img2} alt="Golden savanna at sunrise"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.88) saturate(1.05)" }} loading="lazy" />
          </motion.div>

          {/* Bottom-right image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="absolute overflow-hidden rounded-lg"
            style={{ bottom: 0, right: 0, width: "41%", height: "calc(50% - 3px)", zIndex: 10 }}
          >
            <img src={img3} alt="Lions resting in the grass"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.88) saturate(1.05)" }} loading="lazy" />
          </motion.div>

          {/* Trust chip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="absolute bottom-5 left-5 flex items-center gap-3 px-4 py-3 rounded-lg backdrop-blur-sm"
            style={{ background: "hsl(var(--dark-overlay) / 0.82)", border: "1px solid hsl(var(--sand) / 0.12)", zIndex: 20 }}
          >
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "hsl(var(--primary))" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "hsl(var(--primary))" }} />
            </span>
            <p className="font-body text-xs" style={{ color: "hsl(var(--sand) / 0.75)" }}>
              <span className="text-sand font-medium">10+ years</span> operating in East Africa
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT Content with logo watermark */}
        <div className="order-2 lg:order-2 relative">

          {/* Logo watermark */}
          <img
            src={logoSrc}
            alt="" aria-hidden
            className="pointer-events-none select-none absolute left-1/2 top-1/2 object-contain"
            style={{
              width: "440px",
              opacity: 0.09,
              filter: "invert(1)",
              mixBlendMode: "screen" as const,
              zIndex: 0,
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Content sits above the watermark */}
          <div className="relative z-10">

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-4"
            >
              Why Choose Us
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold
                leading-tight mb-6 text-sand"
            >
              We know this land.<br />
              We love these people.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="font-body text-sand/60 leading-relaxed mb-10 max-w-md"
            >
              Native Kilimanjaro was born in Tanzania, not in a travel agency office
              somewhere else. That difference shows — in every route we plan,
              every guide we hire, every community we support.
            </motion.p>

            {/* Reason list */}
            <div className="space-y-6">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-full
                    border border-primary/30 flex items-center justify-center
                    group-hover:border-primary group-hover:bg-primary/10
                    transition-all duration-300">
                    <r.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display text-[0.9rem] font-semibold text-sand mb-0.5">
                      {r.title}
                    </h4>
                    <p className="font-body text-sm text-sand/50 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-8 pt-8 border-t border-sand/10 flex items-center gap-6 flex-wrap"
            >
              <Link to="/about"
                className="group inline-flex items-center gap-2 font-body text-sm
                  uppercase tracking-widest text-primary hover:text-sand transition-colors duration-200"
              >
                Our Story
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <span className="w-1 h-1 rounded-full bg-sand/20" />
              <Link to="/quote"
                className="group inline-flex items-center gap-2 font-body text-sm
                  uppercase tracking-widest text-sand/60 hover:text-sand transition-colors duration-200"
              >
                Plan My Safari
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default WhyUsSection;