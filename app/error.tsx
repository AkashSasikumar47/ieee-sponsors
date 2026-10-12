"use client";

import { Button } from "@ieee/ui/components/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-gutter py-16 text-center">
      <p className="text-sm text-muted-foreground">Something went wrong.</p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
