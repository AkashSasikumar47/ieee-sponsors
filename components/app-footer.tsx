import { copyrightLine } from "@ieee/ui/layout/app-footer";
import { SignOutButton } from "@/components/sign-out-button";

export function AppFooter({ email }: { email?: string }) {
  return (
    <footer
      className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t px-gutter pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] font-mono text-xs text-muted-foreground ${email === undefined ? "" : "sticky bottom-0 z-20 bg-background/95 backdrop-blur"}`}
    >
      <p>{copyrightLine()}</p>
      {email === undefined ? (
        <p>Private · admins only</p>
      ) : (
        <div className="flex min-w-0 items-center gap-3">
          {email && (
            <p className="hidden truncate sm:block">Signed in as {email}</p>
          )}
          <SignOutButton />
        </div>
      )}
    </footer>
  );
}
