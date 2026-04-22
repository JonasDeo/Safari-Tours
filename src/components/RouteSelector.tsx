// src/components/RouteSelector.tsx
// Drop into src/components/, import in MountainTrekking.tsx, replace the <ol> routes section

import { useState } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


import maranguMap from "@/assets/Marangu-Route-Map.jpg";
import machameMap from "@/assets/Machame-Route-Map.avif";
import lemoshoMap from "@/assets/Lemosho-Route-Map.avif";
import rongaiMap  from "@/assets/Rongai-Route-Map.jpg";
import umbweMap  from "@/assets/Umbwe-Route-Map.png";
import northernCircuit  from "@/assets/Northern-Circuit-Route-map.jpg";

const ROUTE_MAPS: Record<string, string> = {
  machame: machameMap,
  lemosho: lemoshoMap,
  marangu: maranguMap,
  rongai:  rongaiMap,
  umbwe:   umbweMap,
  northern:northernCircuit,
};

interface Route {
  id:          string;
  label:       string;
  duration:    string;
  difficulty:  string;
  successRate: string;
  description: string;
  camps: { name: string; elevation: string }[];
}

const ROUTES: Route[] = [
  {
    id:          "machame",
    label:       "Machame Route",
    duration:    "6–7 Days",
    difficulty:  "Moderate – Challenging",
    successRate: "~80%",
    description:
      "Known as the 'Whiskey Route', Machame is the most popular trail on Kilimanjaro and widely regarded as the most scenic. It approaches from the south-west through dense rainforest before opening up onto the dramatic Shira Plateau. The famous Barranco Wall scramble is a highlight — a hands-on rocky face that rewards climbers with sweeping panoramic views. The route's excellent 'climb high, sleep low' acclimatisation profile gives it one of the highest success rates among the shorter routes.",
    camps: [
      { name: "Machame Gate",  elevation: "1,800 m" },
      { name: "Machame Camp",  elevation: "3,000 m" },
      { name: "Shira Camp",    elevation: "3,840 m" },
      { name: "Lava Tower",    elevation: "4,600 m" },
      { name: "Barranco Camp", elevation: "3,960 m" },
      { name: "Karanga Camp",  elevation: "4,035 m" },
      { name: "Barafu Camp",   elevation: "4,673 m" },
      { name: "Uhuru Peak",    elevation: "5,895 m" },
    ],
  },
  {
    id:          "lemosho",
    label:       "Lemosho Route",
    duration:    "7–8 Days",
    difficulty:  "Moderate – Challenging",
    successRate: "~90%",
    description:
      "Starting on Kilimanjaro's western side, the Lemosho Route has a remote trailhead at Londorossi Gate. One of the key highlights is the famous Shira Plateau and the Cathedral Peak (3,962 m / 13,000 feet). The latter is the highest point on the Shira Ridge and rewards trekkers with extraordinary 360° panoramic views. With more days than most routes, Lemosho provides the best acclimatisation profile on the mountain and boasts the highest summit success rate of any standard route — making it the top recommendation for those with the time to do it properly.",
    camps: [
      { name: "Londorossi Gate", elevation: "2,100 m" },
      { name: "Forest Camp",     elevation: "2,750 m" },
      { name: "Shira 1 Camp",    elevation: "3,610 m" },
      { name: "Shira 2 Camp",    elevation: "3,850 m" },
      { name: "Lava Tower",      elevation: "4,600 m" },
      { name: "Barranco Camp",   elevation: "3,900 m" },
      { name: "Karanga Camp",    elevation: "3,995 m" },
      { name: "Barafu Camp",     elevation: "4,673 m" },
      { name: "Millennium Camp", elevation: "3,950 m" },
      { name: "Mweka Gate",      elevation: "1,640 m" },
    ],
  },
  {
    id:          "marangu",
    label:       "Marangu Route",
    duration:    "5–6 Days",
    difficulty:  "Moderate",
    successRate: "~65%",
    description:
      "The 'Coca-Cola Route' is the only trail on Kilimanjaro with permanent hut accommodation, making it the most comfortable option. Trekkers sleep in A-frame bunkhouses at Mandara, Horombo, and Kibo Huts rather than tents. The route follows a direct, well-maintained path through montane rainforest, open moorland, and stark alpine desert. While it is the most straightforward ascent, it uses the same trail for both ascent and descent, offering less scenic variety. A 6-day itinerary with an acclimatisation day at Horombo Hut significantly improves summit success.",
    camps: [
      { name: "Marangu Gate", elevation: "1,860 m" },
      { name: "Mandara Hut",  elevation: "2,700 m" },
      { name: "Horombo Hut",  elevation: "3,720 m" },
      { name: "Kibo Hut",     elevation: "4,700 m" },
      { name: "Uhuru Peak",   elevation: "5,895 m" },
    ],
  },
  {
    id:          "rongai",
    label:       "Rongai Route",
    duration:    "6–7 Days",
    difficulty:  "Moderate",
    successRate: "~79%",
    description:
      "The Rongai Route is the only trail that approaches Kilimanjaro from the north, near the Kenyan border. It offers a quieter, more remote experience than the southern routes and is particularly well-suited to climbing during Tanzania's rainy seasons, as the northern slopes receive considerably less rainfall. The terrain is drier and more arid, with a gradual ascent that makes it accessible for less experienced trekkers. The descent is typically via the Marangu Route, giving climbers a taste of two different sides of the mountain.",
    camps: [
      { name: "Rongai Gate",   elevation: "1,950 m" },
      { name: "Simba Camp",    elevation: "2,625 m" },
      { name: "Kikelewa Camp", elevation: "3,600 m" },
      { name: "Mawenzi Tarn",  elevation: "4,330 m" },
      { name: "Kibo Hut",      elevation: "4,700 m" },
      { name: "Uhuru Peak",    elevation: "5,895 m" },
    ],
  },
  {
    id:          "umbwe",
    label:       "Umbwe Route",
    duration:    "6–7 Days",
    difficulty:  "Challenging",
    successRate: "~70%",
    description:
      "The Umbwe Route is the most direct and steepest trail on Kilimanjaro — a serious undertaking reserved for experienced, physically fit trekkers who are confident at altitude. The lower section ascends through thick rainforest via a dramatic ridge before joining the Southern Circuit. Because of its rapid elevation gain, acclimatisation is more challenging and the summit success rate is lower than longer routes. However, for those who handle altitude well, Umbwe offers an intense, uncrowded, and incredibly raw Kilimanjaro experience with outstanding solitude.",
    camps: [
      { name: "Umbwe Gate",    elevation: "1,600 m" },
      { name: "Cave Camp",     elevation: "2,940 m" },
      { name: "Barranco Camp", elevation: "3,960 m" },
      { name: "Karanga Camp",  elevation: "4,035 m" },
      { name: "Barafu Camp",   elevation: "4,673 m" },
      { name: "Uhuru Peak",    elevation: "5,895 m" },
    ],
  },
  {
    id:          "northern",
    label:       "Northern Circuit Route",
    duration:    "8–9 Days",
    difficulty:  "Moderate – Challenging",
    successRate: "~90%",
    description:
      "The Northern Circuit is Kilimanjaro's longest and most remote route — and the one with the highest summit success rate alongside Lemosho. Starting at Londorossi Gate, it circumnavigates nearly the entire mountain before ascending from the north. This extended traverse exposes climbers to all of Kilimanjaro's ecological zones and micro-climates, from the remote western wilderness and the vast Shira Plateau to the arid northern slopes rarely seen by other trekkers. With 8–9 days on the mountain, acclimatisation is superb and trail traffic is very low.",
    camps: [
      { name: "Londorossi Gate", elevation: "2,100 m" },
      { name: "Forest Camp",     elevation: "2,750 m" },
      { name: "Shira 1 Camp",    elevation: "3,610 m" },
      { name: "Shira 2 Camp",    elevation: "3,850 m" },
      { name: "Lava Tower",      elevation: "4,600 m" },
      { name: "Buffalo Camp",    elevation: "4,020 m" },
      { name: "3rd Cave Camp",   elevation: "3,800 m" },
      { name: "School Hut",      elevation: "4,800 m" },
      { name: "Uhuru Peak",      elevation: "5,895 m" },
    ],
  },
];

