// The title band at the top of every inner page: rule, H1, one-line intro, and an
// optional slot beneath (the club jump row, for instance).

export function PageHeader({ title, intro, children }: { title: string; intro?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="border-b border-line bg-surface">
      <div className="container-site py-10 md:py-14">
        <div className="mb-4 h-[3px] w-12 bg-green" aria-hidden="true" />
        <h1>{title}</h1>
        {intro ? <p className="mt-4 max-w-[68ch] text-[17px] text-ink-muted md:text-[18px]">{intro}</p> : null}
        {children}
      </div>
    </div>
  );
}
