// src/components/tours/RouteExplorer.tsx
// Drop this section into TourDetail.tsx for MOUNTAIN type tours only.
// Usage: <RouteExplorer defaultSlug={tour.slug} />

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, TrendingUp, Users, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import maranguRouteImg from "@/assets/Marangu-Route-Map.jpg";
import machameRouteImg from "@/assets/Machame-Route-Map.avif";
import lemoshoRouteImg from "@/assets/Lemosho-Route-Map.avif";

// ─── Route data ───────────────────────────────────────────────────────────────

interface KiliRoute {
  slug:        string;
  label:       string;
  nickname:    string;
  map:         string;          // imported image
  days:        string;
  difficulty:  "Moderate" | "Moderate–Challenging" | "Challenging";
  successRate: string;
  price:       string;
  crowd:       "Low" | "Moderate" | "High" | "Very High";
  summary:     string;
  highlights:  string[];
  bestFor:     string;
}

const ROUTES: KiliRoute[] = [
  {
    slug:        "kilimanjaro-marangu-route",
    label:       "Marangu",
    nickname:    "Coca-Cola Route",
    map:         maranguRouteImg,
    days:        "5–6 Days",
    difficulty:  "Moderate",
    successRate: "65–75%",
    price:       "From $2,130",
    crowd:       "High",
    summary:
      "The oldest and most established trail on Kilimanjaro — and the only route with sleeping huts instead of tents. A gentler gradient makes it the most beginner-friendly approach, ascending and descending via the same southeastern path through five distinct ecological zones.",
    highlights: [
      "Only route with hut accommodation (Mandara, Horombo, Kibo)",
      "Gradual ascent — ideal for first-time high-altitude trekkers",
      "Dedicated acclimatisation day at Horombo Hut (3,720m)",
      "Passes through lush rainforest alive with Colobus monkeys",
      "Most affordable of all Kilimanjaro routes",
    ],
    bestFor: "First-timers, budget travellers, comfort seekers",
  },
  {
    slug:        "kilimanjaro-machame-route",
    label:       "Machame",
    nickname:    "Whiskey Route",
    map:         machameRouteImg,
    days:        "6–7 Days",
    difficulty:  "Moderate–Challenging",
    successRate: "~85%",
    price:       "From $2,470",
    crowd:       "Very High",
    summary:
      "The most popular route on Kilimanjaro — and rightly so. Machame offers extraordinary scenery, excellent climb-high-sleep-low acclimatisation, and the legendary Barranco Wall scramble. A circuit route (up Machame Gate, down Mweka Gate) means entirely different terrain on ascent and descent.",
    highlights: [
      "Most diverse landscapes of any Kilimanjaro route",
      "Thrilling Barranco Wall — a 300m hands-and-feet scramble",
      "Climb-high, sleep-low profile at Lava Tower (4,600m)",
      "Circuit route — different scenery up and down",
      "High summit success rate with 7-day itinerary",
    ],
    bestFor: "Fit trekkers with hiking experience, groups, photographers",
  },
  {
    slug:        "kilimanjaro-lemosho-route",
    label:       "Lemosho",
    nickname:    "Scenic Route",
    map:         lemoshoRouteImg,
    days:        "7–8 Days",
    difficulty:  "Moderate–Challenging",
    successRate: "~90%",
    price:       "From $2,585",
    crowd:       "Moderate",
    summary:
      "Widely regarded as the finest route on Kilimanjaro. Lemosho begins at the remote Londorossi Gate on the western face — two days of pristine, crowd-free rainforest before emerging onto the vast Shira Plateau. The most generous acclimatisation profile of any standard route translates directly into the highest summit success rates.",
    highlights: [
      "Remote western start — virtually no other trekkers for first 2 days",
      "Dramatic emergence onto Shira Plateau with full summit views",
      "8-day itinerary for the best possible acclimatisation",
      "Full southern circuit traverse beneath the glaciers",
      "Highest summit success rate of all standard routes (~90%)",
    ],
    bestFor: "Those wanting the best experience, photographers, success-focused trekkers",
  },
  {
    slug:        "kilimanjaro-rongai-route",
    label:       "Rongai",
    nickname:    "Northern Route",
    map:         maranguRouteImg, // placeholder — replace with rongai map if available
    days:        "6–7 Days",
    difficulty:  "Moderate",
    successRate: "~80%",
    price:       "From $2,300",
    crowd:       "Low",
    summary:
      "The only route approaching Kilimanjaro from the north, entering near the Kenyan border. Drier, more remote, and with more frequent wildlife sightings than southern routes. The northern slopes have a completely different character — open moorland and sparse vegetation with wide, unobstructed views of the plains below.",
    highlights: [
      "Only northern approach — quieter and more remote",
      "More wildlife sightings (buffalo, elephant, Colobus monkey)",
      "Drier conditions — better option during the rainy season",
      "Gradual ascent through open moorland and alpine desert",
      "Strong summit success rate with 7-day itinerary",
    ],
    bestFor: "Rainy-season trekkers, those wanting solitude, return climbers",
  },
  {
    slug:        "kilimanjaro-northern-circuit",
    label:       "Northern Circuit",
    nickname:    "Grand Traverse",
    map:         lemoshoRouteImg, // placeholder — replace with northern circuit map if available
    days:        "9–10 Days",
    difficulty:  "Moderate–Challenging",
    successRate: "~95%",
    price:       "From $3,100",
    crowd:       "Low",
    summary:
      "The longest route on Kilimanjaro and the least crowded. Beginning like Rongai from the north, it makes a sweeping 360-degree traverse of the entire mountain before summiting from the south. Ten days of extraordinary mountain wilderness, every ecological zone, every face of Kilimanjaro — and the highest summit success rate available.",
    highlights: [
      "Complete 360° traverse — every face of Kilimanjaro",
      "Highest summit success rate of all routes (~95%)",
      "Fewest trekkers of any standard itinerary",
      "10 days of thorough, progressive acclimatisation",
      "The ultimate Kilimanjaro experience for committed trekkers",
    ],
    bestFor: "Maximum summit success, experienced trekkers, return climbers",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DIFFICULTY_COLOR: Record<string, string> = {
  "Moderate":              "hsl(142 60% 45%)",
  "Moderate–Challenging":  "hsl(38 90% 50%)",
  "Challenging":           "hsl(0 70% 55%)",
};

const CROWD_DOTS: Record<string, number> = {
  "Low": 1, "Moderate": 2, "High": 3, "Very High": 4,
};

const accent = "hsl(var(--terracotta))";

// ─── Component ────────────────────────────────────────────────────────────────

export const RouteExplorer = ({ defaultSlug }: { defaultSlug?: string }) => {
  const initial = ROUTES.find(r => r.slug === defaultSlug) ?? ROUTES[0];
  const [active, setActive] = useState<KiliRoute>(initial);

  return (
    <div>
      {/* Section header */}
      <h2
        className="font-display text-xl text-foreground mb-1"
        style={{ fontFamily: '"Yeseva One", serif' }}
      >
        Kilimanjaro Route Explorer
      </h2>
      <p className="font-body text-xs text-muted-foreground mb-5">
        Select a route to view its map and full details.
      </p>

      {/* Route tab switcher */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ROUTES.map(route => (
          <button
            key={route.slug}
            onClick={() => setActive(route)}
            className="font-body text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200"
            style={
              active.slug === route.slug
                ? { background: accent, color: "#fff", borderColor: accent }
                : {
                    background: "hsl(var(--background))",
                    color: "hsl(var(--muted-foreground))",
                    borderColor: "hsl(var(--border)/0.6)",
                  }
            }
          >
            {route.label}
            <span
              className="ml-1.5 opacity-60 text-[10px]"
              style={{ fontStyle: "italic" }}
            >
              {route.nickname}
            </span>
          </button>
        ))}
      </div>

      {/* Animated content panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Route map image */}
          <div
            className="w-full rounded-xl overflow-hidden"
            style={{ border: "1px solid hsl(var(--border)/0.5)" }}
          >
            <img
              src={active.map}
              alt={`${active.label} Route Map`}
              className="w-full object-contain"
              style={{ maxHeight: 440, background: "hsl(var(--muted)/0.2)" }}
            />
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {[
              {
                icon: <Clock className="w-3.5 h-3.5" />,
                label: "Duration",
                value: active.days,
              },
              {
                icon: <TrendingUp className="w-3.5 h-3.5" />,
                label: "Difficulty",
                value: active.difficulty,
                color: DIFFICULTY_COLOR[active.difficulty],
              },
              {
                icon: <Star className="w-3.5 h-3.5" />,
                label: "Success Rate",
                value: active.successRate,
              },
              {
                icon: <Users className="w-3.5 h-3.5" />,
                label: "Crowd Level",
                value: active.crowd,
              },
            ].map(stat => (
              <div
                key={stat.label}
                className="rounded-xl p-3.5 flex flex-col gap-1.5"
                style={{
                  background: "hsl(var(--muted)/0.3)",
                  border: "1px solid hsl(var(--border)/0.4)",
                }}
              >
                <div
                  className="flex items-center gap-1.5 font-body text-[10px] uppercase tracking-wider"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  <span style={{ color: accent }}>{stat.icon}</span>
                  {stat.label}
                </div>
                <span
                  className="font-body text-sm font-bold"
                  style={{ color: stat.color ?? "hsl(var(--foreground))" }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {active.summary}
          </p>

          {/* Highlights */}
          <div>
            <p
              className="font-body text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: accent }}
            >
              Route Highlights
            </p>
            <ul className="space-y-2">
              {active.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 font-body text-sm text-foreground"
                >
                  <span
                    className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 text-[10px] font-bold"
                    style={{ background: `${accent}18`, color: accent }}
                  >
                    {i + 1}
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Best for + price + CTA */}
          <div
            className="rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{
              background: `${accent}0d`,
              border: `1px solid ${accent}28`,
            }}
          >
            <div className="space-y-0.5">
              <p className="font-body text-xs text-muted-foreground">
                Best For: <span className="text-foreground font-medium">{active.bestFor}</span>
              </p>
              <p
                className="font-display text-xl font-bold"
                style={{ fontFamily: '"Yeseva One", serif', color: accent }}
              >
                {active.price}
                <span className="font-body text-xs font-normal text-muted-foreground ml-1">/ person</span>
              </p>
            </div>
            <Link
              to={`/tours/${active.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest whitespace-nowrap"
              style={{ background: accent, color: "#fff" }}
            >
              View Full Package <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RouteExplorer;