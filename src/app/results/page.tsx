"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loadSession } from "@/lib/storage";
import { scoreQuiz, ScorecardResult } from "@/lib/score";
import ScoreBar from "@/components/ScoreBar";
import Avatar from "@/components/Avatar";
import { TESTIMONIALS } from "@/data/proof";
import { IMG } from "@/data/images";

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
      setResult(scoreQuiz(session.answers, session.qual ?? {}));
    }
    setReady(true);
  }, [fnParam]);

  const greetName = name || "Founder";

  if (ready && !result) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-3xl text-ink">Let&apos;s get your score first.</h1>
        <p className="mt-3 text-ink-muted">Your personalised scorecard takes about two minutes.</p>
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

  const { factors, overall, archetype, ready: isReady } = result;
  const nextHref = `/vsl?fn=${encodeURIComponent(name || "")}&type=${archetype.id}`;

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

      {/* the cost / dream — Hormozi value framing */}
      <div className="card animate-fade-up mt-6 border-l-4 border-l-fuchsia-brand p-6">
        <p className="text-lg leading-relaxed text-ink">{archetype.costLine}</p>
        <p className="mt-3 font-display text-lg font-semibold text-fuchsia-dark">
          {archetype.dreamLine}
        </p>
      </div>

      {/* same-archetype proof — Hormozi "perceived likelihood" */}
      <div className="mt-8">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-ink-subtle">
          People who closed this gap
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {TESTIMONIALS.slice(0, 2).map((t) => (
            <div key={t.name} className="card p-5">
              <div className="flex items-center gap-3">
                <Avatar name={t.name} photo={t.photo} size={44} />
                <div>
                  <p className="font-display text-sm font-bold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-subtle">{t.role}</p>
                </div>
              </div>
              <p className="mt-3 rounded-xl bg-fuchsia-light px-3 py-2 text-sm font-bold text-fuchsia-dark">
                {t.result}
              </p>
              <p className="mt-3 text-sm text-ink-muted">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA — routed by readiness, honest urgency (no fake timer) */}
      <div className="mt-10 text-center">
        {isReady ? (
          <>
            <div className="mb-5 flex items-center justify-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG.daniel}
                alt="Daniel Priestley"
                className="h-16 w-16 rounded-full object-cover shadow-md"
              />
              <p className="text-left text-sm font-semibold text-ink">
                Daniel recorded a short training
                <br />
                <span className="font-normal text-ink-subtle">just for your result</span>
              </p>
            </div>
            <p className="text-ink-muted">
              You gave us your diagnosis — now here&apos;s the fix. Daniel shows {greetName} exactly
              how to engineer demand-supply tension and get high-paying clients lining up, in the age
              of AI.
            </p>
            <div className="chip mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm">
              Small cohorts only · we keep the accelerator high-touch
            </div>
            <div className="mt-6">
              <Link href={nextHref} className="btn-primary animate-pulse-primary inline-block px-10 py-4 text-lg">
                WATCH MY PERSONALISED TRAINING →
              </Link>
            </div>
            <p className="mt-3 text-sm text-ink-subtle">Free · ~18 minutes · watch on demand</p>
          </>
        ) : (
          <>
            <p className="text-ink-muted">
              Here&apos;s the honest next step for you, {greetName}: get your offer reliably working
              first. This short training shows where getting oversubscribed fits — so you build the
              demand engine at the right time, not too early.
            </p>
            <div className="mt-6">
              <Link href={nextHref} className="btn-primary inline-block px-10 py-4 text-lg">
                SHOW ME WHERE I FIT →
              </Link>
            </div>
            <p className="mt-3 text-sm text-ink-subtle">Free · ~18 minutes · watch on demand</p>
          </>
        )}
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
