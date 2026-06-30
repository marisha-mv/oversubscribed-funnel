import { FACTORS } from "@/data/quiz";
import { FactorResult } from "@/lib/score";

export default function ScoreBar({ factor, index }: { factor: FactorResult; index: number }) {
  const meta = FACTORS[factor.key];
  return (
    <div className="card animate-fade-up p-5" style={{ animationDelay: `${index * 120}ms` }}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg text-ink sm:text-xl">{meta.label}</h3>
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: factor.colorVar }}
        >
          {factor.severity}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="animate-grow h-full rounded-full"
            style={{
              width: `${factor.score}%`,
              background: factor.colorVar,
              animationDelay: `${index * 120 + 200}ms`,
            }}
          />
        </div>
        <span
          className="w-12 text-right font-mono text-lg font-bold tabular-nums"
          style={{ color: factor.colorVar }}
        >
          {factor.score}
        </span>
      </div>

      <p className="mt-2 text-sm text-ink-subtle">{meta.blurb}</p>
    </div>
  );
}
