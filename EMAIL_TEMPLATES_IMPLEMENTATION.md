# EMAIL TEMPLATES — Implementation Guide

> **Purpose**: Document all email templates used on the website so they can be
> replicated in the real transactional email system (Edge Functions / email API).
> Each template is previewed as a standalone React page during development.

---

## Overview

| Template | Route | File | Trigger |
|----------|-------|------|---------|
| Off-Market Confirmation | `/email-offmarket` | `src/components/blocks/offmarket/OffmarketEmailTemplate.tsx` | User submits the off-market sell/buy wizard |
| Enquiry Confirmation | `/email-enquiry` | `src/components/blocks/email/EnquiryConfirmationEmail.tsx` | User submits a property enquiry (visit, info, offer, general) |
| Price Alert | `/email-alert` | `src/components/blocks/email/PriceAlertEmail.tsx` | Property on user's watchlist changes price or is withdrawn |
| Newsletter Welcome | *(planned)* | — | User subscribes to newsletter |

---

## 1. Off-Market Confirmation Email

### When it's sent
After a user completes the **OffmarketWizardModal** (sell or buy flow).

### Variants
| Variant | Query | Description |
|---------|-------|-------------|
| Sell | `?flow=sell` | Property owner requesting private sale |
| Buy | `?flow=buy` | Buyer requesting off-market access |

### Data model (`EmailData`)

```ts
interface EmailData {
  flow: "sell" | "buy";
  // Sell-specific
  ownerType?: string;        // "owner" | "authorized"
  otherAgencies?: string;    // "yes" | "no"
  location?: string;
  price?: string;
  // Buy-specific
  priceMin?: string;
  priceMax?: string;
  timeline?: string;         // "immediate" | "3months" | "6months" | "12months" | "flexible"
  // Shared
  fullName?: string;
  phone?: string;
  email?: string;
  language?: string;         // "es" | "en" | "de" | "fr" | "it" | "pt" | "ru" | "zh"
}
```

### Visual structure (680px max-width)
1. **Hero band** — dark background (`#1E1C1A`), centered eye-off icon, "Off-Market" label in gold (`#C9A96E`)
2. **Content** — greeting, intro paragraph, summary table (sell or buy fields), divider, contact details table, note
3. **Footer** — copyright + confidentiality line

### Design tokens
- Background: `#1E1C1A` (hero), `#FFFFFF` (content), `#f5f5f4` (body)
- Accent: `#C9A96E` (gold)
- Font: `Helvetica Neue, Helvetica, Arial, sans-serif`
- All styles are inline (email-client safe)

---

## 2. Enquiry Confirmation Email

### When it's sent
After a user submits any property enquiry form: from the **DetailEnquiryModal**, the **ListingOffMarketCard** modal, or the **DetailContactForm**.

### Variants
| Variant | Query | Description |
|---------|-------|-------------|
| Visit Request | `?type=visit` | User wants to schedule a property viewing |
| Info Request | `?type=info` | User requests more information |
| General Enquiry | `?type=general` | General contact (no specific property image) |

### Data model (`EnquiryEmailData`)

```ts
interface EnquiryEmailData {
  // Lead info
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;

  // Property info (optional — general enquiries may not have these)
  propertyTitle?: string;
  propertyLocation?: string;
  propertyPrice?: string;
  propertyRef?: string;
  propertyImage?: string;       // Full URL to property hero image
  propertySpecs?: {
    beds?: number;
    baths?: number;
    sqm?: number;
  };

  // Meta
  enquiryType?: "visit" | "info" | "offer" | "general";
}
```

### Visual structure (800px max-width)

#### A — Dark header (`hsl(24 8% 11%)`)
1. **Logo** — centered, "PRESTIGE" + "REAL ESTATE" subtitle
2. **Property image** — full-width, 360px height desktop / 220px mobile, clean (no overlay)
3. **Property info bar** — slightly lighter dark (`hsl(24 6% 14%)`), contains:
   - REF badge (gold accent `hsl(35 32% 41%)`)
   - Title + Price in same row (stacks on mobile)
   - Location + specs (beds, baths, m²)

