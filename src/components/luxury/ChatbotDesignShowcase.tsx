import { useState } from "react";
import {
  MessageCircle, X, ChevronDown, Send, Mic, MicOff, Square,
  MapPin, Bed, Bath, Maximize2, Star, Heart, ArrowRight,
  Check, AlertCircle, User, Mail, Phone, ChevronRight,
  Sparkles, Home, Key, DollarSign, Calendar, Search,
  RotateCcw, PhoneCall, Building2, Eye
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   AnastasIA — Luxury Chatbot Design Showcase
   White & Black Edition — Pure visual reference
   ═══════════════════════════════════════════════════════════ */

// ── Design tokens — White theme, black accents ──
const C = {
  bg: "#ffffff",
  bgPage: "#fafafa",
  bgPanel: "#ffffff",
  bgBubbleBot: "#f5f5f5",
  bgBubbleUser: "#0a0a0a",
  borderSubtle: "#e5e5e5",
  borderDark: "#d4d4d4",
  borderAccent: "rgba(10,10,10,0.2)",
  accent: "#0a0a0a",
  accentLight: "#262626",
  accentMuted: "#525252",
  text: "#0a0a0a",
  textMuted: "#737373",
  textDim: "#a3a3a3",
  green: "#22c55e",
  red: "#ef4444",
  page: "#ffffff",
};

const SANS = "'Jost', system-ui, sans-serif";

// ── Mock property images ──
const VILLAS = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
];

const BG_BLUR = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&h=900&fit=crop";

// ─────── Reusable Sub-Components ───────

/** Section Label */
const SectionLabel = ({ children }: { children: string }) => (
  <div className="mb-8">
    <p
      className="text-xs tracking-[0.2em] uppercase mb-1"
      style={{ color: C.accent, fontFamily: SANS }}
    >
      {children}
    </p>
    <div className="w-12 h-px" style={{ background: C.accent }} />
  </div>
);

/** State Label */
const StateLabel = ({ id, title }: { id: string; title: string }) => (
  <div className="mb-6 flex items-baseline gap-3">
    <span
      className="text-[11px] tracking-[0.15em] uppercase px-3 py-1 rounded-full"
      style={{ background: "#f0f0f0", color: C.accent, fontFamily: SANS }}
    >
      {id}
    </span>
    <h3 className="text-lg font-light" style={{ color: C.text, fontFamily: SANS }}>
      {title}
    </h3>
  </div>
);

/** Bot Avatar */
const BotAvatar = ({ size = 32 }: { size?: number }) => (
  <div
    className="rounded-full flex items-center justify-center flex-shrink-0"
    style={{
      width: size,
      height: size,
      background: C.accent,
    }}
  >
    <span style={{ fontFamily: SANS, color: "#fff", fontSize: size * 0.45, fontWeight: 600, letterSpacing: "0.02em" }}>
      A
    </span>
  </div>
);

/** Bot message bubble */
const BotBubble = ({ text, time, showAvatar = true }: { text: string; time?: string; showAvatar?: boolean }) => (
  <div className="flex items-end gap-2 max-w-[90%]">
    {showAvatar ? <BotAvatar size={28} /> : <div className="w-7" />}
    <div>
      <div
        className="px-4 py-3 text-[13px] leading-relaxed rounded-2xl rounded-bl-md"
        style={{
          background: C.bgBubbleBot,
          color: C.text,
          border: `1px solid ${C.borderSubtle}`,
          fontFamily: SANS,
        }}
      >
        {text}
      </div>
      {time && (
        <p className="text-[10px] mt-1 ml-1" style={{ color: C.textDim }}>
          {time}
        </p>
      )}
    </div>
  </div>
);

/** User message bubble */
const UserBubble = ({ text, time }: { text: string; time?: string }) => (
  <div className="flex flex-col items-end max-w-[90%] ml-auto">
    <div
      className="px-4 py-3 text-[13px] leading-relaxed rounded-2xl rounded-br-md"
      style={{
        background: C.bgBubbleUser,
        color: "#fff",
        fontFamily: SANS,
      }}
    >
      {text}
    </div>
    {time && (
      <p className="text-[10px] mt-1 mr-1" style={{ color: C.textDim }}>
        {time}
      </p>
    )}
  </div>
);

/** Quick Reply Chip */
const QuickChip = ({ text, primary = false }: { text: string; primary?: boolean }) => (
  <button
    className="px-4 py-2 rounded-full text-[12px] tracking-wide transition-all duration-200"
    style={{
      background: primary ? C.accent : "transparent",
      color: primary ? "#fff" : C.accent,
      border: primary ? "none" : `1px solid ${C.borderDark}`,
      fontFamily: SANS,
    }}
  >
    {text}
  </button>
);

/** Quick Reply Button (mobile — full width) */
const QuickButton = ({ text, primary = false }: { text: string; primary?: boolean }) => (
  <button
    className="w-full py-3 rounded-xl text-[14px] tracking-wide transition-all duration-200"
    style={{
      background: primary ? C.accent : "transparent",
      color: primary ? "#fff" : C.accent,
      border: primary ? "none" : `1px solid ${C.borderDark}`,
      fontFamily: SANS,
      height: 48,
    }}
  >
    {text}
  </button>
);

/** Input Bar */
const InputBar = ({ placeholder = "Escribe tu mensaje...", value = "", mobile = false }: {
  placeholder?: string; value?: string; mobile?: boolean;
}) => (
  <div
    className="flex items-center gap-2 px-4 py-3"
    style={{
      background: C.bg,
      borderTop: `1px solid ${C.borderSubtle}`,
    }}
  >
    <input
      readOnly
      value={value}
      placeholder={placeholder}
      className="flex-1 bg-transparent outline-none"
      style={{
        color: value ? C.text : C.textDim,
        fontSize: mobile ? 16 : 13,
        fontFamily: SANS,
      }}
    />
    <button
      className="flex items-center justify-center rounded-full transition-colors"
      style={{ width: mobile ? 44 : 36, height: mobile ? 44 : 36, color: C.textMuted }}
    >
      <Mic className="w-5 h-5" />
    </button>
    <button
      className="flex items-center justify-center rounded-full"
      style={{ width: mobile ? 44 : 36, height: mobile ? 44 : 36, background: C.accent }}
    >
      <Send className="w-4 h-4 text-white" />
    </button>
  </div>
);

