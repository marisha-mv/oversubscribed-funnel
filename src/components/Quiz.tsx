"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { STEPS, FACTORS, FACTOR_ORDER } from "@/data/quiz";
import { Answers, QualAnswers, scoreQuiz } from "@/lib/score";
import { saveSession } from "@/lib/storage";
import ProgressBar from "@/components/ProgressBar";
import ProofInterstitial from "@/components/ProofInterstitial";

type Phase = "intro" | "steps" | "capture";

export default function Quiz() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0); // index into STEPS
  const [answers, setAnswers] = useState<Answers>({});
  const [qual, setQual] = useState<QualAnswers>({});
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // progress is measured over question steps only (qual + scored), not proof slides
  const questionStepIndexes = useMemo(
    () => STEPS.map((s, i) => (s.kind === "proof" ? -1 : i)).filter((i) => i >= 0),
    []
  );
  const totalQuestions = questionStepIndexes.length;
  const currentQuestionNumber = questionStepIndexes.filter((i) => i <= idx).length;

  function advance() {
    if (idx + 1 < STEPS.length) {
      setIdx(idx + 1);
    } else {
      setPhase("capture");
    }
  }

  function chooseScored(id: string, score: number) {
    setAnswers((a) => ({ ...a, [id]: score }));
    window.setTimeout(advance, 160);
  }
  function chooseQual(key: string, value: string) {
    setQual((q) => ({ ...q, [key]: value }));
    window.setTimeout(advance, 160);
  }

  function back() {
    if (phase === "capture") {
      setPhase("steps");
      setIdx(STEPS.length - 1);
    } else if (idx > 0) {
      setIdx(idx - 1);
    } else {
      setPhase("intro");
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setSubmitting(true);
    const fn = firstName.trim();
    saveSession({ answers, qual, firstName: fn, email: email.trim() });
    const result = scoreQuiz(answers, qual);
    try {
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quiz",
          firstName: fn,
          email: email.trim(),
          qual,
          answers,
          archetype: result.archetype.id,
          overall: result.overall,
        }),
      }).catch(() => {});
    } catch {
      /* ignore */
    }
    router.push(`/results?fn=${encodeURIComponent(fn)}`);
  }

  // ---------- INTRO ----------
  if (phase === "intro") {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-5 py-16 text-center">
        <div className="animate-fade-up">
          <p className="chip mb-5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
            With Daniel Priestley
          </p>
          <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-6xl">
            Do clients <span className="text-gradient">line up</span> for you?
            <br className="hidden sm:block" /> Or are you chasing them?
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-muted">
            Take the 2-minute <strong className="text-ink">Oversubscribed Scorecard</strong> and
            see exactly where your demand engine is leaking — across the four factors that decide
            whether high-paying clients line up for you, or you go chasing them.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
            {FACTOR_ORDER.map((k) => (
              <div key={k} className="card px-4 py-3">
                <p className="text-sm font-bold text-ink">{FACTORS[k].label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase("steps")}
            className="btn-primary animate-pulse-primary mt-10 px-10 py-4 text-base sm:text-lg"
          >
            Start the scorecard →
          </button>
          <p className="mt-4 text-sm text-ink-subtle">
            11 quick questions · 2 minutes · instant personalised result
          </p>
        </div>
      </main>
    );
  }

  // ---------- CAPTURE (opt-in gated after the last question, before result) ----------
  if (phase === "capture") {
    return (
      <>
        <ProgressBar current={totalQuestions} total={totalQuestions} />
        <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-20">
          <div className="card animate-fade-up p-7 sm:p-9">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Your scorecard is ready.</h2>
            <p className="mt-3 text-ink-muted">
              Tell us where to send it, and we&apos;ll unlock your personalised diagnosis + score on
              the next screen.
            </p>
            <form onSubmit={submit} className="mt-7 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink-muted">
                  First name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Daniel"
                  className="inp"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-ink-muted">
                  Best email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="inp"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full px-8 py-4 text-base disabled:opacity-60"
              >
                {submitting ? "Calculating…" : "Reveal my Oversubscribed score →"}
              </button>
            </form>
            <button onClick={back} className="mt-5 text-sm text-ink-subtle hover:text-ink">
              ← Back
            </button>
            <p className="mt-4 text-xs text-ink-subtle">
              We respect your inbox. No spam, unsubscribe any time.
            </p>
          </div>
        </main>
      </>
    );
  }

  // ---------- STEPS ----------
  const step = STEPS[idx];

  if (step.kind === "proof") {
    return (
      <>
        <ProgressBar current={currentQuestionNumber} total={totalQuestions} />
        <ProofInterstitial
          testimonialIndex={step.testimonialIndex}
          eyebrow={step.eyebrow}
          onContinue={advance}
        />
      </>
    );
  }

  const eyebrow =
    step.kind === "scored" ? FACTORS[step.factor].label : "A few quick things about you";
  const selected =
    step.kind === "scored" ? answers[step.id] : (qual[step.qualKey] as string | undefined);

  return (
    <>
      <ProgressBar current={currentQuestionNumber} total={totalQuestions} />
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-5 py-20">
        <div key={step.id} className="animate-fade-up">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-dark">
            {eyebrow}
          </p>
          <h2 className="font-display text-2xl leading-snug text-ink sm:text-3xl">{step.prompt}</h2>

          <div className="mt-7 space-y-3">
            {step.kind === "scored"
              ? step.options.map((opt) => (
                  <button
                    key={opt.label}
                    data-selected={selected === opt.score}
                    onClick={() => chooseScored(step.id, opt.score)}
                    className="option flex w-full items-center px-5 py-4 text-left text-ink"
                  >
                    <span className="text-base">{opt.label}</span>
                  </button>
                ))
              : step.options.map((opt) => (
                  <button
                    key={opt.value}
                    data-selected={selected === opt.value}
                    onClick={() => chooseQual(step.qualKey, opt.value)}
                    className="option flex w-full items-center px-5 py-4 text-left text-ink"
                  >
                    <span className="text-base">{opt.label}</span>
                  </button>
                ))}
          </div>

          <button onClick={back} className="mt-7 text-sm text-ink-subtle hover:text-ink">
            ← Back
          </button>
        </div>
      </main>
    </>
  );
}
