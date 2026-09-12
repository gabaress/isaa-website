import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { TargetRings } from "@/components/TargetRings";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="container-site section-pad">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-16">
        <TargetRings className="shrink-0 text-green" size={160} />
        <div>
          <div className="mb-4 h-[3px] w-12 bg-green" aria-hidden="true" />
          <h1>Page not found</h1>
          <p className="mt-4 text-ink-muted">That page does not exist, or it has moved. Try one of these instead.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/">Home</Button>
            <Button href="/clubs" variant="secondary">
              Clubs
            </Button>
            <Button href="/events" variant="secondary">
              Events
            </Button>
          </div>
          <p className="mt-8 text-[15px] text-ink-muted">
            Looking for a document? Everything ISAA publishes is on the{" "}
            <Link href="/resources" className="link-body">
              resources page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
