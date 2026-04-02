# DEVELOPER AVAILABILITY EMAIL — Implementation Guide

> **Purpose**: Confirmation email sent to the client after they submit an enquiry
> about a new development / promotion. Shows the project they enquired about
> with current unit availability, key-ready status, and construction progress.

---

## Overview

| Item | Value |
|------|-------|
| Route | `/email-developer` |
| File | `src/components/blocks/email/DeveloperAvailabilityEmail.tsx` |
| Trigger | Client submits enquiry about a new development (from detail page, listing card, or brochure request) |
| Variants | `?variant=standard` (under construction) · `?variant=key-ready` (delivered / key-ready units) |

---

## 1. When it's sent

After a client submits an enquiry form related to a **new development project**
(not a resale property). The email confirms receipt of their enquiry and
provides the current availability so the client has immediate, useful
information while they wait for advisor contact.

### Trigger points
- **NewDevelopmentDetailPage** — enquiry modal or visit modal
- **NewDevListingCard** — inline enquiry
- **BrochureCTA** — brochure download request
- **ProjectPriceSidebar** — "Enquire" or "Schedule Visit" buttons

---

## 2. Variants

| Variant | Query param | Description |
|---------|-------------|-------------|
| Under Construction | `?variant=standard` | Project still being built; shows construction progress bar |
| Key Ready | `?variant=key-ready` | Project delivered or nearly complete; highlights key-ready units in amber |

---

## 3. Data Model

### `UnitRow`

```ts
interface UnitRow {
  ref: string;            // "MAR-A01"
  type: string;           // "2-Bed Apartment", "3-Bed Penthouse"
  sqm: number;            // 105
  price: string;          // "€485,000"
  status: "available" | "key-ready" | "reserved" | "last-units";
  floor?: string;         // "1st", "GF"
  terrace?: number;       // terrace m² (optional)
}
```

### `DeveloperAvailabilityData`

```ts
interface DeveloperAvailabilityData {
  // Project info
  projectName: string;           // "Marea Residences"
  projectLocation: string;       // "Altea, Costa Blanca"
  projectImage: string;          // Full URL to hero image
  developerName: string;         // "Grupo Prasa"
  completionDate?: string;       // "Q2 2027" or "Delivered"
  constructionPercent?: number;  // 0–100

  // Availability
  totalUnits?: number;
  availableUnits?: number;
  keyReadyUnits?: number;

  // Unit list
  units: UnitRow[];

  // Project highlights
  highlights?: string[];         // ["Sea Views", "Infinity Pool", ...]

  // Recipient
  recipientName?: string;        // Client's first name

  // CTAs
  ctaText?: string;              // Default: "View Project"
  ctaHref?: string;              // Link to project detail page

  // Advisor contact
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}
```

---

## 4. Visual Structure (800px max-width)

### A — Dark Header (ONLY dark section)

The header is the **only dark element** in the entire email, keeping the
design light and modern.

1. **Logo** — centered, "PRESTIGE" (18px, weight 300, letter-spacing 0.42em)
   + "REAL ESTATE" subtitle (8px, 50% opacity)
2. **Background**: `hsl(24 8% 11%)`
3. **Padding**: 30px 42px 22px

### B — Hero Image

- Full-width project photograph
- **Height**: 300px desktop, 200px mobile
- **Object-fit**: cover
- **No overlay** — image is clean, no dark gradient or text on top

### C — Project Info Bar (Light)

- **Background**: white (`hsl(0 0% 100%)`)
- **Border-bottom**: 1px solid `hsl(28 18% 88%)`
- **Left**: Project name (22px, weight 400) + location with 📍 + developer name
- **Right**: Delivery date label + value (15px, weight 500)

### D — Stats Ribbon (Light)

Horizontal row of key stats on white background with light borders.

| Stat | Color | Condition |
|------|-------|-----------|
| Total Units | Dark text | Always shown if `totalUnits` provided |
| Available | Green (`hsl(145 45% 38%)`) | Always shown |
| Key Ready | Amber (`hsl(38 92% 50%)`) | Only if `keyReadyUnits > 0` |
| Built % | Dark text | Only if `constructionPercent` provided |

- **Layout**: flexbox row, equal cells
- **Mobile (≤480px)**: wraps to 2×2 grid (`flex: 1 1 45%`)

### E — White Content Body

1. **Greeting** — "Thank you, {recipientName}" (22px, weight 300)
   - Tone: warm confirmation, NOT a cold business update
2. **Intro paragraph** — confirms enquiry receipt, mentions project name and location,
   highlights key-ready count if applicable, ends with "An advisor will be in touch shortly"
3. **Construction progress** (if `constructionPercent < 100`):
   - Section title: "CONSTRUCTION PROGRESS" (11px, uppercase, 0.14em spacing)
   - 6px progress bar (accent gold fill on light track)
   - Label: "{X}% complete · Est. delivery {date}"
4. **Project Highlights** — flex-wrap row of pill badges
   - Background: `hsl(35 28% 92%)`, color: dark text, 6px 14px padding
5. **Available Units** — section title + responsive table/cards

#### Units — Desktop (table)

| Column | Style |
|--------|-------|
| Ref | 12px, weight 600, muted color |
| Type | 13px, dark text |
| Size | 13px, includes terrace if present |
| Floor | 13px |
| Price | 13px, weight 600 |
| Status | StatusBadge component |

- Key-ready rows get amber background (`hsl(40 100% 95%)`)
- Table header: 10px uppercase, 2px bottom border
- Row borders: 1px light

#### Units — Mobile (cards)

