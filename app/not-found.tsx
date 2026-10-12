import Link from "next/link";
import { Button } from "@ieee/ui/components/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-gutter py-16 text-center">
      <p className="font-display text-6xl font-bold uppercase">Not on file</p>
      <p className="text-sm text-muted-foreground">
        That page doesn&apos;t exist.
      </p>
      <Button variant="outline" asChild>
        <Link href="/">Back to sponsors</Link>
      </Button>
    </main>
  );
}
