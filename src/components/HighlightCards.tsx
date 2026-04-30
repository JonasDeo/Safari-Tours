import { Link } from "react-router-dom";
import safariImg from "@/assets/safari-elephants.jpg";
import kiliImg from "@/assets/kilimanjaro.jpg";

const highlights = [
  {
    image: safariImg,
    title: "Tanzania Safari - Nature's Best Show",
    desc: "Book multi-day tours from Serengeti wildebeest herds to Ngorongoro's Big Five, with optional Zanzibar beach extensions.",
    cta: "Tanzania Safari",
    href: "/tours/guided",
  },
  {
    image: kiliImg,
    title: "Climb Kilimanjaro - Africa's Highest Peak Awaits",
    desc: "Trek with professional mountain crews on routes from Machame to Marangu and reach Africa's rooftop with confidence.",
    cta: "Climb Kilimanjaro",
    href: "/tours/mountain",
  },
];

export function HighlightCards() {
  return (
    <section className="py-16 lg:py-20" style={{ background: "hsl(var(--secondary))" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {highlights.map((h) => (
            <article
              key={h.title}
              className="flex flex-col md:flex-row overflow-hidden"
              style={{ borderRadius: "16px" }}
            >
              {/* Photo — same proportions as kili cards */}
              <div className="md:w-2/5 h-56 md:h-auto overflow-hidden flex-shrink-0">
                <img
                  src={h.image}
                  alt={h.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>

              {/* Info panel — olive, matching kili card info panel exactly */}
              <div
                className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center gap-3"
                style={{ background: "hsl(var(--olive))" }}
              >
                {/* Divider rule above title, like kili cards */}
                <div style={{ width: "2rem", height: 1, background: "rgba(255,255,255,0.35)" }} />

                <h2
                  className="text-xl md:text-2xl font-bold uppercase leading-tight"
                  style={{ fontFamily: "var(--font-display)", color: "white" }}
                >
                  {h.title}
                </h2>

                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {h.desc}
                </p>

                <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.15)" }} />

                <Link
                  to={h.href}
                  className="inline-flex items-center text-[11px] tracking-[0.15em] uppercase font-semibold px-5 py-2.5 transition-colors duration-300 w-fit mt-1"
                  style={{
                    background:   "hsl(var(--primary))",
                    color:        "white",
                    borderRadius: "6px",
                  }}
                >
                  {h.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}