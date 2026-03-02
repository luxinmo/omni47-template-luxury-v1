import { useParams, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout";
import { palette, fonts, brand } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";
import propertyDetail1 from "@/assets/property-detail-1.jpg";

const PAGES: Record<string, { title: string; subtitle?: string; image?: string; content: string }> = {
  "about": {
    title: `About ${brand.fullName}`,
    subtitle: "A curated luxury real estate advisory specialising in the most exclusive properties across the Mediterranean.",
    image: heroImg,
    content: `<h2>Our Mission</h2><p>We connect discerning international buyers with exceptional properties through a bespoke service built on trust, discretion, and an uncompromising eye for quality.</p><h2>Our Story</h2><p>Founded in 2010, ${brand.fullName} has grown from a boutique consultancy in Marbella to a leading luxury real estate firm serving clients across Europe and beyond.</p><div class="page-image"><img src="${propertyDetail1}" alt="Our offices" /><span class="img-caption">Our Marbella headquarters</span></div><h2>Why Choose Us</h2><p>With exclusive access to off-market listings, proven negotiation expertise, and a white-glove concierge service, we ensure every client receives a seamless, personalised experience.</p><h2>Our Values</h2><ul><li><strong>Discretion</strong> — We understand that privacy is paramount</li><li><strong>Excellence</strong> — We hold ourselves to the highest standards</li><li><strong>Integrity</strong> — Transparency guides every interaction</li><li><strong>Innovation</strong> — We embrace technology to enhance our service</li></ul>`,
  },
  "terms": {
    title: "Terms & Conditions",
    subtitle: "Please read these terms carefully before using our services.",
    content: `<h2>1. General</h2><p>These terms govern the use of the ${brand.fullName} website and services.</p><h2>2. Services</h2><p>${brand.fullName} acts as an intermediary between property sellers and buyers.</p><h2>3. Intellectual Property</h2><p>All content, imagery, and branding on this website is the property of ${brand.fullName}.</p><h2>4. Liability</h2><p>While we strive to ensure accuracy, ${brand.fullName} accepts no liability for inaccuracies in property listings.</p><h2>5. Privacy</h2><p>We are committed to protecting your personal data. Please refer to our Privacy Policy for full details.</p>`,
  },
  "privacy": {
    title: "Privacy Policy",
    subtitle: "How we collect, use, and protect your personal information.",
    content: `<h2>Data Collection</h2><p>We collect personal information you provide directly, such as name, email, and phone number.</p><h2>How We Use Your Data</h2><p>Your data is used solely for providing real estate advisory services.</p><h2>Data Storage</h2><p>We use industry-standard encryption and security measures to protect your data.</p><h2>Your Rights</h2><p>You have the right to access, rectify, or delete your personal data at any time.</p><h2>Cookies</h2><p>Our website uses cookies to improve your browsing experience.</p>`,
  },
};

const SystemPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = PAGES[slug || "about"] || PAGES["about"];

  return (
    <Layout activePath="/page" background={palette.white}>
      {/* ─── HEADER ─── */}
      <header className="max-w-3xl mx-auto px-5 sm:px-6 pt-12 md:pt-20 pb-6 text-center">
        <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4" style={{ color: palette.accent }}>Information</p>
        <h1 className="text-[28px] md:text-[40px] font-extralight leading-[1.15] tracking-[0.01em]">{page.title}</h1>
        {page.subtitle && (
          <p className="text-[14px] font-light leading-[1.7] mt-4 max-w-xl mx-auto" style={{ color: palette.textMuted }}>{page.subtitle}</p>
        )}
        <div className="w-12 h-[1px] mx-auto mt-8" style={{ background: palette.accent }} />
      </header>

      {page.image && (
        <div className="max-w-4xl mx-auto px-5 sm:px-6 mb-10 md:mb-14">
          <div className="relative overflow-hidden aspect-[16/9]">
            <img src={page.image} alt={page.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <article className="max-w-[720px] mx-auto px-5 sm:px-6 pb-16 md:pb-24">
        <div className="system-page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>

      <style>{`
        .system-page-content { font-size: 15px; line-height: 1.9; color: ${palette.textMuted}; }
        .system-page-content h2 { font-size: 22px; font-weight: 300; letter-spacing: 0.02em; margin: 2.5em 0 0.8em; color: ${palette.text}; font-family: 'Jost', serif; }
        .system-page-content p { margin-bottom: 1.4em; }
        .system-page-content a { color: ${palette.accent}; text-decoration: underline; }
        .system-page-content ul { list-style: none; padding: 0; margin-bottom: 1.5em; }
        .system-page-content li { padding: 8px 0; border-bottom: 1px solid ${palette.border}; font-size: 14px; }
        .system-page-content li:last-child { border-bottom: none; }
        .system-page-content strong { color: ${palette.text}; font-weight: 500; }
        .system-page-content .page-image { margin: 2em 0; }
        .system-page-content .page-image img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
        .system-page-content .img-caption { display: block; font-size: 11px; color: ${palette.textLight}; margin-top: 6px; font-weight: 300; }
      `}</style>
    </Layout>
  );
};

export default SystemPage;
