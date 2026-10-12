import { redirect } from "next/navigation";
import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";
import { Directory } from "@/components/directory";
import { getAdmin } from "@/lib/auth";
import type { Sponsor } from "@/lib/sponsors";

export default async function HomePage() {
  const admin = await getAdmin();
  if (!admin) redirect("/login");

  const { data } = await admin.supabase
    .from("ieee_sponsors_companies")
    .select(
      "id, name, category, industry, description, website, linkedin, notes, needs_review, updated_at, contacts:ieee_sponsors_contacts(name, role, email, phone, linkedin, position)",
    );

  const sponsors: Sponsor[] = (data ?? [])
    .map(({ contacts, ...sponsor }) => ({
      ...sponsor,
      contacts: [...contacts]
        .sort((a, b) => a.position - b.position)
        .map(({ name, role, email, phone, linkedin }) => ({
          name,
          role,
          email,
          phone,
          linkedin,
        })),
    }))
    .sort((a, b) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
    );

  return (
    <>
      <AppHeader />
      <Directory sponsors={sponsors} />
      <AppFooter email={admin.email} />
    </>
  );
}
