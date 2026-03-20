import { AnimatePresence, motion } from "framer-motion";
import heroImg from "@/assets/tour-1.jpg";

interface QuoteHeroProps {
  step:       number;
  totalSteps: number;
  submitted:  boolean;
  headline:   string;
  sub:        string;
}

const QuoteHero = ({ step, totalSteps, submitted, headline, sub }: QuoteHeroProps) => (
  <section
    className="relative overflow-hidden"
    style={{ height: "clamp(200px, 36vh, 360px)", paddingTop: "var(--nav-total-h, 64px)" }}
  >
    <img src={heroImg} alt="Safari landscape"
      className="absolute inset-0 w-full h-full object-cover object-[center_40%]" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

    {/* Desktop — centred title */}
    <div className="hidden sm:flex absolute inset-0 items-end justify-center pb-10 z-10">
      <div className="text-center px-4">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 text-sand text-shadow-hero">
          Request a Quote
        </h1>
        <p className="font-body text-sm md:text-base text-sand/50">
          Tell us your dream — we'll craft your perfect African safari
        </p>
      </div>
    </div>

    {/* Mobile — step headline on photo */}
    <div className="sm:hidden absolute inset-0 flex flex-col justify-end px-5 pb-0 z-10">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="done" className="pb-5"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[10px] tracking-[0.25em] uppercase font-body mb-1 text-primary">
              All done
            </p>
            <p className="font-display text-2xl text-sand/95">
              Your safari journey<br />starts here.
            </p>
          </motion.div>
        ) : (
          <motion.div key={step}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}>

            <div className="flex items-center gap-2 mb-2.5">
              <span className="flex items-center justify-center w-6 h-6 rounded-full
                text-[11px] font-bold font-body flex-shrink-0 text-dark"
                style={{ background: "hsl(var(--primary))" }}>
                {step + 1}
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase font-body text-primary/80">
                of {totalSteps} steps
              </span>
            </div>

            <h2 className="font-display text-2xl leading-tight mb-1 text-sand/96">{headline}</h2>
            <p className="font-body text-[12px] text-sand/42">{sub}</p>

            <div className="mt-4 h-[2px] rounded-full overflow-hidden"
              style={{ width: "calc(100% + 2.5rem)", marginLeft: "-1.25rem",
                background: "hsl(var(--sand)/0.1)" }}>
              <motion.div className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)/0.4))" }}
                initial={false}
                animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </section>
);

export default QuoteHero;