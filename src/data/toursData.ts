// Single source of truth for fallback tours — used by ToursSection, ToursPage, and TourDetail

import maranguRouteImg from "@/assets/Marangu-Route-Map.jpg";
import machameRouteImg from "@/assets/Machame-Route-Map.avif";
import lemoshoRouteImg from "@/assets/Lemosho-Route-Map.avif";


export interface ItineraryDay { day: number; title: string; desc: string; }

export interface Tour {
  id:                 number;
  slug:               string;
  title:              string;
  destination:        string;
  type:               string;
  duration_days:      number;
  duration?:          string;
  price:              number;
  price_from?:        number;
  currency:           string;
  cover_image:        string | null;
  images:             any[];
  excerpt:            string | null;
  description:        string | null;
  departure_location: string | null;
  return_location:    string | null;
  highlights:         string[] | null;
  included:           string[] | null;
  excluded:           string[] | null;
  itinerary:          ItineraryDay[] | null;
  tags:               string[] | null;
  published:          boolean;
}

export const FALLBACK_TOURS: Tour[] = [
  {
    id:                 1,
    slug:               "tanzania-safari-zanzibar",
    title:              "10 Days Best of Tanzania – Safari & Zanzibar Beach Escape",
    destination:        "Arusha",
    type:               "GUIDED",
    duration_days:      10,
    duration:           "10 Days 9 Nights",
    price:              3800,
    price_from:         3800,
    currency:           "USD",
    cover_image:        "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    images:             [],
    excerpt:            "Experience the best of Tanzania — from the Serengeti plains to the spice islands of Zanzibar.",
    description:        "This 10-day journey combines Tanzania's greatest safari destinations with a relaxing beach finale on Zanzibar. You'll explore the vast Serengeti, descend into the Ngorongoro Crater, and unwind on pristine white-sand beaches.",
    departure_location: "Arusha",
    return_location:    "Zanzibar",
    highlights: [
      "Serengeti National Park game drives",
      "Ngorongoro Crater descent",
      "Tarangire elephant herds",
      "Zanzibar spice tour",
      "Indian Ocean snorkelling",
    ],
    included: [
      "All park fees and conservancy levies",
      "Full-board accommodation throughout",
      "Professional guide and 4×4 safari vehicle",
      "Domestic flights (Arusha–Zanzibar)",
      "Airport transfers",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Tips and gratuities",
      "Personal expenses",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Arusha",            desc: "Meet your guide and transfer to your lodge for an orientation briefing." },
      { day: 2, title: "Tarangire National Park",       desc: "Full day exploring Tarangire — famous for its enormous elephant herds and baobab-dotted landscapes." },
      { day: 3, title: "Serengeti — Central Plains",    desc: "Enter the Serengeti and begin game drives across the iconic short-grass plains." },
      { day: 4, title: "Serengeti — Full Day Safari",   desc: "Dedicated full day in the Serengeti with morning and afternoon game drives." },
      { day: 5, title: "Ngorongoro Crater",             desc: "Descend 600m into the world's largest intact volcanic caldera for a spectacular big-five encounter." },
      { day: 6, title: "Lake Manyara",                  desc: "Visit Lake Manyara, home to tree-climbing lions and thousands of flamingos." },
      { day: 7, title: "Fly to Zanzibar",               desc: "Morning flight to Zanzibar. Afternoon at leisure on the beach." },
      { day: 8, title: "Zanzibar Spice Tour & Stone Town", desc: "Explore the aromatic spice farms and the historic labyrinth of Stone Town." },
      { day: 9, title: "Beach & Water Activities",      desc: "Free day for snorkelling, diving, or simply relaxing on the white-sand shores." },
      { day: 10, title: "Departure",                    desc: "Transfer to Zanzibar airport for your onward journey." },
    ],
    tags:      ["Beach Holiday", "Wildlife Adventure"],
    published: true,
  },
  {
    id:                 2,
    slug:               "great-migration-serengeti",
    title:              "7 Days Great Migration & Big Cats Safari",
    destination:        "Arusha",
    type:               "GUIDED",
    duration_days:      7,
    duration:           "7 Days 6 Nights",
    price:              3200,
    price_from:         3200,
    currency:           "USD",
    cover_image:        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
    images:             [],
    excerpt:            "Witness over a million wildebeest thunder across the Serengeti in nature's greatest spectacle.",
    description:        "Follow the Great Migration through the Serengeti ecosystem. Time your visit for river crossings, and spend dedicated time tracking the resident prides of lions, leopards, and cheetahs.",
    departure_location: "Arusha",
    return_location:    "Arusha",
    highlights: [
      "Great Migration river crossings",
      "Big cats — lions, leopards, cheetahs",
      "Balloon safari over the Serengeti (optional)",
      "Ngorongoro Crater visit",
      "Expert naturalist guide",
    ],
    included: [
      "All park and conservation fees",
      "Full-board tented camp accommodation",
      "Professional guide and 4×4 safari vehicle",
      "Airport transfers",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Optional balloon safari",
      "Tips and gratuities",
    ],
    itinerary: [
      { day: 1, title: "Arusha Arrival",              desc: "Welcome briefing and overnight at a comfortable Arusha lodge." },
      { day: 2, title: "Drive to Serengeti",          desc: "Early morning departure through the Ngorongoro Conservation Area en route to the Serengeti." },
      { day: 3, title: "Central Serengeti",           desc: "Full-day game drives in the Seronera Valley, rich in resident predators year-round." },
      { day: 4, title: "Migration Zones",             desc: "Track the migration herds — location varies by season for optimal sightings." },
      { day: 5, title: "River Crossing",              desc: "Position at a Mara River crossing point and wait for the dramatic wildebeest plunge." },
      { day: 6, title: "Ngorongoro Crater",           desc: "Descend into the crater for a full day of big-five game viewing." },
      { day: 7, title: "Return to Arusha & Depart",  desc: "Morning game drive before driving back to Arusha for your departure flight." },
    ],
    tags:      ["Wildlife Adventure"],
    published: true,
  },
  {
    id:                 3,
    slug:               "big-five-cultural-safari",
    title:              "6 Days Tanzania Big Five & Cultural Experience Safari",
    destination:        "Arusha",
    type:               "GUIDED",
    duration_days:      6,
    duration:           "6 Days 5 Nights",
    price:              2900,
    price_from:         2900,
    currency:           "USD",
    cover_image:        "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800",
    images:             [],
    excerpt:            "Encounter the Big Five and immerse yourself in authentic Maasai culture.",
    description:        "A perfectly balanced safari that pairs big-five game viewing in Tarangire and the Ngorongoro Crater with a genuine Maasai village visit and a walk through Arusha's vibrant local market.",
    departure_location: "Arusha",
    return_location:    "Arusha",
    highlights: [
      "Big Five sightings",
      "Maasai boma cultural visit",
      "Ngorongoro Crater full-day",
      "Tarangire elephant herds",
      "Local Arusha market tour",
    ],
    included: [
      "All park and conservancy fees",
      "Full-board accommodation",
      "Professional guide and safari vehicle",
      "Cultural visit fees",
      "Airport transfers",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Tips and gratuities",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Arusha Market",    desc: "Arrive in Arusha and explore the local market with your guide." },
      { day: 2, title: "Tarangire National Park",    desc: "Game drives through Tarangire — legendary for its elephant concentration." },
      { day: 3, title: "Maasai Village & Drive",     desc: "Morning Maasai boma visit, afternoon drive to Ngorongoro rim." },
      { day: 4, title: "Ngorongoro Crater",          desc: "Full descent into the crater for an incredible big-five experience." },
      { day: 5, title: "Lake Manyara",               desc: "Explore Lake Manyara's tree-climbing lions and vibrant birdlife." },
      { day: 6, title: "Return to Arusha",           desc: "Scenic morning drive back to Arusha for departures." },
    ],
    tags:      ["Wildlife Adventure"],
    published: true,
  },
  {
    id:                 4,
    slug:               "zanzibar-beach-holiday",
    title:              "5 Days Zanzibar Beach Escape & Island Experience",
    destination:        "Zanzibar",
    type:               "BEACH",
    duration_days:      5,
    duration:           "5 Days 4 Nights",
    price:              1200,
    price_from:         1200,
    currency:           "USD",
    cover_image:        "https://images.unsplash.com/photo-1549035092-33b2937b075a?w=600&auto=format&fit=crop&q=60",
    images:             [],
    excerpt:            "White sand, turquoise water, and the spice-scented air of Stone Town — pure island bliss.",
    description:        "Escape to the Zanzibar archipelago for five days of Indian Ocean luxury. Explore the UNESCO-listed Stone Town, tour fragrant spice farms, and snorkel over colourful coral reefs.",
    departure_location: "Zanzibar",
    return_location:    "Zanzibar",
    highlights: [
      "Stone Town UNESCO heritage walk",
      "Spice farm tour",
      "Snorkelling at Mnemba Atoll",
      "Sunset dhow cruise",
      "Pristine beach relaxation",
    ],
    included: [
      "4 nights beach resort accommodation",
      "Daily breakfast",
      "Stone Town and spice tour",
      "Snorkelling excursion",
      "Dhow sunset cruise",
      "Airport transfers",
    ],
    excluded: [
      "International and domestic flights",
      "Visa fees",
      "Travel insurance",
      "Lunches and dinners",
      "Tips and gratuities",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Stone Town",       desc: "Land in Zanzibar and spend the afternoon wandering the narrow streets of historic Stone Town." },
      { day: 2, title: "Spice Farm Tour",            desc: "Morning tour of a traditional spice plantation — taste and smell cinnamon, cloves, vanilla, and more." },
      { day: 3, title: "Snorkelling at Mnemba",      desc: "Boat trip to Mnemba Atoll for world-class snorkelling with turtles and vibrant reef fish." },
      { day: 4, title: "Beach Day & Dhow Cruise",    desc: "Free beach day followed by a sunset dhow cruise along the coast." },
      { day: 5, title: "Departure",                  desc: "Leisurely breakfast before transfer to Zanzibar International Airport." },
    ],
    tags:      ["Beach Holiday", "Island Escape", "Relaxation"],
    published: true,
  },
  {
    id: 5,
    slug: "kilimanjaro-marangu-route",
    title: "6 Days Kilimanjaro Marangu Route",
    destination: "Mount Kilimanjaro",
    type: "MOUNTAIN",
    duration_days: 6,
    duration: "6 Days 5 Nights",
    price: 2130,
    price_from: 2130,
    currency: "USD",
    cover_image: maranguRouteImg,
    images: [
      // Route map
      maranguRouteImg,
      // Marangu Gate rainforest entry
      "https://images.unsplash.com/photo-1621414050946-1b3bc24b2e92?w=800&auto=format&fit=crop&q=80",
      // Kilimanjaro mountain aerial / snowcap
      "https://images.unsplash.com/photo-1609198093458-f2c6a0e2e21f?w=800&auto=format&fit=crop&q=80",
      // Trekkers hiking on Kilimanjaro trail
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&auto=format&fit=crop&q=80",
      // Uhuru Peak summit sign / crater rim
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=800&auto=format&fit=crop&q=80",
    ],
    excerpt: "The classic 'Coca-Cola' route — the only Kilimanjaro route with hut accommodation.",
    description: "The Marangu Route is the oldest and most established route on Mount Kilimanjaro. It is the only route that offers sleeping huts instead of camping, making it ideal for trekkers seeking more comfort.",
    departure_location: "Moshi",
    return_location: "Moshi",
    highlights: [
      "Comfortable hut accommodation",
      "Gradual ascent profile",
      "Best for beginners",
      "Scenic rainforest and alpine desert zones",
    ],
    included: [
      "Park fees",
      "Professional mountain guides and porters",
      "All meals during trek",
      "Hut accommodation",
      "Airport transfers",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Tips and gratuities",
    ],
    itinerary: [
      { day: 1, title: "Marangu Gate to Mandara Hut", desc: "Hike through lush rainforest to Mandara Hut." },
      { day: 2, title: "Mandara Hut to Horombo Hut",  desc: "Ascend to moorland zone with great views." },
      { day: 3, title: "Acclimatization Day",          desc: "Short hikes around Horombo for acclimatization." },
      { day: 4, title: "Horombo to Kibo Hut",          desc: "Cross alpine desert to Kibo base camp." },
      { day: 5, title: "Summit & Descend",             desc: "Midnight summit attempt to Uhuru Peak, descend to Horombo." },
      { day: 6, title: "Return to Gate",               desc: "Descend to Marangu Gate and transfer to Moshi." },
    ],
    tags: ["Kilimanjaro", "Beginner Friendly"],
    published: true,
  },
  {
    id: 6,
    slug: "kilimanjaro-machame-route",
    title: "7 Days Kilimanjaro Machame Route",
    destination: "Mount Kilimanjaro",
    type: "MOUNTAIN",
    duration_days: 7,
    duration: "7 Days 6 Nights",
    price: 2470,
    price_from: 2470,
    currency: "USD",
    cover_image: machameRouteImg,
    images: [
      // Route map
      machameRouteImg,
      // Kilimanjaro from afar / classic wide shot
      "https://images.unsplash.com/photo-1568259547325-f08f48165cda?w=800&auto=format&fit=crop&q=80",
      // Barranco Wall scramble / rocky ridge
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&auto=format&fit=crop&q=80",
      // Trekkers above cloud layer
      "https://images.unsplash.com/photo-1609198093458-f2c6a0e2e21f?w=800&auto=format&fit=crop&q=80",
      // Summit / Uhuru Peak crater rim
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=800&auto=format&fit=crop&q=80",
    ],
    excerpt: "The most popular route — scenic, challenging, and with high summit success rates.",
    description: "The Machame Route, also known as the 'Whiskey Route', is the most popular Kilimanjaro route. It offers stunning scenery and excellent acclimatization through its climb-high, sleep-low profile.",
    departure_location: "Moshi",
    return_location: "Moshi",
    highlights: [
      "Most scenic Kilimanjaro route",
      "High summit success rate",
      "Barranco Wall adventure",
      "Diverse landscapes",
    ],
    included: [
      "Park fees",
      "Professional guides and porters",
      "Camping equipment",
      "All meals",
      "Airport transfers",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Tips",
    ],
    itinerary: [
      { day: 1, title: "Machame Gate to Camp", desc: "Trek through rainforest." },
      { day: 2, title: "Shira Plateau",        desc: "Ascend into moorland zone." },
      { day: 3, title: "Lava Tower",           desc: "Acclimatization hike." },
      { day: 4, title: "Barranco Wall",        desc: "Climb the famous wall." },
      { day: 5, title: "Karanga Camp",         desc: "Short acclimatization day." },
      { day: 6, title: "Summit Attempt",       desc: "Climb to Uhuru Peak." },
      { day: 7, title: "Descent",              desc: "Return to base." },
    ],
    tags: ["Kilimanjaro", "Popular"],
    published: true,
  },
  {
    id: 7,
    slug: "kilimanjaro-lemosho-route",
    title: "8 Days Kilimanjaro Lemosho Route",
    destination: "Mount Kilimanjaro",
    type: "MOUNTAIN",
    duration_days: 8,
    duration: "8 Days 7 Nights",
    price: 2585,
    price_from: 2585,
    currency: "USD",
    cover_image: lemoshoRouteImg,
    images: [
      // Route map
      lemoshoRouteImg,
      // Western rainforest / Londorossi Gate area
      "https://images.unsplash.com/photo-1621414050946-1b3bc24b2e92?w=800&auto=format&fit=crop&q=80",
      // Shira Plateau wide open moorland
      "https://images.unsplash.com/photo-1568259547325-f08f48165cda?w=800&auto=format&fit=crop&q=80",
      // Above the clouds on Kilimanjaro
      "https://images.unsplash.com/photo-1609198093458-f2c6a0e2e21f?w=800&auto=format&fit=crop&q=80",
      // Uhuru Peak / summit glacier
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=800&auto=format&fit=crop&q=80",
    ],
    excerpt: "The most scenic and least crowded route — best for acclimatization.",
    description: "Tour Overview One of the newest routes on Kilimanjaro, Lemosho takes its start at Londorossi Gate on the western face of Mount Kilimanjaro. It was opened in the early 2000s to relieve Marangu and Machame routes from traffic and open the western parts of the Mountain to international tourists. Together with Rongai, Lemosho is one of the most remote routes on Kilimanjaro. It takes around 3-4 hours to get to the trailhead from Moshi and 5-6 if driving from Arusha. That is why the prices for Kilimanjaro trips through Lemosho route are usually slightly higher. Many professional climbers describe Lemosho as the most scenic route on Mount Kilimanjaro.",
    departure_location: "Moshi",
    return_location: "Moshi",
    highlights: [
      "Best scenery on Kilimanjaro",
      "Low traffic at start",
      "Excellent acclimatization",
      "High summit success rate",
    ],
    included: [
      "Park fees",
      "Guides and porters",
      "Camping gear",
      "Meals",
      "Transfers",
    ],
    excluded: [
      "Flights",
      "Visa",
      "Insurance",
      "Tips",
    ],
    itinerary: [
      { day: 1, title: "Lemosho Gate",    desc: "Start through rainforest." },
      { day: 2, title: "Shira Plateau",   desc: "Wide open views." },
      { day: 3, title: "Mooreland Trek",  desc: "Gentle acclimatization." },
      { day: 4, title: "Lava Tower",      desc: "Climb high sleep low." },
      { day: 5, title: "Barranco Camp",   desc: "Great scenery." },
      { day: 6, title: "Karanga Camp",    desc: "Prepare for summit." },
      { day: 7, title: "Summit",          desc: "Reach Uhuru Peak." },
      { day: 8, title: "Descent",         desc: "Return to gate." },
    ],
    tags: ["Kilimanjaro", "Premium"],
    published: true,
  },
];