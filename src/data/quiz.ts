// ============================================================================
// The Oversubscribed Scorecard — quiz definition
// 4 factors drawn directly from the accelerator curriculum:
//   demand    — Demand–Supply Tension
//   ecosystem — Product Ecosystem (4-tier ladder)
//   rhythm    — Campaign Rhythm (repeatable week / quarterly spotlight / annual msg)
//   pipeline  — Conversion Pipeline (LAPSE: Leads, Appointments, Presentations, Sales)
// Each option carries a 0–100 "health" score for its factor.
// ============================================================================

export type FactorKey = "demand" | "ecosystem" | "rhythm" | "pipeline";

export interface Factor {
  key: FactorKey;
  label: string;
  blurb: string; // shown under the score bar
}

export interface QuizOption {
  label: string;
  score: number; // 0–100 health for the question's factor
}

export interface QuizQuestion {
  id: string;
  factor: FactorKey;
  prompt: string;
  options: QuizOption[];
}

export const FACTORS: Record<FactorKey, Factor> = {
  demand: {
    key: "demand",
    label: "Demand–Supply Tension",
    blurb: "Whether customers come to you — or you chase them.",
  },
  ecosystem: {
    key: "ecosystem",
    label: "Product Ecosystem",
    blurb: "Whether you have a ladder of offers, not one flat price.",
  },
  rhythm: {
    key: "rhythm",
    label: "Campaign Rhythm",
    blurb: "Whether your marketing is a repeatable engine or random bursts.",
  },
  pipeline: {
    key: "pipeline",
    label: "Conversion Pipeline",
    blurb: "Whether you can see and predict your numbers (the LAPSE dashboard).",
  },
};

export const FACTOR_ORDER: FactorKey[] = ["demand", "ecosystem", "rhythm", "pipeline"];

