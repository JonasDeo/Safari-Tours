// src/pages/tours/GuidedSafaris.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useTours, PackagesGrid } from "./_shared";

const GuidedSafaris = () => {
  const { tours, loading } = useTours("GUIDED");

  return (
    <PageLayout>
      <div
        className="container mx-auto px-4 md:px-8 max-w-5xl"
        style={{ paddingTop: "calc(var(--nav-total-h, 72px) + 2.5rem)", paddingBottom: "4rem" }}
      >

        {/* Page title */}
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-1"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Private Guided Safaris &amp; Tours
        </h1>
        <p className="font-body text-sm mb-8" style={{ color: "hsl(var(--primary))" }}>
          Offering unforgettable safari experiences
        </p>

        {/* Intro paragraph */}
        <p className="font-body text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          Discover the beauty of Africa with our private guided safari and tours. Whether you're searching
          for the Big Five, exploring vast savannas, or immersing yourself in rich local cultures, our
          expertly curated safaris guarantee an adventure of a lifetime. Travel with experienced guides,
          enjoy seamless logistics, and experience Africa like never before.
        </p>

        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200"
          alt="Safari vehicles at sunrise in the Serengeti"
          className="w-full rounded-xl object-cover mb-10"
          style={{ height: 380, objectPosition: "center 40%" }}
        />

        {/* Why choose us */}
        <h2 className="font-display text-2xl text-foreground mb-4"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Why Choose Our Private Guided Safaris?
        </h2>
        <ul className="font-body text-muted-foreground space-y-2.5 mb-10 max-w-3xl list-none">
          {[
            ["Expert Local Guides", "In-depth knowledge of wildlife, landscapes, and cultures."],
            ["Tailor-Made Itineraries", "Customised trips built around your interests, dates, and budget."],
            ["All-Inclusive Packages", "Accommodation, park fees, meals, and all transfers included."],
            ["Comfort & Safety", "Well-maintained 4WD safari vehicles and 24/7 on-road support."],
            ["Sustainable Tourism", "Eco-friendly practices that support conservation and local communities."],
          ].map(([title, desc]) => (
            <li key={title} className="flex items-start gap-2 leading-relaxed">
              <span className="flex-shrink-0 mt-1" style={{ color: "hsl(var(--primary))" }}>→</span>
              <span><strong className="text-foreground">{title}</strong> — {desc}</span>
            </li>
          ))}
        </ul>

        {/* Destination highlights */}
        <h2 className="font-display text-2xl text-foreground mb-6"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Top Safari Destinations in Africa
        </h2>
        <p className="font-body text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          From the wild plains of the Serengeti to the peaks of Kilimanjaro and the beaches of Zanzibar,
          we craft journeys that connect you deeply to Africa — and give back to the people who call it home.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { name: "Tanzania", desc: "Home of the Great Wildebeest Migration, Ngorongoro Crater, and tree-climbing lions.", img: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=600" },
            { name: "Kenya", desc: "Iconic Big Five safaris in the Maasai Mara — the heart of African wildlife.", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600" },
            { name: "Uganda & Rwanda", desc: "Gorilla and chimpanzee trekking through lush jungle — a truly life-changing encounter.", img: "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=600" },
          ].map((d) => (
            <div key={d.name} className="rounded-xl overflow-hidden border"
              style={{ borderColor: "hsl(var(--border)/0.6)" }}>
              <img src={d.img} alt={d.name} className="w-full object-cover" style={{ height: 160 }} />
              <div className="p-4">
                <h3 className="font-body font-semibold text-foreground mb-1">{d.name}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Best time */}
        <div className="rounded-xl p-6 mb-12"
          style={{ background: "hsl(var(--muted)/0.35)", border: "1px solid hsl(var(--border)/0.5)" }}>
          <h3 className="font-body font-semibold text-foreground mb-3">🌤 Best Time for a Guided Safari</h3>
          <ul className="font-body text-sm text-muted-foreground space-y-2">
            <li><strong className="text-foreground">✔ June – October:</strong> Dry season — best for wildlife viewing and game drives.</li>
            <li><strong className="text-foreground">✔ November – May:</strong> Green season — fewer crowds, lush landscapes, baby animals.</li>
            <li><strong className="text-foreground">✔ July – September:</strong> Prime time for the Great Migration river crossings in the Serengeti.</li>
          </ul>
        </div>

        {/* Packages */}
        <h2 className="font-display text-2xl text-foreground mb-2"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Our Popular Routes
        </h2>
        <div className="flex items-center justify-between mb-8">
          <p className="font-body text-sm text-muted-foreground">
            Every itinerary is personally tested and refined by our team.
          </p>
          <Link to="/tours" className="font-body text-sm underline" style={{ color: "hsl(var(--primary))" }}>
            View All Tours →
          </Link>
        </div>
        <PackagesGrid tours={tours} loading={loading} emptyLabel="guided safari packages" />

        {/* CTA */}
        <div className="mt-14 py-12 px-6 text-center rounded-xl"
          style={{ background: "hsl(var(--muted)/0.3)", border: "1px solid hsl(var(--border)/0.4)" }}>
          <h3 className="font-display text-2xl text-foreground mb-3" style={{ fontFamily: '"Yeseva One", serif' }}>
            Ready to plan your safari?
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Tell us your dates, group size, and dream destinations. We'll send a full itinerary within 24 hours — no obligation.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/quote"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-body font-semibold uppercase tracking-widest"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+255623880844"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-body font-semibold uppercase tracking-widest border"
              style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}>
              Call Us Now
            </a>
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default GuidedSafaris;
