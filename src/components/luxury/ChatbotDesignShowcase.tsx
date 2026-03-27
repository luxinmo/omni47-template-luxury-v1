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
   Pure visual reference — no backend logic
   ═══════════════════════════════════════════════════════════ */

// ── Design tokens ──
const C = {
  bg: "#0f0f17",
  bgDeep: "#0a0a0f",
  bgPanel: "rgba(255,255,255,0.04)",
  bgBubbleBot: "rgba(255,255,255,0.06)",
  borderSubtle: "rgba(255,255,255,0.1)",
  borderGold: "rgba(200,164,94,0.4)",
  gold: "#c8a45e",
  goldLight: "#e8d5a3",
  goldDark: "#a8893a",
  goldGrad: "linear-gradient(135deg, #c8a45e, #d4af37)",
  goldGradHover: "linear-gradient(135deg, #d4af37, #e8c55a)",
  text: "#ffffff",
  textMuted: "#a0a0b0",
  textDim: "#606070",
  green: "#4ade80",
  red: "#ef4444",
  page: "#08080e",
};

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', 'Jost', system-ui, sans-serif";

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
      style={{ color: C.gold, fontFamily: SANS }}
    >
      {children}
    </p>
    <div className="w-12 h-px" style={{ background: C.gold }} />
  </div>
);

/** State Label */
const StateLabel = ({ id, title }: { id: string; title: string }) => (
  <div className="mb-6 flex items-baseline gap-3">
    <span
      className="text-[11px] tracking-[0.15em] uppercase px-3 py-1 rounded-full"
      style={{ background: "rgba(200,164,94,0.12)", color: C.gold, fontFamily: SANS }}
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
      background: C.goldGrad,
      border: `1.5px solid ${C.gold}`,
    }}
  >
    <span style={{ fontFamily: SERIF, color: "#fff", fontSize: size * 0.45, fontWeight: 600 }}>
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
          backdropFilter: "blur(12px)",
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
        background: C.goldGrad,
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

/** Quick Reply Chip (desktop) */
const QuickChip = ({
  text,
  primary = false,
}: {
  text: string;
  primary?: boolean;
}) => (
  <button
    className="px-4 py-2 rounded-full text-[12px] tracking-wide transition-all duration-200"
    style={{
      background: primary ? C.goldGrad : "transparent",
      color: primary ? "#fff" : C.gold,
      border: primary ? "none" : `1px solid ${C.borderGold}`,
      fontFamily: SANS,
    }}
  >
    {text}
  </button>
);

/** Quick Reply Button (mobile — full width) */
const QuickButton = ({
  text,
  primary = false,
}: {
  text: string;
  primary?: boolean;
}) => (
  <button
    className="w-full py-3 rounded-xl text-[14px] tracking-wide transition-all duration-200"
    style={{
      background: primary ? C.goldGrad : "transparent",
      color: primary ? "#fff" : C.gold,
      border: primary ? "none" : `1px solid ${C.borderGold}`,
      fontFamily: SANS,
      height: 48,
    }}
  >
    {text}
  </button>
);

