import { Link } from "react-router-dom";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, Check, Navigation, Send, Globe, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { palette, fonts, brand, contact } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";

const OFFICES = [
  { id: "marbella", name: "Marbella", label: "Headquarters", image: heroImg, address: "Av. Ricardo Soriano, 72, 29601 Marbella, Málaga", phone: "+34 952 123 456", email: "marbella@prestigeestates.com", hours: "Mon–Fri 9:00–19:00 · Sat 10:00–14:00", lat: 36.51, lng: -4.88 },
  { id: "ibiza", name: "Ibiza", label: "Balearic Islands", image: prop1, address: "Paseo Vara de Rey, 15, 07800 Ibiza", phone: "+34 971 234 567", email: "ibiza@prestigeestates.com", hours: "Mon–Fri 9:30–18:30", lat: 38.91, lng: 1.43 },
  { id: "mallorca", name: "Palma de Mallorca", label: "Balearic Islands", image: prop2, address: "Paseo del Borne, 28, 07012 Palma", phone: "+34 971 345 678", email: "mallorca@prestigeestates.com", hours: "Mon–Fri 9:00–18:00", lat: 39.57, lng: 2.65 },
];

const REASONS = [
  { icon: Globe, title: "Buy or Sell", desc: "Expert guidance for luxury transactions" },
  { icon: MessageCircle, title: "Valuation", desc: "Complimentary market appraisal" },
  { icon: Send, title: "Investment", desc: "Portfolio & advisory services" },
];