const accent = "hsl(var(--terracotta))";

export default function RouteSelector() {
  const [activeId, setActiveId] = useState<string>("lemosho");
  const active = ROUTES.find(r => r.id === activeId)!;

  return (
    <div className="mb-16">

      {/* Section header */}
      <p className="text-xs tracking-[0.2em] uppercase font-body mb-2" style={{ color: accent }}>
        Explore the Routes
      </p>
      <h2
        className="font-display text-2xl text-foreground mb-2"
        style={{ fontFamily: '"Yeseva One", serif' }}
      >
        Mount Kilimanjaro — Trekking Routes Overview
      </h2>
      <p className="font-body text-sm text-muted-foreground mb-8 max-w-2xl">
        Select a route to see its map, camps, and full description. All routes lead to Uhuru Peak
        (5,895 m) — the choice depends on your schedule, fitness, and experience.
      </p>

      {/* ── Two-column layout: list LEFT, map RIGHT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 items-stretch">

        {/* Left: vertical route list */}
        <div
          className="flex flex-col gap-1 p-2 rounded-2xl"
          style={{ border: "1px solid hsl(var(--border)/0.5)", background: "hsl(var(--muted)/0.2)" }}
        >
          {ROUTES.map(route => {
            const isActive = route.id === activeId;
            return (
              <button
                key={route.id}
                onClick={() => setActiveId(route.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left
                  transition-all duration-200 w-full"
                style={{
                  background:  isActive ? "hsl(var(--background))" : "transparent",
                  border:      isActive
                    ? "1px solid hsl(var(--border)/0.7)"
                    : "1px solid transparent",
                  boxShadow:   isActive ? "0 1px 8px hsl(var(--border)/0.25)" : "none",
                }}
              >
                <MapPin
                  className="w-4 h-4 flex-shrink-0 transition-colors duration-200"
                  style={{ color: isActive ? accent : "hsl(var(--muted-foreground))" }}
                />
                <span
                  className="font-body text-sm transition-colors duration-200 flex-1 text-left"
                  style={{
                    color:      isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {route.label}
                </span>
                {isActive && (
                  <span
                    className="w-4 h-0.5 rounded-full flex-shrink-0"
                    style={{ background: accent }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: animated map image */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border:     "1px solid hsl(var(--border)/0.5)",
            background: "hsl(var(--muted)/0.15)",
            minHeight:  380,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeId + "-map"}
              src={ROUTE_MAPS[active.id]}
              alt={`${active.label} route map`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="w-full object-cover"
              style={{ minHeight: 380, maxHeight: 500, display: "block" }}
            />
          </AnimatePresence>
        </div>

      </div>

      {/* ── Description section below — same two-column alignment ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId + "-info"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4"
        >

          {/* Left column: route name, stats, camps — aligns under the list */}
          <div
            className="p-5 rounded-2xl"
            style={{ border: "1px solid hsl(var(--border)/0.5)", background: "hsl(var(--muted)/0.2)" }}
          >
            {/* Route title with double-pin icon (matches screenshot) */}
            <div className="flex items-center gap-1.5 mb-4">
              <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
              <MapPin className="w-4 h-4 flex-shrink-0 -ml-2 opacity-45" style={{ color: accent }} />
              <span className="font-body font-semibold text-foreground ml-0.5">
                {active.label}
              </span>
            </div>

            {/* Quick stats */}
            <div className="space-y-2 mb-5">
              {[
                { label: "Duration",     value: active.duration     },
                { label: "Difficulty",   value: active.difficulty   },
                { label: "Success Rate", value: active.successRate  },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="flex justify-between items-center text-xs font-body
                    pb-2 border-b border-border/30"
                >
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className="font-semibold text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Camps list */}
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Camps &amp; Waypoints
            </p>
            <div className="space-y-2">
              {active.camps.map((camp, i) => {
                const isSummit = i === active.camps.length - 1;
                return (
                  <div key={camp.name} className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: isSummit
                          ? accent
                          : "hsl(var(--muted-foreground)/0.45)",
                      }}
                    />
                    <span
                      className="font-body text-xs flex-1"
                      style={{
                        color:      isSummit ? accent : "hsl(var(--foreground)/0.8)",
                        fontWeight: isSummit ? 600 : 400,
                      }}
                    >
                      {camp.name}
                    </span>
                    <span className="font-body text-xs text-muted-foreground tabular-nums">
                      {camp.elevation}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column: full description — aligns under the map */}
          <div className="pt-1">
            <p className="font-body text-muted-foreground leading-relaxed text-sm sm:text-base">
              {active.description}
            </p>
          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
}