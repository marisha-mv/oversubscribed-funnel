"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, FACTORS } from "@/data/quiz";
import { Answers } from "@/lib/score";
import { saveSession } from "@/lib/storage";
import ProgressBar from "@/components/ProgressBar";

type Phase = "intro" | "questions" | "capture";

export default function Quiz() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0); // index into QUESTIONS
  const [answers, setAnswers] = useState<Answers>({});
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const total = QUESTIONS.length;

  function choose(score: number) {
    const q = QUESTIONS[step];
    const next = { ...answers, [q.id]: score };
    setAnswers(next);
    // brief delay so the selection registers visually
    window.setTimeout(() => {
      if (step + 1 < total) {
        setStep(step + 1);
      } else {
        setPhase("capture");
      }
    }, 180);
  }

  function back() {
    if (phase === "capture") {
      setPhase("questions");
      setStep(total - 1);
    } else if (step > 0) {
      setStep(step - 1);
    } else {
      setPhase("intro");
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setSubmitting(true);
    saveSession({ answers, firstName: firstName.trim(), email: email.trim() });
    // fire-and-forget lead capture; never block the user on it
    try {
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quiz",
          firstName: firstName.trim(),
          email: email.trim(),
          answers,
        }),
      }).catch(() => {});
    } catch {
      /* ignore */
    }
    router.push(`/results?fn=${encodeURIComponent(firstName.trim())}`);
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
            Are customers <span className="text-gradient">chasing you</span>
            <br className="hidden sm:block" /> — or are you chasing them?
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-muted">
            Take the 2-minute <strong className="text-ink">Oversubscribed Scorecard</strong> and
            see exactly where your demand engine is leaking — across the four factors that decide
            whether a business is oversubscribed or overlooked.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
            {Object.values(FACTORS).map((f) => (
              <div key={f.key} className="card px-4 py-3">
                <p className="text-sm font-bold text-ink">{f.label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase("questions")}
            className="btn-primary animate-pulse-primary mt-10 px-10 py-4 text-base sm:text-lg"
          >
            Start the scorecard →
          </button>
          <p className="mt-4 text-sm text-ink-subtle">
            12 questions · 2 minutes · instant personalised result
          </p>
        </div>
      </main>
    );
  }

  // ---------- CAPTURE ----------
  if (phase === "capture") {
    return (
      <>
        <ProgressBar current={total} total={total} />
        <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-20">
          <div className="card animate-fade-up p-7 sm:p-9">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Your scorecard is ready.</h2>
            <p className="mt-3 text-ink-muted">
              Tell us where to send it, and we&apos;ll unlock your personalised diagnosis on the
              next screen.
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

  // ---------- QUESTIONS ----------
  const q = QUESTIONS[step];
  const selected = answers[q.id];
  return (
    <>
      <ProgressBar current={step + 1} total={total} />
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-5 py-20">
        <div key={q.id} className="animate-fade-up">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-dark">
            {FACTORS[q.factor].label}
          </p>
          <h2 className="font-display text-2xl leading-snug text-ink sm:text-3xl">{q.prompt}</h2>

          <div className="mt-7 space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt.label}
                data-selected={selected === opt.score}
                onClick={() => choose(opt.score)}
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
