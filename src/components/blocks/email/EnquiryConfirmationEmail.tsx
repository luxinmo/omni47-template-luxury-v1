/**
 * ENQUIRY CONFIRMATION EMAIL TEMPLATE
 * Sent to the lead after they submit a property enquiry.
 * Uses inline styles only (email-client compatible, no Tailwind).
 * Renders as a preview page or can be converted to HTML for sending.
 */

import { useSearchParams } from "react-router-dom";

/* ── Data interface ── */
interface EnquiryEmailData {
  /** Lead info */
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  /** Property info */
  propertyTitle?: string;
  propertyLocation?: string;
  propertyPrice?: string;
  propertyRef?: string;
  propertyImage?: string;
  propertySpecs?: { beds?: number; baths?: number; sqm?: number };
  /** Meta */
  enquiryType?: "visit" | "info" | "offer" | "general";
}

const ENQUIRY_LABELS: Record<string, string> = {
  visit: "Schedule a Visit",
  info: "Request Information",
  offer: "Make an Offer",
  general: "General Enquiry",
};

/* ── Brand constants (mirroring template.ts) ── */
const BRAND = {
  name: "PRESTIGE",
  subtitle: "REAL ESTATE",
  email: "hello@prestigeestates.com",
  phone: "+34 600 000 000",
  city: "Marbella, Spain",
  accent: "#8B6F47",
  accentDark: "#6E5636",
  dark: "#2D2926",
  muted: "#6B6560",
  light: "#9A938B",
  bg: "#FAF8F5",
  bgAlt: "#F0ECE6",
  border: "#E2DCD4",
  white: "#FFFFFF",
};

/* ── Inline styles (email-safe) ── */
const s = {
  body: {
    margin: 0, padding: 0,
    backgroundColor: BRAND.bg,
    fontFamily: "'Jost', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    WebkitTextSizeAdjust: "100%" as const,
  } as React.CSSProperties,
  wrapper: {
    maxWidth: 640, margin: "0 auto", padding: "32px 16px",
  } as React.CSSProperties,
  card: {
    backgroundColor: BRAND.white,
    borderRadius: 2,
    overflow: "hidden" as const,
    border: `1px solid ${BRAND.border}`,
  } as React.CSSProperties,

  /* ── Header / Logo ── */
  header: {
    padding: "28px 32px",
    borderBottom: `1px solid ${BRAND.border}`,
    textAlign: "center" as const,
  } as React.CSSProperties,
  logoName: {
    fontSize: 20, fontWeight: 300, letterSpacing: "0.35em",
    color: BRAND.dark, margin: 0, textTransform: "uppercase" as const,
  } as React.CSSProperties,
  logoSub: {
    fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase" as const,
    color: BRAND.accent, margin: "2px 0 0", fontWeight: 400,
  } as React.CSSProperties,

  /* ── Property hero ── */
  propertyImage: {
    width: "100%", height: 260, objectFit: "cover" as const,
    display: "block",
  } as React.CSSProperties,
  propertyOverlay: {
    backgroundColor: BRAND.dark,
    padding: "16px 24px",
    display: "flex", justifyContent: "space-between", alignItems: "center",
  } as React.CSSProperties,
  propertyTitle: {
    fontSize: 15, fontWeight: 400, color: BRAND.white,
    margin: 0, letterSpacing: "0.03em",
  } as React.CSSProperties,
  propertyPrice: {
    fontSize: 15, fontWeight: 500, color: BRAND.accent,
    margin: 0, letterSpacing: "0.02em",
  } as React.CSSProperties,
  propertyMeta: {
    padding: "12px 24px",
    backgroundColor: BRAND.bgAlt,
    display: "flex", gap: 20,
    borderBottom: `1px solid ${BRAND.border}`,
  } as React.CSSProperties,
  metaItem: {
    fontSize: 12, color: BRAND.muted, fontWeight: 400,
  } as React.CSSProperties,

  /* ── Content ── */
  content: {
    padding: "28px 32px 36px",
  } as React.CSSProperties,
  greeting: {
    fontSize: 20, fontWeight: 300, color: BRAND.dark,
    margin: "0 0 6px", letterSpacing: "0.02em",
  } as React.CSSProperties,
  intro: {
    fontSize: 14, color: BRAND.muted, fontWeight: 300,
    margin: "0 0 24px", lineHeight: 1.65,
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" as const,
    color: BRAND.light, margin: "0 0 12px", fontWeight: 500,
  } as React.CSSProperties,
  table: {
    width: "100%", borderCollapse: "collapse" as const,
    marginBottom: 24,
  } as React.CSSProperties,
  rowEven: { backgroundColor: BRAND.bg } as React.CSSProperties,
  rowOdd: { backgroundColor: BRAND.white } as React.CSSProperties,
  cellLabel: {
    padding: "10px 16px", fontSize: 12, color: BRAND.light,
    fontWeight: 400, width: "38%", verticalAlign: "top" as const,
    borderBottom: `1px solid ${BRAND.bg}`,
  } as React.CSSProperties,
  cellValue: {
    padding: "10px 16px", fontSize: 13, color: BRAND.dark,
    fontWeight: 400, verticalAlign: "top" as const,
    borderBottom: `1px solid ${BRAND.bg}`,
  } as React.CSSProperties,
  divider: {
    border: "none", borderTop: `1px solid ${BRAND.border}`,
    margin: "0 0 24px",
  } as React.CSSProperties,
  note: {
    fontSize: 13, color: BRAND.muted, lineHeight: 1.65,
    margin: "0 0 24px", fontWeight: 300,
  } as React.CSSProperties,
  cta: {
    display: "inline-block",
    backgroundColor: BRAND.accent, color: BRAND.white,
    fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" as const,
    fontWeight: 500, padding: "13px 28px", borderRadius: 2,
    textDecoration: "none", marginTop: 4,
  } as React.CSSProperties,

  /* ── Ref badge ── */
  refBadge: {
    display: "inline-block",
    fontSize: 10, letterSpacing: "0.15em", color: BRAND.light,
    border: `1px solid ${BRAND.border}`, borderRadius: 2,
    padding: "4px 10px", marginBottom: 16, textTransform: "uppercase" as const,
  } as React.CSSProperties,

  /* ── Footer ── */
  footer: {
    padding: "20px 32px",
    borderTop: `1px solid ${BRAND.border}`,
    textAlign: "center" as const,
  } as React.CSSProperties,
  footerText: {
    fontSize: 11, color: BRAND.light, margin: "0 0 3px",
    letterSpacing: "0.04em",
  } as React.CSSProperties,
  footerLink: {
    fontSize: 11, color: BRAND.accent, textDecoration: "none",
    letterSpacing: "0.04em",
  } as React.CSSProperties,
};

