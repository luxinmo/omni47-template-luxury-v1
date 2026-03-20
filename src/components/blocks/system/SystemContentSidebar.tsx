/**
 * SYSTEM CONTENT SIDEBAR (V2 Layout)
 * Editorial page layout with main content + right sidebar.
 * Features: breadcrumb, bold uppercase title, hero image, table of contents,
 * justified article content, sidebar with related pages + external links + CTA card.
 * Origin: SystemPageV2
 * Route: /page2/:slug
 *
 * Props:
 * - breadcrumbItems: array of { label, href? } for breadcrumb trail
 * - title: page title (rendered uppercase bold)
 * - subtitle: optional intro paragraph
 * - image: optional hero image URL
 * - toc: optional table of contents items { id, label }
 * - content: HTML string for the article body
 * - sidebarPages: array of { label, href } for related pages sidebar
 * - sidebarPortals: array of { label, href } for external portals sidebar
 * - currentSlug: current page slug (for active sidebar highlighting)
 * - showCta: show contact CTA card in sidebar
 */

import { Link } from "react-router-dom";
import { ChevronRight, ExternalLink } from "lucide-react";
import { palette, fonts, brand } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TocItem {
  id: string;
  label: string;
}

interface SidebarLink {
  label: string;
  href: string;
}

interface SystemContentSidebarProps {
  breadcrumbItems?: BreadcrumbItem[];
  title?: string;
  subtitle?: string;
  image?: string;
  toc?: TocItem[];
  content?: string;
  sidebarPages?: SidebarLink[];
  sidebarPortals?: SidebarLink[];
  currentSlug?: string;
  showCta?: boolean;
}

const DEMO_TOC: TocItem[] = [
  { id: "mission", label: "Our Mission" },
  { id: "story", label: "Our Story" },
  { id: "why", label: "Why Choose Us" },
  { id: "values", label: "Our Values" },
];

