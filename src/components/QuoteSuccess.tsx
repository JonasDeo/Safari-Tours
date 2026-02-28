import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface QuoteSuccessProps {
  firstName: string;
}

const QuoteSuccess = ({ firstName }: QuoteSuccessProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-md mx-auto"
  >
    {/* Animated ring */}
    <div className="relative w-24 h-24 mb-8">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "backOut" }}
        className="absolute inset-0 rounded-full border border-primary/20"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4, ease: "backOut" }}
        className="absolute inset-2 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
      >
        <CheckCircle2 className="w-10 h-10 text-primary" />
      </motion.div>
    </div>

    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="font-display text-3xl text-sand mb-3"
    >
      Request Received!
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="text-sand/45 font-body leading-relaxed mb-8"
    >
      Thank you{firstName ? `, ${firstName}` : ""}. Our travel consultants will
      review your request and send you a personalised itinerary within 24 hours.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-dark
          text-xs font-semibold tracking-widest uppercase rounded-full
          hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20"
      >
        Back to Home
      </Link>
    </motion.div>
  </motion.div>
);

export default QuoteSuccess;