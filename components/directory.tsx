"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Download, Plus, Search } from "lucide-react";
import { Button } from "@ieee/ui/components/button";
import { Input } from "@ieee/ui/components/input";
import { Choice } from "@/components/choice";
import { CountUp } from "@/components/motion/count-up";
import { FlipLetters } from "@/components/motion/flip-letters";
import { EASE_OUT, FLIP, INTRO } from "@/components/motion/timing";
import { useIntroLock } from "@/components/motion/use-intro-lock";
import { ReachIcons } from "@/components/reach-icons";
import { SponsorPanel } from "@/components/sponsor-panel";
import { toCsv } from "@/lib/csv";
import {
  CATEGORY_LABELS,
  letterOf,
  REACH_LABELS,
  reachOf,
  type Reach,
  type Sponsor,
} from "@/lib/sponsors";

const LETTERS = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "#"];

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "tech", label: "Tech" },
  { value: "non_tech", label: "Non-Tech" },
  { value: "none", label: "Uncategorised" },
];

function matches(sponsor: Sponsor, query: string) {
  if (!query) return true;
  const haystack = [
    sponsor.name,
    sponsor.industry,
    sponsor.description,
    sponsor.notes,
    ...sponsor.contacts.flatMap((contact) => [
      contact.name,
      contact.role,
      contact.email,
      contact.phone,
    ]),
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

function download(sponsors: Sponsor[]) {
  const rows = [
    [
      "Company",
      "Category",
      "Industry",
      "Description",
      "Website",
      "Company LinkedIn",
      "Contact",
      "Role",
      "Email",
      "Phone",
      "Contact LinkedIn",
      "Needs review",
      "Notes",
    ],
  ];
  for (const sponsor of sponsors) {
    const base = [
      sponsor.name,
      CATEGORY_LABELS[sponsor.category ?? ""] ?? "",
      sponsor.industry,
      sponsor.description,
      sponsor.website,
      sponsor.linkedin,
    ];
    const tail = [sponsor.needs_review ? "Yes" : "", sponsor.notes];
    const contacts = sponsor.contacts.length ? sponsor.contacts : [null];
    for (const contact of contacts) {
      rows.push([
        ...base,
        contact?.name ?? "",
        contact?.role ?? "",
        contact?.email ?? "",
        contact?.phone ?? "",
        contact?.linkedin ?? "",
        ...tail,
      ]);
    }
  }
  const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ieee-sponsors-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function Directory({ sponsors }: { sponsors: Sponsor[] }) {
  useIntroLock();
  const [intro, setIntro] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [reach, setReach] = useState<Reach | "all">("all");
  const [industry, setIndustry] = useState("all");
  const [review, setReview] = useState(false);
  const [target, setTarget] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const deferredQuery = useDeferredValue(query.trim());

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), INTRO.lock * 1000);
    return () => window.clearTimeout(timer);
  }, []);

  const industries = useMemo(
    () =>
      [...new Set(sponsors.map((sponsor) => sponsor.industry).filter(Boolean))]
        .sort()
        .map((value) => ({ value, label: value })),
    [sponsors],
  );

  const reviewCount = sponsors.filter((sponsor) => sponsor.needs_review).length;

  const shown = useMemo(
    () =>
      sponsors.filter(
        (sponsor) =>
          (category === "all" ||
            (category === "none"
              ? !sponsor.category
              : sponsor.category === category)) &&
          (reach === "all" || reachOf(sponsor) === reach) &&
          (industry === "all" || sponsor.industry === industry) &&
          (!review || sponsor.needs_review) &&
          matches(sponsor, deferredQuery),
      ),
    [sponsors, category, reach, industry, review, deferredQuery],
  );

  const groups = useMemo(() => {
    const map = new Map<string, Sponsor[]>();
    for (const sponsor of shown) {
      const letter = letterOf(sponsor.name);
      map.set(letter, [...(map.get(letter) ?? []), sponsor]);
    }
    return LETTERS.filter((letter) => map.has(letter)).map((letter) => ({
      letter,
      sponsors: map.get(letter) ?? [],
    }));
  }, [shown]);

  const filtered =
    Boolean(deferredQuery) ||
    category !== "all" ||
    reach !== "all" ||
    industry !== "all" ||
    review;

  function show(id: string) {
    setTarget(id);
    setPanelOpen(true);
  }

  function clear() {
    setQuery("");
    setCategory("all");
    setReach("all");
    setIndustry("all");
    setReview(false);
  }

  let row = 0;

  return (
    <main className="flex-1">
      <section className="flex flex-col gap-6 border-b px-gutter pt-8 pb-6 md:flex-row md:items-end md:justify-between md:pt-12">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            The IEEE SRMIST sponsor file
          </p>
          <h1 className="font-display flex items-baseline gap-3 text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.82] font-bold tracking-tight uppercase">
            <span className="text-primary">
              <CountUp value={sponsors.length} />
            </span>
            <FlipLetters text="sponsors" delay={0.1} />
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => download(shown)}
            disabled={shown.length === 0}
          >
            <Download />
            Export {filtered ? "these" : "all"}
          </Button>
          <Button onClick={() => show("new")}>
            <Plus />
            Add sponsor
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-3 border-b px-gutter py-4">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search companies, people, emails, notes…"
            aria-label="Search sponsors"
            className="h-11 pl-10 text-base md:text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((option) => (
            <Button
              key={option.value}
              size="sm"
              variant={category === option.value ? "default" : "outline"}
              aria-pressed={category === option.value}
              onClick={() => setCategory(option.value)}
            >
              {option.label}
            </Button>
          ))}
          <Button
            size="sm"
            variant={review ? "default" : "outline"}
            aria-pressed={review}
            onClick={() => setReview(!review)}
          >
            Needs review
            <span className="font-mono text-xs opacity-70">{reviewCount}</span>
          </Button>
          <Choice
            value={reach}
            onChange={(value) => setReach(value as Reach | "all")}
            label="Reach"
            className="h-8 w-auto"
            options={[
              { value: "all", label: "Any contact" },
              ...Object.entries(REACH_LABELS).map(([value, label]) => ({
                value,
                label,
              })),
            ]}
          />
          <Choice
            value={industry}
            onChange={setIndustry}
            label="Industry"
            className="h-8 w-auto"
            options={[{ value: "all", label: "Any industry" }, ...industries]}
          />
          {filtered && (
            <Button size="sm" variant="outline" onClick={clear}>
              Clear
            </Button>
          )}
          <p className="ml-auto font-mono text-xs text-muted-foreground">
            {shown.length} of {sponsors.length}
          </p>
        </div>
      </section>

      {groups.length === 0 ? (
        <div className="flex flex-col items-center gap-4 px-gutter py-20 text-center">
          <p className="font-display text-4xl font-bold uppercase">
            Nothing on file
          </p>
          <p className="text-sm text-muted-foreground">
            No sponsor matches these filters.
          </p>
          <Button variant="outline" onClick={clear}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="px-gutter pb-16">
          {groups.map((group) => (
            <section
              key={group.letter}
              id={`letter-${group.letter}`}
              className="grid scroll-mt-16 border-b last:border-b-0 md:grid-cols-[6rem_minmax(0,1fr)]"
            >
              <h2 className="font-display sticky top-14.5 z-10 self-start bg-background py-2 text-2xl leading-none font-bold text-primary md:bg-transparent md:pt-5 md:text-6xl">
                {group.letter}
              </h2>
              <ul className="divide-y">
                {group.sponsors.map((sponsor) => {
                  const index = row++;
                  const animate = intro && index < INTRO.rows;
                  const lead = sponsor.contacts.find((contact) => contact.name);
                  return (
                    <motion.li
                      key={sponsor.id}
                      style={{
                        transformPerspective: FLIP.perspective,
                        transformOrigin: "top",
                      }}
                      initial={
                        animate ? { rotateX: FLIP.tilt, opacity: 0 } : false
                      }
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{
                        duration: FLIP.duration,
                        delay: INTRO.rowsDelay + index * FLIP.stagger,
                        ease: EASE_OUT,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => show(sponsor.id)}
                        className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 text-left transition-colors outline-none hover:bg-accent/60 focus-visible:bg-accent md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.2fr)_6.5rem] md:gap-5 md:px-3"
                      >
                        <span className="flex min-w-0 flex-col">
                          <span className="flex items-center gap-2 truncate font-medium">
                            <span className="truncate">{sponsor.name}</span>
                            {sponsor.needs_review && (
                              <span
                                className="size-1.5 shrink-0 bg-destructive"
                                aria-label="Needs review"
                              />
                            )}
                          </span>
                          <span className="truncate text-sm text-muted-foreground">
                            <span className="md:hidden">
                              {[
                                sponsor.industry,
                                CATEGORY_LABELS[sponsor.category ?? ""],
                              ]
                                .filter(Boolean)
                                .join(" · ") || "—"}
                            </span>
                            <span className="hidden md:inline">
                              {sponsor.description || "No description yet"}
                            </span>
                          </span>
                        </span>
                        <span className="hidden min-w-0 flex-col md:flex">
                          <span className="truncate text-sm">
                            {sponsor.industry || "—"}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground uppercase">
                            {CATEGORY_LABELS[sponsor.category ?? ""] ??
                              "Uncategorised"}
                          </span>
                        </span>
                        <span className="hidden min-w-0 flex-col md:flex">
                          <span className="truncate text-sm">
                            {lead?.name || "No named contact"}
                          </span>
                          <span className="truncate font-mono text-xs text-muted-foreground">
                            {sponsor.contacts.length}{" "}
                            {sponsor.contacts.length === 1
                              ? "contact"
                              : "contacts"}
                          </span>
                        </span>
                        <ReachIcons sponsor={sponsor} />
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      <nav
        aria-label="Jump to letter"
        className="fixed top-1/2 right-[calc(var(--gutter)/2)] z-20 flex translate-x-1/2 -translate-y-1/2 flex-col items-center"
      >
        {LETTERS.map((letter) => {
          const present = groups.some((group) => group.letter === letter);
          return (
            <button
              key={letter}
              type="button"
              disabled={!present}
              onClick={() =>
                document
                  .getElementById(`letter-${letter}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="flex h-[min(1.35rem,3dvh)] w-5 items-center justify-center font-mono text-[0.625rem] leading-none font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:text-muted-foreground/40 disabled:hover:bg-transparent"
            >
              {letter}
            </button>
          );
        })}
      </nav>

      <SponsorPanel
        key={target ?? "none"}
        open={panelOpen}
        sponsor={sponsors.find((sponsor) => sponsor.id === target) ?? null}
        industries={industries.map((option) => option.value)}
        onClose={() => setPanelOpen(false)}
        onSaved={setTarget}
      />
    </main>
  );
}
