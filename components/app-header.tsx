import Image from "next/image";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b bg-background px-gutter pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
      <Link href="/" className="flex items-baseline gap-2.5">
        <span className="font-display text-2xl leading-none font-bold tracking-tight uppercase">
          Sponsors
        </span>
        <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
          IEEE SRMIST
        </span>
      </Link>
      <a
        href="https://ieeesrmist.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="IEEE SRMIST"
      >
        <Image
          src="/logos/ieee-srmist-logo.png"
          alt="IEEE SRMIST"
          width={32}
          height={32}
          preload
        />
      </a>
    </header>
  );
}
