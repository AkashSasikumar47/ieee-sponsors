import type { Metadata } from "next";
import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";
import { LoginView } from "@/components/login-view";

export const metadata: Metadata = { title: "Sign in | Sponsors" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { error } = await searchParams;

  return (
    <>
      <AppHeader />
      <LoginView error={typeof error === "string" ? error : undefined} />
      <AppFooter />
    </>
  );
}
