/**
 * OFF-MARKET WIZARD MODAL
 * Multi-step app-like flow for off-market property access.
 * Two paths: SELL (list your property off-market) or BUY (access off-market portfolio).
 * Each path guides the user through screens one at a time with smooth transitions.
 */

import { useState, useCallback } from "react";
import { X, ArrowLeft, Home, Search, User, Building2, Users, ChevronRight, Check, Globe, Phone, Mail, Lock, EyeOff } from "lucide-react";

interface OffmarketWizardModalProps {
  open: boolean;
  onClose: () => void;
  accentColor?: string;
  bgColor?: string;
  heroImage?: string;
}

type Flow = null | "sell" | "buy";

/* ─── SELL flow state ─── */
interface SellData {
  ownerType: "" | "owner" | "authorized";
  otherAgencies: "" | "yes" | "no";
  price: string;
  location: string;
  fullName: string;
  phone: string;
  email: string;
  language: string;
}

/* ─── BUY flow state ─── */
interface BuyData {
  location: string;
  priceMin: string;
  priceMax: string;
  timeline: "" | "immediate" | "3months" | "6months" | "12months" | "flexible";
  fullName: string;
  phone: string;
  email: string;
  language: string;
}

const LANGUAGES = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "zh", label: "中文" },
];

const TIMELINES = [
  { value: "immediate", label: "As soon as possible" },
  { value: "3months", label: "Within 3 months" },
  { value: "6months", label: "Within 6 months" },
  { value: "12months", label: "Within 12 months" },
  { value: "flexible", label: "No rush — flexible" },
];

