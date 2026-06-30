import {
  ARCHETYPES,
  Archetype,
  FACTOR_ORDER,
  FactorKey,
  NOT_READY_ARCHETYPE,
  SCORED_QUESTIONS,
  SEVERITY_BANDS,
  Severity,
} from "@/data/quiz";

export type Answers = Record<string, number>; // scored questionId -> chosen score
export type QualAnswers = Record<string, string>; // qualKey -> chosen value

export interface FactorResult {
  key: FactorKey;
  score: number;
  severity: Severity;
  colorVar: string;
}

export interface ScorecardResult {
  factors: FactorResult[];
  overall: number;
  archetype: Archetype;
  ready: boolean; // false → route to fundamentals nurture instead of application
}

export function severityFor(score: number): { label: Severity; colorVar: string } {
  const band =
    SEVERITY_BANDS.find((b) => score >= b.min) ?? SEVERITY_BANDS[SEVERITY_BANDS.length - 1];
  return { label: band.label, colorVar: band.colorVar };
}

export function archetypeFor(overall: number): Archetype {
  let chosen = ARCHETYPES[0];
  for (const a of ARCHETYPES) {
    if (overall >= a.min) chosen = a;
  }
  return chosen;
}

export function scoreQuiz(answers: Answers, qual: QualAnswers = {}): ScorecardResult {
  const factors: FactorResult[] = FACTOR_ORDER.map((key) => {
    const qs = SCORED_QUESTIONS.filter((q) => q.factor === key);
    const vals = qs
      .map((q) => answers[q.id])
      .filter((v): v is number => typeof v === "number");
    const avg = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
    const sev = severityFor(avg);
    return { key, score: avg, severity: sev.label, colorVar: sev.colorVar };
  });

  const overall = Math.round(
    factors.reduce((a, f) => a + f.score, 0) / (factors.length || 1)
  );

  // Qualification gate: no product-market fit yet → route to fundamentals.
  const notReady = qual.pmf === "none";
  const archetype = notReady ? NOT_READY_ARCHETYPE : archetypeFor(overall);

  return { factors, overall, archetype, ready: archetype.ready };
}

export const TOTAL_QUESTIONS = SCORED_QUESTIONS.length;
