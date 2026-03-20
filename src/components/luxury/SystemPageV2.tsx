import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { palette, fonts, brand, navLeft, navRight } from "@/config/template";
import SEOHead from "@/components/shared/SEOHead";
import heroImg from "@/assets/luxury-hero.jpg";
import propertyDetail1 from "@/assets/property-detail-1.jpg";
import { ChevronRight, ExternalLink } from "lucide-react";

/* ─── Sidebar: Related Pages ─── */
const RELATED_PAGES = [
  { label: "About Us", href: "/page2/about" },
  { label: "Terms & Conditions", href: "/page2/terms" },
  { label: "Privacy Policy", href: "/page2/privacy" },
  { label: "Our Services", href: "/page2/services" },
  { label: "Sell Your Property", href: "/sell" },
  { label: "Contact", href: "/contact" },
];

const EXTERNAL_LINKS = [
  { label: "Idealista", href: "https://idealista.com" },
  { label: "Fotocasa", href: "https://fotocasa.es" },
  { label: "Kyero", href: "https://kyero.com" },
  { label: "ThinkSpain", href: "https://thinkspain.com" },
  { label: "Rightmove", href: "https://rightmove.co.uk" },
  { label: "JamesEdition", href: "https://jamesedition.com" },
];

/* ─── Page Content ─── */
const PAGES: Record<string, {
  title: string;
  subtitle?: string;
  image?: string;
  breadcrumb: string;
  content: string;
  toc?: { id: string; label: string }[];
}> = {
  about: {
    title: `About ${brand.fullName}`,
    subtitle: "A curated luxury real estate advisory specialising in the most exclusive properties across the Mediterranean.",
    image: heroImg,
    breadcrumb: "About Us",
    toc: [
      { id: "mission", label: "Our Mission" },
      { id: "story", label: "Our Story" },
      { id: "why", label: "Why Choose Us" },
      { id: "values", label: "Our Values" },
    ],
    content: `
      <h2 id="mission">OUR MISSION</h2>
      <p>We connect discerning international buyers with exceptional properties through a bespoke service built on trust, discretion, and an uncompromising eye for quality.</p>
      <p>${brand.fullName} has established itself as a trusted partner for high-net-worth individuals seeking prime real estate opportunities across Spain's most coveted coastal and urban destinations.</p>

      <h2 id="story">OUR STORY</h2>
      <p>Founded in <strong>2010</strong>, ${brand.fullName} has grown from a boutique consultancy in Marbella to a leading luxury real estate firm serving clients across Europe and beyond. Our team of multilingual advisors brings decades of combined experience in <strong>luxury property, finance, and international law</strong>.</p>
      <div class="page-image"><img src="${propertyDetail1}" alt="Our offices" /><span class="img-caption">Our Marbella headquarters on the Golden Mile</span></div>

      <h2 id="why">WHY CHOOSE US</h2>
      <p>With exclusive access to off-market listings, proven negotiation expertise, and a white-glove concierge service, we ensure every client receives a seamless, personalised experience.</p>
      <p>Some of the main services offered by ${brand.fullName} include:</p>
      <ul>
        <li><strong>Exclusive Listings</strong>: Access to properties not available on public portals, ensuring our clients see opportunities before anyone else.</li>
        <li><strong>Multilingual Team</strong>: Our advisors speak <strong>8 languages</strong>, providing seamless service for international buyers from Europe, the Middle East, and the Americas.</li>
        <li><strong>Legal & Tax Advisory</strong>: Comprehensive support through our network of specialist lawyers, tax advisors, and financial planners familiar with Spanish property law.</li>
        <li><strong>After-Sales Concierge</strong>: From property management to interior design, we offer a full post-purchase support service for homeowners.</li>
      </ul>

      <h2 id="values">OUR VALUES</h2>
      <ul>
        <li><strong>Discretion</strong> — We understand that privacy is paramount in luxury real estate transactions</li>
        <li><strong>Excellence</strong> — We hold ourselves to the highest standards of service and professionalism</li>
        <li><strong>Integrity</strong> — Transparency and honesty guide every interaction with our clients</li>
        <li><strong>Innovation</strong> — We embrace technology and data-driven insights to enhance our advisory service</li>
      </ul>
    `,
  },
  terms: {
    title: "Terms & Conditions",
    subtitle: "Please read these terms carefully before using our services.",
    breadcrumb: "Terms & Conditions",
    toc: [
      { id: "general", label: "General" },
      { id: "services", label: "Services" },
      { id: "ip", label: "Intellectual Property" },
      { id: "liability", label: "Liability" },
      { id: "privacy-ref", label: "Privacy" },
    ],
    content: `
      <h2 id="general">1. GENERAL</h2>
      <p>These terms govern the use of the ${brand.fullName} website and services. By accessing or using our website, you agree to be bound by these terms and conditions.</p>

      <h2 id="services">2. SERVICES</h2>
      <p>${brand.fullName} acts as an intermediary between property sellers and buyers. We provide advisory, marketing, and brokerage services for <strong>luxury residential properties</strong> across Spain and selected international markets.</p>

      <h2 id="ip">3. INTELLECTUAL PROPERTY</h2>
      <p>All content, imagery, and branding on this website is the property of ${brand.fullName}. Reproduction, distribution, or modification of any material without prior written consent is strictly prohibited.</p>

      <h2 id="liability">4. LIABILITY</h2>
      <p>While we strive to ensure accuracy, ${brand.fullName} accepts no liability for inaccuracies in property listings. All information is provided in good faith and should be independently verified by prospective buyers.</p>

      <h2 id="privacy-ref">5. PRIVACY</h2>
      <p>We are committed to protecting your personal data. Please refer to our <a href="/page2/privacy">Privacy Policy</a> for full details on how we collect, process, and store your information.</p>
    `,
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "How we collect, use, and protect your personal information.",
    breadcrumb: "Privacy Policy",
    toc: [
      { id: "collection", label: "Data Collection" },
      { id: "usage", label: "How We Use Your Data" },
      { id: "storage", label: "Data Storage" },
      { id: "rights", label: "Your Rights" },
      { id: "cookies", label: "Cookies" },
    ],
    content: `
      <h2 id="collection">DATA COLLECTION</h2>
      <p>We collect personal information you provide directly, such as <strong>name, email, and phone number</strong> when you submit enquiry forms, subscribe to newsletters, or register for property alerts.</p>

      <h2 id="usage">HOW WE USE YOUR DATA</h2>
      <p>Your data is used solely for providing real estate advisory services, including property recommendations, market updates, and event invitations. We never sell your data to third parties.</p>

      <h2 id="storage">DATA STORAGE</h2>
      <p>We use industry-standard encryption and security measures to protect your data. All personal information is stored on secure servers within the European Union, fully compliant with <strong>GDPR</strong> regulations.</p>

      <h2 id="rights">YOUR RIGHTS</h2>
      <p>You have the right to access, rectify, or delete your personal data at any time. To exercise these rights, please contact our Data Protection Officer at <strong>privacy@prestigeestates.com</strong>.</p>

      <h2 id="cookies">COOKIES</h2>
      <p>Our website uses cookies to improve your browsing experience. You can manage your cookie preferences through your browser settings. Essential cookies are required for basic site functionality.</p>
    `,
  },
  services: {
    title: "Our Services",
    subtitle: "Comprehensive luxury real estate services tailored to your needs.",
    breadcrumb: "Services",
    image: heroImg,
    toc: [
      { id: "buying", label: "Buying Advisory" },
      { id: "selling", label: "Selling Services" },
      { id: "investment", label: "Investment Consulting" },
      { id: "concierge", label: "Concierge" },
    ],
    content: `
      <h2 id="buying">BUYING ADVISORY</h2>
      <p>Our buying advisory service provides end-to-end support for discerning clients seeking luxury properties. From initial consultation to key handover, we manage every aspect of the acquisition process.</p>
      <p>We leverage our extensive network and <strong>exclusive off-market access</strong> to present opportunities that align precisely with your lifestyle requirements and investment objectives.</p>

      <h2 id="selling">SELLING SERVICES</h2>
      <p>For property owners, we offer a premium marketing and sales service that maximises exposure to qualified international buyers. Our approach includes:</p>
      <ul>
        <li><strong>Professional Photography & Video</strong>: Cinematic property presentations that showcase your home at its best</li>
        <li><strong>Global Marketing</strong>: Distribution across leading international portals and our proprietary buyer database</li>
        <li><strong>Discreet Sales</strong>: Off-market options for owners who value privacy above all</li>
      </ul>

      <h2 id="investment">INVESTMENT CONSULTING</h2>
      <p>Our investment team provides data-driven analysis of Spain's luxury property market, identifying high-yield opportunities in <strong>branded residences, new developments, and holiday rental assets</strong>.</p>

      <h2 id="concierge">CONCIERGE SERVICES</h2>
      <p>Beyond the transaction, our concierge team assists with property management, interior design coordination, legal residency applications, and lifestyle services for new homeowners in Spain.</p>
    `,
  },
};