const DEMO_PAGES: SidebarLink[] = [
  { label: "About Us", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Our Services", href: "#" },
  { label: "Contact", href: "#" },
];

const DEMO_PORTALS: SidebarLink[] = [
  { label: "Idealista", href: "#" },
  { label: "Fotocasa", href: "#" },
  { label: "Kyero", href: "#" },
  { label: "ThinkSpain", href: "#" },
  { label: "Rightmove", href: "#" },
];

const DEMO_CONTENT = `
  <h2 id="mission">OUR MISSION</h2>
  <p>We connect discerning international buyers with exceptional properties through a bespoke service built on trust, discretion, and an uncompromising eye for quality.</p>
  <h2 id="story">OUR STORY</h2>
  <p>Founded in <strong>2010</strong>, our firm has grown from a boutique consultancy to a leading luxury real estate advisory serving clients across Europe and beyond.</p>
  <h2 id="why">WHY CHOOSE US</h2>
  <p>With exclusive access to off-market listings, proven negotiation expertise, and a white-glove concierge service, we ensure every client receives a seamless, personalised experience.</p>
  <ul>
    <li><strong>Exclusive Listings</strong>: Access to properties not available on public portals</li>
    <li><strong>Multilingual Team</strong>: Advisors speak <strong>8 languages</strong></li>
    <li><strong>Legal & Tax Advisory</strong>: Comprehensive support through specialist networks</li>
  </ul>
  <h2 id="values">OUR VALUES</h2>
  <ul>
    <li><strong>Discretion</strong> — Privacy is paramount</li>
    <li><strong>Excellence</strong> — Highest standards of service</li>
    <li><strong>Integrity</strong> — Transparency guides every interaction</li>
    <li><strong>Innovation</strong> — Technology-enhanced advisory</li>
  </ul>
`;

const SystemContentSidebar = ({
  breadcrumbItems = [{ label: brand.name, href: "/" }, { label: "About Us" }],
  title = `ABOUT ${brand.fullName}`,
  subtitle = "A curated luxury real estate advisory specialising in the most exclusive properties across the Mediterranean.",
  image = heroImg,
  toc = DEMO_TOC,
  content = DEMO_CONTENT,
  sidebarPages = DEMO_PAGES,
  sidebarPortals = DEMO_PORTALS,
  currentSlug = "about",
  showCta = true,
}: SystemContentSidebarProps) => (
  <div>
    {/* Breadcrumb */}
    <nav className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 sm:pt-10">
      <div className="flex items-center gap-1.5 text-[12px]" style={{ color: palette.textLight }}>
        {breadcrumbItems.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3" />}
            {item.href ? (
              <Link to={item.href} className="hover:underline" style={{ color: palette.accent }}>{item.label}</Link>
            ) : (
              <span style={{ color: palette.text }}>{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>

    {/* Title */}
    <header className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-6">
      <h1
        className="text-[28px] sm:text-[36px] md:text-[42px] font-bold tracking-tight leading-[1.1]"
        style={{ color: palette.text, fontFamily: fonts.heading }}
      >
        {title}
      </h1>
    </header>

    {/* Hero Image */}
    {image && (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-8">
        <div className="relative overflow-hidden rounded-sm aspect-[2.2/1]">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
    )}

    {/* Main Grid */}
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
      {/* Content */}
      <div>
        {subtitle && (
          <p className="text-[15px] leading-[1.8] mb-6" style={{ color: palette.textMuted }}>{subtitle}</p>
        )}

        {toc && toc.length > 0 && (
          <div className="rounded-sm p-5 mb-8" style={{ background: palette.bg, border: `1px solid ${palette.border}` }}>
            <p className="text-[13px] font-semibold mb-3" style={{ color: palette.text }}>Contents</p>
            <ul className="space-y-1.5">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-[13px] hover:underline" style={{ color: palette.textMuted }}>
                    • {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <article className="sys-v2-content" dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* Sidebar */}
      <aside className="space-y-8">
        {sidebarPages.length > 0 && (
          <div className="rounded-sm p-5" style={{ border: `1px solid ${palette.border}` }}>
            <p className="text-[14px] font-semibold mb-4 pb-3" style={{ color: palette.text, borderBottom: `1px solid ${palette.border}` }}>
              Other Pages
            </p>
            <ul>
              {sidebarPages.map((item) => (
                <li key={item.href} className="border-b last:border-b-0" style={{ borderColor: palette.border }}>
                  <Link
                    to={item.href}
                    className="flex items-center py-3 text-[13px] transition-colors hover:opacity-70"
                    style={{
                      color: item.href.includes(currentSlug) ? palette.accent : palette.text,
                      fontWeight: item.href.includes(currentSlug) ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {sidebarPortals.length > 0 && (
          <div className="rounded-sm p-5" style={{ border: `1px solid ${palette.border}` }}>
            <p className="text-[14px] font-semibold mb-4 pb-3" style={{ color: palette.text, borderBottom: `1px solid ${palette.border}` }}>
              Real Estate Portals
            </p>
            <ul>
              {sidebarPortals.map((item) => (
                <li key={item.label} className="border-b last:border-b-0" style={{ borderColor: palette.border }}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-3 text-[13px] hover:opacity-70"
                    style={{ color: palette.text }}
                  >
                    <span className="font-medium">{item.label}</span>
                    <ExternalLink className="w-3 h-3" style={{ color: palette.textLight }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showCta && (
          <div className="rounded-sm p-6 text-center" style={{ background: palette.bg }}>
            <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: palette.accent }}>Need help?</p>
            <p className="text-[18px] font-light mb-3" style={{ color: palette.text, fontFamily: fonts.heading }}>Speak to an Advisor</p>
            <p className="text-[12px] leading-[1.6] mb-4" style={{ color: palette.textMuted }}>Our multilingual team is available to assist you.</p>
            <Link
              to="/contact"
              className="inline-block px-6 py-2.5 text-[12px] tracking-[0.1em] uppercase hover:opacity-90"
              style={{ background: palette.accent, color: palette.white }}
            >
              Contact Us
            </Link>
          </div>
        )}
      </aside>
    </div>

    <style>{`
      .sys-v2-content { font-size: 15px; line-height: 1.85; color: ${palette.textMuted}; font-family: ${fonts.body}; }
      .sys-v2-content h2 { font-size: 18px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; margin: 2.5em 0 0.8em; color: ${palette.text}; font-family: ${fonts.heading}; }
      .sys-v2-content h2:first-child { margin-top: 0; }
      .sys-v2-content p { margin-bottom: 1.2em; text-align: justify; }
      .sys-v2-content a { color: ${palette.accent}; text-decoration: underline; }
      .sys-v2-content ul { list-style: disc; padding-left: 1.2em; margin-bottom: 1.5em; }
      .sys-v2-content li { padding: 4px 0; font-size: 14px; line-height: 1.7; }
      .sys-v2-content strong { color: ${palette.text}; font-weight: 600; }
      .sys-v2-content .page-image { margin: 2em 0; }
      .sys-v2-content .page-image img { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 2px; }
      .sys-v2-content .img-caption { display: block; font-size: 11px; color: ${palette.textLight}; margin-top: 6px; font-style: italic; }
    `}</style>
  </div>
);

export default SystemContentSidebar;
