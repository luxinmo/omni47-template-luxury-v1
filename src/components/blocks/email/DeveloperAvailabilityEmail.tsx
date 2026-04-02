/**
 * DEVELOPER AVAILABILITY EMAIL TEMPLATE
 * Sent by a real estate developer/promoter to agents or leads
 * showcasing their project's current availability, highlighting
 * key-ready units, price updates, and construction progress.
 * Uses inline styles only (email-client compatible).
 */

import { useSearchParams } from "react-router-dom";

/* ── Data model ── */

interface UnitRow {
  ref: string;
  type: string;       // "2-Bed Apartment", "3-Bed Penthouse"
  sqm: number;
  price: string;       // "€485,000"
  status: "available" | "key-ready" | "reserved" | "last-units";
  floor?: string;
  terrace?: number;
}

interface DeveloperAvailabilityData {
  /* Project */
  projectName: string;
  projectLocation: string;
  projectImage: string;
  developerName: string;
  developerLogo?: string;
  completionDate?: string;       // "Q2 2027"
  constructionPercent?: number;  // 0–100

  /* Stats */
  totalUnits?: number;
  availableUnits?: number;
  keyReadyUnits?: number;

  /* Units */
  units: UnitRow[];

  /* Highlights */
  highlights?: string[];   // "Sea views", "Private pool", "Gated community"

  /* Recipient */
  recipientName?: string;

  /* CTA */
  ctaText?: string;
  ctaHref?: string;

