export type LocationLevel = "country" | "province" | "town" | "zone";

export const LEVEL_ORDER: LocationLevel[] = ["country", "province", "town", "zone"];

export const LEVEL_LABELS: Record<LocationLevel, string> = {
  country: "Country",
  province: "Province",
  town: "Town",
  zone: "Zone",
};

export const CHILD_LEVEL: Record<LocationLevel, LocationLevel | null> = {
  country: "province",
  province: "town",
  town: "zone",
  zone: null,
};

export interface LocationNode {
  id: string;
  parentId: string | null;
  level: LocationLevel;
  name: string;
  safeName: string;
  names: Record<string, string>; // lang code → name
  slugs: Record<string, string>; // lang code → slug
  active: boolean;
  order: number;
  geojson: string | null;
  childrenCount: number;
}

export const LANGUAGES = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "es", flag: "🇪🇸", label: "Spanish" },
  { code: "fr", flag: "🇫🇷", label: "French" },
  { code: "de", flag: "🇩🇪", label: "German" },
  { code: "ru", flag: "🇷🇺", label: "Russian" },
  { code: "nl", flag: "🇳🇱", label: "Dutch" },
  { code: "pl", flag: "🇵🇱", label: "Polish" },
] as const;
