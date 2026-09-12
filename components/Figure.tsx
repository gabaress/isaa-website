import Image from "next/image";

// A photograph used large, with explicit dimensions so layout never shifts.
// Never tinted, never rounded into a circle, never given a shadow. Optional caption
// and photographer credit in small muted type beneath.

type FigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
  sizes?: string;
  className?: string;
};

export function Figure({ src, alt, width, height, caption, credit, sizes = "(min-width: 1168px) 1120px, 100vw", className = "" }: FigureProps) {
  return (
    <figure className={`my-0 ${className}`}>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="h-auto w-full rounded-sm" />
      {caption || credit ? (
        <figcaption className="mt-3 text-[14px] leading-snug text-ink-muted">
          {caption}
          {caption && credit ? " " : null}
          {credit ? <span className="whitespace-nowrap">Photo: {credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
