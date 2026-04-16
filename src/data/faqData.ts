export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQSection {
  category: string;
  items: FAQItem[];
}

export const FAQ_SECTIONS: FAQSection[] = [
  {
    category: "Getting There",
    items: [
      {
        q: "Arusha Airport or Kilimanjaro Airport?",
        a: "Kilimanjaro International Airport (JRO) is approximately 60 km (60 min) from Arusha city centre and serves as the gateway for safari visitors — uniquely located at the heart of East Africa's major tourism attractions. Arusha Municipal Airport (ARK) is on the outskirts of Arusha but only runs domestic flights, mostly to Zanzibar and Dar es Salaam. You can compare international flights on Skyscanner.net.",
      },
      {
        q: "Do I need a Tanzanian tourist visa in advance?",
        a: "Citizens of the EU and USA can acquire entry visas at international airports in Tanzania as well as other border crossings. It is also possible to apply online through the Tanzania immigration website. Visa cost: generally USD 50 (USD 100 for US citizens).",
      },
      {
        q: "Which international airlines fly to Tanzania?",
        a: "Turkish Airlines, Emirates, FlyDubai, KLM, and Ethiopian Airlines are among those with regular flights to Tanzania. We recommend consulting World's Top 100 Airlines ratings if comfort is a priority, or choosing the most convenient option in your price range.",
      },
      {
        q: "Who will meet me on arrival?",
        a: "One of our drivers will meet you with a sign bearing your name at your airport of arrival, regardless of the time of day — including late-night arrivals.",
      },
    ],
  },
  {
    category: "Safari Basics",
    items: [
      {
        q: "What are a Safari and a Game Drive?",
        a: "A Safari (\"trip\" in Swahili) is a guided tour of Tanzania's National Parks using customised 4×4 vehicles. Our safaris start in Arusha or Moshi with a 2–3 hour drive to one of the parks. A Game Drive is a guided excursion through the park where you observe wildlife in their natural habitat. The most popular parks are Serengeti, Ngorongoro Crater, Tarangire, Arusha, and Lake Manyara.",
      },
      {
        q: "What is a Lodge?",
        a: "Lodges are small hotels situated in or near a National Park, offering privacy through detached bungalows or tents set in the African bush. Many mirror traditional local architecture while providing excellent comfort, good food, Wi-Fi, and usually a swimming pool.",
      },
      {
        q: "What should I bring on safari?",
        a: "We recommend comfortable light clothing for the day and something warmer for evenings, which can be cool in the northern highlands. Bring comfortable walking shoes, a hat, sunglasses, and sunscreen. Binoculars are provided in our vehicles.",
      },
      {
        q: "How is a Tanzania safari different from other countries?",
        a: "Tanzania ranks first among African safari destinations. Hunting is strictly prohibited in all National Parks — creating one of the highest wildlife densities on the continent — and higher park fees keep visitor numbers low for a more exclusive experience. All safaris use off-road 4×4 vehicles.",
      },
      {
        q: "Can I exit the vehicle during a game drive?",
        a: "Tanzania National Park regulations prohibit leaving the vehicle within the parks, for both visitor safety and ecosystem protection. However, all parks have rest and picnic spots where you can stretch, walk, and enjoy lunch in the open.",
      },
      {
        q: "Is food available during the safari?",
        a: "All safari packages are full-board. Breakfasts are at the lodge, lunches are packed boxes enjoyed at park picnic spots, and dinners are at the lodge. Cold drinks, water, tea, coffee, and snacks are always available in the vehicle fridge — all included in the tour price.",
      },
      {
        q: "At what time do safaris start?",
        a: "We recommend departing the lodge at 6:30–7 AM. Mornings are cooler, animals are most active, and you arrive before other tourists. Park fees are paid per day with 6 PM closing time — an early start gives you the most time in the bush. Our guides always adjust to your preferences.",
      },
      {
        q: "Are there age restrictions for National Parks?",
        a: "There are no official age restrictions. However, game drives can last most of the day and we do not recommend bringing children younger than 2. For older children, safaris are highly educational — seeing wildlife in their natural habitat is a life-changing experience.",
      },
      {
        q: "Are photos and videos allowed on safari?",
        a: "All photography and video for personal use (including social media) is permitted without special equipment or permits. Commercial recording requires a permit. Drones require a permit obtained well in advance — please inform your Tour Manager early if needed.",
      },
      {
        q: "How can we make the safari more diverse?",
        a: "A balloon flight over the Serengeti is one of the most memorable add-ons — about one hour with a bird's-eye view of the plains. Parks near lakes offer canoeing. Charter flights over the parks are also available. Contact us for more details.",
      },
    ],
  },
  {
    category: "Money & Currency",
    items: [
      {
        q: "What currency is most acceptable?",
        a: "We recommend bringing USD or Euros and withdrawing Tanzanian Shillings (TSH) on arrival. There are many ATMs in Arusha — minimum withdrawal is TSH 400,000 (approx. USD 160). Most tourist places accept dollars. Use USD notes printed after 2006.",
      },
      {
        q: "What is the official currency of Tanzania?",
        a: "The Tanzanian Shilling (TSH). The current rate is approximately TSH 2,500 per USD 1. Cash payments in USD are widely accepted. Notes issued before 2003 may not be accepted or may attract a lower rate of exchange.",
      },
      {
        q: "Should I tip my safari driver?",
        a: "Tipping is customary. We recommend USD 30–50 per vehicle per day if you are satisfied with the service. For Kilimanjaro climbs, crew tips average USD 250 per client.",
      },
    ],
  },
  {
    category: "Booking & Payment",
    items: [
      {
        q: "Does the tour price include international flights?",
        a: "Our standard rates do not include international flights, as our clients come from all over the world. However, your Tour Manager can assist with selecting and booking air tickets.",
      },
      {
        q: "Is an advance deposit required?",
        a: "Yes. Classic tours require a 30% deposit; Luxury and Premium require 50%. Flights within Tanzania, Zanzibar accommodation, and excursions require full payment in advance. Deposits are generally due 60 days before departure — earlier for peak season (Christmas, July–August) or large groups.",
      },
      {
        q: "What is the cancellation policy?",
        a: "Cancellation fees: 25% from confirmation to 45 days before departure; 50% from 44–16 days before; 75% from 15–8 days before; 100% less than 7 days before or no-show. All cancellations must be submitted in writing.",
      },
      {
        q: "What costs are not included in the tour price?",
        a: "Not included: visa fees; alcohol at hotels (unless all-inclusive); tips for safari drivers (USD 30–50 per vehicle per day) and Kilimanjaro climb crews (USD 250 per client); and international flights.",
      },
    ],
  },
  {
    category: "Health & Safety",
    items: [
      {
        q: "Is Tanzania safe for tourists?",
        a: "Yes — Tanzania is one of the most politically stable and tourist-friendly countries in Africa. Local authorities take security very seriously. As anywhere, exercise common sense: avoid leaving belongings unattended, use taxis after dark, and travel with a guide when photographing in towns.",
      },
      {
        q: "What vaccinations do I need?",
        a: "Yellow fever vaccination is recommended if visiting remote areas, though there have been no recorded cases in Tanzania's tourist regions in over 20 years. Malaria risk exists but is often overstated — consult your doctor about prophylaxis before visiting more remote regions.",
      },
      {
        q: "Do I need travel insurance?",
        a: "We highly recommend travel insurance for all international travel. For Kilimanjaro climbs, ensure your policy covers emergencies at a minimum altitude of 6,000 metres. Your Tour Manager can assist with appropriate insurance.",
      },
      {
        q: "Is the water safe?",
        a: "All hotels we work with provide safe water for showering and brushing teeth. We still recommend drinking only bottled water, which is always available at lodges, in the safari vehicle, and in shops.",
      },
    ],
  },
  {
    category: "Accommodation",
    items: [
      {
        q: "Can I choose a hotel not in the standard programme?",
        a: "Yes — on a tailor-made tour you may request any hotel and your Tour Manager will calculate the cost difference.",
      },
      {
        q: "What food can I expect at Tanzanian hotels?",
        a: "All tourist hotels adapt their menus to suit international tastes while offering local dishes. If you have dietary requirements (vegetarian, allergies, etc.), inform your Tour Manager at booking and we will communicate this to all lodges.",
      },
      {
        q: "Is Wi-Fi available at lodges?",
        a: "All hotels and lodges have Wi-Fi and internet access. Connection speeds may be slower than you're used to at home — we recommend embracing the disconnect as part of the safari experience.",
      },
    ],
  },
];