/** Chat Header */
const ChatHeader = ({ onClose, mobile = false }: { onClose?: () => void; mobile?: boolean }) => (
  <div
    className="flex items-center justify-between px-5 py-4"
    style={{
      background: C.bg,
      borderBottom: `1px solid ${C.borderSubtle}`,
    }}
  >
    <div className="flex items-center gap-3">
      <BotAvatar size={mobile ? 36 : 34} />
      <div>
        <p style={{ fontFamily: SANS, color: C.text, fontSize: 16, fontWeight: 500 }}>
          AnastasIA
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: C.green }} />
          <span className="text-[11px] tracking-[0.1em] uppercase" style={{ color: C.textMuted, fontFamily: SANS }}>
            Online
          </span>
        </div>
      </div>
    </div>
    <button style={{ color: C.textMuted }} className="hover:opacity-70 transition-opacity">
      {mobile ? <X className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
    </button>
  </div>
);

/** Property Card Desktop (horizontal) */
const PropertyCardDesktop = ({
  image, ref: refId, title, location, price, beds, baths, sqm, saved = false,
}: {
  image: string; ref: string; title: string; location: string; price: string;
  beds: number; baths: number; sqm: number; saved?: boolean;
}) => (
  <div
    className="flex gap-3 rounded-xl overflow-hidden"
    style={{
      background: C.bg,
      border: saved ? `2px solid ${C.accent}` : `1px solid ${C.borderSubtle}`,
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    }}
  >
    <img src={image} alt={title} className="w-[120px] h-[110px] object-cover" />
    <div className="flex-1 py-2.5 pr-3 flex flex-col justify-between">
      <div>
        <p className="text-[10px] tracking-[0.1em]" style={{ color: C.textMuted, fontFamily: SANS }}>
          {refId}
        </p>
        <p className="text-[14px] font-medium" style={{ color: C.text, fontFamily: SANS }}>
          {title}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3" style={{ color: C.textMuted }} />
          <span className="text-[12px]" style={{ color: C.textMuted, fontFamily: SANS }}>
            {location}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="text-[16px] font-semibold" style={{ color: C.accent, fontFamily: SANS }}>
          {price}
        </p>
        <div className="flex items-center gap-2 text-[11px]" style={{ color: C.textMuted, fontFamily: SANS }}>
          <span>{beds} 🛏</span>
          <span>{baths} 🚿</span>
          <span>{sqm}m²</span>
        </div>
      </div>
      <button
        className="text-[12px] mt-1 self-start flex items-center gap-1 hover:opacity-70 transition-opacity"
        style={{ color: C.accent, fontFamily: SANS }}
      >
        Me interesa <ArrowRight className="w-3 h-3" />
      </button>
    </div>
    {saved && (
      <div className="p-2">
        <Star className="w-4 h-4" style={{ color: C.accent, fill: C.accent }} />
      </div>
    )}
  </div>
);

/** Property Card — Large animated version for blur overlay */
const PropertyCardAnimated = ({
  image, title, location, price, beds, baths, sqm, delay = 0,
}: {
  image: string; title: string; location: string; price: string;
  beds: number; baths: number; sqm: number; delay?: number;
}) => (
  <div
    className="rounded-xl overflow-hidden chatbot-card-enter"
    style={{
      background: C.bg,
      border: `1px solid ${C.borderSubtle}`,
      boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
      animationDelay: `${delay}ms`,
    }}
  >
    <img src={image} alt={title} className="w-full h-[160px] object-cover" />
    <div className="p-4 space-y-2">
      <p className="text-[16px] font-medium" style={{ color: C.text }}>{title}</p>
      <div className="flex items-center gap-1">
        <MapPin className="w-3 h-3" style={{ color: C.textMuted }} />
        <span className="text-[13px]" style={{ color: C.textMuted }}>{location}</span>
      </div>
      <p className="text-[20px] font-semibold" style={{ color: C.accent }}>{price}</p>
      <div className="flex items-center gap-4 text-[12px]" style={{ color: C.textMuted }}>
        <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {beds}</span>
        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {baths}</span>
        <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" /> {sqm}m²</span>
      </div>
      <button
        className="w-full py-2.5 rounded-lg text-[13px] mt-2 font-medium"
        style={{ background: C.accent, color: "#fff" }}
      >
        Ver propiedad →
      </button>
    </div>
  </div>
);

/** Property Card Mobile (vertical) */
const PropertyCardMobile = ({
  image, ref: refId, title, location, price, beds, baths, sqm,
}: {
  image: string; ref: string; title: string; location: string; price: string;
  beds: number; baths: number; sqm: number;
}) => (
  <div
    className="rounded-xl overflow-hidden"
    style={{ background: C.bg, border: `1px solid ${C.borderSubtle}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
  >
    <img src={image} alt={title} className="w-full h-[160px] object-cover" />
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] tracking-[0.1em]" style={{ color: C.textMuted }}>{refId}</p>
      </div>
      <p className="text-[15px] font-medium" style={{ color: C.text }}>{title}</p>
      <div className="flex items-center gap-1">
        <MapPin className="w-3 h-3" style={{ color: C.textMuted }} />
        <span className="text-[12px]" style={{ color: C.textMuted }}>{location}</span>
      </div>
      <p className="text-[18px] font-semibold" style={{ color: C.accent }}>{price}</p>
      <div className="flex items-center gap-3 text-[12px]" style={{ color: C.textMuted }}>
        <span>{beds} 🛏</span>
        <span>{baths} 🚿</span>
        <span>{sqm}m²</span>
      </div>
      <button
        className="w-full py-2.5 rounded-lg text-[13px] mt-2"
        style={{ background: C.accent, color: "#fff" }}
      >
        Me interesa →
      </button>
    </div>
  </div>
);

/** Lead Form */
const LeadForm = ({ state = "empty" }: { state?: "empty" | "filling" | "complete" | "success" | "error" }) => {
  const inputStyle = (focused = false, error = false) => ({
    background: "#f9f9f9",
    border: `1px solid ${error ? C.red : focused ? C.accent : C.borderSubtle}`,
    color: C.text,
    fontFamily: SANS,
    fontSize: 14,
  });

  if (state === "success") {
    return (
      <div
        className="rounded-xl p-6 text-center"
        style={{ background: "#f9f9f9", border: `1px solid ${C.borderSubtle}` }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ background: "#f0f0f0" }}
        >
          <Check className="w-6 h-6" style={{ color: C.accent }} />
        </div>
        <p className="text-[14px] font-medium" style={{ color: C.text }}>¡Gracias!</p>
        <p className="text-[13px] mt-1" style={{ color: C.textMuted }}>Un agente te contactará pronto.</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl p-5 space-y-3"
      style={{ background: "#f9f9f9", border: `1px solid ${C.borderSubtle}` }}
    >
      <p className="text-[14px] font-medium tracking-wide" style={{ color: C.accent }}>
        Datos de contacto
      </p>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: C.textDim }} />
        <input
          readOnly placeholder="Nombre"
          value={state === "complete" ? "Arman Yeghiazaryan" : state === "filling" ? "Arman" : ""}
          className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
          style={inputStyle(state === "filling")}
        />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: C.textDim }} />
        <input
          readOnly placeholder="Email"
          value={state === "complete" ? "arman@luxinmo.com" : ""}
          className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
          style={inputStyle(false, state === "error")}
        />
        {state === "error" && (
          <div className="flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" style={{ color: C.red }} />
            <span className="text-[11px]" style={{ color: C.red }}>Email inválido</span>
          </div>
        )}
      </div>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: C.textDim }} />
        <input
          readOnly placeholder="Teléfono"
          value={state === "complete" ? "+34 600 123 456" : ""}
          className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
          style={inputStyle()}
        />
      </div>
      <button
        className="w-full py-3 rounded-lg text-[14px] font-medium tracking-wide"
        style={{ background: C.accent, color: "#fff" }}
      >
        Enviar
      </button>
      <p className="text-center text-[13px] cursor-pointer" style={{ color: C.textMuted }}>Ahora no</p>
    </div>
  );
};

/** Typing Indicator */
const TypingIndicator = () => (
  <div className="flex items-end gap-2">
    <BotAvatar size={28} />
    <div
      className="px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5"
      style={{ background: C.bgBubbleBot, border: `1px solid ${C.borderSubtle}` }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            background: C.accent,
            opacity: 0.3 + i * 0.2,
            animation: `chatbotPulse 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  </div>
);

/** Waveform bars */
const WaveformBars = ({ count = 20, height = 24 }: { count?: number; height?: number }) => (
  <div className="flex items-center gap-[2px]" style={{ height }}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="rounded-full"
        style={{
          width: 3,
          height: Math.random() * height * 0.7 + height * 0.15,
          background: C.accent,
          opacity: 0.3 + Math.random() * 0.5,
        }}
      />
    ))}
  </div>
);

