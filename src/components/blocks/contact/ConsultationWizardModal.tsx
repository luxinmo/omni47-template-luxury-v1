/**
 * CONSULTATION WIZARD MODAL
 * Multi-step wizard for private consultation requests.
 * Flow: Buy or Sell → Contact preference → Details → Language → Success
 * Inspired by OffmarketWizardModal with white/clean aesthetic.
 */

import { useState, useCallback } from "react";
import { X, ArrowLeft, Home, Search, ChevronRight, Check, Phone, Mail, MessageCircle, Video, Building2, Eye, MapPin, Globe } from "lucide-react";
import { palette, fonts } from "@/config/template";

interface ConsultationWizardModalProps {
  open: boolean;
  onClose: () => void;
}

type Flow = null | "buy" | "sell";
type ContactMethod = "" | "call" | "whatsapp" | "office" | "videocall";

interface FormData {
  contactMethod: ContactMethod;
  location: string;
  priceMin: string;
  priceMax: string;
  propertyType: string;
  timeline: string;
  fullName: string;
  phone: string;
  email: string;
  language: string;
  message: string;
}

const LANGUAGES = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "nl", label: "Nederlands" },
  { code: "ru", label: "Русский" },
  { code: "sv", label: "Svenska" },
  { code: "no", label: "Norsk" },
  { code: "da", label: "Dansk" },
];

const TIMELINES = [
  { value: "immediate", label: "Lo antes posible" },
  { value: "3months", label: "En los próximos 3 meses" },
  { value: "6months", label: "En los próximos 6 meses" },
  { value: "12months", label: "En los próximos 12 meses" },
  { value: "flexible", label: "Sin prisa, soy flexible" },
];

const accentColor = palette.accent;

