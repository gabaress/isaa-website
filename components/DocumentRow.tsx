import type { SiteDocument } from "@/types";
import { ContentField } from "@/components/Placeholder";

// Title · one line on who it is for · format, size and version date · the whole row
// is the download link, minimum 56px tall, so its accessible name carries the title,
// version date, format and size. The version date is always visible: a reader must
// be able to see that a 2017 document is from 2017 without opening it.

export function DocumentRow({ doc }: { doc: SiteDocument }) {
  return (
    <li className="border-b border-line first:border-t">
      <a
        href={doc.file}
        className="group flex min-h-[56px] flex-col gap-1 py-4 pr-4 pl-0 transition-colors duration-[120ms] hover:bg-green-tint sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-3"
      >
        <span className="min-w-0">
          <span className="block text-[18px] font-bold leading-snug text-green underline decoration-2 underline-offset-4 decoration-transparent transition-colors duration-[120ms] group-hover:decoration-green">
            {doc.title}
          </span>
          <ContentField value={doc.description} placeholderClassName="mt-2">
            {(f) => <span className="mt-1 block text-[15px] leading-relaxed text-ink">{f.value}</span>}
          </ContentField>
        </span>
        <span className="text-meta shrink-0 whitespace-nowrap text-ink-muted sm:text-right">
          <span className="block">{doc.versionLabel}</span>
          <span className="block">{doc.sizeLabel}</span>
        </span>
      </a>
    </li>
  );
}
