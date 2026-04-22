// src/components/KilimanjaroFAQ.tsx

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const accent = "hsl(var(--terracotta))";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FAQItem {
  q: string;
  a: string | React.ReactNode;
}

interface FAQCategory {
  category: string;
  label:    string; // short label for the tab
  items:    FAQItem[];
}

// ── Data ─────────────────────────────────────────────────────────────────────

const FAQ_DATA: FAQCategory[] = [
  {
    category: "The Basics",
    label:    "The Basics",
    items: [
      {
        q: "What exactly is Mount Kilimanjaro?",
        a: "Mount Kilimanjaro is a dormant stratovolcano in north-eastern Tanzania and the highest peak in Africa at 5,895 metres (19,341 ft) above sea level. It is the tallest free-standing mountain on Earth, rising dramatically from the surrounding savanna plains near the town of Moshi. Three distinct volcanic cones make up the massif — Kibo (the highest, topped by Uhuru Peak), Mawenzi, and Shira. Despite its equatorial location, the summit is permanently glaciated, though those glaciers are retreating due to climate change.",
      },
      {
        q: "Do I need technical climbing experience?",
        a: "No. Kilimanjaro is a high-altitude trek, not a technical climb. There are no ropes, ice axes, or vertical rock faces on any of the standard routes. What it demands is physical fitness, mental resilience, and respect for altitude. If you can hike for 6–8 hours on consecutive days carrying a daypack, you are a strong candidate for the summit — with the right preparation and a route of adequate length.",
      },
      {
        q: "How challenging is the climb?",
        a: "The difficulty is almost entirely about altitude, not terrain. Summit day is the most demanding — typically 10–14 hours of trekking through freezing temperatures starting at midnight. The trail itself never exceeds a moderate hiking gradient, but at 5,895 m the air contains roughly half the oxygen found at sea level. Many climbers find the mental challenge — pushing through exhaustion and cold in the dark — harder than the physical effort. Choose a longer route, move slowly, and stay well hydrated.",
      },
      {
        q: "What is the summit success rate?",
        a: (
          <div className="space-y-4">
            <p>Success rates vary significantly by route length. Longer routes allow better acclimatisation and consistently produce higher summit rates:</p>
            <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid hsl(var(--border)/0.5)" }}>
              <table className="w-full text-xs font-body">
                <thead>
                  <tr style={{ background: "hsl(var(--muted)/0.6)", borderBottom: "1px solid hsl(var(--border)/0.4)" }}>
                    {["Route", "Duration", "Success Rate"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Marangu",           "5–6 days", "50–65%"],
                    ["Machame",           "6–7 days", "75–80%"],
                    ["Rongai",            "6–7 days", "70–79%"],
                    ["Lemosho",           "7–8 days", "85–90%"],
                    ["Northern Circuit",  "8–9 days", "90%+"],
                  ].map(([route, dur, rate], i) => (
                    <tr key={route} style={{
                      borderBottom: "1px solid hsl(var(--border)/0.3)",
                      background: i % 2 === 0 ? "transparent" : "hsl(var(--muted)/0.12)",
                    }}>
                      <td className="px-4 py-2.5 font-semibold text-foreground">{route}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{dur}</td>
                      <td className="px-4 py-2.5 font-semibold" style={{ color: accent }}>{rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground">Well-prepared climbers on 7+ day routes with a reputable operator consistently summit at rates above 85%.</p>
          </div>
        ),
      },
    ],
  },
  {
    category: "Planning & Timing",
    label:    "Planning",
    items: [
      {
        q: "When is the best time to climb Kilimanjaro?",
        a: (
          <div className="space-y-4">
            <p>There are two main climbing seasons:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { period: "January – March", label: "Secondary Season", desc: "Quieter trails, cooler temperatures, higher chance of snow near the summit. An excellent choice for those seeking a less crowded experience." },
                { period: "June – October",  label: "Peak Season",      desc: "Clear skies, dry conditions, best summit visibility. Trails are busier — book several months in advance. The most popular climbing window." },
              ].map(s => (
                <div key={s.period} className="p-4 rounded-xl"
                  style={{ background: "hsl(var(--muted)/0.35)", border: "1px solid hsl(var(--border)/0.4)" }}>
                  <p className="font-semibold text-foreground text-sm mb-1">{s.period}</p>
                  <p className="text-xs font-medium mb-2" style={{ color: accent }}>{s.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <p>Avoid April–May (long rains) and November (short rains). Trails become slippery, visibility is poor, and conditions are significantly harder.</p>
          </div>
        ),
      },
      {
        q: "How many days does the climb take?",
        a: "Standard routes range from 5 to 9 days on the mountain. The minimum responsible duration is 6 days — anything shorter dramatically reduces acclimatisation time and summit success rates. We strongly recommend 7–8 days for most climbers. The additional days represent a modest increase in cost, but the improvement in acclimatisation profile — and the probability of reaching Uhuru Peak — is substantial.",
      },
      {
        q: "Is there a minimum or maximum age to climb?",
        a: "TANAPA (Tanzania National Parks) sets the minimum age at 10 years old. Climbers aged 10–15 must provide written parental consent and a medical clearance letter. There is no official upper age limit — the oldest person to summit was in their late 80s. What matters is cardiovascular fitness, not age. We recommend a thorough medical check-up with a GP for any climber under 16 or over 60.",
      },
      {
        q: "How far in advance should I book?",
        a: "For peak seasons (January–March and June–October), we recommend booking at least 3–6 months in advance, particularly for groups of four or more. Off-season climbs can usually be arranged with 6–8 weeks' notice. Combined Kilimanjaro and safari itineraries require the most lead time. Early booking also gives you adequate time for physical training and gear preparation.",
      },
    ],
  },
  {
    category: "Health, Safety & Altitude",
    label:    "Health & Safety",
    items: [
      {
        q: "What is altitude sickness and how do I prevent it?",
        a: (
          <div className="space-y-4">
            <p>Acute Mountain Sickness (AMS) occurs when you ascend faster than your body can adapt to reduced oxygen. Symptoms include headache, nausea, dizziness, fatigue, and disrupted sleep. Mild symptoms above 3,500 m are common and manageable. Prevention strategies include:</p>
            <ul className="space-y-2">
              {[
                "Choose a longer route (7–9 days) — this is the single most effective factor",
                "Walk slowly at all times — 'pole pole' (slowly in Swahili) is the Kilimanjaro mantra",
                "Drink 3–4 litres of water per day on the mountain",
                "Follow the 'climb high, sleep low' principle — your guide manages this automatically",
                "Avoid alcohol and sleeping pills at altitude",
                "Consult your doctor about Diamox (acetazolamide) before your trip",
                "Report any symptoms immediately to your guide — never conceal how you feel",
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground list-none">
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">In severe cases — HACE (cerebral oedema) or HAPE (pulmonary oedema) — immediate descent is the only effective treatment. Our guides carry emergency oxygen and pulse oximeters and are trained to recognise and act on deteriorating symptoms.</p>
          </div>
        ),
      },
      {
        q: "How safe is Kilimanjaro?",
        a: "Kilimanjaro is safe when climbed with certified guides and a reputable operator. Statistically, very few fatalities occur relative to the tens of thousands who attempt it each year — and the vast majority of serious incidents involve climbers who rushed, concealed symptoms, or used unregulated operators. Our guides are KINAPA-licensed, trained in first aid and altitude response, and carry emergency oxygen on every climb.",
      },
      {
        q: "Should I take Diamox (acetazolamide)?",
        a: "Diamox is a prescription medication that accelerates acclimatisation by stimulating faster breathing. It is widely used on Kilimanjaro and reduces AMS symptoms for many climbers. It does carry side effects — including tingling in the extremities and increased urination — and is contraindicated for certain conditions and sulfa drug allergies. We recommend discussing it with your GP before your trip. It is not mandatory, but worth considering, especially on shorter routes.",
      },
      {
        q: "What travel insurance do I need?",
        a: "Travel insurance is non-negotiable for Kilimanjaro. Your policy must explicitly cover high-altitude trekking above 5,000 m and helicopter evacuation. Standard travel insurance almost never includes this coverage. Without it, an evacuation can cost $20,000–$50,000. Check your policy carefully and carry proof of coverage on the mountain.",
      },
    ],
  },
  {
    category: "Costs & What's Included",
    label:    "Costs",
    items: [
      {
        q: "How much does a Kilimanjaro climb cost?",
        a: (
          <div className="space-y-4">
            <p>A quality 6–8 day guided climb with a reputable operator typically costs $1,800–$3,500 per person, depending on route, group size, and accommodation level. A typical cost breakdown:</p>
            <div className="space-y-1.5">
              {[
                { item: "TANAPA park and conservation fees", range: "$800 – $1,200" },
                { item: "Guides, porters, and cook",         range: "$400 – $700"   },
                { item: "Food and camping equipment",        range: "$300 – $500"   },
                { item: "Hotel and transfers",               range: "$150 – $400"   },
                { item: "Recommended tips for crew",         range: "$250 – $400"   },
              ].map(row => (
                <div key={row.item}
                  className="flex justify-between items-center text-sm py-2 border-b border-border/30">
                  <span className="text-muted-foreground">{row.item}</span>
                  <span className="font-semibold text-foreground tabular-nums">{row.range}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Operators charging under $1,500 often reduce park fees, porter welfare provisions, or safety equipment. If a price appears unusually low, ask precisely what is included.</p>
          </div>
        ),
      },
      {
        q: "What is included in your packages?",
        a: (
          <div className="space-y-4">
            {[
              {
                label: "Included",
                color: "#16a34a",
                items: [
                  "All TANAPA park, camping, and rescue fees",
                  "KINAPA-licensed lead guide and assistant guides",
                  "Porters (maximum 15 kg per porter, per TANAPA regulations)",
                  "Cook and full-board meals on the mountain",
                  "Camping equipment or hut accommodation (Marangu route)",
                  "Emergency oxygen, pulse oximeter, and first aid kit",
                  "Airport and hotel transfers in Moshi/Arusha",
                  "Summit certificate",
                ],
              },
              {
                label: "Not Included",
                color: accent,
                items: [
                  "International flights to and from Tanzania",
                  "Tanzania visa fees",
                  "Travel insurance (mandatory — must cover 5,895 m and helicopter evacuation)",
                  "Personal trekking gear",
                  "Tips for guides, porters, and cook (~$250–400 per person recommended)",
                  "Pre- and post-climb hotel accommodation",
                ],
              },
            ].map(section => (
              <div key={section.label}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: section.color }}>
                  {section.label}
                </p>
                <ul className="space-y-1.5">
                  {section.items.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground list-none">
                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: section.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ),
      },
      {
        q: "How much should I tip the crew?",
        a: "Tips are a critical component of guide and porter income in Tanzania. The standard recommendation is $250–$400 per climber for the full crew, distributed at the end of the climb. A common per-day breakdown: Lead Guide $20–25 · Assistant Guide $15 · Cook $10–15 · Porter $8–10. Tips are pooled and distributed by the lead guide. We provide a tipping guide and envelope with every booking.",
      },
      {
        q: "Can I rent gear locally?",
        a: "Yes. Reliable rental shops in Moshi and Arusha offer trekking poles, sleeping bags, gaiters, down jackets, and duffel bags at reasonable rates. This is a practical approach for items you may only need once. We do recommend owning your own hiking boots — rented boots rarely fit correctly, and blisters are among the most common reasons climbers struggle on the mountain. We can provide a list of trusted rental shops in Moshi on request.",
      },
    ],
  },
  {
    category: "Packing & Gear",
    label:    "Gear",
    items: [
      {
        q: "What should I pack for Kilimanjaro?",
        a: (
          <div className="space-y-4">
            <p>You will pass through five distinct ecological zones — from tropical rainforest to the arctic summit. Temperatures range from +25°C at the gate to -15°C at the crater rim. The key principle is layering, not bulk.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { cat: "Clothing", items: ["Moisture-wicking base layer, top and bottom", "Fleece mid-layer", "Down or synthetic insulated jacket", "Waterproof shell jacket and trousers", "Warm hat, gloves, and neck gaiter", "Gaiters (for summit night snow)"] },
                { cat: "Footwear", items: ["Waterproof hiking boots — broken in before the climb", "Warm hiking socks, 4–5 pairs", "Camp sandals or lightweight shoes", "Trekking poles — strongly recommended"] },
                { cat: "Essentials", items: ["Headlamp and spare batteries (summit starts at midnight)", "Sunglasses with 100% UV protection", "SPF 50+ sunscreen and lip balm", "30–40L daypack with rain cover", "Hydration system or two 1L water bottles", "Personal first aid kit including blister treatment"] },
                { cat: "Summit Night", items: ["Hand and toe warmers — strongly recommended", "Thermos of hot water from camp", "High-energy snacks: gels, chocolate, nuts", "Keep phone and camera inside clothing — cold kills batteries"] },
              ].map(section => (
                <div key={section.cat} className="p-4 rounded-xl"
                  style={{ background: "hsl(var(--muted)/0.3)", border: "1px solid hsl(var(--border)/0.4)" }}>
                  <p className="font-semibold text-foreground text-xs uppercase tracking-widest mb-2.5"
                    style={{ color: accent }}>{section.cat}</p>
                  <ul className="space-y-1.5">
                    {section.items.map(item => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-muted-foreground list-none">
                        <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-muted-foreground/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        q: "What is the porter weight limit?",
        a: "TANAPA regulations and ethical porter guidelines limit total porter loads to 20 kg. Your duffel bag should therefore weigh no more than 15 kg — the porter carries their own food and personal kit in the remaining 5 kg. We enforce this strictly. Overloaded porters are slower, more prone to injury, and the practice is contrary to our standards of porter welfare. Pack to 12–15 kg for your duffel. Your daypack, which you carry yourself, should hold everything needed for each day's trekking.",
      },
    ],
  },
  {
    category: "On the Mountain",
    label:    "On the Mountain",
    items: [
      {
        q: "What is the food like on the mountain?",
        a: "Your cook prepares three hot meals per day. Expect hearty, calorie-dense food: porridge, eggs, chapati, pasta, rice, stews, soups, and fresh fruit where logistics allow. Vegetarian and other dietary requirements can be accommodated with advance notice. Drinking water is purified at each camp. You are responsible for snacks and energy foods during the day's hiking.",
      },
      {
        q: "What are the toilet facilities like?",
        a: "On the Marangu Route, each hut camp has permanent toilet blocks. On camping routes (Machame, Lemosho, Rongai, etc.), there are basic long-drop pit latrines at most camps. Our Standard Full Package includes a portable private toilet tent at every campsite — a significant comfort upgrade that the majority of our clients consider well worth it.",
      },
      {
        q: "Can I charge devices on the mountain?",
        a: "There are no power sockets on any route. Bring a fully charged power bank — 20,000+ mAh is recommended — for your phone, camera, and headlamp batteries. Cold temperatures drain batteries rapidly at altitude. Keep all electronics inside your sleeping bag at night and your jacket during the day.",
      },
      {
        q: "Is there mobile signal on Kilimanjaro?",
        a: "Tanzanian networks (Vodacom, Airtel) provide reasonable coverage across much of the mountain, including at high camps on the popular routes. Signal becomes unreliable above 4,500 m and is absent on summit night. Do not rely on a phone signal for emergencies — your guide carries a radio and maintains contact with the base throughout the climb.",
      },
      {
        q: "What happens if I cannot make the summit?",
        a: "Not every climber reaches Uhuru Peak — and that is an accepted reality of high-altitude trekking. If altitude sickness becomes dangerous or you are too exhausted to continue safely, your guide will make the decision to descend. Your health is the absolute priority. Climbers who reach Stella Point (5,739 m) receive a Stella Point certificate. You will descend at a controlled pace and recover quickly at lower altitude.",
      },
    ],
  },
];

// ── Accordion Item ────────────────────────────────────────────────────────────

function AccordionItem({ item, isOpen, onToggle }: {
  item:     FAQItem;
  isOpen:   boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="overflow-hidden transition-all duration-200"
      style={{
        borderBottom: "1px solid hsl(var(--border)/0.4)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-4 text-left
          transition-colors duration-150 group"
      >
        <span
          className="font-body text-sm leading-snug transition-colors duration-150"
          style={{
            color:      isOpen ? "hsl(var(--foreground))" : "hsl(var(--foreground)/0.8)",
            fontWeight: isOpen ? 600 : 500,
          }}
        >
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown
            className="w-4 h-4 transition-colors duration-150"
            style={{ color: isOpen ? accent : "hsl(var(--muted-foreground)/0.6)" }}
          />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-5 font-body text-sm text-muted-foreground leading-relaxed">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function KilimanjaroFAQ() {
  const [activeCategory, setActiveCategory] = useState<string>(FAQ_DATA[0].category);
  const [openIndex, setOpenIndex]           = useState<number | null>(0);

  const currentCategory = FAQ_DATA.find(c => c.category === activeCategory)!;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setOpenIndex(0);
  };

  return (
    <section className="mb-16">

      {/* Header */}
      <p className="text-xs tracking-[0.2em] uppercase font-body mb-2" style={{ color: accent }}>
        Frequently Asked Questions
      </p>
      <h2 className="font-display text-2xl text-foreground mb-2"
        style={{ fontFamily: '"Yeseva One", serif' }}>
        Kilimanjaro — Everything You Need to Know
      </h2>
      <p className="font-body text-sm text-muted-foreground mb-10 max-w-2xl leading-relaxed">
        Answers to the questions we hear most often from climbers planning their Kilimanjaro journey.
        Select a category to find the information most relevant to your preparation.
      </p>

      {/* Category nav — horizontal pill tabs */}
      <div
        className="flex flex-wrap gap-x-0 gap-y-0 mb-10 rounded-xl overflow-hidden"
        style={{ border: "1px solid hsl(var(--border)/0.5)", background: "hsl(var(--muted)/0.25)" }}
        role="tablist"
      >
        {FAQ_DATA.map((cat, i) => {
          const isActive = cat.category === activeCategory;
          const isLast   = i === FAQ_DATA.length - 1;
          return (
            <button
              key={cat.category}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleCategoryChange(cat.category)}
              className="relative flex-1 min-w-[120px] px-4 py-3 font-body text-xs font-medium
                transition-all duration-200 text-center whitespace-nowrap"
              style={{
                color:       isActive ? "#fff"                         : "hsl(var(--foreground)/0.6)",
                background:  isActive ? accent                         : "transparent",
                borderRight: !isLast ? "1px solid hsl(var(--border)/0.4)" : "none",
                fontWeight:  isActive ? 600 : 400,
                letterSpacing: "0.04em",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* FAQ items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          style={{ borderTop: "1px solid hsl(var(--border)/0.4)" }}
        >
          {currentCategory.items.map((item, i) => (
            <AccordionItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Footer CTA */}
      <div
        className="mt-10 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center
          justify-between gap-5"
        style={{ background: "hsl(var(--muted)/0.3)", border: "1px solid hsl(var(--border)/0.5)" }}
      >
        <div>
          <p className="font-body font-semibold text-foreground text-sm mb-1">
            Have a question we haven't answered?
          </p>
          <p className="font-body text-xs text-muted-foreground leading-relaxed">
            Our Kilimanjaro specialists are available to advise — with no obligation to book.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
          <a
            href="https://wa.me/255623880844"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs
              font-semibold uppercase tracking-widest transition-all duration-200"
            style={{ background: "#25D366", color: "#fff" }}
          >
            WhatsApp
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-xs
              font-semibold uppercase tracking-widest border transition-all duration-200
              hover:border-primary/40 hover:text-foreground"
            style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground)/0.75)" }}
          >
            Send a Message
          </a>
        </div>
      </div>

    </section>
  );
}