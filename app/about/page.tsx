import type { Metadata } from "next";
import Link from "next/link";
import { ContactBlock } from "@/components/ContactBlock";
import { Figure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { clubCount, committee } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Irish Student Archery Association runs the indoor and outdoor intervarsities for college and university archery clubs across the island of Ireland. Committee and contact.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | ISAA",
    description: "What the Irish Student Archery Association is, who runs it, and how to get in touch.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About ISAA" />

      <div className="container-site section-pad">
        {/* Approved copy, SPEC.md §14.2. The club count interpolates from clubs.json. */}
        <div className="max-w-[68ch] text-[17px] leading-relaxed md:text-[18px]">
          <p>
            The Irish Student Archery Association is the association for archery in third-level education across the island of Ireland. We have{" "}
            {clubCount} affiliated college and university clubs.
          </p>
          <p className="mt-5">
            We run the indoor and outdoor intervarsity competitions, publish the rules and handbooks that govern them, and connect student clubs to one
            another. Our clubs take complete beginners every year.
          </p>
          <p className="mt-5">
            ISAA operates under Archery Ireland, the national governing body for the sport, and abides by its rules and regulations.
          </p>
          <p className="mt-5 text-ink-muted">
            The competition handbooks, the rulebook and the constitution are on the{" "}
            <Link href="/resources" className="link-body">
              resources page
            </Link>
            .
          </p>
        </div>

        <Figure
          src="/photos/about-squad.webp"
          alt="A squad of student archers gathered on the shooting line at an ISAA intervarsity, with numbered target bosses behind them"
          width={1600}
          height={900}
          className="mt-14"
        />

        <section className="mt-16" aria-labelledby="committee">
          <SectionHeading
            id="committee"
            title="Committee"
            intro="ISAA is run by an elected student committee. Every role has its own address, so these stay correct from one committee to the next."
          />
          <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-2">
            {committee.map((member) => (
              <li key={member.email} className="flex flex-col justify-center border-b border-line py-4 sm:pr-8">
                <span className="text-[17px] font-bold text-ink">{member.role}</span>
                <a href={`mailto:${member.email}`} className="link-body mt-1 inline-flex min-h-[32px] items-center self-start text-[15px] break-all">
                  {member.email}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-16">
          <ContactBlock />
        </div>
      </div>
    </>
  );
}
