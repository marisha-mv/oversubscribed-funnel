"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadSession } from "@/lib/storage";

const STAGES = [
  "Just starting — pre first paying customers",
  "Have customers, inconsistent revenue",
  "Steady revenue, want to scale",
  "Established, optimising for leverage",
];

const REVENUE = [
  "Pre-revenue",
  "Under $5k / month",
  "$5k–$25k / month",
  "$25k–$100k / month",
  "$100k+ / month",
];

// Replace with the real booking link (Calendly / SavvyCal / MV scheduler).
const BOOKING_URL = "#book-a-call";

function ApplyInner() {
  const params = useSearchParams();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [stage, setStage] = useState("");
  const [revenue, setRevenue] = useState("");
  const [challenge, setChallenge] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fn = params.get("fn") || "";
    const session = loadSession();
    setFirstName(fn || session?.firstName || "");
    setEmail(session?.email || "");
  }, [params]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "apply",
          firstName,
          email,
          business,
          stage,
          revenue,
          challenge,
        }),
      });
    } catch {
      /* non-blocking */
    }
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-20 text-center">
        <div className="card animate-fade-up p-8 sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-brand text-2xl text-white">
            ✓
          </div>
          <h1 className="mt-5 font-display text-3xl text-ink">
            Application received{firstName ? `, ${firstName}` : ""}.
          </h1>
          <p className="mt-3 text-ink-muted">
            The next step is a short conversation to make sure the Accelerator is the right fit and
            to walk you through the next intake. Grab a time below.
          </p>
          <a href={BOOKING_URL} className="btn-primary mt-7 inline-block px-10 py-4 text-lg">
            Book my call →
          </a>
          <p className="mt-4 text-xs text-ink-subtle">
            [ booking embed placeholder — connect Calendly / scheduler ]
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-5 py-16">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-dark">
          Apply to join
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
          Apply for the Oversubscribed Accelerator
        </h1>
        <p className="mt-3 text-ink-muted">
          Intakes are kept small so the build stays hands-on. Tell us about your business and, if
          it&apos;s a fit, we&apos;ll book your call.
        </p>
      </div>

      <form onSubmit={submit} className="card mt-8 space-y-5 p-7 sm:p-9">
        <Field label="First name">
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="inp" />
        </Field>
        <Field label="Best email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="inp"
          />
        </Field>
        <Field label="What does your business do?">
          <input
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="One line is fine"
            required
            className="inp"
          />
        </Field>
        <Field label="What stage are you at?">
          <select value={stage} onChange={(e) => setStage(e.target.value)} required className="inp">
            <option value="">Select…</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Monthly revenue">
          <select value={revenue} onChange={(e) => setRevenue(e.target.value)} required className="inp">
            <option value="">Select…</option>
            {REVENUE.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Your single biggest go-to-market challenge right now">
          <textarea
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            rows={3}
            required
            className="inp resize-none"
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full px-8 py-4 text-base disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit application →"}
        </button>
        <p className="text-center text-xs text-ink-subtle">
          Takes about 2 minutes. We&apos;ll only follow up about the Accelerator.
        </p>
      </form>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink-muted">{label}</label>
      {children}
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-ink-subtle">Loading…</p>
        </main>
      }
    >
      <ApplyInner />
    </Suspense>
  );
}
