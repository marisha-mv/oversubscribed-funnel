// Monogram avatar — used wherever a real headshot isn't licensed yet.
// Drop a `photo` URL to swap in a real image.
export default function Avatar({
  name,
  photo,
  size = 56,
}: {
  name: string;
  photo?: string | null;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={photo}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-display font-bold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: "linear-gradient(135deg, var(--fuchsia), var(--cyan))",
      }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
