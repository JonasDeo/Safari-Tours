import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";

interface WizardNavProps {
  step:        number;
  totalSteps:  number;
  onBack:      () => void;
  onNext:      () => void;
  onSubmit:    () => void;
  canAdvance?: boolean;
}

const WizardNav = ({
  step, totalSteps, onBack, onNext, onSubmit, canAdvance = true,
}: WizardNavProps) => {
  const isFirst = step === 0;
  const isLast  = step === totalSteps - 1;
  const blocked = !canAdvance;

  return (
    <div className="flex items-center justify-between mt-10 pt-6
      border-t border-border/60 gap-4">

      {/* Back */}
      <motion.button
        type="button"
        onClick={onBack}
        disabled={isFirst}
        whileHover={!isFirst ? { x: -2 } : {}}
        whileTap={!isFirst ? { scale: 0.97 } : {}}
        className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3
          rounded-full text-xs sm:text-sm font-body transition-all duration-200
          ${isFirst
            ? "opacity-0 pointer-events-none"
            : "text-foreground/50 hover:text-foreground/80 border border-border hover:border-foreground/20"
          }`}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span className="hidden xs:inline">Back</span>
      </motion.button>

      {/* Next / Submit */}
      {isLast ? (
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={blocked}
          whileHover={!blocked ? { scale: 1.02 } : {}}
          whileTap={!blocked ? { scale: 0.97 } : {}}
          className={`group flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5
            text-xs sm:text-sm font-semibold tracking-widest uppercase rounded-full
            transition-all duration-200
            ${blocked
              ? "bg-primary/35 text-dark/50 cursor-not-allowed shadow-none"
              : "bg-primary text-dark shadow-lg shadow-primary/25 hover:bg-primary/90"
            }`}
        >
          Send Request
          <Send className="w-3.5 h-3.5 transition-transform duration-200
            group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.button>
      ) : (
        <motion.button
          type="button"
          onClick={onNext}
          disabled={blocked}
          whileHover={!blocked ? { x: 2 } : {}}
          whileTap={!blocked ? { scale: 0.97 } : {}}
          className={`group flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5
            text-xs sm:text-sm font-semibold tracking-widest uppercase rounded-full
            transition-all duration-200
            ${blocked
              ? "bg-primary/35 text-dark/50 cursor-not-allowed shadow-none"
              : "bg-primary text-dark shadow-lg shadow-primary/25 hover:bg-primary/90"
            }`}
        >
          Continue
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </motion.button>
      )}
    </div>
  );
};

export default WizardNav;