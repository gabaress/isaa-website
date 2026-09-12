import Image from "next/image";
import { Button } from "@/components/Button";

// Photo-led hero under a solid ISAA-green scrim — a brand panel that happens to
// contain a photograph. The scrim is solid, never a gradient. Text left-aligned;
// buttons full-width on mobile. object-position keeps the archer in frame at 375px.

type HeroProps = {
  title: string;
  subhead: string;
  supporting?: string;
};

export function Hero({ title, subhead, supporting }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-green text-white" aria-labelledby="hero-heading">
      <Image
        src="/photos/hero-full-draw.webp"
        alt="An archer at full draw during an ISAA indoor intervarsity, with targets in the background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[38%_35%] md:object-[55%_35%]"
      />
      <div className="absolute inset-0 bg-green/75" aria-hidden="true" />

      <div className="container-site relative flex min-h-[400px] flex-col justify-center py-14 md:min-h-[480px] md:py-20">
        <div className="max-w-[640px]">
          <h1 id="hero-heading" className="text-white">
            {title}
          </h1>
          <p className="mt-4 max-w-[52ch] text-[19px] font-medium leading-snug md:text-[21px]">{subhead}</p>
          {supporting ? <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-white/90 md:text-[17px]">{supporting}</p> : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/clubs" onDark className="min-h-[48px] sm:min-w-[180px]">
              Find your club
            </Button>
            <Button href="/getting-started" variant="secondary" onDark className="min-h-[48px] sm:min-w-[180px]">
              New to archery?
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
