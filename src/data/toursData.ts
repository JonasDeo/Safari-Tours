// Single source of truth for fallback tours — used by ToursSection, ToursPage, and TourDetail

import maranguRouteImg from "@/assets/kilimanjaro.jpg";
import machameRouteImg from "@/assets/kili-2.webp";
import lemoshoRouteImg from "@/assets/kili-3.jpg";
import mountain1 from "@/assets/kili-trek.webp";
import Mountain2  from "@/assets/kili-5.jpg";
import Mountain3 from "@/assets/mount-trek.jpg"


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
    description: `This 10-day journey is the ultimate Tanzania experience, weaving together the continent's most celebrated wildlife destinations with a languid Indian Ocean finale. You'll begin in Arusha — the safari capital of East Africa — before venturing into Tarangire National Park, where ancient baobab trees tower over the largest elephant herds in Tanzania. From there, the vast Serengeti plains unfold before you: an ocean of golden grass stretching to every horizon, patrolled by lions, leopards, cheetahs, and the staggering diversity of East African wildlife.

On day five, you descend 600 metres into the Ngorongoro Crater — the world's largest intact volcanic caldera and a UNESCO World Heritage Site — where a self-contained ecosystem shelters the densest population of large mammals on earth. A morning at Lake Manyara rounds off the safari chapter with tree-climbing lions and flocks of flamingos painting the shoreline pink.

Then the pace shifts entirely. A short domestic flight delivers you to Zanzibar, the fabled Spice Island of the Indian Ocean. Spend your remaining days exploring the UNESCO-listed labyrinth of Stone Town, touring fragrant spice farms where cloves, cinnamon, and vanilla perfume the air, and snorkelling over the coral gardens of the surrounding reefs. This tour is designed so that every day delivers something genuinely different — and genuinely unforgettable.`,
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
      { day: 1,  title: "Arrival in Arusha",               desc: "Meet your guide and transfer to your lodge for an orientation briefing." },
      { day: 2,  title: "Tarangire National Park",          desc: "Full day exploring Tarangire — famous for its enormous elephant herds and baobab-dotted landscapes." },
      { day: 3,  title: "Serengeti — Central Plains",       desc: "Enter the Serengeti and begin game drives across the iconic short-grass plains." },
      { day: 4,  title: "Serengeti — Full Day Safari",      desc: "Dedicated full day in the Serengeti with morning and afternoon game drives." },
      { day: 5,  title: "Ngorongoro Crater",                desc: "Descend 600m into the world's largest intact volcanic caldera for a spectacular big-five encounter." },
      { day: 6,  title: "Lake Manyara",                     desc: "Visit Lake Manyara, home to tree-climbing lions and thousands of flamingos." },
      { day: 7,  title: "Fly to Zanzibar",                  desc: "Morning flight to Zanzibar. Afternoon at leisure on the beach." },
      { day: 8,  title: "Zanzibar Spice Tour & Stone Town", desc: "Explore the aromatic spice farms and the historic labyrinth of Stone Town." },
      { day: 9,  title: "Beach & Water Activities",         desc: "Free day for snorkelling, diving, or simply relaxing on the white-sand shores." },
      { day: 10, title: "Departure",                        desc: "Transfer to Zanzibar airport for your onward journey." },
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
    description: `Few natural events on earth rival the Great Migration — the year-round movement of over 1.5 million wildebeest, 200,000 zebra, and 300,000 Thomson's gazelle through the Serengeti–Mara ecosystem. This seven-day safari is designed around witnessing it at its most dramatic, including the legendary Mara River crossings where crocodiles wait in the churning water below steep banks as the herds plunge in by the thousands.

But the Serengeti is more than the Migration. The Seronera Valley at the heart of the park holds one of the highest concentrations of resident predators in Africa — lions sprawled beneath acacia trees, leopards draping kills over branches, and cheetahs scanning the plains from termite mounds. Your expert naturalist guide knows this landscape intimately and will position the vehicle to maximise every sighting.

The itinerary is deliberately flexible: migration herds move, and a great guide follows them. Whether you're in the northern Mara zone for river crossings, the central plains for calving season, or the Western Corridor for the first river crossing of the year, the experience is calibrated to where the action is. An optional hot-air balloon safari at dawn — drifting silently above the plains as the sun rises — offers a perspective that no game drive can replicate. The safari concludes with a descent into the Ngorongoro Crater, ensuring you depart with a complete picture of Tanzania's extraordinary wildlife.`,
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
      { day: 1, title: "Arusha Arrival",             desc: "Welcome briefing and overnight at a comfortable Arusha lodge." },
      { day: 2, title: "Drive to Serengeti",         desc: "Early morning departure through the Ngorongoro Conservation Area en route to the Serengeti." },
      { day: 3, title: "Central Serengeti",          desc: "Full-day game drives in the Seronera Valley, rich in resident predators year-round." },
      { day: 4, title: "Migration Zones",            desc: "Track the migration herds — location varies by season for optimal sightings." },
      { day: 5, title: "River Crossing",             desc: "Position at a Mara River crossing point and wait for the dramatic wildebeest plunge." },
      { day: 6, title: "Ngorongoro Crater",          desc: "Descend into the crater for a full day of big-five game viewing." },
      { day: 7, title: "Return to Arusha & Depart", desc: "Morning game drive before driving back to Arusha for your departure flight." },
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
    description: `Tanzania's wildlife needs no introduction — but this safari goes further by pairing the continent's most iconic game viewing with an authentic window into the human cultures that have called this landscape home for centuries. Over six days, you'll encounter all of the Big Five across two of Tanzania's finest parks while also spending meaningful time with local communities in and around Arusha.

The journey begins in Arusha itself, where your guide leads you through the colourful chaos of the local market — stalls piled high with tropical fruits, Maasai beadwork, and freshly ground spices. This is Tanzania as its residents experience it, not as a curated tourist product. From here you move into Tarangire National Park, a park often overlooked in favour of the Serengeti but spectacular in its own right: enormous elephant families gather at the Tarangire River, and the park's open woodland is one of the best places in Africa to see tree-climbing lions and large herds of buffalo.

A morning visit to a Maasai boma gives genuine insight into the semi-nomadic pastoral culture that has coexisted with East Africa's wildlife for generations — your hosts will share their traditions around cattle herding, beadwork, and community life. The safari then builds toward its crescendo: a full descent into the Ngorongoro Crater, where rhino, elephant, lion, leopard, and buffalo are encountered in a compact but breathtakingly scenic setting. Lake Manyara, with its famous tree-climbing lions and vast flocks of flamingos, provides a graceful final chapter before you return to Arusha.`,
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
      { day: 1, title: "Arrival & Arusha Market",  desc: "Arrive in Arusha and explore the local market with your guide." },
      { day: 2, title: "Tarangire National Park",  desc: "Game drives through Tarangire — legendary for its elephant concentration." },
      { day: 3, title: "Maasai Village & Drive",   desc: "Morning Maasai boma visit, afternoon drive to Ngorongoro rim." },
      { day: 4, title: "Ngorongoro Crater",        desc: "Full descent into the crater for an incredible big-five experience." },
      { day: 5, title: "Lake Manyara",             desc: "Explore Lake Manyara's tree-climbing lions and vibrant birdlife." },
      { day: 6, title: "Return to Arusha",         desc: "Scenic morning drive back to Arusha for departures." },
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
    description: `Zanzibar is unlike anywhere else on earth. This compact island off the Tanzanian coast carries centuries of history — Arab traders, Portuguese explorers, Persian merchants, and British colonists have all left their mark on the architecture, cuisine, and culture of the archipelago. At the same time, it sits in the warm turquoise shallows of the Indian Ocean, ringed by white-sand beaches and coral reefs teeming with marine life. This five-day escape is designed to let you experience both sides of the island in full.

You arrive into Stone Town, the island's ancient heart and a UNESCO World Heritage Site, where narrow whitewashed alleyways open unexpectedly into spice markets, carved wooden doorways frame grand Arab mansions, and the mingling scents of cloves, cardamom, and ocean salt drift through every street. A guided walk here is a journey through overlapping civilisations — Swahili, Omani, Indian, and European — compressed into a few walkable square kilometres.

The following day takes you into the island's interior on a spice farm tour — one of Zanzibar's most sensory experiences. You'll taste fresh vanilla, smell cinnamon bark, and learn how the island earned its historical title of the Spice Island. A boat trip to Mnemba Atoll offers world-class snorkelling over pristine coral gardens shared with green turtles, octopus, and hundreds of species of reef fish. Your final full day is yours entirely: swim in the Indian Ocean, arrange a deep-sea fishing excursion, or simply read under a palm tree and let the island's easy pace work its magic. A sunset dhow cruise along the coast — with the silhouette of Stone Town fading behind you — is the perfect punctuation mark on a truly restorative escape.`,
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
      { day: 1, title: "Arrival & Stone Town",    desc: "Land in Zanzibar and spend the afternoon wandering the narrow streets of historic Stone Town." },
      { day: 2, title: "Spice Farm Tour",         desc: "Morning tour of a traditional spice plantation — taste and smell cinnamon, cloves, vanilla, and more." },
      { day: 3, title: "Snorkelling at Mnemba",   desc: "Boat trip to Mnemba Atoll for world-class snorkelling with turtles and vibrant reef fish." },
      { day: 4, title: "Beach Day & Dhow Cruise", desc: "Free beach day followed by a sunset dhow cruise along the coast." },
      { day: 5, title: "Departure",               desc: "Leisurely breakfast before transfer to Zanzibar International Airport." },
    ],
    tags:      ["Beach Holiday", "Island Escape", "Relaxation"],
    published: true,
  },
  {
    id:                 5,
    slug:               "kilimanjaro-marangu-route",
    title:              "6 Days Kilimanjaro Marangu Route",
    destination:        "Mount Kilimanjaro",
    type:               "MOUNTAIN",
    duration_days:      6,
    duration:           "6 Days 5 Nights",
    price:              2130,
    price_from:         2130,
    currency:           "USD",
    cover_image:        maranguRouteImg,
    images: [
      mountain1,
      maranguRouteImg,
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=800&auto=format&fit=crop&q=80",
    ],
    excerpt:            "The classic 'Coca-Cola' route — the only Kilimanjaro route with hut accommodation.",
    description: `The Marangu Route is the oldest established trail on Mount Kilimanjaro and remains the only route on the mountain to offer sleeping huts rather than tents, earning it the affectionate nickname the "Coca-Cola Route." For trekkers who want to experience the full majesty of Africa's highest peak with a greater degree of comfort along the way, Marangu is the classic choice — and its reputation as the most beginner-friendly route on the mountain is well deserved.

The route begins at Marangu Gate, entering immediately into the lush montane rainforest that girdles the lower slopes of the mountain. The forest is alive with the calls of Colobus monkeys and a remarkable variety of bird species — it's one of the most biodiverse zones on the entire climb. The trail is well-maintained and the gradient relatively gradual, making Marangu ideal for those attempting a high-altitude trek for the first time. Each night is spent in a series of A-frame sleeping huts — Mandara, Horombo, and Kibo — that are basic but dry, warm, and far more comfortable than a tent in the freezing temperatures that descend after dark above 4,000 metres.

A dedicated acclimatization day at Horombo Hut (3,720m) is built into the itinerary, giving your body the time it needs to adjust to the thinning air before the push to Kibo base camp. The summit attempt begins at midnight from Kibo Hut (4,700m), climbing steeply through scree and snow in the dark to reach Gilman's Point on the crater rim, and then continuing along the rim to Uhuru Peak (5,895m) — the roof of Africa — for a sunrise that stretches across hundreds of kilometres of East African plains. Descent follows the same route back to Marangu Gate, where certificates are awarded and the full scale of the achievement finally sinks in.`,
    departure_location: "Moshi",
    return_location:    "Moshi",
    highlights: [
      "Comfortable hut accommodation throughout",
      "Gradual and well-maintained ascent profile",
      "Best Kilimanjaro route for first-time trekkers",
      "Scenic rainforest, moorland, and alpine desert zones",
      "Dedicated acclimatization day at Horombo Hut",
    ],
    included: [
      "All Kilimanjaro National Park fees",
      "Professional mountain guides and licensed porters",
      "All meals during the trek",
      "Hut accommodation (Mandara, Horombo, Kibo)",
      "Airport and hotel transfers",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Tips and gratuities for guides and porters",
      "Personal trekking gear",
    ],
    itinerary: [
      { day: 1, title: "Marangu Gate to Mandara Hut (2,700m)", desc: "Hike 8km through lush montane rainforest to Mandara Hut, passing giant ferns and Colobus monkey territory." },
      { day: 2, title: "Mandara Hut to Horombo Hut (3,720m)",  desc: "Ascend through moorland into the open alpine zone, with the first clear views of Kibo and Mawenzi peaks." },
      { day: 3, title: "Acclimatization Day at Horombo",        desc: "Rest and short acclimatization hikes around Horombo to prepare your body for the altitude ahead." },
      { day: 4, title: "Horombo Hut to Kibo Hut (4,700m)",     desc: "Cross the lunar alpine desert landscape of the Saddle to reach Kibo base camp. Rest before the midnight start." },
      { day: 5, title: "Summit Night & Descent to Horombo",    desc: "Midnight push through scree and snow to Gilman's Point, then on to Uhuru Peak (5,895m) for sunrise. Descend to Horombo to sleep." },
      { day: 6, title: "Horombo to Marangu Gate & Transfer",   desc: "Final descent through the rainforest to Marangu Gate. Receive your summit certificate and transfer to Moshi." },
    ],
    tags:      ["Kilimanjaro", "Beginner Friendly"],
    published: true,
  },
  {
    id:                 6,
    slug:               "kilimanjaro-machame-route",
    title:              "7 Days Kilimanjaro Machame Route",
    destination:        "Mount Kilimanjaro",
    type:               "MOUNTAIN",
    duration_days:      7,
    duration:           "7 Days 6 Nights",
    price:              2470,
    price_from:         2470,
    currency:           "USD",
    cover_image:        machameRouteImg,
    images: [
      machameRouteImg,
      Mountain2,
      Mountain3
    ],
    excerpt:            "The most popular route — scenic, challenging, and with high summit success rates.",
    description: `The Machame Route — nicknamed the "Whiskey Route" in contrast to the gentler Marangu — is the most popular climbing route on Mount Kilimanjaro, and for good reason. It combines outstanding scenery, an excellent acclimatization profile, and enough physical challenge to make reaching the summit feel genuinely earned. Of all the routes on the mountain, Machame offers the most diverse landscapes and the most dramatic visual transitions as you climb from dense equatorial rainforest to the icy summit dome.

The route begins at Machame Gate, where the trail enters a forest canopy dripping with moss and giant ferns. Within two days you emerge onto the open Shira Plateau — a vast, high-altitude moorland where giant lobelias and groundsels grow to extraordinary sizes, and the summit of Kibo looms ahead for the first time in full profile. The climb-high, sleep-low acclimatization pattern built into the Machame itinerary — ascending to Lava Tower at 4,600m before descending to Barranco Camp at 3,976m — is a key reason for the route's high summit success rates compared to shorter alternatives.

The Barranco Wall on Day 4 is the route's most exhilarating section: a 300-metre near-vertical scramble up a rocky buttress that requires hands and feet but no technical climbing experience. Most trekkers find it thrilling rather than frightening, and the views from the top are extraordinary. From Karanga Camp, the final approach to the summit feels both inevitable and immense. Your midnight push to Uhuru Peak (5,895m) rewards you with a sunrise above the clouds and a sense of achievement that will stay with you long after you've returned to sea level.`,
    departure_location: "Moshi",
    return_location:    "Moshi",
    highlights: [
      "Most scenic and popular Kilimanjaro route",
      "High summit success rate via climb-high, sleep-low profile",
      "Thrilling Barranco Wall scramble",
      "Diverse ecosystems from rainforest to glacier",
      "Seven days for thorough acclimatization",
    ],
    included: [
      "All Kilimanjaro National Park fees",
      "Professional guides and licensed porters",
      "Full camping equipment (tents, sleeping mats)",
      "All meals during the trek",
      "Airport and hotel transfers",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Tips and gratuities for guides and porters",
      "Personal trekking gear",
    ],
    itinerary: [
      { day: 1, title: "Machame Gate to Machame Camp (3,010m)", desc: "Trek 11km through dense rainforest to Machame Camp. First views of the summit on a clear evening." },
      { day: 2, title: "Machame Camp to Shira Camp (3,840m)",   desc: "Ascend through heath and moorland onto the open Shira Plateau with panoramic views across the mountain." },
      { day: 3, title: "Shira Camp to Barranco Camp via Lava Tower (4,600m)", desc: "Climb to Lava Tower for acclimatization then descend to Barranco Camp — the classic climb-high, sleep-low day." },
      { day: 4, title: "Barranco Camp — Barranco Wall to Karanga (4,035m)", desc: "Tackle the famous Barranco Wall scramble, then traverse the southern face to Karanga Valley camp." },
      { day: 5, title: "Karanga Camp to Barafu Base Camp (4,673m)", desc: "Short but steep climb to Barafu — your launch pad for the summit. Rest for the midnight start." },
      { day: 6, title: "Summit Night — Uhuru Peak (5,895m) & Descent", desc: "Midnight push via Stella Point to Uhuru Peak for sunrise. Descend all the way to Mweka Camp." },
      { day: 7, title: "Mweka Camp to Mweka Gate & Transfer",   desc: "Final descent through rainforest to Mweka Gate. Collect your summit certificate and transfer to Moshi." },
    ],
    tags:      ["Kilimanjaro", "Popular"],
    published: true,
  },
  {
    id:                 7,
    slug:               "kilimanjaro-lemosho-route",
    title:              "8 Days Kilimanjaro Lemosho Route",
    destination:        "Mount Kilimanjaro",
    type:               "MOUNTAIN",
    duration_days:      8,
    duration:           "8 Days 7 Nights",
    price:              2585,
    price_from:         2585,
    currency:           "USD",
    cover_image:        lemoshoRouteImg,
    images: [
      Mountain2,
      lemoshoRouteImg,
      mountain1,
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=800&auto=format&fit=crop&q=80",
    ],
    excerpt:            "The most scenic and least crowded route — best for acclimatization.",
    description: `The Lemosho Route is widely regarded by experienced mountaineers and professional guides as the finest route on Mount Kilimanjaro — a bold claim on a mountain that offers seven distinct approaches, each with its own character. What sets Lemosho apart is its combination of remote wilderness, low traffic in the early stages, exceptional scenery, and the most generous acclimatization profile of any standard Kilimanjaro itinerary. If you want to give yourself the best possible chance of reaching Uhuru Peak — and you want the journey to be as magnificent as the destination — Lemosho is the route.

The climb begins at Londorossi Gate on the remote western face of the mountain, a three-to-four-hour drive from Moshi. The isolation here is palpable: for the first two days, the trail winds through pristine montane rainforest that sees only a fraction of the foot traffic of the eastern routes. Troops of Black-and-White Colobus monkeys crash through the canopy overhead, and the forest floor is carpeted in fern and wild impatiens. Emerging onto the Shira Plateau on Day 2 is a genuinely dramatic moment — the forest falls away and you step into an immense, bowl-shaped moorland at 3,800 metres, with Kibo's ice-capped summit dome dominating the sky to the east.

The eight-day itinerary builds acclimatization carefully and intelligently. The classic climb-high, sleep-low day at Lava Tower (4,600m) primes your body for altitude before the Barranco Wall scramble delivers you to the southern circuit, where the route tracks beneath the summit's vast glacier faces with views that no photograph can fully capture. By the time you depart Karanga Camp for the final push, your body is well-adapted and your resolve — shaped by a week of extraordinary mountain experience — is absolute. Uhuru Peak at sunrise, with the glacier towers glowing amber and the curvature of the earth visible on the horizon, is one of the great rewards that any mountain on the planet has to offer.`,
    departure_location: "Moshi",
    return_location:    "Moshi",
    highlights: [
      "Regarded as the most scenic route on Kilimanjaro",
      "Remote and uncrowded western approach via Londorossi Gate",
      "Eight days for the best acclimatization profile",
      "Highest summit success rate of all standard routes",
      "Traverse the full southern circuit beneath the glaciers",
    ],
    included: [
      "All Kilimanjaro National Park fees",
      "Professional mountain guides and licensed porters",
      "Full camping equipment (tents, sleeping mats, dining tent)",
      "All meals during the trek",
      "Airport and hotel transfers",
    ],
    excluded: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Tips and gratuities for guides and porters",
      "Personal trekking gear",
    ],
    itinerary: [
      { day: 1, title: "Londorossi Gate to Forest Camp (2,100m)",       desc: "Drive to the remote Londorossi Gate on the western slope and begin trekking through ancient, pristine rainforest." },
      { day: 2, title: "Forest Camp to Shira 1 Camp (3,500m)",          desc: "Emerge from the forest onto the vast Shira Plateau — wide open moorland with extraordinary views of Kibo ahead." },
      { day: 3, title: "Shira 1 to Shira 2 Camp (3,840m)",              desc: "Cross the plateau with gentle acclimatization hiking, enjoying 360-degree views of the surrounding landscape." },
      { day: 4, title: "Shira 2 to Barranco Camp via Lava Tower (4,600m)", desc: "Climb to Lava Tower for the essential acclimatization boost, then descend to Barranco Camp — climb high, sleep low." },
      { day: 5, title: "Barranco Camp — Barranco Wall to Karanga (4,035m)", desc: "Scale the thrilling Barranco Wall scramble and traverse the southern circuit to Karanga Valley." },
      { day: 6, title: "Karanga Camp to Barafu Base Camp (4,673m)",     desc: "Short climb to Barafu — the final camp before the summit. Rest, eat well, and prepare for the midnight start." },
      { day: 7, title: "Summit Night — Uhuru Peak (5,895m) & Descent",  desc: "Midnight ascent via Stella Point to Uhuru Peak for a sunrise above the clouds. Descend to Mweka Camp to sleep." },
      { day: 8, title: "Mweka Camp to Mweka Gate & Transfer to Moshi",  desc: "Final descent through the rainforest to Mweka Gate. Receive your summit certificate and transfer back to Moshi." },
    ],
    tags:      ["Kilimanjaro", "Premium"],
    published: true,
  },
];