const ContactPageV2 = () => {
  const [activeOffice, setActiveOffice] = useState(OFFICES[0].id);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const office = OFFICES.find((o) => o.id === activeOffice)!;

  const update = (field: string, value: string) => setFormData((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const getDirectionsUrl = (o: typeof OFFICES[0]) =>
    `https://www.google.com/maps/dir/?api=1&destination=${o.lat},${o.lng}`;

  return (
    <Layout activePath="/contact2" background={palette.bg} showLanguage>
      <SEOHead
        title="Contact Us"
        description={`Get in touch with ${brand.fullName}. Our multilingual team of luxury real estate advisors is ready to assist you.`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": `Contact ${brand.fullName}`,
          "mainEntity": {
            "@type": "RealEstateAgent",
            "name": brand.fullName,
            "telephone": contact.phone,
            "email": contact.email,
          },
        }}
      />

      {/* ─── Split Hero ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        {/* Left — Image + overlay text */}
        <div className="relative overflow-hidden min-h-[40vh] lg:min-h-[60vh]">
          <img src={prop3} alt={`${brand.fullName} contact`} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(45,41,38,0.85) 0%, rgba(45,41,38,0.4) 100%)" }} />
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14 lg:px-16">
            <FadeIn>
              <p className="text-[10px] tracking-[0.3em] uppercase font-light mb-4" style={{ color: palette.accent }}>
                Contact Us
              </p>
              <h1
                className="text-[32px] sm:text-[40px] lg:text-[52px] font-extralight tracking-[0.02em] leading-[1.1] mb-6"
                style={{ color: palette.white, fontFamily: fonts.heading }}
              >
                Let's Start a<br />Conversation
              </h1>
              <p className="text-[14px] font-light leading-[1.7] max-w-md mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
                Whether you're looking to buy, sell, or simply explore the Mediterranean luxury market,
                our advisors are here to help.
              </p>

              {/* Reason cards */}
              <div className="flex flex-col gap-4">
                {REASONS.map((r) => (
                  <div key={r.title} className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(139,111,71,0.2)", border: `1px solid rgba(139,111,71,0.3)` }}
                    >
                      <r.icon className="w-4 h-4" style={{ color: palette.accent }} />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium tracking-[0.02em]" style={{ color: palette.white }}>{r.title}</p>
                      <p className="text-[11px] font-light" style={{ color: "rgba(255,255,255,0.5)" }}>{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-16 py-14 lg:py-20" style={{ background: palette.white }}>
          <FadeIn delay={0.15}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: palette.accent }}>
              Send a Message
            </p>
            <h2
              className="text-[24px] md:text-[30px] font-extralight tracking-[0.02em] mb-2"
              style={{ fontFamily: fonts.heading, color: palette.text }}
            >
              How Can We Assist You?
            </h2>
            <p className="text-[13px] font-light mb-8" style={{ color: palette.textMuted }}>
              We typically respond within 24 hours.
            </p>

            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: palette.accent, color: palette.white }}>
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-extralight mb-2" style={{ color: palette.text }}>Message Sent</h3>
                <p className="text-[13px] font-light" style={{ color: palette.textMuted }}>
                  Thank you for reaching out. We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Full Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => update("name", e.target.value)} required placeholder="John Smith"
                      className="w-full px-4 py-3 text-[13px] focus:outline-none transition-colors"
                      style={{ borderBottom: `2px solid ${palette.border}`, background: "transparent", color: palette.text }}
                      onFocus={(e) => (e.target.style.borderBottomColor = palette.accent)}
                      onBlur={(e) => (e.target.style.borderBottomColor = palette.border)}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Email *</label>
                    <input type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} required placeholder="john@example.com"
                      className="w-full px-4 py-3 text-[13px] focus:outline-none transition-colors"
                      style={{ borderBottom: `2px solid ${palette.border}`, background: "transparent", color: palette.text }}
                      onFocus={(e) => (e.target.style.borderBottomColor = palette.accent)}
                      onBlur={(e) => (e.target.style.borderBottomColor = palette.border)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+34 600 000 000"
                      className="w-full px-4 py-3 text-[13px] focus:outline-none transition-colors"
                      style={{ borderBottom: `2px solid ${palette.border}`, background: "transparent", color: palette.text }}
                      onFocus={(e) => (e.target.style.borderBottomColor = palette.accent)}
                      onBlur={(e) => (e.target.style.borderBottomColor = palette.border)}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Subject</label>
                    <select value={formData.subject} onChange={(e) => update("subject", e.target.value)}
                      className="w-full px-4 py-3 text-[13px] focus:outline-none appearance-none transition-colors"
                      style={{ borderBottom: `2px solid ${palette.border}`, background: "transparent", color: formData.subject ? palette.text : palette.textLight }}
                      onFocus={(e) => (e.target.style.borderBottomColor = palette.accent)}
                      onBlur={(e) => (e.target.style.borderBottomColor = palette.border)}
                    >
                      <option value="">Select a topic</option>
                      <option value="buying">Buying a Property</option>
                      <option value="selling">Selling a Property</option>
                      <option value="valuation">Property Valuation</option>
                      <option value="investment">Investment Advisory</option>
                      <option value="rental">Luxury Rentals</option>
                      <option value="other">Other Enquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5" style={{ color: palette.textMuted }}>Message *</label>
                  <textarea value={formData.message} onChange={(e) => update("message", e.target.value)} required placeholder="Tell us about your requirements..." rows={4}
                    className="w-full px-4 py-3 text-[13px] focus:outline-none resize-none transition-colors"
                    style={{ borderBottom: `2px solid ${palette.border}`, background: "transparent", color: palette.text }}
                    onFocus={(e) => (e.target.style.borderBottomColor = palette.accent)}
                    onBlur={(e) => (e.target.style.borderBottomColor = palette.border)}
                  />
                </div>
                <div className="pt-2">
                  <button type="submit"
                    className="inline-flex items-center gap-2 px-10 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:opacity-90"
                    style={{ background: palette.text, color: palette.white }}
                  >
                    Send Message <ArrowRight className="w-3.5 h-3.5" />
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

      {/* ─── Office Selector + Details ─── */}
      <section className="py-16 md:py-24" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: palette.accent }}>Visit Us</p>
              <h2 className="text-[24px] md:text-[32px] font-extralight tracking-[0.02em]" style={{ fontFamily: fonts.heading, color: palette.text }}>
                Our Offices
              </h2>
            </div>
          </FadeIn>

          {/* Office tabs */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap">
            {OFFICES.map((o) => (
              <button
                key={o.id}
                onClick={() => setActiveOffice(o.id)}
                className="px-4 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-[12px] tracking-[0.08em] font-light transition-all duration-300"
                style={{
                  border: `1px solid ${activeOffice === o.id ? palette.text : palette.border}`,
                  background: activeOffice === o.id ? palette.text : "transparent",
                  color: activeOffice === o.id ? palette.white : palette.textMuted,
                }}
              >
                {o.name}
              </button>
            ))}
          </div>

          {/* Active office — horizontal card */}
          <FadeIn key={activeOffice}>
            <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden" style={{ border: `1px solid ${palette.border}`, background: palette.white }}>
              <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto">
                <img src={office.image} alt={`${brand.fullName} ${office.name}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 50%, rgba(45,41,38,0.15) 100%)" }} />
              </div>
              <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: palette.accent }}>{office.label}</p>
                <h3 className="text-[24px] font-extralight tracking-[0.02em] mb-6" style={{ fontFamily: fonts.heading, color: palette.text }}>
                  {office.name}
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: palette.accent }} />
                    <span className="text-[13px] font-light leading-[1.6]" style={{ color: palette.textMuted }}>{office.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 shrink-0" style={{ color: palette.accent }} />
                    <a href={`tel:${office.phone}`} className="text-[13px] font-light hover:underline" style={{ color: palette.textMuted }}>{office.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 shrink-0" style={{ color: palette.accent }} />
                    <a href={`mailto:${office.email}`} className="text-[13px] font-light hover:underline" style={{ color: palette.textMuted }}>{office.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 shrink-0" style={{ color: palette.accent }} />
                    <span className="text-[13px] font-light" style={{ color: palette.textLight }}>{office.hours}</span>
                  </div>
                </div>
                <a
                  href={getDirectionsUrl(office)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:opacity-80 self-start"
                  style={{ border: `1px solid ${palette.text}`, color: palette.text }}
                >
                  <Navigation className="w-3.5 h-3.5" /> Get Directions
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPageV2;