  /* Contact */
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

/* ── Palette ── */
const B = {
  accent: "hsl(35 32% 41%)",
  accentLight: "hsl(35 28% 92%)",
  dark: "hsl(24 8% 11%)",
  darkSoft: "hsl(24 6% 14%)",
  darkText: "hsl(24 6% 18%)",
  muted: "hsl(25 5% 49%)",
  light: "hsl(25 5% 67%)",
  bg: "hsl(32 20% 96%)",
  white: "hsl(0 0% 100%)",
  border: "hsl(28 18% 88%)",
  borderLight: "hsl(28 18% 93%)",
  green: "hsl(145 45% 38%)",
  greenBg: "hsl(145 40% 95%)",
  amber: "hsl(38 92% 50%)",
  amberBg: "hsl(40 100% 95%)",
  red: "hsl(0 55% 48%)",
  redBg: "hsl(0 40% 96%)",
};

/* ── Inline styles ── */
const st = {
  body: {
    margin: 0, padding: 0,
    backgroundColor: B.bg,
    fontFamily: "'Jost', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    WebkitTextSizeAdjust: "100%" as const,
  } as React.CSSProperties,
  wrapper: {
    maxWidth: 800, margin: "0 auto", padding: 0,
  } as React.CSSProperties,

  /* Header */
  header: {
    backgroundColor: B.dark,
    textAlign: "center" as const,
    padding: "34px 42px 0",
  } as React.CSSProperties,
  logoName: {
    fontSize: 18, fontWeight: 300, letterSpacing: "0.42em",
    color: B.white, margin: "0 0 2px", textTransform: "uppercase" as const,
  } as React.CSSProperties,
  logoSub: {
    fontSize: 8, letterSpacing: "0.5em", textTransform: "uppercase" as const,
    color: "hsl(0 0% 100% / 0.48)", margin: 0,
  } as React.CSSProperties,

  /* Hero image */
  heroImg: {
    width: "100%", height: 320, objectFit: "cover" as const, display: "block",
  } as React.CSSProperties,

  /* Project info bar */
  infoBar: {
    backgroundColor: B.darkSoft, padding: "20px 36px",
  } as React.CSSProperties,
  projectName: {
    fontSize: 22, fontWeight: 300, color: B.white, margin: "0 0 4px",
    letterSpacing: "0.04em",
  } as React.CSSProperties,
  projectLocation: {
    fontSize: 13, color: B.light, margin: 0, letterSpacing: "0.03em",
  } as React.CSSProperties,

  /* Stats ribbon */
  statsRow: {
    display: "flex", gap: 0,
    borderBottom: `1px solid hsl(24 6% 20%)`,
  } as React.CSSProperties,
  statCell: {
    flex: 1, textAlign: "center" as const,
    padding: "14px 8px",
    borderRight: `1px solid hsl(24 6% 20%)`,
  } as React.CSSProperties,
  statValue: {
    fontSize: 18, fontWeight: 600, color: B.white, margin: "0 0 2px",
  } as React.CSSProperties,
  statLabel: {
    fontSize: 10, textTransform: "uppercase" as const,
    letterSpacing: "0.1em", color: B.light, margin: 0,
  } as React.CSSProperties,

  /* Content */
  content: {
    backgroundColor: B.white, padding: "36px 42px",
  } as React.CSSProperties,
  greeting: {
    fontSize: 22, fontWeight: 300, color: B.darkText, margin: "0 0 12px",
    letterSpacing: "0.02em",
  } as React.CSSProperties,
  intro: {
    fontSize: 14, lineHeight: 1.7, color: B.muted, margin: "0 0 28px",
  } as React.CSSProperties,

  /* Section title */
  sectionTitle: {
    fontSize: 11, fontWeight: 600, letterSpacing: "0.14em",
    textTransform: "uppercase" as const, color: B.muted,
    margin: "0 0 16px", paddingBottom: 8,
    borderBottom: `1px solid ${B.borderLight}`,
  } as React.CSSProperties,

  /* Highlights */
  highlightRow: {
    display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 28,
  } as React.CSSProperties,
  highlightPill: {
    display: "inline-block", padding: "6px 16px",
    fontSize: 12, letterSpacing: "0.03em",
    backgroundColor: B.accentLight, color: B.darkText,
    borderRadius: 2,
  } as React.CSSProperties,

  /* Construction bar */
  progressWrap: {
    marginBottom: 28,
  } as React.CSSProperties,
  progressTrack: {
    height: 6, backgroundColor: B.borderLight, borderRadius: 3,
    overflow: "hidden" as const,
  } as React.CSSProperties,
  progressFill: {
    height: "100%", borderRadius: 3, backgroundColor: B.accent,
  } as React.CSSProperties,
  progressLabel: {
    fontSize: 12, color: B.muted, marginTop: 6,
  } as React.CSSProperties,

  /* Units table */
  table: {
    width: "100%", borderCollapse: "collapse" as const,
    marginBottom: 28,
  } as React.CSSProperties,
  th: {
    fontSize: 10, fontWeight: 600, textTransform: "uppercase" as const,
    letterSpacing: "0.1em", color: B.muted,
    textAlign: "left" as const, padding: "10px 12px",
    borderBottom: `2px solid ${B.border}`,
  } as React.CSSProperties,
  td: {
    fontSize: 13, color: B.darkText, padding: "12px 12px",
    borderBottom: `1px solid ${B.borderLight}`,
    verticalAlign: "middle" as const,
  } as React.CSSProperties,

  /* CTA */
  ctaWrap: {
    textAlign: "center" as const, padding: "8px 0 12px",
  } as React.CSSProperties,
  ctaBtn: {
    display: "inline-block", padding: "14px 44px",
    fontSize: 13, fontWeight: 500, letterSpacing: "0.1em",
    textTransform: "uppercase" as const, textDecoration: "none",
    color: B.white, backgroundColor: B.accent, borderRadius: 2,
  } as React.CSSProperties,
  ctaBtnOutline: {
    display: "inline-block", padding: "12px 32px",
    fontSize: 12, fontWeight: 500, letterSpacing: "0.1em",
    textTransform: "uppercase" as const, textDecoration: "none",
    color: B.accent, backgroundColor: "transparent",
    border: `1.5px solid ${B.accent}`, borderRadius: 2,
    marginLeft: 12,
  } as React.CSSProperties,

  /* Footer */
  footer: {
    backgroundColor: B.bg, padding: "24px 42px", textAlign: "center" as const,
  } as React.CSSProperties,
  footerText: {
    fontSize: 11, color: B.light, margin: "0 0 4px", letterSpacing: "0.03em",
  } as React.CSSProperties,
};

/* ── Status badge helper ── */
function StatusBadge({ status }: { status: UnitRow["status"] }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    available: { bg: B.greenBg, color: B.green, label: "Available" },
    "key-ready": { bg: B.amberBg, color: "hsl(38 70% 38%)", label: "✦ Key Ready" },
    reserved: { bg: B.redBg, color: B.red, label: "Reserved" },
    "last-units": { bg: "hsl(260 40% 96%)", color: "hsl(260 50% 48%)", label: "Last Units" },
  };
  const s = map[status] || map.available;
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px",
      fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
      borderRadius: 2, backgroundColor: s.bg, color: s.color,
    }}>
      {s.label}
    </span>
  );
}

/* ══════════════════════════════════════════════════
   MAIN TEMPLATE
   ══════════════════════════════════════════════════ */

