import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import tour1 from "@/assets/tour-1.jpg";
import tour2 from "@/assets/tour-2.jpg";
import tour3 from "@/assets/tour-3.jpg";
import tour4 from "@/assets/tour-4.jpg";

const tours = [
  {
    title: "10 Days Best of Tanzania – Safari & Zanzibar Beach Escape",
    image: tour1,
    duration: "10 Days 9 Nights",
    location: "Arusha",
    price: "$3,800",
    tags: ["Beach Holiday", "Wildlife Adventure"],
  },
  {
    title: "7 Days Great Migration & Big Cats Safari – Serengeti & Ngorongoro",
    image: tour2,
    duration: "7 Days 6 Nights",
    location: "Arusha",
    price: "$3,200",
    tags: ["Wildlife Adventure"],
  },
  {
    title: "6 Days Tanzania Big Five & Cultural Experience Safari",
    image: tour3,
    duration: "6 Days 5 Nights",
    location: "Arusha",
    price: "$2,900",
    tags: ["Wildlife Adventure"],
  },
  {
    title: "8 Days Ultimate Wildebeest Migration & Big Five Safari",
    image: tour4,
    duration: "8 Days 7 Nights",
    location: "Arusha",
    price: "$3,800",
    tags: ["Wildlife Adventure"],
  },
];

const ToursSection = () => {
  return (
    <section id="tours" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-3">
            Self Tested Itineraries!
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Signature Safari Experiences
          </h2>
          <a href="#" className="font-body text-sm text-primary hover:text-terracotta-light transition-colors underline underline-offset-4">
            Request a Custom Plan
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.title}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {tour.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-body px-2.5 py-1 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {tour.title}
                </h3>
                <div className="flex items-center gap-4 text-muted-foreground text-xs font-body mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {tour.duration}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {tour.location}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <span className="font-body text-xs text-muted-foreground">From</span>
                  <span className="font-display text-xl font-bold text-primary ml-1">{tour.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/tours"
            className="inline-block font-body text-sm uppercase tracking-widest px-10 py-4 bg-secondary text-secondary-foreground hover:bg-olive-light transition-colors rounded-sm"
          >
            View All Safari Experiences
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
