import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Figure } from "@/components/Figure";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ContentField, VerifyNote } from "@/components/Placeholder";
import { committee } from "@/lib/content";

export const metadata: Metadata = {
  title: "New to Archery",
  description:
    "Never shot a bow? ISAA clubs take complete beginners every year. What your first archery session involves, what it costs, safety, and how to join your college club.",
  alternates: { canonical: "/getting-started" },
  openGraph: {
    title: "New to Archery | ISAA",
    description: "What a first archery session at a college club involves, what it costs, and how to get started with ISAA.",
    url: "/getting-started",
  },
};

const apo = committee.find((c) => c.role === "Athlete Protection Officer");

// Answers are kept to what is generally true of target archery; anything specific
// to how ISAA clubs run is placeholder or [VERIFY] content until the committee confirms it.
const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Do I need to be strong, or sporty?",
    a: "No. Beginners shoot light bows, and technique matters far more than strength. Archery is one of the few sports where complete beginners and experienced competitors share the same line.",
  },
  {
    q: "I wear glasses or contact lenses. Is that a problem?",
    a: "Not at all. Plenty of archers wear glasses. If you have a dominant-eye question, the person running your first session will sort it out in a minute.",
  },
  {
    q: "How do I find my club?",
    a: (
      <>
        Every affiliated club is in the{" "}
        <Link href="/clubs" className="link-body">
          club directory
        </Link>
        . Look out for your club at the students&apos; union freshers&apos; fair at the start of the year, too.
      </>
    ),
  },
  {
    q: "What happens at my first competition?",
    a: (
      <>
        ISAA publishes a handbook written specifically for beginners entering their first intervarsity: what the format is, what to bring and how scoring works. Read the{" "}
        <Link href="/resources" className="link-body">
          Beginner Archer&apos;s Intervarsity Competition Handbook
        </Link>{" "}
        on the resources page.
      </>
    ),
  },
  {
    q: "Can I join if my college is not listed?",
    a: (
      <>
        Email{" "}
        <a href="mailto:isaasecretary@archery.ie" className="link-body">
          isaasecretary@archery.ie
        </a>{" "}
        and we will point you in the right direction.
      </>
    ),
  },
];

export default function GettingStartedPage() {
  return (
    <>
      <PageHeader
        title="New to archery"
        intro="You do not need experience, equipment or a sporty background. Here is what your first session involves and how to join in."
      />

      <div className="container-site section-pad">
        <div className="max-w-[68ch]">
          <SectionHeading title="Your first session" />
          <p>
            You will be shown how to stand, how to hold the bow and how to draw and release, then you will shoot at a target from close range under
            supervision. Everything is explained on the day. By the end of the session most people have put arrows in the target.
            <VerifyNote>confirm this description of a typical club beginners&apos; session</VerifyNote>
          </p>

          <h3 className="mt-10 text-ink">Equipment</h3>
          <p className="mt-2">
            Clubs run beginners&apos; sessions with club equipment, so you do not need to buy anything to try it.
            <VerifyNote>do all clubs supply beginner kit?</VerifyNote>
          </p>
          <p className="mt-3">Wear something close-fitting on your top half and tie back long hair, because a bowstring will catch on anything loose.</p>

          <h3 className="mt-10 text-ink">What it costs</h3>
          <p className="mt-2">
            Each club sets its own membership fee and session costs, so the club is the place to ask. Contact details for every club are in the{" "}
            <Link href="/clubs" className="link-body">
              directory
            </Link>
            .
          </p>
          <ContentField value="[insert typical club membership cost range, if the committee wants one published]" placeholderClassName="mt-3">
            {(f) => <p className="mt-3">{f.value}</p>}
          </ContentField>

          <h3 className="mt-10 text-ink">Safety and supervision</h3>
          <p className="mt-2">
            Archery is run to strict range rules: everybody shoots and collects arrows together, on command, and beginners are supervised throughout. Your
            club will walk you through the range rules before you pick up a bow.
          </p>
          {apo ? (
            <p className="mt-3">
              ISAA has an Athlete Protection Officer. If you have a welfare or safeguarding concern about anything to do with student archery, you can
              contact them directly at{" "}
              <a href={`mailto:${apo.email}`} className="link-body">
                {apo.email}
              </a>
              .<VerifyNote>safeguarding wording to be confirmed by the committee, not drafted by a developer</VerifyNote>
            </p>
          ) : null}
        </div>

        <Figure
          src="/photos/beginners-club-kit.webp"
          alt="Four student archers in matching club shirts posing in a sports hall at an ISAA competition, with the shooting line behind them"
          width={1600}
          height={1067}
          className="mt-14"
        />

        <div className="mt-14 max-w-[68ch]">
          <SectionHeading title="Common questions" />
          <div className="flex flex-col gap-8">
            {FAQS.map((f) => (
              <div key={f.q}>
                <h3 className="text-ink">{f.q}</h3>
                <p className="mt-2">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <h2>Ready to try it?</h2>
          <p className="mt-3 text-ink-muted">Find your college&apos;s club and send them a message. That is genuinely all it takes.</p>
          <div className="mt-6">
            <Button href="/clubs">Find your club</Button>
          </div>
        </div>
      </div>
    </>
  );
}
