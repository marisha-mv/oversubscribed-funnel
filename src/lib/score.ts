import {
  ARCHETYPES,
  Archetype,
  FACTOR_ORDER,
  FactorKey,
  QUESTIONS,
  SEVERITY_BANDS,
  Severity,
} from "@/data/quiz";

export type Answers = Record<string, number>; // questionId -> chosen option score

export interface FactorResult {
  key: FactorKey;
  score: number; // 0–100
  severity: Severity;
  colorVar: string;
}

export interface ScorecardResult {
  factors: FactorResult[];
  overall: number; // 0–100
  archetype: Archetype;
}

export function severityFor(score: number): { label: Severity; colorVar: string } {
  const band = SEVERITY_BANDS.find((b) => score >= b.min) ?? SEVERITY_BANDS[SEVERITY_BANDS.length - 1];
  return { label: band.label, colorVar: band.colorVar };
}

export function archetypeFor(overall: number): Archetype {
  // highest band whose min is <= overall
  let chosen = ARCHETYPES[0];
  for (const a of ARCHETYPES) {
    if (overall >= a.min) chosen = a;
  }
  return chosen;
}

export function scoreQuiz(answers: Answers): ScorecardResult {
  const factors: FactorResult[] = FACTOR_ORDER.map((key) => {
    const qs = QUESTIONS.filter((q) => q.factor === key);
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

  return { factors, overall, archetype: archetypeFor(overall) };
}

export const TOTAL_QUESTIONS = QUESTIONS.length;
