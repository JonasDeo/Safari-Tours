import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Caroline M.",
    location: "Canada",
    initials: "CM",
    color: "from-amber-700 to-amber-500",
    text: "As a solo traveler, I wanted the safety and comfort of a guided safari. Balbina Safari matched me with a kind, professional guide and a personalized itinerary that hit every spot I dreamed of.",
  },
  {
    name: "Nasser & Leila",
    location: "Oman",
    initials: "NL",
    color: "from-teal-700 to-teal-500",
    text: "We chose a Balbina safari for our family of five, and it was flawless. The guide was fantastic with our kids, adjusting the pace and keeping things engaging. Tanzania stole our hearts.",
  },
  {
    name: "Sophie & Daniel",
    location: "Germany",
    initials: "SD",
    color: "from-stone-600 to-stone-400",
    text: "We saw all the Big Five in just four days! Our guide was patient, knowledgeable, and had an amazing eye for spotting animals. We felt like VIPs from start to finish.",
  },
  {
    name: "Lisa",
    location: "UK",
    initials: "LI",
    color: "from-rose-700 to-rose-500",
    text: "I was nervous about a self-drive safari, but Balbina Safari made it incredibly easy and safe. The car was in excellent condition, the team checked in regularly, and their itinerary suggestions were spot on.",
  },
  {
    name: "Alex & Jordan",
    location: "USA",
    initials: "AJ",
    color: "from-sky-700 to-sky-500",
    text: "Our self-drive safari through Tanzania was the most unforgettable trip we've ever taken. Everything was seamless, from the route planning to the vehicle. Highly recommended!",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            What Our Travellers Say
          </h2>
          <p className="font-body text-muted-foreground">
            The Perfect Balance of Adventure, Connection, and Comfort.
          </p>
        </div>

        <div className="max-w-2xl mx-auto text-center">

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${t.color}
                flex items-center justify-center shadow-lg ring-4 ring-background
                transition-all duration-300`}
            >
              <span className="font-display text-xl font-bold text-white tracking-wide">
                {t.initials}
              </span>
            </div>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>

          <blockquote className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed italic mb-8 min-h-[100px]">
            "{t.text}"
          </blockquote>

          <p className="font-display text-lg font-semibold text-foreground">{t.name}</p>
          <p className="font-body text-sm text-muted-foreground">{t.location}</p>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <span className="font-body text-sm text-muted-foreground">
              {current + 1} / {testimonials.length}
            </span>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;