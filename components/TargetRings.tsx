// Decorative target-ring motif — 404, hero fallback. Always aria-hidden.

export function TargetRings({ className = "", size = 240 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="100" cy="100" r="96" strokeWidth="2" />
      <circle cx="100" cy="100" r="76" strokeWidth="2" />
      <circle cx="100" cy="100" r="56" strokeWidth="2" />
      <circle cx="100" cy="100" r="36" strokeWidth="2" />
      <circle cx="100" cy="100" r="16" strokeWidth="2" />
    </svg>
  );
}
