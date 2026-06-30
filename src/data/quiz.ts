// ============================================================================
// The Oversubscribed Scorecard — quiz definition (v2)
//
// Informed by: the accelerator curriculum + the Jun 2026 planning call with
// Daniel Priestley (real buyer = coaches/consultants/speakers/solopreneurs,
// mostly <$100k/yr, who want enough high-paying clients), Ryan Levesque's
// ASK/bucket method (grease-the-wheels opener, qualification, buckets-as-
// identity, opt-in after the last question), and Hormozi (qualify the right
// people, sell the implementation).
//
// 4 scored factors (rendered as the 4 "score bars"):
//   demand    — Demand–Supply Tension (telegraphed capacity / waitlist / pricing power)
//   ecosystem — Product Ecosystem (the 4-tier ladder: free → diagnostic → core → subscription)
//   rhythm    — Campaign Rhythm (short-form → long-form → lead-form, weekly + quarterly)
//   pipeline  — Numbers (the LAPSE pipeline you can see and predict)
//
// Qualification answers (not scored) drive routing to the right archetype.
// ============================================================================

export type FactorKey = "demand" | "ecosystem" | "rhythm" | "pipeline";
export type QualKey = "identity" | "pmf" | "revenue";

export interface Factor {
  key: FactorKey;
  label: string;
  blurb: string;
}

export interface ScoredOption {
  label: string;
  score: number; // 0–100 health for this factor
}
export interface QualOption {
  label: string;
  value: string;
}

export interface ScoredQuestion {
  id: string;
  kind: "scored";
  factor: FactorKey;
  prompt: string;
  options: ScoredOption[];
}
export interface QualQuestion {
  id: string;
  kind: "qual";
  qualKey: QualKey;
  prompt: string;
  options: QualOption[];
}
export interface ProofStep {
  id: string;
  kind: "proof";
  testimonialIndex: number; // index into TESTIMONIALS (src/data/proof.ts)
  eyebrow: string;
}
export type Step = ScoredQuestion | QualQuestion | ProofStep;

export const FACTORS: Record<FactorKey, Factor> = {
  demand: {
    key: "demand",
    label: "Demand–Supply Tension",
    blurb: "Whether clients line up for you — or you chase them.",
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
    label: "Numbers & Pipeline",
    blurb: "Whether you can see and predict where your next clients come from.",
  },
};

export const FACTOR_ORDER: FactorKey[] = ["demand", "ecosystem", "rhythm", "pipeline"];