// ─────────────────────────────────────────────
// ── Chat Window Wrapper (desktop 400×560) ──
// ─────────────────────────────────────────────
const ChatWindowDesktop = ({ children }: { children: React.ReactNode }) => (
  <div
    className="relative flex flex-col rounded-2xl overflow-hidden"
    style={{
      width: 400,
      height: 560,
      background: C.bg,
      border: `1px solid ${C.borderSubtle}`,
      boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    }}
  >
    {children}
  </div>
);

// ─────────────────────────────────────────────
// ── Full-width blur overlay state ──
// ─────────────────────────────────────────────
const FullScreenBlurOverlay = () => (
  <div
    className="relative rounded-2xl overflow-hidden"
    style={{
      width: "100%",
      maxWidth: 900,
      height: 600,
      border: `1px solid ${C.borderSubtle}`,
      boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    }}
  >
    {/* Blurred background simulating the page */}
    <img
      src={BG_BLUR}
      className="absolute inset-0 w-full h-full object-cover"
      style={{ filter: "blur(12px) brightness(0.95)", transform: "scale(1.05)" }}
    />
    <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.7)" }} />

    {/* Overlay content: property cards appearing with animation */}
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
      {/* Close button */}
      <button
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: C.accent, color: "#fff" }}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Bot message */}
      <div className="flex items-center gap-3 mb-6">
        <BotAvatar size={36} />
        <p className="text-[15px] font-light" style={{ color: C.text }}>
          He encontrado <strong>3 villas</strong> que encajan con tu búsqueda
        </p>
      </div>

      {/* Animated cards grid */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-[750px]">
        <PropertyCardAnimated
          image={VILLAS[0]} title="Villa Panorámica" location="Altea"
          price="€1.200.000" beds={4} baths={3} sqm={280} delay={0}
        />
        <PropertyCardAnimated
          image={VILLAS[1]} title="Villa Mediterránea" location="Altea Hills"
          price="€980.000" beds={3} baths={2} sqm={220} delay={150}
        />
        <PropertyCardAnimated
          image={VILLAS[2]} title="Villa Sierra" location="Sierra de Altea"
          price="€1.450.000" beds={5} baths={4} sqm={350} delay={300}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button className="px-6 py-2.5 rounded-lg text-[13px] font-medium" style={{ background: C.accent, color: "#fff" }}>
          <MapPin className="w-4 h-4 inline mr-1.5" /> Ver en mapa
        </button>
        <button className="px-6 py-2.5 rounded-lg text-[13px] font-medium" style={{ border: `1px solid ${C.accent}`, color: C.accent }}>
          Ajustar búsqueda
        </button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// ── ChatGPT-style full interface ──
// ─────────────────────────────────────────────
const ChatGPTStyleInterface = () => (
  <div
    className="relative rounded-2xl overflow-hidden flex flex-col"
    style={{
      width: "100%",
      maxWidth: 900,
      height: 700,
      background: C.bg,
      border: `1px solid ${C.borderSubtle}`,
      boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    }}
  >
    {/* Top bar */}
    <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${C.borderSubtle}` }}>
      <div className="flex items-center gap-3">
        <BotAvatar size={32} />
        <div>
          <p className="text-[15px] font-medium" style={{ color: C.text }}>AnastasIA</p>
          <p className="text-[11px]" style={{ color: C.textMuted }}>Tu asistente inmobiliaria de lujo</p>
        </div>
      </div>
      <button style={{ color: C.textMuted }}><X className="w-5 h-5" /></button>
    </div>

    {/* Chat area — scrollable */}
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4" style={{ background: C.bgPage }}>
      {/* Welcome */}
      <div className="flex gap-3">
        <BotAvatar size={28} />
        <div className="flex-1 space-y-3">
          <div className="px-4 py-3 rounded-2xl rounded-tl-md text-[14px] leading-relaxed"
            style={{ background: C.bg, border: `1px solid ${C.borderSubtle}`, color: C.text }}>
            ¡Hola! Soy AnastasIA. ¿Qué tipo de propiedad buscas hoy?
          </div>
        </div>
      </div>

      {/* User message */}
      <div className="flex justify-end">
        <div className="px-4 py-3 rounded-2xl rounded-tr-md text-[14px] leading-relaxed max-w-[70%]"
          style={{ background: C.accent, color: "#fff" }}>
          Busco una villa de lujo en Altea, entre 800k y 1.5M
        </div>
      </div>

      {/* Bot: understanding */}
      <div className="flex gap-3">
        <BotAvatar size={28} />
        <div className="flex-1 space-y-3">
          <div className="px-4 py-3 rounded-2xl rounded-tl-md text-[14px] leading-relaxed"
            style={{ background: C.bg, border: `1px solid ${C.borderSubtle}`, color: C.text }}>
            Perfecto. He encontrado <strong>3 villas excepcionales</strong> en Altea dentro de tu rango de presupuesto. Aquí tienes:
          </div>

          {/* Property cards scrolling horizontally */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {[
              { image: VILLAS[0], title: "Villa Panorámica", price: "€1.200.000", beds: 4, baths: 3, sqm: 280 },
              { image: VILLAS[1], title: "Villa Mediterránea", price: "€980.000", beds: 3, baths: 2, sqm: 220 },
              { image: VILLAS[2], title: "Villa Sierra", price: "€1.450.000", beds: 5, baths: 4, sqm: 350 },
            ].map((p, i) => (
              <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden" style={{
                width: 220, background: C.bg, border: `1px solid ${C.borderSubtle}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
              }}>
                <img src={p.image} alt={p.title} className="w-full h-[120px] object-cover" />
                <div className="p-3 space-y-1.5">
                  <p className="text-[14px] font-medium" style={{ color: C.text }}>{p.title}</p>
                  <p className="text-[16px] font-semibold" style={{ color: C.accent }}>{p.price}</p>
                  <div className="flex gap-3 text-[11px]" style={{ color: C.textMuted }}>
                    <span>{p.beds} hab</span><span>{p.baths} baños</span><span>{p.sqm}m²</span>
                  </div>
                  <button className="w-full py-2 rounded-lg text-[12px] mt-1" style={{ background: C.accent, color: "#fff" }}>
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 rounded-full text-[12px]" style={{ background: C.accent, color: "#fff" }}>
              📅 Agendar visita
            </button>
            <button className="px-4 py-2 rounded-full text-[12px]" style={{ border: `1px solid ${C.borderDark}`, color: C.accent }}>
              📍 Ver en mapa
            </button>
            <button className="px-4 py-2 rounded-full text-[12px]" style={{ border: `1px solid ${C.borderDark}`, color: C.accent }}>
              💶 Ajustar presupuesto
            </button>
          </div>
        </div>
      </div>

      {/* User follow-up */}
      <div className="flex justify-end">
        <div className="px-4 py-3 rounded-2xl rounded-tr-md text-[14px] leading-relaxed max-w-[70%]"
          style={{ background: C.accent, color: "#fff" }}>
          Me interesa la Villa Panorámica. ¿Puedo agendar una visita?
        </div>
      </div>

      {/* Bot: lead form inline */}
      <div className="flex gap-3">
        <BotAvatar size={28} />
        <div className="flex-1 space-y-3">
          <div className="px-4 py-3 rounded-2xl rounded-tl-md text-[14px] leading-relaxed"
            style={{ background: C.bg, border: `1px solid ${C.borderSubtle}`, color: C.text }}>
            ¡Excelente elección! Déjame tus datos y un agente te contactará para organizar la visita.
          </div>
          <LeadForm state="filling" />
        </div>
      </div>
    </div>

    {/* Input bar — ChatGPT style */}
    <div className="px-6 py-4" style={{ borderTop: `1px solid ${C.borderSubtle}`, background: C.bg }}>
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "#f5f5f5", border: `1px solid ${C.borderSubtle}` }}>
        <input
          readOnly
          placeholder="Escribe tu mensaje..."
          className="flex-1 bg-transparent outline-none text-[14px]"
          style={{ color: C.textDim, fontFamily: SANS }}
        />
        <button style={{ color: C.textMuted }}><Mic className="w-5 h-5" /></button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.accent }}>
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
      <p className="text-center text-[11px] mt-2" style={{ color: C.textDim }}>
        AnastasIA puede cometer errores. Verifica la información importante.
      </p>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// ── Phone Frame (mobile 375) ──
