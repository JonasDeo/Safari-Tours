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
import migration from "@/assets/tour-4.jpg";

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
import meru3 from "@/assets/meru-3.jpg"
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
    cover_image:        migration,
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
    cover_image:        zanzibarCoast,
    hover_image:        null,
    images:             [zanzibarCoast, seaSunset, beach,  beach2, stonetonCoast],
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
  price:              1870,
  price_from:         1870,
  currency:           "USD",
  cover_image:        kilimanjaro,
  hover_image:        maranguRouteImg,
  images:             [maranguRouteImg, kilimanjaro, kili5avif, kiliTrek, mountTrek],
  excerpt:            "The classic 'Coca-Cola' route — the only Kilimanjaro path with permanent hut accommodation and a dedicated acclimatization day.",
  description:        "The Marangu Route is the oldest and most established path on Mount Kilimanjaro, approaching from the southeastern slopes through dense montane rainforest, open moorland, and alpine desert to Uhuru Peak (5,895 m). It is the only route offering permanent bunkhouse hut accommodation, making it unique among all Kilimanjaro options. The 6-day itinerary includes a dedicated acclimatization day at Horombo Hut, improving summit success for first-time high-altitude climbers. Professional guides apply strict 'pole pole' pacing and conduct daily oxygen saturation checks throughout the climb.",
  departure_location: "Marangu Gate",
  return_location:    "Marangu Gate",
  highlights: [
    "Only Kilimanjaro route with permanent mountain hut accommodation",
    "Dedicated acclimatization day at Horombo Hut (3,720 m)",
    "Trek through all five ecological zones to Uhuru Peak (5,895 m)",
    "Well-defined trail ideal for structured, first-time climbers",
    "Daily health and oxygen saturation monitoring by certified guides",
  ],
  included: [
    "All park fees, hut fees, and rescue fees",
    "Hut accommodation (Mandara, Horombo, and Kibo Huts)",
    "Licensed guide, assistant guide, porters, and cook",
    "Full-board meals and drinking water on the mountain",
    "Emergency oxygen, pulse oximeter, and first aid kit",
    "Transfers to/from Moshi",
    "Summit certificate",
  ],
  excluded: [
    "International flights and visa fees",
    "Travel insurance (mandatory — high-altitude coverage required)",
    "Personal trekking gear and sleeping bag",
    "Tips and gratuities (~$250–350 pp recommended)",
    "Pre/post-climb hotel in Moshi",
    "Alcoholic beverages",
  ],
  itinerary: [
    { day: 1, title: "Marangu Gate → Mandara Hut (2,700 m)",  desc: "Trek through dense montane rainforest with blue monkey sightings (~4–5 hours). Start: 1,860 m." },
    { day: 2, title: "Mandara Hut → Horombo Hut (3,720 m)",   desc: "Ascend through heath and moorland with expanding views of Kibo and Mawenzi peaks." },
    { day: 3, title: "Acclimatization Day at Horombo Hut",    desc: "Rest and recover at 3,720 m. Optional hike to Zebra Rocks or toward Mawenzi to aid acclimatization." },
    { day: 4, title: "Horombo Hut → Kibo Hut (4,700 m)",      desc: "Cross the stark alpine Saddle between Mawenzi and Kibo through volcanic scree." },
    { day: 5, title: "Kibo Hut → Uhuru Peak → Horombo Hut",  desc: "Midnight summit push to Gilman's Point and Uhuru Peak (5,895 m); descend to Horombo Hut. High: 5,895 m." },
    { day: 6, title: "Horombo Hut → Marangu Gate",            desc: "Final descent through forest. Certificate presentation at the gate before return to Moshi." },
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
  price:              1900,
  price_from:         1900,
  currency:           "USD",
  cover_image:        kili1,
  hover_image:        machameRouteImg,
  images:             [machameRouteImg, kili1, kili2, kiliTrek, mountTrek],
  excerpt:            "The most popular and visually dramatic 'Whiskey' route — superb acclimatization, a thrilling Barranco Wall scramble, and high summit success rates.",
  description:        "The Machame Route approaches Kilimanjaro from the southwest, climbing through dense rainforest before ascending the Shira Plateau, passing the Lava Tower, and tackling the iconic Barranco Wall. Built around the 'climb high, sleep low' principle — particularly the Lava Tower day at 4,600 m before dropping to Barranco at 3,950 m — Machame delivers one of Kilimanjaro's best acclimatization profiles. The 7-day itinerary adds a critical Karanga Valley stage that further improves altitude adaptation and summit success. Expert guides conduct daily oxygen saturation checks and manage pacing throughout.",
  departure_location: "Machame Gate",
  return_location:    "Mweka Gate",
  highlights: [
    "Classic 'climb high, sleep low' acclimatization via Lava Tower (4,600 m)",
    "Iconic Barranco Wall scramble — one of Kilimanjaro's great adventures",
    "Traverse the full Southern Circuit with 360° panoramic views",
    "Extra Karanga Valley stage in the 7-day itinerary maximizes summit success",
    "Daily oxygen saturation checks and professional 'pole pole' pacing",
  ],
  included: [
    "All park, camping, and rescue fees",
    "High-quality sleeping tents, sleeping mats, and dining tent",
    "Licensed guide, assistant guides, porters, and cook",
    "Three freshly prepared meals per day plus snacks",
    "Vegetarian and dietary options available on request",
    "Emergency oxygen, medical kit, and daily health checks",
    "Transfers: Arusha → Machame Gate and Mweka Gate → Arusha",
    "Summit certificate (Gold for Uhuru Peak, Green for Stella Point)",
  ],
  excluded: [
    "International flights and visa fees",
    "Travel insurance (mandatory — must cover high-altitude trekking to 6,000 m)",
    "Personal trekking equipment (boots, sleeping bag, clothing, poles)",
    "Tips and gratuities (~$300–400 pp recommended)",
    "Accommodation in Arusha/Moshi before and after the climb",
    "Personal expenses",
  ],
  itinerary: [
    { day: 1, title: "Machame Gate → Machame Camp (3,000 m)",       desc: "Trek through lush rainforest with colobus monkey sightings (~5–7 hours). Start: 1,800 m." },
    { day: 2, title: "Machame Camp → Shira Plateau Camp (3,800 m)", desc: "Climb from forest into open heath and moorland onto the vast Shira Plateau." },
    { day: 3, title: "Shira Plateau → Lava Tower → Barranco Camp",  desc: "Ascend to Lava Tower (4,600 m) for acclimatization then descend to Barranco Camp (3,950 m). High: 4,600 m." },
    { day: 4, title: "Barranco Camp → Karanga Camp (4,000 m)",      desc: "Scale the thrilling Barranco Wall scramble then traverse to Karanga Valley." },
    { day: 5, title: "Karanga Camp → Barafu Base Camp (4,600 m)",   desc: "Steep ascent to summit base camp; rest and prepare for summit night." },
    { day: 6, title: "Barafu Camp → Uhuru Peak → Mweka Camp",      desc: "Midnight summit attempt to Uhuru Peak (5,895 m); long descent to Mweka Camp (3,100 m). High: 5,895 m." },
    { day: 7, title: "Mweka Camp → Mweka Gate",                     desc: "Final forest descent (~3 hours), certificate ceremony, and transfer back to Arusha." },
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
  price:              2200,
  price_from:         2200,
  currency:           "USD",
  cover_image:        kili3,
  hover_image:        lemoshoRouteImg,
  images:             [lemoshoRouteImg, kili3, kili4, kili5jpg, mountTrek],
  excerpt:            "The most scenic and remote route on Kilimanjaro — gradual western ascent, pristine wilderness, and the highest summit success rate of any standard route.",
  description:        "The Lemosho Route approaches from the remote western slopes via Londorossi Gate, traversing nearly every ecological zone on Kilimanjaro — dense colobus-filled rainforest, vast open moorland, the ancient Shira Plateau, stark alpine desert, and the arctic summit zone. Its longer, gradual ascent profile and early altitude exposure on the Shira Plateau make it the gold standard for acclimatization and summit success. The 8-day itinerary provides exceptional time for the body to adjust, less crowded trails in the early stages, and sweeping 360° panoramic views from the full Southern Circuit. A premium, professionally guided experience from start to finish.",
  departure_location: "Londorossi Gate",
  return_location:    "Mweka Gate",
  highlights: [
    "Remote western approach through pristine wilderness and colobus monkey forest",
    "Early acclimatization on the vast Shira Plateau (3,500–4,000 m)",
    "'Climb high, sleep low' via Lava Tower (4,600 m) for optimal altitude adaptation",
    "Full Southern Circuit traverse with the widest panoramic views on Kilimanjaro",
    "Highest summit success rate — 8 days allows exceptional altitude adaptation",
  ],
  included: [
    "All park, camping, and rescue fees",
    "High-quality mountain tents, sleeping mats, and mess tent",
    "Experienced licensed guide team, assistant guides, porters, and cook",
    "Three freshly prepared meals per day plus snacks",
    "Daily health and oxygen saturation checks",
    "Emergency oxygen, first aid, and monitoring equipment",
    "Transfers: Arusha → Londorossi Gate and Mweka Gate → Arusha",
    "Summit certificate (Gold for Uhuru Peak, Green for Stella Point)",
  ],
  excluded: [
    "International flights and visa fees",
    "Travel insurance (mandatory — must cover high-altitude trekking to 6,000 m)",
    "Personal trekking equipment (boots, sleeping bag, layered clothing, poles)",
    "Tips and gratuities for guides and crew",
    "Accommodation in Arusha/Moshi before and after the climb",
    "Personal expenses",
  ],
  itinerary: [
    { day: 1, title: "Londorossi Gate → Mti Mkubwa Camp (2,650 m)", desc: "Drive to the remote gate then trek through pristine rainforest. Start: 2,100 m." },
    { day: 2, title: "Mti Mkubwa Camp → Shira 1 Camp (3,500 m)",    desc: "Climb through heath and moorland up to the Shira Ridge with sweeping western views." },
    { day: 3, title: "Shira 1 Camp → Shira 2 Camp (3,850 m)",       desc: "Explore the vast ancient Shira Plateau — one of Kilimanjaro's most dramatic landscapes." },
    { day: 4, title: "Shira 2 → Lava Tower → Barranco Camp",        desc: "Acclimatization ascent to Lava Tower (4,600 m) then descent to Barranco Camp (3,950 m). High: 4,600 m." },
    { day: 5, title: "Barranco Camp → Karanga Camp (4,200 m)",      desc: "Scale the iconic Barranco Wall scramble then traverse to Karanga Valley." },
    { day: 6, title: "Karanga Camp → Barafu Base Camp (4,600 m)",   desc: "Final approach to high camp — rest and summit preparation." },
    { day: 7, title: "Barafu Camp → Uhuru Peak → Mweka Camp",      desc: "Midnight summit push to Uhuru Peak (5,895 m); long descent to Mweka Camp (3,100 m). High: 5,895 m." },
    { day: 8, title: "Mweka Camp → Mweka Gate",                     desc: "Final forest descent, certificate ceremony, and return transfer to Arusha." },
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
  price:              1650,
  price_from:         1650,
  currency:           "USD",
  cover_image:        meruTrekking,
  hover_image:        meruTrekking,
  images:             [meru3, meru2, meruTrekking],
  excerpt:            "Africa's fifth-highest peak and the ultimate Kilimanjaro warm-up — wildlife on the trail, a knife-edge ridge to Socialist Peak, and a sunrise framing Kilimanjaro on the horizon.",
  description:        "At 4,566 m, Mount Meru is Tanzania's second-highest mountain and one of Africa's most rewarding treks. A dormant stratovolcano rising from Arusha National Park just 70 km west of Kilimanjaro, Meru offers a spectacular four-day adventure through open grassland teeming with buffalo and warthog, dense colobus monkey forest, volcanic crater rim, and a dramatic pre-dawn ridge walk to Socialist Peak. The summit rewards early risers with a breathtaking Kilimanjaro sunrise panorama. Unlike most high peaks, Meru's lower sections have active wildlife — an armed ranger accompanies groups on Day 1 for safety. The 4-day itinerary is strongly recommended over the 3-day option: the long summit day from Saddle Hut is demanding, and proper acclimatization on Day 2 via Little Meru (3,794 m) significantly improves summit success. For those planning a Kilimanjaro climb, Meru is the ideal preparation — building altitude adaptation and trekking confidence before tackling the Roof of Africa.",
  departure_location: "Momella Gate, Arusha National Park",
  return_location:    "Momella Gate, Arusha National Park",
  highlights: [
    "Wildlife on the trail — buffalo, warthog, colobus monkeys, and forest birds on Day 1",
    "Armed ranger escort through the lower wildlife zone for safety",
    "Afternoon acclimatization hike to Little Meru (3,794 m) with panoramic crater views",
    "Pre-dawn summit push along a narrow ridge to Socialist Peak (4,566 m)",
    "Iconic Kilimanjaro sunrise panorama from the summit — one of Africa's finest views",
    "Dormitory-style hut accommodation — no camping required",
    "Perfect acclimatization climb before attempting Kilimanjaro",
  ],
  included: [
    "All Arusha National Park fees and rescue fees",
    "Hut accommodation (Miriakamba Hut & Saddle Hut)",
    "Licensed guide, armed ranger (Day 1), porters, and cook",
    "Full-board meals and purified drinking water on the mountain",
    "Emergency oxygen and first aid kit",
    "Transfers to/from Arusha",
    "Summit certificate",
  ],
  excluded: [
    "International flights and visa fees",
    "Travel insurance (mandatory)",
    "Personal trekking gear and sleeping bag",
    "Tips and gratuities (~$150–200 pp recommended)",
    "Pre/post-trek hotel in Arusha (available on request)",
    "Personal expenses and optional activities",
  ],
  itinerary: [
    {
      day: 1,
      title: "Momella Gate → Miriakamba Hut (2,541 m)",
      desc:  "Drive from Arusha (~1 hr) to Momella Gate (1,500 m). Trek through open grassland with buffalo, warthog, and colobus monkey sightings, crossing the Ngare Nanyuki River before ascending through montane forest to Miriakamba Hut. Walking time: 4–6 hours.",
    },
    {
      day: 2,
      title: "Miriakamba Hut → Saddle Hut (3,570 m) + Little Meru",
      desc:  "Short but steep ascent through lush forest glades and giant heather via Elephant Ridge — with views into the volcanic crater — to Saddle Hut (3,570 m). Afternoon acclimatization hike to Little Meru (3,794 m) for superb sunset views before returning to Saddle Hut. Walking time: 3–5 hours + 2 hrs for Little Meru.",
    },
    {
      day: 3,
      title: "Saddle Hut → Socialist Peak (4,566 m) → Miriakamba Hut",
      desc:  "Early pre-dawn start (1–2 am). Steep ascent to Rhino Point (3,850 m) then a narrow, exposed ridge to Socialist Peak at 4,566 m — timed to arrive for Kilimanjaro sunrise. Descend all the way back to Miriakamba Hut. Note: guide may halt ascent if icy or high-wind conditions make the ridge unsafe. Walking time: 10–12 hours total.",
    },
    {
      day: 4,
      title: "Miriakamba Hut → Momella Gate",
      desc:  "Morning descent to Momella Gate (~8 am departure). Option to take the longer ash cone route for additional wildlife and crater views. Certificate presentation, crew tips, and transfer back to Arusha. Walking time: 2–5 hours.",
    },
  ],
  tags:      ["Mount Meru", "Trekking", "Summit", "Wildlife", "Acclimatisation", "Huts"],
  published: true,
},
  {
  id:                 105,
  slug:               "kilimanjaro-rongai-route",
  title:              "Kilimanjaro — Rongai Route (6 Days)",
  destination:        "Kilimanjaro, Tanzania",
  type:               "MOUNTAIN",
  duration_days:      6,
  duration:           "6 Days 5 Nights",
  price:              1840,
  price_from:         1840,
  currency:           "USD",
  cover_image:        kili4,           // use whichever kili image fits best
  hover_image:        null,
  images:             [kili4, kiliTrek, mountTrek, kilimanjaro],
  excerpt:            "The only northern-approach route on Kilimanjaro — drier climate, quieter trails, and a gentle gradient that's ideal for first-time high-altitude trekkers.",
  description:        "The Rongai Route is the only Kilimanjaro route that approaches from the north, near the Kenya–Tanzania border. Its drier climate, gentle gradients, and significantly quieter trails set it apart from the busier southern routes. The 6-day itinerary passes through moorland and alpine desert, offering exceptional views of Mawenzi Peak, before descending via Marangu Gate — making it a true traverse of the mountain. Daily oxygen saturation checks and professional 'pole pole' pacing ensure climbers adapt safely to altitude throughout. A strong choice for first-timers seeking a structured, less crowded Kilimanjaro experience.",
  departure_location: "Rongai Gate",
  return_location:    "Marangu Gate",
  highlights: [
    "Only route approaching Kilimanjaro from the quieter, drier northern side",
    "Gentler gradient — ideal for first-time high-altitude climbers",
    "Spectacular close-up views of dramatic Mawenzi Peak",
    "True mountain traverse — ascent via Rongai, descent via Marangu",
    "Daily oxygen saturation monitoring and professional 'pole pole' pacing",
  ],
  included: [
    "All park, camping, and rescue fees",
    "Camping tents and hut accommodation (mixed on this route)",
    "Licensed guide, assistant guides, porters, and cook",
    "Three freshly prepared meals per day plus snacks",
    "Daily health and oxygen saturation checks",
    "Emergency oxygen and medical kit",
    "Transfers: Arusha → Rongai Gate and Marangu Gate → Arusha",
    "Summit certificate (Gold for Uhuru Peak, Green for Stella Point)",
  ],
  excluded: [
    "International flights and visa fees",
    "Travel insurance (mandatory — must cover high-altitude trekking to 6,000 m)",
    "Personal trekking equipment (boots, sleeping bag, layered clothing, poles)",
    "Tips and gratuities (~$250–350 pp recommended)",
    "Accommodation in Arusha/Moshi before and after the climb",
    "Personal expenses",
  ],
  itinerary: [
    { day: 1, title: "Rongai Gate → Simba Camp (2,760 m)",       desc: "Drive from Arusha to Rongai Gate (1,860 m) near the Kenya border. Trek through farmland and pine forest into moorland to Simba Camp. Walking time: ~4–5 hours." },
    { day: 2, title: "Simba Camp → Kikelewa Camp (3,400 m)",     desc: "Ascend through open moorland with expanding views of the mountain and surrounding plains. Walking time: ~5–6 hours." },
    { day: 3, title: "Kikelewa Camp → Mawenzi Tarn Camp (4,300 m)", desc: "Steep climb to the stunning glacial tarn beneath the rugged Mawenzi Peak — one of Kilimanjaro's most dramatic settings. Walking time: ~4–5 hours." },
    { day: 4, title: "Mawenzi Tarn → Kibo Hut (4,700 m)",        desc: "Cross the flat, desolate Saddle between Mawenzi and Kibo through stark alpine desert. Rest and prepare for summit night. Walking time: ~4–5 hours." },
    { day: 5, title: "Kibo Hut → Uhuru Peak → Horombo Hut",      desc: "Midnight summit push to Gilman's Point and Uhuru Peak (5,895 m); long descent to Horombo Hut (3,700 m). High: 5,895 m. Walking time: ~12–14 hours." },
    { day: 6, title: "Horombo Hut → Marangu Gate",               desc: "Final descent through moorland and rainforest to Marangu Gate (1,860 m). Certificate presentation and transfer to Arusha. Walking time: ~4–5 hours." },
  ],
  tags:      ["Kilimanjaro", "Trekking", "Summit", "Beginner Friendly", "Camping", "Quiet Route"],
  published: true,
},
  {
  id:                 106,
  slug:               "kilimanjaro-umbwe-route",
  title:              "Kilimanjaro — Umbwe Route (6 Days)",
  destination:        "Kilimanjaro, Tanzania",
  type:               "MOUNTAIN",
  duration_days:      6,
  duration:           "6 Days 5 Nights",
  price:              1800,
  price_from:         1800,
  currency:           "USD",
  cover_image:        kili2,
  hover_image:        null,
  images:             [kili2, kili5jpg, kiliTrek, mountTrek],
  excerpt:            "Kilimanjaro's most direct and steepest route — a raw, fast, and uncrowded ascent for fit, experienced trekkers who thrive on a serious challenge.",
  description:        "The Umbwe Route is the most direct and aggressive ascent on Mount Kilimanjaro, gaining altitude faster than any other standard route. Approaching from the south via Umbwe Gate, the trail climbs sharply through dense rainforest and narrow ridges before joining the Southern Circuit near Barranco Camp. From there, the route follows the same trail as Machame — crossing Karanga Valley and ascending to Barafu Base Camp before the midnight summit push. The compressed 6-day schedule leaves little margin for acclimatization, making Umbwe best suited for physically strong, high-altitude-experienced trekkers. Not recommended for beginners or first-time high-altitude climbers. Strict safety monitoring and conservative summit decisions are applied throughout.",
  departure_location: "Umbwe Gate",
  return_location:    "Mweka Gate",
  highlights: [
    "Kilimanjaro's most direct and least crowded ascent route",
    "Dramatic, narrow ridge trail through pristine southern rainforest",
    "Joins the scenic Southern Circuit at Barranco Camp",
    "Fastest route to the summit for strong, experienced trekkers",
    "Daily oxygen saturation checks and strict safety protocols throughout",
  ],
  included: [
    "All park, camping, and rescue fees",
    "Quality sleeping tents, sleeping mats, and dining tent",
    "Licensed guide, assistant guides, porters, and cook",
    "Three freshly prepared meals per day plus snacks",
    "Daily health checks and oxygen saturation monitoring",
    "Emergency oxygen and medical kit",
    "Transfers: Arusha → Umbwe Gate and Mweka Gate → Arusha",
    "Summit certificate (Gold for Uhuru Peak, Green for Stella Point)",
  ],
  excluded: [
    "International flights and visa fees",
    "Travel insurance (mandatory — must cover high-altitude trekking to 6,000 m)",
    "Personal trekking equipment (boots, sleeping bag, layered clothing, poles)",
    "Tips and gratuities (~$250–350 pp recommended)",
    "Accommodation in Arusha/Moshi before and after the climb",
    "Personal expenses",
  ],
  itinerary: [
    { day: 1, title: "Umbwe Gate (1,600 m) → Umbwe Camp (2,900 m)", desc: "Drive from Arusha/Moshi to Umbwe Gate then steep climb through dense, narrow-ridge rainforest. The most direct ascent profile of any Kilimanjaro route. Walking time: ~5–7 hours." },
    { day: 2, title: "Umbwe Camp → Barranco Camp (3,900 m)",         desc: "Continue the steep climb through upper forest and moorland to Barranco Camp, joining the Southern Circuit. Walking time: ~5–6 hours." },
    { day: 3, title: "Barranco Camp → Karanga Camp (4,000 m)",       desc: "Scale the iconic Barranco Wall scramble then traverse to Karanga Valley for acclimatization. Walking time: ~4–5 hours." },
    { day: 4, title: "Karanga Camp → Barafu Base Camp (4,600 m)",    desc: "Steep ascent to Barafu — the launch pad for all southern summit attempts. Rest, eat, and prepare for summit night. Walking time: ~4–5 hours." },
    { day: 5, title: "Barafu Camp → Uhuru Peak → Mweka Camp",       desc: "Midnight summit push to Uhuru Peak (5,895 m); long descent to Mweka Camp (3,100 m). High: 5,895 m. Walking time: ~12–14 hours." },
    { day: 6, title: "Mweka Camp → Mweka Gate",                      desc: "Final descent through forest, certificate ceremony, and transfer back to Arusha. Walking time: ~2–4 hours." },
  ],
  tags:      ["Kilimanjaro", "Trekking", "Summit", "Advanced", "Camping", "Direct Route"],
  published: true,
},
  {
  id:                 107,
  slug:               "kilimanjaro-northern-circuit-route",
  title:              "Kilimanjaro — Northern Circuit Route (9 Days)",
  destination:        "Kilimanjaro, Tanzania",
  type:               "MOUNTAIN",
  duration_days:      9,
  duration:           "9 Days 8 Nights",
  price:              3200,
  price_from:         3200,
  currency:           "USD",
  cover_image:        kili5avif,
  hover_image:        null,
  images:             [kili5avif, kili5jpg, kiliTrek, mountTrek, kilimanjaro],
  excerpt:            "The longest, most remote, and highest-success route on Kilimanjaro — a full circumnavigation of the mountain through wilderness that most climbers never see.",
  description:        "The Northern Circuit Route is the longest and most comprehensive route on Kilimanjaro, offering the best acclimatization profile and highest summit success rate of all standard routes. Starting on the remote western slopes via Londorossi Gate — following Lemosho for the first three days — the route then branches northward to traverse the rarely visited northern face of the mountain beneath the dramatic cliffs of Mawenzi Peak. This area near the Kenyan border is the most isolated and least-trafficked zone on Kilimanjaro, delivering true wilderness solitude. Nine days at a gradual pace means exceptional time above 4,000 m before summit night, virtually eliminating the altitude compression that reduces success on shorter routes. The gold standard Kilimanjaro experience for climbers who want to do this once and do it right.",
  departure_location: "Londorossi Gate",
  return_location:    "Mweka Gate",
  highlights: [
    "Highest summit success rate of all Kilimanjaro routes — 9 days of optimal acclimatization",
    "Full circumnavigation of Kilimanjaro including the rarely visited northern slopes",
    "Dramatic views toward Kenya and the remote Mawenzi Peak cliffs",
    "Least crowded route — true wilderness and solitude throughout",
    "Satellite communication support and daily medical checks by certified guides",
  ],
  included: [
    "All park, camping, and rescue fees",
    "High-quality four-season mountain tents, sleeping mats, and mess tent",
    "Experienced licensed guide team, assistant guides, porters, and cook",
    "Three freshly prepared meals per day plus snacks",
    "Daily health and oxygen saturation checks",
    "Emergency oxygen, first aid, and monitoring equipment",
    "Satellite communication support",
    "Transfers: Arusha → Londorossi Gate and Mweka Gate → Arusha",
    "Summit certificate (Gold for Uhuru Peak, Green for Stella Point)",
  ],
  excluded: [
    "International flights and visa fees",
    "Travel insurance (mandatory — must cover high-altitude trekking to 6,000 m including evacuation)",
    "Personal trekking equipment (boots, sleeping bag, layered clothing, poles)",
    "Tips and gratuities for guides and crew",
    "Accommodation in Arusha/Moshi before and after the climb",
    "Personal expenses",
  ],
  itinerary: [
    { day: 1, title: "Londorossi Gate → Mti Mkubwa Camp (2,650 m)", desc: "Drive to the remote western gate then trek through pristine montane rainforest. Start: 2,100 m. Walking time: ~3–4 hours." },
    { day: 2, title: "Mti Mkubwa Camp → Shira 1 Camp (3,500 m)",    desc: "Climb through heath and moorland up to the Shira Ridge with sweeping western views. Walking time: ~5–6 hours." },
    { day: 3, title: "Shira 1 Camp → Shira 2 Camp (3,850 m)",       desc: "Traverse the vast ancient Shira Plateau — one of Kilimanjaro's most dramatic and open landscapes. Walking time: ~4–5 hours." },
    { day: 4, title: "Shira 2 → Lava Tower → Moir Camp (4,200 m)",  desc: "Acclimatization ascent to Lava Tower (4,600 m), then the Northern Circuit branches north — descend to remote Moir Camp. High: 4,600 m. Walking time: ~7–8 hours." },
    { day: 5, title: "Moir Camp → Buffalo Camp (4,020 m)",           desc: "Traverse the isolated northern slopes beneath Mawenzi's dramatic cliffs with sweeping views toward Kenya. Walking time: ~6–7 hours." },
    { day: 6, title: "Buffalo Camp → Third Cave Camp (3,870 m)",     desc: "Continue east across the remote northern face — the quietest and most wilderness-like section of any Kilimanjaro route. Walking time: ~5–6 hours." },
    { day: 7, title: "Third Cave Camp → Kibo Hut (4,700 m)",        desc: "Cross the Saddle and ascend to Kibo Hut — the summit base for the eastern approach. Rest and prepare for summit night. Walking time: ~5–6 hours." },
    { day: 8, title: "Kibo Hut → Uhuru Peak → Mweka Camp",          desc: "Midnight summit push to Gilman's Point and Uhuru Peak (5,895 m); long descent to Mweka Camp (3,100 m). High: 5,895 m. Walking time: ~12–14 hours." },
    { day: 9, title: "Mweka Camp → Mweka Gate",                     desc: "Final descent through forest, certificate ceremony, and return transfer to Arusha. Walking time: ~3–4 hours." },
  ],
  tags:      ["Kilimanjaro", "Trekking", "Summit", "Premium", "Camping", "Remote", "Highest Success Rate"],
  published: true,
},
];