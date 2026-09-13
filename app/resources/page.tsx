import type { Metadata } from "next";
import { DocumentRow } from "@/components/DocumentRow";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { VerifyNote } from "@/components/Placeholder";
import { documents } from "@/lib/content";
import type { DocumentGroup } from "@/types";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "ISAA handbooks, rules and governance documents: the intervarsity competition handbooks, the beginner archer's handbook, the ISAA Rulebook and Constitution.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources | ISAA",
    description: "ISAA intervarsity handbooks, the Rulebook and the Constitution, with version dates.",
    url: "/resources",
  },
};

// Empty groups do not render.
const GROUPS: { key: DocumentGroup; title: string; intro: string }[] = [
  { key: "competing", title: "Competing", intro: "The intervarsity documentation: formats, rules and what to expect at ISAA competitions." },
  { key: "governance", title: "Governance", intro: "How the association is constituted and run." },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader title="Resources" intro="Everything ISAA publishes in writing: competition handbooks, the rulebook and the constitution." />

      <div className="container-site section-pad">
        <div className="flex flex-col gap-14">
          {GROUPS.map((group) => {
            const docs = documents.filter((d) => d.group === group.key);
            if (docs.length === 0) return null;
            return (
              <section key={group.key} aria-labelledby={`group-${group.key}`}>
                <SectionHeading id={`group-${group.key}`} title={group.title} intro={group.intro} />
                <ul>
                  {docs.map((doc) => (
                    <DocumentRow key={doc.file} doc={doc} />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <p className="mt-12 text-[15px] text-ink-muted">
          Version dates are taken from inside each document.
          <VerifyNote>have the Constitution or Rulebook been amended at any AGM since 2017? Are the two handbooks current for this season?</VerifyNote>
          <VerifyNote>does a safeguarding or athlete-protection policy document exist? If so it belongs under Governance.</VerifyNote>
        </p>
      </div>
    </>
  );
}
