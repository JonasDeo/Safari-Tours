// Route Maps
import maranguRouteImg from "@/assets/Marangu-Route-Map.jpg";
import machameRouteImg from "@/assets/Machame-Route-Map.avif";
import lemoshoRouteImg from "@/assets/Lemosho-Route-Map.avif";
import meruTrekking from "@/assets/meru-map.png";

// Safari & Wildlife Images
import safariElephants from "@/assets/safari-elephants.jpg";
import safariLions from "@/assets/safari-lions.jpg";
import safariLandscape from "@/assets/safari-landscape.jpg";
import safariDrive from "@/assets/safari-drive.jpg";
import serengeriPlains from "@/assets/serengeri-plains.jpg";
import zebras from "@/assets/zebras.jpg";
import zebraSavanna from "@/assets/zebra-savanna.jpg";
import lions from "@/assets/lions.jpg";
import twoLions from "@/assets/two-lions.jpg";
import elephant from "@/assets/elephant.jpg";
import elephants1 from "@/assets/elephants_1.jpg";
import lionTours from "@/assets/lion-tours.jpg";
import giraffe from "@/assets/giraffe.jpg";
import antelopes from "@/assets/antelopes-savanna.jpg";
import gameDrive from "@/assets/game-drive.jpg";

// Zanzibar & Beach Images
import zanzibar from "@/assets/zanzibar.jpg";
import zanzibarCoast from "@/assets/zanzibar-coast.jpg";
import beach from "@/assets/beach.jpg";
import clearBeach from "@/assets/clear-beach.jpg";
import seaSunset from "@/assets/sea-sunset.jpg";
import beach2 from "@/assets/beach (2).jpg";
import stonetonCoast from "@/assets/stonetown-coast.jpg";

// Kilimanjaro Trek Images
import kili1 from "@/assets/kili-1.webp";
import kili2 from "@/assets/kili-2.webp";
import kili3 from "@/assets/kili-3.jpg";
import kili4 from "@/assets/kili-4.jpg";
import kili5avif from "@/assets/kili-5.avif";
import kili5jpg from "@/assets/kili-5.jpg";
import kiliTrek from "@/assets/kili-trek.webp";
import kilimanjaro from "@/assets/kilimanjaro.jpg";
import mountTrek from "@/assets/mount-trek.jpg";
import meru1 from "@/assets/meru-1.jpg"
import meru2 from "@/assets/meru-2.jpg"

// Lodge & Accommodation Images
import lodge1 from "@/assets/lodge-1.jpg";
import lodge2 from "@/assets/lodge-2.jpg";

