import { Link } from "react-router-dom";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, Check, Navigation } from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import { palette, fonts, brand } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";

/* ─── Office Data (configurable) ─── */
const OFFICES = [
  { id: "marbella", name: "Marbella", label: "Headquarters", image: heroImg, address: "Av. Ricardo Soriano, 72, 29601 Marbella, Málaga", phone: "+34 952 123 456", email: "marbella@prestigeestates.com", hours: "Mon–Fri 9:00–19:00 · Sat 10:00–14:00", lat: 36.51, lng: -4.88 },
  { id: "ibiza", name: "Ibiza", label: "Balearic Islands", image: prop1, address: "Paseo Vara de Rey, 15, 07800 Ibiza", phone: "+34 971 234 567", email: "ibiza@prestigeestates.com", hours: "Mon–Fri 9:30–18:30", lat: 38.91, lng: 1.43 },
  { id: "mallorca", name: "Palma de Mallorca", label: "Balearic Islands", image: prop2, address: "Paseo del Borne, 28, 07012 Palma", phone: "+34 971 345 678", email: "mallorca@prestigeestates.com", hours: "Mon–Fri 9:00–18:00", lat: 39.57, lng: 2.65 },
];

const ContactPage = () => {
  const [selectedOffices, setSelectedOffices] = useState<string[]>([OFFICES[0].id]);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleOffice = (id: string) => {
    setSelectedOffices((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((o) => o !== id) : prev) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const getDirectionsUrl = (office: typeof OFFICES[0]) =>
    `https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}`;

  return (
    <Layout activePath="/contact" background={palette.white}>
      {/* ─── HERO ─── */}
      <section className="relative h-[30vh] md:h-[40vh] overflow-hidden">
        <img src={heroImg} alt="Contact" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(45,41,38,0.7) 0%, rgba(45,41,38,0.2) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[10px] tracking-[0.3em] uppercase font-light mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>Get in Touch</p>
          <h1 className="text-[32px] md:text-[48px] font-extralight tracking-[0.04em] leading-[1.1]" style={{ color: palette.white }}>Contact Us</h1>
          <p className="text-[13px] font-light mt-3 max-w-md" style={{ color: "rgba(255,255,255,0.7)" }}>
            Our multilingual team of advisors is ready to assist you across the Mediterranean.
          </p>
        </div>
      </section>

      {/* ─── CONTACT FORM ─── */}
      <section style={{ background: palette.bg }}>
        <div className="max-w-[800px] mx-auto px-5 sm:px-6 py-14 md:py-20">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: palette.accent }}>Send a Message</p>
            <h2 className="text-[24px] md:text-[32px] font-extralight tracking-[0.02em]">How Can We Help?</h2>
            <p className="text-[13px] font-light mt-3 max-w-lg mx-auto" style={{ color: palette.textMuted }}>Select one or more offices and fill in the form below. We typically respond within 24 hours.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {OFFICES.map((o) => {
              const selected = selectedOffices.includes(o.id);
              return (
                <button key={o.id} onClick={() => toggleOffice(o.id)}
                  className="flex items-center gap-2 px-5 py-2.5 text-[12px] tracking-[0.08em] font-light transition-all duration-300"
                  style={{ border: `1px solid ${selected ? palette.text : palette.border}`, background: selected ? palette.text : palette.white, color: selected ? palette.white : palette.textMuted }}>
                  {selected && <Check className="w-3 h-3" />} {o.name}
                </button>
              );
            })}
          </div>

          {submitted ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: palette.accent, color: palette.white }}>
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-[20px] font-extralight mb-2">Message Sent</h3>
              <p className="text-[13px] font-light" style={{ color: palette.textMuted }}>Thank you for reaching out. We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2" style={{ color: palette.textMuted }}>Full Name *</label>
                  <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} required placeholder="John Smith" className="w-full px-4 py-3 text-[13px] focus:outline-none" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }} />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2" style={{ color: palette.textMuted }}>Email *</label>
                  <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} required placeholder="john@example.com" className="w-full px-4 py-3 text-[13px] focus:outline-none" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2" style={{ color: palette.textMuted }}>Phone</label>
                  <input type="tel" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="+34 600 000 000" className="w-full px-4 py-3 text-[13px] focus:outline-none" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }} />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2" style={{ color: palette.textMuted }}>Subject</label>
                  <select value={formSubject} onChange={(e) => setFormSubject(e.target.value)} className="w-full px-4 py-3 text-[13px] focus:outline-none appearance-none" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: formSubject ? palette.text : palette.textLight }}>
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
                <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2" style={{ color: palette.textMuted }}>Message *</label>
                <textarea value={formMessage} onChange={(e) => setFormMessage(e.target.value)} required placeholder="Tell us about your requirements..." rows={5} className="w-full px-4 py-3 text-[13px] focus:outline-none resize-none" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }} />
              </div>
              <div className="text-center pt-2">
                <button type="submit" className="inline-flex items-center gap-2 px-10 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:opacity-90" style={{ background: palette.text, color: palette.white }}>
                  Send Message <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[11px] font-light mt-4" style={{ color: palette.textLight }}>
                  By submitting this form you agree to our <Link to="/page/privacy" className="underline" style={{ color: palette.accent }}>Privacy Policy</Link>.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ─── OFFICES GRID ─── */}
      <section className="py-14 md:py-20" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: palette.accent }}>Visit Us</p>
            <h2 className="text-[24px] md:text-[32px] font-extralight tracking-[0.02em]">Our Offices</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFICES.map((office) => (
              <div key={office.id} className="group" style={{ border: `1px solid ${palette.border}` }}>
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img src={office.image} alt={office.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(45,41,38,0.5) 0%, transparent 50%)" }} />
                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-[16px] font-light tracking-[0.04em]" style={{ color: palette.white }}>{office.name}</h3>
                    <p className="text-[10px] font-light tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.6)" }}>{office.label}</p>
                  </div>
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex items-start gap-2.5"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: palette.accent }} /><span className="text-[12px] font-light leading-[1.5]" style={{ color: palette.textMuted }}>{office.address}</span></div>
                  <div className="flex items-center gap-2.5"><Phone className="w-3.5 h-3.5 shrink-0" style={{ color: palette.accent }} /><a href={`tel:${office.phone}`} className="text-[12px] font-light hover:underline" style={{ color: palette.textMuted }}>{office.phone}</a></div>
                  <div className="flex items-center gap-2.5"><Mail className="w-3.5 h-3.5 shrink-0" style={{ color: palette.accent }} /><a href={`mailto:${office.email}`} className="text-[12px] font-light hover:underline" style={{ color: palette.textMuted }}>{office.email}</a></div>
                  <div className="flex items-center gap-2.5"><Clock className="w-3.5 h-3.5 shrink-0" style={{ color: palette.accent }} /><span className="text-[12px] font-light" style={{ color: palette.textLight }}>{office.hours}</span></div>
                </div>
                <div className="px-5 pb-5">
                  <a href={getDirectionsUrl(office)} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-2.5 text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:opacity-80" style={{ border: `1px solid ${palette.border}`, color: palette.text }}>
                    <Navigation className="w-3.5 h-3.5" /> Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
