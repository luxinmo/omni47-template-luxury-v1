/**
 * PRICE ALERT EMAIL TEMPLATE
 * Two variants:
 *   1. "price-drop"  — property price has decreased
 *   2. "withdrawn"   — property has been removed from the market
 * Uses inline styles only (email-client compatible).
 * Property card is compact/inline (not a big hero image).
 */

import { useSearchParams } from "react-router-dom";

interface PriceAlertEmailData {
  variant: "price-drop" | "withdrawn";
  fullName?: string;
  propertyTitle?: string;
  propertyLocation?: string;
  propertyRef?: string;
  propertyImage?: string;
  propertySpecs?: { beds?: number; baths?: number; sqm?: number };
  /* price-drop specific */
  previousPrice?: string;
  newPrice?: string;
  dropPercent?: string;
  /* withdrawn specific */
  lastKnownPrice?: string;
}

/* ── Palette (matches enquiry email) ── */
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
  green: "hsl(145 45% 38%)",
  greenBg: "hsl(145 40% 95%)",
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

  /* ── Header ── */
  header: {
    backgroundColor: B.dark,
    textAlign: "center" as const,
    padding: "34px 42px 28px",
  } as React.CSSProperties,
  logoName: {
    fontSize: 18, fontWeight: 300, letterSpacing: "0.42em",
    color: B.white, margin: "0 0 2px",
    textTransform: "uppercase" as const,
  } as React.CSSProperties,
  logoSub: {
    fontSize: 8, letterSpacing: "0.5em",
    textTransform: "uppercase" as const,
    color: "hsl(0 0% 100% / 0.48)", margin: 0,
  } as React.CSSProperties,

  /* ── Content body ── */
  contentBody: {
    backgroundColor: B.white,
  } as React.CSSProperties,
  contentInner: {
    padding: "34px 42px 42px",
  } as React.CSSProperties,

  /* ── Badge ── */
  badgeWrap: {
    marginBottom: 20,
  } as React.CSSProperties,
  badge: {
    display: "inline-block",
    fontSize: 10, letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    fontWeight: 600, padding: "5px 14px",
    borderRadius: 2,
  } as React.CSSProperties,

  greeting: {
    fontSize: 22, fontWeight: 300, color: B.darkSoft,
    margin: "0 0 8px", letterSpacing: "0.01em",
  } as React.CSSProperties,
  intro: {
    fontSize: 13, color: B.muted, fontWeight: 300,
    margin: "0 0 28px", lineHeight: 1.72,
  } as React.CSSProperties,

  /* ── Property card (compact inline) ── */
  card: {
    display: "flex",
    border: `1px solid ${B.border}`,
    borderRadius: 3,
    overflow: "hidden" as const,
    marginBottom: 28,
  } as React.CSSProperties,
  cardImage: {
    width: 180, minHeight: 140,
    objectFit: "cover" as const,
    display: "block", flexShrink: 0,
  } as React.CSSProperties,
  cardBody: {
    padding: "16px 20px",
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
  } as React.CSSProperties,
  cardRef: {
    fontSize: 10, letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: B.muted, margin: "0 0 6px", fontWeight: 500,
  } as React.CSSProperties,
  cardTitle: {
    fontSize: 15, fontWeight: 400, color: B.darkSoft,
    margin: "0 0 4px", letterSpacing: "0.01em",
  } as React.CSSProperties,
  cardLocation: {
    fontSize: 12, color: B.muted, margin: "0 0 12px",
    fontWeight: 300,
  } as React.CSSProperties,
  cardSpecs: {
    display: "flex", gap: 14, flexWrap: "wrap" as const,
    marginBottom: 12,
  } as React.CSSProperties,
  cardSpec: {
    fontSize: 11, color: B.light, fontWeight: 300,
  } as React.CSSProperties,

  /* ── Price highlight ── */
  priceRow: {
    display: "flex", alignItems: "baseline", gap: 10,
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  newPrice: {
    fontSize: 18, fontWeight: 600, margin: 0,
    letterSpacing: "0.02em",
  } as React.CSSProperties,
  oldPrice: {
    fontSize: 13, color: B.light, margin: 0,
    textDecoration: "line-through",
    fontWeight: 300,
  } as React.CSSProperties,
  dropBadge: {
    fontSize: 11, fontWeight: 600, padding: "2px 8px",
    borderRadius: 2, backgroundColor: B.greenBg,
    color: B.green,
  } as React.CSSProperties,

  /* ── Info box ── */
  infoBox: {
    backgroundColor: B.bg,
    borderRadius: 3, padding: "16px 20px",
    fontSize: 13, color: B.darkSoft,
    lineHeight: 1.7, fontWeight: 300,
    margin: "0 0 28px",
    borderLeft: `3px solid ${B.accent}`,
  } as React.CSSProperties,

  divider: {
    border: "none", borderTop: `1px solid ${B.border}`,
    margin: "0 0 24px",
  } as React.CSSProperties,
  sectionLabel: {
    fontSize: 10, letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: B.muted, margin: "0 0 14px", fontWeight: 500,
  } as React.CSSProperties,

  ctaWrap: {
    textAlign: "center" as const, padding: "4px 0 0",
  } as React.CSSProperties,
  cta: {
    display: "inline-block",
    backgroundColor: B.accent, color: B.white,
    fontSize: 11, letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    fontWeight: 500, padding: "14px 36px",
    borderRadius: 2, textDecoration: "none",
  } as React.CSSProperties,
  ctaSecondary: {
    display: "inline-block",
    backgroundColor: "transparent",
    color: B.accent,
    fontSize: 11, letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    fontWeight: 500, padding: "12px 28px",
    borderRadius: 2, textDecoration: "none",
    border: `1px solid ${B.accent}`,
    marginLeft: 12,
  } as React.CSSProperties,

  note: {
    fontSize: 12, color: B.muted, lineHeight: 1.7,
    margin: "24px 0 0", fontWeight: 300,
    textAlign: "center" as const,
  } as React.CSSProperties,

  /* ── Footer ── */
  footer: {
    padding: "24px 40px",
    backgroundColor: B.bg,
    textAlign: "center" as const,
  } as React.CSSProperties,
  footerText: {
    fontSize: 11, color: B.light, margin: "0 0 2px",
    letterSpacing: "0.03em",
  } as React.CSSProperties,
};