/** Input Bar */
const InputBar = ({
  placeholder = "Escribe tu mensaje...",
  value = "",
  mobile = false,
}: {
  placeholder?: string;
  value?: string;
  mobile?: boolean;
}) => (
  <div
    className="flex items-center gap-2 px-4 py-3"
    style={{
      background: "rgba(255,255,255,0.03)",
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
      style={{
        width: mobile ? 44 : 36,
        height: mobile ? 44 : 36,
        color: C.textMuted,
      }}
    >
      <Mic className="w-5 h-5" />
    </button>
    <button
      className="flex items-center justify-center rounded-full"
      style={{
        width: mobile ? 44 : 36,
        height: mobile ? 44 : 36,
        background: C.goldGrad,
      }}
    >
      <Send className="w-4 h-4 text-white" />
    </button>
  </div>
);

/** Chat Header */
const ChatHeader = ({
  onClose,
  mobile = false,
}: {
  onClose?: () => void;
  mobile?: boolean;
}) => (
  <div
    className="flex items-center justify-between px-5 py-4"
    style={{
      background: "rgba(15,15,23,0.95)",
      borderBottom: `1px solid ${C.borderSubtle}`,
      backdropFilter: "blur(20px)",
    }}
  >
    <div className="flex items-center gap-3">
      <BotAvatar size={mobile ? 36 : 34} />
      <div>
        <p style={{ fontFamily: SERIF, color: C.text, fontSize: 16, fontWeight: 500 }}>
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
  image,
  ref: refId,
  title,
  location,
  price,
  beds,
  baths,
  sqm,
  saved = false,
}: {
  image: string;
  ref: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqm: number;
  saved?: boolean;
}) => (
  <div
    className="flex gap-3 rounded-xl overflow-hidden"
    style={{
      background: C.bgBubbleBot,
      border: saved ? `1px solid ${C.gold}` : `1px solid ${C.borderSubtle}`,
      backdropFilter: "blur(12px)",
    }}
  >
    <img src={image} alt={title} className="w-[120px] h-[110px] object-cover" />
    <div className="flex-1 py-2.5 pr-3 flex flex-col justify-between">
      <div>
        <p className="text-[10px] tracking-[0.1em]" style={{ color: C.gold, fontFamily: SANS }}>
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
        <p className="text-[16px] font-semibold" style={{ color: C.gold, fontFamily: SANS }}>
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
        style={{ color: C.gold, fontFamily: SANS }}
      >
        Me interesa <ArrowRight className="w-3 h-3" />
      </button>
    </div>
    {saved && (
      <div className="p-2">
        <Star className="w-4 h-4" style={{ color: C.gold, fill: C.gold }} />
      </div>
    )}
  </div>
);

/** Property Card Mobile (vertical) */
const PropertyCardMobile = ({
  image,
  ref: refId,
  title,
  location,
  price,
  beds,
  baths,
  sqm,
}: {
  image: string;
  ref: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqm: number;
}) => (
  <div
    className="rounded-xl overflow-hidden"
    style={{
      background: C.bgBubbleBot,
      border: `1px solid ${C.borderSubtle}`,
      backdropFilter: "blur(12px)",
    }}
  >
    <img src={image} alt={title} className="w-full h-[160px] object-cover" />
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] tracking-[0.1em]" style={{ color: C.gold }}>{refId}</p>
      </div>
      <p className="text-[15px] font-medium" style={{ color: C.text }}>{title}</p>
      <div className="flex items-center gap-1">
        <MapPin className="w-3 h-3" style={{ color: C.textMuted }} />
        <span className="text-[12px]" style={{ color: C.textMuted }}>{location}</span>
      </div>
      <p className="text-[18px] font-semibold" style={{ color: C.gold }}>{price}</p>
      <div className="flex items-center gap-3 text-[12px]" style={{ color: C.textMuted }}>
        <span>{beds} 🛏</span>
        <span>{baths} 🚿</span>
        <span>{sqm}m²</span>
      </div>
      <button
        className="w-full py-2.5 rounded-lg text-[13px] mt-2"
        style={{ background: C.goldGrad, color: "#fff" }}
      >
        Me interesa →
      </button>
    </div>
  </div>
);

