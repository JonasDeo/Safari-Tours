import { BlogCategory, BlogPost } from "@/components/blog/Blog";

// Import images
import tour1Img from "@/assets/tour-1.jpg";
import tour2Img from "@/assets/tour-2.jpg";
import tour3Img from "@/assets/tour-3.jpg";
import tour4Img from "@/assets/tour-4.jpg";
import tour5Img from "@/assets/tour-5.jpeg";

// Categories
// Centralised so CategoryFilter and filtering logic share the same source

export const CATEGORIES: BlogCategory[] = [
  "All",
  "Safari Tips",
  "Wildlife",
  "Destinations",
  "Culture",
  "Planning",
];

//  Posts
export const BLOG_POSTS: BlogPost[] = [
  {
    id:          "1",
    slug:        "great-wildebeest-migration-guide",
    title:       "The Great Wildebeest Migration: A Complete Traveller's Guide",
    excerpt:     "Over two million wildebeest, zebra, and gazelle thunder across the Serengeti-Mara ecosystem every year. Here's everything you need to know to witness one of nature's greatest spectacles.",
    category:    "Wildlife",
    author:      "Balbina Kiwia",
    date:        "2025-11-12",
    readingTime: 9,
    image:       tour1Img,
    featured:    true,
  },
  {
    id:          "2",
    slug:        "best-time-visit-tanzania",
    title:       "Best Time to Visit Tanzania: Month-by-Month Breakdown",
    excerpt:     "Dry season or green season? Each offers a completely different safari experience. We break down what to expect every month of the year.",
    category:    "Planning",
    author:      "David Omondi",
    date:        "2025-10-28",
    readingTime: 7,
    image:       tour3Img,
  },
  {
    id:          "3",
    slug:        "kilimanjaro-route-comparison",
    title:       "Kilimanjaro Routes Compared: Which Path Is Right for You?",
    excerpt:     "Machame, Lemosho, Rongai — each route up Africa's highest peak tells a different story. Our guide helps you choose based on fitness, budget, and time.",
    category:    "Destinations",
    author:      "Balbina Kiwia",
    date:        "2025-10-05",
    readingTime: 11,
    image:       tour2Img,
  },
  {
    id:          "4",
    slug:        "what-to-pack-safari",
    title:       "What to Pack for a Safari: The Definitive Packing List",
    excerpt:     "Neutral colours, layers, and a good pair of binoculars — but there's so much more. Our veterans share the items they never leave without.",
    category:    "Safari Tips",
    author:      "Sarah Kimani",
    date:        "2025-09-18",
    readingTime: 6,
    image:       "/src/assets/beach.jpg",
  },
  {
    id:          "5",
    slug:        "maasai-culture-traditions",
    title:       "Understanding Maasai Culture: Traditions, Customs & Respect",
    excerpt:     "The Maasai people of Tanzania and Kenya have preserved a remarkable way of life. Learn how to engage respectfully and meaningfully on your visit.",
    category:    "Culture",
    author:      "David Omondi",
    date:        "2025-09-02",
    readingTime: 8,
    image:       "/src/assets/tour-1.jpg",
  },
  {
    id:          "6",
    slug:        "ngorongoro-crater-guide",
    title:       "Inside Ngorongoro Crater: The World's Largest Intact Caldera",
    excerpt:     "Descending into Ngorongoro is like entering a lost world — a self-contained ecosystem teeming with the Big Five within a 260 km² floor.",
    category:    "Destinations",
    author:      "Balbina Kiwia",
    date:        "2025-08-15",
    readingTime: 7,
    image:       "/src/assets/tour-3.jpg",
  },
  {
    id:          "7",
    slug:        "night-safari-tips",
    title:       "Night Safaris: How to Experience Africa After Dark",
    excerpt:     "The bush transforms completely after sunset. Leopards stalk, genets climb, and aardvarks emerge. Here's how to make the most of a nocturnal drive.",
    category:    "Safari Tips",
    author:      "Sarah Kimani",
    date:        "2025-07-30",
    readingTime: 5,
    image:       "/src/assets/tour-4.jpg",
  },
];