#### B — White content body (`hsl(0 0% 100%)`)
1. **Greeting** — "Thank you, {fullName}" (font-size 22px, fontWeight 300)
2. **Intro paragraph** — describes the request type and property
3. **Enquiry summary table** — request type, property, location, reference
4. **Message quote** (if present) — italic, left gold border, bg `hsl(32 20% 96%)`
5. **Contact details table** — name, email, phone
6. **Note** — "reply to correct details"
7. **CTA button** — "View Property", gold background, white text, centered

#### C — Footer (`hsl(32 20% 96%)`)
- Phone + email
- City
- Copyright

### Design tokens

```
Accent:       hsl(35 32% 41%)     — buttons, REF badge, message border
Dark:         hsl(24 8% 11%)      — header background
Dark soft:    hsl(24 6% 14%)      — property info bar
Dark text:    hsl(24 6% 18%)      — body text
Muted:        hsl(25 5% 49%)      — labels, section titles
Light:        hsl(25 5% 67%)      — footer text
Background:   hsl(32 20% 96%)     — body bg, message box bg
White:        hsl(0 0% 100%)      — content body, button text
Border:       hsl(28 18% 88%)     — dividers
Border light: hsl(28 18% 93%)     — table row borders
Font:         'Jost', 'Helvetica Neue', Helvetica, Arial, sans-serif
```

### Responsive behavior (≤480px)
- Logo padding reduced (24px 20px)
- Image height: 220px
- Title and price stack vertically
- Content padding reduced (24px 20px)
- Font sizes scaled down ~2px across all elements
- CTA button slightly smaller padding

### Enquiry type labels (for the summary table)

```ts
const ENQUIRY_LABELS = {
  visit: "Schedule a Visit",
  info: "Request Information",
  offer: "Make an Offer",
  general: "General Enquiry",
};
```

---

## 3. Price Alert Email

### When it's sent
When a property on the user's watchlist undergoes a **price change** or is **withdrawn** from the market. Triggered by the price-alert subscription system.

### Variants
| Variant | Query | Description |
|---------|-------|-------------|
| Price Drop | `?variant=price-drop` | Property asking price has been reduced |
| Withdrawn | `?variant=withdrawn` | Property has been removed from the market |

### Data model (`PriceAlertEmailData`)

```ts
interface PriceAlertEmailData {
  variant: "price-drop" | "withdrawn";
  fullName?: string;
  propertyTitle?: string;
  propertyLocation?: string;
  propertyRef?: string;
  propertyImage?: string;        // Full URL to property image
  propertySpecs?: {
    beds?: number;
    baths?: number;
    sqm?: number;
  };
  // Price-drop specific
  previousPrice?: string;        // e.g. "€1.400.000"
  newPrice?: string;             // e.g. "€1.200.000"
  dropPercent?: string;          // e.g. "14%"
  // Withdrawn specific
  lastKnownPrice?: string;       // e.g. "€2.800.000"
}
```

### Visual structure (800px max-width)

> **Key difference from other emails:** No large hero image. The property is
> shown as a **compact inline card** (image + data side by side) inside the
> white content body, keeping the email lightweight and scannable.

#### A — Dark header (`hsl(24 8% 11%)`)
1. **Logo** — centered, "PRESTIGE" + "REAL ESTATE" subtitle (identical to enquiry email)

#### B — White content body (`hsl(0 0% 100%)`)
1. **Variant badge** — pill-shaped label:
   - Price Drop → green bg (`hsl(145 40% 95%)`), green text (`hsl(145 45% 38%)`), "▼ Price Drop"
   - Withdrawn → red bg (`hsl(0 40% 96%)`), red text (`hsl(0 55% 48%)`), "● Withdrawn"
2. **Greeting** — personalized (e.g. "Great news, James" or "Dear María")
3. **Intro paragraph** — contextual copy per variant
4. **Compact property card** — flex row layout:
   - Left: property image (180px wide, cover)
   - Right: REF badge, title, location with 📍, specs (beds 🛏, baths 🚿, m²), price row
   - Price row behavior per variant:
     - **Price Drop:** new price (green, bold 18px) + old price (strikethrough) + drop % badge
     - **Withdrawn:** last price (strikethrough, muted) + "No longer available" label (red)
