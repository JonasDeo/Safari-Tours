// src/pages/tours/BeachHolidays.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useTours, PackagesGrid } from "./_shared";

const accent = "hsl(38 90% 52%)";

const BeachHolidays = () => {
  const { tours, loading } = useTours("BEACH");

  return (
    <PageLayout>
      <div
        className="container mx-auto px-4 md:px-8 max-w-5xl"
        style={{ paddingTop: "calc(var(--nav-total-h, 72px) + 2.5rem)", paddingBottom: "4rem" }}
      >

        {/* Page title */}
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-1"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Beach Holidays
        </h1>
        <p className="font-body text-sm mb-8" style={{ color: accent }}>
          Relax. Swim. Snorkel. Eat fresh seafood at sunset.
        </p>

        {/* Intro */}
        <p className="font-body text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          We build beach stays that fit you — quiet relaxation, family-friendly resorts, snorkelling and
          dive packages, kitesurfing lessons, or a seamless mix of safari plus beach. We handle transfers,
          domestic flights, accommodation, and community experiences so you can switch off and simply enjoy
          the ocean.
        </p>

        {/* Hero image */}
        <img
          src="https://images.unsplash.com/photo-1646668072507-b2215b873c70?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Zanzibar beach at sunset"
          className="w-full rounded-xl object-cover mb-10"
          style={{ height: 380, objectPosition: "center 60%" }}
        />

        {/* Zanzibar */}
        <h2 className="font-display text-2xl text-foreground mb-1"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Zanzibar (Unguja)
        </h2>
        <p className="font-body text-sm mb-4" style={{ color: accent }}>The Classic Choice</p>
        <p className="font-body text-muted-foreground leading-relaxed mb-4 max-w-3xl">
          Zanzibar has the broadest range of beach experiences — lively north-coast resorts and quieter
          east- and southeast-coast hideaways. Top beaches include Nungwi, Kendwa, Paje, Jambiani,
          Matemwe, and Bwejuu. These beaches offer everything from calm swimming and world-class diving to
          kitesurfing and vibrant Stone Town nightlife.
        </p>
        <ul className="font-body text-muted-foreground space-y-2 mb-8 max-w-3xl">
          <li className="flex items-start gap-2"><span style={{ color: accent }}>→</span><span><strong className="text-foreground">Nungwi &amp; Kendwa</strong> — best for swimming at all tides and energetic evenings.</span></li>
          <li className="flex items-start gap-2"><span style={{ color: accent }}>→</span><span><strong className="text-foreground">Paje &amp; Jambiani</strong> — east-coast kitesurfing mecca; great for lessons and long walks.</span></li>
          <li className="flex items-start gap-2"><span style={{ color: accent }}>→</span><span><strong className="text-foreground">Matemwe / Mnemba Atoll</strong> — top snorkelling and diving; quieter, long beaches.</span></li>
          <li className="flex items-start gap-2"><span style={{ color: accent }}>→</span><span><strong className="text-foreground">Stone Town</strong> — UNESCO World Heritage spice city; a half-day tour is a must.</span></li>
        </ul>

        {/* Second image */}
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200"
          alt="Pemba Island clear waters"
          className="w-full rounded-xl object-cover mb-10"
          style={{ height: 320 }}
        />

        {/* Mafia & Pemba */}
        <h2 className="font-display text-2xl text-foreground mb-1"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Mafia &amp; Pemba
        </h2>
        <p className="font-body text-sm mb-4" style={{ color: accent }}>For Divers &amp; Privacy Seekers</p>
        <p className="font-body text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          Mafia Island Marine Park is a diver's paradise with protected reefs and seasonal whale shark
          encounters (October to March). Pemba is greener, wilder, and far less developed — perfect for
          intimate resorts, superb snorkelling, and complete seclusion. Neither island has mass tourism,
          making them ideal for honeymoons and private retreats.
        </p>

        {/* Dar & mainland */}
        <h2 className="font-display text-2xl text-foreground mb-1"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Dar es Salaam &amp; Mainland Coast
        </h2>
        <p className="font-body text-sm mb-4" style={{ color: accent }}>Quick City Escapes</p>
        <p className="font-body text-muted-foreground leading-relaxed mb-4 max-w-3xl">
          Dar's coast includes Coco Beach (Oyster Bay), Kigamboni (South Beach), and the marine reserve
          islands Bongoyo and Mbudya — great for half-day snorkelling, picnics, and easy access from the
          city. Further north, Pangani and Bagamoyo offer quiet, authentic Swahili coast towns.
        </p>
        <p className="font-body text-muted-foreground leading-relaxed mb-10 max-w-3xl">
          <strong className="text-foreground">Saadani National Park</strong> is unique: it's the only
          wildlife reserve in Tanzania where you can see elephants and lions walking on the beach —
          combining a game drive with a swim in the Indian Ocean on the same day.
        </p>

        {/* When to travel */}
        <div className="rounded-xl p-6 mb-12"
          style={{ background: "hsl(var(--muted)/0.35)", border: "1px solid hsl(var(--border)/0.5)" }}>
          <h3 className="font-body font-semibold text-foreground mb-3">🌊 When to Travel</h3>
          <ul className="font-body text-sm text-muted-foreground space-y-2">
            <li><strong className="text-foreground">✔ Best overall months:</strong> June to October and December to February — dry and sunny.</li>
            <li><strong className="text-foreground">✔ Short rains:</strong> November (spotty) — lower prices, still enjoyable.</li>
            <li><strong className="text-foreground">✔ Long rains:</strong> April – May — some properties close, big discounts.</li>
            <li><strong className="text-foreground">✔ Kitesurfing season:</strong> June to September and December to March on the east coast.</li>
          </ul>
        </div>

        {/* How to get there */}
        <h2 className="font-display text-2xl text-foreground mb-4"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          How to Get There
        </h2>
        <p className="font-body text-muted-foreground leading-relaxed mb-12 max-w-3xl">
          Fly into Abeid Amani Karume International Airport (ZNZ) for Zanzibar, or Julius Nyerere
          International Airport (DAR) for Dar es Salaam. Domestic flights and fast ferries link Dar and
          Zanzibar daily. Coastal Aviation and Auric Air cover Mafia and Pemba. Balbina Safaris arranges
          all connections, transfers, and schedules so your journey is completely seamless.
        </p>

        {/* Packages */}
        <h2 className="font-display text-2xl text-foreground mb-2"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Our Signature Beach Packages
        </h2>
        <div className="flex items-center justify-between mb-8">
          <p className="font-body text-sm text-muted-foreground">
            From quick 3-night getaways to full safari-plus-beach escapes.
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
          fallbackImg="https://images.unsplash.com/photo-1504945005722-33670dcaf685?w=800"
          emptyLabel="beach packages"
        />

        {/* CTA */}
        <div className="mt-14 py-12 px-6 text-center rounded-xl"
          style={{ background: "hsl(var(--muted)/0.3)", border: "1px solid hsl(var(--border)/0.4)" }}>
          <h3 className="font-display text-2xl text-foreground mb-3" style={{ fontFamily: '"Yeseva One", serif' }}>
            Start Planning Your Beach Escape
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Tell us your preferred island, dates, and style. We arrange flights, accommodation, and all transfers.
          </p>
          <Link to="/quote"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-body font-semibold uppercase tracking-widest"
            style={{ background: accent, color: "#fff" }}>
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </PageLayout>
  );
};

export default BeachHolidays;
