import { field, showPlaceholders, type Field } from "@/lib/content";

// Unsupplied content, demo build only. Muted, dashed, and the literal bracketed
// string - never styled to resemble real data. See lib/content.ts.

export function Placeholder({ value, className = "" }: { value: string; className?: string }) {
  return <span className={`placeholder-chip ${className}`}>{value}</span>;
}

/**
 * Renders a content field: the value via `children`, a visible placeholder in the
 * demo, or nothing at all. Keeps every component's "absent" path identical.
 */
export function ContentField({
  value,
  placeholderClassName = "",
  children,
}: {
  value?: string;
  placeholderClassName?: string;
  children: (f: Extract<Field, { kind: "value" }>) => React.ReactNode;
}) {
  const f = field(value);
  if (f.kind === "absent") return null;
  if (f.kind === "placeholder") return <Placeholder value={f.value} className={placeholderClassName} />;
  return <>{children(f)}</>;
}

/**
 * A [VERIFY] note for copy the committee still has to confirm. Demo build only;
 * in production the note disappears and the surrounding copy stands on its own.
 */
export function VerifyNote({ children }: { children: React.ReactNode }) {
  if (!showPlaceholders) return null;
  return (
    <span className="placeholder-chip ml-2 not-italic">
      <span className="font-medium">[VERIFY]</span> {children}
    </span>
  );
}
