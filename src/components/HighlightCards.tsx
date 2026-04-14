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
    <section className="bg-accent py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {highlights.map((h) => (
            <article
              key={h.title}
              className="flex flex-col md:flex-row rounded-xl overflow-hidden"
              style={{ background: "hsl(var(--earth)/0.82)", border: "1px solid hsl(var(--border)/0.25)" }}
            >
              <div className="md:w-2/5 h-56 md:h-auto">
                <img
                  src={h.image}
                  alt={h.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                <h2
                  className="text-xl md:text-2xl font-bold text-accent-foreground mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {h.title}
                </h2>
                <p className="text-sm text-accent-foreground/80 leading-relaxed mb-5">{h.desc}</p>
                <Link
                  to={h.href}
                  className="inline-flex items-center px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:bg-terracotta-light transition-colors w-fit"
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

