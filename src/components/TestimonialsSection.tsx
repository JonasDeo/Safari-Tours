import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Caroline M.",
    location: "Canada",
    text: "As a solo traveler, I wanted the safety and comfort of a guided safari. Balbina Safari matched me with a kind, professional guide and a personalized itinerary that hit every spot I dreamed of.",
  },
  {
    name: "Nasser & Leila",
    location: "Oman",
    text: "We chose a Balbina safari for our family of five, and it was flawless. The guide was fantastic with our kids, adjusting the pace and keeping things engaging. Tanzania stole our hearts.",
  },
  {
    name: "Sophie & Daniel",
    location: "Germany",
    text: "We saw all the Big Five in just four days! Our guide was patient, knowledgeable, and had an amazing eye for spotting animals. We felt like VIPs from start to finish.",
  },
  {
    name: "Lisa",
    location: "UK",
    text: "I was nervous about a self-drive safari, but Balbina Safari made it incredibly easy and safe. The car was in excellent condition, the team checked in regularly, and their itinerary suggestions were spot on.",
  },
  {
    name: "Alex & Jordan",
    location: "USA",
    text: "Our self-drive safari through Tanzania was the most unforgettable trip we've ever taken. Everything was seamless, from the route planning to the vehicle. Highly recommended!",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            What Our Travellers Say
          </h2>
          <p className="font-body text-muted-foreground">
            The Perfect Balance of Adventure, Connection, and Comfort.
          </p>
        </div>

        <div className="max-w-2xl mx-auto text-center">
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

          <div className="flex items-center justify-center gap-4 mt-8">
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
