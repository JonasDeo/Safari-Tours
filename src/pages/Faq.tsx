import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useSiteSettings } from "@/hooks/use-site-settings";

// ── Data ──────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    category: "Getting There",
    items: [
      {
        q: "Arusha Airport or Kilimanjaro Airport?",
        a: "Kilimanjaro International Airport (JRO) is approximately 60 km (60 min) from Arusha city centre and serves as the gateway for safari visitors. It is uniquely located at the heart of East Africa's major tourism attractions. Arusha Municipal Airport (ARK) is on the outskirts of Arusha but only runs domestic flights — mostly to Zanzibar and Dar es Salaam. You can compare international flights on Skyscanner.net.",
      },
      {
        q: "Do I need a Tanzanian tourist visa in advance?",
        a: "Citizens of the EU and USA can acquire entry visas at international airports in Tanzania as well as other border crossings. It is also possible to apply online through the Tanzania immigration website. Visa cost: generally USD 50 (USD 100 for US citizens).",
      },
      {
        q: "Which international airlines fly to Tanzania?",
        a: "Turkish Airlines, Emirates, FlyDubai, KLM, and Ethiopian Airlines are among those with regular flights to Tanzania. We recommend consulting World's Top 100 Airlines ratings if comfort is a priority, or choosing the most convenient option in your price range.",
      },
      {
        q: "Who will meet me on arrival?",
        a: "One of our drivers will meet you with a sign bearing your name at your airport of arrival, regardless of the time of day — including late-night arrivals.",
      },
    ],
  },
  {
    category: "Safari Basics",
    items: [
      {
        q: "What are a Safari and a Game Drive?",
        a: "A Safari (\"trip\" in Swahili) is generally a tour of the wilds of Tanzania's National Parks using customised 4×4 vehicles. Our safaris start in Arusha or Moshi with a 2–3 hour drive to one of the parks. A Game Drive is a guided excursion through the park where you observe wildlife in their natural habitat. The most popular parks are Serengeti, Ngorongoro Crater, Tarangire, Arusha, and Lake Manyara.",
      },
      {
        q: "What is a Lodge?",
        a: "Lodges are small hotels situated in or near a National Park, offering privacy and exclusivity through detached bungalows or tents set in the African bush. Many mirror traditional local architecture while providing excellent comfort, good food, Wi-Fi, and usually a swimming pool.",
      },
      {
        q: "What should I bring on safari?",
        a: "We recommend comfortable light clothing for the day and something warmer for the evenings, which can be cool in the northern highlands. Bring comfortable walking shoes, a hat, sunglasses, and sunscreen. Binoculars are provided in our vehicles. A camera is highly recommended.",
      },
      {
        q: "How is a Tanzania safari different from other countries?",
        a: "Tanzania ranks first among African safari destinations. Two factors make it exceptional: hunting is strictly prohibited in all National Parks (creating one of the highest wildlife densities on the continent), and higher park fees keep visitor numbers low for a more exclusive experience. All safaris are conducted in off-road 4×4 vehicles — no small family cars on game drives.",
      },
      {
        q: "Can I exit the vehicle during a game drive?",
        a: "Tanzania National Park regulations strictly prohibit leaving the vehicle within the parks, for both visitor safety and protection of the ecosystem. However, all parks are equipped with rest and picnic spots where you can stretch, take a walk, and enjoy lunch in the open.",
      },
      {
        q: "Is food available during the safari?",
        a: "All our safari packages are full-board. Breakfasts are at the lodge, lunches are packed lunch boxes enjoyed at picnic spots in the park, and dinners are at the lodge. Cold drinks, water, tea, coffee, and snacks are always available in the vehicle fridge — all included in the tour price.",
      },
      {
        q: "At what time do safaris start?",
        a: "We recommend departing the lodge at 6:30–7 AM. Mornings are cooler, animals are most active, and you arrive before other tourist vehicles. All park fees are paid per day regardless of time spent, with 6 PM closing — so an early start gives you maximum time in the bush. That said, our guides will always adjust to your preferences.",
      },
      {
        q: "Are there age restrictions for National Parks?",
        a: "There are no official age restrictions. However, game drives can last most of the day and we do not recommend bringing children younger than 2. For older children, safaris are highly educational and memorable — seeing wildlife in natural habitat rather than a zoo is a life-changing experience.",
      },
      {
        q: "Are photos and videos allowed on safari?",
        a: "All photography and video recording for personal use (including social media) is permitted without special equipment or permits. Commercial recording requires a permit. Drones require a permit obtained well in advance — please inform your Tour Manager early if needed.",
      },
      {
        q: "How can we make the safari more diverse?",
        a: "A balloon flight over the Serengeti is one of the most memorable add-ons — about one hour with a bird's-eye view of the plains. Parks near lakes offer canoeing. Charter flights over the parks are also available. Contact us for more options.",
      },
    ],
  },
  {
    category: "Money & Currency",
    items: [
      {
        q: "What currency is most acceptable?",
        a: "We recommend bringing USD or Euros and withdrawing Tanzanian Shillings (TSH) on arrival. There are many ATMs in Arusha — the minimum withdrawal is TSH 400,000 (approx. USD 160). Most tourist places accept dollars. Use USD notes printed after 2006.",
      },
      {
        q: "What is the currency in Tanzania?",
        a: "The official currency is the Tanzanian Shilling (TSH). The current rate is approximately TSH 2,500 per USD 1. Cash payments in USD are widely accepted. Notes issued before 2003 may not be accepted or accepted at a lower rate.",
      },
      {
        q: "Should I tip the safari driver?",
        a: "Tipping is customary in Tanzania. We recommend USD 30–50 per vehicle per day, provided you are satisfied with the service. For Kilimanjaro climbs, crew tips average USD 250 per client.",
      },
    ],
  },
  {
    category: "Booking & Payment",
    items: [
      {
        q: "Does the tour price include international flights?",
        a: "Our standard rates do not include international flights, as our clients come from all over the world. However, your Tour Manager can always assist with selecting and booking air tickets.",
      },
      {
        q: "Is an advance payment required?",
        a: "Yes, a deposit is required to facilitate hotel bookings and logistics. Classic tours require 30%, Luxury and Premium require 50%. Flights within Tanzania, Zanzibar accommodation, and excursions require full payment in advance. Deposits are generally due 60 days before departure.",
      },
      {
        q: "What is the cancellation policy?",
        a: "Cancellation fees are as follows: 25% from confirmation to 45 days before departure; 50% from 44 to 16 days before; 75% from 15 to 8 days before; 100% less than 7 days before or no-show. All cancellations must be submitted in writing.",
      },
      {
        q: "What costs are not included in the tour price?",
        a: "The following are not included: visa fees; alcohol at hotels (unless under all-inclusive rates); tips for climb crews and safari drivers (USD 30–50 per vehicle per day for safaris; USD 250 per client for Kilimanjaro climbs); and international flights.",
      },
    ],
  },
  {
    category: "Health & Safety",
    items: [
      {
        q: "Is Tanzania safe for tourists?",
        a: "Yes — Tanzania is one of the most politically stable and tourist-friendly countries in Africa. Tourism provides a large portion of foreign income and local authorities take security seriously. As in any country, exercise common sense: avoid leaving belongings unattended, use taxis after dark, and travel with a guide when taking photos in towns.",
      },
      {
        q: "What vaccinations do I need?",
        a: "There have been no recorded yellow fever cases in Tanzania's tourist regions in over 20 years, but vaccination is recommended if visiting remote areas. Malaria risk is present but often overstated — consult your doctor about prophylaxis if visiting more remote regions.",
      },
      {
        q: "Do I need travel insurance?",
        a: "We highly recommend travel insurance for all international travel. If you are planning a Kilimanjaro climb, ensure your policy covers climbing emergencies at a minimum altitude of 6,000 metres. Your Tour Manager can assist with obtaining appropriate insurance.",
      },
      {
        q: "Is the water safe in Tanzania?",
        a: "All hotels we work with provide safe water. Showering and brushing teeth is never an issue. We still recommend drinking only bottled water, which is always available at lodges, in the safari vehicle, and in shops.",
      },
    ],
  },
  {
    category: "Accommodation",
    items: [
      {
        q: "Can I choose a hotel not in the standard programme?",
        a: "Yes — if you are booking a tailor-made tour, you may request any hotel and your Tour Manager will calculate the cost difference accordingly.",
      },
      {
        q: "What food can I expect at Tanzanian hotels?",
        a: "All tourist hotels adapt their menus to suit international tastes while also offering local dishes. If you have dietary requirements (vegetarian, allergies, etc.), simply inform your Tour Manager at the time of booking and we will communicate this to all lodges.",
      },
      {
        q: "Is Wi-Fi available at lodges?",
        a: "All hotels and lodges have Wi-Fi and internet access. Connection speeds may be slower than you are used to at home — we recommend embracing the disconnect as part of the safari experience.",
      },
    ],
  },
];

