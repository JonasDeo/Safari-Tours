import tour1    from "@/assets/tour-1.jpg";
import tour3    from "@/assets/tour-3.jpg";
import tour4    from "@/assets/tour-4.jpg";
import beachImg from "@/assets/beach.jpg";

export interface Highlight {
  icon:  string;
  title: string;
  body:  string;
}

export interface Destination {
  slug:       string;
  name:       string;
  country:    string;
  tagline:    string;
  desc:       string;
  longDesc:   string;
  image:      string;
  parks:      string[];
  highlights: Highlight[];
  bestTime:   string;
  duration:   string;
}

export const DESTINATIONS: Destination[] = [
  {
    slug:     "tanzania",
    name:     "Tanzania Safari",
    country:  "Tanzania",
    tagline:  "The Heart of the Wild",
    desc:     "Home to the Serengeti, Ngorongoro Crater, and Mt. Kilimanjaro. The ultimate safari destination.",
    longDesc: "Tanzania is the crown jewel of African safari. The endless plains of the Serengeti host the world-famous Great Migration — over two million wildebeest, zebra, and gazelle moving in a relentless cycle of life. The Ngorongoro Crater, a UNESCO World Heritage Site, shelters one of the densest concentrations of wildlife on earth within its ancient volcanic walls. Add Tarangire's giant elephant herds, the flamingo-fringed shores of Lake Manyara, and the snow-capped summit of Kilimanjaro, and Tanzania delivers an experience that cannot be replicated anywhere else on the planet.",
    image:    tour1,
    parks:    ["Serengeti", "Ngorongoro", "Tarangire", "Lake Manyara", "Ruaha", "Selous"],
    highlights: [
      { icon: "Footprints", title: "Great Migration",   body: "Witness two million animals crossing the Mara River in one of nature's greatest spectacles." },
      { icon: "Mountain",   title: "Ngorongoro Crater", body: "Descend into a lost world — the world's largest intact volcanic caldera teeming with the Big Five." },
      { icon: "TrendingUp", title: "Mt. Kilimanjaro",   body: "Africa's highest peak rises dramatically from the savanna, offering treks for all levels." },
      { icon: "Trees",      title: "Elephant Country",  body: "Tarangire hosts some of Africa's largest elephant herds, especially dramatic in dry season." },
    ],
    bestTime: "June – October · January – February",
    duration: "7 – 14 days recommended",
  },
  {
    slug:     "kenya",
    name:     "Kenya Safari",
    country:  "Kenya",
    tagline:  "Where Legends Roam",
    desc:     "Witness the Great Migration in the Maasai Mara and explore Amboseli with views of Kilimanjaro.",
    longDesc: "Kenya is where the classic African safari was born. The Maasai Mara delivers year-round big-cat sightings and hosts the northern arc of the Great Migration each July to October. Amboseli offers the iconic image of elephant herds drifting beneath the snow-capped silhouette of Kilimanjaro. From the flamingo-pink shores of Lake Nakuru to the remote bush of Tsavo, every region has a completely different character.",
    image:    tour4,
    parks:    ["Maasai Mara", "Amboseli", "Tsavo East", "Tsavo West", "Lake Nakuru", "Samburu"],
    highlights: [
      { icon: "Crosshair", title: "Big Cat Capital", body: "The Mara has the highest density of lion and leopard sightings in Africa." },
      { icon: "Camera",    title: "Amboseli & Kili", body: "Photograph elephant herds with Kilimanjaro's glacier summit as a breathtaking backdrop." },
      { icon: "Waves",     title: "Lake Nakuru",     body: "Millions of flamingos turn the lake pink — a surreal and unforgettable sight." },
      { icon: "Users",     title: "Maasai Culture",  body: "Visit authentic Maasai villages and experience one of Africa's most iconic living cultures." },
    ],
    bestTime: "July – October · January – February",
    duration: "6 – 12 days recommended",
  },
  {
    slug:     "uganda",
    name:     "Uganda Safari",
    country:  "Uganda",
    tagline:  "The Pearl of Africa",
    desc:     "Track mountain gorillas in Bwindi and explore the pearl of Africa's incredible biodiversity.",
    longDesc: "Uganda is Africa's most underrated destination — and its most rewarding. Bwindi Impenetrable Forest shelters half the world's remaining mountain gorillas; a permit to track them is one of the most profound wildlife encounters on earth. Chimpanzees swing through Kibale Forest, tree-climbing lions lounge in Queen Elizabeth National Park, and Murchison Falls sends the entire force of the Nile crashing through a seven-metre gap in the rock.",
    image:    tour3,
    parks:    ["Bwindi", "Queen Elizabeth", "Murchison Falls", "Kibale", "Kidepo Valley"],
    highlights: [
      { icon: "Binoculars", title: "Gorilla Trekking",   body: "Spend a life-changing hour with a mountain gorilla family in Bwindi Impenetrable Forest." },
      { icon: "Search",     title: "Chimp Tracking",     body: "Kibale Forest has the highest density of primates in Africa." },
      { icon: "Droplets",   title: "Murchison Falls",    body: "Watch the Nile explode through a narrow gorge — one of the most powerful waterfalls on earth." },
      { icon: "SunMedium",  title: "Tree-Climbing Lions",body: "Queen Elizabeth's lions lounge in fig trees — a unique and rarely-seen behaviour." },
    ],
    bestTime: "June – September · December – February",
    duration: "8 – 14 days recommended",
  },
  {
    slug:     "zanzibar",
    name:     "Zanzibar & Beaches",
    country:  "Zanzibar",
    tagline:  "Island of Spices & Sea",
    desc:     "Crystal-clear waters, white sandy beaches, and a rich cultural heritage await on this island paradise.",
    longDesc: "Zanzibar is the perfect counterpoint to a mainland safari — a spice-scented archipelago where the Indian Ocean laps at powder-white beaches and the ancient lanes of Stone Town reveal a layered history of Arab, Persian, Indian, and African influences. Snorkel alongside sea turtles at Mnemba Atoll, lose yourself in UNESCO-listed Stone Town, or simply watch the sun set over the dhow-dotted sea.",
    image:    beachImg,
    parks:    ["Stone Town", "Nungwi Beach", "Kendwa", "Mnemba Atoll", "Mafia Island", "Pemba Island"],
    highlights: [
      { icon: "Umbrella", title: "White Sand Beaches", body: "Nungwi and Kendwa are among the finest beaches in the Indian Ocean — pristine and uncrowded." },
      { icon: "Fish",     title: "Mnemba Atoll",       body: "World-class diving with sea turtles, dolphins, and vibrant coral gardens." },
      { icon: "Landmark", title: "Stone Town",          body: "A UNESCO World Heritage Site of winding alleys and centuries of Swahili history." },
      { icon: "Wind",     title: "Spice Tours",         body: "Follow your nose through clove, vanilla, and nutmeg plantations." },
    ],
    bestTime: "June – October · December – February",
    duration: "4 – 10 days recommended",
  },
];

export const getDestination = (slug: string) =>
  DESTINATIONS.find((d) => d.slug === slug);