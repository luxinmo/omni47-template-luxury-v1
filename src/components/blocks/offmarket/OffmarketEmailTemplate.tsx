/**
 * OFF-MARKET EMAIL TEMPLATE
 * Renders an email-ready confirmation for sell/buy wizard submissions.
 * Uses inline styles only (email-client compatible, no Tailwind).
 * Can be rendered as a preview page or converted to HTML for sending.
 */

import { useSearchParams } from "react-router-dom";

interface EmailData {
  flow: "sell" | "buy";
  // Sell fields
  ownerType?: string;
  otherAgencies?: string;
  location?: string;
  price?: string;
  // Buy fields
  priceMin?: string;
  priceMax?: string;
  timeline?: string;
  // Shared
  fullName?: string;
  phone?: string;
  email?: string;
  language?: string;
}

const TIMELINE_LABELS: Record<string, string> = {
  immediate: "As soon as possible",
  "3months": "Within 3 months",
  "6months": "Within 6 months",
  "12months": "Within 12 months",
  flexible: "No rush — flexible",
};

const LANGUAGE_LABELS: Record<string, string> = {
  es: "Español", en: "English", de: "Deutsch", fr: "Français",
  it: "Italiano", pt: "Português", ru: "Русский", zh: "中文",
};

/* ── Inline styles (email-safe) ── */
const styles = {
  body: {
    margin: 0, padding: 0,
    backgroundColor: "#f5f5f4",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    WebkitTextSizeAdjust: "100%" as const,
  } as React.CSSProperties,
  wrapper: {
    maxWidth: 600, margin: "0 auto", padding: "32px 16px",
  } as React.CSSProperties,
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 2,
    overflow: "hidden" as const,
  } as React.CSSProperties,
  hero: {
    backgroundColor: "#1e1c1a",
    padding: "40px 32px",
    textAlign: "center" as const,
  } as React.CSSProperties,
  heroIcon: {
    width: 48, height: 48, margin: "0 auto 16px",
    borderRadius: "50%",
    backgroundColor: "rgba(201,169,110,0.15)",
    display: "flex", alignItems: "center", justifyContent: "center",
  } as React.CSSProperties,
  heroLabel: {
    fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" as const,
    color: "#c9a96e", margin: "0 0 4px",
  } as React.CSSProperties,
  heroSub: {
    fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0,
    fontWeight: 300,
  } as React.CSSProperties,
  content: {
    padding: "32px 32px 40px",
  } as React.CSSProperties,
  greeting: {
    fontSize: 22, fontWeight: 300, color: "#171717",
    margin: "0 0 6px", letterSpacing: "0.02em",
  } as React.CSSProperties,
  intro: {
    fontSize: 14, color: "#a3a3a3", fontWeight: 300,
    margin: "0 0 28px", lineHeight: 1.6,
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const,
    color: "#a3a3a3", margin: "0 0 14px", fontWeight: 500,
  } as React.CSSProperties,
  table: {
    width: "100%", borderCollapse: "collapse" as const,
    marginBottom: 28,
  } as React.CSSProperties,
  rowEven: { backgroundColor: "#fafaf9" } as React.CSSProperties,
  rowOdd: { backgroundColor: "#ffffff" } as React.CSSProperties,
  cellLabel: {
    padding: "11px 16px", fontSize: 13, color: "#a3a3a3",
    fontWeight: 400, width: "40%", verticalAlign: "top" as const,
    borderBottom: "1px solid #f5f5f4",
  } as React.CSSProperties,
  cellValue: {
    padding: "11px 16px", fontSize: 14, color: "#171717",
    fontWeight: 400, verticalAlign: "top" as const,
    borderBottom: "1px solid #f5f5f4",
  } as React.CSSProperties,
  divider: {
    border: "none", borderTop: "1px solid #e5e5e5",
    margin: "0 0 28px",
  } as React.CSSProperties,
  note: {
    fontSize: 13, color: "#a3a3a3", lineHeight: 1.7,
    margin: "0 0 28px", fontWeight: 300,
  } as React.CSSProperties,
  cta: {
    display: "inline-block",
    backgroundColor: "#c9a96e", color: "#1e1c1a",
    fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" as const,
    fontWeight: 500, padding: "14px 32px", borderRadius: 2,
    textDecoration: "none",
  } as React.CSSProperties,
  footer: {
    padding: "24px 32px",
    borderTop: "1px solid #f5f5f4",
    textAlign: "center" as const,
  } as React.CSSProperties,
  footerText: {
    fontSize: 11, color: "#d4d4d4", margin: "0 0 4px",
    letterSpacing: "0.05em",
  } as React.CSSProperties,
};

function Row({ label, value, even }: { label: string; value?: string; even: boolean }) {
  if (!value) return null;
  return (
    <tr style={even ? styles.rowEven : styles.rowOdd}>
      <td style={styles.cellLabel}>{label}</td>
      <td style={styles.cellValue}>{value}</td>
    </tr>
  );
}

function EyeOffSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function OffmarketEmailTemplate({ data }: { data: EmailData }) {
  const isSell = data.flow === "sell";

  return (
    <div style={styles.body}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          {/* Hero */}
          <div style={styles.hero}>
            <div style={styles.heroIcon}><EyeOffSvg /></div>
            <p style={styles.heroLabel}>Off-Market</p>
            <p style={styles.heroSub}>Private & Confidential</p>
          </div>

          {/* Content */}
          <div style={styles.content}>
            <h1 style={styles.greeting}>
              {data.fullName ? `Thank you, ${data.fullName}` : "Thank you for your enquiry"}
            </h1>
            <p style={styles.intro}>
              {isSell
                ? "We've received your off-market listing request. Here's a summary of the information you provided. A personal advisor will contact you shortly to discuss the private sale of your property."
                : "We've received your off-market access request. Here's a summary of your preferences. A personal advisor will contact you shortly to provide access to our exclusive portfolio."}
            </p>

            {/* Request type badge */}
            <p style={styles.sectionTitle}>
              {isSell ? "Sell request summary" : "Buy request summary"}
            </p>

            <table style={styles.table}>
              <tbody>
                {isSell ? (
                  <>
                    <Row label="Relationship" value={data.ownerType === "owner" ? "Property owner" : data.ownerType === "authorized" ? "Authorized representative" : undefined} even={false} />
                    <Row label="Listed elsewhere" value={data.otherAgencies === "yes" ? "Yes, with other agencies" : data.otherAgencies === "no" ? "No, not listed" : undefined} even />
                    <Row label="Location" value={data.location} even={false} />
                    <Row label="Asking price" value={data.price || "To be discussed"} even />
                  </>
                ) : (
                  <>
                    <Row label="Location" value={data.location} even={false} />
                    <Row label="Budget range" value={data.priceMin || data.priceMax ? `${data.priceMin || "—"} – ${data.priceMax || "—"}` : undefined} even />
                    <Row label="Timeline" value={data.timeline ? TIMELINE_LABELS[data.timeline] : undefined} even={false} />
                  </>
                )}
              </tbody>
            </table>

            <hr style={styles.divider} />

            <p style={styles.sectionTitle}>Your contact details</p>
            <table style={styles.table}>
              <tbody>
                <Row label="Name" value={data.fullName} even={false} />
                <Row label="Phone" value={data.phone} even />
                <Row label="Email" value={data.email} even={false} />
                <Row label="Language" value={data.language ? LANGUAGE_LABELS[data.language] : undefined} even />
              </tbody>
            </table>

            <p style={styles.note}>
              If any of the above details are incorrect, simply reply to this email and we'll update your request.
            </p>

            <div style={{ textAlign: "center" as const }}>
              <a href="#" style={styles.cta}>View our portfolio</a>
            </div>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>© {new Date().getFullYear()} · Off-Market Division</p>
            <p style={{ ...styles.footerText, color: "#e5e5e5" }}>This is a confidential communication</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Preview page with sample data ── */
const SAMPLE_SELL: EmailData = {
  flow: "sell",
  ownerType: "owner",
  otherAgencies: "no",
  location: "Ibiza, Santa Eulalia",
  price: "€3,200,000",
  fullName: "María García Fernández",
  phone: "+34 612 345 678",
  email: "maria.garcia@email.com",
  language: "es",
};

const SAMPLE_BUY: EmailData = {
  flow: "buy",
  location: "Marbella, Golden Mile",
  priceMin: "€1,500,000",
  priceMax: "€4,000,000",
  timeline: "3months",
  fullName: "James Whitfield",
  phone: "+44 7700 123456",
  email: "j.whitfield@email.com",
  language: "en",
};

export default function OffmarketEmailPreviewPage() {
  const [params] = useSearchParams();
  const flow = params.get("flow") === "buy" ? "buy" : "sell";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e7e5e4" }}>
      {/* Toggle bar */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "20px 16px 0" }}>
        <a
          href="?flow=sell"
          style={{
            padding: "8px 20px", fontSize: 12, letterSpacing: "0.12em",
            textTransform: "uppercase", textDecoration: "none", borderRadius: 2,
            backgroundColor: flow === "sell" ? "#1e1c1a" : "#ffffff",
            color: flow === "sell" ? "#ffffff" : "#525252",
            border: "1px solid #d4d4d4",
          }}
        >
          Sell template
        </a>
        <a
          href="?flow=buy"
          style={{
            padding: "8px 20px", fontSize: 12, letterSpacing: "0.12em",
            textTransform: "uppercase", textDecoration: "none", borderRadius: 2,
            backgroundColor: flow === "buy" ? "#1e1c1a" : "#ffffff",
            color: flow === "buy" ? "#ffffff" : "#525252",
            border: "1px solid #d4d4d4",
          }}
        >
          Buy template
        </a>
      </div>

      <OffmarketEmailTemplate data={flow === "sell" ? SAMPLE_SELL : SAMPLE_BUY} />
    </div>
  );
}
