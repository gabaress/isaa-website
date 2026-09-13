import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { InstagramIcon, MailIcon, ExternalIcon } from "@/components/Icons";
import { site } from "@/lib/content";

// With no form, this is the site's only inbound channel: a large mailto as the
// primary action, the address as selectable text with a copy button, and socials.

export function ContactBlock({ id = "contact" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="rounded-sm border border-line bg-surface p-6 sm:p-8">
      <h2 id={`${id}-heading`}>Contact ISAA</h2>
      <p className="mt-3 text-ink-muted">
        Questions about a specific club go straight to that club. Every contact is in the{" "}
        <Link href="/clubs" className="link-body">
          club directory
        </Link>
        . For everything else, email the Secretary.
      </p>

      <a
        href={`mailto:${site.email}`}
        className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-sm bg-green px-5 text-[17px] font-medium text-white transition-colors duration-[120ms] hover:bg-green-dark sm:w-auto"
      >
        <MailIcon />
        Email {site.email}
      </a>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <code className="select-all rounded-sm border border-line bg-paper px-3 py-2 text-[15px] text-ink">{site.email}</code>
        <CopyButton text={site.email} />
      </div>

      {site.instagram ? (
        <ul className="mt-6 flex flex-wrap gap-4">
          <li>
            <a
              href={site.instagram}
              className="link-body inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon size={20} />
              Instagram
              <span className="sr-only"> (opens in a new tab)</span>
              <ExternalIcon />
            </a>
          </li>
        </ul>
      ) : null}
    </section>
  );
}