5. **Info box** — left gold border (`hsl(35 32% 41%)`), light bg, contextual advisory text
6. **Divider** — 1px border
7. **CTA buttons** — centered:
   - Price Drop: "View Property" (gold bg) + "Contact Advisor" (gold outline)
   - Withdrawn: "View Similar Properties" (gold bg) + "Contact Advisor" (gold outline)
8. **Note** — subscription reminder + "Manage your alerts" link

#### C — Footer (`hsl(32 20% 96%)`)
- Phone + email
- City
- Copyright

### Design tokens

```
Accent:       hsl(35 32% 41%)     — CTA buttons, info box border
Dark:         hsl(24 8% 11%)      — header background
Dark text:    hsl(24 6% 18%)      — greeting, card title, info box text
Muted:        hsl(25 5% 49%)      — labels, REF badge, note text
Light:        hsl(25 5% 67%)      — specs, footer text, old price
Background:   hsl(32 20% 96%)     — body bg, footer, info box bg
White:        hsl(0 0% 100%)      — content body, button text
Border:       hsl(28 18% 88%)     — card border, divider
Green:        hsl(145 45% 38%)    — price-drop badge text, new price
Green bg:     hsl(145 40% 95%)    — price-drop badge background
Red:          hsl(0 55% 48%)      — withdrawn badge text, status label
Red bg:       hsl(0 40% 96%)      — withdrawn badge background
Font:         'Jost', 'Helvetica Neue', Helvetica, Arial, sans-serif
```

### Responsive behavior (≤480px)
- Header padding reduced (24px 20px)
- Property card stacks vertically (`flex-direction: column`)
- Card image becomes full-width, 180px height
- Card body padding reduced (14px 16px)
- Greeting font: 19px, intro font: 12px
- "Contact Advisor" button becomes `display: block` and centers below primary CTA
- Footer padding reduced (18px 20px)

### CTA link targets
| Variant | Primary CTA | Target |
|---------|-------------|--------|
| Price Drop | "View Property" | Property detail page |
| Withdrawn | "View Similar Properties" | Listing page (filtered by area/type) |
| Both | "Contact Advisor" | Contact page or advisor direct link |

### Subject line suggestions
```ts
const SUBJECTS = {
  "price-drop": "Price drop: {propertyTitle} is now {newPrice}",
  withdrawn: "Update: {propertyTitle} has been withdrawn",
};
```

---

## 4. Newsletter Email Templates

### When they're sent
Sent periodically to subscribers. Two variants cover the main newsletter use cases.

### Variants
| Variant | Query | Description |
|---------|-------|-------------|
| Blog / News Digest | `?variant=blog` | Monthly editorial digest with featured + secondary articles |
| Featured Property | `?variant=property` | Spotlight on a single handpicked property |

### Data model — Blog Digest (`NewsletterBlogData`)

```ts
interface BlogArticle {
  image: string;
  category: string;
  title: string;
  excerpt?: string;
  href?: string;
  readTime?: string;
}

interface NewsletterBlogData {
  variant: "blog";
  fullName?: string;
  issueNumber?: string;
  issueDate?: string;
  editorialIntro?: string;
  featuredArticle: BlogArticle;
  articles: BlogArticle[];
  ctaText?: string;
  ctaHref?: string;
}
```

### Data model — Featured Property (`NewsletterPropertyData`)

```ts
interface NewsletterPropertyData {
  variant: "property";
  fullName?: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyPrice: string;
  propertyRef?: string;
  propertyImage: string;
  propertySpecs?: { beds?: number; baths?: number; sqm?: number };
  propertyDescription?: string;
  highlights?: string[];
  ctaText?: string;
  ctaHref?: string;
  agentName?: string;
  agentTitle?: string;
}
```

### Visual structure — Blog Digest (800px max-width)

#### A — Dark header (`hsl(24 8% 11%)`)
1. **Logo** — centered, "PRESTIGE" + "REAL ESTATE"
2. **Issue bar** — slightly lighter dark, "The Journal · Nº X" left + date right

