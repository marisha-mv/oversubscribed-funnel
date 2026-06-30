"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TESTIMONIALS, PROOF_STATS } from "@/data/proof";
import Avatar from "@/components/Avatar";

const REVEAL_AFTER_SECONDS = 8; // set to ~600 (10 min) for production; short for testing

// Per-archetype opening line (Levesque: route each bucket to a matched VSL framing).
const OPENERS: Record<string, string> = {
  "best-kept-secret":
    "You're great at what you do — and almost nobody knows it. Here's how to change that.",
  "hamster-wheel":
    "You can get clients — but only by pushing hard, constantly. Here's how to build the engine instead.",
  "quiet-specialist":
    "You're respected and profitable, but badly under-leveraged. Here's how to close the gap.",
  "almost-oversubscribed":
    "You're in rare air. Here's how to systematise it and defend it for the next 12 months.",
  "foundation-first":
    "Before you build a demand engine, here's how to know your offer is ready — and where this fits.",
};

const STACK = [
  { item: "The 2-day Oversubscribed Accelerator with Daniel Priestley", value: "$2,000" },
  { item: "Your finished 12-month content & campaign calendar (built with you)", value: "$1,500" },
  { item: "The 4-tier product ecosystem mapped to your business", value: "$1,000" },
  { item: "The LAPSE pipeline dashboard set up to your numbers", value: "$500" },
  { item: 'The "Get Oversubscribed" Claude AI skill (run your campaigns at scale)', value: "$500" },
  { item: "Fill-in-the-blank workbooks for every exercise", value: "$300" },
];

const BONUSES = [
  {
    title: "The Cold-Start Demand Playbook",
    kills: "“But I don't have an audience yet.”",
    desc: "How to manufacture demand-supply tension from a standing start — no big following required.",
  },
  {
    title: "Done-With-You Templates & AI Prompts",
    kills: "“But I don't have time.”",
    desc: "You don't build from scratch — you plug your business into ours and let AI do the heavy lifting.",
  },
  {
    title: "The Short-Form / Long-Form / Lead-Form Swipe Pack",
    kills: "“But will this work in my niche?”",
    desc: "The exact Pain·Prize·Problem·News content rhythm Daniel uses, with examples to adapt.",
  },
];

