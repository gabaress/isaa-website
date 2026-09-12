import type { EventType } from "@/types";

// Event type tag. Competition is the one orange use on the events page (ink on orange
// measures 7.0:1). The others are green-tint with green text.

const labels: Record<EventType, string> = {
  competition: "Competition",
  social: "Social",
  agm: "AGM",
  training: "Training",
};

export function Tag({ type }: { type: EventType }) {
  const colour = type === "competition" ? "bg-orange text-ink" : "bg-green-tint text-green";
  return (
    <span className={`text-meta inline-block rounded-sm px-2 py-[3px] uppercase ${colour}`}>
      {labels[type]}
    </span>
  );
}
