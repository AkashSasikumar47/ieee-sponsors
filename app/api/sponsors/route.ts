import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/auth";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function fail(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  const supabase = await getAdminClient();
  if (!supabase) return fail("Unauthorized", 401);

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!body || typeof body !== "object") return fail("Invalid request");

  const id = text(body.id, 36);
  if (id && !UUID.test(id)) return fail("Invalid request");
  const name = text(body.name, 120);
  if (!name) return fail("Enter the company name.");
  const category = text(body.category, 10);
  if (category && category !== "tech" && category !== "non_tech") {
    return fail("Pick Tech or Non-Tech.");
  }

  const contacts = (Array.isArray(body.contacts) ? body.contacts : [])
    .slice(0, 20)
    .map((item: Record<string, unknown>) => ({
      name: text(item?.name, 120),
      role: text(item?.role, 80),
      email: text(item?.email, 200).toLowerCase(),
      phone: text(item?.phone, 40),
      linkedin: text(item?.linkedin, 300),
    }));
  const badEmail = contacts.find(
    (contact) => contact.email && !EMAIL.test(contact.email),
  );
  if (badEmail) return fail(`Check the email "${badEmail.email}".`);

  const { data, error } = await supabase.rpc("ieee_sponsors_save", {
    sponsor: {
      id,
      name,
      category,
      industry: text(body.industry, 60),
      description: text(body.description, 1000),
      website: text(body.website, 300),
      linkedin: text(body.linkedin, 300),
      notes: text(body.notes, 2000),
      needs_review: body.needs_review === true,
    },
    contacts,
  });
  if (error) {
    return fail(
      error.code === "23505"
        ? "A sponsor with that name is already on file."
        : error.message.includes("not_found")
          ? "This sponsor was deleted."
          : "Couldn't save the sponsor.",
    );
  }

  return NextResponse.json({ id: data });
}
