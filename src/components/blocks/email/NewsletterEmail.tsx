/**
 * NEWSLETTER EMAIL TEMPLATES
 * Two variants:
 *   1. "blog"     — Weekly/monthly digest with featured articles
 *   2. "property" — Featured property spotlight
 * Uses inline styles only (email-client compatible).
 * Matches the luxury aesthetic of the other email templates.
 */

import { useSearchParams } from "react-router-dom";

/* ── Shared types ── */
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
  editorialTitle?: string;
  editorialIntro?: string;
  featuredArticle: BlogArticle;
  articles: BlogArticle[];
  ctaText?: string;
  ctaHref?: string;
}

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

type NewsletterEmailData = NewsletterBlogData | NewsletterPropertyData;

/* ── Palette (consistent with other emails) ── */
const B = {
  accent: "hsl(35 32% 41%)",
  accentLight: "hsl(35 28% 92%)",
  dark: "hsl(24 8% 11%)",
  darkSoft: "hsl(24 6% 18%)",
  muted: "hsl(25 5% 49%)",
  light: "hsl(25 5% 67%)",
  bg: "hsl(32 20% 96%)",
  white: "hsl(0 0% 100%)",
  border: "hsl(28 18% 88%)",
  borderLight: "hsl(28 18% 93%)",
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

  /* ── Issue bar ── */
  issueBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 42px",
    backgroundColor: "hsl(24 6% 14%)",
    borderTop: "1px solid hsl(0 0% 100% / 0.06)",
  } as React.CSSProperties,
  issueLabel: {
    fontSize: 10, letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: B.accent, fontWeight: 500, margin: 0,
  } as React.CSSProperties,
  issueDate: {
    fontSize: 10, letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "hsl(0 0% 100% / 0.45)", fontWeight: 300, margin: 0,
  } as React.CSSProperties,

  /* ── Typography ── */
  greeting: {
    fontSize: 22, fontWeight: 300, color: B.darkSoft,
    margin: "0 0 8px", letterSpacing: "0.01em",
  } as React.CSSProperties,
  intro: {
    fontSize: 13, color: B.muted, fontWeight: 300,
    margin: "0 0 32px", lineHeight: 1.72,
  } as React.CSSProperties,
  sectionLabel: {
    fontSize: 10, letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: B.muted, margin: "0 0 18px", fontWeight: 500,
  } as React.CSSProperties,

  /* ── Featured article card ── */
  featuredCard: {
    overflow: "hidden" as const,
    borderRadius: 3,
    border: `1px solid ${B.border}`,
    marginBottom: 32,
  } as React.CSSProperties,
  featuredImage: {
    width: "100%", height: 280,
    objectFit: "cover" as const,
    display: "block",
  } as React.CSSProperties,
  featuredBody: {
    padding: "22px 24px 26px",
  } as React.CSSProperties,
  featuredCategory: {
    fontSize: 10, letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: B.accent, fontWeight: 500, margin: "0 0 8px",
  } as React.CSSProperties,
  featuredTitle: {
    fontSize: 18, fontWeight: 400, color: B.darkSoft,
    margin: "0 0 8px", letterSpacing: "0.01em", lineHeight: 1.4,
  } as React.CSSProperties,
  featuredExcerpt: {
    fontSize: 13, color: B.muted, fontWeight: 300,
    margin: "0 0 16px", lineHeight: 1.7,
  } as React.CSSProperties,
  readMore: {
    fontSize: 11, letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: B.accent, fontWeight: 500,
    textDecoration: "none",
  } as React.CSSProperties,

  /* ── Article row (compact) ── */
  articleRow: {
    display: "flex",
    gap: 18,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottom: `1px solid ${B.borderLight}`,
  } as React.CSSProperties,
  articleImage: {
    width: 120, height: 84,
    objectFit: "cover" as const,
    borderRadius: 2,
    flexShrink: 0,
    display: "block",
  } as React.CSSProperties,
  articleBody: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
  } as React.CSSProperties,
  articleCategory: {
    fontSize: 9, letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: B.accent, fontWeight: 500, margin: "0 0 5px",
  } as React.CSSProperties,
  articleTitle: {
    fontSize: 14, fontWeight: 400, color: B.darkSoft,
    margin: "0 0 4px", lineHeight: 1.4, letterSpacing: "0.01em",
  } as React.CSSProperties,
  articleMeta: {
    fontSize: 11, color: B.light, fontWeight: 300, margin: 0,
  } as React.CSSProperties,

  /* ── Property card (for property variant) ── */
  propImageWrap: {
    overflow: "hidden" as const,
  } as React.CSSProperties,
  propImage: {
    width: "100%", height: 340,
    objectFit: "cover" as const,
    display: "block",
  } as React.CSSProperties,
  propInfoBar: {
    padding: "18px 28px",
    backgroundColor: "hsl(24 6% 14%)",
    borderTop: "1px solid hsl(0 0% 100% / 0.06)",
  } as React.CSSProperties,
  propRef: {
    margin: "0 0 6px",
    fontSize: 10, letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: B.accent, fontWeight: 500,
  } as React.CSSProperties,
  propTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 16, marginBottom: 8,
  } as React.CSSProperties,
  propTitle: {
    margin: 0, fontSize: 17, letterSpacing: "0.02em",
    color: B.white, fontWeight: 400,
  } as React.CSSProperties,
  propPrice: {
    margin: 0, fontSize: 17, color: B.white,
    fontWeight: 600, letterSpacing: "0.02em",
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,
  propMeta: {
    display: "flex", gap: 16, flexWrap: "wrap" as const,
  } as React.CSSProperties,
  propMetaItem: {
    fontSize: 11, color: "hsl(0 0% 100% / 0.5)",
    fontWeight: 300, letterSpacing: "0.04em",
  } as React.CSSProperties,

  /* ── Description ── */
  description: {
    fontSize: 13, color: B.muted, fontWeight: 300,
    lineHeight: 1.8, margin: "0 0 28px",
  } as React.CSSProperties,

  /* ── Highlights ── */
  highlightGrid: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 10,
    marginBottom: 28,
  } as React.CSSProperties,
  highlightPill: {
    display: "inline-block",
    fontSize: 11, fontWeight: 400,
    padding: "7px 16px",
    borderRadius: 2,
    backgroundColor: B.accentLight,
    color: B.darkSoft,
    letterSpacing: "0.02em",
  } as React.CSSProperties,

  /* ── Divider ── */
  divider: {
    border: "none", borderTop: `1px solid ${B.border}`,
    margin: "0 0 24px",
  } as React.CSSProperties,

  /* ── CTA ── */
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

  /* ── Agent row ── */
  agentRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "16px 20px",
    backgroundColor: B.bg,
    borderRadius: 3,
    marginBottom: 28,
    borderLeft: `3px solid ${B.accent}`,
  } as React.CSSProperties,
  agentIcon: {
    width: 38, height: 38,
    borderRadius: "50%",
    backgroundColor: B.dark,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    color: B.white, fontSize: 14, fontWeight: 300,
  } as React.CSSProperties,
  agentName: {
    fontSize: 13, fontWeight: 500, color: B.darkSoft, margin: "0 0 1px",
  } as React.CSSProperties,
  agentTitle: {
    fontSize: 11, color: B.muted, fontWeight: 300, margin: 0,
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

  /* ── Note ── */
  note: {
    fontSize: 12, color: B.muted, lineHeight: 1.7,
    margin: "24px 0 0", fontWeight: 300,
    textAlign: "center" as const,
  } as React.CSSProperties,
};

