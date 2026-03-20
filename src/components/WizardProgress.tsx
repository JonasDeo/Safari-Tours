import { WIZARD_STEPS } from "@/constants/quoteData";
import { motion } from "framer-motion";

interface WizardProgressProps {
  step: number;
  goTo: (n: number) => void;
}

const WizardProgress = ({ step, goTo }: WizardProgressProps) => {
  const total = WIZARD_STEPS.length;

  return (
    <div className="w-full">
      {/* Label + counter */}
      <div className="flex items-center justify-between mb-2.5">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs tracking-[0.2em] uppercase text-primary font-body font-semibold truncate pr-4"
        >
          {WIZARD_STEPS[step].label}
        </motion.p>
        <span className="text-xs font-mono text-muted-foreground flex-shrink-0">
          {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Progress track */}
      <div className="relative h-0.5 bg-border w-full rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-primary rounded-full"
          initial={false}
          animate={{ width: `${((step + 1) / total) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>

      {/* Clickable step dots — scroll horizontally on very small screens */}
      <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-0.5 scrollbar-none">
        {WIZARD_STEPS.map((s, i) => {
          const completed = i < step;
          const current   = i === step;
          return (
            <button
              key={s.id}
              onClick={() => completed ? goTo(i) : undefined}
              disabled={!completed}
              aria-label={completed ? `Go back to ${s.label}` : s.label}
              title={s.label}
              className={`flex-shrink-0 rounded-full transition-all duration-300
                ${current   ? "w-5 h-1.5 bg-primary" : ""}
                ${completed ? "w-1.5 h-1.5 bg-primary/50 hover:bg-primary cursor-pointer" : ""}
                ${!completed && !current ? "w-1.5 h-1.5 bg-border" : ""}
              `}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WizardProgress;