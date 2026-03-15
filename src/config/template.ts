/**
 * ═══════════════════════════════════════════════════════════
 *  TEMPLATE CONFIGURATION
 *  Central config for the Luxury Real Estate template.
 *  All brand, palette, typography, navigation, and contact
 *  settings are defined here. Pages consume this config
 *  so the template can be re-branded by editing this file.
 * ═══════════════════════════════════════════════════════════
 */

/* ─── Brand ─── */
export const brand = {
  name: "PRESTIGE",
  subtitle: "REAL ESTATE",
  fullName: "PRESTIGE ESTATES",
  tagline: "Curating extraordinary homes for exceptional lives since 2010.",
};

/* ─── Color Palette ─── */
export const palette = {
  bg: "#FAF8F5",
  bgAlt: "#F0ECE6",
  white: "#FFFFFF",
  text: "#2D2926",
  textMuted: "#6B6560",
  textLight: "#9A938B",
  accent: "#8B6F47",
  accentDark: "#6E5636",
  border: "#E2DCD4",
  footer: "#000000",
  offMarketBg: "#1E1C1A",
  offMarketAccent: "#C9A96E",
  newDevBg: "#F7F4EF",
};

/* ─── Typography ─── */
export const fonts = {
  brand: "'Jost', Helvetica, sans-serif",
  heading: "'Jost', Helvetica, sans-serif",
  body: "'Jost', Helvetica, sans-serif",
};

/* ─── Navigation ─── */
export interface NavItem {
  label: string;
  href: string;
}

export const navLeft: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Rentals", href: "#" },
];

export const navRight: NavItem[] = [
  { label: "About", href: "/page/about" },
  { label: "Guides & Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/* ─── Contact Info ─── */
export const contact = {
  email: "hello@prestigeestates.com",
  phone: "+34 600 000 000",
  city: "Marbella, Spain",
};

/* ─── Social Links ─── */
export const social = {
  instagram: "#",
  linkedin: "#",
  facebook: "#",
  twitter: "#",
};

/* ─── Footer Columns ─── */
export const footerColumns = [
  {
    title: "Properties",
    items: [
      { label: "For Sale", href: "/properties" },
      { label: "For Rent", href: "#" },
      { label: "New Developments", href: "#" },
      { label: "Off-Market", href: "#" },
    ],
  },
  {
    title: "Locations",
    items: [
      { label: "Marbella", href: "#" },
      { label: "Ibiza", href: "#" },
      { label: "Mallorca", href: "#" },
      { label: "Costa del Sol", href: "#" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/page/about" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy Policy", href: "/page/privacy" },
      { label: "Terms", href: "/page/terms" },
      { label: "Cookies", href: "#" },
      { label: "Sitemap", href: "#" },
    ],
  },
];

/* ─── Languages ─── */
export const languages = [
  { code: "EN", label: "English", flag: "gb" },
  { code: "ES", label: "Español", flag: "es" },
  { code: "DE", label: "Deutsch", flag: "de" },
  { code: "FR", label: "Français", flag: "fr" },
  { code: "RU", label: "Русский", flag: "ru" },
];

/* ─── Currencies ─── */
export const currencies = [
  { code: "EUR", symbol: "€", label: "EUR €" },
  { code: "GBP", symbol: "£", label: "GBP £" },
  { code: "USD", symbol: "$", label: "USD $" },
  { code: "CAD", symbol: "$", label: "CAD $" },
  { code: "AUD", symbol: "$", label: "AUD $" },
  { code: "RUB", symbol: "₽", label: "RUB ₽" },
];

/* ─── Area Units ─── */
export const areaUnits = [
  { code: "m2", label: "Square Meters (m²)" },
  { code: "ft2", label: "Square Feets (ft²)" },
];