const SystemPageV2 = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = PAGES[slug || "about"] || PAGES["about"];
  const currentSlug = slug || "about";

  return (
    <Layout activePath="/page" background={palette.white} showLanguage>
      <SEOHead
        title={page.title}
        description={page.subtitle || `${page.title} — ${brand.fullName}`}
      />

      {/* ─── Breadcrumb ─── */}
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 sm:pt-10">
        <div className="flex items-center gap-1.5 text-[12px]" style={{ color: palette.textLight }}>
          <Link to="/" className="hover:underline" style={{ color: palette.accent }}>{brand.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <span style={{ color: palette.text }}>{page.breadcrumb}</span>
        </div>
      </nav>

      {/* ─── Title ─── */}
      <header className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-6">
        <h1
          className="text-[28px] sm:text-[36px] md:text-[42px] font-bold tracking-tight leading-[1.1]"
          style={{ color: palette.text, fontFamily: fonts.heading }}
        >
          {page.title.toUpperCase()}
        </h1>
      </header>

      {/* ─── Hero Image ─── */}
      {page.image && (
        <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-8">
          <div className="relative overflow-hidden rounded-sm aspect-[2.2/1]">
            <img src={page.image} alt={page.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* ─── Main Grid: Content + Sidebar ─── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">

        {/* ─── Content Column ─── */}
        <div>
          {/* Subtitle / Intro */}
          {page.subtitle && (
            <p className="text-[15px] leading-[1.8] mb-6" style={{ color: palette.textMuted }}>
              {page.subtitle}
            </p>
          )}

          {/* Table of Contents */}
          {page.toc && page.toc.length > 0 && (
            <div
              className="rounded-sm p-5 mb-8"
              style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
            >
              <p className="text-[13px] font-semibold mb-3" style={{ color: palette.text }}>Contents</p>
              <ul className="space-y-1.5">
                {page.toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-[13px] hover:underline flex items-center gap-1"
                      style={{ color: palette.textMuted }}
                    >
                      • {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Content */}
          <article
            className="system-v2-content"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>

        {/* ─── Sidebar ─── */}
        <aside className="space-y-8">
          {/* Related Pages */}
          <div
            className="rounded-sm p-5"
            style={{ border: `1px solid ${palette.border}` }}
          >
            <p
              className="text-[14px] font-semibold mb-4 pb-3"
              style={{ color: palette.text, borderBottom: `1px solid ${palette.border}` }}
            >
              Other Pages
            </p>
            <ul className="space-y-0">
              {RELATED_PAGES.map((item) => (
                <li
                  key={item.href}
                  className="border-b last:border-b-0"
                  style={{ borderColor: palette.border }}
                >
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 py-3 text-[13px] transition-colors hover:opacity-70"
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

          {/* External Portals */}
          <div
            className="rounded-sm p-5"
            style={{ border: `1px solid ${palette.border}` }}
          >
            <p
              className="text-[14px] font-semibold mb-4 pb-3"
              style={{ color: palette.text, borderBottom: `1px solid ${palette.border}` }}
            >
              Real Estate Portals
            </p>
            <ul className="space-y-0">
              {EXTERNAL_LINKS.map((item) => (
                <li
                  key={item.label}
                  className="border-b last:border-b-0"
                  style={{ borderColor: palette.border }}
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-3 text-[13px] transition-colors hover:opacity-70"
                    style={{ color: palette.text }}
                  >
                    <span className="font-medium">{item.label}</span>
                    <ExternalLink className="w-3 h-3" style={{ color: palette.textLight }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Card */}
          <div
            className="rounded-sm p-6 text-center"
            style={{ background: palette.bg }}
          >
            <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: palette.accent }}>
              Need help?
            </p>
            <p className="text-[18px] font-light mb-3" style={{ color: palette.text, fontFamily: fonts.heading }}>
              Speak to an Advisor
            </p>
            <p className="text-[12px] leading-[1.6] mb-4" style={{ color: palette.textMuted }}>
              Our multilingual team is available to assist you with any enquiry.
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-2.5 text-[12px] tracking-[0.1em] uppercase transition-opacity hover:opacity-90"
              style={{ background: palette.accent, color: palette.white }}
            >
              Contact Us
            </Link>
          </div>
        </aside>
      </div>

      <style>{`
        .system-v2-content { font-size: 15px; line-height: 1.85; color: ${palette.textMuted}; font-family: ${fonts.body}; }
        .system-v2-content h2 { font-size: 18px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; margin: 2.5em 0 0.8em; color: ${palette.text}; font-family: ${fonts.heading}; }
        .system-v2-content h2:first-child { margin-top: 0; }
        .system-v2-content p { margin-bottom: 1.2em; text-align: justify; }
        .system-v2-content a { color: ${palette.accent}; text-decoration: underline; }
        .system-v2-content ul { list-style: disc; padding-left: 1.2em; margin-bottom: 1.5em; }
        .system-v2-content li { padding: 4px 0; font-size: 14px; line-height: 1.7; }
        .system-v2-content strong { color: ${palette.text}; font-weight: 600; }
        .system-v2-content .page-image { margin: 2em 0; }
        .system-v2-content .page-image img { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 2px; }
        .system-v2-content .img-caption { display: block; font-size: 11px; color: ${palette.textLight}; margin-top: 6px; font-weight: 300; font-style: italic; }
      `}</style>
    </Layout>
  );
};

export default SystemPageV2;
