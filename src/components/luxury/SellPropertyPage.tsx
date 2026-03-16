import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Check, TrendingUp, Eye, Shield, BarChart3, Home, Camera, MapPin, Phone, Mail } from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { palette, fonts, brand, contact } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";

/* ─── Why sell with us ─── */
const BENEFITS = [
  { icon: Eye, title: "Global Exposure", desc: "Your property showcased to qualified international buyers across our network" },
  { icon: TrendingUp, title: "Maximum Value", desc: "Data-driven pricing strategy to achieve the highest market price" },
  { icon: Shield, title: "Discretion Guaranteed", desc: "Off-market options and NDA-protected transactions for total privacy" },
  { icon: Camera, title: "Premium Marketing", desc: "Professional photography, video tours, and editorial storytelling" },
];

/* ─── Process steps ─── */
const STEPS = [
  { num: "01", title: "Free Valuation", desc: "We assess your property's market value using comparable sales and current demand data." },
  { num: "02", title: "Marketing Strategy", desc: "Professional photos, virtual tours, and targeted campaigns across premium channels." },
  { num: "03", title: "Qualified Viewings", desc: "We pre-qualify every buyer and coordinate private viewings at your convenience." },
  { num: "04", title: "Closing & Beyond", desc: "Full legal support, negotiation, and after-sale service for a seamless transaction." },
];

/* ─── Stats ─── */
const STATS = [
  { value: "€2.4B+", label: "Total Sales Volume" },
  { value: "42", label: "Average Days to Sell" },
  { value: "98%", label: "Asking Price Achieved" },
  { value: "1,200+", label: "Properties Sold" },
];