// Guide & Activities
import guidedSafari from "@/assets/guided-safari.jpg";
import selfDrive from "@/assets/self-drive.png";

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
  hover_image?:       string | null;  // route map — shown on card hover
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

  // ─── Guided Safaris ──────────────────────────────────────────────────────────

  {
    id:                 1,
    slug:               "tanzania-safari-zanzibar",
    title:              "10 Days Best of Tanzania – Safari & Zanzibar Beach Escape",
    destination:        "Arusha / Zanzibar",
    type:               "GUIDED",
    duration_days:      10,
    duration:           "10 Days 9 Nights",
    price:              3950,
    price_from:         3950,
    currency:           "USD",
    cover_image:        safariLandscape,
    hover_image:        null,
    images:             [safariLandscape, safariElephants, zanzibar, zanzibarCoast, clearBeach, seaSunset, stonetonCoast],
    excerpt:            "World-class wildlife safaris in the Serengeti and Ngorongoro Crater, followed by a luxurious beach escape on Zanzibar.",
    description:        "This meticulously crafted 10-day journey offers the perfect balance of thrilling wildlife encounters and ultimate relaxation. Begin in Tanzania's northern safari circuit, exploring the iconic Serengeti National Park and the spectacular Ngorongoro Crater — a UNESCO World Heritage Site teeming with the Big Five. The journey culminates with a flight to Zanzibar, where you'll unwind on pristine white-sand beaches, explore the historic Stone Town, and snorkel in the crystal-clear Indian Ocean.",
    departure_location: "Arusha",
    return_location:    "Zanzibar",
    highlights: [
      "Extensive game drives in Serengeti National Park",
      "Full-day Ngorongoro Crater exploration",
      "Tarangire elephant herds and baobab landscapes",
      "Zanzibar spice tour and Stone Town heritage walk",
      "Snorkeling and water activities in the Indian Ocean",
    ],
    included: [
      "All national park fees and conservation levies",
      "Full-board safari accommodation + beach resort in Zanzibar",
      "Professional guide and 4×4 safari vehicle with pop-up roof",
      "Domestic flight Arusha → Zanzibar",
      "All airport and inter-hotel transfers",
    ],
    excluded: [
      "International flights to/from Tanzania",
      "Visa fees and travel insurance",
      "Tips and gratuities",
      "Personal expenses and optional activities",
    ],
    itinerary: [
      { day: 1,  title: "Arrival in Arusha",               desc: "Welcome at Kilimanjaro International Airport and transfer to lodge." },
      { day: 2,  title: "Tarangire National Park",          desc: "Game viewing among massive elephant herds and ancient baobabs." },
      { day: 3,  title: "Serengeti — Central Plains",       desc: "Enter the Serengeti and enjoy afternoon game drives." },
      { day: 4,  title: "Serengeti — Full Day Safari",      desc: "Morning and afternoon drives across the iconic short-grass plains." },
      { day: 5,  title: "Ngorongoro Crater",                desc: "Descend into the world's largest intact volcanic caldera." },
      { day: 6,  title: "Lake Manyara",                     desc: "Explore tree-climbing lions, flamingos, and diverse birdlife." },
      { day: 7,  title: "Fly to Zanzibar",                  desc: "Morning flight and transfer to beach resort." },
      { day: 8,  title: "Stone Town & Spice Tour",          desc: "UNESCO Stone Town heritage walk and fragrant spice farm visit." },
      { day: 9,  title: "Beach & Water Activities",         desc: "Free day for snorkeling, diving, or beach relaxation." },
      { day: 10, title: "Departure",                        desc: "Transfer to Zanzibar Airport for onward journey." },
    ],
    tags:      ["Beach Holiday", "Wildlife Adventure", "Multi-Destination"],
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
    price:              3350,
    price_from:         3350,
    currency:           "USD",
    cover_image:        zebraSavanna,
    hover_image:        null,
    images:             [zebraSavanna, zebras, lions, twoLions, safariLions, serengeriPlains],
    excerpt:            "Witness the world's greatest wildlife spectacle and track Africa's iconic big cats across the Serengeti.",
    description:        "This premium safari is timed for the Great Migration's most dramatic river crossings. You'll traverse the Serengeti with over a million wildebeest and zebras, shadowed by lions, leopards, and cheetahs. Expert naturalist guides provide insightful commentary throughout. The itinerary also includes a full day in the Ngorongoro Crater.",
    departure_location: "Arusha",
    return_location:    "Arusha",
    highlights: [
      "Great Migration Mara River crossing viewing (seasonal)",
      "Big cat tracking — lions, leopards, and cheetahs",
      "Optional hot air balloon safari over the plains",
      "Full-day Ngorongoro Crater exploration",
      "Expert naturalist guides with spotting scopes",
    ],
    included: [
      "All national park and conservation fees",
      "Full-board tented camp accommodation",
      "Professional guide and 4×4 safari vehicle",
      "Airport transfers and daily bottled water",
    ],
    excluded: [
      "International flights and visa fees",
      "Travel insurance",
      "Optional balloon safari (~$600–650 pp)",
      "Tips and gratuities",
    ],
    itinerary: [
      { day: 1, title: "Arusha Arrival",              desc: "Transfer to lodge for orientation." },
      { day: 2, title: "Drive to Serengeti",          desc: "Scenic drive via Ngorongoro Conservation Area." },
      { day: 3, title: "Central Serengeti",           desc: "Full-day drives in the Seronera Valley." },
      { day: 4, title: "Migration Hotspots",          desc: "Track herds across seasonal zones." },
      { day: 5, title: "Mara River Area",             desc: "Position for dramatic river crossing attempts." },
      { day: 6, title: "Ngorongoro Crater",           desc: "Full descent for Big Five game viewing." },
      { day: 7, title: "Morning Drive & Departure",   desc: "Final game drive before return to Arusha." },
    ],
    tags:      ["Wildlife Adventure", "Migration"],
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
    price:              2950,
    price_from:         2950,
    currency:           "USD",
    cover_image:        safariElephants,
    hover_image:        null,
    images:             [safariElephants, elephant, elephants1, lions, giraffe, antelopes, serengeriPlains],
    excerpt:            "Discover Tanzania's iconic Big Five alongside immersive cultural encounters with the Maasai people.",
    description:        "This balanced safari pairs big-five game viewing in Tarangire and Ngorongoro with an authentic Maasai boma visit and a vibrant Arusha market tour. All meals and transfers included.",
    departure_location: "Arusha",
    return_location:    "Arusha",
    highlights: [
      "Reliable Big Five sightings across multiple parks",
      "Authentic Maasai village cultural visit",
      "Full-day Ngorongoro Crater game drive",
      "Tarangire elephant herds and baobab trees",
      "Lake Manyara tree-climbing lions and birdlife",
    ],
    included: [
      "All park and conservation area fees",
      "Full-board accommodation",
      "Professional guide and 4×4 vehicle",
      "Cultural visit fees",
      "Airport transfers",
    ],
    excluded: [
      "International flights and visas",
      "Travel insurance",
      "Tips and gratuities",
      "Personal items",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Arusha Market",     desc: "Airport transfer and local market cultural tour." },
      { day: 2, title: "Tarangire National Park",     desc: "Full day game drives among legendary elephant herds." },
      { day: 3, title: "Maasai Village & Drive",      desc: "Morning Maasai boma visit, drive to Ngorongoro rim." },
      { day: 4, title: "Ngorongoro Crater",           desc: "Full descent for exceptional Big Five encounters." },
      { day: 5, title: "Lake Manyara",                desc: "Game drives for unique tree-climbing lions and flamingos." },
      { day: 6, title: "Return to Arusha",            desc: "Scenic morning drive back for departures." },
    ],
    tags:      ["Wildlife Adventure", "Cultural"],
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
    price:              1350,
    price_from:         1350,
    currency:           "USD",
    cover_image:        zanzibar,
    hover_image:        null,
    images:             [zanzibar, zanzibarCoast, beach, clearBeach, seaSunset, beach2, stonetonCoast],
    excerpt:            "White sand, turquoise water, and the spice-scented air of Stone Town — pure Indian Ocean bliss.",
    description:        "Five days of culture, adventure, and relaxation on Zanzibar. Explore the UNESCO-listed Stone Town, tour fragrant spice plantations, snorkel over vibrant coral reefs, and unwind on pristine white-sand beaches.",
    departure_location: "Zanzibar",
    return_location:    "Zanzibar",
    highlights: [
      "Guided Stone Town heritage walk",
      "Interactive spice farm tour with tasting",
      "Snorkeling at Mnemba Atoll coral reefs",
      "Traditional dhow sunset cruise",
      "Optional water sports and dolphin tours",
    ],
    included: [
      "4 nights beachfront resort (B&B)",
      "Stone Town and spice plantation tours",
      "Snorkeling excursion and dhow cruise",
      "All airport transfers",
    ],
    excluded: [
      "International and domestic flights",
      "Visa fees and travel insurance",
      "Lunches, dinners, and beverages",
      "Tips and personal expenses",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Stone Town",         desc: "Transfer and afternoon guided Stone Town tour." },
      { day: 2, title: "Spice Farm & Beach Transfer",  desc: "Morning spice plantation then beach resort check-in." },
      { day: 3, title: "Snorkeling at Mnemba Atoll",   desc: "Boat excursion with tropical fish and sea turtles." },
      { day: 4, title: "Beach Day & Dhow Cruise",      desc: "Free beach day ending with sunset dhow cruise." },
      { day: 5, title: "Departure",                    desc: "Morning at leisure then airport transfer." },
    ],
    tags:      ["Beach Holiday", "Island Escape", "Relaxation"],
    published: true,
  },

  // ─── Kilimanjaro Routes ───────────────────────────────────────────────────
  // cover_image = real mountain photo (shown by default)
  // hover_image = imported route map asset (crossfades in on card hover)
  // images[]    = gallery for TourDetail page (map first, then more photos)

  {
    id:                 101,
    slug:               "kilimanjaro-marangu-route",
    title:              "Kilimanjaro — Marangu Route (6 Days)",
    destination:        "Kilimanjaro, Tanzania",
    type:               "MOUNTAIN",
    duration_days:      6,
    duration:           "6 Days 5 Nights",
    price:              2250,
    price_from:         2250,
    currency:           "USD",
    // Real mountain photo as the default card image
    cover_image:        kilimanjaro,
    // Route map crossfades in on hover
    hover_image:        maranguRouteImg,
    // Detail page gallery: map first, then additional trek photos
    images: [
      maranguRouteImg,
      kilimanjaro,
      kili5avif,
      kiliTrek,
      mountTrek,
    ],
    excerpt:            "The classic 'Coca-Cola' route — the only Kilimanjaro path with comfortable hut accommodation.",
    description:        "Often called the most accessible route, Marangu follows a direct path through lush montane rainforest, open moorlands, and alpine desert to Uhuru Peak (5,895m). It is the only route using permanent bunkhouse huts, providing a more comfortable experience. The 6-day itinerary includes an acclimatization day at Horombo Hut. Professional KINAPA-licensed guides, porters, and cooks ensure your safety throughout Tanzania's most iconic climb.",
    departure_location: "Moshi",
    return_location:    "Moshi",
    highlights: [
      "Comfortable hut accommodation — no camping",
      "Dedicated acclimatization day at Horombo Hut",
      "Trek through all five ecological zones",
      "Summit via Gilman's Point to Uhuru Peak",
      "KINAPA-licensed guides, porters, and cook",
    ],
    included: [
      "All park fees, hut fees, and rescue fees",
      "Hut accommodation on the mountain",
      "Licensed guide, assistant guide, porters, and cook",
      "Full-board meals and bottled water on the mountain",
      "Emergency oxygen, pulse oximeter, and first aid kit",
      "Transfers to/from Moshi",
    ],
    excluded: [
      "International flights and visa fees",
      "Travel insurance (mandatory — high-altitude coverage)",
      "Personal trekking gear",
      "Tips and gratuities (~$250–350 pp recommended)",
      "Pre/post-climb hotel in Moshi",
    ],
    itinerary: [
      { day: 1, title: "Marangu Gate → Mandara Hut (2,700m)",   desc: "Trek through dense rainforest (~4–5 hours)." },
      { day: 2, title: "Mandara Hut → Horombo Hut (3,720m)",    desc: "Ascend through moorland with Kibo and Mawenzi views." },
      { day: 3, title: "Acclimatisation Day at Horombo",         desc: "Rest day with optional hike to Zebra Rocks or Mawenzi." },
      { day: 4, title: "Horombo Hut → Kibo Hut (4,700m)",       desc: "Cross the Saddle — a stark alpine desert." },
      { day: 5, title: "Summit Night → Uhuru Peak & Descent",   desc: "Midnight push to Uhuru Peak; descend to Horombo." },
      { day: 6, title: "Horombo Hut → Marangu Gate",            desc: "Final descent and certificate presentation." },
    ],
    tags:      ["Kilimanjaro", "Trekking", "Summit", "Huts", "Beginner Friendly"],
    published: true,
  },
  {
    id:                 102,
    slug:               "kilimanjaro-machame-route",
    title:              "Kilimanjaro — Machame Route (7 Days)",
    destination:        "Kilimanjaro, Tanzania",
    type:               "MOUNTAIN",
    duration_days:      7,
    duration:           "7 Days 6 Nights",
    price:              2550,
    price_from:         2550,
    currency:           "USD",
    cover_image:        kili1,
    hover_image:        machameRouteImg,
    images: [
      machameRouteImg,
      kili1,
      kili2,
      kiliTrek,
      mountTrek,
    ],
    excerpt:            "The most popular and scenic 'Whiskey' route with excellent acclimatisation and a dramatic Barranco Wall scramble.",
    description:        "The Machame Route is beloved for its stunning scenery and strong 'climb high, sleep low' acclimatisation profile, producing higher summit success rates. Over seven days you'll cross the Shira Plateau, pass the dramatic Lava Tower, scale the Barranco Wall, and traverse the Southern Circuit before the final summit push. High-quality camping equipment and a full support team keep you comfortable throughout one of Kilimanjaro's most varied and photogenic routes.",
    departure_location: "Moshi",
    return_location:    "Moshi",
    highlights: [
      "Iconic Barranco Wall scramble",
      "Lava Tower acclimatisation stop (4,600m)",
      "Diverse landscapes across the Southern Circuit",
      "Excellent 'climb high, sleep low' acclimatisation",
      "High summit success rate",
    ],
    included: [
      "All park, camping, and rescue fees",
      "Quality camping equipment and dining tent",
      "Licensed guide, assistant guides, porters, and cook",
      "Full-board meals and purified drinking water",
      "Emergency oxygen and medical kit",
      "Transfers from/to Moshi",
    ],
    excluded: [
      "International flights, visas, and travel insurance",
      "Personal sleeping bag and trekking poles",
      "Tips and gratuities (~$300–400 pp recommended)",
      "Additional hotel nights in Moshi",
    ],
    itinerary: [
      { day: 1, title: "Machame Gate → Machame Camp (3,000m)",        desc: "Rainforest trek to first campsite (~5–7 hours)." },
      { day: 2, title: "Machame Camp → Shira Camp (3,840m)",          desc: "Ascend to the Shira Plateau." },
      { day: 3, title: "Shira Camp → Barranco Camp via Lava Tower",   desc: "Climb high to Lava Tower then descend to Barranco." },
      { day: 4, title: "Barranco Camp → Karanga Camp",                desc: "Thrilling Barranco Wall scramble." },
      { day: 5, title: "Karanga Camp → Barafu Camp (4,673m)",         desc: "Steep ascent to summit base camp." },
      { day: 6, title: "Summit Night → Uhuru Peak & Descent",         desc: "Midnight summit attempt; long descent to Mweka." },
      { day: 7, title: "Mweka Camp → Mweka Gate",                     desc: "Final forest descent and certificate ceremony." },
    ],
    tags:      ["Kilimanjaro", "Trekking", "Summit", "Popular", "Camping"],
    published: true,
  },
  {
    id:                 103,
    slug:               "kilimanjaro-lemosho-route",
    title:              "Kilimanjaro — Lemosho Route (8 Days)",
    destination:        "Kilimanjaro, Tanzania",
    type:               "MOUNTAIN",
    duration_days:      8,
    duration:           "8 Days 7 Nights",
    price:              2750,
    price_from:         2750,
    currency:           "USD",
    cover_image:        kili3,
    hover_image:        lemoshoRouteImg,
    images: [
      lemoshoRouteImg,
      kili3,
      kili4,
      kili5jpg,
      mountTrek,
    ],
    excerpt:            "The most scenic and remote route with the highest summit success rates — a premium Kilimanjaro experience.",
    description:        "Widely considered the most beautiful route, the 8-day Lemosho approaches from the remote western slopes for unparalleled wilderness and 360° panoramic views. More days mean better acclimatisation and the highest summit success rate of any standard route. You'll cross the dramatic Shira Plateau, traverse the full Southern Circuit, and tackle the Barranco Wall before the final summit push. Perfect for those seeking a premium, uncrowded experience with time to fully absorb the mountain's majesty.",
    departure_location: "Moshi",
    return_location:    "Moshi",
    highlights: [
      "Remote western approach — pristine wilderness",
      "Extended time on the beautiful Shira Plateau",
      "Full Southern Circuit traverse with dramatic scenery",
      "Highest summit success rate of any standard route",
      "Uncrowded trails and exceptional photography",
    ],
    included: [
      "All park, camping, and rescue fees",
      "High-quality camping gear and mess tent",
      "Experienced licensed guide team, porters, and cook",
      "Full-board meals and treated drinking water",
      "Oxygen, first aid, and monitoring equipment",
      "Airport/hotel transfers",
    ],
    excluded: [
      "International flights, visas, and personal gear",
      "Travel insurance (mandatory)",
      "Tips and gratuities for crew",
      "Extra accommodation in Moshi",
    ],
    itinerary: [
      { day: 1, title: "Londorossi Gate → Forest Camp (2,750m)",  desc: "Drive to remote gate and short forest trek." },
      { day: 2, title: "Forest Camp → Shira 1 Camp (3,500m)",     desc: "Climb onto the Shira Ridge." },
      { day: 3, title: "Shira 1 → Shira 2 Camp (3,840m)",         desc: "Explore the vast Shira Plateau." },
      { day: 4, title: "Shira 2 → Barranco Camp via Lava Tower",  desc: "Acclimatisation climb and descent." },
      { day: 5, title: "Barranco Camp → Karanga Camp",            desc: "Scale the Barranco Wall." },
      { day: 6, title: "Karanga Camp → Barafu Base Camp",         desc: "Final push to high camp." },
      { day: 7, title: "Summit Night → Uhuru Peak & Descent",     desc: "Midnight summit attempt and descent to Mweka." },
      { day: 8, title: "Mweka Camp → Mweka Gate",                 desc: "Final descent, certificates, and return to Moshi." },
    ],
    tags:      ["Kilimanjaro", "Trekking", "Summit", "Premium", "Camping"],
    published: true,
  },
  {
  id:                 104,
  slug:               "meru-route",
  title:              "Mount Meru — 4 Days Crater Trek",
  destination:        "Arusha, Tanzania",
  type:               "MOUNTAIN",
  duration_days:      4,
  duration:           "4 Days 3 Nights",
  price:              1250,
  price_from:         1250,
  currency:           "USD",
  cover_image:        meru1,       
  hover_image:        meruTrekking,
  images:             [meru1, meru2, meruTrekking],
  excerpt:            "Africa's second-highest volcano and the perfect Kilimanjaro warm-up — dramatic crater rim, diverse wildlife, and jaw-dropping Kili views.",
  description:        "At 4,566m, Mount Meru is Tanzania's second-highest peak and one of Africa's most rewarding treks. Rising from Arusha National Park, the route winds through lush montane forest teeming with colobus monkeys and buffalo before opening onto a breathtaking inner crater and the iconic Little Meru ridge. The technical Socialist Peak summit rewards climbers with a sunrise panorama framing Kilimanjaro — an unforgettable sight. The shorter four-day itinerary makes this ideal as a standalone adventure or as acclimatisation for a Kilimanjaro attempt.",
  departure_location: "Arusha",
  return_location:    "Arusha",
  highlights: [
    "Summit Socialist Peak (4,566m) with Kilimanjaro sunrise panorama",
    "Wildlife encounters — colobus monkeys, giraffe, and buffalo",
    "Dramatic inner crater and ash cone views",
    "Ideal acclimatisation trek before Kilimanjaro",
    "TANAPA-licensed guides and full support crew",
  ],
  included: [
    "All Arusha National Park and rescue fees",
    "Hut accommodation (Miriakamba & Saddle Huts)",
    "Licensed guide, armed ranger, porters, and cook",
    "Full-board meals and drinking water",
    "Emergency oxygen and first aid kit",
    "Transfers to/from Arusha",
  ],
  excluded: [
    "International flights and visa fees",
    "Travel insurance (mandatory)",
    "Personal trekking gear and sleeping bag",
    "Tips and gratuities (~$150–200 pp recommended)",
    "Pre/post-trek hotel in Arusha",
  ],
  itinerary: [
    { day: 1, title: "Momella Gate → Miriakamba Hut (2,514m)",  desc: "Trek through fig forest with giraffe and buffalo sightings (~4 hours)." },
    { day: 2, title: "Miriakamba Hut → Saddle Hut (3,566m)",    desc: "Ascend through hagenia woodland; optional afternoon climb to Little Meru (3,820m)." },
    { day: 3, title: "Summit Night → Socialist Peak & Descent",  desc: "Pre-dawn push to Socialist Peak for sunrise over Kilimanjaro; descend to Miriakamba Hut." },
    { day: 4, title: "Miriakamba Hut → Momella Gate",           desc: "Final forest descent, certificate presentation, and return to Arusha." },
  ],
  tags:      ["Mount Meru", "Trekking", "Summit", "Acclimatisation", "Wildlife"],
  published: true,
},
];