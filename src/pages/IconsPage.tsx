import { useState } from "react";
import { toast } from "sonner";

interface IconDef {
  name: string;
  svg: string;
  tags: string[];
}

const ICONS: IconDef[] = [
  // ── Property Types ──
  { name: "House", tags: ["property", "home"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22L24 6l18 16"/><path d="M10 20v18a2 2 0 002 2h24a2 2 0 002-2V20"/><rect x="18" y="28" width="12" height="12" rx="1"/></svg>` },
  { name: "Villa", tags: ["property", "luxury"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 24L24 8l20 16"/><path d="M8 22v18h32V22"/><rect x="14" y="28" width="8" height="12"/><rect x="26" y="28" width="8" height="6" rx="4"/><path d="M14 18h20"/></svg>` },
  { name: "Apartment", tags: ["property", "building"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="6" width="28" height="36" rx="2"/><rect x="16" y="12" width="6" height="5"/><rect x="26" y="12" width="6" height="5"/><rect x="16" y="22" width="6" height="5"/><rect x="26" y="22" width="6" height="5"/><rect x="19" y="34" width="10" height="8" rx="1"/></svg>` },
  { name: "Penthouse", tags: ["property", "luxury"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="14" width="28" height="28" rx="2"/><path d="M16 14V8h16v6"/><rect x="16" y="20" width="6" height="5"/><rect x="26" y="20" width="6" height="5"/><rect x="16" y="30" width="6" height="5"/><rect x="26" y="30" width="6" height="5"/><path d="M14 6h20"/></svg>` },
  { name: "Townhouse", tags: ["property", "residential"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 42V20l12-10 12 10v22"/><path d="M20 42V20l12-10 12 10v22"/><rect x="10" y="26" width="6" height="6"/><rect x="26" y="26" width="6" height="6"/><rect x="12" y="36" width="4" height="6"/><rect x="28" y="36" width="4" height="6"/></svg>` },
  { name: "Land", tags: ["property", "plot"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 36c4-2 8-6 14-6s10 8 16 6 6-4 6-4"/><path d="M10 28l4-8 6 5 8-12 10 15"/><circle cx="14" cy="14" r="4"/></svg>` },
  { name: "Commercial", tags: ["property", "office"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="10" width="20" height="32" rx="2"/><rect x="22" y="22" width="20" height="20" rx="2"/><rect x="12" y="16" width="4" height="4"/><rect x="12" y="26" width="4" height="4"/><rect x="28" y="28" width="4" height="4"/><rect x="28" y="36" width="4" height="4" rx="1"/><rect x="36" y="28" width="4" height="4"/></svg>` },
  { name: "Duplex", tags: ["property", "residential"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="10" width="32" height="32" rx="2"/><path d="M8 26h32"/><rect x="14" y="16" width="6" height="5"/><rect x="28" y="16" width="6" height="5"/><rect x="14" y="30" width="6" height="5"/><rect x="28" y="30" width="6" height="5"/></svg>` },

  // ── Rooms & Features ──
  { name: "Bedroom", tags: ["room", "interior"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="18" width="36" height="16" rx="3"/><path d="M10 18v-6a2 2 0 012-2h24a2 2 0 012 2v6"/><path d="M6 34v4M42 34v4"/><path d="M24 18v-4"/></svg>` },
  { name: "Bathroom", tags: ["room", "interior"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 8v16"/><path d="M6 24h36"/><path d="M10 24c0 8 4 14 14 14s14-6 14-14"/><circle cx="10" cy="12" r="2"/><path d="M14 38v4M34 38v4"/></svg>` },
  { name: "Kitchen", tags: ["room", "interior"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="6" width="32" height="36" rx="2"/><path d="M8 20h32"/><circle cx="18" cy="13" r="3"/><circle cx="30" cy="13" r="3"/><rect x="14" y="26" width="20" height="10" rx="2"/><path d="M24 26v10"/></svg>` },
  { name: "Living Room", tags: ["room", "interior"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 20v14a2 2 0 002 2h28a2 2 0 002-2V20"/><path d="M12 20V14a12 12 0 0124 0v6"/><path d="M8 28h32"/><path d="M12 36v4M36 36v4"/></svg>` },
  { name: "Garage", tags: ["room", "parking"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22L24 10l18 12"/><rect x="8" y="22" width="32" height="18" rx="1"/><rect x="14" y="28" width="20" height="12" rx="1"/><path d="M14 34h20"/></svg>` },
  { name: "Terrace", tags: ["outdoor", "feature"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22h36"/><path d="M24 6v16"/><path d="M14 22c0-6 4-10 10-10s10 4 10 10"/><path d="M10 22v20M24 22v20M38 22v20"/><path d="M6 42h36"/></svg>` },
  { name: "Garden", tags: ["outdoor", "feature"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 42V26"/><path d="M24 26c-6-2-12 2-14 8"/><path d="M24 26c6-2 12 2 14 8"/><path d="M24 26c0-8-4-14-8-18"/><path d="M24 26c0-8 4-14 8-18"/><path d="M24 18c-4-2-8 0-10 4"/><path d="M24 18c4-2 8 0 10 4"/><path d="M6 42h36"/></svg>` },
  { name: "Pool", tags: ["outdoor", "amenity"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="14" width="36" height="22" rx="4"/><path d="M6 28c4 3 8-3 12 0s8-3 12 0 8-3 12 0"/><path d="M16 8v6M32 8v6"/><path d="M16 8h16"/></svg>` },
  { name: "Gym", tags: ["amenity", "wellness"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 24h20"/><rect x="6" y="18" width="6" height="12" rx="1"/><rect x="36" y="18" width="6" height="12" rx="1"/><rect x="10" y="16" width="4" height="16" rx="1"/><rect x="34" y="16" width="4" height="16" rx="1"/></svg>` },
  { name: "Spa", tags: ["amenity", "wellness"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6c0 8-8 12-8 20a8 8 0 0016 0c0-8-8-12-8-20"/><path d="M20 30c0-3 4-5 4-8"/><path d="M28 30c0-3-4-5-4-8"/><path d="M12 38c2 2 6 4 12 4s10-2 12-4"/></svg>` },

  // ── Transactions & Services ──
  { name: "For Sale", tags: ["transaction", "listing"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="6" width="32" height="24" rx="2"/><path d="M24 30v12"/><path d="M16 42h16"/><path d="M18 14h12"/><path d="M18 20h8"/></svg>` },
  { name: "For Rent", tags: ["transaction", "listing"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M36 18a12 12 0 10-24 0"/><path d="M24 6v4"/><path d="M24 18l8-6"/><circle cx="24" cy="18" r="2"/><path d="M14 34h20v8H14z"/><path d="M24 34v8"/></svg>` },
  { name: "Sold", tags: ["transaction", "status"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="18"/><path d="M14 24l6 6 14-14" stroke-width="2.5"/></svg>` },
  { name: "Key", tags: ["transaction", "handover"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="30" r="8"/><path d="M22 24l18-18"/><path d="M34 6l6 6"/><path d="M30 10l6 6"/><circle cx="16" cy="30" r="3"/></svg>` },
  { name: "Contract", tags: ["transaction", "legal"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="4" width="28" height="40" rx="2"/><path d="M18 14h12"/><path d="M18 22h12"/><path d="M18 30h8"/><path d="M20 38c2-2 4-2 6 0s4 0 6-2"/></svg>` },
  { name: "Valuation", tags: ["service", "appraisal"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="16"/><path d="M24 14v10l7 7"/><path d="M30 12l2-6M18 12l-2-6"/><path d="M36 18l6-2M12 18l-6-2"/></svg>` },
  { name: "Mortgage", tags: ["finance", "loan"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22L24 8l18 14"/><path d="M10 20v20h28V20"/><path d="M24 26v8"/><path d="M20 30h8"/><circle cx="24" cy="26" r="1"/></svg>` },
  { name: "Investment", tags: ["finance", "roi"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 38l10-12 8 6 10-14 8-6"/><path d="M36 12h6v6"/><path d="M6 42h36"/></svg>` },

  // ── Location & Area ──
  { name: "Location Pin", tags: ["location", "map"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 42S10 28 10 20a14 14 0 0128 0c0 8-14 22-14 22z"/><circle cx="24" cy="20" r="5"/></svg>` },
  { name: "Map", tags: ["location", "area"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 10l12 4v24l-12-4V10z"/><path d="M18 14l12-4v24l-12 4V14z"/><path d="M30 10l12 4v24l-12-4V10z"/></svg>` },
  { name: "Neighborhood", tags: ["location", "community"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 28l8-6 8 6"/><path d="M28 28l8-6 8 6"/><rect x="6" y="28" width="12" height="12"/><rect x="30" y="28" width="12" height="12"/><path d="M16 34l8-6 8 6"/><rect x="18" y="34" width="12" height="8"/></svg>` },
  { name: "Beach", tags: ["location", "lifestyle"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 36c4-2 8 2 12 0s8-2 12 0 8 2 12 0"/><path d="M24 8v22"/><path d="M24 8c-8 2-14 10-14 16h14"/><path d="M24 8c8 2 14 10 14 16H24"/></svg>` },
  { name: "Mountain", tags: ["location", "lifestyle"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 40L20 12l8 14 6-8L44 40H6z"/><path d="M16 28l4-2 4 2"/></svg>` },
  { name: "City", tags: ["location", "urban"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="20" width="10" height="22"/><rect x="19" y="8" width="10" height="34"/><rect x="32" y="16" width="10" height="26"/><rect x="9" y="26" width="3" height="3"/><rect x="22" y="14" width="3" height="3"/><rect x="22" y="22" width="3" height="3"/><rect x="35" y="22" width="3" height="3"/></svg>` },

  // ── Amenities ──
  { name: "Elevator", tags: ["amenity", "building"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="6" width="28" height="36" rx="2"/><path d="M24 6v36"/><path d="M17 18l-3-4-3 4"/><path d="M34 26l3 4 3-4"/><path d="M17 30l-3 4"/><path d="M34 18l3-4"/></svg>` },
  { name: "Parking", tags: ["amenity", "transport"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="32" height="32" rx="4"/><path d="M20 34V14h8a6 6 0 010 12h-8"/></svg>` },
  { name: "Security", tags: ["amenity", "safety"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 4L8 12v12c0 10 7 19 16 22 9-3 16-12 16-22V12L24 4z"/><path d="M18 24l4 4 8-8"/></svg>` },
  { name: "Concierge", tags: ["amenity", "service"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 34h28"/><path d="M24 12a10 10 0 0110 10v12H14V22a10 10 0 0110-10z"/><circle cx="24" cy="10" r="2"/><path d="M10 38h28"/></svg>` },
  { name: "Air Conditioning", tags: ["amenity", "climate"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="10" width="32" height="14" rx="3"/><path d="M14 24v4c0 4 2 6 2 10"/><path d="M24 24v4c0 4-2 6-2 10"/><path d="M34 24v4c0 4 2 6 2 10"/><path d="M12 18h24"/></svg>` },
  { name: "Fireplace", tags: ["amenity", "interior"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="10" width="32" height="28" rx="2"/><rect x="6" y="6" width="36" height="6" rx="1"/><path d="M24 38c-4-4-6-8-6-12 0-6 6-8 6-14 0 6 6 8 6 14 0 4-2 8-6 12z"/></svg>` },
  { name: "Solar Panel", tags: ["amenity", "energy"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 32l8-22h20l8 22H6z"/><path d="M14 10v22M22 10v22M30 10v22"/><path d="M8 18h26M10 26h24"/><circle cx="38" cy="8" r="4"/><path d="M38 2v2M44 8h-2M38 14v-2M32 8h2"/></svg>` },
  { name: "Smart Home", tags: ["amenity", "tech"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22L24 8l18 14"/><path d="M10 20v18a2 2 0 002 2h24a2 2 0 002-2V20"/><circle cx="24" cy="28" r="5"/><path d="M24 23v5l3 2"/></svg>` },
  { name: "Wine Cellar", tags: ["amenity", "luxury"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6h12v10c0 4-2 6-6 8-4-2-6-4-6-8V6z"/><path d="M24 24v14"/><path d="M16 38h16"/><path d="M18 6h12"/></svg>` },

  // ── Measurement & Data ──
  { name: "Floor Plan", tags: ["measurement", "plan"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="36" height="36" rx="2"/><path d="M6 24h18v18"/><path d="M24 6v12h18"/><path d="M6 6h10"/><rect x="30" y="30" width="6" height="8"/></svg>` },
  { name: "Square Meters", tags: ["measurement", "area"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="32" height="32" rx="1"/><path d="M8 14h4M8 24h4M8 34h4"/><path d="M14 40v-4M24 40v-4M34 40v-4"/><path d="M16 18l6 6M28 18l-6 6 6 6"/></svg>` },
  { name: "Energy Rating", tags: ["measurement", "sustainability"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M28 6L16 26h10l-4 16 16-22H26l2-14z" stroke-width="1.5"/></svg>` },
  { name: "360 View", tags: ["media", "virtual"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="18"/><ellipse cx="24" cy="24" rx="18" ry="8"/><path d="M24 6v36"/><path d="M10 12c4 3 9 4 14 4s10-1 14-4"/><path d="M10 36c4-3 9-4 14-4s10 1 14 4"/></svg>` },
  { name: "Photo Camera", tags: ["media", "gallery"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="14" width="40" height="26" rx="3"/><circle cx="24" cy="27" r="8"/><circle cx="24" cy="27" r="4"/><path d="M16 14l2-6h12l2 6"/></svg>` },
  { name: "Video Tour", tags: ["media", "virtual"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="28" height="28" rx="3"/><path d="M32 20l12-6v20l-12-6"/></svg>` },

  // ── People & Agents ──
  { name: "Agent", tags: ["people", "service"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="14" r="8"/><path d="M8 42c0-9 7-16 16-16s16 7 16 16"/><path d="M24 22v6"/><path d="M20 28h8"/></svg>` },
  { name: "Buyer", tags: ["people", "transaction"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="14" r="8"/><path d="M8 42c0-9 7-16 16-16s16 7 16 16"/><path d="M32 34l4 4 6-8"/></svg>` },
  { name: "Open House", tags: ["event", "listing"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22L24 8l18 14"/><path d="M10 20v18h28V20"/><path d="M18 28h12"/><path d="M24 22v12"/></svg>` },
  { name: "Handshake", tags: ["transaction", "deal"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20h8l6 4 8-4 6 4h8"/><path d="M14 24l-4 10h6l4-4 4 4 4-4 4 4h6l-4-10"/><path d="M6 20l4-8M42 20l-4-8"/></svg>` },
  { name: "Favorites", tags: ["ui", "save"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 40S6 28 6 18a10 10 0 0118-6 10 10 0 0118 6c0 10-18 22-18 22z"/></svg>` },
  { name: "Share", tags: ["ui", "social"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="34" cy="10" r="5"/><circle cx="14" cy="24" r="5"/><circle cx="34" cy="38" r="5"/><path d="M18 22l12-8M18 26l12 8"/></svg>` },
  { name: "Compare", tags: ["ui", "tool"], svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="10" width="14" height="28" rx="2"/><rect x="28" y="10" width="14" height="28" rx="2"/><path d="M24 14v20"/><path d="M20 24h8"/></svg>` },
];

const IconsPage = () => {
  const [search, setSearch] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const filtered = ICONS.filter(
    (ic) =>
      ic.name.toLowerCase().includes(search.toLowerCase()) ||
      ic.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const copySvg = (icon: IconDef, idx: number) => {
    navigator.clipboard.writeText(icon.svg);
    setCopiedIdx(idx);
    toast.success(`${icon.name} SVG copied`);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const downloadSvg = (icon: IconDef) => {
    const blob = new Blob([icon.svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${icon.name.toLowerCase().replace(/\s+/g, "-")}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Header */}
      <div className="border-b border-[#e8e4df] bg-white">
        <div className="max-w-[1400px] mx-auto px-6 py-12 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#8b6f47] font-medium mb-3">Icon Library</p>
          <h1 className="text-3xl sm:text-4xl font-extralight tracking-wide text-[#2C2825] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Real Estate Icons
          </h1>
          <p className="text-[14px] font-light text-[#8a8580] mb-8">
            {ICONS.length} custom SVG icons · Click to copy · Stroke-based · 48×48 viewBox
          </p>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search icons…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 text-[14px] font-light border border-[#e8e4df] rounded-sm bg-white text-[#2C2825] placeholder:text-[#b0aaa3] focus:outline-none focus:border-[#8b6f47] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <p className="text-[12px] tracking-[0.15em] uppercase text-[#b0aaa3] font-medium mb-6">
          {filtered.length} icon{filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
          {filtered.map((icon, i) => (
            <div
              key={icon.name}
              className="group relative flex flex-col items-center gap-3 p-4 rounded-sm border border-transparent hover:border-[#e8e4df] hover:bg-white cursor-pointer transition-all"
              onClick={() => copySvg(icon, i)}
            >
              <div
                className="w-10 h-10 text-[#2C2825] transition-colors group-hover:text-[#8b6f47]"
                dangerouslySetInnerHTML={{ __html: icon.svg }}
              />
              <span className="text-[10px] tracking-[0.08em] text-center leading-tight text-[#8a8580] group-hover:text-[#2C2825] transition-colors">
                {icon.name}
              </span>
              {copiedIdx === i && (
                <span className="absolute top-1 right-1 text-[8px] tracking-wider uppercase text-[#8b6f47] font-medium">
                  Copied
                </span>
              )}
              {/* Download button */}
              <button
                onClick={(e) => { e.stopPropagation(); downloadSvg(icon); }}
                className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity text-[#b0aaa3] hover:text-[#8b6f47]"
                title="Download SVG"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                  <path d="M8 2v9M5 8l3 3 3-3M3 13h10" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[14px] font-light text-[#b0aaa3]">No icons match "{search}"</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#e8e4df] bg-white">
        <div className="max-w-[1400px] mx-auto px-6 py-8 text-center">
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#b0aaa3]">
            All icons are stroke-based · 48×48 viewBox · stroke-width 1.5 · MIT license
          </p>
        </div>
      </div>
    </div>
  );
};

export default IconsPage;
