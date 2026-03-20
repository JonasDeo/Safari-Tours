import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { FAQ_SECTIONS } from "@/constants/faqData";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { FAQAccordionGroup } from "./FaqAccordion";

// ── Reveal wrapper ────────────────────────────────────────────────────────────

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.32, 0.72, 0, 1] }}>
      {children}
    </motion.div>
  );
};

// ── Sticky sidebar nav ────────────────────────────────────────────────────────

const CategoryNav = ({ active, onSelect }: {
  active: string | null;
  onSelect: (cat: string) => void;
}) => (
  <aside className="hidden lg:block">
    <div className="sticky top-28 space-y-1">
      <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
        Categories
      </p>
      {FAQ_SECTIONS.map(s => (
        <button
          key={s.category}
          onClick={() => onSelect(s.category)}
          className="w-full text-left px-3 py-2 rounded-lg font-body text-sm transition-all duration-200"
          style={{
            background: active === s.category ? "hsl(var(--primary)/0.1)" : "transparent",
            color:      active === s.category ? "hsl(var(--primary))"      : "hsl(var(--muted-foreground))",
            fontWeight: active === s.category ? 600 : 400,
          }}
          onMouseEnter={e => { if (active !== s.category) e.currentTarget.style.color = "hsl(var(--foreground))"; }}
          onMouseLeave={e => { if (active !== s.category) e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}
        >
          {s.category}
        </button>
      ))}
    </div>
  </aside>
);

// ── CTA block ─────────────────────────────────────────────────────────────────

const StillHavingQuestions = () => {
  const { contact } = useSiteSettings();
  return (
    <div className="rounded-2xl p-8 lg:p-10 border border-border bg-muted/30
      flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <h3 className="font-display text-foreground mb-2"
          style={{ fontSize: "1.3rem", fontWeight: 600 }}>
          Still have questions?
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          Our team is based in Arusha and available Mon–Sat, 8am–6pm EAT.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <a href={`tel:${contact.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs
            font-semibold tracking-widest uppercase bg-primary text-primary-foreground
            hover:bg-primary/85 transition-colors duration-200">
          <Phone className="w-3.5 h-3.5" /> Call Us
        </a>
        <Link to="/contact"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs
            font-semibold tracking-widest uppercase border border-border text-foreground
            hover:bg-muted transition-colors duration-200">
          <Mail className="w-3.5 h-3.5" /> Send a Message
        </Link>
      </div>
    </div>
  );
};

// ── Main body ─────────────────────────────────────────────────────────────────

const FAQBody = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleSelect = (cat: string) => {
    setActiveSection(cat);
    document.getElementById(cat.replace(/\s+/g, "-"))
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">

          <CategoryNav active={activeSection} onSelect={handleSelect} />

          <div className="space-y-14">
            {FAQ_SECTIONS.map((section, si) => (
              <Reveal key={section.category} delay={si * 0.04}>
                <div id={section.category.replace(/\s+/g, "-")}>
                  {/* Section heading */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 rounded-full" style={{ background: "hsl(var(--foreground)/0.15)" }} />
                    <h2 className="font-display text-foreground"
                      style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                      {section.category}
                    </h2>
                    <span className="font-body text-xs ml-1" style={{ color: "hsl(var(--foreground)/0.3)" }}>
                      ({section.items.length})
                    </span>
                  </div>

                  <FAQAccordionGroup items={section.items} />
                </div>
              </Reveal>
            ))}

            {/* CTA */}
            <Reveal delay={0.1}>
              <StillHavingQuestions />
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQBody;