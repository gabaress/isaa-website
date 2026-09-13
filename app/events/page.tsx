import type { Metadata } from "next";
import { EventItem } from "@/components/EventItem";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ExternalIcon } from "@/components/Icons";
import { site } from "@/lib/content";
import { seasonLabel, splitEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Fixtures & Results",
  description:
    "Upcoming ISAA intervarsity archery competitions, socials and meetings for student clubs across Ireland, with entry details and deadlines, plus past events.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Fixtures & Results | ISAA",
    description: "Upcoming ISAA intervarsity archery competitions and past events for student clubs across Ireland.",
    url: "/events",
  },
};

export default function EventsPage() {
  const { upcoming, past } = splitEvents();
  const season = seasonLabel();

  return (
    <>
      <PageHeader title="Fixtures and results" intro="ISAA competitions and events for the season: what is on, how to enter, and by when." />

      <section className="section-pad" aria-labelledby="upcoming">
        <div className="container-site">
          {upcoming.length > 0 ? (
            <>
              <SectionHeading id="upcoming" title="Upcoming" />
              <ul className="flex flex-col gap-4">
                {upcoming.map((event) => (
                  <EventItem key={event.id} event={event} />
                ))}
              </ul>
            </>
          ) : (
            <div className="rounded-sm border border-line bg-surface p-6 sm:p-8">
              <h2 id="upcoming" className="text-[20px]">
                No fixtures listed yet
              </h2>
              <p className="mt-3 text-ink">
                The {season} fixture list is confirmed at the start of term.{" "}
                {site.instagram ? (
                  <>
                    Follow us on{" "}
                    <a href={site.instagram} className="link-body inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                      Instagram
                      <span className="sr-only"> (opens in a new tab)</span>
                      <ExternalIcon />
                    </a>{" "}
                    for announcements.
                  </>
                ) : null}
              </p>
            </div>
          )}
        </div>
      </section>

      {past.length > 0 ? (
        <section className="border-t border-line section-pad" aria-labelledby="past">
          <div className="container-site">
            <SectionHeading id="past" title="Past events" intro="Most recent first." />
            <ul className="flex flex-col gap-4">
              {past.map((event) => (
                <EventItem key={event.id} event={event} past />
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
