import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      const pct   = total > 0 ? (scrollTop / total) * 100 : 0;
      setProgress(pct);
      spring.set(pct);
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [spring]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-sand/10"
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-primary origin-left"
        style={{ scaleX: spring.get() / 100 }}
      />
    </div>
  );
};

export default ReadingProgress;