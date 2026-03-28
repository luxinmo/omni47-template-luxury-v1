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
  accent: "hsl(35 32% 41%)",
  dark: "hsl(24 8% 11%)",
  darkSoft: "hsl(24 6% 18%)",
  muted: "hsl(25 5% 49%)",
  light: "hsl(25 5% 67%)",
  bg: "hsl(32 20% 96%)",
  white: "hsl(0 0% 100%)",
  border: "hsl(28 18% 88%)",
  borderLight: "hsl(28 18% 93%)",
};

/* ── Styles ── */
const st = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: B.bg,
    fontFamily: "'Jost', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    WebkitTextSizeAdjust: "100%" as const,
  } as React.CSSProperties,
  wrapper: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "0",
  } as React.CSSProperties,

  /* ── Reinvented top section ── */
  topShell: {
    backgroundColor: B.dark,
  } as React.CSSProperties,
  logoWrap: {
    textAlign: "center" as const,
    padding: "34px 42px 24px",
  } as React.CSSProperties,
  logoName: {
    fontSize: 18,
    fontWeight: 300,
    letterSpacing: "0.42em",
    color: B.white,
    margin: "0 0 2px",
    textTransform: "uppercase" as const,
  } as React.CSSProperties,
  logoSub: {
    fontSize: 8,
    letterSpacing: "0.5em",
    textTransform: "uppercase" as const,
    color: "hsl(0 0% 100% / 0.48)",
    margin: 0,
  } as React.CSSProperties,

  heroFrame: {
    overflow: "hidden" as const,
    position: "relative" as const,
  } as React.CSSProperties,
  heroImage: {
    width: "100%",
    height: 380,
    objectFit: "cover" as const,
    display: "block",
  } as React.CSSProperties,
  heroInfoBar: {
    padding: "24px 32px 20px",
    background: "linear-gradient(to top, hsl(24 8% 11% / 0.85) 40%, transparent)",
    position: "absolute" as const,
    bottom: 0, left: 0, right: 0,
  } as React.CSSProperties,
  heroRef: {
    margin: "0 0 8px",
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: B.accent,
    fontWeight: 500,
  } as React.CSSProperties,
  heroTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 16,
    marginBottom: 6,
  } as React.CSSProperties,
  heroTitle: {
    margin: 0,
    fontSize: 19,
    lineHeight: 1.3,
    letterSpacing: "0.02em",
    color: B.white,
    fontWeight: 400,
  } as React.CSSProperties,
  heroPrice: {
    margin: 0,
    fontSize: 18,
    color: B.accent,
    fontWeight: 500,
    letterSpacing: "0.02em",
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,
  heroLocation: {
    margin: "0 0 10px",
    fontSize: 12,
    color: "hsl(0 0% 100% / 0.54)",
    fontWeight: 300,
  } as React.CSSProperties,
  specsRow: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  specItem: {
    fontSize: 11,
    color: "hsl(0 0% 100% / 0.62)",
    fontWeight: 300,
    letterSpacing: "0.04em",
  } as React.CSSProperties,

  greetBlock: {
    marginTop: 24,
    paddingTop: 20,
    borderTop: "1px solid hsl(0 0% 100% / 0.09)",
  } as React.CSSProperties,
  greeting: {
    fontSize: 22,
    fontWeight: 300,
    color: B.white,
    margin: "0 0 8px",
    letterSpacing: "0.01em",
  } as React.CSSProperties,
  greetingSub: {
    fontSize: 13,
    color: "hsl(0 0% 100% / 0.62)",
    fontWeight: 300,
    margin: 0,
    lineHeight: 1.72,
  } as React.CSSProperties,

  /* ── White content body ── */
  contentBody: {
    backgroundColor: B.white,
  } as React.CSSProperties,
  contentInner: {
    padding: "34px 42px 42px",
  } as React.CSSProperties,
  sectionLabel: {
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: B.muted,
    margin: "0 0 14px",
    fontWeight: 500,
  } as React.CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginBottom: 28,
  } as React.CSSProperties,
  cellLabel: {
    padding: "10px 0",
    fontSize: 12,
    color: B.muted,
    fontWeight: 400,
    width: "35%",
    verticalAlign: "top" as const,
    borderBottom: `1px solid ${B.borderLight}`,
  } as React.CSSProperties,
  cellValue: {
    padding: "10px 0",
    fontSize: 13,
    color: B.darkSoft,
    fontWeight: 400,
    verticalAlign: "top" as const,
    borderBottom: `1px solid ${B.borderLight}`,
  } as React.CSSProperties,
  messageBox: {
    backgroundColor: B.bg,
    borderRadius: 3,
    padding: "16px 20px",
    fontSize: 13,
    color: B.darkSoft,
    lineHeight: 1.7,
    fontWeight: 300,
    margin: "0 0 28px",
    fontStyle: "italic" as const,
    borderLeft: `3px solid ${B.accent}`,
  } as React.CSSProperties,
  divider: {
    border: "none",
    borderTop: `1px solid ${B.border}`,
    margin: "0 0 24px",
  } as React.CSSProperties,
  note: {
    fontSize: 12,
    color: B.muted,
    lineHeight: 1.7,
    margin: "0 0 28px",
    fontWeight: 300,
  } as React.CSSProperties,
  ctaWrap: {
    textAlign: "center" as const,
    padding: "4px 0 0",
  } as React.CSSProperties,
  cta: {
    display: "inline-block",
    backgroundColor: B.accent,
    color: B.white,
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    fontWeight: 500,
    padding: "14px 36px",
    borderRadius: 2,
    textDecoration: "none",
  } as React.CSSProperties,

  /* ── Footer ── */
  footer: {
    padding: "24px 40px",
    backgroundColor: B.bg,
    textAlign: "center" as const,
  } as React.CSSProperties,
  footerText: {
    fontSize: 11,
    color: B.light,
    margin: "0 0 2px",
    letterSpacing: "0.03em",
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

export function EnquiryConfirmationEmail({ data }: { data: EnquiryEmailData }) {
  const specs = data.propertySpecs;

  return (
    <div style={st.body}>
      <div style={st.wrapper}>
        <div style={st.topShell}>
          <div style={st.logoWrap}>
            <p style={st.logoName}>Prestige</p>
            <p style={st.logoSub}>Real Estate</p>
          </div>

          {(data.propertyImage || data.propertyTitle) && (
            <div style={st.heroFrame}>
              {data.propertyImage && <img src={data.propertyImage} alt="" style={st.heroImage} />}

              <div style={st.heroInfoBar}>
                {data.propertyRef && <p style={st.heroRef}>REF {data.propertyRef}</p>}
                <div style={st.heroTitleRow}>
                  <p style={st.heroTitle}>{data.propertyTitle || "Selected Property"}</p>
                  {data.propertyPrice && <p style={st.heroPrice}>{data.propertyPrice}</p>}
                </div>
                {data.propertyLocation && <p style={st.heroLocation}>📍 {data.propertyLocation}</p>}

                {specs && (
                  <div style={st.specsRow}>
                    {specs.beds && <span style={st.specItem}>{specs.beds} Bedrooms</span>}
                    {specs.baths && <span style={st.specItem}>{specs.baths} Bathrooms</span>}
                    {specs.sqm && <span style={st.specItem}>{specs.sqm} m²</span>}
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={st.greetBlock}>
            <h1 style={st.greeting}>{data.fullName ? `Thank you, ${data.fullName}` : "Thank you for your enquiry"}</h1>
            <p style={st.greetingSub}>
              We've received your {data.enquiryType ? ENQUIRY_LABELS[data.enquiryType]?.toLowerCase() : "enquiry"} request
              {data.propertyTitle ? ` for ${data.propertyTitle}` : ""}. A personal advisor will contact you within 24 hours.
            </p>
          </div>
        </div>

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

            <p style={st.note}>If any details are incorrect, simply reply to this email and we'll update your request immediately.</p>

            <div style={st.ctaWrap}>
              <a href="#" style={st.cta}>View Property</a>
            </div>
          </div>
        </div>

        <div style={st.footer}>
          <p style={st.footerText}>+34 600 000 000 · hello@prestigeestates.com</p>
          <p style={st.footerText}>Marbella, Spain</p>
          <p style={{ ...st.footerText, marginTop: 10, color: "hsl(0 0% 83%)" }}>© {new Date().getFullYear()} Prestige Real Estate</p>
        </div>
      </div>
    </div>
  );
}

/* ── Sample data for preview ── */
const SAMPLE_VISIT: EnquiryEmailData = {
  enquiryType: "visit",
  propertyTitle: "Panoramic Sea View Villa",
  propertyLocation: "Sierra Blanca, Marbella",
  propertyPrice: "€4,950,000",
  propertyRef: "4521",
  propertyImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1280&h=720&fit=crop",
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
  propertyImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1280&h=720&fit=crop",
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
    <div style={{ minHeight: "100vh", backgroundColor: "hsl(30 7% 89%)" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "20px 16px", flexWrap: "wrap" as const }}>
        {tabs.map((tab) => (
          <a
            key={tab.key}
            href={`?type=${tab.key}`}
            style={{
              padding: "8px 20px",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              borderRadius: 2,
              backgroundColor: type === tab.key ? "hsl(24 8% 11%)" : "hsl(0 0% 100%)",
              color: type === tab.key ? "hsl(0 0% 100%)" : "hsl(25 5% 49%)",
              border: "1px solid hsl(0 0% 83%)",
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