- Card layout with ref + badge on top row, type + specs left, price right
- Compact: 12px padding, 8px margin between cards
- Key-ready cards get amber background

#### Status Badge Colors

| Status | Background | Text Color | Label |
|--------|-----------|------------|-------|
| Available | `hsl(145 40% 95%)` | `hsl(145 45% 38%)` | "Available" |
| Key Ready | `hsl(40 100% 95%)` | `hsl(38 70% 38%)` | "✦ Key Ready" |
| Reserved | `hsl(0 40% 96%)` | `hsl(0 55% 48%)` | "Reserved" |
| Last Units | `hsl(260 40% 96%)` | `hsl(260 50% 48%)` | "Last Units" |

6. **CTA Buttons** — centered
   - Primary: "View Project" (gold bg, white text, 14px 44px padding)
   - Secondary: "Contact Advisor" (gold outline, transparent bg)
7. **Advisor contact box** — left gold border (3px), light bg, contains:
   - "YOUR ADVISOR" label (10px uppercase)
   - Name (13px, weight 500)
   - Phone with 📞 emoji
   - Email with ✉ emoji
8. **Security note** — "If you didn't submit this enquiry…" (11px, centered, light color)

### F — Footer

- **Background**: `hsl(32 20% 96%)`
- Company name + city
- Copyright line
- Font: 11px, light color

---

## 5. Design Tokens

```
Accent:        hsl(35 32% 41%)     — CTA buttons, progress bar, contact border
Accent light:  hsl(35 28% 92%)     — highlight pills background
Dark:          hsl(24 8% 11%)      — header background ONLY
Dark text:     hsl(24 6% 18%)      — body text, greeting, project name, prices
Muted:         hsl(25 5% 49%)      — labels, section titles, intro text, refs
Light:         hsl(25 5% 67%)      — footer text, security note
Background:    hsl(32 20% 96%)     — body bg, footer, advisor box bg
White:         hsl(0 0% 100%)      — content body, info bar, stats ribbon, button text
Border:        hsl(28 18% 88%)     — info bar border, stats borders, table header
Border light:  hsl(28 18% 93%)     — progress track, table row borders, card borders
Green:         hsl(145 45% 38%)    — "Available" badge text, available count
Green bg:      hsl(145 40% 95%)    — "Available" badge background
Amber:         hsl(38 92% 50%)     — "Key Ready" count in stats
Amber bg:      hsl(40 100% 95%)    — "Key Ready" badge bg, key-ready table rows
Red:           hsl(0 55% 48%)      — "Reserved" badge text
Red bg:        hsl(0 40% 96%)      — "Reserved" badge background
Purple:        hsl(260 50% 48%)    — "Last Units" badge text
Purple bg:     hsl(260 40% 96%)    — "Last Units" badge background
Font:          'Jost', 'Helvetica Neue', Helvetica, Arial, sans-serif
```

---

## 6. Responsive Behavior (≤480px)

| Element | Change |
|---------|--------|
| Hero image | Height: 200px |
| Info bar | Padding: 14px 18px |
| Stats ribbon | Flex-wrap 2×2 grid (flex: 1 1 45%) |
| Content | Padding: 20px 18px |
| Greeting | Font-size: 19px |
| Intro | Font-size: 13px |
| Units table | Hidden → replaced by cards |
| Unit cards | 12px 14px padding, 8px gap |
| CTA buttons | Stack vertically, full-width |
| Contact box | Padding: 14px 16px |
| Footer | Padding: 18px |

---

## 7. CTA Link Targets

| Button | Target |
|--------|--------|
| "View Project" | New development detail page (`/new-developments/:slug`) |
| "Contact Advisor" | Contact page or advisor direct profile |

---

## 8. Subject Line Suggestions

```ts
const SUBJECTS = {
  standard: "Your enquiry: {projectName} — Current availability",
  "key-ready": "Your enquiry: {projectName} — Key-ready units available",
};
```

---

## 9. Implementation Notes

### For the real email system (Edge Functions)

1. Template uses `@react-email/components` (Html, Head, Body, Container, Text, Button, Img, etc.)
2. All styles are inline objects (same as the preview component)
3. The preview page (`/email-developer`) serves as the pixel-perfect visual reference
4. Media queries are injected via `<style>` tag for responsive behavior

### Data flow

```
Client submits form → supabase.functions.invoke('send-transactional-email', {
  body: {
    templateName: 'developer-availability',
    recipientEmail: formData.email,
    idempotencyKey: `dev-availability-${submissionId}`,
    templateData: { ...DeveloperAvailabilityData }
  }
})
```

### Key design decisions

1. **Only the logo header is dark** — the rest of the email is light/white for a clean,
   modern, non-heavy feel
2. **Confirmation tone** — this is a post-enquiry email, not a marketing blast;
   the greeting says "Thank you" and mentions "an advisor will be in touch"
3. **Key-ready highlighting** — units with `status: "key-ready"` get an amber
   background in both the table and card views, making them visually prominent
4. **Construction progress** — only shown when `constructionPercent < 100`
   (hidden for delivered projects)
5. **No "Download Price List"** — CTA is "View Project" to drive traffic
   back to the website

### Logo

Replace the text-only "PRESTIGE / REAL ESTATE" header with an `<Img>` component
pointing to the uploaded brand logo when deploying to production.

---

## 10. File Inventory

| File | Lines | Purpose |
|------|-------|---------|
| `src/components/blocks/email/DeveloperAvailabilityEmail.tsx` | ~526 | Email template + preview page |

### Route (App.tsx)

```tsx
<Route path="/email-developer" element={<DeveloperAvailabilityPreviewPage />} />
```