const SellPropertyPage = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", propertyType: "", bedrooms: "", estimatedValue: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setFormData((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputStyle = {
    borderBottom: `2px solid ${palette.border}`,
    background: "transparent",
    color: palette.text,
  };

  const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderBottomColor = palette.accent);
  const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderBottomColor = palette.border);

  return (
    <Layout activePath="/sell" background={palette.bg} showLanguage>
      <SEOHead
        title="Sell Your Property"
        description={`List your luxury property with ${brand.fullName}. Free valuation, premium marketing, and access to qualified international buyers.`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": `Sell Your Property — ${brand.fullName}`,
          "description": `Expert luxury property sales service by ${brand.fullName}.`,
        }}
      />

      {/* ─── Split Hero ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        {/* Left — Image + overlay */}
        <div className="relative overflow-hidden min-h-[40vh] lg:min-h-[60vh]">
          <img src={heroImg} alt="Luxury property for sale" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(45,41,38,0.88) 0%, rgba(45,41,38,0.4) 100%)" }} />
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14 lg:px-16">
            <FadeIn>
              <p className="text-[10px] tracking-[0.3em] uppercase font-light mb-4" style={{ color: palette.accent }}>
                Sell With Us
              </p>
              <h1
                className="text-[32px] sm:text-[40px] lg:text-[52px] font-extralight tracking-[0.02em] leading-[1.1] mb-6"
                style={{ color: palette.white, fontFamily: fonts.heading }}
              >
                Your Property<br />Deserves More
              </h1>
              <p className="text-[14px] font-light leading-[1.7] max-w-md mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
                Trust the leading luxury real estate advisors to present your home to the world's most discerning buyers.
                From valuation to closing, we handle everything.
              </p>

              {/* Benefit cards */}
              <div className="flex flex-col gap-4">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(139,111,71,0.2)", border: "1px solid rgba(139,111,71,0.3)" }}
                    >
                      <b.icon className="w-4 h-4" style={{ color: palette.accent }} />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium tracking-[0.02em]" style={{ color: palette.white }}>{b.title}</p>
                      <p className="text-[11px] font-light" style={{ color: "rgba(255,255,255,0.5)" }}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Right — Sell Form */}
        <div className="flex flex-col justify-center px-5 sm:px-14 lg:px-16 py-10 sm:py-14 lg:py-20" style={{ background: palette.white }}>
          <FadeIn delay={0.15}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: palette.accent }}>
              Request a Valuation
            </p>
            <h2
              className="text-[24px] md:text-[30px] font-extralight tracking-[0.02em] mb-2"
              style={{ fontFamily: fonts.heading, color: palette.text }}
            >
              Tell Us About Your Property
            </h2>
            <p className="text-[13px] font-light mb-8" style={{ color: palette.textMuted }}>
              Fill in the details below and we'll provide a complimentary market appraisal within 48 hours.
            </p>

            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: palette.accent, color: palette.white }}>
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-extralight mb-2" style={{ color: palette.text }}>Valuation Requested</h3>
                <p className="text-[13px] font-light" style={{ color: palette.textMuted }}>
                  Thank you. One of our advisors will contact you within 48 hours with your personalised report.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Full Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => update("name", e.target.value)} required placeholder="John Smith"
                      className="w-full px-4 py-3 text-[13px] focus:outline-none transition-colors" style={inputStyle}
                      onFocus={focusHandler} onBlur={blurHandler}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Email *</label>
                    <input type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} required placeholder="john@example.com"
                      className="w-full px-4 py-3 text-[13px] focus:outline-none transition-colors" style={inputStyle}
                      onFocus={focusHandler} onBlur={blurHandler}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+34 600 000 000"
                      className="w-full px-4 py-3 text-[13px] focus:outline-none transition-colors" style={inputStyle}
                      onFocus={focusHandler} onBlur={blurHandler}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Property Type</label>
                    <select value={formData.propertyType} onChange={(e) => update("propertyType", e.target.value)}
                      className="w-full px-4 py-3 text-[13px] focus:outline-none appearance-none transition-colors"
                      style={{ ...inputStyle, color: formData.propertyType ? palette.text : palette.textLight }}
                      onFocus={focusHandler} onBlur={blurHandler}
                    >
                      <option value="">Select type</option>
                      <option value="villa">Villa</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="apartment">Apartment</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="finca">Finca / Country House</option>
                      <option value="plot">Plot / Land</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Bedrooms</label>
                    <select value={formData.bedrooms} onChange={(e) => update("bedrooms", e.target.value)}
                      className="w-full px-4 py-3 text-[13px] focus:outline-none appearance-none transition-colors"
                      style={{ ...inputStyle, color: formData.bedrooms ? palette.text : palette.textLight }}
                      onFocus={focusHandler} onBlur={blurHandler}
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6+">6+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Estimated Value (€)</label>
                    <input type="text" value={formData.estimatedValue} onChange={(e) => update("estimatedValue", e.target.value)} placeholder="e.g. 2,500,000"
                      className="w-full px-4 py-3 text-[13px] focus:outline-none transition-colors" style={inputStyle}
                      onFocus={focusHandler} onBlur={blurHandler}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Property Address *</label>
                  <input type="text" value={formData.address} onChange={(e) => update("address", e.target.value)} required placeholder="Full address or area"
                    className="w-full px-4 py-3 text-[13px] focus:outline-none transition-colors" style={inputStyle}
                    onFocus={focusHandler} onBlur={blurHandler}
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Additional Details</label>
                  <textarea value={formData.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about key features, renovations, views, etc." rows={3}
                    className="w-full px-4 py-3 text-[13px] focus:outline-none resize-none transition-colors" style={inputStyle}
                    onFocus={focusHandler} onBlur={blurHandler}
                  />
                </div>
                <div className="pt-2">
                  <button type="submit"
                    className="inline-flex items-center gap-2 px-10 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:opacity-90"
                    style={{ background: palette.accent, color: palette.white }}
                  >
                    Request Free Valuation <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[11px] font-light mt-4" style={{ color: palette.textLight }}>
                    By submitting you agree to our{" "}
                    <Link to="/page/privacy" className="underline" style={{ color: palette.accent }}>Privacy Policy</Link>.
                  </p>
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ─── Stats Ribbon ─── */}
      <section className="py-12 md:py-16" style={{ background: palette.text }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <FadeIn key={s.label}>
                <p className="text-[28px] md:text-[36px] font-extralight tracking-[0.02em] mb-1" style={{ color: palette.accent, fontFamily: fonts.heading }}>
                  {s.value}
                </p>
                <p className="text-[11px] tracking-[0.15em] uppercase font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {s.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-16 md:py-24" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: palette.accent }}>Our Process</p>
              <h2 className="text-[28px] md:text-[36px] font-extralight tracking-[0.02em]" style={{ fontFamily: fonts.heading, color: palette.text }}>
                How We Sell Your Property
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div className="text-center lg:text-left">
                  <p className="text-[40px] font-extralight mb-3" style={{ color: palette.accent, fontFamily: fonts.heading }}>{step.num}</p>
                  <h3 className="text-[16px] font-medium tracking-[0.02em] mb-2" style={{ color: palette.text }}>{step.title}</h3>
                  <p className="text-[13px] font-light leading-[1.7]" style={{ color: palette.textMuted }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Image + CTA ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[50vh]">
        <div className="relative overflow-hidden min-h-[30vh] lg:min-h-[50vh]">
          <img src={prop1} alt="Luxury interior" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-16 py-12 lg:py-20" style={{ background: palette.bgAlt }}>
          <FadeIn>
            <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: palette.accent }}>Off-Market Sales</p>
            <h2 className="text-[28px] md:text-[36px] font-extralight tracking-[0.02em] leading-[1.15] mb-6" style={{ fontFamily: fonts.heading, color: palette.text }}>
              Prefer Complete<br />Discretion?
            </h2>
            <p className="text-[14px] font-light leading-[1.7] mb-8 max-w-md" style={{ color: palette.textMuted }}>
              Our exclusive off-market programme connects your property with pre-qualified buyers
              through private channels — no public listings, no open days. Your privacy is our priority.
            </p>
            <Link
              to="/contact2"
              className="inline-flex items-center gap-2 px-10 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:opacity-90 self-start"
              style={{ background: palette.text, color: palette.white }}
            >
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ─── Bottom contact strip ─── */}
      <section className="py-12 md:py-16" style={{ background: palette.white, borderTop: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: palette.accent }}>Ready to Sell?</p>
              <h3 className="text-[22px] font-extralight tracking-[0.02em]" style={{ fontFamily: fonts.heading, color: palette.text }}>
                Speak directly with an advisor
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-[13px] font-light hover:underline" style={{ color: palette.textMuted }}>
                <Phone className="w-4 h-4" style={{ color: palette.accent }} /> {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-[13px] font-light hover:underline" style={{ color: palette.textMuted }}>
                <Mail className="w-4 h-4" style={{ color: palette.accent }} /> {contact.email}
              </a>
              <a href={`https://wa.me/${contact.phone.replace(/\s+/g, "").replace("+", "")}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-[11px] tracking-[0.12em] uppercase font-medium transition-all hover:opacity-80"
                style={{ border: `1px solid ${palette.accent}`, color: palette.accent }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SellPropertyPage;