/* ── Row helper ── */
function Row({ label, value, even }: { label: string; value?: string; even: boolean }) {
  if (!value) return null;
  return (
    <tr style={even ? s.rowEven : s.rowOdd}>
      <td style={s.cellLabel}>{label}</td>
      <td style={s.cellValue}>{value}</td>
    </tr>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN TEMPLATE COMPONENT
   ═══════════════════════════════════════════════════ */
export function EnquiryConfirmationEmail({ data }: { data: EnquiryEmailData }) {
  const specs = data.propertySpecs;

  return (
    <div style={s.body}>
      <div style={s.wrapper}>
        <div style={s.card}>

          {/* ── Brand header ── */}
          <div style={s.header}>
            <p style={s.logoName}>{BRAND.name}</p>
            <p style={s.logoSub}>{BRAND.subtitle}</p>
          </div>

          {/* ── Property hero ── */}
          {data.propertyImage && (
            <>
              <img src={data.propertyImage} alt={data.propertyTitle || "Property"} style={s.propertyImage} />
              <div style={s.propertyOverlay}>
                <p style={s.propertyTitle}>{data.propertyTitle}</p>
                <p style={s.propertyPrice}>{data.propertyPrice || "Price on request"}</p>
              </div>
              {specs && (
                <div style={s.propertyMeta}>
                  {data.propertyLocation && <span style={s.metaItem}>📍 {data.propertyLocation}</span>}
                  {specs.beds && <span style={s.metaItem}>{specs.beds} Beds</span>}
                  {specs.baths && <span style={s.metaItem}>{specs.baths} Baths</span>}
                  {specs.sqm && <span style={s.metaItem}>{specs.sqm} m²</span>}
                </div>
              )}
            </>
          )}

          {/* ── Content ── */}
          <div style={s.content}>

            {data.propertyRef && (
              <span style={s.refBadge}>REF {data.propertyRef}</span>
            )}

            <h1 style={s.greeting}>
              {data.fullName ? `Thank you, ${data.fullName}` : "Thank you for your enquiry"}
            </h1>
            <p style={s.intro}>
              We've received your {data.enquiryType ? ENQUIRY_LABELS[data.enquiryType]?.toLowerCase() : "enquiry"} request
              {data.propertyTitle ? ` for ${data.propertyTitle}` : ""}. A personal advisor will be in touch within 24 hours to assist you further.
            </p>

            {/* Enquiry details */}
            <p style={s.sectionTitle}>Your enquiry details</p>
            <table style={s.table}>
              <tbody>
                <Row label="Type" value={data.enquiryType ? ENQUIRY_LABELS[data.enquiryType] : undefined} even={false} />
                <Row label="Property" value={data.propertyTitle} even />
                <Row label="Location" value={data.propertyLocation} even={false} />
                <Row label="Reference" value={data.propertyRef ? `REF-${data.propertyRef}` : undefined} even />
              </tbody>
            </table>

            {data.message && (
              <>
                <p style={s.sectionTitle}>Your message</p>
                <p style={{ ...s.note, backgroundColor: BRAND.bg, padding: "14px 16px", borderRadius: 2, margin: "0 0 24px" }}>
                  "{data.message}"
                </p>
              </>
            )}

            <hr style={s.divider} />

            <p style={s.sectionTitle}>Your contact details</p>
            <table style={s.table}>
              <tbody>
                <Row label="Name" value={data.fullName} even={false} />
                <Row label="Email" value={data.email} even />
                <Row label="Phone" value={data.phone} even={false} />
              </tbody>
            </table>

            <p style={s.note}>
              If any of the above details are incorrect, simply reply to this email and we'll update your request.
            </p>

            <div style={{ textAlign: "center" as const, margin: "8px 0 0" }}>
              <a href="#" style={s.cta}>View Property Details</a>
            </div>
          </div>

          {/* ── Footer ── */}
          <div style={s.footer}>
            <p style={s.footerText}>{BRAND.phone} · {BRAND.email}</p>
            <p style={s.footerText}>{BRAND.city}</p>
            <p style={{ ...s.footerText, marginTop: 8, color: BRAND.border }}>
              © {new Date().getFullYear()} {BRAND.name} {BRAND.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SAMPLE DATA
   ═══════════════════════════════════════════════════ */
const SAMPLE_VISIT: EnquiryEmailData = {
  enquiryType: "visit",
  propertyTitle: "Panoramic Sea View Villa",
  propertyLocation: "Sierra Blanca, Marbella",
  propertyPrice: "€4,950,000",
  propertyRef: "4521",
  propertyImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=640&h=360&fit=crop",
  propertySpecs: { beds: 5, baths: 4, sqm: 620 },
  fullName: "James Whitfield",
  email: "j.whitfield@email.com",
  phone: "+44 7700 123456",
  message: "I'd love to arrange a viewing next week if possible. We're relocating from London and this property looks perfect for our family.",
};

const SAMPLE_INFO: EnquiryEmailData = {
  enquiryType: "info",
  propertyTitle: "Beachfront Penthouse",
  propertyLocation: "Puerto Banús, Marbella",
  propertyPrice: "€2,800,000",
  propertyRef: "3887",
  propertyImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=640&h=360&fit=crop",
  propertySpecs: { beds: 3, baths: 3, sqm: 285 },
  fullName: "María García Fernández",
  email: "maria.garcia@email.com",
  phone: "+34 612 345 678",
};

const SAMPLE_GENERAL: EnquiryEmailData = {
  enquiryType: "general",
  fullName: "Alexander Müller",
  email: "a.muller@email.com",
  phone: "+49 170 1234567",
  message: "I'm looking for investment properties in the Marbella area. Budget around €1–3M. Could you send me your current portfolio?",
};

const SAMPLES: Record<string, EnquiryEmailData> = {
  visit: SAMPLE_VISIT,
  info: SAMPLE_INFO,
  general: SAMPLE_GENERAL,
};

/* ═══════════════════════════════════════════════════
   PREVIEW PAGE
   ═══════════════════════════════════════════════════ */
export default function EnquiryEmailPreviewPage() {
  const [params] = useSearchParams();
  const type = (params.get("type") as string) || "visit";
  const current = SAMPLES[type] || SAMPLE_VISIT;

  const tabs = [
    { key: "visit", label: "Visit request" },
    { key: "info", label: "Info request" },
    { key: "general", label: "General enquiry" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e7e5e4" }}>
      {/* Toggle bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "20px 16px 0", flexWrap: "wrap" as const }}>
        {tabs.map((tab) => (
          <a
            key={tab.key}
            href={`?type=${tab.key}`}
            style={{
              padding: "8px 20px", fontSize: 12, letterSpacing: "0.12em",
              textTransform: "uppercase" as const, textDecoration: "none", borderRadius: 2,
              backgroundColor: type === tab.key ? "#2D2926" : "#ffffff",
              color: type === tab.key ? "#ffffff" : "#6B6560",
              border: "1px solid #d4d4d4",
            }}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <EnquiryConfirmationEmail data={current} />
    </div>
  );
}
