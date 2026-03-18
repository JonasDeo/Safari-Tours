import { motion } from "framer-motion";

const FAQHero = () => (
  <section className="py-20 lg:py-28 bg-background border-b border-border">
    <div className="container mx-auto px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      >
        <p className="font-body text-xs tracking-[0.35em] uppercase text-primary mb-4">
          Help Centre
        </p>
        <h1 className="font-display text-foreground mb-5"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.05 }}>
          Frequently Asked<br />Questions
        </h1>
        <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-lg">
          Everything you need to know before your Tanzania safari. Tanzania has the reputation
          of the best country for wildlife safaris — and you probably have questions.
          We've answered the most popular ones below.
        </p>
      </motion.div>
    </div>
  </section>
);

export default FAQHero;