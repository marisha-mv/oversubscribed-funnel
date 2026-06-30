// ============================================================================
// Real, source-attributed proof for the funnel.
// Sources captured from research (Dent Global case studies, Daniel Priestley's
// LinkedIn, Goodreads, Diary of a CEO). All quotes/results are real and traceable.
//
// IMAGES: `photo` is intentionally null — these are real people and we should not
// hotlink scraped headshots onto a live page. The UI renders a monogram avatar.
// To use a licensed headshot, drop a URL into `photo` (source pages noted inline).
// ============================================================================

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  result: string; // short stat overlay for proof cards
  photo: string | null; // licensed headshot URL when available
  source: string; // verification URL
}

// Photos hosted locally in /public/proof (sourced from danielpriestley.com).
// Verbatim quotes from danielpriestley.com/dent-accelerators and dent.global.
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Stephanie Taylor",
    role: "Founder, HMO Heaven",
    quote:
      "What I value most is the connections I've made with fellow entrepreneurs — a community all aiming to be exceptional.",
    result: "#1 bestselling book · 27× website traffic",
    photo: "/proof/stephanie-taylor.jpeg",
    source: "https://danielpriestley.com/dent-accelerators/",
  },
  {
    name: "Kate Christie",
    role: "Founder, Time Stylers",
    quote:
      "I was able to offer greater value and more products to my clients — and create additional income streams for me.",
    result: "New product tiers · new recurring income streams",
    photo: "/proof/kate-christie.jpeg",
    source: "https://danielpriestley.com/dent-accelerators/",
  },
  {
    name: "Francisco Bricio",
    role: "Founder, Simetrical",
    quote: "We did all the principles, and now we've grown exponentially.",
    result: "$2M → $60M+ revenue · expanded 1 → 11 countries",
    photo: null,
    source: "https://www.dent.global/",
  },
  {
    name: "Mok O'Keeffe",
    role: "Founder, The Innovation Beehive",
    quote:
      "Our business has almost doubled in size, and we have clients in the UK, Europe, the Middle East and North America.",
    result: "1 → 5 employees · nearly doubled · partnered with Google",
    photo: null,
    source: "https://danielpriestley.com/dent-accelerators/",
  },
  {
    name: "Sebastian Bates",
    role: "Founder, The Warrior Academy",
    quote:
      "The quality of the teaching is amazing — not a single question the mentors are fazed by.",
    result: "Amazon bestseller · scaled to 2,000 students globally",
    photo: null,
    source: "https://www.dent.global/",
  },
  {
    name: "Jon Hollenberg",
    role: "Founder, Five by Five",
    quote: "It's a business card on steroids — competition becomes irrelevant.",
    result: "Higher conversion · built a team of 10 · ended price pushback",
    photo: null,
    source: "https://www.dent.global/",
  },
];

// Hard credibility facts — rendered as stat badges.
export interface ProofStat {
  stat: string;
  label: string;
  source: string;
}

export const PROOF_STATS: ProofStat[] = [
  {
    stat: "3M+",
    label: "views on his Diary of a CEO episode (their #1 returning guest)",
    source:
      "https://www.linkedin.com/posts/danielpriestley_my-diary-of-a-ceo-episode-now-has-over-3-activity-7273970063446102016-CgLL",
  },
  {
    stat: "150,000",
    label: "leads/month generated for 4,000+ ScoreApp clients in 25+ countries",
    source:
      "https://www.linkedin.com/posts/danielpriestley_scoreapp-has-crossed-200k-mrr-or-3m-arr-activity-7096779013699821568-p3Yk",
  },
  {
    stat: "4.19★",
    label: "Oversubscribed on Goodreads (2,548 ratings)",
    source: "https://www.goodreads.com/book/show/25305548-oversubscribed",
  },
  {
    stat: "3,500+",
    label: "businesses coached through Dent Global accelerators",
    source: "https://www.dent.global/",
  },
];
