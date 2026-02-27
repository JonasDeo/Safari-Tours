import PageLayout from "@/components/PageLayout";
import { MapPin } from "lucide-react";
import tour1 from "@/assets/tour-1.jpg";
import tour3 from "@/assets/tour-3.jpg";
import tour4 from "@/assets/tour-4.jpg";
import beachImg from "@/assets/beach.jpg";

const destinations = [
  { name: "Tanzania Safari", desc: "Home to the Serengeti, Ngorongoro Crater, and Mt. Kilimanjaro. The ultimate safari destination.", image: tour1, parks: ["Serengeti", "Ngorongoro", "Tarangire", "Lake Manyara"] },
  { name: "Kenya Safari", desc: "Witness the Great Migration in the Maasai Mara and explore Amboseli with views of Kilimanjaro.", image: tour4, parks: ["Maasai Mara", "Amboseli", "Tsavo", "Lake Nakuru"] },
  { name: "Uganda Safari", desc: "Track mountain gorillas in Bwindi and explore the pearl of Africa's incredible biodiversity.", image: tour3, parks: ["Bwindi", "Queen Elizabeth", "Murchison Falls"] },
  { name: "Zanzibar & Beaches", desc: "Crystal-clear waters, white sandy beaches, and a rich cultural heritage await on this island paradise.", image: beachImg, parks: ["Stone Town", "Nungwi", "Mafia Island"] },
];

const DestinationsPage = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img src={tour1} alt="Safari destinations" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark-overlay/60" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sand mb-3 text-shadow-hero">Destinations</h1>
          <p className="font-body text-sand/70 text-lg">Explore East Africa's most spectacular safari regions</p>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 space-y-16">
          {destinations.map((dest, i) => (
            <div key={dest.name} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="overflow-hidden rounded-lg">
                  <img src={dest.image} alt={dest.name} className="w-full h-[350px] object-cover rounded-lg hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">{dest.name}</h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">{dest.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {dest.parks.map((park) => (
                    <span key={park} className="flex items-center gap-1 font-body text-sm bg-muted px-3 py-1.5 rounded-full text-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> {park}
                    </span>
                  ))}
                </div>
                <a href="#" className="inline-block font-body text-sm uppercase tracking-widest px-8 py-3.5 bg-primary text-primary-foreground hover:bg-terracotta-light transition-colors rounded-sm">
                  Explore {dest.name.split(" ")[0]}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default DestinationsPage;
