import PageLayout from "@/components/PageLayout";
import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import tour1 from "@/assets/tour-1.jpg";
import tour2 from "@/assets/tour-2.jpg";
import tour3 from "@/assets/tour-3.jpg";
import tour4 from "@/assets/tour-4.jpg";
import selfDriveImg from "@/assets/self-drive.jpg";
import guidedImg from "@/assets/guided-safari.jpg";
import kiliImg from "@/assets/kilimanjaro.jpg";
import beachImg from "@/assets/beach.jpg";

const allTours = [
  { title: "10 Days Best of Tanzania – Safari & Zanzibar Beach Escape", image: tour1, duration: "10 Days 9 Nights", location: "Arusha", price: "$3,800", tags: ["Beach Holiday", "Wildlife Adventure"] },
  { title: "7 Days Great Migration & Big Cats Safari – Serengeti & Ngorongoro", image: tour2, duration: "7 Days 6 Nights", location: "Arusha", price: "$3,200", tags: ["Wildlife Adventure"] },
  { title: "6 Days Tanzania Big Five & Cultural Experience Safari", image: tour3, duration: "6 Days 5 Nights", location: "Arusha", price: "$2,900", tags: ["Wildlife Adventure"] },
  { title: "8 Days Ultimate Wildebeest Migration & Big Five Safari", image: tour4, duration: "8 Days 7 Nights", location: "Arusha", price: "$3,800", tags: ["Wildlife Adventure"] },
  { title: "7 Days Big Five Safari & Tarangire Baobab Experience", image: guidedImg, duration: "7 Days 6 Nights", location: "Arusha", price: "$3,500", tags: ["Wildlife Adventure"] },
  { title: "6 Days Luxury Serengeti & Ngorongoro Fly-In Safari", image: selfDriveImg, duration: "6 Days 5 Nights", location: "Arusha", price: "$4,600", tags: ["Wildlife Adventure"] },
  { title: "6-Days Mount Kilimanjaro Trek – Machame Route", image: kiliImg, duration: "6 Days 5 Nights", location: "Moshi/Arusha", price: "$1,980", tags: ["Mountain Climbing"], oldPrice: "$2,280" },
  { title: "Beach Escape – Zanzibar Island Retreat", image: beachImg, duration: "5 Days 4 Nights", location: "Zanzibar", price: "$1,500", tags: ["Beach Holiday"] },
];

const ToursPage = () => {
  return (
    <PageLayout>
      {/* Hero banner */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img src={tour2} alt="Safari tours" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark-overlay/60" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sand mb-3 text-shadow-hero">Our Safari Experiences</h1>
          <p className="font-body text-sand/70 text-lg">Self-tested itineraries crafted for unforgettable adventures</p>
        </div>
      </section>

      {/* Tours grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <p className="font-body text-muted-foreground">{allTours.length} experiences available</p>
            <Link to="/contact" className="font-body text-sm text-primary hover:text-terracotta-light underline underline-offset-4 transition-colors">
              Request a Custom Plan
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allTours.map((tour) => (
              <div key={tour.title} className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {tour.tags.map((tag) => (
                      <span key={tag} className="bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-body px-2.5 py-1 rounded-sm">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{tour.title}</h3>
                  <div className="flex items-center gap-4 text-muted-foreground text-xs font-body mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {tour.duration}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {tour.location}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex items-baseline gap-2">
                    <span className="font-body text-xs text-muted-foreground">From</span>
                    {tour.oldPrice && <span className="font-body text-sm text-muted-foreground line-through">{tour.oldPrice}</span>}
                    <span className="font-display text-xl font-bold text-primary">{tour.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ToursPage;
