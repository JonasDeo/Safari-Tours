import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

//   Types  

interface Testimonial {
  id:       number;
  name:     string;
  location: string;
  initials: string;
  color:    string;
  text:     string;
  rating:   number;
}

//   Static data (swap for API call if you wire a /testimonials endpoint)    

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Caroline M.",
    location: "Canada",
    initials: "CM",
    color: "#c8873a",
    text: "As a solo traveler, I wanted the safety and comfort of a guided safari. Balbina matched me with a kind, professional guide and a personalised itinerary that hit every spot I dreamed of.",
    rating: 5,
  },
  {
    id: 2,
    name: "Nasser & Leila",
    location: "Oman",
    initials: "NL",
    color: "#3a7c6e",
    text: "We chose Balbina for our family of five and it was flawless. The guide was fantastic with our kids, adjusting the pace and keeping things engaging. Tanzania stole our hearts.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophie & Daniel",
    location: "Germany",
    initials: "SD",
    color: "#7c6a3a",
    text: "We saw all the Big Five in just four days! Our guide was patient, knowledgeable, and had an amazing eye for spotting animals. We felt like VIPs from start to finish.",
    rating: 5,
  },
  {
    id: 4,
    name: "Lisa T.",
    location: "United Kingdom",
    initials: "LT",
    color: "#8b3a3a",
    text: "I was nervous about a self-drive safari, but Balbina made it incredibly easy and safe. The car was in excellent condition, the team checked in regularly, and their itinerary suggestions were spot on.",
    rating: 5,
  },
  {
    id: 5,
    name: "Alex & Jordan",
    location: "USA",
    initials: "AJ",
    color: "#3a5c8b",
    text: "Our self-drive safari through Tanzania was the most unforgettable trip we have ever taken. Everything was seamless, from the route planning to the vehicle. Cannot recommend enough.",
    rating: 5,
  },
];

const AUTO_PLAY_MS = 5000;

//   Stars 

const Stars = ({ n }: { n: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i}
        className="w-3.5 h-3.5"
        style={{ fill: i < n ? "hsl(var(--primary))" : "transparent",
                 color: i < n ? "hsl(var(--primary))" : "hsl(var(--border))" }} />
    ))}
  </div>
);

//   Card  ─

const TestimonialCard = ({
  t, active, direction,
}: {
  t: Testimonial; active: boolean; direction: number;
}) => {
  const variants = {
    enter:  { x: direction > 0 ? 60 : -60, opacity: 0, scale: 0.97 },
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   { x: direction > 0 ? -60 : 60, opacity: 0, scale: 0.97 },
  };

  return (
    <motion.div
      key={t.id}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
      className="absolute inset-0 flex flex-col justify-between p-7 md:p-9"
      style={{
        background: "hsl(var(--background))",
        border: "1px solid hsl(var(--border)/0.6)",
        borderRadius: "1.5rem",
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        {/* Avatar */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-11 h-11 rounded-full flex items-center justify-center
            text-sm font-bold text-white flex-shrink-0"
            style={{ background: t.color, fontFamily: '"Yeseva One", serif' }}>
            {t.initials}
          </div>
          <div>
            <p className="font-body font-semibold text-sm text-foreground leading-none mb-0.5">
              {t.name}
            </p>
            <p className="font-body text-xs text-muted-foreground">{t.location}</p>
          </div>
        </div>

        {/* Stars */}
        <Stars n={t.rating} />
      </div>

      {/* Quote */}
      <div className="relative flex-1 flex items-center py-4">
        <Quote className="absolute -top-1 -left-1 w-7 h-7 opacity-10"
          style={{ color: "hsl(var(--primary))" }} />
        <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed italic pl-5">
          {t.text}
        </p>
      </div>

      {/* Divider accent */}
      <div className="h-px w-12 rounded-full" style={{ background: t.color, opacity: 0.5 }} />
    </motion.div>
  );
};

//   Section       ─

const TestimonialsSection = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const go = useCallback((next: number, dir: number) => {
    setCurrent([next, dir]);
  }, []);

  const prev = useCallback(() => {
    go((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, -1);
  }, [current, go]);

  const next = useCallback(() => {
    go((current + 1) % TESTIMONIALS.length, 1);
  }, [current, go]);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTO_PLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [current, paused, next]);

  const t = TESTIMONIALS[current];

  return (
    <section className="py-20 overflow-hidden" style={{ background: "hsl(var(--muted)/0.25)" }}>
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.28em] uppercase font-body mb-3"
            style={{ color: "hsl(var(--primary))" }}>
            Traveller Stories
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground"
            style={{ fontFamily: '"Yeseva One", serif' }}>
            What Our Guests Say
          </h2>
        </div>

        {/* Carousel */}
        <div className="max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>

          {/* Card container */}
          <div className="relative" style={{ height: 280 }}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <TestimonialCard key={t.id} t={t} active direction={direction} />
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 px-1">

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  i === current ? 24 : 8,
                    height: 8,
                    background: i === current
                      ? "hsl(var(--primary))"
                      : "hsl(var(--border))",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button onClick={prev}
                className="w-9 h-9 rounded-full flex items-center justify-center
                  transition-all duration-200"
                style={{ border: "1px solid hsl(var(--border)/0.7)",
                         background: "hsl(var(--background))" }}
                onMouseEnter={e => (e.currentTarget.style.background = "hsl(var(--muted))")}
                onMouseLeave={e => (e.currentTarget.style.background = "hsl(var(--background))")}>
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
              <button onClick={next}
                className="w-9 h-9 rounded-full flex items-center justify-center
                  transition-all duration-200"
                style={{ border: "1px solid hsl(var(--border)/0.7)",
                         background: "hsl(var(--background))" }}
                onMouseEnter={e => (e.currentTarget.style.background = "hsl(var(--muted))")}
                onMouseLeave={e => (e.currentTarget.style.background = "hsl(var(--background))")}>
                <ChevronRight className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          {!paused && (
            <div className="mt-4 h-0.5 rounded-full overflow-hidden"
              style={{ background: "hsl(var(--border)/0.4)" }}>
              <motion.div
                key={current}
                className="h-full rounded-full"
                style={{ background: "hsl(var(--primary))" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTO_PLAY_MS / 1000, ease: "linear" }}
              />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;