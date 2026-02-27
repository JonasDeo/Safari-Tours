import { Compass, Map, Mountain, Umbrella } from "lucide-react";

const infoCards = [
  { icon: Compass, title: "Why Us?", desc: "Travel With Purpose, Where Every Journey Gives Back.", link: "#" },
  { icon: Map, title: "Where to Go", desc: "Explore national parks, mountains and islands.", link: "#" },
  { icon: Mountain, title: "When to Go", desc: "Find the best time to visit East Africa for Safari & More.", link: "#" },
  { icon: Umbrella, title: "Where to Stay", desc: "Unlock the best hotels and lodges in East Africa.", link: "#" },
];

const IntroSection = () => {
  return (
    <section className="py-20 bg-warm-cream">
      <div className="container mx-auto px-4">
        {/* Info cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {infoCards.map((card) => (
            <a
              key={card.title}
              href={card.link}
              className="group bg-card p-8 rounded-lg border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <card.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
            </a>
          ))}
        </div>

        {/* Intro text */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-3">What We Offer</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Meaningful Safaris — Lasting Impact
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            Thrilling game viewing and unforgettable encounters. For those seeking true adventure, our tours to Southern Tanzania or Western Tanzania will blow your mind. These pristine, untouched regions teem with wildlife, offering a chance to explore the unexplored bush and create lasting memories.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
