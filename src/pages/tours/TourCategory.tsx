import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Clock, ArrowRight, ArrowLeft, Check, ChevronDown,
  Car, Users, Fuel, Shield, Wifi, Tent, Map, Phone,
  Mountain, DollarSign, Package, Backpack, AlertTriangle,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { publicApi } from "@/lib/api";

//       
// TYPES
//       

interface Tour {
  id: number; slug: string; title: string; destination: string;
  type: string; duration_days: number; price: number; currency: string;
  images: any[] | null; excerpt: string | null; tags: string[] | null;
}

type TabId = string;

//       
// SHARED PRIMITIVES
//       

const SectionTitle = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => (
  <div className="mb-10">
    {eyebrow && (
      <p className="text-xs tracking-[0.28em] uppercase font-body mb-3" style={{ color: "hsl(var(--primary))" }}>
        {eyebrow}
      </p>
    )}
    <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3"
      style={{ fontFamily: '"Yeseva One", serif' }}>
      {title}
    </h2>
    {subtitle && <p className="font-body text-muted-foreground max-w-xl leading-relaxed">{subtitle}</p>}
  </div>
);

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-2xl ${className}`} style={{ background: "hsl(var(--muted)/0.6)" }} />
);

//       
// TOUR CARD (shared)
//       

const TourCard = ({ tour, i, accent }: { tour: Tour; i: number; accent: string }) => {
  const imgUrl = (() => {
    const first = tour.images?.[0];
    if (!first) return "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800";
    return typeof first === "string" ? first : first?.url ?? "";
  })();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.07 }}
      className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
      style={{ borderColor: "hsl(var(--border)/0.6)", background: "hsl(var(--background))" }}>
      <div className="relative overflow-hidden h-52">
        <img src={imgUrl} alt={tour.title} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs font-body text-white/90">
          <Clock className="w-3 h-3" />{tour.duration_days} days
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center gap-1.5 text-xs font-body" style={{ color: accent }}>
          <MapPin className="w-3 h-3" />{tour.destination}
        </div>
        <h3 className="font-display text-lg text-foreground leading-snug"
          style={{ fontFamily: '"Yeseva One", serif' }}>{tour.title}</h3>
        {tour.excerpt && (
          <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">{tour.excerpt}</p>
        )}
        {(tour.tags ?? []).length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {(tour.tags ?? []).slice(0, 3).map(tag => (
              <span key={tag} className="text-xs font-body px-2.5 py-1 rounded-full"
                style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>{tag}</span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 mt-auto"
          style={{ borderTop: "1px solid hsl(var(--border)/0.5)" }}>
          <div>
            <p className="text-xs font-body text-muted-foreground">From</p>
            <p className="font-display text-xl font-bold text-foreground">
              {tour.currency} {tour.price.toLocaleString()}
              <span className="text-xs font-body font-normal text-muted-foreground ml-1">/ person</span>
            </p>
          </div>
          <Link to={`/quote?tour=${tour.slug}`}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-body font-semibold tracking-widest uppercase transition-all duration-200"
            style={{ background: accent, color: "hsl(var(--dark))" }}>
            Book Now <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const ToursGrid = ({ tours, loading, accent, categoryTitle }: {
  tours: Tour[]; loading: boolean; accent: string; categoryTitle: string;
}) => (
  <div>
    {loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-80" />)}
      </div>
    ) : tours.length === 0 ? (
      <div className="text-center py-20 rounded-2xl" style={{ background: "hsl(var(--muted)/0.2)", border: "1px solid hsl(var(--border)/0.4)" }}>
        <p className="font-display text-2xl text-foreground mb-3" style={{ fontFamily: '"Yeseva One", serif' }}>
          No {categoryTitle.toLowerCase()} yet
        </p>
        <p className="font-body text-muted-foreground mb-8">Check back soon — we're adding new packages regularly.</p>
        <Link to="/quote"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-body font-semibold tracking-widest uppercase"
          style={{ background: accent, color: "hsl(var(--dark))" }}>
          Request Custom Safari <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {tours.map((tour, i) => <TourCard key={tour.id} tour={tour} i={i} accent={accent} />)}
      </div>
    )}
  </div>
);

//       
// MOUNTAIN PAGE SECTIONS
//       

const KiliPriceTable = () => {
  const routes = [
    { name: "Marangu Route",  days: "5–6",  price: 2100, difficulty: "Moderate",  success: "65%"  },
    { name: "Machame Route",  days: "6–7",  price: 2450, difficulty: "Challenging", success: "85%" },
    { name: "Lemosho Route",  days: "7–8",  price: 2750, difficulty: "Challenging", success: "90%" },
    { name: "Rongai Route",   days: "6–7",  price: 2350, difficulty: "Moderate",   success: "80%" },
    { name: "Northern Circuit",days: "9",   price: 3200, difficulty: "Challenging", success: "95%" },
  ];

  return (
    <div>
      <SectionTitle
        eyebrow="Pricing & Routes"
        title="Kilimanjaro Trek Prices"
        subtitle="All prices per person, include park fees, guides, porters, meals and accommodation on the mountain."
      />
      <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid hsl(var(--border)/0.6)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "hsl(var(--muted)/0.5)", borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
              {["Route", "Duration", "From (USD)", "Difficulty", "Success Rate"].map(h => (
                <th key={h} className="text-left px-5 py-4 text-xs font-body uppercase tracking-widest"
                  style={{ color: "hsl(var(--muted-foreground))" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {routes.map((r, i) => (
              <motion.tr key={r.name}
                initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group transition-colors"
                style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}
                onMouseEnter={e => e.currentTarget.style.background = "hsl(var(--muted)/0.3)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td className="px-5 py-4 font-body text-sm font-semibold text-foreground">{r.name}</td>
                <td className="px-5 py-4 font-body text-sm text-muted-foreground">{r.days} days</td>
                <td className="px-5 py-4">
                  <span className="font-display text-lg font-bold text-foreground">${r.price.toLocaleString()}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs font-body px-2.5 py-1 rounded-full"
                    style={{
                      background: r.difficulty === "Moderate" ? "hsl(var(--olive)/0.14)" : "hsl(var(--terracotta)/0.14)",
                      color: r.difficulty === "Moderate" ? "hsl(var(--olive))" : "hsl(var(--terracotta))",
                    }}>
                    {r.difficulty}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden max-w-[80px]"
                      style={{ background: "hsl(var(--muted))" }}>
                      <div className="h-full rounded-full" style={{
                        width: r.success,
                        background: "hsl(var(--primary))",
                      }} />
                    </div>
                    <span className="text-xs font-body font-semibold text-foreground">{r.success}</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs font-body text-muted-foreground mt-4">
        * Prices are indicative and subject to group size and season. <Link to="/quote" className="underline" style={{ color: "hsl(var(--primary))" }}>Get a personalised quote →</Link>
      </p>
    </div>
  );
};

const ParkFeesSection = () => {
  const fees = [
    { category: "Conservation Fee",        perDay: 70,   notes: "Per person per day on all routes" },
    { category: "Camping Fee (public)",     perDay: 50,   notes: "Marangu uses huts — $60/night" },
    { category: "Rescue Fee",              perDay: 20,   notes: "Mandatory for all climbers" },
    { category: "Guide Fee (KINAPA)",      perDay: 25,   notes: "Per climbing day" },
    { category: "Porter Fee (KINAPA)",     perDay: 15,   notes: "Per porter per day" },
    { category: "Summit Certificate",      perDay: null, notes: "$100 one-time fee at summit" },
  ];

  return (
    <div>
      <SectionTitle
        eyebrow="Park Fees"
        title="Kilimanjaro National Park Fees"
        subtitle="All TANAPA fees are included in your Native Kilimanjaro package price. Listed here for full transparency."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fees.map((fee, i) => (
          <motion.div key={fee.category}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="flex items-start gap-4 p-5 rounded-2xl"
            style={{ background: "hsl(var(--muted)/0.3)", border: "1px solid hsl(var(--border)/0.5)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "hsl(var(--primary)/0.1)" }}>
              <DollarSign className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
            </div>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-foreground mb-0.5">{fee.category}</p>
              <p className="font-body text-xs text-muted-foreground">{fee.notes}</p>
            </div>
            {fee.perDay && (
              <p className="font-display text-lg font-bold text-foreground flex-shrink-0">
                ${fee.perDay}<span className="text-xs font-body font-normal text-muted-foreground">/day</span>
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TrekkingPreparations = () => {
  const sections = [
    {
      title: "Physical Preparation",
      icon: Mountain,
      color: "hsl(var(--olive-light))",
      items: [
        "Start training 3–6 months before your climb",
        "Build cardiovascular endurance — running, cycling, swimming",
        "Do regular hikes with a loaded pack (10–15kg)",
        "Train on stairs or inclines to simulate altitude gain",
        "Practice day hikes of 6–8 hours to build stamina",
      ],
    },
    {
      title: "Altitude & Acclimatisation",
      icon: AlertTriangle,
      color: "hsl(var(--terracotta))",
      items: [
        "Choose a longer route (7–9 days) for better acclimatisation",
        "Follow the 'climb high, sleep low' principle",
        "Stay hydrated — drink 3–4 litres of water daily",
        "Avoid alcohol and sleeping pills at altitude",
        "Consult your doctor about Diamox (acetazolamide)",
      ],
    },
    {
      title: "Medical Preparation",
      icon: Shield,
      color: "hsl(var(--olive))",
      items: [
        "Get a full medical check-up before your climb",
        "Ensure travel insurance covers high-altitude evacuation",
        "Carry a basic first aid kit including blister treatment",
        "Bring personal medications plus extras for emergencies",
        "Know the symptoms of AMS, HACE, and HAPE",
      ],
    },
  ];

  return (
    <div>
      <SectionTitle
        eyebrow="How to Prepare"
        title="Trekking Preparations"
        subtitle="Kilimanjaro is achievable for fit, well-prepared trekkers. Here's how to give yourself the best chance of reaching Uhuru Peak."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((sec, i) => (
          <motion.div key={sec.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-6"
            style={{ background: "hsl(var(--muted)/0.3)", border: "1px solid hsl(var(--border)/0.5)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${sec.color}18` }}>
              <sec.icon className="w-5 h-5" style={{ color: sec.color }} />
            </div>
            <h3 className="font-body font-semibold text-foreground mb-4">{sec.title}</h3>
            <ul className="space-y-2.5">
              {sec.items.map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: sec.color }} />
                  <span className="font-body text-sm text-muted-foreground leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

