import Image from "next/image";
import type { Club } from "@/types";
import { ContentField } from "@/components/Placeholder";
import { ExternalIcon, InstagramIcon, MailIcon } from "@/components/Icons";
import { present } from "@/lib/content";

// Flat card, no expansion. Institution name is the primary scannable element;
// the campus/short form is the big label and the full institution name the
// muted secondary line. Each card carries id={club.id} for /clubs#ucd deep links.
// Every optional field is genuinely absent from the DOM when missing.

const instagramHandle = (url: string): string => {
  try {
    const seg = new URL(url).pathname.split("/").filter(Boolean)[0];
    return seg ? `@${seg}` : "Instagram";
  } catch {
    return "Instagram";
  }
};

const hostOf = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const rowClass = "inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-green hover:text-green-dark";

export function ClubCard({ club }: { club: Club }) {
  const hasContacts = present(club.email) || present(club.instagram) || present(club.website);

  return (
    <li id={club.id} className="flex flex-col rounded-sm border border-line border-t-[3px] border-t-green bg-surface p-5 sm:p-6">
      <div className="flex items-start gap-4">
        {club.logo ? (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-line bg-white">
            <Image src={club.logo} alt={`${club.institution} logo`} width={32} height={32} />
          </span>
        ) : null}
        <div className="min-w-0">
          <h2 className="text-[20px] leading-tight tracking-normal text-ink">{club.institution}</h2>
          {club.clubName ? <p className="mt-1 text-[15px] leading-snug text-ink-muted">{club.clubName}</p> : null}
          {club.formerName ? <p className="mt-1 text-[14px] text-ink-muted">{club.formerName}</p> : null}
        </div>
      </div>

      <ContentField value={club.description} placeholderClassName="mt-3 self-start">
        {(f) => <p className="mt-3 text-[15px] leading-relaxed">{f.value}</p>}
      </ContentField>

      {hasContacts ? (
        <ul className="mt-4 flex flex-col border-t border-line pt-2">
          {present(club.email) ? (
            <li className="flex flex-col items-start [&>.placeholder-chip]:my-2">
              <ContentField value={club.email}>
                {(f) => (
                  <a href={`mailto:${f.value}`} className={`${rowClass} break-all`}>
                    <MailIcon size={20} className="shrink-0" />
                    {f.value}
                  </a>
                )}
              </ContentField>
            </li>
          ) : null}
          {present(club.instagram) ? (
            <li className="flex flex-col items-start [&>.placeholder-chip]:my-2">
              <ContentField value={club.instagram}>
                {(f) => (
                  <a href={f.value} className={rowClass} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon size={20} className="shrink-0" />
                    {instagramHandle(f.value)}
                    <span className="sr-only"> on Instagram (opens in a new tab)</span>
                    <ExternalIcon />
                  </a>
                )}
              </ContentField>
            </li>
          ) : null}
          {present(club.website) ? (
            <li className="flex flex-col items-start [&>.placeholder-chip]:my-2">
              <ContentField value={club.website}>
                {(f) => (
                  <a href={f.value} className={rowClass} target="_blank" rel="noopener noreferrer">
                    {hostOf(f.value)}
                    <span className="sr-only"> (opens in a new tab)</span>
                    <ExternalIcon />
                  </a>
                )}
              </ContentField>
            </li>
          ) : null}
        </ul>
      ) : null}
    </li>
  );
}