export function DeveloperAvailabilityEmail({ data }: { data: DeveloperAvailabilityData }) {
  const d = data;
  const keyReadyCount = d.keyReadyUnits ?? d.units.filter(u => u.status === "key-ready").length;

  return (
    <div style={st.body}>
      <style>{`@media(max-width:480px){.da-stats-row{flex-wrap:wrap!important}.da-stat-cell{flex:1 1 45%!important;box-sizing:border-box!important;border-right:none!important;border-bottom:1px solid hsl(24 6% 20%)!important;padding:12px 16px!important;text-align:center!important}.da-content{padding:20px 18px!important}.da-hero-img{height:200px!important}.da-info-bar{padding:14px 18px!important}.da-table-hide{display:none!important}.da-cards-show{display:block!important}.da-unit-card{padding:12px 14px!important;margin-bottom:8px!important}.da-unit-card p{margin:0!important}.da-cta-stack{display:flex!important;flex-direction:column!important;gap:8px!important;align-items:stretch!important}.da-cta-stack a{display:block!important;margin:0!important;width:100%!important;text-align:center!important;box-sizing:border-box!important;padding:13px 20px!important}.da-footer{padding:18px 18px!important}.da-greeting{font-size:19px!important}.da-intro{font-size:13px!important}.da-contact-box{padding:14px 16px!important}}`}</style>
      <div style={st.wrapper}>

        {/* ── A: Dark header ── */}
        <div style={st.header}>
          <p style={st.logoName}>PRESTIGE</p>
          <p style={{ ...st.logoSub, marginBottom: 24 }}>REAL ESTATE</p>
        </div>

        {/* Hero image */}
        <img
          src={d.projectImage}
          alt={d.projectName}
          style={st.heroImg}
          className="da-hero-img"
        />

        {/* Project info bar */}
        <div style={st.infoBar} className="da-info-bar">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" as const }}>
            <div>
              <p style={st.projectName}>{d.projectName}</p>
              <p style={st.projectLocation}>📍 {d.projectLocation} · by {d.developerName}</p>
            </div>
            {d.completionDate && (
              <div style={{ textAlign: "right" as const }}>
                <p style={{ fontSize: 10, color: B.light, margin: "0 0 2px", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Delivery</p>
                <p style={{ fontSize: 15, fontWeight: 500, color: B.white, margin: 0 }}>{d.completionDate}</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats ribbon */}
        <div style={{ backgroundColor: B.darkSoft }}>
          <div style={st.statsRow} className="da-stats-row">
            {d.totalUnits != null && (
              <div style={st.statCell} className="da-stat-cell">
                <p style={st.statValue}>{d.totalUnits}</p>
                <p style={st.statLabel}>Total Units</p>
              </div>
            )}
            <div style={st.statCell} className="da-stat-cell">
              <p style={{ ...st.statValue, color: B.green }}>{d.availableUnits ?? d.units.filter(u => u.status !== "reserved").length}</p>
              <p style={st.statLabel}>Available</p>
            </div>
            {keyReadyCount > 0 && (
              <div style={st.statCell} className="da-stat-cell">
                <p style={{ ...st.statValue, color: B.amber }}>{keyReadyCount}</p>
                <p style={st.statLabel}>Key Ready</p>
              </div>
            )}
            {d.constructionPercent != null && (
              <div style={{ ...st.statCell, borderRight: "none" }} className="da-stat-cell">
                <p style={st.statValue}>{d.constructionPercent}%</p>
                <p style={st.statLabel}>Built</p>
              </div>
            )}
          </div>
        </div>

        {/* ── B: White content ── */}
        <div style={st.content} className="da-content">

          {/* Greeting */}
          <p style={st.greeting} className="da-greeting">
            {d.recipientName ? `Dear ${d.recipientName},` : "Dear Partner,"}
          </p>
          <p style={st.intro} className="da-intro">
            We're pleased to share the latest availability update for <strong style={{ color: B.darkText }}>{d.projectName}</strong>.
            {keyReadyCount > 0 && (
              <> We currently have <strong style={{ color: "hsl(38 70% 38%)" }}>{keyReadyCount} key-ready {keyReadyCount === 1 ? "unit" : "units"}</strong> available for immediate delivery.</>
            )}
          </p>

          {/* Construction progress */}
          {d.constructionPercent != null && (
            <div style={st.progressWrap}>
              <p style={st.sectionTitle}>Construction Progress</p>
              <div style={st.progressTrack}>
                <div style={{ ...st.progressFill, width: `${d.constructionPercent}%` }} />
              </div>
              <p style={st.progressLabel}>
                {d.constructionPercent}% complete{d.completionDate ? ` · Est. delivery ${d.completionDate}` : ""}
              </p>
            </div>
          )}

          {/* Highlights */}
          {d.highlights && d.highlights.length > 0 && (
            <div>
              <p style={st.sectionTitle}>Project Highlights</p>
              <div style={st.highlightRow}>
                {d.highlights.map((h, i) => (
                  <span key={i} style={st.highlightPill}>{h}</span>
                ))}
              </div>
            </div>
          )}

          {/* Units table (desktop) */}
          <p style={st.sectionTitle}>Available Units</p>
          <table style={st.table} className="da-table-hide" cellPadding={0} cellSpacing={0}>
            <thead>
              <tr>
                <th style={st.th}>Ref</th>
                <th style={st.th}>Type</th>
                <th style={st.th}>Size</th>
                <th style={st.th}>Floor</th>
                <th style={st.th}>Price</th>
                <th style={st.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {d.units.map((u, i) => (
                <tr key={i} style={u.status === "key-ready" ? { backgroundColor: B.amberBg } : undefined}>
                  <td style={{ ...st.td, fontWeight: 600, fontSize: 12, color: B.muted }}>{u.ref}</td>
                  <td style={st.td}>{u.type}</td>
                  <td style={st.td}>{u.sqm} m²{u.terrace ? ` + ${u.terrace} m² terrace` : ""}</td>
                  <td style={st.td}>{u.floor || "—"}</td>
                  <td style={{ ...st.td, fontWeight: 600 }}>{u.price}</td>
                  <td style={st.td}><StatusBadge status={u.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Units cards (mobile) */}
          <div className="da-cards-show" style={{ display: "none" }}>
            {d.units.map((u, i) => (
              <div key={i} style={{
                padding: "14px 16px", marginBottom: 10, borderRadius: 4,
                border: `1px solid ${B.borderLight}`,
                backgroundColor: u.status === "key-ready" ? B.amberBg : B.white,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: B.muted, letterSpacing: "0.08em" }}>{u.ref}</span>
                  <StatusBadge status={u.status} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: B.darkText, margin: "0 0 4px" }}>{u.type}</p>
                <p style={{ fontSize: 12, color: B.muted, margin: "0 0 8px" }}>
                  {u.sqm} m²{u.terrace ? ` + ${u.terrace} m² terrace` : ""}{u.floor ? ` · Floor ${u.floor}` : ""}
                </p>
                <p style={{ fontSize: 16, fontWeight: 600, color: B.darkText, margin: 0 }}>{u.price}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={st.ctaWrap} className="da-cta-stack">
            <a href={d.ctaHref || "#"} style={st.ctaBtn}>
              {d.ctaText || "Download Full Price List"}
            </a>
            <a href="#" style={st.ctaBtnOutline}>
              Schedule a Site Visit
            </a>
          </div>

          {/* Contact */}
          {d.contactName && (
            <div style={{
              marginTop: 28, padding: "18px 24px", borderLeft: `3px solid ${B.accent}`,
              backgroundColor: B.bg, borderRadius: "0 4px 4px 0",
            }}>
              <p style={{ fontSize: 10, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: B.muted, margin: "0 0 6px" }}>Your Contact</p>
              <p style={{ fontSize: 14, fontWeight: 500, color: B.darkText, margin: "0 0 2px" }}>{d.contactName}</p>
              {d.contactPhone && <p style={{ fontSize: 13, color: B.muted, margin: "0 0 1px" }}>📞 {d.contactPhone}</p>}
              {d.contactEmail && <p style={{ fontSize: 13, color: B.muted, margin: 0 }}>✉ {d.contactEmail}</p>}
            </div>
          )}
        </div>

        {/* ── C: Footer ── */}
        <div style={st.footer}>
          <p style={st.footerText}>This is a confidential communication intended for real estate professionals.</p>
          <p style={st.footerText}>© {new Date().getFullYear()} Prestige Real Estate · Marbella</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SAMPLE DATA
   ══════════════════════════════════════════════════ */

const SAMPLE_STANDARD: DeveloperAvailabilityData = {
  projectName: "Marea Residences",
  projectLocation: "Altea, Costa Blanca",
  projectImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop",
  developerName: "Grupo Prasa",
  completionDate: "Q2 2027",
  constructionPercent: 55,
  totalUnits: 64,
  availableUnits: 28,
  keyReadyUnits: 0,
  recipientName: "Carlos",
  highlights: ["Sea Views", "Infinity Pool", "Underground Parking", "Gated Community", "Smart Home"],
  contactName: "Ana Martínez",
  contactPhone: "+34 622 000 111",
  contactEmail: "ana@prestige.es",
  units: [
    { ref: "MAR-A01", type: "2-Bed Apartment", sqm: 105, price: "€485,000", status: "available", floor: "1st", terrace: 28 },
    { ref: "MAR-A05", type: "2-Bed Apartment", sqm: 112, price: "€520,000", status: "available", floor: "2nd", terrace: 32 },
    { ref: "MAR-B02", type: "3-Bed Apartment", sqm: 148, price: "€695,000", status: "last-units", floor: "3rd", terrace: 40 },
    { ref: "MAR-C01", type: "3-Bed Penthouse", sqm: 195, price: "€890,000", status: "available", floor: "5th", terrace: 85 },
    { ref: "MAR-D01", type: "4-Bed Penthouse", sqm: 256, price: "€1,250,000", status: "reserved", floor: "6th", terrace: 120 },
  ],
};

const SAMPLE_KEY_READY: DeveloperAvailabilityData = {
  projectName: "Panorama Heights",
  projectLocation: "Nueva Andalucía, Marbella",
  projectImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=400&fit=crop",
  developerName: "Inmobiliaria del Sol",
  completionDate: "Delivered",
  constructionPercent: 100,
  totalUnits: 42,
  availableUnits: 8,
  keyReadyUnits: 5,
  recipientName: "James",
  highlights: ["Key Ready", "Golf Views", "Spa & Wellness", "Concierge Service", "Private Garden"],
  contactName: "Roberto López",
  contactPhone: "+34 633 222 444",
  contactEmail: "roberto@prestige.es",
  units: [
    { ref: "PAN-101", type: "2-Bed Apartment", sqm: 98, price: "€620,000", status: "key-ready", floor: "1st", terrace: 22 },
    { ref: "PAN-204", type: "2-Bed Apartment", sqm: 108, price: "€685,000", status: "key-ready", floor: "2nd", terrace: 30 },
    { ref: "PAN-305", type: "3-Bed Duplex", sqm: 172, price: "€945,000", status: "key-ready", floor: "3rd", terrace: 55 },
    { ref: "PAN-402", type: "3-Bed Penthouse", sqm: 210, price: "€1,350,000", status: "key-ready", floor: "4th", terrace: 90 },
    { ref: "PAN-403", type: "3-Bed Penthouse", sqm: 225, price: "€1,480,000", status: "key-ready", floor: "4th", terrace: 110 },
    { ref: "PAN-501", type: "2-Bed Garden Apt", sqm: 95, price: "€590,000", status: "available", floor: "GF" },
    { ref: "PAN-103", type: "2-Bed Apartment", sqm: 102, price: "€640,000", status: "last-units", floor: "1st", terrace: 24 },
    { ref: "PAN-201", type: "3-Bed Apartment", sqm: 155, price: "€870,000", status: "reserved", floor: "2nd", terrace: 42 },
  ],
};

const SAMPLES: Record<string, DeveloperAvailabilityData> = {
  standard: SAMPLE_STANDARD,
  "key-ready": SAMPLE_KEY_READY,
};

/* ══════════════════════════════════════════════════
   PREVIEW PAGE
   ══════════════════════════════════════════════════ */

export default function DeveloperAvailabilityPreviewPage() {
  const [params] = useSearchParams();
  const variant = params.get("variant") === "key-ready" ? "key-ready" : "standard";
  const current = SAMPLES[variant]!;

  const tabs = [
    { key: "standard", label: "Under Construction" },
    { key: "key-ready", label: "Key Ready" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "hsl(30 7% 89%)" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "20px 16px", flexWrap: "wrap" as const }}>
        {tabs.map((tab) => (
          <a
            key={tab.key}
            href={`?variant=${tab.key}`}
            style={{
              padding: "8px 20px", fontSize: 12, letterSpacing: "0.12em",
              textTransform: "uppercase" as const, textDecoration: "none",
              borderRadius: 2,
              backgroundColor: variant === tab.key ? "hsl(24 8% 11%)" : "hsl(0 0% 100%)",
              color: variant === tab.key ? "hsl(0 0% 100%)" : "hsl(25 5% 49%)",
              border: "1px solid hsl(0 0% 83%)",
            }}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <DeveloperAvailabilityEmail data={current} />
    </div>
  );
}
