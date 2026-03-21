import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import safariImg from "@/assets/safari-landscape.jpg";
import { useSiteSettings } from "@/hooks/use-site-settings";

interface QuoteSidebarProps {
  step:       number;
  totalSteps: number;
  submitted:  boolean;
  headline:   string;
  sub:        string;
}

const QuoteSidebar = ({ step, totalSteps, submitted, headline, sub }: QuoteSidebarProps) => {
  const { contact } = useSiteSettings();

  return (
    <aside className={[
      "hidden lg:flex flex-col",
      "relative w-full lg:w-[36%] xl:w-[32%] overflow-hidden",
      submitted ? "" : "lg:sticky lg:top-[var(--nav-total-h,64px)] lg:h-[calc(100vh-var(--nav-total-h,64px))]",
    ].join(" ")}>

      {/* Background — lighter than before, image more visible */}
      <div className="absolute inset-0 z-0">
        <img src={safariImg} alt="" aria-hidden
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.35) saturate(0.8)" }} />
        {/* Single soft gradient — bottom only for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full px-10 py-12">

        {/* Step info */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="done"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}>
                <p className="text-xs tracking-[0.25em] uppercase font-body mb-3 text-primary">
                  All done
                </p>
                <p className="font-display text-2xl text-white leading-snug">
                  Your safari journey<br />starts here.
                </p>
              </motion.div>
            ) : (
              <motion.div key={step}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}>

                <div className="flex items-center gap-2.5 mb-5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full
                    text-xs font-bold font-body"
                    style={{ background: "hsl(var(--primary))", color: "#fff" }}>
                    {step + 1}
                  </span>
                  <span className="text-xs tracking-[0.18em] uppercase font-body"
                    style={{ color: "hsl(var(--primary))" }}>
                    of {totalSteps} steps
                  </span>
                </div>

                {/* Headline — full white, clearly visible */}
                <h2 className="font-display text-[1.85rem] text-sand leading-tight mb-3">
                  {headline}
                </h2>

                {/* Sub — lighter but still legible */}
                <p className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.70)", maxWidth: "22rem" }}>
                  {sub}
                </p>

                {/* Progress */}
                <div className="mt-9">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-body" style={{ color: "rgba(255,255,255,0.45)" }}>
                      Progress
                    </span>
                    <span className="text-xs font-body" style={{ color: "hsl(var(--primary))" }}>
                      {Math.round(((step + 1) / totalSteps) * 100)}%
                    </span>
                  </div>
                  <div className="h-[3px] w-full rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.12)" }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)/0.6))" }}
                      initial={false}
                      animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }} />
                  </div>
                  <div className="flex gap-1.5 mt-2.5">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                      <div key={i} className="rounded-full transition-all duration-300"
                        style={{
                          width:      i === step ? "14px" : "4px",
                          height:     "4px",
                          background: i <= step
                            ? "hsl(var(--primary))"
                            : "rgba(255,255,255,0.15)",
                        }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact footer */}
        <div className="pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          {/* "Need help planning?" — clearly visible now */}
          <p className="text-sm font-body font-medium mb-3" style={{ color: "rgba(255,255,255,0.85)" }}>
            Need help planning?
          </p>
          <div className="flex flex-col gap-2.5">
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm font-body group w-fit"
              style={{ color: "rgba(255,255,255,0.60)" }}>
              <Phone className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-primary transition-colors" />
              <span className="group-hover:text-white transition-colors">{contact.phone}</span>
            </a>
            <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-sm font-body group w-fit"
              style={{ color: "rgba(255,255,255,0.60)" }}>
              <MessageCircle className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-primary transition-colors" />
              <span className="group-hover:text-white transition-colors">WhatsApp us</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5 mt-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="text-xs font-body">{contact.address}</span>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default QuoteSidebar;