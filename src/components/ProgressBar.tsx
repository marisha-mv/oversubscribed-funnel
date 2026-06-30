export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1.5 w-full bg-line">
        <div
          className="h-full bg-gradient-to-r from-fuchsia-brand to-cyan-brand transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mx-auto max-w-2xl px-5 pt-2 text-center">
        <span className="text-xs font-semibold tracking-wider text-ink-subtle">
          {current} / {total}
        </span>
      </div>
    </div>
  );
}
