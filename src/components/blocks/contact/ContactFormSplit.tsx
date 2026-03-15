import { useState } from "react";
import { ArrowRight, Check, Globe, MessageCircle, Send, LucideIcon } from "lucide-react";

interface Reason {
  icon?: LucideIcon;
  title?: string;
  desc?: string;
}

interface ContactFormSplitProps {
  heroImage?: string;
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
  reasons?: Reason[];
  formTitle?: string;
  formSubtitle?: string;
  accentColor?: string;
}

export default function ContactFormSplit({
  heroImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  sectionLabel = "Contact Us",
  title = "Let's Start a Conversation",
  subtitle = "Whether you're looking to buy, sell, or simply explore the luxury market, our advisors are here to help.",
  reasons = [
    { icon: Globe, title: "Buy or Sell", desc: "Expert guidance for luxury transactions" },
    { icon: MessageCircle, title: "Valuation", desc: "Complimentary market appraisal" },
    { icon: Send, title: "Investment", desc: "Portfolio & advisory services" },
  ],
  formTitle = "How Can We Assist You?",
  formSubtitle = "We typically respond within 24 hours.",
  accentColor = "#8b6f47",
}: ContactFormSplitProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
      {/* Left — Image + reasons */}
      <div className="relative overflow-hidden min-h-[40vh] lg:min-h-[60vh]">
        <img src={heroImage} alt="Contact" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(45,41,38,0.85) 0%, rgba(45,41,38,0.4) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14 lg:px-16">
          <p className="text-[10px] tracking-[0.3em] uppercase font-light mb-4" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[52px] font-extralight tracking-[0.02em] leading-[1.1] mb-6 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h2>
          <p className="text-[14px] font-light leading-[1.7] max-w-md mb-10 text-white/65">{subtitle}</p>
          <div className="flex flex-col gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon || Globe;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `${accentColor}33`, border: `1px solid ${accentColor}4d` }}>
                    <Icon className="w-4 h-4" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium tracking-[0.02em] text-white">{r.title}</p>
                    <p className="text-[11px] font-light text-white/50">{r.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex flex-col justify-center px-5 sm:px-14 lg:px-16 py-10 sm:py-14 lg:py-20 bg-white">
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: accentColor }}>Send a Message</p>
        <h3 className="text-[24px] md:text-[30px] font-extralight tracking-[0.02em] mb-2 text-[#2C2825]" style={{ fontFamily: "'Playfair Display', serif" }}>{formTitle}</h3>
        <p className="text-[13px] font-light mb-8 text-[#8a8580]">{formSubtitle}</p>

        {submitted ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: accentColor, color: "white" }}>
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-[20px] font-extralight mb-2 text-[#2C2825]">Message Sent</h3>
            <p className="text-[13px] font-light text-[#8a8580]">Thank you. We'll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5 text-[#8a8580]">Full Name *</label>
                <input type="text" required placeholder="John Smith" className="w-full px-4 py-3 text-[13px] focus:outline-none transition-colors border-b-2 border-[#e8e4df] bg-transparent text-[#2C2825]" />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5 text-[#8a8580]">Email *</label>
                <input type="email" required placeholder="john@example.com" className="w-full px-4 py-3 text-[13px] focus:outline-none transition-colors border-b-2 border-[#e8e4df] bg-transparent text-[#2C2825]" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5 text-[#8a8580]">Phone</label>
                <input type="tel" placeholder="+34 600 000 000" className="w-full px-4 py-3 text-[13px] focus:outline-none transition-colors border-b-2 border-[#e8e4df] bg-transparent text-[#2C2825]" />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5 text-[#8a8580]">Subject</label>
                <select className="w-full px-4 py-3 text-[13px] focus:outline-none appearance-none transition-colors border-b-2 border-[#e8e4df] bg-transparent text-[#b0aaa3]">
                  <option value="">Select a topic</option>
                  <option value="buying">Buying a Property</option>
                  <option value="selling">Selling a Property</option>
                  <option value="valuation">Property Valuation</option>
                  <option value="investment">Investment Advisory</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.1em] uppercase font-medium mb-1.5 text-[#8a8580]">Message *</label>
              <textarea required placeholder="Tell us about your requirements..." rows={4} className="w-full px-4 py-3 text-[13px] focus:outline-none resize-none transition-colors border-b-2 border-[#e8e4df] bg-transparent text-[#2C2825]" />
            </div>
            <div className="pt-2">
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
