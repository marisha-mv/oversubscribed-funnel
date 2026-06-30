"use client";

import { useEffect, useState } from "react";

export default function Countdown({ seconds = 420 }: { seconds?: number }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [remaining]);

  const m = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const s = (remaining % 60).toString().padStart(2, "0");

  return (
    <span className="font-mono font-bold text-fuchsia-dark tabular-nums">
      {m}:{s}
    </span>
  );
}
