// Data contracts — SPEC.md §7. Do not add fields without a real requirement.

export interface Club {
  id: string; // "ucd" — also the /clubs#anchor
  institution: string; // CURRENT official name, as it displays
  formerName?: string; // "formerly NUI Galway" — only where ISAA asks for it
  clubName?: string;
  city?: string; // omitted for multi-campus institutions
  description?: string;
  email?: string;
  instagram?: string; // full URL
  website?: string;
  logo?: string; // DEFERRED — leave unset for every club at launch
}

export type EventType = "competition" | "social" | "agm" | "training";

export interface ISAAEvent {
  id: string;
  title: string;
  type: EventType;
  startDate: string; // ISO "2026-11-14"
  endDate?: string;
  venue: string;
  description?: string;
  entryDeadline?: string;
  entryUrl?: string; // external
  resultsUrl?: string;
}

export type DocumentGroup = "competing" | "governance";

export interface SiteDocument {
  title: string;
  description?: string; // who it is for, what it covers
  group: DocumentGroup;
  file: string; // "/pdfs/isaa-constitution-2017.pdf"
  sizeLabel: string; // "PDF · 640KB" — real size, never estimated
  versionLabel: string; // "Adopted 12 August 2017" — always shown
}

export interface Fact {
  label: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  domain: string;
  email: string;
  instagram?: string;
  facebook?: string;
  tagline: string;
}

export interface CommitteeRole {
  role: string;
  email: string;
}
