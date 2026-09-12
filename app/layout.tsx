import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL, site } from "@/lib/content";
import "./globals.css";

// One family: Archivo, 400/500/700, latin only, swap — SPEC.md §5.2.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | University Archery Clubs in Ireland`,
    template: `%s | ${site.shortName}`,
  },
  description:
    "The Irish Student Archery Association runs intervarsity archery for college and university clubs across the island of Ireland. Find your club and get started.",
  applicationName: site.shortName,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#015a06",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" className={`${archivo.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-sm focus:bg-green focus:px-4 focus:py-3 focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
