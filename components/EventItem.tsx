import type { ISAAEvent } from "@/types";
import { Tag } from "@/components/Tag";
import { ExternalIcon } from "@/components/Icons";
import { ContentField } from "@/components/Placeholder";
import { dateBlock, dateTimeAttr, externalHost, formatDate } from "@/lib/events";

// Date block · title · type tag · venue · description · entry deadline · external link.
// No registration of any kind is built — the entry link goes wherever ISAA already uses.

export function EventItem({ event, past = false, compact = false }: { event: ISAAEvent; past?: boolean; compact?: boolean }) {
  const d = dateBlock(event);
  return (
    <li
      className={`grid grid-cols-[72px_1fr] gap-4 rounded-sm border border-line p-4 sm:grid-cols-[88px_1fr] sm:gap-6 sm:p-5 ${
        past ? "bg-green-tint" : "bg-surface"
      }`}
    >
      <time dateTime={dateTimeAttr(event)} className="flex flex-col border-r border-line pr-3 sm:pr-4">
        <span className={`text-[26px] font-bold leading-none tracking-[-0.02em] ${past ? "text-ink-muted" : "text-green"}`}>{d.day}</span>
        <span className="text-meta mt-1 uppercase text-ink-muted">{d.month}</span>
        <span className="text-[13px] text-ink-muted">{d.year}</span>
      </time>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className={`text-[19px] leading-tight ${past ? "text-ink-muted" : "text-ink"}`}>{event.title}</h3>
          <Tag type={event.type} />
        </div>
        <p className="mt-1 text-[15px] text-ink-muted">{event.venue}</p>

        {!compact ? (
          <>
            <ContentField value={event.description} placeholderClassName="mt-3">
              {(f) => <p className="mt-3 text-[15px] leading-relaxed">{f.value}</p>}
            </ContentField>

            {!past && event.entryDeadline ? (
              <p className="mt-3 text-[15px]">
                <span className="font-medium">Entries close</span>{" "}
                <time dateTime={event.entryDeadline}>{formatDate(event.entryDeadline)}</time>
              </p>
            ) : null}

            {!past && event.entryUrl ? (
              <a
                href={event.entryUrl}
                className="link-body mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Entry and details
                <span className="sr-only"> (opens on {externalHost(event.entryUrl)})</span>
                <ExternalIcon />
              </a>
            ) : null}

            {past && event.resultsUrl ? (
              <a
                href={event.resultsUrl}
                className="link-body mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Results
                <span className="sr-only"> (opens on {externalHost(event.resultsUrl)})</span>
                <ExternalIcon />
              </a>
            ) : null}
          </>
        ) : null}
      </div>
    </li>
  );
}
