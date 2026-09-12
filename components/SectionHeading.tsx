// H2 + the site's signature 3px green rule (48px wide) + optional intro.
// `as` lets pages that already have an H1 keep a correct heading hierarchy.

type SectionHeadingProps = {
  title: string;
  intro?: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ title, intro, id, as: Tag = "h2", className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="mb-4 h-[3px] w-12 bg-green" aria-hidden="true" />
      <Tag id={id}>{title}</Tag>
      {intro ? <div className="mt-3 text-ink-muted [&_p]:max-w-[68ch]">{typeof intro === "string" ? <p>{intro}</p> : intro}</div> : null}
    </div>
  );
}
