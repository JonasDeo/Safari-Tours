export interface FallbackTour {
  id: number;
  slug: string;
  title: string;
  destination: string;
  type: string;
  duration_days: number;
  price: number;
  currency: string;

  // OPTIONAL (important so UI doesn't crash)
  description?: string;
  highlights?: string[];
  itinerary?: { day: number; title: string; desc: string }[];

  // 👇 add these so TourDetail + TourCard don't break
  images?: any[];
  cover_image?: string | null;
  tags?: string[];
}

export const FALLBACK_TOURS: FallbackTour[] = [
  {
    id: 1,
    slug: "tanzania-safari-zanzibar",
    title: "10 Days Best of Tanzania – Safari & Zanzibar Beach Escape",
    destination: "Tanzania",
    type: "GUIDED",
    duration_days: 10,
    price: 3800,
    currency: "USD",
    description:
      "Experience Tanzania’s wildlife and Zanzibar’s beaches in one unforgettable journey.",
    highlights: ["Serengeti safari", "Ngorongoro crater", "Zanzibar beaches"],
    images: [],
    cover_image: null,
    tags: ["Safari", "Beach"],
  },
  {
    id: 2,
    slug: "great-migration-serengeti",
    title: "7 Days Great Migration & Big Cats Safari",
    destination: "Serengeti",
    type: "GUIDED",
    duration_days: 7,
    price: 3200,
    currency: "USD",
    description: "Witness the Great Migration and Africa’s iconic predators.",
    images: [],
    cover_image: null,
    tags: ["Wildlife"],
  },
  {
    id: 3,
    slug: "zanzibar-beach-holiday",
    title: "5 Days Zanzibar Beach Escape",
    destination: "Zanzibar",
    type: "BEACH",
    duration_days: 5,
    price: 1200,
    currency: "USD",
    description: "Relax on white sandy beaches and turquoise waters.",
    images: [],
    cover_image: null,
    tags: ["Beach"],
  },
  {
    id: 4,
    slug: "kilimanjaro-machame-route",
    title: "Kilimanjaro Trek — Machame Route",
    destination: "Kilimanjaro",
    type: "MOUNTAIN",
    duration_days: 7,
    price: 2470,
    currency: "USD",
    description: "Climb Africa’s highest peak via the scenic Machame route.",
    images: [],
    cover_image: null,
    tags: ["Mountain"],
  },
];