import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/constants/faqData";

export const FAQAccordionItem = ({ q, a }: FAQItem) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="font-display text-sm font-semibold text-foreground leading-snug
          group-hover:text-primary transition-colors duration-200">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown className="w-4 h-4" style={{ color: "hsl(var(--foreground)/0.4)" }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm leading-relaxed text-muted-foreground pb-5 pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQAccordionGroup = ({ items }: { items: FAQItem[] }) => (
  <div className="rounded-2xl border border-border px-6"
    style={{ background: "hsl(var(--muted)/0.2)" }}>
    {items.map(item => (
      <FAQAccordionItem key={item.q} {...item} />
    ))}
  </div>
);