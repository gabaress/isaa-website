import type { Metadata } from "next";
import { ClubCard } from "@/components/ClubCard";
import { PageHeader } from "@/components/PageHeader";
import { clubCount, clubs, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Clubs",
  description:
    "Find your university's archery club in Ireland: contact details for every ISAA-affiliated college and university archery club across the island.",
  alternates: { canonical: "/clubs" },
  openGraph: {
    title: "Clubs | ISAA",
    description: "Contact details for every ISAA-affiliated college and university archery club across the island of Ireland.",
    url: "/clubs",
  },
};

// Jump-row labels: short enough to scan in one row on a phone.
const jumpLabel = (institution: string): string => {
  const known: Record<string, string> = {
    "Dublin City University": "DCU",
    "Maynooth University": "MU",
    "National College of Ireland": "NCI",
    "Queen's University Belfast": "QUB",
    "South East Technological University": "SETU",
    "Trinity College Dublin": "TCD",
    "TU Dublin": "TUD",
    "University College Cork": "UCC",
    "University College Dublin": "UCD",
    "University of Galway": "Galway",
    "University of Limerick": "UL",
    "Ulster University": "Ulster",
  };
  return known[institution] ?? institution;
};

export default function ClubsPage() {
  return (
    <>
      <PageHeader
        title="Club directory"
        intro={`The ${clubCount} college and university archery clubs affiliated to ISAA, in alphabetical order. Find your institution and get in touch with the club directly.`}
      >
          <nav aria-label="Jump to club" className="mt-6">
            <ul className="flex flex-wrap gap-x-1 gap-y-1">
              {clubs.map((club) => (
                <li key={club.id}>
                  <a
                    href={`#${club.id}`}
                    className="inline-flex min-h-[40px] items-center rounded-sm px-2.5 text-[14px] font-medium text-green underline decoration-2 decoration-transparent underline-offset-4 transition-colors duration-[120ms] hover:decoration-green"
                  >
                    {jumpLabel(club.institution)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
      </PageHeader>

      <section className="section-pad" aria-label="Affiliated clubs">
        <div className="container-site">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </ul>

          <div className="mt-12 border-t border-line pt-8">
            <p className="text-[16px]">
              Club not listed, or details out of date? Email us at{" "}
              <a href={`mailto:${site.email}`} className="link-body font-medium">
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
