export interface FallbackTour {
  id: number;
  slug: string;
  title: string;
  destination: string;
  type: string;
  duration_days: number;
  price: number;
  currency: string;

  departure_location?: string | null;
  return_location?: string | null;
  excerpt?: string | null;
  description?: string | null;
  highlights?: string[] | null;
  included?: string[] | null;
  excluded?: string[] | null;
  itinerary?: { day: number; title: string; desc: string }[] | null;
  images?: any[];
  cover_image?: string | null;
  tags?: string[] | null;
  published?: boolean;
}

export const FALLBACK_TOURS: FallbackTour[] = [
  {
    id: 1,
    slug: "serengeti-migration-ngorongoro",
    title: "Serengeti Migration & Ngorongoro Crater Safari",
    destination: "Tanzania",
    type: "GUIDED",
    duration_days: 7,
    price: 3200,
    currency: "USD",
    departure_location: "Arusha, Tanzania",
    return_location: "Arusha, Tanzania",
    excerpt: "Witness the Great Migration and descend into the world's largest intact volcanic caldera on this classic northern Tanzania circuit.",
    description: "This 7-day safari covers the two crown jewels of Tanzania. Begin in Arusha before heading to the Serengeti, where over two million wildebeest thunder across the plains in an endless cycle. Then descend into the Ngorongoro Crater — a UNESCO World Heritage Site and one of the best places on earth to spot all Big Five in a single day.\n\nYour guide will position the vehicle at the best vantage points and share deep knowledge of the ecosystem. All accommodation is full-board inside or adjacent to the parks.",
    highlights: [
      "Witness the Great Migration in the Serengeti",
      "Descend into the Ngorongoro Crater",
      "Big Five game drives daily",
      "Sundowner drinks on the Serengeti plains",
      "Expert local guide throughout"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Arusha", desc: "Meet & greet at Kilimanjaro Airport and transfer to Arusha for briefing and overnight." },
      { day: 2, title: "Arusha to Serengeti", desc: "Morning drive to Serengeti National Park with afternoon game drive." },
      { day: 3, title: "Full Day Serengeti", desc: "Explore the Central and Western corridors of the Serengeti." },
      { day: 4, title: "Serengeti to Ngorongoro", desc: "Morning game drive then transfer to Ngorongoro Crater rim." },
      { day: 5, title: "Ngorongoro Crater", desc: "Full day game drive inside the crater with Big Five focus." },
      { day: 6, title: "Tarangire National Park", desc: "Explore Tarangire with its large elephant herds and ancient baobabs." },
      { day: 7, title: "Return to Arusha", desc: "Morning drive back to Arusha with departure transfer." }
    ],
    included: [
      "All accommodation on full board basis",
      "All park fees and conservation charges",
      "Professional English-speaking guide",
      "4x4 safari vehicle with pop-up roof",
      "Airport transfers",
      "Bottled drinking water during game drives"
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Tips and gratuities",
      "Alcoholic beverages",
      "Travel insurance",
      "Personal expenses"
    ],
    tags: ["Wildlife", "Big Five", "Migration", "Serengeti", "Ngorongoro"],
    published: true
  },
  {
    id: 2,
    slug: "kilimanjaro-machame-route",
    title: "Kilimanjaro Trek — Machame Route",
    destination: "Kilimanjaro",
    type: "MOUNTAIN",
    duration_days: 7,
    price: 2470,
    currency: "USD",
    departure_location: "Moshi, Tanzania",
    return_location: "Moshi, Tanzania",
    excerpt: "Conquer Africa's highest peak via the scenic Machame 'Whiskey' route — the most popular path to Uhuru Peak at 5,895m.",
    description: "The Machame Route is widely regarded as the most scenic path up Kilimanjaro, passing through five distinct climate zones from rainforest to arctic summit. The 7-day itinerary allows for superior acclimatisation compared to shorter routes, significantly improving your summit success rate.\n\nOur experienced mountain guides and full porter team handle all logistics so you can focus entirely on the climb.",
    highlights: [
      "Summit Uhuru Peak at 5,895m",
      "Pass through five distinct climate zones",
      "Superior acclimatisation schedule",
      "Full porter and guide support team",
      "Certificate of completion upon summit"
    ],
    itinerary: [
      { day: 1, title: "Moshi to Machame Gate", desc: "Drive to Machame Gate and trek through rainforest to Machame Camp." },
      { day: 2, title: "Machame to Shira Plateau", desc: "Ascend to the Shira Plateau with stunning views." },
      { day: 3, title: "Shira to Lava Tower", desc: "Acclimatisation day via Lava Tower to Barranco Camp." },
      { day: 4, title: "Barranco Wall to Karanga", desc: "Climb the famous Barranco Wall." },
      { day: 5, title: "Karanga to Barafu Camp", desc: "Trek to the base camp for summit night." },
      { day: 6, title: "Summit Day & Descent", desc: "Midnight summit attempt to Uhuru Peak then descend to Mweka Camp." },
      { day: 7, title: "Mweka Camp to Moshi", desc: "Final descent to Mweka Gate and transfer back to Moshi." }
    ],
    included: [
      "All meals while on the mountain",
      "Professional mountain guides & porters",
      "Camping equipment (tents, sleeping mats)",
      "All park fees and rescue fees",
      "Transfers to/from the mountain",
      "Oxygen cylinder and first aid kit"
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Personal climbing gear",
      "Tips for guides and porters",
      "Travel insurance"
    ],
    tags: ["Kilimanjaro", "Trekking", "Mountain", "Adventure", "Uhuru Peak"],
    published: true
  },
  {
    id: 3,
    slug: "zanzibar-beach-escape",
    title: "Zanzibar Beach Escape",
    destination: "Zanzibar",
    type: "BEACH",
    duration_days: 5,
    price: 1200,
    currency: "USD",
    departure_location: "Zanzibar Airport",
    return_location: "Zanzibar Airport",
    excerpt: "Unwind on the white sands of Zanzibar — snorkel coral reefs, explore Stone Town, and watch the sun set over the Indian Ocean.",
    description: "After the dust and drama of safari, Zanzibar is the perfect reset. Five days of white sand beaches, turquoise water, and rich Swahili culture. Stay in a boutique hotel on the north coast, take a spice tour, and lose yourself in the narrow streets of Stone Town — a UNESCO World Heritage Site.",
    highlights: [
      "North coast white sand beaches",
      "Stone Town guided walking tour",
      "Spice plantation tour",
      "Snorkelling at Mnemba Atoll",
      "Sunset dhow cruise"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Zanzibar", desc: "Transfer to beach resort and afternoon at leisure." },
      { day: 2, title: "Stone Town & Spice Tour", desc: "Guided tour of Stone Town and visit to a spice plantation." },
      { day: 3, title: "Beach Relaxation", desc: "Full beach day with optional water sports." },
      { day: 4, title: "Dolphin Tour & Snorkelling", desc: "Boat trip to Kizimkazi for dolphin watching and snorkelling." },
      { day: 5, title: "Departure", desc: "Morning at leisure before airport transfer." }
    ],
    included: [
      "Boutique hotel accommodation",
      "Daily breakfast",
      "Stone Town guided tour",
      "Spice plantation tour",
      "Airport transfers"
    ],
    excluded: [
      "International flights",
      "Lunch and dinner",
      "Optional activities",
      "Tips and personal expenses"
    ],
    tags: ["Beach", "Zanzibar", "Relaxation", "Snorkelling", "Island"],
    published: true
  },
  {
    id: 4,
    slug: "self-drive-northern-circuit",
    title: "Tanzania Self-Drive Safari — Northern Circuit",
    destination: "Tanzania",
    type: "SELF_DRIVE",
    duration_days: 8,
    price: 2600,
    currency: "USD",
    departure_location: "Arusha, Tanzania",
    return_location: "Arusha, Tanzania",
    excerpt: "The ultimate freedom safari — explore the Serengeti, Ngorongoro, and Tarangire at your own pace in a fully equipped 4x4.",
    description: "This self-drive package gives you total freedom to explore Tanzania's northern circuit on your own terms. We provide a meticulously maintained Toyota Land Cruiser 4×4 with everything you need for an unforgettable adventure.",
    highlights: [
      "Fully equipped Toyota Land Cruiser 4x4",
      "Pre-booked luxury camps and lodges",
      "Detailed offline GPS maps and route book",
      "24/7 emergency support",
      "Complete camping and cooking kit"
    ],
    itinerary: [
      { day: 1, title: "Arusha - Tarangire", desc: "Vehicle handover and drive to Tarangire National Park." },
      { day: 2, title: "Tarangire National Park", desc: "Full day exploring elephant herds and baobab landscape." },
      { day: 3, title: "Tarangire to Serengeti", desc: "Drive via Ngorongoro highlands to Serengeti." },
      { day: 4, title: "Serengeti Exploration", desc: "Full day game driving in the Serengeti." },
      { day: 5, title: "Serengeti", desc: "Another full day in the endless plains." },
      { day: 6, title: "Ngorongoro Crater", desc: "Full day inside the crater." },
      { day: 7, title: "Lake Manyara", desc: "Tree-climbing lions and scenic lake views." },
      { day: 8, title: "Return to Arusha", desc: "Morning drive back and vehicle return." }
    ],
    included: [
      "Toyota Land Cruiser 4x4 with pop-up roof",
      "Full camping/cooking equipment",
      "All park fees",
      "Pre-booked accommodation",
      "24/7 support hotline",
      "Detailed maps and briefing"
    ],
    excluded: [
      "International flights",
      "Fuel beyond allowance",
      "Personal food and drinks",
      "Travel insurance"
    ],
    tags: ["Self-Drive", "4x4", "Freedom", "Serengeti", "Adventure"],
    published: true
  },
  {
    id: 5,
    slug: "uganda-gorilla-trekking",
    title: "Uganda Gorilla Trekking & Queen Elizabeth Safari",
    destination: "Uganda",
    type: "GUIDED",
    duration_days: 6,
    price: 3800,
    currency: "USD",
    departure_location: "Entebbe, Uganda",
    return_location: "Entebbe, Uganda",
    excerpt: "Trek through Bwindi Impenetrable Forest to sit with wild mountain gorillas — then explore tree-climbing lions and hippo cruises in Queen Elizabeth National Park.",
    description: "Uganda is one of Africa's most rewarding safari destinations. This carefully crafted journey combines the world's most sought-after wildlife encounter — mountain gorilla trekking — with classic savannah game viewing.",
    highlights: [
      "Gorilla trekking permit included",
      "One hour with a habituated gorilla family",
      "Tree-climbing lions in Ishasha sector",
      "Kazinga Channel boat cruise",
      "Professional English-speaking guide"
    ],
    itinerary: [
      { day: 1, title: "Arrival Entebbe", desc: "Transfer to Kampala for overnight." },
      { day: 2, title: "To Bwindi", desc: "Drive to Bwindi Impenetrable Forest." },
      { day: 3, title: "Gorilla Trekking", desc: "Trek into the forest to meet mountain gorillas." },
      { day: 4, title: "To Queen Elizabeth", desc: "Transfer to Queen Elizabeth National Park." },
      { day: 5, title: "Queen Elizabeth", desc: "Game drives and Kazinga Channel boat cruise." },
      { day: 6, title: "Return to Entebbe", desc: "Morning drive back to Entebbe for departure." }
    ],
    included: [
      "Gorilla trekking permit",
      "All accommodation and meals",
      "All park fees",
      "Professional guide and driver",
      "4x4 safari vehicle",
      "Transfers"
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Tips",
      "Travel insurance",
      "Optional chimpanzee tracking"
    ],
    tags: ["Gorilla", "Uganda", "Wildlife", "Trekking", "Primates"],
    published: true
  },
  // Kilimanjaro additional routes
  {
    id: 6,
    slug: "kilimanjaro-marangu-route",
    title: "Kilimanjaro Trek — Marangu Route",
    destination: "Kilimanjaro",
    type: "MOUNTAIN",
    duration_days: 6,
    price: 2130,
    currency: "USD",
    departure_location: "Moshi, Tanzania",
    return_location: "Moshi, Tanzania",
    excerpt: "The classic 'Coca-Cola' route up Kilimanjaro — the only route with hut accommodation.",
    description: "The Marangu Route is the oldest and most established path on Kilimanjaro. It offers comfortable hut accommodation and is ideal for first-time climbers or those preferring a more gradual ascent.",
    highlights: ["Hut accommodation", "Steady gradients", "High success rate for first-timers", "Mandara, Horombo & Kibo Huts"],
    itinerary: [],
    tags: ["Kilimanjaro", "Trekking", "Mountain", "Classic"],
    published: true
  },
  {
    id: 7,
    slug: "kilimanjaro-lemosho-route",
    title: "Kilimanjaro Trek — Lemosho Route",
    destination: "Kilimanjaro",
    type: "MOUNTAIN",
    duration_days: 8,
    price: 2585,
    currency: "USD",
    departure_location: "Moshi, Tanzania",
    return_location: "Moshi, Tanzania",
    excerpt: "The most scenic and remote route on Kilimanjaro with excellent acclimatisation and stunning views.",
    description: "The Lemosho Route is widely considered the most beautiful route up Kilimanjaro. It offers remote wilderness, superb views, and one of the highest summit success rates.",
    highlights: ["Most scenic route", "Remote wilderness experience", "Excellent acclimatisation", "Spectacular views of the Shira Plateau"],
    itinerary: [],
    tags: ["Kilimanjaro", "Trekking", "Mountain", "Scenic"],
    published: true
  }
];