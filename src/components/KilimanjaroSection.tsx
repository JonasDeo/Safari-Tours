import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import machameImg  from "@/assets/kili-3.jpg";
import lemoshoImg  from "@/assets/kili-1.webp";
import maranguImg  from "@/assets/kili-2.webp";

const treks = [
  {
    slug:  "kilimanjaro-marangu-route",
    days:  6,
    title: "Marangu Route",
    label: "The Classic",
    price: 2130,
    image: maranguImg,
  },
  {
    slug:  "kilimanjaro-machame-route",
    days:  7,
    title: "Machame Route",
    label: "Most Popular",
    price: 2470,
    image: machameImg,
  },
  {
    slug:  "kilimanjaro-lemosho-route",
    days:  8,
    title: "Lemosho Route",
    label: "Best Scenery",
    price: 2585,
    image: lemoshoImg,
  },
];

const AUTO_INTERVAL = 3000;

export function KilimanjaroSection() {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  function syncDot() {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const cardW = card.offsetWidth + 16;
    const idx   = Math.round(el.scrollLeft / cardW);
    setActiveIdx(Math.min(idx, treks.length - 1));
  }

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    el.scrollTo({ left: idx * (card.offsetWidth + 16), behavior: "smooth" });
  }, []);

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => {
        const next = prev >= treks.length - 1 ? 0 : prev + 1;
        scrollTo(next);
        return next;
      });
    }, AUTO_INTERVAL);
  }, [scrollTo]);

  const stopAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => { startAuto(); return () => stopAuto(); }, [startAuto, stopAuto]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncDot, { passive: true });
    return () => el.removeEventListener("scroll", syncDot);
  }, []);

  return (
    <section id="kilimanjaro" className="py-20 lg:py-28 overflow-hidden"
      style={{ background: "hsl(var(--secondary))" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="font-body text-xs tracking-[0.28em] uppercase mb-3"
          style={{ color: "hsl(var(--primary))" }}>
          Summit Africa
        </p>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* LEFT */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-24">
            <h2 className="font-display text-4xl xl:text-5xl font-bold uppercase leading-[1.05] text-foreground mb-5">
              Kilimanjaro<br />Adventure
            </h2>
            <p className="font-body text-sm leading-relaxed mb-8"
              style={{ color: "hsl(var(--muted-foreground))" }}>
              Three proven routes to the Roof of Africa. Each crafted for a
              different pace, scenery, and summit style.
            </p>

            <Link to="/tours/mountain" className="inline-flex items-center gap-3 group mb-10">
              <span className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{ background: "hsl(var(--primary))" }}>
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
              <span className="font-body text-sm font-semibold uppercase tracking-wider
                text-foreground group-hover:opacity-70 transition-opacity duration-200">
                All Trek Routes
              </span>
            </Link>

            {/* Desktop dots */}
            <div className="hidden lg:flex items-center gap-2">
              {treks.map((_, i) => (
                <button key={i}
                  onClick={() => { stopAuto(); scrollTo(i); setActiveIdx(i); startAuto(); }}
                  aria-label={`Go to trek ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:      i === activeIdx ? 28 : 8,
                    height:     8,
                    background: i === activeIdx ? "hsl(var(--primary))" : "hsl(var(--border))",
                  }} />
              ))}
            </div>
          </div>

          {/* RIGHT — scrollable cards */}
          <div className="flex-1 min-w-0">
            <div
              ref={scrollRef}
              onMouseEnter={stopAuto}
              onMouseLeave={startAuto}
              onTouchStart={stopAuto}
              onTouchEnd={startAuto}
              className="flex gap-4 snap-x snap-mandatory"
              style={{
                overflowX:               "scroll",
                overflowY:               "visible",
                scrollbarWidth:          "none",
                msOverflowStyle:         "none",
                WebkitOverflowScrolling: "touch",
                paddingBottom:           "4px",
              }}
            >
              {treks.map((trek) => (
                <div
                  key={trek.slug}
                  data-card
                  className="snap-start flex-shrink-0 flex flex-col overflow-hidden"
                  style={{ width: "min(76vw, 320px)", borderRadius: "16px" }}
                >
                  {/* Photo */}
                  <div className="relative overflow-hidden flex-shrink-0" style={{ height: 240 }}>
                    <img
                      src={trek.image}
                      alt={trek.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 font-body text-[10px] tracking-[0.18em]
                      uppercase font-semibold px-3 py-1.5"
                      style={{
                        background:   "hsl(var(--background)/0.92)",
                        color:        "hsl(var(--foreground))",
                        borderRadius: "99px",
                      }}>
                      {trek.label}
                    </span>
                    <span className="absolute bottom-4 right-4 font-body text-[10px]
                      tracking-[0.15em] uppercase font-semibold px-3 py-1.5"
                      style={{
                        background:   "rgba(0,0,0,0.55)",
                        color:        "rgba(255,255,255,0.9)",
                        borderRadius: "99px",
                      }}>
                      {trek.days} Days
                    </span>
                  </div>

                  {/* Info panel */}
                  <div className="flex flex-col gap-4 p-6 flex-1"
                    style={{ background: "hsl(var(--olive))" }}>
                    <h3 className="font-display text-2xl font-bold text-white uppercase leading-tight">
                      {trek.title}
                    </h3>
                    <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.15)" }} />
                    <div className="flex items-end justify-between gap-3 mt-auto">
                      <div>
                        <p className="font-display text-2xl font-bold text-white">
                          ${trek.price.toLocaleString()}
                        </p>
                        <p className="font-body text-[11px] mt-0.5"
                          style={{ color: "rgba(255,255,255,0.5)" }}>
                          Per Person
                        </p>
                      </div>
                      <Link
                        to={`/tours/${trek.slug}`}
                        className="font-body text-[11px] tracking-[0.15em] uppercase
                          font-semibold px-5 py-3 transition-colors duration-300 whitespace-nowrap"
                        style={{
                          background:   "hsl(var(--primary))",
                          color:        "white",
                          borderRadius: "6px",
                        }}>
                        View Trip
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile dots */}
            <div className="flex lg:hidden justify-center items-center gap-2 mt-6">
              {treks.map((_, i) => (
                <button key={i}
                  onClick={() => { stopAuto(); scrollTo(i); setActiveIdx(i); startAuto(); }}
                  aria-label={`Go to trek ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:      i === activeIdx ? 28 : 8,
                    height:     8,
                    background: i === activeIdx ? "hsl(var(--primary))" : "hsl(var(--border))",
                  }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}