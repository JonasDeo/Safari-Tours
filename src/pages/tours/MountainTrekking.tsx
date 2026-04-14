// src/pages/tours/MountainTrekking.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useTours, PackagesGrid } from "./_shared";
import kilimanjaro from "@/assets/mount-trek.jpg"

const accent = "hsl(var(--terracotta))";

const MountainTrekking = () => {
  const { tours, loading } = useTours("MOUNTAIN");

  const routePrices = [
    { route: "Marangu 5 Days",  solo: 1320, two: 1200, three: 1180, five: 1140 },
    { route: "Marangu 6 Days",  solo: 1524, two: 1404, three: 1374, five: 1349 },
    { route: "Machame 6 Days",  solo: 1615, two: 1420, three: 1375, five: 1363 },
    { route: "Machame 7 Days",  solo: 1821, two: 1616, three: 1596, five: 1536 },
    { route: "Rongai 6 Days",   solo: 1670, two: 1465, three: 1445, five: 1385 },
    { route: "Lemosho 7 Days",  solo: 1906, two: 1838, three: 1666, five: 1596 },
    { route: "Lemosho 8 Days",  solo: 2070, two: 1998, three: 1847, five: 1783 },
  ];

  return (
    <PageLayout>
      <div
        className="container mx-auto px-4 md:px-8 max-w-5xl"
        style={{ paddingTop: "calc(var(--nav-total-h, 72px) + 2.5rem)", paddingBottom: "4rem" }}
      >

        {/* Page title */}
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-1"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Mountain Climbing in Africa
        </h1>
        <p className="font-body text-sm mb-8" style={{ color: accent }}>
          Kilimanjaro Trek Prices, Routes &amp; Packages
        </p>

        {/* Intro */}
        <p className="font-body text-muted-foreground leading-relaxed mb-4 max-w-3xl">
          At Native Kilimanjaro, we offer tailored packages to suit your adventure preferences and budget.
          Whether you're looking for a more economical <strong className="text-foreground">Budget Package</strong> or
          a more comfortable experience with our <strong className="text-foreground">Standard Full Package</strong>,
          we provide all the support you need to reach the summit safely. Our certified guides and
          dedicated porters ensure an unforgettable journey to Uhuru Peak — 5,895 metres above sea level.
        </p>

        {/* Hero image */}
        <img
          src={kilimanjaro}
          alt="Mount Kilimanjaro summit above the clouds"
          className="w-full rounded-xl object-cover mb-10"
          style={{ height: 380 }}
        />

        {/* Routes overview */}
        <h2 className="font-display text-2xl text-foreground mb-4"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Mount Kilimanjaro — Trekking Routes Overview
        </h2>
        <p className="font-body text-muted-foreground leading-relaxed mb-5 max-w-3xl">
          We offer treks across all the major routes up Mount Kilimanjaro, each with unique features,
          landscapes, and challenges. Below is an overview, followed by detailed pricing:
        </p>
        <ol className="font-body text-muted-foreground space-y-2.5 mb-10 max-w-3xl list-none">
          {[
            ["Marangu Route (Coca-Cola Route)", "The only route with hut accommodation — the most comfortable option and a gentler gradient."],
            ["Machame Route (Whiskey Route)",   "One of the most popular and scenic routes with an excellent acclimatisation profile."],
            ["Rongai Route",                    "Approaches from the north — quieter, drier, and especially good during the rainy season."],
            ["Lemosho Route",                   "One of the longest and most scenic routes, ideal for acclimatisation and the highest success rate."],
          ].map(([title, desc], i) => (
            <li key={title} className="flex items-start gap-3">
              <span className="font-body font-bold text-sm flex-shrink-0 mt-0.5" style={{ color: accent }}>{i + 1}.</span>
              <span><strong className="text-foreground">{title}</strong> — {desc}</span>
            </li>
          ))}
        </ol>

        {/* Package types */}
        <h2 className="font-display text-2xl text-foreground mb-5"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Packages Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-xl p-6"
            style={{ background: "hsl(var(--muted)/0.35)", border: "1px solid hsl(var(--border)/0.5)" }}>
            <h3 className="font-body font-semibold text-foreground mb-3">Budget Package</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
              The Budget Package focuses on affordability while maintaining high safety standards and a successful summit. This includes:
            </p>
            <ul className="font-body text-sm text-muted-foreground space-y-1.5">
              {[
                "Basic accommodation (camping or hut depending on route)",
                "Essential camping gear — tents, sleeping bags, chairs",
                "Emergency oxygen, pulse oximeter, stethoscope",
                "Emergency evacuation if needed",
                "Licensed guides and porters",
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span style={{ color: accent }}>✔</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-6"
            style={{ background: `${accent}0d`, border: `1px solid ${accent}30` }}>
            <h3 className="font-body font-semibold text-foreground mb-3">Standard Full Package</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
              The Standard Full Package includes everything in the Budget Package, plus extra comfort and conveniences:
            </p>
            <ul className="font-body text-sm text-muted-foreground space-y-1.5">
              {[
                "Comfortable accommodation — better camping or lodge options",
                "All gear including waterproof tents and private mess tent",
                "Portable flush toilets (camping routes)",
                "Premium sleeping bags and extra padding",
                "Additional guide support for a higher summit success rate",
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span style={{ color: accent }}>✔</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Price table */}
        <h2 className="font-display text-2xl text-foreground mb-3"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Kilimanjaro Trek Price
        </h2>
        <p className="font-body text-sm text-muted-foreground mb-6">
          Price rates per person in a group (USD). All park fees, guides, porters, meals, and accommodation included.
        </p>
        <div className="overflow-x-auto rounded-xl mb-4"
          style={{ border: "1px solid hsl(var(--border)/0.6)" }}>
          <table className="w-full text-sm font-body">
            <thead>
              <tr style={{ background: "hsl(var(--muted)/0.5)", borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
                {["Route", "1 Person", "2 People", "3–4 People", "5+ People"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold"
                    style={{ color: "hsl(var(--muted-foreground))" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {routePrices.map((row, i) => (
                <tr key={row.route}
                  className="transition-colors"
                  style={{ borderBottom: "1px solid hsl(var(--border)/0.3)", background: i % 2 === 0 ? "transparent" : "hsl(var(--muted)/0.15)" }}>
                  <td className="px-4 py-3 font-semibold text-foreground">{row.route}</td>
                  <td className="px-4 py-3 text-foreground">${row.solo.toLocaleString()}</td>
                  <td className="px-4 py-3 text-foreground">${row.two.toLocaleString()}</td>
                  <td className="px-4 py-3 text-foreground">${row.three.toLocaleString()}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: accent }}>${row.five.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-body text-xs text-muted-foreground mb-12">
          * Prices are subject to change due to park fee updates. Prices are confirmed once payment is made.
          For the Marangu Route, huts are provided — camping gear does not apply.
        </p>

        {/* Park fees */}
        <h2 className="font-display text-2xl text-foreground mb-4"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Kilimanjaro National Park Fees
        </h2>
        <p className="font-body text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          All TANAPA (Tanzania National Parks) fees are included in your Native Kilimanjaro package price.
          We list them here for full transparency so you know exactly what is covered:
        </p>
        <div className="overflow-x-auto rounded-xl mb-12"
          style={{ border: "1px solid hsl(var(--border)/0.6)" }}>
          <table className="w-full text-sm font-body">
            <thead>
              <tr style={{ background: "hsl(var(--muted)/0.5)", borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
                {["Fee Type", "Rate", "Notes"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold"
                    style={{ color: "hsl(var(--muted-foreground))" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Conservation Fee",   rate: "$70 / day",  note: "Per person per day on all routes" },
                { type: "Camping Fee",        rate: "$50 / night", note: "Marangu huts: $60/night instead" },
                { type: "Rescue Fee",         rate: "$20 / day",  note: "Mandatory for all climbers" },
                { type: "Guide Fee (KINAPA)", rate: "$25 / day",  note: "Per climbing day" },
                { type: "Porter Fee",         rate: "$15 / day",  note: "Per porter per day" },
                { type: "Summit Certificate", rate: "$100",       note: "One-time fee, collected at the summit" },
              ].map((row, i) => (
                <tr key={row.type}
                  style={{ borderBottom: "1px solid hsl(var(--border)/0.3)", background: i % 2 === 0 ? "transparent" : "hsl(var(--muted)/0.15)" }}>
                  <td className="px-4 py-3 font-semibold text-foreground">{row.type}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: accent }}>{row.rate}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trekking preparations */}
        <h2 className="font-display text-2xl text-foreground mb-4"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Trekking Preparations
        </h2>
        <p className="font-body text-muted-foreground leading-relaxed mb-5 max-w-3xl">
          Kilimanjaro is achievable for fit, well-prepared trekkers — no technical climbing experience
          is needed. The key challenge is altitude. Here is how to give yourself the best chance of
          reaching Uhuru Peak:
        </p>

        <h3 className="font-body font-semibold text-foreground mb-3">Physical Preparation</h3>
        <ul className="font-body text-muted-foreground space-y-2 mb-6 max-w-3xl">
          {[
            "Start cardiovascular training 3–6 months before your climb",
            "Build endurance with regular running, cycling, or swimming",
            "Do day hikes with a loaded pack (10–15 kg) to simulate conditions",
            "Train on stairs or steep inclines to prepare for altitude gain",
            "Work up to 6–8 hour hikes on variable terrain",
          ].map(item => (
            <li key={item} className="flex items-start gap-2">
              <span style={{ color: accent }} className="flex-shrink-0 mt-0.5">→</span> {item}
            </li>
          ))}
        </ul>

        <h3 className="font-body font-semibold text-foreground mb-3">Altitude &amp; Acclimatisation</h3>
        <ul className="font-body text-muted-foreground space-y-2 mb-6 max-w-3xl">
          {[
            "Choose a longer route (7–9 days) for significantly better acclimatisation",
            "Follow the 'climb high, sleep low' principle — your guide will manage this",
            "Drink 3–4 litres of water per day on the mountain",
            "Avoid alcohol and sleeping pills at altitude",
            "Consult your doctor about Diamox (acetazolamide) before your trip",
          ].map(item => (
            <li key={item} className="flex items-start gap-2">
              <span style={{ color: accent }} className="flex-shrink-0 mt-0.5">→</span> {item}
            </li>
          ))}
        </ul>

        <h3 className="font-body font-semibold text-foreground mb-3">Medical &amp; Insurance</h3>
        <ul className="font-body text-muted-foreground space-y-2 mb-12 max-w-3xl">
          {[
            "Get a full medical check-up before your climb",
            "Ensure your travel insurance covers high-altitude helicopter evacuation",
            "Carry a personal first aid kit including blister treatment and pain relief",
            "Know the symptoms of AMS (Acute Mountain Sickness), HACE, and HAPE",
            "All our guides carry emergency oxygen and pulse oximeters",
          ].map(item => (
            <li key={item} className="flex items-start gap-2">
              <span style={{ color: accent }} className="flex-shrink-0 mt-0.5">→</span> {item}
            </li>
          ))}
        </ul>

        {/* Packages */}
        <h2 className="font-display text-2xl text-foreground mb-2"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Mountain Trekking Packages
        </h2>
        <div className="flex items-center justify-between mb-8">
          <p className="font-body text-sm text-muted-foreground">
            All-inclusive treks — park fees, guides, porters, meals and accommodation included.
          </p>
          <Link to="/tours" className="font-body text-sm underline" style={{ color: accent }}>
            View All Tours →
          </Link>
        </div>
        <PackagesGrid
          tours={tours}
          loading={loading}
          accent={accent}
          accentText="#fff"
          fallbackImg="https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=800"
          emptyLabel="mountain trekking packages"
        />

        {/* CTA */}
        <div className="mt-14 py-12 px-6 text-center rounded-xl"
          style={{ background: "hsl(var(--muted)/0.3)", border: "1px solid hsl(var(--border)/0.4)" }}>
          <h3 className="font-display text-2xl text-foreground mb-3" style={{ fontFamily: '"Yeseva One", serif' }}>
            Ready to Summit Kilimanjaro?
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Tell us your preferred route, dates, and group size. We'll send a full itinerary and quote within 24 hours.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/quote"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-body font-semibold uppercase tracking-widest"
              style={{ background: accent, color: "#fff" }}>
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+255623880844"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-body font-semibold uppercase tracking-widest border"
              style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}>
              Call Us
            </a>
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default MountainTrekking;
