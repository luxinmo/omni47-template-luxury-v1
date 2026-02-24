export type ContactType = "company" | "person";
export type ContactRole = "client" | "provider" | "worker" | "owner" | "other";
export type ContactStatus = "active" | "provisional" | "archived";
export type RelationshipType = "partner" | "associate" | "employee" | "family" | "other";
export type Language = "EN" | "ES" | "FR" | "DE" | "RU" | "NL" | "PL";
export type ContactOrigin = "web" | "referral" | "cold-call" | "event" | "portal" | "other";

export interface Contact {
  id: string;
  type: ContactType;
  name: string;
  companyName?: string;
  firstName?: string;
  lastName?: string;
  comercialName?: string;
  cifNif: string;
  emails: string[];
  phones: string[];
  web?: string;
  address?: string;
  roles: ContactRole[];
  status: ContactStatus;
  avatar?: string;
  languages: Language[];
  origin?: ContactOrigin;
  notes?: string;
  paymentDays?: number;
  iban?: string;
  currency?: string;
}

export interface RelatedContact {
  contactId: string;
  name: string;
  avatar?: string;
  relationship: RelationshipType;
}

export interface OwnedProperty {
  id: string;
  title: string;
  reference: string;
  status: string;
  thumbnail?: string;
}

export interface ActivityItem {
  id: string;
  date: string;
  description: string;
  type: "call" | "email" | "visit" | "note" | "document";
}

export const ROLE_OPTIONS: { value: ContactRole; label: string }[] = [
  { value: "client", label: "Cliente" },
  { value: "provider", label: "Proveedor" },
  { value: "worker", label: "Trabajador" },
  { value: "owner", label: "Propietario" },
  { value: "other", label: "Otro" },
];

export const STATUS_OPTIONS: { value: ContactStatus; label: string }[] = [
  { value: "active", label: "Activo" },
  { value: "provisional", label: "Provisional" },
  { value: "archived", label: "Archivado" },
];

export const LANGUAGE_OPTIONS: { value: Language; flag: string; label: string }[] = [
  { value: "EN", flag: "🇬🇧", label: "EN" },
  { value: "ES", flag: "🇪🇸", label: "ES" },
  { value: "FR", flag: "🇫🇷", label: "FR" },
  { value: "DE", flag: "🇩🇪", label: "DE" },
  { value: "RU", flag: "🇷🇺", label: "RU" },
  { value: "NL", flag: "🇳🇱", label: "NL" },
  { value: "PL", flag: "🇵🇱", label: "PL" },
];

export const ORIGIN_OPTIONS: { value: ContactOrigin; label: string }[] = [
  { value: "web", label: "Web" },
  { value: "referral", label: "Referido" },
  { value: "cold-call", label: "Llamada fría" },
  { value: "event", label: "Evento" },
  { value: "portal", label: "Portal inmobiliario" },
  { value: "other", label: "Otro" },
];

export const RELATIONSHIP_OPTIONS: { value: RelationshipType; label: string }[] = [
  { value: "partner", label: "Socio" },
  { value: "associate", label: "Asociado" },
  { value: "employee", label: "Empleado" },
  { value: "family", label: "Familia" },
  { value: "other", label: "Otro" },
];