// ─────────────────────────────────────────────
const PhoneFrame = ({ children, label }: { children: React.ReactNode; label?: string }) => (
  <div className="flex flex-col items-center gap-3">
    <div
      className="relative rounded-[36px] overflow-hidden"
      style={{
        width: 375,
        height: 812,
        background: C.bg,
        border: `3px solid ${C.borderSubtle}`,
        boxShadow: "0 25px 80px -20px rgba(0,0,0,0.12)",
      }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-7 pt-3 pb-1" style={{ background: C.bg }}>
        <span className="text-[12px] font-medium" style={{ color: C.text }}>9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-2 rounded-sm" style={{ border: `1px solid ${C.textMuted}` }}>
            <div className="w-2.5 h-full rounded-sm" style={{ background: C.green }} />
          </div>
        </div>
      </div>
      <div className="flex flex-col" style={{ height: 812 - 36 }}>
        {children}
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full" style={{ background: C.borderDark }} />
    </div>
    {label && <p className="text-[12px] mt-1" style={{ color: C.textMuted, fontFamily: SANS }}>{label}</p>}
  </div>
);

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function ChatbotDesignShowcase() {
  return (
    <div style={{ background: C.page, minHeight: "100vh", fontFamily: SANS }}>
      {/* ── Page Header ── */}
      <div className="py-16 px-8 text-center" style={{ borderBottom: `1px solid ${C.borderSubtle}` }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <BotAvatar size={48} />
          <h1 className="text-3xl font-light" style={{ color: C.text, fontFamily: SANS }}>
            AnastasIA
          </h1>
        </div>
        <p className="text-[11px] tracking-[0.25em] uppercase" style={{ color: C.accent }}>
          Luxury Property Advisor — Design System
        </p>
        <p className="text-[13px] mt-3 max-w-xl mx-auto" style={{ color: C.textMuted }}>
          Visual reference — White & Black edition. Desktop blur overlay, ChatGPT-style interface, mobile states, and component library.
        </p>
      </div>

      {/* ═══════════════════════════════════════
           PAGE 1 — DESKTOP STATES
         ═══════════════════════════════════════ */}
      <div className="max-w-[1200px] mx-auto px-8 py-20">
        <SectionLabel>Page 1 — Desktop States</SectionLabel>

        {/* 1.1 Chat Bubble */}
        <StateLabel id="1.1" title="Chat Bubble (Closed)" />
        <div className="flex items-center gap-8 mb-20 pl-4">
          <div className="flex flex-col items-center gap-2">
            <button
              className="w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg"
              style={{ background: C.accent }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <span className="text-[10px]" style={{ color: C.textDim }}>Default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <button
                className="w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg"
                style={{ background: C.accent }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </button>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: C.red }}>
                1
              </div>
            </div>
            <span className="text-[10px]" style={{ color: C.textDim }}>With badge</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              className="w-[66px] h-[66px] rounded-full flex items-center justify-center"
              style={{ background: C.accentLight, boxShadow: "0 6px 32px rgba(0,0,0,0.2)" }}
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </button>
            <span className="text-[10px]" style={{ color: C.textDim }}>Hover</span>
          </div>
        </div>

        {/* 1.2 Chat Window — Home (Empty) */}
        <StateLabel id="1.2" title="Chat Window (Empty — Home Page)" />
        <div className="mb-20">
          <ChatWindowDesktop>
            <ChatHeader />
            <div className="flex-1 flex flex-col justify-center p-5 space-y-4" style={{ background: C.bgPage }}>
              <BotBubble text="¡Hola! Soy AnastasIA, tu asistente inmobiliaria de lujo en la Costa Blanca. ¿En qué puedo ayudarte hoy?" time="12:34" />
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <QuickChip text="🏠 Comprar" primary />
                <QuickChip text="🔑 Alquilar" />
                <QuickChip text="💰 Vender" />
                <QuickChip text="✨ Solo explorar" />
              </div>
            </div>
            <InputBar />
          </ChatWindowDesktop>
        </div>

        {/* 1.3 Active Conversation */}
        <StateLabel id="1.3" title="Chat Window (Active Conversation)" />
        <div className="mb-20">
          <ChatWindowDesktop>
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: C.bgPage }}>
              <BotBubble text="¡Hola! Soy AnastasIA, tu asistente inmobiliaria de lujo en la Costa Blanca. ¿En qué puedo ayudarte hoy?" time="12:34" />
              <UserBubble text="Busco una villa de lujo en Altea" time="12:35" />
              <BotBubble text="Excelente elección. Altea es una de las zonas más exclusivas de la Costa Blanca. ¿Cuál es tu rango de presupuesto?" time="12:35" />
              <UserBubble text="Entre 800.000 y 1.500.000 euros" time="12:36" />
              <BotBubble text="Perfecto. He encontrado 3 villas excepcionales que encajan con tu búsqueda en Altea." time="12:36" />
              <div className="flex flex-wrap gap-2 ml-9 mt-1">
                <QuickChip text="📍 Ver similares" primary />
                <QuickChip text="💶 Ajustar presupuesto" />
                <QuickChip text="📅 Agendar visita" />
              </div>
            </div>
            <InputBar />
          </ChatWindowDesktop>
        </div>

        {/* 1.4 Property Cards in Chat */}
        <StateLabel id="1.4" title="Property Cards in Chat (Desktop)" />
        <div className="mb-20">
          <ChatWindowDesktop>
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: C.bgPage }}>
              <BotBubble text="He encontrado 3 villas excepcionales que encajan con tu búsqueda:" time="12:36" />
              <div className="ml-9 space-y-2">
                <PropertyCardDesktop image={VILLAS[0]} ref="REF-1234" title="Villa Panorámica" location="Altea, Costa Blanca" price="€1.200.000" beds={4} baths={3} sqm={280} />
                <PropertyCardDesktop image={VILLAS[1]} ref="REF-2456" title="Villa Mediterránea" location="Altea Hills" price="€980.000" beds={3} baths={2} sqm={220} />
                <PropertyCardDesktop image={VILLAS[2]} ref="REF-3789" title="Villa Sierra de Altea" location="Sierra de Altea" price="€1.450.000" beds={5} baths={4} sqm={350} />
              </div>
              <button className="ml-9 text-[12px] flex items-center gap-1 mt-2" style={{ color: C.accent }}>
                <MapPin className="w-3 h-3" /> Ver todas en el mapa
              </button>
            </div>
            <InputBar />
          </ChatWindowDesktop>
        </div>

        {/* 1.5 FULL-SCREEN BLUR OVERLAY — Properties appear with animation */}
        <StateLabel id="1.5" title="Full-Screen Blur Overlay — Property Results" />
        <p className="text-[13px] mb-4" style={{ color: C.textMuted }}>
          Cuando el usuario pide ver propiedades en desktop, toda la pantalla se desenfoca y las tarjetas aparecen con animación. Se cierra si el usuario cambia de idea.
        </p>
        <div className="mb-20">
          <FullScreenBlurOverlay />
        </div>

        {/* 1.6 ChatGPT-style full interface */}
        <StateLabel id="1.6" title="ChatGPT-Style Full Interface" />
        <p className="text-[13px] mb-4" style={{ color: C.textMuted }}>
          El usuario escribe y el formulario se desplaza hacia abajo mientras aparecen las propiedades en el flujo de conversación, tipo ChatGPT.
        </p>
        <div className="mb-20">
          <ChatGPTStyleInterface />
        </div>

        {/* 1.7 Comparison */}
        <StateLabel id="1.7" title="Property Comparison View" />
        <div className="mb-20">
          <ChatWindowDesktop>
            <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: `1px solid ${C.borderSubtle}` }}>
              <button style={{ color: C.textMuted }}><ChevronDown className="w-5 h-5 rotate-90" /></button>
              <p className="text-[14px] font-medium" style={{ color: C.text }}>Comparar propiedades</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4" style={{ background: C.bgPage }}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { img: VILLAS[0], title: "Villa Panorámica", ref: "REF-1234", price: "€1.200.000", beds: 4, baths: 3, sqm: 280, terrace: "45m²", pool: "Sí", parking: "2" },
                  { img: VILLAS[2], title: "Villa Sierra", ref: "REF-3789", price: "€1.450.000", beds: 5, baths: 4, sqm: 350, terrace: "60m²", pool: "Sí", parking: "3" },
                ].map((p, i) => (
                  <div key={i} className="space-y-2">
                    <img src={p.img} className="w-full h-[100px] object-cover rounded-lg" />
                    <p className="text-[10px]" style={{ color: C.textMuted }}>{p.ref}</p>
                    <p className="text-[13px] font-medium" style={{ color: C.text }}>{p.title}</p>
                    <p className="text-[15px] font-semibold" style={{ color: i === 0 ? C.green : C.accent }}>
                      {p.price}
                    </p>
                    <div className="space-y-1.5 text-[11px]" style={{ color: C.textMuted }}>
                      {[
                        ["Habitaciones", p.beds], ["Baños", p.baths], ["Superficie", `${p.sqm}m²`],
                        ["Terraza", p.terrace], ["Piscina", p.pool], ["Parking", p.parking],
                      ].map(([label, val]) => (
                        <div key={String(label)} className="flex justify-between" style={{ borderBottom: `1px solid ${C.borderSubtle}`, paddingBottom: 4 }}>
                          <span>{String(label)}</span>
                          <span style={{ color: C.text }}>{String(val)}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-2 rounded-lg text-[12px]" style={{ background: C.accent, color: "#fff" }}>
                      Agendar visita
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </ChatWindowDesktop>
        </div>

        {/* 1.8 Lead Form */}
        <StateLabel id="1.8" title="Lead Form (Desktop)" />
        <div className="flex gap-6 mb-20">
          <ChatWindowDesktop>
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: C.bgPage }}>
              <BotBubble text="Perfecto, déjame tus datos y un agente se pondrá en contacto contigo para organizar la visita." time="12:38" />
              <div className="ml-9"><LeadForm state="filling" /></div>
            </div>
            <InputBar />
          </ChatWindowDesktop>
          <ChatWindowDesktop>
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: C.bgPage }}>
              <BotBubble text="¡Datos recibidos!" time="12:39" />
              <div className="ml-9"><LeadForm state="success" /></div>
            </div>
            <InputBar />
          </ChatWindowDesktop>
        </div>

        {/* 1.9 Voice Recording */}
        <StateLabel id="1.9" title="Voice Recording (Desktop)" />
        <div className="flex gap-6 mb-20">
          <ChatWindowDesktop>
            <ChatHeader />
            <div className="flex-1 p-4" style={{ background: C.bgPage }}>
              <BotBubble text="¿En qué puedo ayudarte?" time="12:40" />
            </div>
            <div className="flex items-center gap-3 px-4 py-4" style={{ background: "#fafafa", borderTop: `1px solid ${C.borderSubtle}` }}>
              <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.red }}>
                <Square className="w-3.5 h-3.5 text-white" />
              </button>
              <span className="text-[13px] font-medium" style={{ color: C.text }}>0:05</span>
              <div className="flex-1"><WaveformBars count={30} height={20} /></div>
              <span className="text-[12px]" style={{ color: C.textMuted }}>Grabando...</span>
            </div>
          </ChatWindowDesktop>
          <ChatWindowDesktop>
            <ChatHeader />
            <div className="flex-1 p-4" style={{ background: C.bgPage }}>
              <BotBubble text="¿En qué puedo ayudarte?" time="12:40" />
            </div>
            <InputBar value="Busco un apartamento cerca de la playa" />
          </ChatWindowDesktop>
        </div>

        {/* 1.10 Proactive Trigger */}
        <StateLabel id="1.10" title="Proactive Trigger (Desktop)" />
        <div className="flex items-end gap-4 mb-20 pl-4">
          <div className="flex flex-col items-end gap-3">
            <div
              className="rounded-xl p-4 flex items-start gap-3"
              style={{
                width: 280,
                background: C.bg,
                border: `1px solid ${C.borderSubtle}`,
                boxShadow: "0 12px 40px -10px rgba(0,0,0,0.1)",
              }}
            >
              <BotAvatar size={28} />
              <div className="flex-1">
                <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
                  Veo que estás viendo esta villa en Altea. ¿Quieres que te cuente más sobre ella?
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1.5 rounded-lg text-[11px]" style={{ background: C.accent, color: "#fff" }}>
                    Sí, cuéntame
                  </button>
                  <button className="px-2 py-1.5 rounded-lg text-[11px]" style={{ color: C.textMuted }}>✕</button>
                </div>
              </div>
            </div>
            <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg" style={{ background: C.accent }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
           PAGE 2 — MOBILE STATES
         ═══════════════════════════════════════ */}
      <div style={{ borderTop: `1px solid ${C.borderSubtle}` }}>
        <div className="max-w-[1200px] mx-auto px-8 py-20">
          <SectionLabel>Page 2 — Mobile States</SectionLabel>

          {/* 2.1 Bubble Mobile */}
          <StateLabel id="2.1" title="Bubble Mobile (Closed)" />
          <div className="flex gap-8 mb-16 pl-4">
            <div className="flex flex-col items-center gap-2">
              <button className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: C.accent }}>
                <MessageCircle className="w-5 h-5 text-white" />
              </button>
              <span className="text-[10px]" style={{ color: C.textDim }}>Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <button className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: C.accent }}>
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: C.red }}>1</div>
              </div>
              <span className="text-[10px]" style={{ color: C.textDim }}>With badge</span>
            </div>
          </div>

          {/* Mobile states grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {/* 2.2 Empty Home */}
            <div>
              <StateLabel id="2.2" title="Chat — Home Page" />
              <PhoneFrame>
                <ChatHeader mobile />
                <div className="flex-1 flex flex-col justify-center p-5 space-y-4" style={{ background: C.bgPage }}>
                  <BotBubble text="¡Hola! Soy AnastasIA, tu asistente de lujo en la Costa Blanca." time="12:34" />
                  <div className="space-y-2 mt-4">
                    <QuickButton text="🏠 Comprar" primary />
                    <QuickButton text="🔑 Alquilar" />
                    <QuickButton text="💰 Vender" />
                    <QuickButton text="✨ Solo explorar" />
                  </div>
                </div>
                <InputBar mobile placeholder="Escribe o habla..." />
              </PhoneFrame>
            </div>

            {/* 2.3 Property Page */}
            <div>
              <StateLabel id="2.3" title="Chat — Property Page" />
              <PhoneFrame>
                <ChatHeader mobile />
                <div className="flex-1 flex flex-col justify-center p-5 space-y-4" style={{ background: C.bgPage }}>
                  <BotBubble text="Veo que estás viendo la Villa Panorámica en Altea (€1.200.000). ¿Tienes alguna pregunta?" time="12:34" />
                  <div className="space-y-2 mt-4">
                    <QuickButton text="📅 Agendar visita" primary />
                    <QuickButton text="💶 Preguntar por el precio" />
                    <QuickButton text="🏠 Propiedades similares" />
                    <QuickButton text="📞 Contactar agente" />
                  </div>
                </div>
                <InputBar mobile placeholder="Escribe o habla..." />
              </PhoneFrame>
            </div>

            {/* 2.4 Active Conversation */}
            <div>
              <StateLabel id="2.4" title="Active Conversation" />
              <PhoneFrame>
                <ChatHeader mobile />
                <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: C.bgPage }}>
                  <BotBubble text="¡Hola! Soy AnastasIA, tu asistente de lujo en la Costa Blanca." time="12:34" />
                  <UserBubble text="Busco una villa de lujo en Altea" time="12:35" />
                  <BotBubble text="Excelente elección. Altea es una de las zonas más exclusivas. ¿Cuál es tu presupuesto?" time="12:35" />
                  <UserBubble text="Entre 800.000 y 1.500.000 euros" time="12:36" />
                  <BotBubble text="Perfecto. He encontrado 3 villas excepcionales que encajan con tu búsqueda." time="12:36" />
                  <div className="space-y-2 mt-2">
                    <QuickButton text="📍 Ver similares" primary />
                    <QuickButton text="💶 Ajustar presupuesto" />
                    <QuickButton text="📅 Agendar visita" />
                  </div>
                </div>
                <InputBar mobile />
              </PhoneFrame>
            </div>

            {/* 2.5 Property Cards Mobile */}
            <div>
              <StateLabel id="2.5" title="Property Cards Mobile" />
              <PhoneFrame>
                <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: `1px solid ${C.borderSubtle}` }}>
                  <button style={{ color: C.textMuted }}><ChevronDown className="w-5 h-5 rotate-90" /></button>
                  <p className="text-[14px]" style={{ color: C.text }}>3 propiedades encontradas</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: C.bgPage }}>
                  <PropertyCardMobile image={VILLAS[0]} ref="REF-1234" title="Villa Panorámica" location="Altea, Costa Blanca" price="€1.200.000" beds={4} baths={3} sqm={280} />
                  <PropertyCardMobile image={VILLAS[1]} ref="REF-2456" title="Villa Mediterránea" location="Altea Hills" price="€980.000" beds={3} baths={2} sqm={220} />
                  <PropertyCardMobile image={VILLAS[2]} ref="REF-3789" title="Villa Sierra" location="Sierra de Altea" price="€1.450.000" beds={5} baths={4} sqm={350} />
                </div>
              </PhoneFrame>
            </div>

            {/* 2.6 Lead Form Mobile */}
            <div>
              <StateLabel id="2.6" title="Lead Form Mobile" />
              <PhoneFrame>
                <ChatHeader mobile />
                <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: C.bgPage }}>
                  <BotBubble text="Déjame tus datos y un agente te contactará para la visita." time="12:38" />
                  <LeadForm state="complete" />
                </div>
                <InputBar mobile />
              </PhoneFrame>
            </div>

            {/* 2.7 Voice Recording Mobile */}
            <div>
              <StateLabel id="2.7" title="Voice Recording Mobile" />
              <PhoneFrame>
                <ChatHeader mobile />
                <div className="flex-1 flex flex-col items-center justify-center p-8" style={{ background: C.bgPage }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: C.accent }}>
                    <Mic className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-[18px] font-light mb-2" style={{ color: C.text }}>0:07</p>
                  <WaveformBars count={35} height={28} />
                  <p className="text-[13px] mt-4" style={{ color: C.textMuted }}>Toca para parar</p>
                </div>
                <div className="px-4 py-4" style={{ borderTop: `1px solid ${C.borderSubtle}` }}>
                  <button className="w-full py-3 rounded-xl flex items-center justify-center gap-2" style={{ background: C.red }}>
                    <Square className="w-4 h-4 text-white" />
                    <span className="text-[14px] text-white">Detener grabación</span>
                  </button>
                </div>
              </PhoneFrame>
            </div>

            {/* 2.8 Returning Visitor */}
            <div>
              <StateLabel id="2.8" title="Returning Visitor" />
              <PhoneFrame>
                <ChatHeader mobile />
                <div className="flex-1 flex flex-col justify-center p-5 space-y-4" style={{ background: C.bgPage }}>
                  <BotBubble text="¡Hola de nuevo, Arman! La última vez buscabas villas en Altea entre 800k y 1.5M." time="12:34" />
                  <div className="space-y-2 mt-4">
                    <QuickButton text="🔄 Continuar búsqueda" primary />
                    <QuickButton text="🆕 Nueva búsqueda" />
                    <QuickButton text="📅 Agendar visita" />
                    <QuickButton text="📞 Hablar con agente" />
                  </div>
                </div>
                <InputBar mobile />
              </PhoneFrame>
            </div>

            {/* 2.9 Proactive Trigger Mobile */}
            <div>
              <StateLabel id="2.9" title="Proactive Trigger Mobile" />
              <PhoneFrame>
                <div className="flex-1 relative">
                  <img src={BG_BLUR} className="w-full h-full object-cover" style={{ filter: "blur(2px) brightness(0.95)" }} />
                  <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.5)" }} />
                </div>
                <div className="absolute bottom-20 left-4 right-4">
                  <div className="rounded-2xl p-4 flex items-center gap-3"
                    style={{ background: C.bg, border: `1px solid ${C.borderSubtle}`, boxShadow: "0 12px 40px -10px rgba(0,0,0,0.12)" }}>
                    <BotAvatar size={32} />
                    <p className="flex-1 text-[13px] leading-relaxed" style={{ color: C.text }}>¿Te interesa esta villa en Altea?</p>
                    <button style={{ color: C.textMuted }}><X className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <button className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: C.accent }}>
                    <MessageCircle className="w-5 h-5 text-white" />
                  </button>
                </div>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
           PAGE 3 — COMPONENT LIBRARY
         ═══════════════════════════════════════ */}
      <div style={{ borderTop: `1px solid ${C.borderSubtle}` }}>
        <div className="max-w-[1200px] mx-auto px-8 py-20">
          <SectionLabel>Page 3 — Component Library</SectionLabel>

          {/* 3.1 Chat Bubble */}
          <StateLabel id="3.1" title="Chat Bubble Button" />
          <div className="flex items-center gap-6 mb-16 pl-4">
            <div className="flex flex-col items-center gap-2">
              <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center" style={{ background: C.accent }}>
                <MessageCircle className="w-6 h-6 text-white" />
              </button>
              <span className="text-[10px]" style={{ color: C.textDim }}>Desktop 60px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center" style={{ background: C.accent }}>
                  <MessageCircle className="w-6 h-6 text-white" />
                </button>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: C.red }}>1</div>
              </div>
              <span className="text-[10px]" style={{ color: C.textDim }}>Badge</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-[66px] h-[66px] rounded-full flex items-center justify-center" style={{ background: C.accentLight, boxShadow: "0 6px 32px rgba(0,0,0,0.2)" }}>
                <MessageCircle className="w-7 h-7 text-white" />
              </button>
              <span className="text-[10px]" style={{ color: C.textDim }}>Hover</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: C.accent }}>
                <MessageCircle className="w-5 h-5 text-white" />
              </button>
              <span className="text-[10px]" style={{ color: C.textDim }}>Mobile 56px</span>
            </div>
          </div>

          {/* 3.2 Chat Header */}
          <StateLabel id="3.2" title="Chat Header" />
          <div className="space-y-4 mb-16" style={{ maxWidth: 400 }}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.borderSubtle}` }}>
              <ChatHeader />
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.borderSubtle}` }}>
              <ChatHeader mobile />
            </div>
          </div>

          {/* 3.3 Bot Bubble */}
          <StateLabel id="3.3" title="Bot Message Bubble" />
          <div className="space-y-4 mb-16" style={{ maxWidth: 400 }}>
            <BotBubble text="Hola, ¿en qué puedo ayudarte?" time="12:34" />
            <BotBubble text="Altea es una de las zonas más exclusivas de la Costa Blanca. Te recomiendo explorar las villas con vista al mar." time="12:35" />
          </div>

          {/* 3.4 User Bubble */}
          <StateLabel id="3.4" title="User Message Bubble" />
          <div className="space-y-4 mb-16" style={{ maxWidth: 400 }}>
            <UserBubble text="Hola" time="12:34" />
            <UserBubble text="Busco una villa de lujo en Altea" time="12:35" />
          </div>

          {/* 3.5 Quick Reply Buttons */}
          <StateLabel id="3.5" title="Quick Reply Buttons" />
          <div className="space-y-6 mb-16">
            <div>
              <p className="text-[11px] mb-3" style={{ color: C.textDim }}>Desktop — Horizontal Chips</p>
              <div className="flex flex-wrap gap-2">
                <QuickChip text="🏠 Comprar" primary />
                <QuickChip text="🔑 Alquilar" />
                <QuickChip text="💰 Vender" />
                <QuickChip text="✨ Solo explorar" />
              </div>
            </div>
            <div style={{ maxWidth: 340 }}>
              <p className="text-[11px] mb-3" style={{ color: C.textDim }}>Mobile — Vertical Stack</p>
              <div className="space-y-2">
                <QuickButton text="🏠 Comprar" primary />
                <QuickButton text="🔑 Alquilar" />
                <QuickButton text="💰 Vender" />
              </div>
            </div>
          </div>

          {/* 3.6 Property Card */}
          <StateLabel id="3.6" title="Property Card" />
          <div className="grid grid-cols-2 gap-6 mb-16" style={{ maxWidth: 700 }}>
            <div>
              <p className="text-[11px] mb-3" style={{ color: C.textDim }}>Desktop Compact</p>
              <PropertyCardDesktop image={VILLAS[0]} ref="REF-1234" title="Villa Panorámica" location="Altea, Costa Blanca" price="€1.200.000" beds={4} baths={3} sqm={280} />
            </div>
            <div>
              <p className="text-[11px] mb-3" style={{ color: C.textDim }}>Saved State</p>
              <PropertyCardDesktop image={VILLAS[1]} ref="REF-2456" title="Villa Mediterránea" location="Altea Hills" price="€980.000" beds={3} baths={2} sqm={220} saved />
            </div>
            <div>
              <p className="text-[11px] mb-3" style={{ color: C.textDim }}>Mobile Full-width</p>
              <PropertyCardMobile image={VILLAS[2]} ref="REF-3789" title="Villa Sierra" location="Sierra de Altea" price="€1.450.000" beds={5} baths={4} sqm={350} />
            </div>
          </div>

          {/* 3.7 Lead Form */}
          <StateLabel id="3.7" title="Lead Form" />
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-16" style={{ maxWidth: 900 }}>
            <div><p className="text-[11px] mb-3" style={{ color: C.textDim }}>Empty</p><LeadForm state="empty" /></div>
            <div><p className="text-[11px] mb-3" style={{ color: C.textDim }}>Filling</p><LeadForm state="filling" /></div>
            <div><p className="text-[11px] mb-3" style={{ color: C.textDim }}>Error</p><LeadForm state="error" /></div>
            <div><p className="text-[11px] mb-3" style={{ color: C.textDim }}>Success</p><LeadForm state="success" /></div>
          </div>

          {/* 3.8 Typing Indicator */}
          <StateLabel id="3.8" title="Typing Indicator" />
          <div className="mb-16"><TypingIndicator /></div>

          {/* 3.9 Voice States */}
          <StateLabel id="3.9" title="Voice Recording States" />
          <div className="flex gap-6 mb-16">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#f5f5f5", border: `1px solid ${C.borderSubtle}` }}>
                <Mic className="w-5 h-5" style={{ color: C.textMuted }} />
              </div>
              <span className="text-[10px]" style={{ color: C.textDim }}>Idle</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#f0f0f0", border: `1px solid ${C.accent}` }}>
                <Mic className="w-5 h-5" style={{ color: C.accent }} />
              </div>
              <span className="text-[10px]" style={{ color: C.textDim }}>Recording</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: C.red }}>
                <Square className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px]" style={{ color: C.textDim }}>Stop</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <WaveformBars count={25} height={24} />
              <span className="text-[10px]" style={{ color: C.textDim }}>Waveform</span>
            </div>
          </div>

          {/* 3.10 Input Bar */}
          <StateLabel id="3.10" title="Input Bar" />
          <div className="space-y-4 mb-16" style={{ maxWidth: 400 }}>
            <div>
              <p className="text-[11px] mb-2" style={{ color: C.textDim }}>Desktop — Empty</p>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.borderSubtle}` }}><InputBar /></div>
            </div>
            <div>
              <p className="text-[11px] mb-2" style={{ color: C.textDim }}>Desktop — With text</p>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.borderSubtle}` }}><InputBar value="Busco un apartamento cerca de la playa" /></div>
            </div>
            <div>
              <p className="text-[11px] mb-2" style={{ color: C.textDim }}>Mobile</p>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.borderSubtle}` }}><InputBar mobile placeholder="Escribe o habla..." /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 text-center" style={{ borderTop: `1px solid ${C.borderSubtle}` }}>
        <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: C.textDim }}>
          AnastasIA Design System — White & Black Edition
        </p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes chatbotPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes chatbotCardEnter {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chatbot-card-enter {
          animation: chatbotCardEnter 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
