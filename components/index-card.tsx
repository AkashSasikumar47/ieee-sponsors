export function IndexCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden border bg-card bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_calc(2rem-1px),var(--border)_calc(2rem-1px),var(--border)_2rem)] shadow-sm ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-10 w-px bg-primary/50 md:left-12"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