/* ══════════════════════════════════════════════
   BLOG / NEWS DIGEST VARIANT
   ══════════════════════════════════════════════ */
function BlogNewsletterEmail({ data }: { data: NewsletterBlogData }) {
  const featured = data.featuredArticle;
  const rest = data.articles;

  return (
    <div style={st.body}>
      <style>{`
        @media (max-width: 480px) {
          .nl-header { padding: 24px 20px 20px !important; }
          .nl-issue-bar { padding: 12px 20px !important; }
          .nl-content-inner { padding: 24px 20px 28px !important; }
          .nl-featured-img { height: 200px !important; }
          .nl-featured-body { padding: 16px 18px 20px !important; }
          .nl-featured-title { font-size: 16px !important; }
          .nl-article-row { flex-direction: column !important; gap: 10px !important; }
          .nl-article-img { width: 100% !important; height: 160px !important; }
          .nl-greeting { font-size: 19px !important; }
          .nl-intro { font-size: 12px !important; }
          .nl-cta { padding: 12px 28px !important; font-size: 10px !important; }
          .nl-footer { padding: 18px 20px !important; }
        }
      `}</style>
      <div style={st.wrapper}>
        {/* Header */}
        <div style={st.header} className="nl-header">
          <p style={st.logoName}>Prestige</p>
          <p style={st.logoSub}>Real Estate</p>
        </div>

        {/* Issue bar */}
        <div style={st.issueBar} className="nl-issue-bar">
          <p style={st.issueLabel}>
            {data.issueNumber ? `The Journal · Nº ${data.issueNumber}` : "The Journal"}
          </p>
          <p style={st.issueDate}>{data.issueDate || "Monthly Digest"}</p>
        </div>

        {/* Content */}
        <div style={st.contentBody}>
          <div style={st.contentInner} className="nl-content-inner">
            {/* Greeting */}
            <h1 style={st.greeting} className="nl-greeting">
              {data.fullName ? `Dear ${data.fullName}` : "Dear Reader"}
            </h1>
            <p style={st.intro} className="nl-intro">
              {data.editorialIntro ||
                "Here's your curated selection of the latest insights, market analysis, and lifestyle content from the Costa del Sol and beyond."}
            </p>

            {/* Featured article */}
            <p style={st.sectionLabel}>Featured Story</p>
            <div style={st.featuredCard}>
              <img
                src={featured.image}
                alt=""
                style={st.featuredImage}
                className="nl-featured-img"
              />
              <div style={st.featuredBody} className="nl-featured-body">
                <p style={st.featuredCategory}>{featured.category}</p>
                <h2 style={st.featuredTitle} className="nl-featured-title">{featured.title}</h2>
                <p style={st.featuredExcerpt}>{featured.excerpt}</p>
                <a href={featured.href || "#"} style={st.readMore}>
                  Read Article →
                </a>
              </div>
            </div>

            {/* More articles */}
            {rest.length > 0 && (
              <>
                <p style={st.sectionLabel}>Also in this issue</p>
                {rest.map((article, i) => (
                  <div
                    key={i}
                    style={{
                      ...st.articleRow,
                      ...(i === rest.length - 1
                        ? { borderBottom: "none", marginBottom: 8, paddingBottom: 8 }
                        : {}),
                    }}
                    className="nl-article-row"
                  >
                    <img
                      src={article.image}
                      alt=""
                      style={st.articleImage}
                      className="nl-article-img"
                    />
                    <div style={st.articleBody}>
                      <p style={st.articleCategory}>{article.category}</p>
                      <p style={st.articleTitle}>{article.title}</p>
                      {article.readTime && (
                        <p style={st.articleMeta}>{article.readTime} read</p>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            <hr style={st.divider} />

            {/* CTA */}
            <div style={st.ctaWrap}>
              <a href={data.ctaHref || "#"} style={st.cta} className="nl-cta">
                {data.ctaText || "Explore The Journal"}
              </a>
            </div>

            <p style={st.note}>
              You're receiving this because you subscribed to our newsletter.
              <br />
              <a href="#" style={{ color: B.muted, fontSize: 12 }}>Manage preferences</a>
              {" · "}
              <a href="#" style={{ color: B.muted, fontSize: 12 }}>Unsubscribe</a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={st.footer} className="nl-footer">
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

/* ══════════════════════════════════════════════
   FEATURED PROPERTY VARIANT
   ══════════════════════════════════════════════ */
function PropertyNewsletterEmail({ data }: { data: NewsletterPropertyData }) {
  const specs = data.propertySpecs;

  return (
    <div style={st.body}>
      <style>{`
        @media (max-width: 480px) {
          .nl-header { padding: 24px 20px 20px !important; }
          .nl-prop-img { height: 220px !important; }
          .nl-prop-bar { padding: 14px 18px !important; }
          .nl-prop-title-row { flex-direction: column !important; gap: 4px !important; align-items: flex-start !important; }
          .nl-prop-title { font-size: 14px !important; }
          .nl-prop-price { font-size: 14px !important; }
          .nl-content-inner { padding: 24px 20px 28px !important; }
          .nl-greeting { font-size: 19px !important; }
          .nl-intro { font-size: 12px !important; }
          .nl-cta { padding: 12px 28px !important; font-size: 10px !important; }
          .nl-cta-secondary { display: block !important; margin: 10px auto 0 !important; }
          .nl-footer { padding: 18px 20px !important; }
          .nl-highlights { gap: 6px !important; }
          .nl-highlight-pill { font-size: 10px !important; padding: 5px 12px !important; }
        }
      `}</style>
      <div style={st.wrapper}>
        {/* Header */}
        <div style={st.header} className="nl-header">
          <p style={st.logoName}>Prestige</p>
          <p style={st.logoSub}>Real Estate</p>
        </div>

        {/* Property hero */}
        <div style={{ backgroundColor: B.dark }}>
          <div style={st.propImageWrap}>
            <img
              src={data.propertyImage}
              alt=""
              style={st.propImage}
              className="nl-prop-img"
            />
          </div>
          <div style={st.propInfoBar} className="nl-prop-bar">
            {data.propertyRef && <p style={st.propRef}>REF {data.propertyRef}</p>}
            <div style={st.propTitleRow} className="nl-prop-title-row">
              <p style={st.propTitle} className="nl-prop-title">{data.propertyTitle}</p>
              <p style={st.propPrice} className="nl-prop-price">{data.propertyPrice}</p>
            </div>
            <div style={st.propMeta}>
              <span style={st.propMetaItem}>📍 {data.propertyLocation}</span>
              {specs?.beds && <span style={st.propMetaItem}>{specs.beds} Beds</span>}
              {specs?.baths && <span style={st.propMetaItem}>{specs.baths} Baths</span>}
              {specs?.sqm && <span style={st.propMetaItem}>{specs.sqm} m²</span>}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={st.contentBody}>
          <div style={st.contentInner} className="nl-content-inner">
            {/* Greeting */}
            <h1 style={st.greeting} className="nl-greeting">
              {data.fullName
                ? `Exclusively for you, ${data.fullName}`
                : "A property you'll love"}
            </h1>
            <p style={st.intro} className="nl-intro">
              We've handpicked this exceptional property based on your preferences and search history.
              Take a closer look at what could be your next home or investment.
            </p>

            {/* Description */}
            {data.propertyDescription && (
              <>
                <p style={st.sectionLabel}>About this property</p>
                <p style={st.description}>{data.propertyDescription}</p>
              </>
            )}

            {/* Highlights */}
            {data.highlights && data.highlights.length > 0 && (
              <>
                <p style={st.sectionLabel}>Key highlights</p>
                <div style={st.highlightGrid} className="nl-highlights">
                  {data.highlights.map((h, i) => (
                    <span key={i} style={st.highlightPill} className="nl-highlight-pill">
                      {h}
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* Agent */}
            {data.agentName && (
              <div style={st.agentRow}>
                <div style={st.agentIcon}>
                  {data.agentName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={st.agentName}>{data.agentName}</p>
                  <p style={st.agentTitle}>{data.agentTitle || "Property Advisor"}</p>
                </div>
              </div>
            )}

            <hr style={st.divider} />

            {/* CTA */}
            <div style={st.ctaWrap}>
              <a href={data.ctaHref || "#"} style={st.cta} className="nl-cta">
                {data.ctaText || "View Full Details"}
              </a>
              <a href="#" style={st.ctaSecondary} className="nl-cta-secondary">
                Schedule a Visit
              </a>
            </div>

            <p style={st.note}>
              You're receiving this because you subscribed to property alerts.
              <br />
              <a href="#" style={{ color: B.muted, fontSize: 12 }}>Manage preferences</a>
              {" · "}
              <a href="#" style={{ color: B.muted, fontSize: 12 }}>Unsubscribe</a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={st.footer} className="nl-footer">
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

/* ── Main router ── */
export function NewsletterEmail({ data }: { data: NewsletterEmailData }) {
  if (data.variant === "blog") return <BlogNewsletterEmail data={data} />;
  return <PropertyNewsletterEmail data={data} />;
}

/* ══════════════════════════════════════════════
   SAMPLE DATA
   ══════════════════════════════════════════════ */
const SAMPLE_BLOG: NewsletterBlogData = {
  variant: "blog",
  fullName: "María García",
  issueNumber: "47",
  issueDate: "March 2026",
  editorialIntro:
    "Spring has arrived on the Costa del Sol, and with it a renewed energy in the luxury property market. This month we explore the latest trends, a stunning new development, and the region's most coveted addresses.",
  featuredArticle: {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
    category: "Market Analysis",
    title: "Costa del Sol 2026: Why International Buyers Are Looking Beyond the Golden Mile",
    excerpt:
      "New data reveals a significant shift in buyer preferences — from traditional hotspots toward emerging areas like Estepona, Benahavís, and the East Coast. We break down the numbers and what they mean for investors.",
    readTime: "6 min",
  },
  articles: [
    {
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      category: "Architecture",
      title: "The Rise of Biophilic Design in Mediterranean Luxury Homes",
      readTime: "4 min",
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
      category: "Lifestyle",
      title: "Michelin Stars & Sea Breeze: Marbella's Culinary Renaissance",
      readTime: "5 min",
    },
    {
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
      category: "Investment",
      title: "Branded Residences: The New Frontier of Luxury Real Estate Investment",
      readTime: "7 min",
    },
  ],
};

const SAMPLE_PROPERTY: NewsletterPropertyData = {
  variant: "property",
  fullName: "James Whitfield",
  propertyTitle: "Villa Serenity — Contemporary Masterpiece",
  propertyLocation: "La Zagaleta, Benahavís",
  propertyPrice: "€7,950,000",
  propertyRef: "PRE-5290",
  propertyImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1280&h=720&fit=crop",
  propertySpecs: { beds: 6, baths: 7, sqm: 1240 },
  propertyDescription:
    "Set within the exclusive La Zagaleta estate, this newly completed contemporary villa offers panoramic sea and mountain views from every room. Designed by a renowned Marbella architect, the property seamlessly blends indoor and outdoor living across three expansive levels. The infinity pool appears to merge with the Mediterranean horizon, while floor-to-ceiling glass walls flood every space with natural light.",
  highlights: [
    "Sea & Mountain Views",
    "Infinity Pool",
    "Private Cinema",
    "Wine Cellar",
    "Smart Home",
    "Triple Garage",
    "Spa & Gym",
    "Gated Community",
  ],
  agentName: "Carlos Mendoza",
  agentTitle: "Senior Property Advisor · La Zagaleta Specialist",
};

const SAMPLES: Record<string, NewsletterEmailData> = {
  blog: SAMPLE_BLOG,
  property: SAMPLE_PROPERTY,
};

/* ── Preview page ── */
export default function NewsletterEmailPreviewPage() {
  const [params] = useSearchParams();
  const variant = params.get("variant") === "property" ? "property" : "blog";
  const current = SAMPLES[variant]!;

  const tabs = [
    { key: "blog", label: "Blog / News Digest" },
    { key: "property", label: "Featured Property" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "hsl(30 7% 89%)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          padding: "20px 16px",
          flexWrap: "wrap" as const,
        }}
      >
        {tabs.map((tab) => (
          <a
            key={tab.key}
            href={`?variant=${tab.key}`}
            style={{
              padding: "8px 20px",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              borderRadius: 2,
              backgroundColor:
                variant === tab.key ? "hsl(24 8% 11%)" : "hsl(0 0% 100%)",
              color:
                variant === tab.key ? "hsl(0 0% 100%)" : "hsl(25 5% 49%)",
              border: "1px solid hsl(0 0% 83%)",
            }}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <NewsletterEmail data={current} />
    </div>
  );
}
