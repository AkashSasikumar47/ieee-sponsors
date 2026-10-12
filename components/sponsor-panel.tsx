"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, ExternalLink, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ieee/ui/components/alert-dialog";
import { Badge } from "@ieee/ui/components/badge";
import { Button } from "@ieee/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@ieee/ui/components/sheet";
import { FlipIn } from "@/components/motion/flip-in";
import { SponsorForm, toDraft, type Draft } from "@/components/sponsor-form";
import {
  CATEGORY_LABELS,
  FIELD_LABELS,
  href,
  REACH_LABELS,
  reachOf,
  shortLink,
  type Change,
  type Contact,
  type Sponsor,
} from "@/lib/sponsors";

const DATE = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

function copy(value: string, label: string) {
  navigator.clipboard
    .writeText(value)
    .then(() => toast.success(`${label} copied`))
    .catch(() => toast.error("Couldn't copy"));
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
      {children}
    </h3>
  );
}

function ContactLine({
  kind,
  value,
  link,
}: {
  kind: string;
  value: string;
  link: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <a
        href={link}
        {...(kind === "LinkedIn"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="min-w-0 truncate font-mono text-sm underline-offset-4 hover:text-primary hover:underline"
      >
        {kind === "LinkedIn" ? shortLink(value) : value}
      </a>
      <Button
        size="icon"
        variant="outline"
        className="size-7 shrink-0"
        aria-label={`Copy ${kind.toLowerCase()}`}
        onClick={() => copy(value, kind)}
      >
        <Copy className="size-3.5" />
      </Button>
    </div>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  return (
    <li className="flex flex-col gap-2 border p-4">
      <div className="flex items-baseline justify-between gap-2">
        <p className="font-medium">{contact.name || "Unnamed contact"}</p>
        {contact.role && (
          <p className="truncate font-mono text-xs text-muted-foreground uppercase">
            {contact.role}
          </p>
        )}
      </div>
      {contact.email && (
        <ContactLine
          kind="Email"
          value={contact.email}
          link={`mailto:${contact.email}`}
        />
      )}
      {contact.phone && (
        <ContactLine
          kind="Phone"
          value={contact.phone}
          link={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
        />
      )}
      {contact.linkedin && (
        <ContactLine
          kind="LinkedIn"
          value={contact.linkedin}
          link={href(contact.linkedin)}
        />
      )}
    </li>
  );
}

function describe(change: Change) {
  if (change.action !== "edited") {
    return change.action === "created" ? "Added to the file" : "Deleted";
  }
  const fields = change.fields.map((field) => FIELD_LABELS[field] ?? field);
  return `Edited ${
    fields.length > 1
      ? `${fields.slice(0, -1).join(", ")} and ${fields.at(-1)}`
      : fields[0]
  }`;
}

function History({ id, version }: { id: string; version: number }) {
  const [changes, setChanges] = useState<Change[] | null>(null);

  useEffect(() => {
    let live = true;
    fetch(`/api/sponsors/${id}/history`)
      .then((response) => (response.ok ? response.json() : { changes: [] }))
      .then((body: { changes: Change[] }) => {
        if (live) setChanges(body.changes);
      })
      .catch(() => {
        if (live) setChanges([]);
      });
    return () => {
      live = false;
    };
  }, [id, version]);

  if (!changes) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }
  if (changes.length === 0) {
    return <p className="text-sm text-muted-foreground">No changes yet.</p>;
  }
  return (
    <ol className="flex flex-col gap-3 border-l pl-4">
      {changes.map((change) => (
        <li key={change.id} className="relative flex flex-col gap-0.5">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[calc(1rem+3.5px)] size-1.5 bg-primary"
          />
          <span className="text-sm">{describe(change)}</span>
          <span className="font-mono text-xs text-muted-foreground">
            {change.actor_email || "Someone"} ·{" "}
            {DATE.format(new Date(change.created_at))}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function SponsorPanel({
  open,
  sponsor,
  industries,
  onClose,
  onSaved,
}: {
  open: boolean;
  sponsor: Sponsor | null;
  industries: string[];
  onClose: () => void;
  onSaved: (id: string) => void;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(!sponsor);
  const [draft, setDraft] = useState<Draft>(() => toDraft(sponsor));
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<"close" | "cancel" | null>(null);
  const [removing, setRemoving] = useState(false);
  const [version, setVersion] = useState(0);
  const dirty =
    editing && JSON.stringify(draft) !== JSON.stringify(toDraft(sponsor));

  function attemptClose() {
    if (dirty) setConfirm("close");
    else onClose();
  }

  function cancelEdit() {
    if (!sponsor) return attemptClose();
    if (dirty) return setConfirm("cancel");
    setEditing(false);
  }

  function discard() {
    const reason = confirm;
    setConfirm(null);
    setDraft(toDraft(sponsor));
    if (reason === "close" || !sponsor) onClose();
    else setEditing(false);
  }

  async function save() {
    if (saving) return;
    setSaving(true);
    const response = await fetch("/api/sponsors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...draft, id: sponsor?.id ?? "" }),
    }).catch(() => null);
    const body = (await response?.json().catch(() => null)) as {
      id?: string;
      error?: string;
    } | null;
    setSaving(false);
    if (!response?.ok || !body?.id) {
      toast.error(body?.error ?? "Couldn't save the sponsor.");
      return;
    }
    toast.success(sponsor ? "Changes saved" : `${draft.name.trim()} added`);
    router.refresh();
    if (sponsor) {
      setEditing(false);
      setVersion((value) => value + 1);
    } else {
      onSaved(body.id);
    }
  }

  async function remove() {
    if (!sponsor || removing) return;
    setRemoving(true);
    const response = await fetch(`/api/sponsors/${sponsor.id}`, {
      method: "DELETE",
    }).catch(() => null);
    setRemoving(false);
    if (!response?.ok) {
      toast.error("Couldn't delete the sponsor.");
      return;
    }
    toast.success(`${sponsor.name} deleted`);
    onClose();
    router.refresh();
  }

  useEffect(() => {
    if (!sponsor || editing) return;
    setDraft(toDraft(sponsor));
  }, [sponsor, editing]);

  const reach = sponsor ? reachOf(sponsor) : null;

  return (
    <>
      <Sheet open={open} onOpenChange={(next) => !next && attemptClose()}>
        <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-xl">
          <div className="relative border-b bg-muted bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_calc(2rem-1px),var(--border)_calc(2rem-1px),var(--border)_2rem)] px-6 pt-10 pb-6 md:px-8">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-3 w-px bg-primary/50 md:left-4"
            />
            <FlipIn
              key={editing ? "edit" : "view"}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex min-w-0 flex-col gap-1">
                  <SheetTitle className="font-display text-3xl leading-none font-bold tracking-tight uppercase md:text-4xl">
                    {sponsor
                      ? sponsor.name
                      : draft.name.trim() || "New sponsor"}
                  </SheetTitle>
                  <SheetDescription className="font-mono text-xs uppercase">
                    {sponsor
                      ? [
                          CATEGORY_LABELS[sponsor.category ?? ""] ??
                            "Uncategorised",
                          sponsor.industry,
                        ]
                          .filter(Boolean)
                          .join(" · ")
                      : "Add a company to the sponsor file"}
                  </SheetDescription>
                </div>
              </div>
              {sponsor && !editing && (
                <div className="flex flex-wrap items-center gap-2">
                  {sponsor.needs_review && (
                    <Badge variant="destructive" className="rounded-none">
                      Needs review
                    </Badge>
                  )}
                  {reach && (
                    <Badge variant="outline" className="rounded-none">
                      {REACH_LABELS[reach]}
                    </Badge>
                  )}
                </div>
              )}
            </FlipIn>
          </div>

          {editing ? (
            <SponsorForm
              draft={draft}
              onChange={setDraft}
              industries={industries}
              saving={saving}
              creating={!sponsor}
              onCancel={cancelEdit}
              onSave={save}
            />
          ) : (
            sponsor && (
              <div className="flex flex-col gap-8 px-6 py-6 md:px-8">
                <div className="flex gap-2">
                  <Button onClick={() => setEditing(true)} className="flex-1">
                    <Pencil />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">
                        <Trash />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete {sponsor.name}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          The company and its {sponsor.contacts.length}{" "}
                          {sponsor.contacts.length === 1
                            ? "contact"
                            : "contacts"}{" "}
                          leave the file for good.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep it</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={remove}
                          disabled={removing}
                          variant="destructive"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <section className="flex flex-col gap-3">
                  <Label>
                    Contacts
                    {sponsor.contacts.length > 0 &&
                      ` · ${sponsor.contacts.length}`}
                  </Label>
                  {sponsor.contacts.length ? (
                    <ul className="flex flex-col gap-2">
                      {sponsor.contacts.map((contact, index) => (
                        <ContactCard key={index} contact={contact} />
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No contacts on file.
                    </p>
                  )}
                </section>

                {(sponsor.website || sponsor.linkedin) && (
                  <section className="flex flex-col gap-3">
                    <Label>Links</Label>
                    <div className="flex flex-wrap gap-2">
                      {sponsor.website && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={href(sponsor.website)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink />
                            {shortLink(sponsor.website)}
                          </a>
                        </Button>
                      )}
                      {sponsor.linkedin && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={href(sponsor.linkedin)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                    </div>
                  </section>
                )}

                <section className="flex flex-col gap-3">
                  <Label>About</Label>
                  <p className="text-sm leading-relaxed">
                    {sponsor.description || (
                      <span className="text-muted-foreground">
                        No description yet.
                      </span>
                    )}
                  </p>
                </section>

                {sponsor.notes && (
                  <section className="flex flex-col gap-3">
                    <Label>Notes</Label>
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {sponsor.notes}
                    </p>
                  </section>
                )}

                <section className="flex flex-col gap-3">
                  <Label>History</Label>
                  <History id={sponsor.id} version={version} />
                </section>
              </div>
            )
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={confirm !== null}
        onOpenChange={(next) => !next && setConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {sponsor ? "Discard your changes?" : "Discard this sponsor?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {sponsor
                ? "Your edits haven't been saved yet."
                : "Nothing you typed has been saved."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction onClick={discard}>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