/** Lead Form */
const LeadForm = ({ state = "empty" }: { state?: "empty" | "filling" | "complete" | "success" | "error" }) => {
  const inputStyle = (focused = false, error = false) => ({
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${error ? C.red : focused ? C.gold : C.borderSubtle}`,
    color: C.text,
    fontFamily: SANS,
    fontSize: 14,
  });

  if (state === "success") {
    return (
      <div
        className="rounded-xl p-6 text-center"
        style={{ background: C.bgBubbleBot, border: `1px solid ${C.borderSubtle}`, backdropFilter: "blur(12px)" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ background: "rgba(200,164,94,0.15)" }}
        >
          <Check className="w-6 h-6" style={{ color: C.gold }} />
        </div>
        <p className="text-[14px] font-medium" style={{ color: C.text }}>
          ¡Gracias!
        </p>
        <p className="text-[13px] mt-1" style={{ color: C.textMuted }}>
          Un agente te contactará pronto.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl p-5 space-y-3"
      style={{ background: C.bgBubbleBot, border: `1px solid ${C.borderSubtle}`, backdropFilter: "blur(12px)" }}
    >
      <p className="text-[14px] font-medium tracking-wide" style={{ color: C.gold }}>
        Datos de contacto
      </p>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: C.textDim }} />
        <input
          readOnly
          placeholder="Nombre"
          value={state === "complete" ? "Arman Yeghiazaryan" : state === "filling" ? "Arman" : ""}
          className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
          style={inputStyle(state === "filling")}
        />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: C.textDim }} />
        <input
          readOnly
          placeholder="Email"
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
          readOnly
          placeholder="Teléfono"
          value={state === "complete" ? "+34 600 123 456" : ""}
          className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
          style={inputStyle()}
        />
      </div>
      <button
        className="w-full py-3 rounded-lg text-[14px] font-medium tracking-wide"
        style={{ background: C.goldGrad, color: "#fff" }}
      >
        Enviar
      </button>
      <p className="text-center text-[13px] cursor-pointer" style={{ color: C.textMuted }}>
        Ahora no
      </p>
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
            background: C.gold,
            opacity: 0.4 + i * 0.2,
            animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
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
          background: C.gold,
          opacity: 0.5 + Math.random() * 0.5,
        }}
      />
    ))}
  </div>
);

// ─────────────────────────────────────────────
// ── Chat Window Wrapper (desktop 400×560) ──
// ─────────────────────────────────────────────
const ChatWindowDesktop = ({ children, blur = false }: { children: React.ReactNode; blur?: boolean }) => (
  <div className="relative" style={{ width: 400, height: 560 }}>
    {blur && (
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <img src={BG_BLUR} className="w-full h-full object-cover" style={{ filter: "blur(8px) brightness(0.3)" }} />
      </div>
    )}
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden shadow-2xl"
      style={{
        width: 400,
        height: 560,
        background: "rgba(15,15,23,0.92)",
        border: `1px solid ${C.borderSubtle}`,
        backdropFilter: "blur(24px)",
      }}
    >
      {children}
    </div>
  </div>
);

// ─────────────────────────────────────────────
// ── Phone Frame (mobile 375) ──
// ─────────────────────────────────────────────
const PhoneFrame = ({ children, label }: { children: React.ReactNode; label?: string }) => (
  <div className="flex flex-col items-center gap-3">
    <div
      className="relative rounded-[36px] overflow-hidden shadow-2xl"
      style={{
        width: 375,
        height: 812,
        background: C.bgDeep,
        border: `3px solid rgba(255,255,255,0.08)`,
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 25px 80px -20px rgba(0,0,0,0.6)`,
      }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-7 pt-3 pb-1" style={{ background: "rgba(10,10,15,0.9)" }}>
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
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
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
          <h1 className="text-3xl font-light" style={{ color: C.text, fontFamily: SERIF }}>
            AnastasIA
          </h1>
        </div>
        <p className="text-[11px] tracking-[0.25em] uppercase" style={{ color: C.gold }}>
          Luxury Property Advisor — Design System
        </p>
        <p className="text-[13px] mt-3 max-w-xl mx-auto" style={{ color: C.textMuted }}>
          Visual reference for the AI chatbot widget. Three sections: Desktop States, Mobile States, Component Library.
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
          {/* Default */}
          <div className="flex flex-col items-center gap-2">
            <button
              className="w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-xl"
              style={{ background: C.goldGrad, boxShadow: `0 4px 24px rgba(200,164,94,0.35)` }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <span className="text-[10px]" style={{ color: C.textDim }}>Default</span>
          </div>
          {/* With badge */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <button
                className="w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-xl"
                style={{ background: C.goldGrad, boxShadow: `0 4px 24px rgba(200,164,94,0.35)` }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </button>
              <div
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: C.red }}
              >
                1
              </div>
            </div>
            <span className="text-[10px]" style={{ color: C.textDim }}>With badge</span>
          </div>
          {/* Hover */}
          <div className="flex flex-col items-center gap-2">
            <button
              className="w-[66px] h-[66px] rounded-full flex items-center justify-center shadow-xl"
              style={{ background: C.goldGradHover, boxShadow: `0 6px 32px rgba(200,164,94,0.5)` }}
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
            <div className="flex-1 flex flex-col justify-center p-5 space-y-4">
              <BotBubble
                text="¡Hola! Soy AnastasIA, tu asistente inmobiliaria de lujo en la Costa Blanca. ¿En qué puedo ayudarte hoy?"
                time="12:34"
              />
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
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <BotBubble
                text="¡Hola! Soy AnastasIA, tu asistente inmobiliaria de lujo en la Costa Blanca. ¿En qué puedo ayudarte hoy?"
                time="12:34"
              />
              <UserBubble text="Busco una villa de lujo en Altea" time="12:35" />
              <BotBubble
                text="Excelente elección. Altea es una de las zonas más exclusivas de la Costa Blanca. ¿Cuál es tu rango de presupuesto?"
                time="12:35"
              />
              <UserBubble text="Entre 800.000 y 1.500.000 euros" time="12:36" />
              <BotBubble
                text="Perfecto. He encontrado 3 villas excepcionales que encajan con tu búsqueda en Altea."
                time="12:36"
              />
              <div className="flex flex-wrap gap-2 ml-9 mt-1">
                <QuickChip text="📍 Ver similares" primary />
                <QuickChip text="💶 Ajustar presupuesto" />
                <QuickChip text="📅 Agendar visita" />
              </div>
            </div>
            <InputBar />
          </ChatWindowDesktop>
        </div>

        {/* 1.4 Property Cards */}
        <StateLabel id="1.4" title="Property Cards in Chat (Desktop)" />
        <div className="mb-20">
          <ChatWindowDesktop blur>
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <BotBubble
                text="He encontrado 3 villas excepcionales que encajan con tu búsqueda:"
                time="12:36"
              />
              <div className="ml-9 space-y-2">
                <PropertyCardDesktop
                  image={VILLAS[0]} ref="REF-1234" title="Villa Panorámica"
                  location="Altea, Costa Blanca" price="€1.200.000"
                  beds={4} baths={3} sqm={280}
                />
                <PropertyCardDesktop
                  image={VILLAS[1]} ref="REF-2456" title="Villa Mediterránea"
                  location="Altea Hills" price="€980.000"
                  beds={3} baths={2} sqm={220}
                />
                <PropertyCardDesktop
                  image={VILLAS[2]} ref="REF-3789" title="Villa Sierra de Altea"
                  location="Sierra de Altea" price="€1.450.000"
                  beds={5} baths={4} sqm={350}
                />
              </div>
              <button className="ml-9 text-[12px] flex items-center gap-1 mt-2" style={{ color: C.gold }}>
                <MapPin className="w-3 h-3" /> Ver todas en el mapa
              </button>
            </div>
            <InputBar />
          </ChatWindowDesktop>
        </div>

        {/* 1.5 Comparison */}
        <StateLabel id="1.5" title="Property Comparison View (Desktop)" />
        <div className="mb-20">
          <ChatWindowDesktop>
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{ background: "rgba(15,15,23,0.95)", borderBottom: `1px solid ${C.borderSubtle}` }}
            >
              <button style={{ color: C.textMuted }}>
                <ChevronDown className="w-5 h-5 rotate-90" />
              </button>
              <p className="text-[14px] font-medium" style={{ color: C.text }}>Comparar propiedades</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { img: VILLAS[0], title: "Villa Panorámica", ref: "REF-1234", price: "€1.200.000", beds: 4, baths: 3, sqm: 280, terrace: "45m²", pool: "Sí", parking: "2" },
                  { img: VILLAS[2], title: "Villa Sierra", ref: "REF-3789", price: "€1.450.000", beds: 5, baths: 4, sqm: 350, terrace: "60m²", pool: "Sí", parking: "3" },
                ].map((p, i) => (
                  <div key={i} className="space-y-2">
                    <img src={p.img} className="w-full h-[100px] object-cover rounded-lg" />
                    <p className="text-[10px]" style={{ color: C.gold }}>{p.ref}</p>
                    <p className="text-[13px] font-medium" style={{ color: C.text }}>{p.title}</p>
                    <p className="text-[15px] font-semibold" style={{ color: i === 0 ? "#4ade80" : C.gold }}>
                      {p.price}
                    </p>
                    <div className="space-y-1.5 text-[11px]" style={{ color: C.textMuted }}>
                      {[
                        ["Habitaciones", p.beds],
                        ["Baños", p.baths],
                        ["Superficie", `${p.sqm}m²`],
                        ["Terraza", p.terrace],
                        ["Piscina", p.pool],
                        ["Parking", p.parking],
                      ].map(([label, val]) => (
                        <div key={String(label)} className="flex justify-between" style={{ borderBottom: `1px solid ${C.borderSubtle}`, paddingBottom: 4 }}>
                          <span>{String(label)}</span>
                          <span style={{ color: C.text }}>{String(val)}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-2 rounded-lg text-[12px]" style={{ background: C.goldGrad, color: "#fff" }}>
                      Agendar visita
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </ChatWindowDesktop>
        </div>

        {/* 1.6 Lead Form */}
        <StateLabel id="1.6" title="Lead Form (Desktop)" />
        <div className="flex gap-6 mb-20">
          <ChatWindowDesktop>
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <BotBubble
                text="Perfecto, déjame tus datos y un agente se pondrá en contacto contigo para organizar la visita."
                time="12:38"
              />
              <div className="ml-9">
                <LeadForm state="filling" />
              </div>
            </div>
            <InputBar />
          </ChatWindowDesktop>
          <ChatWindowDesktop>
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <BotBubble text="¡Datos recibidos!" time="12:39" />
              <div className="ml-9">
                <LeadForm state="success" />
              </div>
            </div>
            <InputBar />
          </ChatWindowDesktop>
        </div>

        {/* 1.7 Voice Recording */}
        <StateLabel id="1.7" title="Voice Recording (Desktop)" />
        <div className="flex gap-6 mb-20">
          {/* Recording */}
          <ChatWindowDesktop>
            <ChatHeader />
            <div className="flex-1 p-4">
              <BotBubble text="¿En qué puedo ayudarte?" time="12:40" />
            </div>
            <div
              className="flex items-center gap-3 px-4 py-4"
              style={{ background: "rgba(200,164,94,0.06)", borderTop: `1px solid rgba(200,164,94,0.2)` }}
            >
              <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.red }}>
                <Square className="w-3.5 h-3.5 text-white" />
              </button>
              <span className="text-[13px] font-medium" style={{ color: C.text }}>0:05</span>
              <div className="flex-1">
                <WaveformBars count={30} height={20} />
              </div>
              <span className="text-[12px]" style={{ color: C.textMuted }}>Grabando...</span>
            </div>
          </ChatWindowDesktop>
          {/* Transcribed */}
          <ChatWindowDesktop>
            <ChatHeader />
            <div className="flex-1 p-4">
              <BotBubble text="¿En qué puedo ayudarte?" time="12:40" />
            </div>
            <InputBar value="Busco un apartamento cerca de la playa" />
          </ChatWindowDesktop>
        </div>

        {/* 1.8 Proactive Trigger */}
        <StateLabel id="1.8" title="Proactive Trigger (Desktop)" />
        <div className="flex items-end gap-4 mb-20 pl-4">
          <div className="flex flex-col items-end gap-3">
            <div
              className="rounded-xl p-4 flex items-start gap-3"
              style={{
                width: 280,
                background: "rgba(15,15,23,0.92)",
                border: `1px solid ${C.borderSubtle}`,
                backdropFilter: "blur(24px)",
                boxShadow: "0 12px 40px -10px rgba(0,0,0,0.5)",
              }}
            >
              <BotAvatar size={28} />
              <div className="flex-1">
                <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
                  Veo que estás viendo esta villa en Altea. ¿Quieres que te cuente más sobre ella?
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1.5 rounded-lg text-[11px]" style={{ background: C.goldGrad, color: "#fff" }}>
                    Sí, cuéntame
                  </button>
                  <button className="px-2 py-1.5 rounded-lg text-[11px]" style={{ color: C.textMuted }}>
                    ✕
                  </button>
                </div>
              </div>
            </div>
            <button
              className="w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-xl"
              style={{ background: C.goldGrad, boxShadow: `0 4px 24px rgba(200,164,94,0.35)` }}
            >
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
              <button className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: C.goldGrad, boxShadow: `0 4px 20px rgba(200,164,94,0.35)` }}>
                <MessageCircle className="w-5 h-5 text-white" />
              </button>
              <span className="text-[10px]" style={{ color: C.textDim }}>Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <button className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: C.goldGrad }}>
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: C.red }}>
                  1
                </div>
              </div>
              <span className="text-[10px]" style={{ color: C.textDim }}>With badge</span>
            </div>
          </div>

          {/* 2.2 – 2.9 Mobile states in phone frames */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {/* 2.2 Empty Home */}
            <div>
              <StateLabel id="2.2" title="Chat — Home Page" />
              <PhoneFrame>
                <ChatHeader mobile />
                <div className="flex-1 flex flex-col justify-center p-5 space-y-4">
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

            {/* 2.3 Empty Property Page */}
            <div>
              <StateLabel id="2.3" title="Chat — Property Page" />
              <PhoneFrame>
                <ChatHeader mobile />
                <div className="flex-1 flex flex-col justify-center p-5 space-y-4">
                  <BotBubble
                    text="Veo que estás viendo la Villa Panorámica en Altea (€1.200.000). ¿Tienes alguna pregunta?"
                    time="12:34"
                  />
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
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
                <div
                  className="flex items-center gap-3 px-5 py-3"
                  style={{ background: "rgba(15,15,23,0.95)", borderBottom: `1px solid ${C.borderSubtle}` }}
                >
                  <button style={{ color: C.textMuted }}>
                    <ChevronDown className="w-5 h-5 rotate-90" />
                  </button>
                  <p className="text-[14px]" style={{ color: C.text }}>3 propiedades encontradas</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
                <div className="flex-1 flex flex-col items-center justify-center p-8" style={{ background: `radial-gradient(circle at center, rgba(200,164,94,0.08) 0%, transparent 70%)` }}>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: C.goldGrad, boxShadow: `0 0 40px rgba(200,164,94,0.3)` }}
                  >
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
                <div className="flex-1 flex flex-col justify-center p-5 space-y-4">
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
                {/* Simulated blurred page */}
                <div className="flex-1 relative">
                  <img src={BG_BLUR} className="w-full h-full object-cover" style={{ filter: "blur(2px) brightness(0.4)" }} />
                </div>
                {/* Banner */}
                <div className="absolute bottom-20 left-4 right-4">
                  <div
                    className="rounded-2xl p-4 flex items-center gap-3"
                    style={{
                      background: "rgba(15,15,23,0.92)",
                      border: `1px solid ${C.borderSubtle}`,
                      backdropFilter: "blur(24px)",
                      boxShadow: "0 12px 40px -10px rgba(0,0,0,0.5)",
                    }}
                  >
                    <BotAvatar size={32} />
                    <p className="flex-1 text-[13px] leading-relaxed" style={{ color: C.text }}>
                      ¿Te interesa esta villa en Altea?
                    </p>
                    <button style={{ color: C.textMuted }}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {/* Bubble */}
                <div className="absolute bottom-4 right-4">
                  <button className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: C.goldGrad }}>
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
              <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center" style={{ background: C.goldGrad }}>
                <MessageCircle className="w-6 h-6 text-white" />
              </button>
              <span className="text-[10px]" style={{ color: C.textDim }}>Desktop 60px</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center" style={{ background: C.goldGrad }}>
                  <MessageCircle className="w-6 h-6 text-white" />
                </button>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: C.red }}>1</div>
              </div>
              <span className="text-[10px]" style={{ color: C.textDim }}>Badge</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-[66px] h-[66px] rounded-full flex items-center justify-center" style={{ background: C.goldGradHover, boxShadow: `0 6px 32px rgba(200,164,94,0.5)` }}>
                <MessageCircle className="w-7 h-7 text-white" />
              </button>
              <span className="text-[10px]" style={{ color: C.textDim }}>Hover</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: C.goldGrad }}>
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
            <BotBubble text="Tenemos opciones desde €500.000 hasta €5.000.000 en la zona. Cada propiedad ha sido cuidadosamente seleccionada por nuestro equipo de expertos para garantizar la máxima calidad y exclusividad." />
          </div>

          {/* 3.4 User Bubble */}
          <StateLabel id="3.4" title="User Message Bubble" />
          <div className="space-y-4 mb-16" style={{ maxWidth: 400 }}>
            <UserBubble text="Hola" time="12:34" />
            <UserBubble text="Busco una villa de lujo en Altea" time="12:35" />
            <UserBubble text="Mi presupuesto está entre 800.000 y 1.500.000 euros, y necesito al menos 4 habitaciones" />
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
            <div>
              <p className="text-[11px] mb-3" style={{ color: C.textDim }}>Without emoji</p>
              <div className="flex flex-wrap gap-2">
                <QuickChip text="Ver similares" primary />
                <QuickChip text="Ajustar presupuesto" />
                <QuickChip text="Agendar visita" />
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

          {/* 3.7 Comparison */}
          <StateLabel id="3.7" title="Property Comparison" />
          <div className="grid grid-cols-2 gap-4 mb-16" style={{ maxWidth: 500 }}>
            {[
              { img: VILLAS[0], title: "Villa Panorámica", price: "€1.200.000", beds: 4, baths: 3, sqm: 280 },
              { img: VILLAS[2], title: "Villa Sierra", price: "€1.450.000", beds: 5, baths: 4, sqm: 350 },
            ].map((p, i) => (
              <div key={i} className="rounded-xl p-3 space-y-2" style={{ background: C.bgBubbleBot, border: `1px solid ${C.borderSubtle}` }}>
                <img src={p.img} className="w-full h-[80px] object-cover rounded-lg" />
                <p className="text-[13px] font-medium" style={{ color: C.text }}>{p.title}</p>
                <p className="text-[15px] font-semibold" style={{ color: i === 0 ? "#4ade80" : C.gold }}>{p.price}</p>
                <div className="text-[11px] space-y-1" style={{ color: C.textMuted }}>
                  <div className="flex justify-between"><span>Hab.</span><span style={{ color: C.text }}>{p.beds}</span></div>
                  <div className="flex justify-between"><span>Baños</span><span style={{ color: C.text }}>{p.baths}</span></div>
                  <div className="flex justify-between"><span>m²</span><span style={{ color: C.text }}>{p.sqm}</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* 3.8 Lead Form */}
          <StateLabel id="3.8" title="Lead Form" />
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-16" style={{ maxWidth: 900 }}>
            <div>
              <p className="text-[11px] mb-3" style={{ color: C.textDim }}>Empty</p>
              <LeadForm state="empty" />
            </div>
            <div>
              <p className="text-[11px] mb-3" style={{ color: C.textDim }}>Filling</p>
              <LeadForm state="filling" />
            </div>
            <div>
              <p className="text-[11px] mb-3" style={{ color: C.textDim }}>Error</p>
              <LeadForm state="error" />
            </div>
            <div>
              <p className="text-[11px] mb-3" style={{ color: C.textDim }}>Success</p>
              <LeadForm state="success" />
            </div>
          </div>

          {/* 3.9 Typing Indicator */}
          <StateLabel id="3.9" title="Typing Indicator" />
          <div className="mb-16">
            <TypingIndicator />
          </div>

          {/* 3.10 Voice States */}
          <StateLabel id="3.10" title="Voice Recording States" />
          <div className="flex gap-6 mb-16">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.borderSubtle}` }}>
                <Mic className="w-5 h-5" style={{ color: C.textMuted }} />
              </div>
              <span className="text-[10px]" style={{ color: C.textDim }}>Idle</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(200,164,94,0.15)", border: `1px solid ${C.borderGold}` }}>
                <Mic className="w-5 h-5" style={{ color: C.gold }} />
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

          {/* 3.11 Proactive Trigger */}
          <StateLabel id="3.11" title="Proactive Trigger" />
          <div className="flex gap-8 mb-16">
            <div>
              <p className="text-[11px] mb-3" style={{ color: C.textDim }}>Desktop Card</p>
              <div
                className="rounded-xl p-4 flex items-start gap-3"
                style={{ width: 280, background: "rgba(15,15,23,0.92)", border: `1px solid ${C.borderSubtle}`, backdropFilter: "blur(24px)" }}
              >
                <BotAvatar size={28} />
                <div className="flex-1">
                  <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>¿Te interesa esta villa?</p>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1.5 rounded-lg text-[11px]" style={{ background: C.goldGrad, color: "#fff" }}>Sí</button>
                    <button className="px-2 py-1.5 text-[11px]" style={{ color: C.textMuted }}>✕</button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[11px] mb-3" style={{ color: C.textDim }}>Mobile Banner</p>
              <div
                className="rounded-2xl p-4 flex items-center gap-3"
                style={{ width: 340, background: "rgba(15,15,23,0.92)", border: `1px solid ${C.borderSubtle}` }}
              >
                <BotAvatar size={32} />
                <p className="flex-1 text-[13px]" style={{ color: C.text }}>¿Te interesa esta villa en Altea?</p>
                <button style={{ color: C.textMuted }}><X className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* 3.12 Input Bar */}
          <StateLabel id="3.12" title="Input Bar" />
          <div className="space-y-4 mb-16" style={{ maxWidth: 400 }}>
            <div>
              <p className="text-[11px] mb-2" style={{ color: C.textDim }}>Desktop — Empty</p>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.borderSubtle}` }}>
                <InputBar />
              </div>
            </div>
            <div>
              <p className="text-[11px] mb-2" style={{ color: C.textDim }}>Desktop — With text</p>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.borderSubtle}` }}>
                <InputBar value="Busco un apartamento cerca de la playa" />
              </div>
            </div>
            <div>
              <p className="text-[11px] mb-2" style={{ color: C.textDim }}>Mobile</p>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.borderSubtle}` }}>
                <InputBar mobile placeholder="Escribe o habla..." />
              </div>
            </div>
            <div>
              <p className="text-[11px] mb-2" style={{ color: C.textDim }}>Disabled (bot responding)</p>
              <div className="rounded-xl overflow-hidden opacity-50" style={{ border: `1px solid ${C.borderSubtle}` }}>
                <InputBar placeholder="AnastasIA está escribiendo..." />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 text-center" style={{ borderTop: `1px solid ${C.borderSubtle}` }}>
        <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: C.textDim }}>
          AnastasIA Design System — Visual Reference Only
        </p>
      </div>

      {/* Pulse animation keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