function VslInner() {
  const params = useSearchParams();
  const name = (params.get("fn") || "").trim();
  const type = params.get("type") || "";
  const greet = name || "there";
  const opener = OPENERS[type];
  const applyHref = `/apply?fn=${encodeURIComponent(name)}&type=${type}`;

  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), REVEAL_AFTER_SECONDS * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      {/* headline */}
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-dark">
          Your personalised training · with Daniel Priestley
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
          {greet === "there" ? "How to" : `${greet}, how to`} stop pitching
          <br className="hidden sm:block" /> and start <span className="text-gradient">picking</span>{" "}
          your clients
        </h1>
        {opener && <p className="mx-auto mt-4 max-w-xl text-ink-muted">{opener}</p>}
        <p className="mx-auto mt-3 max-w-xl text-ink-muted">
          Watch this before you touch your marketing again. It explains the exact system behind your
          scorecard — and how a small team can now create demand at a scale that used to take 50
          people.
        </p>
      </div>

      {/* video placeholder */}
      <div className="card mt-8 overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-center bg-ink">
          {/* [VIDEO PLACEHOLDER — embed Wistia/YouTube/Vimeo/MP4. Script in VSL-SCRIPT.md] */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-fuchsia-brand text-2xl text-white shadow-lg">
              ▶
            </div>
            <p className="mt-4 text-sm uppercase tracking-widest text-white/70">Video sales letter</p>
            <p className="mt-1 text-xs text-white/40">[ placeholder — record from VSL-SCRIPT.md ]</p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-ink-subtle">
        Turn your sound on. Best watched start to finish.
      </p>

      {/* CTA reveal */}
      <div className="mt-8 text-center">
        {revealed ? (
          <div className="animate-fade-up">
            <Link href={applyHref} className="btn-primary animate-pulse-primary inline-block px-12 py-4 text-lg">
              APPLY NOW →
            </Link>
            <p className="mt-3 text-sm text-ink-subtle">
              Small cohorts per intake · application takes 2 minutes
            </p>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm text-ink-subtle">
            <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-brand" />
            Keep watching — your next step appears in a moment.
          </div>
        )}
      </div>

      {/* credibility stat badges */}
      <section className="mt-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {PROOF_STATS.map((s) => (
            <div key={s.label} className="card p-4 text-center">
              <p className="font-display text-2xl font-bold text-gradient">{s.stat}</p>
              <p className="mt-1 text-xs leading-snug text-ink-subtle">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* what you'll build (value equation: dream outcome + low effort) */}
      <section className="mt-12">
        <h2 className="text-center font-display text-2xl text-ink sm:text-3xl">
          You don&apos;t leave with notes. You leave with the asset.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink-muted">
          This is done <em>with</em> you. You plug your business into Daniel&apos;s frameworks and
          walk out with a demand engine already built — not a course you have to figure out later.
        </p>
        <div className="card mt-6 p-7 sm:p-9">
          <ul className="space-y-3">
            {STACK.map((s) => (
              <li key={s.item} className="flex items-start justify-between gap-4">
                <span className="flex items-start gap-3 text-ink-muted">
                  <span className="mt-0.5 font-bold text-fuchsia-brand">✓</span>
                  {s.item}
                </span>
                <span className="shrink-0 font-mono text-sm text-ink-subtle line-through">
                  {s.value}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
            <span className="font-display font-bold text-ink">Total value</span>
            <span className="font-display text-xl font-bold text-ink-subtle line-through">$5,800</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-display font-bold text-ink">Your virtual seat</span>
            <span className="font-display text-2xl font-bold text-gradient">$1,000</span>
          </div>
        </div>
      </section>

      {/* bonuses — each kills an objection */}
      <section className="mt-12">
        <h2 className="text-center font-display text-2xl text-ink sm:text-3xl">
          Plus three bonuses that remove your last excuse
        </h2>
        <div className="mt-6 space-y-4">
          {BONUSES.map((b) => (
            <div key={b.title} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg text-fuchsia-dark">{b.title}</h3>
                <span className="text-xs font-semibold text-ink-subtle">{b.kills}</span>
              </div>
              <p className="mt-2 text-sm text-ink-muted">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* guarantee */}
      <section className="mt-12">
        <div className="card border-2 border-fuchsia-brand p-7 text-center sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-dark">
            The build-it-or-we-keep-going guarantee
          </p>
          <p className="mt-3 text-ink">
            Show up to both days, do the workbooks, and build your plan. If you don&apos;t walk away
            with a complete, ready-to-run 12-month demand plan, we&apos;ll keep working with you
            until you do. And if it&apos;s not for you, tell us within 14 days for a full refund.
          </p>
        </div>
      </section>

      {/* proof grid */}
      <section className="mt-12">
        <h2 className="text-center font-display text-2xl text-ink sm:text-3xl">
          Founders who got oversubscribed
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
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
        <p className="mt-3 text-center text-xs text-ink-subtle">
          Real client results from Daniel&apos;s programs. Sources on file.
        </p>
      </section>

      {/* Priestley bio */}
      <section className="mt-12">
        <div className="card p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-dark">
            Your mentor
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink">Daniel Priestley</h2>
          <p className="mt-3 text-ink-muted">
            Founder who has built and sold businesses across the UK, Australia and Singapore. He
            created the <em>Oversubscribed</em> and <em>Key Person of Influence</em> methodologies,
            founded ScoreApp (150,000+ leads a month for 4,000+ clients), and is the most-returning
            guest on Diary of a CEO. His sessions inside Mindvalley&apos;s Entrepreneurship Mastery
            average <strong className="text-ink">9.55 / 10</strong> across 700+ ratings.
          </p>
        </div>
      </section>

      {/* final CTA */}
      <div className="mt-14 text-center">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          Ready to have clients lining up for you?
        </h2>
        <div className="chip mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm">
          Cohorts are capped to stay high-touch
        </div>
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