//       
// CAR RENTAL PAGE SECTIONS
//       

const FleetSection = () => {
  const vehicles = [
    {
      name: "Toyota Land Cruiser 78",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
      seats: 7, fuel: "Diesel", drive: "4WD",
      features: ["Rooftop tent", "Recovery gear", "Fridge/cooler", "GPS navigation", "First aid kit"],
      priceDay: 180,
      badge: "Most Popular",
      badgeColor: "hsl(var(--primary))",
    },
    {
      name: "Toyota Land Cruiser 200",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
      seats: 8, fuel: "Diesel", drive: "4WD",
      features: ["Air conditioning", "Rooftop tent", "Fridge/cooler", "GPS navigation", "Camping kit"],
      priceDay: 220,
      badge: "Premium",
      badgeColor: "hsl(var(--terracotta-light))",
    },
    {
      name: "Toyota Hilux Double Cab",
      image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800",
      seats: 5, fuel: "Diesel", drive: "4WD",
      features: ["Canopy", "Load bed", "Recovery gear", "GPS navigation", "Spare tyre"],
      priceDay: 140,
      badge: "Budget Friendly",
      badgeColor: "hsl(var(--olive))",
    },
  ];

  return (
    <div>
      <SectionTitle
        eyebrow="Our Fleet"
        title="Well-Equipped 4WD Vehicles"
        subtitle="Every vehicle is serviced before departure, GPS-equipped, comprehensively insured, and stocked with everything you need for a self-drive safari."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((v, i) => (
          <motion.div key={v.name}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden group"
            style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--background))" }}>
            <div className="relative h-48 overflow-hidden">
              <img src={v.image} alt={v.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute top-3 left-3 text-xs font-body px-2.5 py-1 rounded-full font-semibold"
                style={{ background: v.badgeColor, color: "hsl(var(--dark))" }}>
                {v.badge}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-body font-semibold text-foreground mb-3">{v.name}</h3>
              <div className="flex items-center gap-4 mb-4 text-xs font-body text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {v.seats} seats</span>
                <span className="flex items-center gap-1"><Fuel className="w-3 h-3" /> {v.fuel}</span>
                <span className="flex items-center gap-1"><Car className="w-3 h-3" /> {v.drive}</span>
              </div>
              <ul className="space-y-1.5 mb-5">
                {v.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs font-body text-muted-foreground">
                    <Check className="w-3 h-3 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid hsl(var(--border)/0.5)" }}>
                <div>
                  <p className="text-xs font-body text-muted-foreground">From</p>
                  <p className="font-display text-xl font-bold text-foreground">
                    ${v.priceDay}<span className="text-xs font-body font-normal text-muted-foreground ml-1">/day</span>
                  </p>
                </div>
                <Link to="/quote"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wider uppercase transition-all duration-200"
                  style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
                  Enquire <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const WhatIsIncluded = () => {
  const included = [
    { icon: Shield,  color: "hsl(var(--olive))",   title: "Full Insurance",        desc: "Comprehensive vehicle insurance covering collision, theft, and third-party liability." },
    { icon: Map,     color: "hsl(var(--primary))", title: "GPS + Offline Maps",    desc: "Pre-loaded GPS device with offline maps for all national parks and routes." },
    { icon: Tent,    color: "hsl(var(--terracotta-light))",    title: "Camping Equipment",     desc: "Rooftop tent, sleeping bags, cooking stove, utensils, and a 40L cooler box." },
    { icon: Wifi,    color: "hsl(var(--terracotta))",     title: "24/7 Support Line",     desc: "Direct line to our team for emergencies, route advice, and mechanical support." },
    { icon: Package, color: "hsl(var(--primary))", title: "Recovery Gear",         desc: "Hi-lift jack, sand boards, tow rope, and shovel — all essentials for off-road driving." },
    { icon: Phone,   color: "hsl(var(--olive))",    title: "Detailed Roadbook",     desc: "Printed and digital itinerary with GPS waypoints, park fees, and camp locations." },
  ];

  return (
    <div>
      <SectionTitle
        eyebrow="What You Get"
        title="Everything Included"
        subtitle="Every rental includes the essentials for a safe, comfortable self-drive safari. No hidden extras."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {included.map((item, i) => (
          <motion.div key={item.title}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            className="flex items-start gap-4 p-5 rounded-2xl"
            style={{ background: "hsl(var(--muted)/0.3)", border: "1px solid hsl(var(--border)/0.5)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${item.color}18` }}>
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-foreground mb-1">{item.title}</p>
              <p className="font-body text-xs text-muted-foreground leading-snug">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const RentalPricing = () => {
  const tiers = [
    { duration: "1–3 days",   land78: 180, land200: 220, hilux: 140 },
    { duration: "4–7 days",   land78: 165, land200: 200, hilux: 125 },
    { duration: "8–14 days",  land78: 150, land200: 185, hilux: 115 },
    { duration: "15+ days",   land78: 135, land200: 165, hilux: 100 },
  ];

  return (
    <div>
      <SectionTitle
        eyebrow="Pricing"
        title="Rental Rates"
        subtitle="All rates per vehicle per day in USD. Longer rentals get better rates. Airport transfers, fuel, and park fees are additional."
      />
      <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid hsl(var(--border)/0.6)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "hsl(var(--muted)/0.5)", borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
              {["Duration", "Land Cruiser 78", "Land Cruiser 200", "Hilux Double Cab"].map(h => (
                <th key={h} className="text-left px-5 py-4 text-xs font-body uppercase tracking-widest"
                  style={{ color: "hsl(var(--muted-foreground))" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier, i) => (
              <tr key={tier.duration}
                className="transition-colors"
                style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}
                onMouseEnter={e => e.currentTarget.style.background = "hsl(var(--muted)/0.3)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td className="px-5 py-4 font-body text-sm font-semibold text-foreground">{tier.duration}</td>
                {[tier.land78, tier.land200, tier.hilux].map((price, j) => (
                  <td key={j} className="px-5 py-4">
                    <span className="font-display text-lg font-bold text-foreground">${price}</span>
                    <span className="font-body text-xs text-muted-foreground ml-1">/day</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {["Prices exclude fuel and park fees", "Airport pickup available (+$50)", "Driver/guide option available on request"].map(note => (
          <span key={note} className="flex items-center gap-1.5 text-xs font-body px-3 py-1.5 rounded-full"
            style={{ background: "hsl(var(--muted)/0.5)", color: "hsl(var(--muted-foreground))" }}>
            <AlertTriangle className="w-3 h-3" />{note}
          </span>
        ))}
      </div>
    </div>
  );
};

//       
// CATEGORY CONFIG
//       

interface TabDef { id: TabId; label: string; }

interface CategoryConfig {
  type:         string;
  title:        string;
  tagline:      string;
  description:  string;
  heroImage:    string;
  heroAlt:      string;
  accentColor:  string;
  tabs:         TabDef[];
  renderTab:    (tabId: TabId, tours: Tour[], loading: boolean) => React.ReactNode;
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  guided: {
    type: "GUIDED",
    title: "Guided Safaris",
    tagline: "Expert guides. Unforgettable wildlife encounters.",
    description: "Our expert-led guided safaris place you in the hands of seasoned bush guides who know the land intimately. From the Great Migration on the Serengeti plains to gorilla trekking in Bwindi, every moment is curated for depth, discovery, and wonder.",
    heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600",
    heroAlt: "Guided safari vehicle in the Serengeti",
    accentColor: "hsl(var(--primary))",
    tabs: [
      { id: "packages", label: "Safari Packages" },
    ],
    renderTab: (_, tours, loading) => (
      <ToursGrid tours={tours} loading={loading} accent="hsl(var(--primary))" categoryTitle="Guided Safaris" />
    ),
  },

  "self-drive": {
    type: "SELF_DRIVE",
    title: "Self-Drive Safaris",
    tagline: "Your pace. Your path. Pure freedom.",
    description: "Take the wheel and write your own adventure. With a well-equipped 4WD, detailed route maps and 24/7 support, you have all the freedom of the wild with none of the worry.",
    heroImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600",
    heroAlt: "4WD vehicle on open African plains",
    accentColor: "hsl(var(--olive))",
    tabs: [
      { id: "packages", label: "Self-Drive Packages" },
    ],
    renderTab: (_, tours, loading) => (
      <ToursGrid tours={tours} loading={loading} accent="hsl(var(--olive))" categoryTitle="Self-Drive Safaris" />
    ),
  },

  mountain: {
    type: "MOUNTAIN",
    title: "Mountain Expeditions",
    tagline: "Summit Africa. Stand above the clouds.",
    description: "Conquer Kilimanjaro — Africa's highest peak — with certified guides, carefully acclimatised itineraries, and full equipment support. Your summit, your story.",
    heroImage: "https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=1600",
    heroAlt: "Kilimanjaro summit above the clouds",
    accentColor: "hsl(var(--terracotta))",
    tabs: [
      { id: "packages",     label: "Trekking Packages"  },
      { id: "prices",       label: "Trek Prices"         },
      { id: "park-fees",    label: "Park Fees"           },
      { id: "preparations", label: "Preparations"        },
    ],
    renderTab: (tabId, tours, loading) => {
      if (tabId === "packages")     return <ToursGrid tours={tours} loading={loading} accent="hsl(var(--terracotta))" categoryTitle="Mountain Expeditions" />;
      if (tabId === "prices")       return <KiliPriceTable />;
      if (tabId === "park-fees")    return <ParkFeesSection />;
      if (tabId === "preparations") return <TrekkingPreparations />;
      return null;
    },
  },

  beach: {
    type: "BEACH",
    title: "Beach Holidays",
    tagline: "Zanzibar. Pemba. Mafia. Pure paradise.",
    description: "Let the Indian Ocean wash the dust of the savannah away. White-sand shores, coral reef snorkelling, and the spice-scented charm of Zanzibar's Stone Town.",
    heroImage: "https://images.unsplash.com/photo-1504945005722-33670dcaf685?w=1600",
    heroAlt: "Zanzibar beach at sunset",
    accentColor: "hsl(var(--terracotta-light))",
    tabs: [
      { id: "packages", label: "Beach Packages" },
    ],
    renderTab: (_, tours, loading) => (
      <ToursGrid tours={tours} loading={loading} accent="hsl(var(--terracotta-light))" categoryTitle="Beach Holidays" />
    ),
  },

  "car-rental": {
    type: "CAR_RENTAL",
    title: "Car Rental",
    tagline: "Reliable 4WDs. Ready when you are.",
    description: "Whether you need a rugged Land Cruiser for a self-organised safari or a comfortable vehicle for city transfers, our well-maintained fleet is available with or without a driver.",
    heroImage: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1600",
    heroAlt: "4WD Land Cruiser on safari track",
    accentColor: "hsl(var(--primary))",
    tabs: [
      { id: "fleet",    label: "Our Fleet"           },
      { id: "included", label: "What's Included"     },
      { id: "pricing",  label: "Rental Rates"        },
      { id: "packages", label: "Self-Drive Packages" },
    ],
    renderTab: (tabId, tours, loading) => {
      if (tabId === "fleet")    return <FleetSection />;
      if (tabId === "included") return <WhatIsIncluded />;
      if (tabId === "pricing")  return <RentalPricing />;
      if (tabId === "packages") return <ToursGrid tours={tours} loading={loading} accent="hsl(var(--primary))" categoryTitle="Car Rental Packages" />;
      return null;
    },
  },
};

//       
// PAGE
//       

const TourCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const config = category ? CATEGORY_CONFIG[category] : null;

  const [tours,      setTours]      = useState<Tour[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [activeTab,  setActiveTab]  = useState<TabId>("");
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!config) return;
    setActiveTab(config.tabs[0]?.id ?? "");
    publicApi.getTours()
      .then((data: any) => setTours((data as Tour[]).filter(t => t.type === config.type)))
      .catch(() => setTours([]))
      .finally(() => setLoading(false));
  }, [category]);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    // Smooth scroll to content
    setTimeout(() => {
      tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  if (!config) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4"
          style={{ paddingTop: "var(--nav-total-h, 64px)" }}>
          <h1 className="font-display text-3xl text-foreground" style={{ fontFamily: '"Yeseva One", serif' }}>
            Category not found
          </h1>
          <Link to="/tours" className="flex items-center gap-2 text-sm font-body"
            style={{ color: "hsl(var(--primary))" }}>
            <ArrowLeft className="w-4 h-4" /> Back to all tours
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>

      {/*   Hero   */}
      <section className="relative flex items-end overflow-hidden"
        style={{ height: "clamp(320px, 52vh, 560px)", paddingTop: "var(--nav-total-h, 64px)" }}>
        <img src={config.heroImage} alt={config.heroAlt}
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

        <div className="relative z-10 container mx-auto px-6 pb-14">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-body mb-4"
            style={{ color: "rgba(255,255,255,0.45)" }}>
            <Link to="/tours" className="hover:text-white transition-colors">All Tours</Link>
            <span>/</span>
            <span style={{ color: config.accentColor }}>{config.title}</span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-xs tracking-[0.28em] uppercase font-body mb-3"
            style={{ color: config.accentColor }}>
            {config.tagline}
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 max-w-2xl"
            style={{ fontFamily: '"Yeseva One", serif', lineHeight: 1.05 }}>
            {config.title}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="font-body text-white/65 text-base max-w-xl leading-relaxed">
            {config.description}
          </motion.p>
        </div>
      </section>

      {/*   Sub-nav tabs   */}
      {config.tabs.length > 1 && (
        <div ref={tabsRef} className="sticky z-30 bg-background/98 backdrop-blur-sm"
          style={{
            top: "var(--nav-total-h, 64px)",
            borderBottom: "1px solid hsl(var(--border)/0.5)",
          }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
              {config.tabs.map(tab => (
                <button key={tab.id} onClick={() => handleTabChange(tab.id)}
                  className="flex-shrink-0 px-5 py-3.5 text-xs font-body font-semibold tracking-widest
                    uppercase transition-all duration-200 relative"
                  style={{ color: activeTab === tab.id ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}>
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="tabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full"
                      style={{ background: config.accentColor }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/*   Tab content   */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">

          {/* Back link + count for packages tab */}
          {activeTab === "packages" || config.tabs.length === 1 ? (
            <div className="flex items-center justify-between mb-8">
              <p className="font-body text-sm text-muted-foreground">
                {loading ? "Loading…" : (
                  <><strong className="text-foreground">{tours.length}</strong> package{tours.length !== 1 ? "s" : ""} available</>
                )}
              </p>
              <Link to="/tours"
                className="flex items-center gap-1.5 text-xs font-body transition-colors"
                style={{ color: "hsl(var(--muted-foreground))" }}
                onMouseEnter={e => e.currentTarget.style.color = config.accentColor}
                onMouseLeave={e => e.currentTarget.style.color = "hsl(var(--muted-foreground))"}>
                <ArrowLeft className="w-3 h-3" /> All tours
              </Link>
            </div>
          ) : null}

          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}>
              {config.renderTab(activeTab, tours, loading)}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/*   CTA   */}
      <section className="py-16 border-t"
        style={{ borderColor: "hsl(var(--border)/0.4)", background: "hsl(var(--muted)/0.2)" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl text-foreground mb-4"
            style={{ fontFamily: '"Yeseva One", serif' }}>
            Can't find what you're looking for?
          </h2>
          <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
            Every Native Kilimanjaro safari is built from scratch. Tell us your dream trip and we'll make it happen.
          </p>
          <Link to="/quote"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-body
              font-semibold tracking-widest uppercase transition-all duration-200 shadow-lg"
            style={{ background: config.accentColor, color: "hsl(var(--dark))",
              boxShadow: `0 8px 32px ${config.accentColor}40` }}>
            Plan a Custom Safari <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </PageLayout>
  );
};

export default TourCategoryPage;