"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loadSession } from "@/lib/storage";
import { scoreQuiz, ScorecardResult } from "@/lib/score";
import ScoreBar from "@/components/ScoreBar";
import Countdown from "@/components/Countdown";

function ResultsInner() {
  const params = useSearchParams();
  const fnParam = params.get("fn");
  const [result, setResult] = useState<ScorecardResult | null>(null);
  const [name, setName] = useState<string>("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = loadSession();
    const display = (fnParam || session?.firstName || "").trim();
    setName(display);
    if (session?.answers && Object.keys(session.answers).length) {
      setResult(scoreQuiz(session.answers));
    }
    setReady(true);
  }, [fnParam]);

  const greetName = name || "Founder";
  const vslHref = `/vsl${name ? `?fn=${encodeURIComponent(name)}` : ""}`;

  // No quiz data in session (e.g. opened directly) → send them to take it.
  if (ready && !result) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-3xl text-ink">Let&apos;s get your score first.</h1>
        <p className="mt-3 text-ink-muted">
          Your personalised scorecard takes about two minutes.
        </p>
        <Link href="/" className="btn-primary mt-7 px-8 py-3.5">
          Take the Oversubscribed Scorecard →
        </Link>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-ink-subtle">Calculating your scorecard…</p>
      </main>
    );
  }

  const { factors, overall, archetype } = result;

  return (
    <main className="mx-auto max-w-2xl px-5 py-14 sm:py-20">
      {/* header */}
      <div className="animate-fade-up text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-dark">
          Your Oversubscribed Scorecard
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl">
          {greetName}, here&apos;s the truth
          <br className="hidden sm:block" /> about your demand engine.
        </h1>
      </div>

      {/* overall + archetype */}
      <div className="card animate-fade-up mt-8 p-7 text-center sm:p-9">
        <div className="flex items-center justify-center gap-2">
          <span className="font-display text-6xl text-gradient sm:text-7xl">{overall}</span>
          <span className="text-2xl text-ink-subtle">/100</span>
        </div>
        <p className="mt-1 text-sm uppercase tracking-widest text-ink-subtle">
          Overall oversubscribed score
        </p>
        <div className="mx-auto mt-5 max-w-md">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-dark">Your type</p>
          <h2 className="mt-1 font-display text-3xl text-ink">{archetype.title}</h2>
          <p className="mt-1 font-semibold italic text-cyan-brand">{archetype.tagline}</p>
          <p className="mt-4 text-ink-muted">{archetype.diagnosis}</p>
        </div>
      </div>

      {/* factor breakdown */}
      <div className="mt-6 space-y-4">
        {factors.map((f, i) => (
          <ScoreBar key={f.key} factor={f} index={i} />
        ))}
      </div>

      {/* the cost / bridge */}
      <div className="card animate-fade-up mt-6 border-l-4 border-l-fuchsia-brand p-6">
        <p className="text-lg leading-relaxed text-ink">{archetype.costLine}</p>
      </div>

      {/* testimonial — SOURCE A REAL ONE before launch */}
      <div className="card animate-fade-up mt-6 p-6">
        {/* [TESTIMONIAL — source real quote from stories.mindvalley.com or Priestley's EM ratings] */}
        <p className="text-ink-muted">
          &ldquo;I came in thinking I had a marketing problem. I left realising I had a{" "}
          <em>demand-design</em> problem — and a 12-month plan to fix it. We went from chasing to
          choosing clients.&rdquo;
        </p>
        <p className="mt-3 text-sm font-bold text-fuchsia-dark">
          — Programme member, Entrepreneurship Mastery
          <span className="font-normal text-ink-subtle">
            {" "}
            · sessions rated 9.55/10 across 700+ ratings
          </span>
        </p>
      </div>

      {/* CTA block */}
      <div className="mt-10 text-center">
        <p className="text-ink-muted">
          Daniel recorded a short, personalised training that walks {greetName} through exactly how
          to close these gaps and engineer demand-supply tension — in the age of AI.
        </p>

        <div className="chip mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm">
          <span>Your training unlocks for the next</span>
          <Countdown seconds={420} />
        </div>

        <div className="mt-6">
          <Link href={vslHref} className="btn-primary animate-pulse-primary inline-block px-10 py-4 text-lg">
            WATCH MY PERSONALISED TRAINING NOW →
          </Link>
        </div>
        <p className="mt-3 text-sm text-ink-subtle">Free · ~18 minutes · watch on demand</p>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-ink-subtle">Loading your scorecard…</p>
        </main>
      }
    >
      <ResultsInner />
    </Suspense>
  );
}
