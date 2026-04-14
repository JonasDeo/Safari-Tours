import type { BlogPost, FullBlogPost } from "../types/blogPost";

// Full posts (keyed by slug) 
// Add one entry per slug that matches BLOG_POSTS in blogData.ts

export const FULL_POSTS: Record<string, FullBlogPost> = {

  "great-wildebeest-migration-guide": {
    id:          "1",
    slug:        "great-wildebeest-migration-guide",
    title:       "The Great Wildebeest Migration: A Complete Traveller's Guide",
    excerpt:     "Over two million wildebeest, zebra, and gazelle thunder across the Serengeti-Mara ecosystem every year. Here's everything you need to know to witness one of nature's greatest spectacles.",
    category:    "Wildlife",
    author:      "Theophil Kiwia",
    authorBio:   "BalbTheophilina has guided safaris across East Africa for over 15 years. She specialises in wildlife behaviour and the Serengeti ecosystem.",
    date:        "2025-11-12",
    readingTime: 9,
    image:       "/src/assets/tour-1.jpg",
    featured:    true,
    body: [
      {
        type:    "paragraph",
        content: "There is no single wildlife event on earth that compares to the Great Wildebeest Migration. Every year, roughly 1.5 million wildebeest — joined by 300,000 zebra and 500,000 gazelle — complete a circular journey of over 1,800 kilometres across the Serengeti-Mara ecosystem in Tanzania and Kenya. It is driven entirely by rain and grass, an ancient rhythm that has continued for millions of years.",
      },
      {
        type:    "pullquote",
        content: "It is not a single event — it is a year-round cycle. The herds are always moving, always following the rains.",
        attribution: "Theophil Kiwia, Lead Guide",
      },
      {
        type:    "heading",
        level:   2,
        id:      "when-to-go",
        content: "When to Go: The Migration Calendar",
      },
      {
        type:    "paragraph",
        content: "The migration is a year-round phenomenon, but the drama peaks at different locations in different months. Understanding this cycle is the key to planning your trip.",
      },
      {
        type:  "list",
        style: "bullet",
        items: [
          "**January – March:** Calving season on the southern Serengeti plains. Up to 8,000 calves are born daily — and predators follow. This is one of the most emotionally intense times to visit.",
          "**April – May:** The herds move northwest as the long rains begin. Fewer tourists, lush green landscapes, and dramatic skies.",
          "**June – July:** The northern Serengeti fills as the herds approach the Mara River for the first crossings. Tension builds.",
          "**August – October:** Peak river crossing season. Thousands of animals plunge into crocodile-filled waters in scenes of chaos and survival.",
          "**November – December:** The short rains push the herds south again, completing the circle back to the Ndutu plains.",
        ],
      },
      {
        type:    "heading",
        level:   2,
        id:      "where-to-watch",
        content: "Where to Position Yourself",
      },
      {
        type:    "paragraph",
        content: "Location is everything. The Serengeti is vast — roughly the size of Northern Ireland — and the herds can be anywhere within it. Working with an experienced guide who has eyes on the ground is the single most important factor in witnessing a crossing.",
      },
      {
        type:    "image",
        src:     "/src/assets/tour-3.jpg",
        alt:     "Wildebeest crossing the Mara River",
        caption: "Thousands of wildebeest gather at the Mara River before committing to a crossing. They may wait hours — or days.",
      },
      {
        type:    "paragraph",
        content: "The most famous crossings happen at the Mara River in the northern Serengeti and the Masai Mara. There are several well-known crossing points — Kogatende, Sand River, and Serena Crossing among them — but the herds choose their own path. No guide can guarantee a crossing on any given day, but the best operators position clients based on fresh sightings and years of pattern knowledge.",
      },
      {
        type:    "tip",
        label:   "Expert Tip",
        content: "Book a private vehicle rather than joining a shared game drive. When a crossing begins, you need the freedom to position quickly and stay as long as the action continues — not leave when other guests are ready.",
      },
      {
        type:    "heading",
        level:   2,
        id:      "what-to-expect",
        content: "What Actually Happens at a River Crossing",
      },
      {
        type:    "paragraph",
        content: "Crossings are not guaranteed, and that uncertainty is part of what makes witnessing one so extraordinary. The herds gather at the river bank — sometimes thousands of animals jostling in nervous energy. A single wildebeest at the front will test the water, then retreat. This can happen repeatedly over hours. Then, suddenly, the dam breaks.",
      },
      {
        type:    "pullquote",
        content: "When they finally commit, everything happens at once. The thunder of hooves, the churning water, the crocodiles. It is overwhelming.",
        attribution: "David Omondi, Senior Field Guide",
      },
      {
        type:    "paragraph",
        content: "Nile crocodiles — some of the largest in Africa — wait patiently in the water. The crossing is brutal and beautiful in equal measure. Not every animal makes it. But the vast majority do, and the spectacle of survival is something that stays with visitors for the rest of their lives.",
      },
      {
        type:    "heading",
        level:   2,
        id:      "practical-advice",
        content: "Practical Advice for Your Trip",
      },
      {
        type:  "list",
        style: "numbered",
        items: [
          "**Stay flexible.** Build buffer days into your itinerary. Crossings don't happen on schedule.",
          "**Choose your camp carefully.** Mobile camps that reposition with the herds offer a significant advantage over fixed lodges.",
          "**Bring a long lens.** A 400mm telephoto is ideal for river crossings. 200mm is the minimum.",
          "**Arrive early.** The best light and the most active wildlife behaviour happens in the first two hours after sunrise.",
          "**Trust your guide.** The best guides spend every day in the field and have satellite communication networks with other guides.",
        ],
      },
      {
        type:    "heading",
        level:   2,
        id:      "book-your-trip",
        content: "Ready to Witness It for Yourself?",
      },
      {
        type:    "paragraph",
        content: "The Great Migration is one of those experiences that changes how you see the natural world. We've been guiding visitors to the Serengeti for over a decade, and we still feel the same awe at a crossing as we did the first time. If you're ready to plan your trip, our team is here to help you do it right.",
      },
    ],
  },

};

/** Lookup a full post by slug — returns undefined if not found */
export const getPostBySlug = (slug: string): FullBlogPost | undefined =>
  FULL_POSTS[slug];

/** Get related posts — same category, different slug, max n results */
export const getRelatedPosts = (
  currentSlug: string,
  category: string,
  allPosts: BlogPost[],
  n = 3,
) =>
  allPosts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, n);