import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FactsStrip } from "@/components/FactsStrip";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { EventItem } from "@/components/EventItem";
import { ContentField } from "@/components/Placeholder";
import { SITE_URL, clubs, site } from "@/lib/content";
import { splitEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | University Archery Clubs in Ireland` },
  description:
    "ISAA is the association for student archery across the island of Ireland. Find your college or university archery club, see upcoming intervarsities and get started.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} | University Archery Clubs in Ireland`,
    description: "Find your college or university archery club, see upcoming intervarsities and get started with ISAA.",
    url: "/",
  },
};

// Three steps in plain type. The paragraphs are committee copy still to come.
const STEPS = [
  { title: "Find your college's club", body: "[insert one short paragraph: how to find and contact your club]" },
  { title: "Go to a beginners' session", body: "[insert one short paragraph: what a first session is like]" },
  { title: "Shoot at an intervarsity", body: "[insert one short paragraph: entering your first ISAA competition]" },
];

export default function HomePage() {
  const { upcoming } = splitEvents();
  const next = upcoming.slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: site.name,
    alternateName: site.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/isaa-mark-512.png`,
    email: site.email,
    sport: "Archery",
    areaServed: "IE",
    sameAs: [site.instagram, site.facebook].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero
        title="Archery for students, across the island of Ireland"
        subhead="Sixteen affiliated college and university clubs, open to every skill level."
        supporting="We run the indoor and outdoor intervarsity competitions and connect student archery clubs to one another."
      />

      <FactsStrip />

      <section className="section-pad" aria-labelledby="find-club">
        <div className="container-site">
          <SectionHeading
            id="find-club"
            title="Find your club"
            intro="Every affiliated club is listed below. Pick your institution to jump straight to its contact details."
          />
          <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <li key={club.id} className="border-b border-line">
                <Link
                  href={`/clubs#${club.id}`}
                  className="flex min-h-[44px] items-center justify-between gap-3 py-2 text-[16px] font-medium text-ink transition-colors duration-[120ms] hover:text-green"
                >
                  <span>{club.institution}</span>
                  {club.clubName && club.institution.length <= 12 ? (
                    <span className="hidden text-[13px] text-ink-muted sm:inline">{club.clubName}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/clubs" variant="secondary">
              See all clubs
            </Button>
          </div>
        </div>
      </section>

      {next.length > 0 ? (
        <section className="border-t border-line bg-surface section-pad" aria-labelledby="whats-on">
          <div className="container-site">
            <SectionHeading id="whats-on" title="What's on" />
            <ul className="flex flex-col gap-4">
              {next.map((event) => (
                <EventItem key={event.id} event={event} compact />
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/events" variant="secondary">
                All fixtures
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-line section-pad" aria-labelledby="getting-involved">
        <div className="container-site">
          <SectionHeading id="getting-involved" title="Getting involved" />
          <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex flex-col">
                <span className="text-[32px] font-bold leading-none text-green" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-ink">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <ContentField value={step.body} placeholderClassName="mt-2 self-start">
                  {(f) => <p className="mt-2 text-[15px] leading-relaxed">{f.value}</p>}
                </ContentField>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button href="/getting-started">Start here</Button>
          </div>
        </div>
      </section>
    </>
  );
}
