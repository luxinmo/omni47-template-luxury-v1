/**
 * ENQUIRY CONFIRMATION EMAIL TEMPLATE
 * Sent to the lead after they submit a property enquiry.
 * Uses inline styles only (email-client compatible, no Tailwind).
 */

import { useSearchParams } from "react-router-dom";

interface EnquiryEmailData {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  propertyTitle?: string;
  propertyLocation?: string;
  propertyPrice?: string;
  propertyRef?: string;
  propertyImage?: string;
  propertySpecs?: { beds?: number; baths?: number; sqm?: number };
  enquiryType?: "visit" | "info" | "offer" | "general";
}

const ENQUIRY_LABELS: Record<string, string> = {
  visit: "Schedule a Visit",
  info: "Request Information",
  offer: "Make an Offer",
  general: "General Enquiry",
};

const B = {
  accent: "#8B6F47",
  dark: "#1a1a1a",
  darkSoft: "#2D2926",
  muted: "#999999",
  light: "#bbbbbb",
  bg: "#f7f7f7",
  white: "#ffffff",
  border: "#e5e5e5",
  borderLight: "#f0f0f0",
};

/* ── Styles ── */
const st = {
  body: {
    margin: 0, padding: 0, backgroundColor: B.bg,
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  } as React.CSSProperties,
  wrapper: {
    maxWidth: 800, margin: "0 auto", padding: "0",
  } as React.CSSProperties,

  /* ── Dark header band ── */
  headerBand: {
    backgroundColor: B.dark, padding: "32px 40px 0",
  } as React.CSSProperties,
  logoRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.08)",
  } as React.CSSProperties,
  logoName: {
    fontSize: 18, fontWeight: 300, letterSpacing: "0.4em",
    color: B.white, margin: 0, textTransform: "uppercase" as const,
  } as React.CSSProperties,
  logoSub: {
    fontSize: 8, letterSpacing: "0.5em", textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.35)", margin: 0,
  } as React.CSSProperties,
  headerDate: {
    fontSize: 11, color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.06em",
  } as React.CSSProperties,

  /* ── Property card inside dark header ── */
  propertySection: {
    padding: "28px 0 0",
  } as React.CSSProperties,
  propertyCard: {
    display: "flex", gap: 0,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 3, overflow: "hidden" as const,
  } as React.CSSProperties,
  propertyImg: {
    width: 260, minHeight: 180, objectFit: "cover" as const,
    display: "block", flexShrink: 0,
  } as React.CSSProperties,
  propertyInfo: {
    padding: "22px 28px", flex: 1,
    display: "flex", flexDirection: "column" as const, justifyContent: "center",
  } as React.CSSProperties,
  propRef: {
    fontSize: 10, letterSpacing: "0.2em", color: B.accent,
    textTransform: "uppercase" as const, margin: "0 0 8px", fontWeight: 500,
  } as React.CSSProperties,
  propTitle: {
    fontSize: 17, fontWeight: 400, color: B.white,
    margin: "0 0 4px", letterSpacing: "0.02em",
  } as React.CSSProperties,
  propLocation: {
    fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "0 0 16px",
    fontWeight: 300,
  } as React.CSSProperties,
  propPrice: {
    fontSize: 18, fontWeight: 500, color: B.accent,
    margin: "0 0 10px", letterSpacing: "0.02em",
  } as React.CSSProperties,
  specRow: {
    display: "flex", gap: 16,
  } as React.CSSProperties,
  specItem: {
    fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 300,
    letterSpacing: "0.04em",
  } as React.CSSProperties,

  /* ── Dark header greeting ── */
  greetingSection: {
    padding: "28px 0 32px",
  } as React.CSSProperties,
  greeting: {
    fontSize: 22, fontWeight: 300, color: B.white,
    margin: "0 0 8px", letterSpacing: "0.01em",
  } as React.CSSProperties,
  greetingSub: {
    fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 300,
    margin: 0, lineHeight: 1.7,
  } as React.CSSProperties,

  /* ── White content body ── */
  contentBody: {
    backgroundColor: B.white,
  } as React.CSSProperties,
  contentInner: {
    padding: "32px 40px 40px",
  } as React.CSSProperties,
  sectionLabel: {
    fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase" as const,
    color: B.muted, margin: "0 0 14px", fontWeight: 500,
  } as React.CSSProperties,
  table: {
    width: "100%", borderCollapse: "collapse" as const, marginBottom: 28,
  } as React.CSSProperties,
  cellLabel: {
    padding: "10px 0 10px 0", fontSize: 12, color: B.muted,
    fontWeight: 400, width: "35%", verticalAlign: "top" as const,
    borderBottom: `1px solid ${B.borderLight}`,
  } as React.CSSProperties,
  cellValue: {
    padding: "10px 0", fontSize: 13, color: B.darkSoft,
    fontWeight: 400, verticalAlign: "top" as const,
    borderBottom: `1px solid ${B.borderLight}`,
  } as React.CSSProperties,
  messageBox: {
    backgroundColor: B.bg, borderRadius: 3, padding: "16px 20px",
    fontSize: 13, color: B.darkSoft, lineHeight: 1.7, fontWeight: 300,
    margin: "0 0 28px", fontStyle: "italic" as const,
    borderLeft: `3px solid ${B.accent}`,
  } as React.CSSProperties,
  divider: {
    border: "none", borderTop: `1px solid ${B.border}`, margin: "0 0 24px",
  } as React.CSSProperties,
  note: {
    fontSize: 12, color: B.muted, lineHeight: 1.7, margin: "0 0 28px",
    fontWeight: 300,
  } as React.CSSProperties,
  ctaWrap: {
    textAlign: "center" as const, padding: "4px 0 0",
  } as React.CSSProperties,
  cta: {
    display: "inline-block",
    backgroundColor: B.accent, color: B.white,
    fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" as const,
    fontWeight: 500, padding: "14px 36px", borderRadius: 2,
    textDecoration: "none",
  } as React.CSSProperties,

  /* ── Footer ── */
  footer: {
    padding: "24px 40px",
    backgroundColor: B.bg,
    textAlign: "center" as const,
  } as React.CSSProperties,
  footerText: {
    fontSize: 11, color: B.light, margin: "0 0 2px", letterSpacing: "0.03em",
  } as React.CSSProperties,
};

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <tr>
      <td style={st.cellLabel}>{label}</td>
      <td style={st.cellValue}>{value}</td>
    </tr>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN TEMPLATE
   ═══════════════════════════════════════════════════ */