export default function ConsultationWizardModal({ open, onClose }: ConsultationWizardModalProps) {
  const [flow, setFlow] = useState<Flow>(null);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FormData>({
    contactMethod: "", location: "", priceMin: "", priceMax: "",
    propertyType: "", timeline: "", fullName: "", phone: "", email: "",
    language: "", message: "",
  });

  const totalSteps = flow === "buy" ? 4 : flow === "sell" ? 3 : 0;

  const reset = useCallback(() => {
    setFlow(null); setStep(0); setSubmitted(false);
    setData({ contactMethod: "", location: "", priceMin: "", priceMax: "", propertyType: "", timeline: "", fullName: "", phone: "", email: "", language: "", message: "" });
  }, []);

  const handleClose = () => { reset(); onClose(); };

  const goBack = () => {
    if (submitted) { setSubmitted(false); return; }
    if (step > 0) setStep(s => s - 1);
    else setFlow(null);
  };

  if (!open) return null;

  const optionBtn = (selected: boolean) =>
    `w-full text-left px-5 py-4 rounded-sm border transition-all duration-200 flex items-center gap-4 ${
      selected ? "border-neutral-900/30 bg-neutral-50" : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
    }`;

  const inputCls = "w-full bg-white border border-neutral-200 rounded-sm px-4 py-3 text-[16px] sm:text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors";
  const labelCls = "text-[12px] tracking-[0.15em] uppercase text-neutral-400 mb-2 block";
  const nextBtn = (disabled: boolean) =>
    `w-full py-3.5 text-[13px] tracking-[0.14em] uppercase font-medium rounded-sm transition-all duration-300 ${
      disabled ? "opacity-30 cursor-not-allowed" : "hover:opacity-90 active:scale-[0.98]"
    }`;

  const ProgressBar = () =>
    totalSteps > 0 && !submitted ? (
      <div className="flex gap-1.5 px-6 pt-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="h-[2px] flex-1 rounded-full transition-all duration-500" style={{ background: i <= step ? accentColor : "rgba(0,0,0,0.08)" }} />
        ))}
      </div>
    ) : null;

  /* ─── CHOOSE SCREEN ─── */
  const ChooseScreen = () => (
    <div className="px-6 py-6">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${accentColor}15` }}>
          <MessageCircle className="w-6 h-6" style={{ color: accentColor }} />
        </div>
        <h2 className="text-[22px] font-light text-neutral-900 mb-2" style={{ fontFamily: fonts.heading, letterSpacing: "0.03em" }}>
          Cita Privada con un Asesor
        </h2>
        <p className="text-[13px] text-neutral-500 font-light leading-relaxed max-w-[380px] mx-auto">
          Una cita privada le garantiza atención exclusiva, acceso a propiedades fuera de mercado y asesoramiento confidencial adaptado a sus necesidades.
        </p>
      </div>

      <div className="space-y-3">
        <button onClick={() => { setFlow("buy"); setStep(0); }} className={optionBtn(false)}>
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: `${accentColor}18` }}>
            <Search className="w-5 h-5" style={{ color: accentColor }} />
          </div>
          <div className="min-w-0">
            <p className="text-[15px] text-neutral-900 font-medium mb-0.5">Quiero comprar</p>
            <p className="text-[13px] text-neutral-400 font-light">Busco una propiedad en Javea o alrededores</p>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-300 ml-auto shrink-0" />
        </button>

        <button onClick={() => { setFlow("sell"); setStep(0); }} className={optionBtn(false)}>
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: `${accentColor}18` }}>
            <Home className="w-5 h-5" style={{ color: accentColor }} />
          </div>
          <div className="min-w-0">
            <p className="text-[15px] text-neutral-900 font-medium mb-0.5">Quiero vender</p>
            <p className="text-[13px] text-neutral-400 font-light">Tengo una propiedad y quiero venderla</p>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-300 ml-auto shrink-0" />
        </button>
      </div>
    </div>
  );

  /* ─── STEP: CONTACT PREFERENCE ─── */
  const ContactPreferenceStep = () => (
    <StepWrapper title="¿Cómo prefiere ser contactado?" subtitle="Elija la forma que le resulte más cómoda. Su asesor se adaptará a su preferencia.">
      <div className="space-y-2.5">
        {([
          { key: "call" as const, label: "Llamada telefónica", desc: "Le llamamos en su horario preferido", icon: Phone },
          { key: "whatsapp" as const, label: "WhatsApp", desc: "Conversación directa y confidencial", icon: MessageCircle },
          { key: "office" as const, label: "Visita presencial en oficina", desc: "Reúnase en nuestra oficina de Altea", icon: Building2 },
          { key: "videocall" as const, label: "Videollamada", desc: "Reunión virtual desde cualquier lugar", icon: Video },
        ]).map(opt => (
          <button key={opt.key} onClick={() => { setData(d => ({ ...d, contactMethod: opt.key })); setStep(s => s + 1); }} className={optionBtn(data.contactMethod === opt.key)}>
            <opt.icon className="w-5 h-5 shrink-0 text-neutral-500" />
            <div className="min-w-0">
              <p className="text-[15px] text-neutral-900">{opt.label}</p>
              <p className="text-[12px] text-neutral-400 font-light">{opt.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-300 ml-auto shrink-0" />
          </button>
        ))}
      </div>
    </StepWrapper>
  );

  /* ─── BUY: SEARCH CRITERIA ─── */
  const BuySearchStep = () => (
    <StepWrapper title="¿Qué busca?" subtitle="Cuéntenos sobre la propiedad ideal para usted.">
      <div className="space-y-5">
        <div>
          <label className={labelCls}>Zona preferida *</label>
          <input value={data.location} onChange={e => setData(d => ({ ...d, location: e.target.value }))} placeholder="Ej: Portichol, La Corona, Tosalet..." className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Presupuesto mín.</label>
            <input value={data.priceMin} onChange={e => setData(d => ({ ...d, priceMin: e.target.value }))} placeholder="€500.000" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Presupuesto máx.</label>
            <input value={data.priceMax} onChange={e => setData(d => ({ ...d, priceMax: e.target.value }))} placeholder="€5.000.000" className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Plazo de compra</label>
          <div className="space-y-2">
            {TIMELINES.map(t => (
              <button key={t.value} onClick={() => setData(d => ({ ...d, timeline: t.value }))}
                className={`w-full text-left px-4 py-2.5 rounded-sm border text-[14px] transition-all ${data.timeline === t.value ? "border-neutral-900/30 bg-neutral-50" : "border-neutral-200 hover:border-neutral-300"}`}
                style={{ color: data.timeline === t.value ? accentColor : "rgb(38,38,38)" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button disabled={!data.location.trim()} onClick={() => setStep(s => s + 1)} className={nextBtn(!data.location.trim())} style={{ background: accentColor, color: "#fff" }}>
          Continuar
        </button>
      </div>
    </StepWrapper>
  );

  /* ─── SELL: PROPERTY INFO ─── */
  const SellPropertyStep = () => (
    <StepWrapper title="Su propiedad" subtitle="Cuéntenos sobre la propiedad que desea vender.">
      <div className="space-y-5">
        <div>
          <label className={labelCls}>Ubicación *</label>
          <input value={data.location} onChange={e => setData(d => ({ ...d, location: e.target.value }))} placeholder="Ej: Portichol, La Corona, Montgó..." className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Tipo de propiedad</label>
          <input value={data.propertyType} onChange={e => setData(d => ({ ...d, propertyType: e.target.value }))} placeholder="Ej: Villa, apartamento, finca..." className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Precio orientativo (opcional)</label>
          <input value={data.priceMin} onChange={e => setData(d => ({ ...d, priceMin: e.target.value }))} placeholder="Ej: €1.500.000" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Notas adicionales</label>
          <textarea value={data.message} onChange={e => setData(d => ({ ...d, message: e.target.value }))} placeholder="Cualquier detalle que considere relevante..." className={`${inputCls} resize-none`} rows={2} />
        </div>
      </div>
      <div className="mt-8">
        <button disabled={!data.location.trim()} onClick={() => setStep(s => s + 1)} className={nextBtn(!data.location.trim())} style={{ background: accentColor, color: "#fff" }}>
          Continuar
        </button>
      </div>
    </StepWrapper>
  );

  /* ─── CONTACT DETAILS (shared) ─── */
  const ContactDetailsStep = () => (
    <StepWrapper title="Sus datos de contacto" subtitle="Todos los campos son obligatorios para poder atenderle correctamente.">
      <div className="space-y-4">
        <div>
          <label className={labelCls}>Nombre completo *</label>
          <input value={data.fullName} onChange={e => setData(d => ({ ...d, fullName: e.target.value }))} placeholder="Su nombre y apellidos" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Teléfono *</label>
          <input type="tel" value={data.phone} onChange={e => setData(d => ({ ...d, phone: e.target.value }))} placeholder="+34 600 000 000" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input type="email" value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))} placeholder="su@email.com" className={inputCls} />
        </div>
      </div>
      <div className="mt-6">
        <button
          disabled={!data.fullName.trim() || !data.phone.trim() || !data.email.trim()}
          onClick={() => setStep(s => s + 1)}
          className={nextBtn(!data.fullName.trim() || !data.phone.trim() || !data.email.trim())}
          style={{ background: accentColor, color: "#fff" }}
        >
          Continuar
        </button>
      </div>
    </StepWrapper>
  );

  /* ─── LANGUAGE (final step → submit) ─── */
  const LanguageStep = () => (
    <StepWrapper title="Idioma preferido" subtitle="¿En qué idioma desea que le contactemos?">
      <div className="grid grid-cols-3 gap-2">
        {LANGUAGES.map(l => (
          <button key={l.code} onClick={() => { setData(d => ({ ...d, language: l.code })); setSubmitted(true); }}
            className={`px-3 py-3 rounded-sm border text-[14px] text-neutral-900 transition-all duration-200 text-center ${data.language === l.code ? "border-neutral-900/30 bg-neutral-50" : "border-neutral-200 hover:border-neutral-300"}`}
            style={{ color: data.language === l.code ? accentColor : undefined }}>
            {l.label}
          </button>
        ))}
      </div>
    </StepWrapper>
  );

  /* ─── SUCCESS ─── */
  const SuccessScreen = () => (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: `${accentColor}20` }}>
        <Check className="w-7 h-7" style={{ color: accentColor }} />
      </div>
      <h2 className="text-[22px] font-light text-neutral-900 mb-3" style={{ fontFamily: fonts.heading, letterSpacing: "0.03em" }}>
        Solicitud recibida
      </h2>
      <p className="text-[14px] text-neutral-500 font-light leading-relaxed max-w-[340px] mb-8">
        {flow === "buy"
          ? "Un asesor especialista en Javea se pondrá en contacto con usted para organizar su cita privada y mostrarle propiedades que se ajusten a sus criterios."
          : "Un asesor se pondrá en contacto con usted para realizar una valoración personalizada de su propiedad."}
      </p>
      <div className="flex items-center gap-5 text-neutral-400 text-[13px]">
        <div className="flex items-center gap-1.5">
          {data.contactMethod === "call" && <><Phone className="w-4 h-4" /> Llamada</>}
          {data.contactMethod === "whatsapp" && <><MessageCircle className="w-4 h-4" /> WhatsApp</>}
          {data.contactMethod === "office" && <><Building2 className="w-4 h-4" /> Presencial</>}
          {data.contactMethod === "videocall" && <><Video className="w-4 h-4" /> Videollamada</>}
        </div>
        <div className="flex items-center gap-1.5">
          <Globe className="w-4 h-4" />
          {LANGUAGES.find(l => l.code === data.language)?.label}
        </div>
      </div>
      <button onClick={handleClose} className="mt-10 text-[13px] tracking-[0.12em] uppercase text-neutral-400 hover:text-neutral-600 transition-colors">
        Cerrar
      </button>
    </div>
  );

  function StepWrapper({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 px-6 py-6 overflow-y-auto">
          <h3 className="text-[20px] font-light text-neutral-900 mb-1" style={{ fontFamily: fonts.heading, letterSpacing: "0.02em" }}>{title}</h3>
          <p className="text-[13px] text-neutral-400 font-light mb-7">{subtitle}</p>
          {children}
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    if (submitted) return <SuccessScreen />;
    if (!flow) return <ChooseScreen />;
    if (flow === "buy") {
      const screens = [ContactPreferenceStep, BuySearchStep, ContactDetailsStep, LanguageStep];
      return screens[step] ? screens[step]() : null;
    }
    const screens = [ContactPreferenceStep, SellPropertyStep, ContactDetailsStep];
    if (step === totalSteps - 1 && flow === "sell") {
      // Sell last step is contact details, then language on submit
      // Actually let's add language step for sell too
    }
    // sell: 0=contact pref, 1=property, 2=contact details → then language
    if (step < 3) {
      const screens = [ContactPreferenceStep, SellPropertyStep, ContactDetailsStep];
      return screens[step] ? screens[step]() : null;
    }
    return null;
  };

  // Recalculate: sell has 4 steps too (pref, property, details, language)
  const actualTotalSteps = 4;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={handleClose} />
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
        <div
          className="bg-white w-full sm:max-w-[520px] rounded-t-xl sm:rounded-sm shadow-2xl animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200 flex flex-col overflow-hidden"
          style={{ maxHeight: "min(95vh, 720px)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 shrink-0">
            {flow || submitted ? (
              <button onClick={goBack} className="text-neutral-400 hover:text-neutral-700 transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-[12px] tracking-[0.1em] uppercase">Atrás</span>
              </button>
            ) : (
              <span className="text-[12px] tracking-[0.2em] uppercase font-normal" style={{ color: accentColor }}>Cita Privada</span>
            )}
            <button onClick={handleClose} className="text-neutral-300 hover:text-neutral-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          {flow && !submitted && (
            <div className="flex gap-1.5 px-6 pt-4">
              {Array.from({ length: actualTotalSteps }).map((_, i) => (
                <div key={i} className="h-[2px] flex-1 rounded-full transition-all duration-500" style={{ background: i <= step ? accentColor : "rgba(0,0,0,0.08)" }} />
              ))}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {(() => {
              if (submitted) return <SuccessScreen />;
              if (!flow) return <ChooseScreen />;
              const allScreens = [ContactPreferenceStep, flow === "buy" ? BuySearchStep : SellPropertyStep, ContactDetailsStep, LanguageStep];
              const Screen = allScreens[step];
              return Screen ? <Screen /> : null;
            })()}
          </div>
        </div>
      </div>
    </>
  );
}
