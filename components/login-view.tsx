"use client";

import { FlipIn } from "@/components/motion/flip-in";
import { FlipLetters } from "@/components/motion/flip-letters";
import { useIntroLock } from "@/components/motion/use-intro-lock";
import { IndexCard } from "@/components/index-card";
import { LoginForm } from "@/components/login-form";

export function LoginView({ error }: { error?: string }) {
  useIntroLock();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-gutter py-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          IEEE SRMIST · Admins only
        </p>
        <h1 className="font-display text-[clamp(3.5rem,14vw,8rem)] leading-[0.85] font-bold tracking-tight uppercase">
          <FlipLetters text="Sponsors" />
        </h1>
      </div>
      <FlipIn delay={0.45} origin="bottom" className="w-full max-w-md">
        <IndexCard>
          <div className="flex flex-col gap-6 py-8 pr-6 pl-16 md:pr-8 md:pl-20">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">
              Sign in
            </p>
            <LoginForm error={error} />
          </div>
        </IndexCard>
      </FlipIn>
    </main>
  );
}
