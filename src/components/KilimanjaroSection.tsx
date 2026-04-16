import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import machameImg from "@/assets/mount-trek.jpg";
import lemoshoImg from "@/assets/mount-trek.jpg";
import maranguImg  from "@/assets/mount-trek.jpg";

const treks = [
  {
    slug: "marangu-route",
    days: 6,
    type: "Trek",
    title: "Marangu Route",
    price: 2130,
    image: maranguImg,
  },
  {
    slug: "machame-route",
    days: 7,
    type: "Trek",
    title: "Machame Route",
    price: 2470,
    image: machameImg,
  },
  {
    slug: "lemosho-route",
    days: 8,
    type: "Trek",
    title: "Lemosho Route",
    price: 2585,
    image: lemoshoImg,
  },
];

const AUTO_INTERVAL = 3500; // ms between auto-scroll steps

export function KilimanjaroSection() {
  const scrollRef   = useRef<HTMLDivElement>(null);
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // ── derive active dot from scroll position ──────────────────────────────
  function syncDot() {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const cardW = card.offsetWidth + 24; // gap-6 = 24px
    const idx   = Math.round(el.scrollLeft / cardW);
    setActiveIdx(Math.min(idx, treks.length - 1));
  }

  // ── scroll to a specific card index ─────────────────────────────────────
  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const cardW = card.offsetWidth + 24;
    el.scrollTo({ left: idx * cardW, behavior: "smooth" });
  }, []);

  // ── auto-advance ─────────────────────────────────────────────────────────
  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        const next = prev >= treks.length - 1 ? 0 : prev + 1;
        scrollTo(next);
        return next;
      });
    }, AUTO_INTERVAL);
  }, [scrollTo]);

  const stopAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncDot, { passive: true });
    return () => el.removeEventListener("scroll", syncDot);
  }, []);

  function handleDotClick(i: number) {
    stopAuto();
    scrollTo(i);
    setActiveIdx(i);
    startAuto(); // restart timer from this point
  }

  return (
    <section id="kilimanjaro" className="py-16 lg:py-24 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Two-column layout: left pinned info / right carousel ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ── LEFT — sticky heading ── */}
          <div className="lg:w-[280px] xl:w-[320px] flex-shrink-0 lg:sticky lg:top-24">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-4">
              Popular
            </p>
            <h2 className="font-display text-4xl xl:text-5xl font-bold
              text-foreground uppercase leading-tight mb-5">
              Kilimanjaro<br />Adventure
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
              Join us on our most loved Tanzania treks, where every journey
              feels truly unforgettable.
            </p>

            {/* Explore all link */}
            <Link
              to="/tours/mountain"
              className="group inline-flex items-center gap-4"
            >
              <span className="w-11 h-11 rounded-full bg-[hsl(var(--olive))]
                flex items-center justify-center flex-shrink-0
                group-hover:bg-primary transition-colors duration-300">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
              <span className="font-body text-sm text-foreground
                group-hover:text-primary transition-colors duration-300">
                Explore All Treks
              </span>
            </Link>

            {/* Dot pagination — shown below the link on desktop */}
            <div className="hidden lg:flex items-center gap-2.5 mt-10">
              {treks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  aria-label={`Go to trek ${i + 1}`}
                  className={`rounded-full transition-all duration-300
                    ${i === activeIdx
                      ? "w-6 h-2.5 bg-[hsl(var(--olive))]"
                      : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT — scrollable cards ── */}
          <div className="flex-1 min-w-0">
            <div
              ref={scrollRef}
              onMouseEnter={stopAuto}
              onMouseLeave={startAuto}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-2
                snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {treks.map((trek, i) => (
                <motion.div
                  key={trek.title}
                  data-card
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px]
                    flex-shrink-0 snap-start overflow-hidden flex flex-col"
                >
                  {/* Photo */}
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={trek.image}
                      alt={trek.title}
                      className="w-full h-full object-cover
                        hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>

                  {/* Olive info panel */}
                  <div className="bg-[hsl(var(--olive))] p-6 flex flex-col gap-4 flex-1">
                    {/* Type tag */}
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase
                      text-white/50">
                      {trek.days} Days {trek.type}
                    </p>

                    {/* Title */}
                    <h3 className="font-display text-2xl font-bold text-white
                      uppercase leading-tight">
                      {trek.title}
                    </h3>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/15" />

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between gap-4 mt-auto">
                      <div>
                        <p className="font-display text-2xl font-bold text-white">
                          ${trek.price.toLocaleString()}
                        </p>
                        <p className="font-body text-[11px] text-white/50 mt-0.5">
                          Per Person
                        </p>
                      </div>

                      <Link
                        to={`/tours/mountain/${trek.slug}`}
                        className="font-body text-[11px] tracking-[0.15em] uppercase
                          font-semibold px-5 py-3 bg-primary text-white
                          hover:bg-[hsl(var(--rust-light))]
                          transition-colors duration-300 whitespace-nowrap"
                      >
                        View Trip
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile dots */}
            <div className="flex lg:hidden justify-center items-center gap-2.5 mt-6">
              {treks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  aria-label={`Go to trek ${i + 1}`}
                  className={`rounded-full transition-all duration-300
                    ${i === activeIdx
                      ? "w-6 h-2.5 bg-[hsl(var(--olive))]"
                      : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground"
                    }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}