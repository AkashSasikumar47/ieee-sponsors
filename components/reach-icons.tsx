import { BriefcaseBusiness, Globe, Mail, Phone } from "lucide-react";
import type { Sponsor } from "@/lib/sponsors";

export function ReachIcons({ sponsor }: { sponsor: Sponsor }) {
  const items = [
    {
      icon: Mail,
      label: "Email",
      on: sponsor.contacts.some((contact) => contact.email),
    },
    {
      icon: Phone,
      label: "Phone",
      on: sponsor.contacts.some((contact) => contact.phone),
    },
    {
      icon: BriefcaseBusiness,
      label: "LinkedIn",
      on:
        Boolean(sponsor.linkedin) ||
        sponsor.contacts.some((contact) => contact.linkedin),
    },
    { icon: Globe, label: "Website", on: Boolean(sponsor.website) },
  ];

  return (
    <span className="flex items-center justify-end gap-1.5">
      {items.map(({ icon: Icon, label, on }) => (
        <Icon
          key={label}
          aria-label={on ? label : undefined}
          aria-hidden={!on}
          className={`size-3.5 ${on ? "text-foreground" : "text-muted-foreground/30"}`}
        />
      ))}
    </span>
  );
}
