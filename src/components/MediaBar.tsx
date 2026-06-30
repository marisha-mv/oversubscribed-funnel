import { MEDIA } from "@/data/images";

export default function MediaBar({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-ink-subtle">
        As featured in
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {MEDIA.map((m) => (
          <span
            key={m}
            className="font-display text-sm font-semibold text-ink-muted sm:text-base"
            style={{ opacity: 0.8 }}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
