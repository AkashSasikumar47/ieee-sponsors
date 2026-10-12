"use client";

import { Plus, X } from "lucide-react";
import { Button } from "@ieee/ui/components/button";
import { Checkbox } from "@ieee/ui/components/checkbox";
import { Input } from "@ieee/ui/components/input";
import { Label } from "@ieee/ui/components/label";
import { Textarea } from "@ieee/ui/components/textarea";
import { Choice } from "@/components/choice";
import { EMPTY_CONTACT, type Contact, type Sponsor } from "@/lib/sponsors";

export type Draft = {
  name: string;
  category: string;
  industry: string;
  description: string;
  website: string;
  linkedin: string;
  notes: string;
  needs_review: boolean;
  contacts: Contact[];
};

export function toDraft(sponsor: Sponsor | null): Draft {
  return {
    name: sponsor?.name ?? "",
    category: sponsor?.category ?? "",
    industry: sponsor?.industry ?? "",
    description: sponsor?.description ?? "",
    website: sponsor?.website ?? "",
    linkedin: sponsor?.linkedin ?? "",
    notes: sponsor?.notes ?? "",
    needs_review: sponsor?.needs_review ?? false,
    contacts: sponsor?.contacts.length
      ? sponsor.contacts.map((contact) => ({ ...contact }))
      : [{ ...EMPTY_CONTACT }],
  };
}

const CONTACT_FIELDS: {
  key: keyof Contact;
  label: string;
  type: string;
  wide?: boolean;
}[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "role", label: "Role", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "linkedin", label: "LinkedIn", type: "url", wide: true },
];

function Field({
  id,
  label,
  children,
  className = "",
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label
        htmlFor={id}
        className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

export function SponsorForm({
  draft,
  onChange,
  industries,
  saving,
  creating,
  onCancel,
  onSave,
}: {
  draft: Draft;
  onChange: (draft: Draft) => void;
  industries: string[];
  saving: boolean;
  creating: boolean;
  onCancel: () => void;
  onSave: () => void;
}) {
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    onChange({ ...draft, [key]: value });

  const setContact = (index: number, key: keyof Contact, value: string) =>
    set(
      "contacts",
      draft.contacts.map((contact, at) =>
        at === index ? { ...contact, [key]: value } : contact,
      ),
    );

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        onSave();
      }}
    >
      <div className="flex flex-col gap-8 px-6 py-6 md:px-8">
        <section className="flex flex-col gap-4">
          <Field id="sponsor-name" label="Company name">
            <Input
              id="sponsor-name"
              value={draft.name}
              onChange={(event) => set("name", event.target.value)}
              maxLength={120}
              required
              autoFocus={creating}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="sponsor-category" label="Category">
              <Choice
                id="sponsor-category"
                value={draft.category || "none"}
                onChange={(value) =>
                  set("category", value === "none" ? "" : value)
                }
                options={[
                  { value: "tech", label: "Tech" },
                  { value: "non_tech", label: "Non-Tech" },
                  { value: "none", label: "Uncategorised" },
                ]}
              />
            </Field>
            <Field id="sponsor-industry" label="Industry">
              <Input
                id="sponsor-industry"
                value={draft.industry}
                onChange={(event) => set("industry", event.target.value)}
                maxLength={60}
              />
            </Field>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {industries
              .filter((industry) => industry !== draft.industry)
              .map((industry) => (
                <Button
                  key={industry}
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 px-2.5 text-xs"
                  onClick={() => set("industry", industry)}
                >
                  {industry}
                </Button>
              ))}
          </div>
          <Field id="sponsor-description" label="About">
            <Textarea
              id="sponsor-description"
              value={draft.description}
              onChange={(event) => set("description", event.target.value)}
              maxLength={1000}
              rows={3}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="sponsor-website" label="Website">
              <Input
                id="sponsor-website"
                value={draft.website}
                onChange={(event) => set("website", event.target.value)}
                maxLength={300}
                inputMode="url"
              />
            </Field>
            <Field id="sponsor-linkedin" label="Company LinkedIn">
              <Input
                id="sponsor-linkedin"
                value={draft.linkedin}
                onChange={(event) => set("linkedin", event.target.value)}
                maxLength={300}
                inputMode="url"
              />
            </Field>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Contacts
          </h3>
          {draft.contacts.map((contact, index) => (
            <fieldset
              key={index}
              className="grid gap-3 border p-4 sm:grid-cols-2"
            >
              <legend className="sr-only">Contact {index + 1}</legend>
              {CONTACT_FIELDS.map((field) => (
                <Field
                  key={field.key}
                  id={`contact-${index}-${field.key}`}
                  label={field.label}
                  className={field.wide ? "sm:col-span-2" : ""}
                >
                  <Input
                    id={`contact-${index}-${field.key}`}
                    type={field.type}
                    value={contact[field.key]}
                    onChange={(event) =>
                      setContact(index, field.key, event.target.value)
                    }
                  />
                </Field>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="justify-self-start sm:col-span-2"
                onClick={() =>
                  set(
                    "contacts",
                    draft.contacts.filter((_, at) => at !== index),
                  )
                }
              >
                <X />
                Remove contact
              </Button>
            </fieldset>
          ))}
          <Button
            type="button"
            variant="outline"
            className="self-start"
            onClick={() =>
              set("contacts", [...draft.contacts, { ...EMPTY_CONTACT }])
            }
          >
            <Plus />
            Add contact
          </Button>
        </section>

        <section className="flex flex-col gap-4">
          <Field id="sponsor-notes" label="Notes">
            <Textarea
              id="sponsor-notes"
              value={draft.notes}
              onChange={(event) => set("notes", event.target.value)}
              maxLength={2000}
              rows={4}
            />
          </Field>
          <Label className="flex items-center gap-3 border p-4 text-sm font-normal">
            <Checkbox
              className="rounded-none"
              checked={draft.needs_review}
              onCheckedChange={(checked) =>
                set("needs_review", checked === true)
              }
            />
            Needs review — something here is missing or unsure
          </Label>
        </section>
      </div>

      <div className="sticky bottom-0 mt-auto flex gap-2 border-t bg-background px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-8">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
        >
          {creating ? "Discard" : "Cancel"}
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={saving || !draft.name.trim()}
        >
          {saving ? "Saving…" : creating ? "Add sponsor" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
