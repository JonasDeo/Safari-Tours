import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Testimonial {
  id:       number;
  name:     string;
  location: string;
  avatar:   string | null;
  text:     string;
  rating:   number;
}

// ── Fallback ──────────────────────────────────────────────────────────────────

const FALLBACK: Testimonial[] = [
  { id: 1, name: "Caroline M.",     location: "Canada",         avatar: null, rating: 5,
    text: "As a solo traveler, I wanted safety and comfort. Balbina matched me with a kind, professional guide and a personalised itinerary that hit every spot I dreamed of." },
  { id: 2, name: "Nasser & Leila",  location: "Oman",           avatar: null, rating: 5,
    text: "We chose Balbina for our family of five and it was flawless. The guide was fantastic with our kids, adjusting the pace perfectly. Tanzania stole our hearts." },
  { id: 3, name: "Sophie & Daniel", location: "Germany",        avatar: null, rating: 5,
    text: "We saw all the Big Five in just four days! Our guide had an incredible eye for spotting wildlife. We felt like VIPs from start to finish." },
  { id: 4, name: "Lisa T.",          location: "United Kingdom", avatar: null, rating: 5,
    text: "I was nervous about a self-drive safari, but Balbina made it incredibly easy and safe. The car was in excellent condition and the itinerary suggestions were spot on." },
  { id: 5, name: "Alex & Jordan",   location: "USA",            avatar: null, rating: 5,
    text: "Our self-drive safari through Tanzania was the most unforgettable trip we've ever taken. Everything was seamless, from route planning to the vehicle." },
];

const AUTO_MS  = 5000;
const API_BASE = (import.meta as any).env?.VITE_API_URL ?? "http://localhost:8000";

// ── Helpers ───────────────────────────────────────────────────────────────────

const nameToColor = (name: string) => {
  const palette = ["#c8873a", "#3a7c6e", "#7c6a3a", "#8b3a3a", "#3a5c8b", "#6e3a7c", "#3a6e4a"];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
};

const getInitials = (name: string) =>
  name.split(/[\s&]+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");

// ── Card ──────────────────────────────────────────────────────────────────────

const Card = ({ t, role }: { t: Testimonial; role: "center" | "side" }) => {
  const isCenter = role === "center";
  const color    = nameToColor(t.name);

  return (
    <motion.div
      layout
      animate={{
        scale:   isCenter ? 1    : 0.92,
        opacity: isCenter ? 1    : 0.38,
        y:       isCenter ? 0    : 18,
      }}
      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
      className="w-full rounded-2xl flex flex-col select-none"
      style={{
        padding:    isCenter ? "2rem" : "1.5rem",
        background: "hsl(var(--background))",
        border:     `1px solid hsl(var(--border)/${isCenter ? "1" : "0.4"})`,
        boxShadow:  isCenter
          ? "0 4px 20px -4px rgba(0,0,0,0.07), 0 1px 4px -1px rgba(0,0,0,0.04)"
          : "none",
      }}
    >
      {/* Author row */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="rounded-full overflow-hidden flex-shrink-0"
            style={{ width: isCenter ? 42 : 34, height: isCenter ? 42 : 34 }}>
            {t.avatar
              ? <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center text-white font-medium"
                  style={{
                    background:  color,
                    fontSize:    isCenter ? "0.8rem" : "0.65rem",
                    fontFamily:  '"Playfair Display", serif',
                  }}>
                  {getInitials(t.name)}
                </div>
            }
          </div>
          <div>
            <p className={`font-medium text-foreground ${isCenter ? "text-sm" : "text-xs"}`}>
              {t.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{t.location}</p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 flex-shrink-0">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i}
              className={isCenter ? "w-3.5 h-3.5" : "w-2.5 h-2.5"}
              style={{ fill: "hsl(var(--foreground))", color: "hsl(var(--foreground))" }} />
          ))}
        </div>
      </div>

      {/* Quote — border-l style from the minimal version */}
      <div className="border-l-2 border-border pl-4">
        <p className={`leading-relaxed text-muted-foreground italic
          ${isCenter ? "text-sm" : "text-xs line-clamp-4"}`}>
          {t.text}
        </p>
      </div>
    </motion.div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK);
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Fetch live data
  useEffect(() => {
    fetch(`${API_BASE}/api/testimonials`, { headers: { Accept: "application/json" } })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: any) => {
        const list = Array.isArray(data) ? data : (data?.data ?? []);
        if (list.length > 0) setTestimonials(list);
      })
      .catch(() => {});
  }, []);

  const total = testimonials.length;
  const next  = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const prev  = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);

  // Auto-advance
  useEffect(() => {
    if (paused || total < 2) return;
    timerRef.current = setTimeout(next, AUTO_MS);
    return () => clearTimeout(timerRef.current);
  }, [current, paused, next, total]);

  const leftIdx  = (current - 1 + total) % total;
  const rightIdx = (current + 1) % total;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.28em] uppercase text-muted-foreground mb-3">
            Traveller Stories
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
            What Our Guests Say
          </h2>
        </div>

        {/* Three cards */}
        <div
          className="flex items-center justify-center gap-4 max-w-5xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {total >= 3 ? (
            <>
              <div className="w-full max-w-[290px] flex-shrink-0 cursor-pointer" onClick={prev}>
                <Card t={testimonials[leftIdx]} role="side" />
              </div>
              <div className="w-full max-w-[400px] flex-shrink-0">
                <Card t={testimonials[current]} role="center" />
              </div>
              <div className="w-full max-w-[290px] flex-shrink-0 cursor-pointer" onClick={next}>
                <Card t={testimonials[rightIdx]} role="side" />
              </div>
            </>
          ) : (
            <div className="w-full max-w-[400px]">
              <Card t={testimonials[current]} role="center" />
            </div>
          )}
        </div>

        {/* Arrows — right-aligned like the minimal version */}
        <div className="flex justify-center gap-2 mt-8">
          <button onClick={prev}
            className="w-9 h-9 rounded-full border border-border flex items-center
              justify-center text-muted-foreground hover:bg-muted transition-colors duration-200">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next}
            className="w-9 h-9 rounded-full border border-border flex items-center
              justify-center text-muted-foreground hover:bg-muted transition-colors duration-200">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;