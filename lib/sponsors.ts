import type { Database } from "@ieee/supabase/types";

type Tables = Database["public"]["Tables"];

export type Contact = Pick<
  Tables["ieee_sponsors_contacts"]["Row"],
  "name" | "role" | "email" | "phone" | "linkedin"
>;

export type Sponsor = Omit<
  Tables["ieee_sponsors_companies"]["Row"],
  "created_at"
> & { contacts: Contact[] };

export type Change = Pick<
  Tables["ieee_sponsors_changes"]["Row"],
  "id" | "action" | "fields" | "actor_email" | "created_at"
>;

export type Reach = "direct" | "web" | "none";

export const CATEGORY_LABELS: Record<string, string> = {
  tech: "Tech",
  non_tech: "Non-Tech",
};

export const REACH_LABELS: Record<Reach, string> = {
  direct: "Email or phone",
  web: "Web or LinkedIn only",
  none: "No contact info",
};

export const FIELD_LABELS: Record<string, string> = {
  name: "name",
  category: "category",
  industry: "industry",
  description: "description",
  website: "website",
  linkedin: "LinkedIn",
  notes: "notes",
  needs_review: "review flag",
  contacts: "contacts",
};

export const EMPTY_CONTACT: Contact = {
  name: "",
  role: "",
  email: "",
  phone: "",
  linkedin: "",
};

export function reachOf(sponsor: Sponsor): Reach {
  if (sponsor.contacts.some((contact) => contact.email || contact.phone)) {
    return "direct";
  }
  if (
    sponsor.website ||
    sponsor.linkedin ||
    sponsor.contacts.some((contact) => contact.linkedin)
  ) {
    return "web";
  }
  return "none";
}

export function letterOf(name: string) {
  const first = name.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : "#";
}

export function href(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export function shortLink(value: string) {
  return value
    .replace(/^https?:\/\/(www\.)?/i, "")
    .replace(/\/$/, "")
    .replace(/^linkedin\.com\/(company|in)\//, "");
}