// ── Components ────────────────────────────────────────────────────────────────

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.32, 0.72, 0, 1] }}>
      {children}
    </motion.div>
  );
};

const AccordionItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="font-display text-base font-semibold text-foreground leading-snug
          group-hover:text-primary transition-colors duration-200">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown className="w-4 h-4 text-primary" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm leading-relaxed text-muted-foreground pb-5 pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const FAQPage = () => {
  const { contact } = useSiteSettings();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <PageLayout>

      {/* Hero */}
      <section className="py-20 lg:py-28 bg-background border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}>
            <p className="font-body text-xs tracking-[0.35em] uppercase text-primary mb-4">
              Help Centre
            </p>
            <h1 className="font-display text-foreground mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.05 }}>
              Frequently Asked<br />Questions
            </h1>
            <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-lg">
              Everything you need to know before your Tanzania safari. Can't find an answer?
              We're always here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">

            {/* Sticky category nav — desktop */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-1">
                <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
                  Categories
                </p>
                {SECTIONS.map(s => (
                  <button key={s.category}
                    onClick={() => {
                      setActiveSection(s.category);
                      document.getElementById(s.category.replace(/\s+/g, "-"))?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg font-body text-sm transition-all duration-200"
                    style={{
                      background:  activeSection === s.category ? "hsl(var(--primary)/0.1)" : "transparent",
                      color:       activeSection === s.category ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                      fontWeight:  activeSection === s.category ? 600 : 400,
                    }}
                    onMouseEnter={e => { if (activeSection !== s.category) e.currentTarget.style.color = "hsl(var(--foreground))"; }}
                    onMouseLeave={e => { if (activeSection !== s.category) e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}>
                    {s.category}
                  </button>
                ))}
              </div>
            </aside>

            {/* FAQ content */}
            <div className="space-y-14">
              {SECTIONS.map((section, si) => (
                <Reveal key={section.category} delay={si * 0.05}>
                  <div id={section.category.replace(/\s+/g, "-")}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-6 rounded-full bg-primary" />
                      <h2 className="font-display text-foreground"
                        style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                        {section.category}
                      </h2>
                    </div>

                    <div className="rounded-2xl border border-border overflow-hidden px-6"
                      style={{ background: "hsl(var(--muted)/0.2)" }}>
                      {section.items.map(item => (
                        <AccordionItem key={item.q} q={item.q} a={item.a} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Still have questions CTA */}
              <Reveal delay={0.1}>
                <div className="rounded-2xl p-8 lg:p-10 border border-border bg-muted/30
                  flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <h3 className="font-display text-foreground mb-2"
                      style={{ fontSize: "1.3rem", fontWeight: 600 }}>
                      Still have questions?
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      Our team is based in Arusha and available Mon–Sat, 8am–6pm EAT.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body
                        text-xs font-semibold tracking-widest uppercase bg-primary
                        text-primary-foreground hover:bg-primary/85 transition-colors duration-200">
                      <Phone className="w-3.5 h-3.5" />
                      Call Us
                    </a>
                    <Link to="/contact"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body
                        text-xs font-semibold tracking-widest uppercase border border-border
                        text-foreground hover:bg-muted transition-colors duration-200">
                      <Mail className="w-3.5 h-3.5" />
                      Send a Message
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default FAQPage;