/* ── Main template ── */
export function PriceAlertEmail({ data }: { data: PriceAlertEmailData }) {
  const isPriceDrop = data.variant === "price-drop";
  const specs = data.propertySpecs;

  return (
    <div style={st.body}>
      <style>{`
        @media (max-width: 480px) {
          .pa-header { padding: 24px 20px 20px !important; }
          .pa-content-inner { padding: 24px 20px 28px !important; }
          .pa-card { flex-direction: column !important; }
          .pa-card-img { width: 100% !important; height: 180px !important; min-height: auto !important; }
          .pa-card-body { padding: 14px 16px !important; }
          .pa-greeting { font-size: 19px !important; }
          .pa-intro { font-size: 12px !important; }
          .pa-new-price { font-size: 16px !important; }
          .pa-cta { padding: 12px 28px !important; font-size: 10px !important; }
          .pa-cta-secondary { display: block !important; margin: 10px auto 0 !important; }
          .pa-footer { padding: 18px 20px !important; }
        }
      `}</style>
      <div style={st.wrapper}>
        {/* Header */}
        <div style={st.header} className="pa-header">
          <p style={st.logoName}>Prestige</p>
          <p style={st.logoSub}>Real Estate</p>
        </div>

        {/* Content */}
        <div style={st.contentBody}>
          <div style={st.contentInner} className="pa-content-inner">
            {/* Variant badge */}
            <div style={st.badgeWrap}>
              <span
                style={{
                  ...st.badge,
                  backgroundColor: isPriceDrop ? B.greenBg : B.redBg,
                  color: isPriceDrop ? B.green : B.red,
                }}
              >
                {isPriceDrop ? "▼ Price Drop" : "● Withdrawn"}
              </span>
            </div>

            {/* Greeting */}
            <h1 style={st.greeting} className="pa-greeting">
              {data.fullName
                ? isPriceDrop
                  ? `Great news, ${data.fullName}`
                  : `Dear ${data.fullName}`
                : isPriceDrop
                  ? "Great news"
                  : "Important update"}
            </h1>
            <p style={st.intro} className="pa-intro">
              {isPriceDrop
                ? "A property on your watchlist has just reduced its asking price. Here are the updated details:"
                : "We'd like to inform you that a property you were following has been withdrawn from the market."}
            </p>

            {/* Compact property card */}
            <div style={st.card} className="pa-card">
              {data.propertyImage && (
                <img
                  src={data.propertyImage}
                  alt=""
                  style={st.cardImage}
                  className="pa-card-img"
                />
              )}
              <div style={st.cardBody} className="pa-card-body">
                {data.propertyRef && (
                  <p style={st.cardRef}>REF-{data.propertyRef}</p>
                )}
                <p style={st.cardTitle}>{data.propertyTitle || "Property"}</p>
                {data.propertyLocation && (
                  <p style={st.cardLocation}>📍 {data.propertyLocation}</p>
                )}
                {specs && (
                  <div style={st.cardSpecs}>
                    {specs.beds && <span style={st.cardSpec}>{specs.beds} 🛏</span>}
                    {specs.baths && <span style={st.cardSpec}>{specs.baths} 🚿</span>}
                    {specs.sqm && <span style={st.cardSpec}>{specs.sqm} m²</span>}
                  </div>
                )}

                {/* Price display */}
                {isPriceDrop ? (
                  <div style={st.priceRow}>
                    <p style={{ ...st.newPrice, color: B.green }} className="pa-new-price">
                      {data.newPrice}
                    </p>
                    {data.previousPrice && (
                      <p style={st.oldPrice}>{data.previousPrice}</p>
                    )}
                    {data.dropPercent && (
                      <span style={st.dropBadge}>-{data.dropPercent}</span>
                    )}
                  </div>
                ) : (
                  <div style={st.priceRow}>
                    <p style={{ ...st.newPrice, color: B.muted, textDecoration: "line-through" }} className="pa-new-price">
                      {data.lastKnownPrice}
                    </p>
                    <span style={{ fontSize: 11, color: B.red, fontWeight: 500 }}>
                      No longer available
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Context info */}
            <div style={st.infoBox}>
              {isPriceDrop
                ? "This is an exclusive alert based on your saved preferences. Price reductions on premium properties are often short-lived — we recommend acting promptly if you're interested."
                : "Properties are sometimes withdrawn temporarily for renovations, ownership changes, or strategic repositioning. If you'd like, we can notify you should this property return to the market, or suggest similar alternatives in the area."}
            </div>

            <hr style={st.divider} />

            {/* CTA */}
            <div style={st.ctaWrap}>
              {isPriceDrop ? (
                <>
                  <a href="#" style={st.cta} className="pa-cta">View Property</a>
                  <a href="#" style={st.ctaSecondary} className="pa-cta-secondary">Contact Advisor</a>
                </>
              ) : (
                <>
                  <a href="#" style={st.cta} className="pa-cta">View Similar Properties</a>
                  <a href="#" style={st.ctaSecondary} className="pa-cta-secondary">Contact Advisor</a>
                </>
              )}
            </div>

            <p style={st.note}>
              You are receiving this email because you set up a price alert for this property.
              <br />
              <a href="#" style={{ color: B.muted, fontSize: 12 }}>Manage your alerts</a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={st.footer} className="pa-footer">
          <p style={st.footerText}>+34 600 000 000 · hello@prestigeestates.com</p>
          <p style={st.footerText}>Marbella, Spain</p>
          <p style={{ ...st.footerText, marginTop: 10, color: "hsl(0 0% 83%)" }}>
            © {new Date().getFullYear()} Prestige Real Estate
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Sample data ── */
const SAMPLE_PRICE_DROP: PriceAlertEmailData = {
  variant: "price-drop",
  fullName: "James Whitfield",
  propertyTitle: "Villa Panorámica",
  propertyLocation: "Altea, Costa Blanca",
  propertyRef: "1234",
  propertyImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop",
  propertySpecs: { beds: 4, baths: 3, sqm: 280 },
  previousPrice: "€1.400.000",
  newPrice: "€1.200.000",
  dropPercent: "14%",
};

const SAMPLE_WITHDRAWN: PriceAlertEmailData = {
  variant: "withdrawn",
  fullName: "María García",
  propertyTitle: "Ático Marbella Golden Mile",
  propertyLocation: "Golden Mile, Marbella",
  propertyRef: "3887",
  propertyImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
  propertySpecs: { beds: 3, baths: 3, sqm: 285 },
  lastKnownPrice: "€2.800.000",
};

const SAMPLES: Record<string, PriceAlertEmailData> = {
  "price-drop": SAMPLE_PRICE_DROP,
  withdrawn: SAMPLE_WITHDRAWN,
};

export default function PriceAlertEmailPreviewPage() {
  const [params] = useSearchParams();
  const variant = params.get("variant") === "withdrawn" ? "withdrawn" : "price-drop";
  const current = SAMPLES[variant]!;

  const tabs = [
    { key: "price-drop", label: "Price drop" },
    { key: "withdrawn", label: "Withdrawn" },
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
      <PriceAlertEmail data={current} />
    </div>
  );
}
