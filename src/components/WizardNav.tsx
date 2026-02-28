import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";

interface WizardNavProps {
  step:        number;
  totalSteps:  number;
  onBack:      () => void;
  onNext:      () => void;
  onSubmit:    () => void;
  canAdvance?: boolean;   // optional — next is always enabled (steps are optional)
}

const WizardNav = ({
  step,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
}: WizardNavProps) => {
  const isFirst  = step === 0;
  const isLast   = step === totalSteps - 1;

  return (
    <div className="flex items-center justify-between mt-10 pt-8 border-t border-sand/8">
      {/* Back */}
      <motion.button
        type="button"
        onClick={onBack}
        disabled={isFirst}
        whileHover={!isFirst ? { x: -2 } : {}}
        whileTap={!isFirst ? { scale: 0.97 } : {}}
        className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-body
          transition-all duration-200
          ${isFirst
            ? "opacity-0 pointer-events-none"
            : "text-sand/50 hover:text-sand/80 border border-sand/10 hover:border-sand/25"
          }`}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </motion.button>

      {/* Next / Submit */}
      {isLast ? (
        <motion.button
          type="button"
          onClick={onSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-2.5 px-7 py-3.5 bg-primary text-dark
            text-sm font-semibold tracking-widest uppercase rounded-full
            shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all duration-200"
        >
          Send Request
          <Send className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.button>
      ) : (
        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-2 px-7 py-3.5 bg-primary text-dark
            text-sm font-semibold tracking-widest uppercase rounded-full
            shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all duration-200"
        >
          Continue
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </motion.button>
      )}
    </div>
  );
};

export default WizardNav;