// ---------------------------------------------------------------------------
// The ordered flow: qualification → proof → scored blocks (with proof between)
// ---------------------------------------------------------------------------
export const STEPS: Step[] = [
  // --- Qualification (Levesque "grease-the-wheels" first) ---
  {
    id: "q_identity",
    kind: "qual",
    qualKey: "identity",
    prompt: "First — which best describes you?",
    options: [
      { label: "Coach", value: "coach" },
      { label: "Consultant or advisor", value: "consultant" },
      { label: "Speaker, author or expert", value: "expert" },
      { label: "Course / digital-product creator", value: "creator" },
      { label: "Agency or done-for-you service", value: "agency" },
      { label: "Something else", value: "other" },
    ],
  },
  {
    id: "q_pmf",
    kind: "qual",
    qualKey: "pmf",
    prompt: "How consistently do you get great results for the clients you work with?",
    options: [
      { label: "I'm still shaping my offer — few or no paying clients yet", value: "none" },
      { label: "Some clients get results — it's a bit hit-and-miss", value: "weak" },
      { label: "Most clients get strong, repeatable results", value: "strong" },
      { label: "Clients consistently get results they rave about", value: "proven" },
    ],
  },
  {
    id: "q_revenue",
    kind: "qual",
    qualKey: "revenue",
    prompt: "Where's your business right now?",
    options: [
      { label: "Just getting started / pre-revenue", value: "pre" },
      { label: "Under $5k / month", value: "u5" },
      { label: "$5k–$15k / month", value: "5_15" },
      { label: "$15k–$40k / month", value: "15_40" },
      { label: "$40k+ / month", value: "40plus" },
    ],
  },

  { id: "p_open", kind: "proof", testimonialIndex: 1, eyebrow: "You're in good company" },

  // --- Demand–Supply Tension ---
  {
    id: "d1",
    kind: "scored",
    factor: "demand",
    prompt: "When you want new clients, what actually happens?",
    options: [
      { label: "I hustle hard — outreach, discounts, chasing leads.", score: 12 },
      { label: "A few trickle in, but I can't rely on it.", score: 42 },
      { label: "I get steady, fairly predictable inbound interest.", score: 70 },
      { label: "Demand outstrips capacity — I run a waitlist.", score: 96 },
    ],
  },
  {
    id: "d2",
    kind: "scored",
    factor: "demand",
    prompt:
      "Could you tell your market “I take on a limited number of clients and there's a waiting list” — and have it be true?",
    options: [
      { label: "No way — I'd take anyone who can pay right now.", score: 14 },
      { label: "Not yet, but I'd love to be there.", score: 40 },
      { label: "Getting close — demand is building.", score: 72 },
      { label: "Yes — that's already true for me.", score: 95 },
    ],
  },

  // --- Product Ecosystem ---
  {
    id: "e1",
    kind: "scored",
    factor: "ecosystem",
    prompt: "How many ways can someone buy from you?",
    options: [
      { label: "One main offer — take it or leave it.", score: 16 },
      { label: "A couple of options, loosely related.", score: 44 },
      { label: "A clear ladder from entry to core.", score: 72 },
      { label: "A full ecosystem: free → diagnostic → core → subscription.", score: 95 },
    ],
  },
  {
    id: "e2",
    kind: "scored",
    factor: "ecosystem",
    prompt: "Do you have a free, low-risk entry point (like a scorecard or assessment) that leads to your core offer?",
    options: [
      { label: "No — people jump straight to the big commitment.", score: 14 },
      { label: "Informally, but it's not designed.", score: 43 },
      { label: "Yes — a deliberate entry offer.", score: 74 },
      { label: "Yes — and a clear path that ascends from it.", score: 96 },
    ],
  },

  { id: "p_mid", kind: "proof", testimonialIndex: 2, eyebrow: "This works at every level" },

  // --- Campaign Rhythm ---
  {
    id: "r1",
    kind: "scored",
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
    kind: "scored",
    factor: "rhythm",
    prompt:
      "Do you run a repeatable content rhythm — daily short-form, deeper monthly content, a quarterly offer — and use AI to scale it?",
    options: [
      { label: "No rhythm, and barely using AI.", score: 13 },
      { label: "I post sometimes; AI now and then.", score: 42 },
      { label: "Fairly consistent, starting to leverage AI.", score: 71 },
      { label: "Systemized rhythm, heavily AI-leveraged.", score: 95 },
    ],
  },

  // --- Numbers & Pipeline ---
  {
    id: "p1",
    kind: "scored",
    factor: "pipeline",
    prompt: "Do you know your numbers — leads, conversations, conversions, sales?",
    options: [
      { label: "No idea what those numbers are.", score: 13 },
      { label: "Gut feel only.", score: 40 },
      { label: "I track some of the stages.", score: 71 },
      { label: "A full pipeline I review regularly.", score: 95 },
    ],
  },
  {
    id: "p2",
    kind: "scored",
    factor: "pipeline",
    prompt: "Can you predict next quarter's revenue from your pipeline?",
    options: [
      { label: "No — every month is a surprise.", score: 15 },
      { label: "I just hope for the best.", score: 41 },
      { label: "Roughly, within a range.", score: 72 },
      { label: "Confidently — the numbers tell me.", score: 94 },
    ],
  },

  { id: "p_close", kind: "proof", testimonialIndex: 0, eyebrow: "Where this can go" },
];

export const SCORED_QUESTIONS = STEPS.filter(
  (s): s is ScoredQuestion => s.kind === "scored"
);
export const QUAL_QUESTIONS = STEPS.filter((s): s is QualQuestion => s.kind === "qual");

// ---------------------------------------------------------------------------
// Severity bands for a single factor score
// ---------------------------------------------------------------------------
export type Severity = "CRITICAL PRIORITY" | "NEEDS ATTENTION" | "WORTH ADDRESSING" | "STRONG";

