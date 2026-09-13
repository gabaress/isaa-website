import Link from "next/link";
import { IsaaMark } from "@/components/Logo";
import { FacebookIcon, InstagramIcon, MailIcon } from "@/components/Icons";
import { NAV } from "@/lib/nav";
import { site } from "@/lib/content";

// Three columns on desktop, stacked on mobile. With no contact form, the email
// here is the site's main standing contact point. Social icons render only when a
// handle is supplied - no dead icons.

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1.2fr] md:gap-12 md:py-16">
        <div>
          <IsaaMark size={44} />
          <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-ink">{site.tagline}</p>
          <p className="mt-4 text-[13px] text-ink-muted">© {year} {site.name}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-1">
            {[...NAV, { href: "/privacy", label: "Privacy" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-[40px] items-center text-[15px] font-medium text-ink hover:text-green">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-meta uppercase text-ink-muted">Contact</h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-[17px] font-bold text-green underline decoration-2 underline-offset-4 hover:text-green-dark"
          >
            <MailIcon size={20} />
            {site.email}
          </a>
          <ul className="mt-3 flex gap-2">
            {site.instagram ? (
              <li>
                <a
                  href={site.instagram}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-green hover:bg-green-tint"
                  aria-label="ISAA on Instagram (opens in a new tab)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </a>
              </li>
            ) : null}
            {site.facebook ? (
              <li>
                <a
                  href={site.facebook}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-green hover:bg-green-tint"
                  aria-label="ISAA on Facebook (opens in a new tab)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}
