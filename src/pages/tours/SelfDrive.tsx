// src/pages/tours/SelfDrive.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useTours, PackagesGrid } from "./_shared";
import SDrive from "@/assets/self-drive.png";

const accentGreen = "hsl(var(--olive))";

const SelfDrive = () => {
  const { tours: selfDriveTours, loading: sdLoading } = useTours("SELF_DRIVE");
  const { tours: rentalTours,    loading: rtLoading }  = useTours("CAR_RENTAL");

  const allTours   = [...selfDriveTours, ...rentalTours];
  const allLoading = sdLoading || rtLoading;

  const vehicles = [
    { name: "Toyota Land Cruiser 78",    seats: 7, drive: "4WD", price: "$180 / day", desc: "Our most popular safari vehicle — tough, reliable, and fully equipped with rooftop tent, fridge, recovery gear, and GPS." },
    { name: "Toyota Land Cruiser 200",   seats: 8, drive: "4WD", price: "$220 / day", desc: "Spacious premium option with air conditioning, rooftop tent, cooler box, and full camping kit. Ideal for larger groups." },
    { name: "Toyota Hilux Double Cab",   seats: 5, drive: "4WD", price: "$140 / day", desc: "Budget-friendly and highly capable. Comes with canopy, recovery gear, GPS, and spare tyre. Great for smaller groups." },
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
          Self-Drive Safaris &amp; Car Rental
        </h1>
        <p className="font-body text-sm mb-8" style={{ color: accentGreen }}>
          Your pace. Your path. The ultimate freedom.
        </p>

        {/* Intro */}
        <p className="font-body text-muted-foreground leading-relaxed mb-4 max-w-3xl">
          Take the wheel and write your own adventure. Rent a fully equipped 4WD and explore East Africa
          at your own pace — no fixed schedules, no shared vehicles, no compromises. Whether you're
          navigating the vast savannas of Tanzania or the scenic landscapes of Kenya, Native Kilimanjaro puts
          you in the driver's seat.
        </p>
        <p className="font-body text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          We provide the vehicle, camping gear, detailed offline maps, and <strong className="text-foreground">24/7 emergency support</strong> — everything you need for a safe, extraordinary self-drive safari.
        </p>

        {/* Hero image */}
        <img
          src={SDrive}
          alt="4WD Land Cruiser on open African plains"
          className="w-full rounded-xl object-cover mb-10"
          style={{ height: 380 }}
        />

        {/* Car Rental */}
        <h2 className="font-display text-2xl text-foreground mb-4"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Car Rental
        </h2>
        <p className="font-body text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          All our vehicles are professionally serviced before every rental, fully insured, GPS-equipped,
          and stocked with everything you need. We offer both <strong className="text-foreground">self-drive</strong> (you drive yourself) and
          <strong className="text-foreground"> driver-guided</strong> options — or a combination of both.
        </p>

        {/* Vehicle cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {vehicles.map((v) => (
            <div key={v.name} className="rounded-xl p-5"
              style={{ background: "hsl(var(--muted)/0.35)", border: "1px solid hsl(var(--border)/0.5)" }}>
              <h3 className="font-body font-semibold text-foreground mb-1">{v.name}</h3>
              <p className="font-body text-xs text-muted-foreground mb-3">
                {v.seats} seats &nbsp;·&nbsp; {v.drive}
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{v.desc}</p>
              <p className="font-body text-lg font-bold" style={{ color: accentGreen }}>{v.price}</p>
            </div>
          ))}
        </div>
        <p className="font-body text-xs text-muted-foreground mb-10">
          * Prices exclude fuel and national park entry fees. Airport pickup available (+$50). Longer rentals (7+ days) receive a 10–15% discount.
        </p>

        {/* What's included */}
        <h2 className="font-display text-2xl text-foreground mb-4"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          What's Included in Every Rental
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {[
            ["Full Comprehensive Insurance",  "Collision, theft, and third-party liability — you're covered."],
            ["GPS + Offline Maps",            "Pre-loaded device with offline maps for all national parks and routes."],
            ["Camping Equipment",             "Rooftop tent, sleeping bags, cooking stove, utensils, and 40L cooler."],
            ["Recovery Gear",                 "Hi-lift jack, sand boards, tow rope, and shovel for off-road situations."],
            ["Detailed Roadbook",             "Printed itinerary with GPS waypoints, park fees, and campsite details."],
            ["24/7 Emergency Support Line",   "Direct line to our team for breakdowns, route advice, and emergencies."],
          ].map(([title, desc]) => (
            <div key={title} className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border)/0.5)" }}>
              <span className="flex-shrink-0 mt-0.5" style={{ color: accentGreen }}>✔</span>
              <div>
                <p className="font-body text-sm font-semibold text-foreground mb-0.5">{title}</p>
                <p className="font-body text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Second image */}
        <img
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200"
          alt="Self-drive safari on open road"
          className="w-full rounded-xl object-cover mb-10"
          style={{ height: 300 }}
        />

        {/* Self-drive tips */}
        <h2 className="font-display text-2xl text-foreground mb-4"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Self-Drive Safari Tips
        </h2>
        <ul className="font-body text-muted-foreground space-y-2.5 mb-12 max-w-3xl">
          {[
            "Drive on the left side of the road in Tanzania and Kenya.",
            "Always carry extra fuel — petrol stations are sparse near remote parks.",
            "Enter national parks before the gate closes (usually 6 pm).",
            "Never drive off designated tracks inside national parks — it's illegal and damages habitat.",
            "Keep windows up and engine off when near lions or other predators.",
            "A valid international driving licence is required for all rentals.",
            "Download offline versions of Google Maps and Maps.me before you go.",
          ].map(tip => (
            <li key={tip} className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-0.5" style={{ color: accentGreen }}>→</span> {tip}
            </li>
          ))}
        </ul>

        {/* Packages */}
        <h2 className="font-display text-2xl text-foreground mb-2"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          Self-Drive Packages
        </h2>
        <div className="flex items-center justify-between mb-8">
          <p className="font-body text-sm text-muted-foreground">
            Self-tested itineraries with everything pre-arranged — just drive.
          </p>
          <Link to="/tours" className="font-body text-sm underline" style={{ color: accentGreen }}>
            View All Tours →
          </Link>
        </div>
        <PackagesGrid
          tours={allTours}
          loading={allLoading}
          accent={accentGreen}
          accentText="#fff"
          fallbackImg="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800"
          emptyLabel="self-drive packages"
        />

        {/* CTA */}
        <div className="mt-14 py-12 px-6 text-center rounded-xl"
          style={{ background: "hsl(var(--muted)/0.3)", border: "1px solid hsl(var(--border)/0.4)" }}>
          <h3 className="font-display text-2xl text-foreground mb-3" style={{ fontFamily: '"Yeseva One", serif' }}>
            Ready to Hit the Open Road?
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Tell us your dates, preferred vehicle, and route. We'll have everything ready for your departure.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/quote"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-body font-semibold uppercase tracking-widest"
              style={{ background: accentGreen, color: "#fff" }}>
              Enquire Now <ArrowRight className="w-4 h-4" />
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

export default SelfDrive;
