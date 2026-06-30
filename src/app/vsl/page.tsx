"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const REVEAL_AFTER_SECONDS = 8; // set to ~600 (10 min) for production; short here for testing

const PRINCIPLES = [
  {
    t: "Only oversubscribed businesses make a profit",
    d: "Profit lives in the gap between demand and supply. We engineer that tension on purpose.",
  },
  {
    t: "Signals before sales",
    d: "Measure interest before you ask for the order — so you sell to a warm, self-selected market.",
  },
  {
    t: "A product ecosystem, not a price tag",
    d: "Gifts → entry → core → premium. A ladder that lets people buy at the level they're ready for.",
  },
  {
    t: "A repeatable campaign rhythm",
    d: "A repeatable week, quarterly spotlights, and one annual message — content that compounds.",
  },
];

const DELIVERABLES = [
  "A finished 12-month content & marketing calendar — built with you, not handed to you",
  "The four-tier product ecosystem mapped to your business",
  "The LAPSE dashboard (Leads → Appointments → Presentations → Sales) set up for your numbers",
  'The "Get Oversubscribed" Claude AI skill to produce your campaigns at scale',
  "Fill-in-the-blank workbooks for every exercise",
];

function VslInner() {
  const params = useSearchParams();
  const name = (params.get("fn") || "").trim();
  const greet = name || "there";
  const applyHref = `/apply${name ? `?fn=${encodeURIComponent(name)}` : ""}`;

  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), REVEAL_AFTER_SECONDS * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      {/* eyebrow + headline */}
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-dark">
          Your personalised training · with Daniel Priestley
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
          {greet === "there" ? "How to" : `${greet}, how to`} stop chasing customers
          <br className="hidden sm:block" /> — and get{" "}
          <span className="text-gradient">oversubscribed</span> in the age of AI
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted">
          Watch this before you do anything else with your marketing. It explains the exact system
          behind your scorecard — and how a small team can now create demand at a scale that used
          to take 50 people.
        </p>
      </div>

      {/* video placeholder */}
      <div className="card mt-8 overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-center bg-ink">
          {/* [VIDEO PLACEHOLDER — embed Wistia/YouTube/Vimeo/MP4 here. Script in VSL-SCRIPT.md] */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-fuchsia-brand text-2xl text-white shadow-lg">
              ▶
            </div>
            <p className="mt-4 text-sm uppercase tracking-widest text-white/70">
              Video sales letter
            </p>
            <p className="mt-1 text-xs text-white/40">[ placeholder — record from VSL-SCRIPT.md ]</p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-ink-subtle">
        Turn your sound on. Best watched start to finish — the offer at the end is only explained
        once.
      </p>

      {/* CTA (revealed after the pitch lands) */}
      <div className="mt-8 text-center">
        {revealed ? (
          <div className="animate-fade-up">
            <Link
              href={applyHref}
              className="btn-primary animate-pulse-primary inline-block px-12 py-4 text-lg"
            >
              APPLY NOW →
            </Link>
            <p className="mt-3 text-sm text-ink-subtle">
              Limited places per intake · application takes 2 minutes
            </p>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm text-ink-subtle">
            <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-brand" />
            Keep watching — your next step appears in a moment.
          </div>
        )}
      </div>

      {/* the principles */}
      <section className="mt-16">
        <h2 className="text-center font-display text-2xl text-ink sm:text-3xl">
          What you&apos;ll learn to build
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.t} className="card p-5">
              <h3 className="font-display text-lg text-fuchsia-dark">{p.t}</h3>
              <p className="mt-2 text-sm text-ink-muted">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* deliverables */}
      <section className="mt-12">
        <div className="card p-7 sm:p-9">
          <h2 className="font-display text-2xl text-ink">
            You don&apos;t leave with notes. You leave with the asset.
          </h2>
          <ul className="mt-5 space-y-3">
            {DELIVERABLES.map((d) => (
              <li key={d} className="flex items-start gap-3">
                <span className="mt-0.5 font-bold text-fuchsia-brand">✓</span>
                <span className="text-ink-muted">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Priestley bio */}
      <section className="mt-12">
        <div className="card p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-dark">
            Your mentor
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink">Daniel Priestley</h2>
          <p className="mt-3 text-ink-muted">
            Founder and entrepreneur who has built and sold businesses across multiple countries.
            He took his first company from zero to $1.3M with no audience and no brand, founded
            ScoreApp (which does well over $500K a month), and created the{" "}
            <em>Key Person of Influence</em> and <em>Oversubscribed</em> methodologies now used by
            tens of thousands of founders. His sessions inside Mindvalley&apos;s Entrepreneurship
            Mastery average <strong className="text-ink">9.55 / 10</strong> across 700+ ratings.
          </p>
        </div>
      </section>

      {/* final CTA */}
      <div className="mt-14 text-center">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          Ready to engineer demand instead of chasing it?
        </h2>
        <div className="mt-6">
          <Link href={applyHref} className="btn-primary inline-block px-12 py-4 text-lg">
            APPLY NOW →
          </Link>
        </div>
        <p className="mt-3 text-sm text-ink-subtle">
          Apply to join the next intake of the Oversubscribed Accelerator.
        </p>
      </div>
    </main>
  );
}

export default function VslPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-ink-subtle">Loading your training…</p>
        </main>
      }
    >
      <VslInner />
    </Suspense>
  );
}