export const QUESTIONS: QuizQuestion[] = [
  // ---- Demand–Supply Tension ----
  {
    id: "d1",
    factor: "demand",
    prompt: "When you need new customers, what actually happens?",
    options: [
      { label: "I hustle hard — outreach, discounts, chasing leads.", score: 12 },
      { label: "A few trickle in, but I can't rely on it.", score: 42 },
      { label: "I get steady, fairly predictable inbound interest.", score: 70 },
      { label: "Demand outstrips capacity — I run a waitlist.", score: 96 },
    ],
  },
  {
    id: "d2",
    factor: "demand",
    prompt: "If you raised your prices 30% tomorrow, what would happen?",
    options: [
      { label: "I'd lose most of my customers.", score: 14 },
      { label: "I'd lose a chunk and feel nervous about it.", score: 40 },
      { label: "A few might grumble, but most would stay.", score: 72 },
      { label: "Barely a ripple — I'm probably underpriced.", score: 95 },
    ],
  },
  {
    id: "d3",
    factor: "demand",
    prompt: "How well-known are you to the exact people you want as clients?",
    options: [
      { label: "Mostly invisible — I'm the best-kept secret.", score: 15 },
      { label: "Some recognise me, but I'm not top of mind.", score: 45 },
      { label: "I'm a known name in my niche.", score: 73 },
      { label: "I'm the obvious go-to in my space.", score: 94 },
    ],
  },

  // ---- Product Ecosystem ----
  {
    id: "e1",
    factor: "ecosystem",
    prompt: "How many ways can someone buy from you?",
    options: [
      { label: "One main offer, take it or leave it.", score: 16 },
      { label: "A couple of options, loosely related.", score: 44 },
      { label: "A clear ladder from entry to core.", score: 72 },
      { label: "A full ecosystem: gifts → entry → core → premium.", score: 95 },
    ],
  },
  {
    id: "e2",
    factor: "ecosystem",
    prompt: "Do you have a low-risk entry offer that leads to your core offer?",
    options: [
      { label: "No — people go straight to the big commitment.", score: 14 },
      { label: "Informally, but it's not designed.", score: 43 },
      { label: "Yes, a deliberate entry offer.", score: 74 },
      { label: "Yes — and a clear ascension path beyond it.", score: 96 },
    ],
  },
  {
    id: "e3",
    factor: "ecosystem",
    prompt: "Do you have a premium, high-touch tier for your best clients?",
    options: [
      { label: "No — everyone pays roughly the same.", score: 18 },
      { label: "I've thought about it but not built it.", score: 46 },
      { label: "Yes, a small premium tier.", score: 73 },
      { label: "Yes — and it's in demand.", score: 95 },
    ],
  },

  // ---- Campaign Rhythm ----
  {
    id: "r1",
    factor: "rhythm",
    prompt: "How does your marketing actually happen?",
    options: [
      { label: "When I remember / when revenue dips.", score: 13 },
      { label: "Sporadic bursts, then it goes quiet.", score: 41 },
      { label: "Mostly consistent week to week.", score: 71 },
      { label: "A repeatable weekly engine that runs without me.", score: 95 },
    ],
  },
  {
    id: "r2",
    factor: "rhythm",
    prompt: "Do you run planned campaigns with a build-up and a launch?",
    options: [
      { label: "Never — I just post and hope.", score: 15 },
      { label: "Occasionally, when inspiration strikes.", score: 44 },
      { label: "A few proper campaigns a year.", score: 72 },
      { label: "Quarterly spotlights, planned in advance.", score: 94 },
    ],
  },
  {
    id: "r3",
    factor: "rhythm",
    prompt: "Do you have a 12-month content & marketing calendar?",
    options: [
      { label: "No calendar at all.", score: 14 },
      { label: "A rough idea in my head.", score: 42 },
      { label: "A partial plan for the next quarter or two.", score: 70 },
      { label: "A full 12-month calendar, mapped out.", score: 96 },
    ],
  },

  // ---- Conversion Pipeline (LAPSE) ----
  {
    id: "p1",
    factor: "pipeline",
    prompt: "Do you track Leads → Appointments → Presentations → Sales?",
    options: [
      { label: "No idea what those numbers are.", score: 13 },
      { label: "Gut feel only.", score: 40 },
      { label: "I track some of the stages.", score: 71 },
      { label: "A full dashboard, reviewed regularly.", score: 95 },
    ],
  },
  {
    id: "p2",
    factor: "pipeline",
    prompt: "Do you know your cost-per-lead and conversion rate?",
    options: [
      { label: "Not a clue.", score: 14 },
      { label: "Vaguely — I could guess.", score: 43 },
      { label: "I know most of my key numbers.", score: 73 },
      { label: "I know them precisely and act on them.", score: 95 },
    ],
  },
  {
    id: "p3",
    factor: "pipeline",
    prompt: "Can you predict next quarter's revenue from your pipeline?",
    options: [
      { label: "No — every month is a surprise.", score: 15 },
      { label: "I hope for the best.", score: 41 },
      { label: "Roughly, within a range.", score: 72 },
      { label: "Confidently — the numbers tell me.", score: 94 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Severity bands for a single factor score
// ---------------------------------------------------------------------------
export type Severity = "CRITICAL PRIORITY" | "NEEDS ATTENTION" | "WORTH ADDRESSING" | "STRONG";

export interface SeverityBand {
  label: Severity;
  colorVar: string; // CSS var name
  min: number;
}

export const SEVERITY_BANDS: SeverityBand[] = [
  { label: "STRONG", colorVar: "var(--ok)", min: 80 },
  { label: "WORTH ADDRESSING", colorVar: "var(--warn)", min: 65 },
  { label: "NEEDS ATTENTION", colorVar: "var(--hot)", min: 45 },
  { label: "CRITICAL PRIORITY", colorVar: "var(--crit)", min: 0 },
];

// ---------------------------------------------------------------------------
// Archetypes by overall score band
// ---------------------------------------------------------------------------
export interface Archetype {
  id: string;
  min: number; // inclusive lower bound of overall score
  title: string;
  tagline: string;
  diagnosis: string; // the "your business is fighting you because..." paragraph
  costLine: string; // what it's costing them — bridge to the VSL
}

export const ARCHETYPES: Archetype[] = [
  {
    id: "best-kept-secret",
    min: 0,
    title: "The Best-Kept Secret",
    tagline: "Brilliant work. Almost nobody knows.",
    diagnosis:
      "You're genuinely good at what you do — but your business has no demand engine. You compete on price, chase every lead, and ride a feast-or-famine rollercoaster. The market can't line up for something it can't see.",
    costLine:
      "Right now you're doing the hardest possible version of business: selling to people who don't know you yet, one at a time.",
  },
  {
    id: "hamster-wheel",
    min: 45,
    title: "The Hamster Wheel",
    tagline: "Always hustling for the next customer.",
    diagnosis:
      "You can generate customers — but only by pushing hard, constantly. The moment you stop marketing, demand dries up. You have pieces of the system, but they don't compound, so you're trading effort for revenue instead of building an engine.",
    costLine:
      "You've built a job that pays you in exhaustion. The growth ceiling is your own energy — and that's a ceiling that gets lower every year.",
  },
  {
    id: "quiet-specialist",
    min: 65,
    title: "The Quiet Specialist",
    tagline: "Respected, profitable — and badly under-leveraged.",
    diagnosis:
      "You've got real demand, a decent offer ladder, and you know your numbers. But your marketing isn't a repeatable engine, and you're not using AI leverage to multiply your reach. You're leaving a tier of clients — and a tier of pricing — completely untapped.",
    costLine:
      "You're one campaign system away from being oversubscribed. Most people in your position never close that gap — they just stay comfortable.",
  },
  {
    id: "oversubscribed",
    min: 81,
    title: "The Oversubscribed",
    tagline: "Rare air. Now defend and compound it.",
    diagnosis:
      "You've built genuine demand-supply tension, an offer ecosystem, a marketing rhythm, and a pipeline you can read. You're in the top few percent. The risk now isn't generating demand — it's complacency, and competitors who study what you did.",
    costLine:
      "The businesses that stay oversubscribed are the ones that systematise it before a competitor does. Optimisation at your level compounds faster than growth at anyone else's.",
  },
];
