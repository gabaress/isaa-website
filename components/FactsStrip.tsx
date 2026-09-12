import { clubCount, facts, withClubCount } from "@/lib/content";

// One row on Paper with hairline rules between items. Renders only supplied facts
// and stays centred and deliberate at two, three or four.

export function FactsStrip() {
  const items = facts.map((f) => withClubCount(f.label)).filter(Boolean);
  if (items.length === 0 || clubCount === 0) return null;
  return (
    <section aria-label="ISAA at a glance" className="border-b border-line bg-green-tint">
      <ul className="container-site flex flex-col divide-y divide-line sm:flex-row sm:justify-center sm:divide-x sm:divide-y-0">
        {items.map((label) => (
          <li key={label} className="flex min-h-[56px] items-center justify-center px-6 py-3 text-center text-[16px] font-medium text-green sm:min-h-[72px] sm:flex-1 sm:max-w-[360px]">
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
