import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { VerifyNote } from "@/components/Placeholder";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "This site sets no cookies, runs no analytics and collects no personal data. How to contact ISAA about your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy" />
      <div className="container-site section-pad">
        <div className="max-w-[68ch] text-[17px] leading-relaxed">
          <p>
            This website sets no cookies, runs no analytics and loads no third-party scripts. There is no contact form, so nothing you do here is collected or
            stored by us.
          </p>
          <p className="mt-5">
            The site is hosted on Vercel, whose servers handle requests for pages and files in the ordinary way; that is the only processing that takes place.
          </p>
          <p className="mt-5">
            For any question about personal data held by the Irish Student Archery Association, email{" "}
            <a href={`mailto:${site.email}`} className="link-body">
              {site.email}
            </a>
            .
          </p>
          <p className="mt-5">
            <VerifyNote>committee to confirm this wording before the public launch</VerifyNote>
          </p>
        </div>
      </div>
    </>
  );
}