export default function OffmarketWizardModal({
  open,
  onClose,
  accentColor = "#c9a96e",
  bgColor = "#1e1c1a",
  heroImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
}: OffmarketWizardModalProps) {
  const [flow, setFlow] = useState<Flow>(null);
  const [sellStep, setSellStep] = useState(0);
  const [buyStep, setBuyStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [sell, setSell] = useState<SellData>({
    ownerType: "", otherAgencies: "", price: "", location: "",
    fullName: "", phone: "", email: "", language: "",
  });
  const [buy, setBuy] = useState<BuyData>({
    location: "", priceMin: "", priceMax: "", timeline: "",
    fullName: "", phone: "", email: "", language: "",
  });

  const reset = useCallback(() => {
    setFlow(null);
    setSellStep(0);
    setBuyStep(0);
    setSubmitted(false);
    setSell({ ownerType: "", otherAgencies: "", price: "", location: "", fullName: "", phone: "", email: "", language: "" });
    setBuy({ location: "", priceMin: "", priceMax: "", timeline: "", fullName: "", phone: "", email: "", language: "" });
  }, []);

  const handleClose = () => { reset(); onClose(); };

  if (!open) return null;

  const totalSellSteps = 5;
  const totalBuySteps = 4;

  const currentStep = flow === "sell" ? sellStep : flow === "buy" ? buyStep : -1;
  const totalSteps = flow === "sell" ? totalSellSteps : flow === "buy" ? totalBuySteps : 0;

  const goBack = () => {
    if (submitted) { setSubmitted(false); return; }
    if (flow === "sell" && sellStep > 0) setSellStep(s => s - 1);
    else if (flow === "buy" && buyStep > 0) setBuyStep(s => s - 1);
    else setFlow(null);
  };

  const handleSubmit = () => setSubmitted(true);

  /* ─── shared styles (white theme) ─── */
  const optionBtn = (selected: boolean) =>
    `w-full text-left px-5 py-4 rounded-sm border transition-all duration-200 flex items-center gap-4 ${
      selected
        ? "border-neutral-900/30 bg-neutral-50"
        : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
    }`;

  const inputCls = "w-full bg-white border border-neutral-200 rounded-sm px-4 py-3 text-[16px] sm:text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors";
  const labelCls = "text-[12px] tracking-[0.15em] uppercase text-neutral-400 mb-2 block";
  const nextBtn = (disabled: boolean) =>
    `w-full py-3.5 text-[13px] tracking-[0.14em] uppercase font-medium rounded-sm transition-all duration-300 ${
      disabled ? "opacity-30 cursor-not-allowed" : "hover:opacity-90 active:scale-[0.98]"
    }`;

  /* ─── progress bar ─── */
  const ProgressBar = () =>
    totalSteps > 0 && !submitted ? (
      <div className="flex gap-1.5 px-6 pt-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="h-[2px] flex-1 rounded-full transition-all duration-500" style={{ background: i <= currentStep ? accentColor : "rgba(0,0,0,0.08)" }} />
        ))}
      </div>
    ) : null;

  /* ─── SCREENS ─── */

  // === INITIAL: choose sell or buy ===
  const ChooseScreen = () => (
    <div className="flex flex-col">
      {/* Hero image with off-market branding */}
      <div className="relative h-[180px] sm:h-[200px] overflow-hidden">
        <img src={heroImage} alt="Off-market property" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${bgColor}99, ${bgColor}e6)` }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
            <EyeOff className="w-5 h-5" style={{ color: accentColor }} />
          </div>
          <p className="text-[11px] tracking-[0.3em] uppercase font-normal" style={{ color: accentColor }}>Off-Market</p>
          <p className="text-[13px] text-white/50 font-light">Private & Confidential</p>
        </div>
      </div>

      <div className="px-6 py-6">
        <h2 className="text-[24px] font-extralight text-neutral-900 leading-tight mb-1.5" style={{ letterSpacing: "0.03em" }}>
          How can we help you?
        </h2>
        <p className="text-[14px] text-neutral-400 font-light mb-7">Select an option to get started.</p>

        <div className="space-y-3">
          <button onClick={() => setFlow("sell")} className={optionBtn(false)} style={{ color: accentColor }}>
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: `${accentColor}18` }}>
              <Home className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] text-neutral-900 font-medium mb-0.5">I want to sell off-market</p>
              <p className="text-[13px] text-neutral-400 font-light">List your property privately through our network</p>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-300 ml-auto shrink-0" />
          </button>

          <button onClick={() => setFlow("buy")} className={optionBtn(false)} style={{ color: accentColor }}>
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: `${accentColor}18` }}>
              <Search className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] text-neutral-900 font-medium mb-0.5">I want to buy off-market</p>
              <p className="text-[13px] text-neutral-400 font-light">Access our exclusive private portfolio</p>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-300 ml-auto shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );

  // === SELL STEP 0: Owner or authorized ===
  const SellOwnerStep = () => (
    <StepWrapper title="Your relationship" subtitle="Are you the property owner?">
      <div className="space-y-3">
        {([["owner", "I am the owner", User] as const, ["authorized", "I am an authorized representative", Users] as const]).map(([val, label, Icon]) => (
          <button key={val} onClick={() => { setSell(s => ({ ...s, ownerType: val })); setSellStep(1); }}
            className={optionBtn(sell.ownerType === val)} style={{ color: sell.ownerType === val ? accentColor : undefined }}>
            <Icon className="w-5 h-5 shrink-0 text-neutral-500" />
            <span className="text-[15px] text-neutral-900">{label}</span>
            <ChevronRight className="w-4 h-4 text-neutral-300 ml-auto shrink-0" />
          </button>
        ))}
      </div>
    </StepWrapper>
  );

  // === SELL STEP 1: Other agencies ===
  const SellAgenciesStep = () => (
    <StepWrapper title="Current status" subtitle="Is the property listed with other agencies?">
      <div className="space-y-3">
        {([["no", "No, it's not listed anywhere"] as const, ["yes", "Yes, with other agencies"] as const]).map(([val, label]) => (
          <button key={val} onClick={() => { setSell(s => ({ ...s, otherAgencies: val })); setSellStep(2); }}
            className={optionBtn(sell.otherAgencies === val)} style={{ color: sell.otherAgencies === val ? accentColor : undefined }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: sell.otherAgencies === val ? `${accentColor}20` : "rgba(0,0,0,0.04)" }}>
              <Building2 className="w-4 h-4 text-neutral-500" />
            </div>
            <span className="text-[15px] text-neutral-900">{label}</span>
            <ChevronRight className="w-4 h-4 text-neutral-300 ml-auto shrink-0" />
          </button>
        ))}
      </div>
    </StepWrapper>
  );

  // === SELL STEP 2: Price + Location ===
  const SellPropertyStep = () => (
    <StepWrapper title="Property details" subtitle="Tell us about the property.">
      <div className="space-y-5">
        <div>
          <label className={labelCls}>Location *</label>
          <input value={sell.location} onChange={e => setSell(s => ({ ...s, location: e.target.value }))} placeholder="e.g. Ibiza, Marbella, Mallorca..." className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Asking price (optional)</label>
          <input value={sell.price} onChange={e => setSell(s => ({ ...s, price: e.target.value }))} placeholder="e.g. €2,500,000 or leave blank" className={inputCls} />
        </div>
      </div>
      <div className="mt-8">
        <button disabled={!sell.location.trim()} onClick={() => setSellStep(3)} className={nextBtn(!sell.location.trim())} style={{ background: accentColor, color: bgColor }}>
          Continue
        </button>
      </div>
    </StepWrapper>
  );

  // === SELL STEP 3: Contact details ===
  const SellContactStep = () => (
    <StepWrapper title="Your details" subtitle="How can we reach you?">
      <div className="space-y-4">
        <div>
          <label className={labelCls}>Full name *</label>
          <input value={sell.fullName} onChange={e => setSell(s => ({ ...s, fullName: e.target.value }))} placeholder="Your full name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <input type="tel" value={sell.phone} onChange={e => setSell(s => ({ ...s, phone: e.target.value }))} placeholder="+34 600 000 000" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" value={sell.email} onChange={e => setSell(s => ({ ...s, email: e.target.value }))} placeholder="you@email.com" className={inputCls} />
        </div>
      </div>
      <div className="mt-6">
        <button disabled={!sell.fullName.trim() || !sell.phone.trim() || !sell.email.trim()} onClick={() => setSellStep(4)} className={nextBtn(!sell.fullName.trim() || !sell.phone.trim() || !sell.email.trim())} style={{ background: accentColor, color: bgColor }}>
          Continue
        </button>
      </div>
    </StepWrapper>
  );

  // === SELL STEP 4: Language ===
  const SellLanguageStep = () => (
    <StepWrapper title="Preferred language" subtitle="In which language would you like to be contacted?">
      <div className="grid grid-cols-2 gap-2.5">
        {LANGUAGES.map(l => (
          <button key={l.code} onClick={() => { setSell(s => ({ ...s, language: l.code })); handleSubmit(); }}
            className={`px-4 py-3 rounded-sm border text-[14px] text-neutral-900 transition-all duration-200 ${sell.language === l.code ? "border-neutral-900/30 bg-neutral-50" : "border-neutral-200 hover:border-neutral-300"}`}
            style={{ color: sell.language === l.code ? accentColor : undefined }}>
            {l.label}
          </button>
        ))}
      </div>
    </StepWrapper>
  );

  // === BUY STEP 0: What they're looking for ===
  const BuySearchStep = () => (
    <StepWrapper title="What are you looking for?" subtitle="Tell us your preferred location.">
      <div className="space-y-5">
        <div>
          <label className={labelCls}>Location *</label>
          <input value={buy.location} onChange={e => setBuy(s => ({ ...s, location: e.target.value }))} placeholder="e.g. Ibiza, Marbella, Costa del Sol..." className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Min. budget</label>
            <input value={buy.priceMin} onChange={e => setBuy(s => ({ ...s, priceMin: e.target.value }))} placeholder="€500,000" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Max. budget</label>
            <input value={buy.priceMax} onChange={e => setBuy(s => ({ ...s, priceMax: e.target.value }))} placeholder="€5,000,000" className={inputCls} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button disabled={!buy.location.trim()} onClick={() => setBuyStep(1)} className={nextBtn(!buy.location.trim())} style={{ background: accentColor, color: bgColor }}>
          Continue
        </button>
      </div>
    </StepWrapper>
  );

  // === BUY STEP 1: Timeline ===
  const BuyTimelineStep = () => (
    <StepWrapper title="Purchase timeline" subtitle="When are you planning to buy?">
      <div className="space-y-2.5">
        {TIMELINES.map(t => (
          <button key={t.value} onClick={() => { setBuy(s => ({ ...s, timeline: t.value as BuyData["timeline"] })); setBuyStep(2); }}
            className={optionBtn(buy.timeline === t.value)} style={{ color: buy.timeline === t.value ? accentColor : undefined }}>
            <span className="text-[15px] text-neutral-900">{t.label}</span>
            <ChevronRight className="w-4 h-4 text-neutral-300 ml-auto shrink-0" />
          </button>
        ))}
      </div>
    </StepWrapper>
  );

  // === BUY STEP 2: Contact details ===
  const BuyContactStep = () => (
    <StepWrapper title="Your details" subtitle="How can we reach you?">
      <div className="space-y-4">
        <div>
          <label className={labelCls}>Full name *</label>
          <input value={buy.fullName} onChange={e => setBuy(s => ({ ...s, fullName: e.target.value }))} placeholder="Your full name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Phone *</label>
          <input type="tel" value={buy.phone} onChange={e => setBuy(s => ({ ...s, phone: e.target.value }))} placeholder="+34 600 000 000" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" value={buy.email} onChange={e => setBuy(s => ({ ...s, email: e.target.value }))} placeholder="you@email.com" className={inputCls} />
        </div>
      </div>
      <div className="mt-6">
        <button disabled={!buy.fullName.trim() || !buy.phone.trim() || !buy.email.trim()} onClick={() => setBuyStep(3)} className={nextBtn(!buy.fullName.trim() || !buy.phone.trim() || !buy.email.trim())} style={{ background: accentColor, color: bgColor }}>
          Continue
        </button>
      </div>
    </StepWrapper>
  );

  // === BUY STEP 3: Language ===
  const BuyLanguageStep = () => (
    <StepWrapper title="Preferred language" subtitle="In which language would you like to be contacted?">
      <div className="grid grid-cols-2 gap-2.5">
        {LANGUAGES.map(l => (
          <button key={l.code} onClick={() => { setBuy(s => ({ ...s, language: l.code })); handleSubmit(); }}
            className={`px-4 py-3 rounded-sm border text-[14px] text-neutral-900 transition-all duration-200 ${buy.language === l.code ? "border-neutral-900/30 bg-neutral-50" : "border-neutral-200 hover:border-neutral-300"}`}
            style={{ color: buy.language === l.code ? accentColor : undefined }}>
            {l.label}
          </button>
        ))}
      </div>
    </StepWrapper>
  );

  // === SUCCESS SCREEN ===
  const SuccessScreen = () => (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: `${accentColor}20` }}>
        <Check className="w-7 h-7" style={{ color: accentColor }} />
      </div>
      <h2 className="text-[22px] font-extralight text-neutral-900 mb-3" style={{ letterSpacing: "0.03em" }}>
        Thank you for your enquiry
      </h2>
      <p className="text-[14px] text-neutral-400 font-light leading-relaxed max-w-[340px] mb-8">
        A personal advisor will contact you shortly to {flow === "sell" ? "discuss the private sale of your property" : "provide access to our off-market portfolio"}.
      </p>
      <div className="flex items-center gap-6 text-neutral-300">
        <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span className="text-[13px]">Phone</span></div>
        <div className="flex items-center gap-2"><Mail className="w-4 h-4" /><span className="text-[13px]">Email</span></div>
        <div className="flex items-center gap-2"><Globe className="w-4 h-4" /><span className="text-[13px]">{LANGUAGES.find(l => l.code === (flow === "sell" ? sell.language : buy.language))?.label}</span></div>
      </div>
      <button onClick={handleClose} className="mt-10 text-[13px] tracking-[0.12em] uppercase text-neutral-400 hover:text-neutral-600 transition-colors">
        Close
      </button>
    </div>
  );

  // === Step wrapper ===
  function StepWrapper({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 px-6 py-6 overflow-y-auto">
          <h3 className="text-[20px] font-light text-neutral-900 mb-1" style={{ letterSpacing: "0.02em" }}>{title}</h3>
          <p className="text-[13px] text-neutral-400 font-light mb-7">{subtitle}</p>
          {children}
        </div>
      </div>
    );
  }

  // === Render active screen ===
  const renderScreen = () => {
    if (submitted) return <SuccessScreen />;
    if (!flow) return <ChooseScreen />;
    if (flow === "sell") {
      const screens = [SellOwnerStep, SellAgenciesStep, SellPropertyStep, SellContactStep, SellLanguageStep];
      const Screen = screens[sellStep];
      return <Screen />;
    }
    const screens = [BuySearchStep, BuyTimelineStep, BuyContactStep, BuyLanguageStep];
    const Screen = screens[buyStep];
    return <Screen />;
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={handleClose} />

      {/* Modal — full-screen on mobile, wider on desktop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white w-full max-w-[580px] rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col overflow-hidden"
          style={{ maxHeight: "min(92vh, 720px)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 shrink-0">
            {flow || submitted ? (
              <button onClick={goBack} className="text-neutral-400 hover:text-neutral-700 transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-[12px] tracking-[0.1em] uppercase">Back</span>
              </button>
            ) : (
              <span className="text-[12px] tracking-[0.2em] uppercase font-normal" style={{ color: accentColor }}>Off-Market</span>
            )}
            <button onClick={handleClose} className="text-neutral-300 hover:text-neutral-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <ProgressBar />

          {/* Content */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {renderScreen()}
          </div>
        </div>
      </div>
    </>
  );
}