#### B — White content body
1. **Greeting** — personalized
2. **Editorial intro** — curated summary paragraph
3. **Featured story card** — full-width image (280px), category label (gold), title, excerpt, "Read Article →"
4. **Secondary articles** — compact rows: thumbnail (120×84) + category + title + read time
5. **CTA button** — "Explore The Journal" (gold)
6. **Manage preferences / Unsubscribe** links

#### C — Footer (same as other emails)

### Visual structure — Featured Property (800px max-width)

#### A — Dark header + Property hero
1. **Logo** — centered
2. **Property image** — full-width, 340px height
3. **Property info bar** — REF badge, title + price row, location + specs

#### B — White content body
1. **Greeting** — "Exclusively for you, {name}"
2. **About this property** — description paragraph
3. **Key highlights** — pill badges (light gold bg)
4. **Agent info** — avatar initial + name + title, gold left border
5. **CTA buttons** — "View Full Details" (gold) + "Schedule a Visit" (outline)
6. **Manage preferences / Unsubscribe** links

#### C — Footer

### Design tokens
Same as enquiry and price-alert emails plus:
```
Accent light:  hsl(35 28% 92%)    — highlight pills background
```

### Responsive behavior (≤480px)
- Featured image: 200px height (blog), 220px (property)
- Article rows stack vertically, thumbnails become full-width
- Property title/price stack vertically
- CTA buttons stack centered
- Padding and font sizes reduced proportionally

---

## 5. Newsletter Welcome Email *(planned)*

To be created following the same design language. Will confirm subscription
and include preference management link.

---

## Implementation Notes

### For the real email system (Edge Functions)

1. **Templates are React Email components** in `supabase/functions/_shared/transactional-email-templates/`
2. Each template exports a `component` and `subject`
3. Templates use `@react-email/components` (Html, Head, Body, Container, Text, Button, Img, etc.)
4. All styles must be inline objects (same as the preview components)
5. The preview pages (`/email-offmarket`, `/email-enquiry`, `/email-alert`, `/email-newsletter`) serve as the visual reference — the Edge Function templates should match pixel-for-pixel

### Data flow

```
User submits form → supabase.functions.invoke('send-transactional-email', {
  body: {
    templateName: 'enquiry-confirmation',   // or 'offmarket-confirmation' or 'price-alert' or 'newsletter-blog' or 'newsletter-property'
    recipientEmail: formData.email,
    idempotencyKey: `enquiry-${submissionId}`,
    templateData: { ...EmailData }
  }
})
```

### CTA links
- **Enquiry email** → "View Property" links to the property detail page
- **Off-Market email** → No CTA (confidential, advisor-driven)
- **Price Alert (price-drop)** → "View Property" links to the property detail page
- **Price Alert (withdrawn)** → "View Similar Properties" links to listings filtered by area
- **Newsletter (blog)** → "Explore The Journal" links to the blog listing page
- **Newsletter (property)** → "View Full Details" links to property detail page

### Logo
When implementing in production, upload the brand logo to storage and include
it as an `<Img>` component at the top of each template, replacing the text-only
"PRESTIGE / REAL ESTATE" header.

---

## File inventory

| File | Lines | Purpose |
|------|-------|---------|
| `src/components/blocks/offmarket/OffmarketEmailTemplate.tsx` | ~292 | Off-market email + preview page |
| `src/components/blocks/email/EnquiryConfirmationEmail.tsx` | ~440 | Enquiry email + preview page |
| `src/components/blocks/email/PriceAlertEmail.tsx` | ~446 | Price alert email (price-drop & withdrawn) + preview page |
| `src/components/blocks/email/NewsletterEmail.tsx` | ~520 | Newsletter email (blog digest & featured property) + preview page |

### Routes (App.tsx)

```tsx
<Route path="/email-offmarket" element={<OffmarketEmailPreviewPage />} />
<Route path="/email-enquiry" element={<EnquiryEmailPreviewPage />} />
<Route path="/email-alert" element={<PriceAlertEmailPreviewPage />} />
<Route path="/email-newsletter" element={<NewsletterEmailPreviewPage />} />
```
