import { Answers, QualAnswers } from "@/lib/score";

const KEY = "oversubscribed_scorecard_v2";

export interface StoredSession {
  answers: Answers;
  qual: QualAnswers;
  firstName: string;
  email: string;
}

export function saveSession(data: StoredSession) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function loadSession(): StoredSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  } catch {
    return null;
  }
}
