import { useState } from "react";
import { ArrowRight, Check, MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

interface Office {
  id?: string;
  name?: string;
  label?: string;
  image?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  lat?: number;
  lng?: number;
}

interface ContactFormCenteredProps {
  sectionLabel?: string;
  title?: string;
  description?: string;
  offices?: Office[];
  subjects?: { value: string; label: string }[];
  accentColor?: string;
}

export default function ContactFormCentered({
  sectionLabel = "Send a Message",
  title = "How Can We Help?",
  description = "Select one or more offices and fill in the form below. We typically respond within 24 hours.",
  offices = [
    { id: "marbella", name: "Marbella", label: "Headquarters", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80", address: "Av. Ricardo Soriano, 72", phone: "+34 952 123 456", email: "info@example.com", hours: "Mon–Fri 9:00–19:00", lat: 36.51, lng: -4.88 },
    { id: "ibiza", name: "Ibiza", label: "Balearic Islands", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80", address: "Paseo Vara de Rey, 15", phone: "+34 971 234 567", email: "ibiza@example.com", hours: "Mon–Fri 9:30–18:30", lat: 38.91, lng: 1.43 },
    { id: "mallorca", name: "Palma de Mallorca", label: "Balearic Islands", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80", address: "Paseo del Borne, 28", phone: "+34 971 345 678", email: "mallorca@example.com", hours: "Mon–Fri 9:00–18:00", lat: 39.57, lng: 2.65 },
  ],
  subjects = [
    { value: "buying", label: "Buying a Property" },
    { value: "selling", label: "Selling a Property" },
    { value: "valuation", label: "Property Valuation" },
    { value: "investment", label: "Investment Advisory" },
    { value: "other", label: "Other Enquiry" },
  ],
  accentColor = "#8b6f47",
}: ContactFormCenteredProps) {
  const [selectedOffices, setSelectedOffices] = useState<string[]>([offices[0]?.id || ""]);
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

  return (
    <section className="bg-[#f8f6f3]">
      <div className="max-w-[800px] mx-auto px-5 sm:px-6 py-14 md:py-20">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-[24px] md:text-[32px] font-extralight tracking-[0.02em] text-[#2C2825]">{title}</h2>
          <p className="text-[13px] font-light mt-3 max-w-lg mx-auto text-[#8a8580]">{description}</p>
        </div>

        {/* Office selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {offices.map((o) => {
            const selected = selectedOffices.includes(o.id || "");
            return (
              <button key={o.id} onClick={() => toggleOffice(o.id || "")}
                className="flex items-center gap-2 px-5 py-2.5 text-[12px] tracking-[0.08em] font-light transition-all duration-300"
                style={{ border: `1px solid ${selected ? "#2C2825" : "#e8e4df"}`, background: selected ? "#2C2825" : "white", color: selected ? "white" : "#8a8580" }}>
                {selected && <Check className="w-3 h-3" />} {o.name}
              </button>
            );
          })}
        </div>

        {submitted ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: accentColor, color: "white" }}>
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-[20px] font-extralight mb-2 text-[#2C2825]">Message Sent</h3>
            <p className="text-[13px] font-light text-[#8a8580]">Thank you for reaching out. We'll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2 text-[#8a8580]">Full Name *</label>
                <input type="text" required placeholder="John Smith" className="w-full px-4 py-3 text-[13px] focus:outline-none border border-[#e8e4df] bg-white text-[#2C2825]" />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2 text-[#8a8580]">Email *</label>
                <input type="email" required placeholder="john@example.com" className="w-full px-4 py-3 text-[13px] focus:outline-none border border-[#e8e4df] bg-white text-[#2C2825]" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2 text-[#8a8580]">Phone</label>
                <input type="tel" placeholder="+34 600 000 000" className="w-full px-4 py-3 text-[13px] focus:outline-none border border-[#e8e4df] bg-white text-[#2C2825]" />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2 text-[#8a8580]">Subject</label>
                <select className="w-full px-4 py-3 text-[13px] focus:outline-none appearance-none border border-[#e8e4df] bg-white text-[#b0aaa3]">
                  <option value="">Select a topic</option>
                  {subjects.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-2 text-[#8a8580]">Message *</label>
              <textarea required placeholder="Tell us about your requirements..." rows={5} className="w-full px-4 py-3 text-[13px] focus:outline-none resize-none border border-[#e8e4df] bg-white text-[#2C2825]" />
            </div>
            <div className="text-center pt-2">
              <button type="submit" className="inline-flex items-center gap-2 px-10 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:opacity-90 bg-[#2C2825] text-white">
                Send Message <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
