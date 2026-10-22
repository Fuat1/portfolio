export function SectionHeading({ index, id, title, intro }: { index: string; id: string; title: string; intro?: string }) {
  return (
    <div>
      <div className="flex items-baseline gap-4 border-t-2 border-fg pt-5">
        <span className="font-mono text-sm text-accent">{index}</span>
        <h2 id={id} className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {intro ? <p className="mt-3 max-w-2xl text-muted sm:ml-10">{intro}</p> : null}
    </div>
  );
}
