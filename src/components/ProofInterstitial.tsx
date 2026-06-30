"use client";

import { TESTIMONIALS } from "@/data/proof";
import Avatar from "@/components/Avatar";

// Between-question proof slide (WarriorBabe-style). Shows a real, attributed
// client result, then auto-advances / lets the user continue.
export default function ProofInterstitial({
  testimonialIndex,
  eyebrow,
  onContinue,
}: {
  testimonialIndex: number;
  eyebrow: string;
  onContinue: () => void;
}) {
  const t = TESTIMONIALS[testimonialIndex] ?? TESTIMONIALS[0];

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-20">
      <div className="animate-fade-up text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-dark">
          {eyebrow}
        </p>

        <div className="card p-7 sm:p-8">
          <div className="flex items-center justify-center gap-3">
            <Avatar name={t.name} photo={t.photo} size={56} />
            <div className="text-left">
              <p className="font-display font-bold text-ink">{t.name}</p>
              <p className="text-sm text-ink-subtle">{t.role}</p>
            </div>
          </div>

          {/* result-stat overlay — the proof "image" */}
          <div className="mt-5 rounded-2xl bg-fuchsia-light px-5 py-4">
            <p className="font-display text-lg font-bold text-fuchsia-dark">{t.result}</p>
          </div>

          <p className="mt-5 text-lg leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>

          <div className="mt-4 flex items-center justify-center gap-1 text-yellow-brand" aria-label="5 out of 5">
            {"★★★★★".split("").map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>

        <button onClick={onContinue} className="btn-primary mt-8 px-10 py-4 text-base">
          Continue my scorecard →
        </button>
      </div>
    </main>
  );
}