export interface SeverityBand {
  label: Severity;
  colorVar: string;
  min: number;
}

export const SEVERITY_BANDS: SeverityBand[] = [
  { label: "STRONG", colorVar: "var(--ok)", min: 80 },
  { label: "WORTH ADDRESSING", colorVar: "var(--warn)", min: 65 },
  { label: "NEEDS ATTENTION", colorVar: "var(--hot)", min: 45 },
  { label: "CRITICAL PRIORITY", colorVar: "var(--crit)", min: 0 },
];

// ---------------------------------------------------------------------------
// Archetypes (buckets as identity, Levesque-style). `ready` decides routing:
// ready=true → demand training + application; ready=false → fundamentals nurture.
// ---------------------------------------------------------------------------
export interface Archetype {
  id: string;
  min: number;
  ready: boolean;
  title: string;
  tagline: string;
  diagnosis: string;
  costLine: string;
  dreamLine: string; // the status-flip (Hormozi dream outcome)
}

// Used when the prospect isn't yet product-market-fit ready (pmf === "none").
export const NOT_READY_ARCHETYPE: Archetype = {
  id: "foundation-first",
  min: 0,
  ready: false,
  title: "The Foundation-Builder",
  tagline: "The demand engine comes next — first, nail the offer.",
  diagnosis:
    "Getting oversubscribed is a go-to-market strategy — it multiplies demand for an offer that already works. You told us your offer is still taking shape, so pouring marketing on it now would amplify the wrong thing. Lock in an offer that reliably gets clients results first; then the demand engine has something worth lining up for.",
  costLine:
    "Most people skip this and spend a year shouting about an offer the market isn't ready to queue for. You can avoid that.",
  dreamLine: "Get the offer right, and “getting clients” stops being the hard part.",
};

export const ARCHETYPES: Archetype[] = [
  {
    id: "best-kept-secret",
    min: 0,
    ready: true,
    title: "The Best-Kept Secret",
    tagline: "Brilliant work. Almost nobody knows.",
    diagnosis:
      "You get clients results — but you have no demand engine. You compete on price, chase every lead, and ride the feast-or-famine rollercoaster. The market can't line up for something it can't see.",
    costLine:
      "Right now you're doing the hardest version of business: selling to people who don't know you yet, one at a time.",
    dreamLine: "Imagine being the obvious choice in your niche — clients arriving pre-sold.",
  },
  {
    id: "hamster-wheel",
    min: 45,
    ready: true,
    title: "The Hamster Wheel",
    tagline: "Always hustling for the next client.",
    diagnosis:
      "You can generate clients — but only by pushing hard, constantly. The moment you stop marketing, demand dries up. You have pieces of the system, but they don't compound, so you trade effort for revenue instead of building an engine.",
    costLine:
      "You've built a job that pays you in exhaustion. The growth ceiling is your own energy — and it drops every year.",
    dreamLine: "Imagine demand that keeps flowing on the weeks you don't post at all.",
  },
  {
    id: "quiet-specialist",
    min: 65,
    ready: true,
    title: "The Quiet Specialist",
    tagline: "Respected, profitable — and badly under-leveraged.",
    diagnosis:
      "You have real demand, a decent offer ladder, and you know your numbers. But your marketing isn't a repeatable engine, and you're not using AI to multiply your reach. You're leaving a tier of clients — and a tier of pricing — untapped.",
    costLine:
      "You're one campaign system away from being oversubscribed. Most people in your position stay comfortable and never close that gap.",
    dreamLine: "Imagine raising your prices and watching the waitlist grow anyway.",
  },
  {
    id: "almost-oversubscribed",
    min: 81,
    ready: true,
    title: "The Almost-Oversubscribed",
    tagline: "Rare air. Now systematise and defend it.",
    diagnosis:
      "You've built genuine demand-supply tension, an offer ecosystem, a marketing rhythm, and a pipeline you can read. You're in the top few percent. The risk now isn't generating demand — it's complacency, and competitors studying what you did.",
    costLine:
      "The businesses that stay oversubscribed systematise it before a competitor does. At your level, optimisation compounds faster than growth does for anyone else.",
    dreamLine: "Imagine a 12-month calendar that keeps you oversubscribed on autopilot.",
  },
];
