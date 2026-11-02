export default function SkeletonCard() {
  return (
    <div
      data-testid="skeleton-card"
      aria-hidden="true"
      className="animate-pulse motion-reduce:animate-none overflow-hidden rounded-2xl border border-contraste/15 bg-blanco/60"
    >
      <div className="aspect-[4/3] w-full bg-contraste/10" />

      <div className="space-y-3 p-4">
        <div className="h-3 w-20 rounded-full bg-contraste/10" />
        <div className="h-5 w-3/4 rounded-full bg-contraste/10" />
        <div className="h-3 w-full rounded-full bg-contraste/10" />
        <div className="h-3 w-5/6 rounded-full bg-contraste/10" />

        <div className="flex items-center justify-between gap-3 pt-4">
          <div className="h-4 w-24 rounded-full bg-contraste/10" />
          <div className="h-3 w-16 rounded-full bg-contraste/10" />
        </div>
      </div>
    </div>
  );
}