export function EnquiryConfirmationEmail({ data }: { data: EnquiryEmailData }) {
  const specs = data.propertySpecs;
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div style={st.body}>
      <div style={st.wrapper}>

        {/* ═══ DARK HEADER ═══ */}
        <div style={st.headerBand}>

          {/* Logo + date */}
          <div style={st.logoRow}>
            <div>
              <p style={st.logoName}>Prestige</p>
              <p style={st.logoSub}>Real Estate</p>
            </div>
            <span style={st.headerDate}>{today}</span>
          </div>

          {/* Property card */}
          {data.propertyImage && (
            <div style={st.propertySection}>
              <div style={st.propertyCard}>
                <img src={data.propertyImage} alt="" style={st.propertyImg} />
                <div style={st.propertyInfo}>
                  {data.propertyRef && <p style={st.propRef}>REF {data.propertyRef}</p>}
                  <p style={st.propTitle}>{data.propertyTitle}</p>
                  {data.propertyLocation && <p style={st.propLocation}>{data.propertyLocation}</p>}
                  <p style={st.propPrice}>{data.propertyPrice || "Price on request"}</p>
                  {specs && (
                    <div style={st.specRow}>
                      {specs.beds && <span style={st.specItem}>{specs.beds} Bedrooms</span>}
                      {specs.baths && <span style={st.specItem}>{specs.baths} Bathrooms</span>}
                      {specs.sqm && <span style={st.specItem}>{specs.sqm} m²</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Greeting in dark area */}
          <div style={st.greetingSection}>
            <h1 style={st.greeting}>
              {data.fullName ? `Thank you, ${data.fullName}` : "Thank you for your enquiry"}
            </h1>
            <p style={st.greetingSub}>
              We've received your {data.enquiryType ? ENQUIRY_LABELS[data.enquiryType]?.toLowerCase() : "enquiry"} request
              {data.propertyTitle ? ` for ${data.propertyTitle}` : ""}. A personal advisor will be in touch within 24 hours.
            </p>
          </div>
        </div>

        {/* ═══ WHITE CONTENT ═══ */}
        <div style={st.contentBody}>
          <div style={st.contentInner}>

            <p style={st.sectionLabel}>Enquiry summary</p>
            <table style={st.table}>
              <tbody>
                <Row label="Request type" value={data.enquiryType ? ENQUIRY_LABELS[data.enquiryType] : undefined} />
                <Row label="Property" value={data.propertyTitle} />
                <Row label="Location" value={data.propertyLocation} />
                <Row label="Reference" value={data.propertyRef ? `REF-${data.propertyRef}` : undefined} />
              </tbody>
            </table>

            {data.message && (
              <>
                <p style={st.sectionLabel}>Your message</p>
                <div style={st.messageBox}>"{data.message}"</div>
              </>
            )}

            <hr style={st.divider} />

            <p style={st.sectionLabel}>Contact details</p>
            <table style={st.table}>
              <tbody>
                <Row label="Name" value={data.fullName} />
                <Row label="Email" value={data.email} />
                <Row label="Phone" value={data.phone} />
              </tbody>
            </table>

            <p style={st.note}>
              If any details are incorrect, simply reply to this email and we'll update your request immediately.
            </p>

            <div style={st.ctaWrap}>
              <a href="#" style={st.cta}>View Property</a>
            </div>
          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div style={st.footer}>
          <p style={st.footerText}>+34 600 000 000 · hello@prestigeestates.com</p>
          <p style={st.footerText}>Marbella, Spain</p>
          <p style={{ ...st.footerText, marginTop: 10, color: "#d4d4d4" }}>
            © {new Date().getFullYear()} Prestige Real Estate
          </p>
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
  visit: SAMPLE_VISIT, info: SAMPLE_INFO, general: SAMPLE_GENERAL,
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
      <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "20px 16px", flexWrap: "wrap" as const }}>
        {tabs.map((tab) => (
          <a
            key={tab.key}
            href={`?type=${tab.key}`}
            style={{
              padding: "8px 20px", fontSize: 12, letterSpacing: "0.12em",
              textTransform: "uppercase" as const, textDecoration: "none", borderRadius: 2,
              backgroundColor: type === tab.key ? "#1a1a1a" : "#ffffff",
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
