/**
 * NEWSLETTER PREFERENCES MODAL
 * Appears after user enters email in any newsletter form.
 * Allows selection of notification categories + terms acceptance.
 * Styled consistently with the Off-Market wizard aesthetic.
 */

import { useState, useCallback, useEffect } from "react";
import { X, Check, TrendingUp, Building2, BookOpen, Tag, Mail, Shield } from "lucide-react";

interface NewsletterPreferencesModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  accentColor?: string;
  onConfirm?: (data: NewsletterPreferencesData) => void;
}

export interface NewsletterPreferencesData {
  email: string;
  preferences: {
    market: boolean;
    company: boolean;
    journal: boolean;
    offers: boolean;
  };
}

const CATEGORIES = [
  {
    key: "market" as const,
    icon: TrendingUp,
    title: "Market Insights",
    description: "Análisis de mercado, tendencias de precios y oportunidades de inversión",
  },
  {
    key: "company" as const,
    icon: Building2,
    title: "Company News",
    description: "Novedades de la empresa, nuevos servicios y eventos exclusivos",
  },
  {
    key: "journal" as const,
    icon: BookOpen,
    title: "The Journal",
    description: "Artículos sobre lifestyle, arquitectura, destinos y guías de compra",
  },
  {
    key: "offers" as const,
    icon: Tag,
    title: "Exclusive Offers",
    description: "Propiedades destacadas, oportunidades off-market y promociones",
  },
];

export default function NewsletterPreferencesModal({
  open,
  onClose,
  email,
  accentColor = "#c9a96e",
  onConfirm,
}: NewsletterPreferencesModalProps) {
  const [preferences, setPreferences] = useState({
    market: true,
    company: false,
    journal: true,
    offers: true,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [termsError, setTermsError] = useState(false);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setTermsAccepted(false);
      setTermsError(false);
      setPreferences({ market: true, company: false, journal: true, offers: true });
    }
  }, [open]);

  const togglePref = useCallback((key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const hasAnySelected = Object.values(preferences).some(Boolean);

  const handleConfirm = () => {
    if (!termsAccepted) {
      setTermsError(true);
      return;
    }
    setSubmitted(true);
    onConfirm?.({ email, preferences });
    setTimeout(() => onClose(), 2400);
  };

  if (!open) return null;

  const selectedCount = Object.values(preferences).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: "fadeIn 0.3s ease-out" }}
      />

      {/* Modal */}
      <div
        className="relative w-full bg-white overflow-hidden shadow-2xl"
        style={{
          maxWidth: 520,
          borderRadius: 2,
          animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div
          className="relative px-6 sm:px-8 pt-6 pb-6 text-center"
          style={{ background: "#1e1c1a" }}
        >
          <div className="flex justify-end mb-3">
            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <div
            className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}40` }}
          >
            <Mail className="w-5 h-5" style={{ color: accentColor }} strokeWidth={1.5} />
          </div>

          {!submitted ? (
            <>
              <h2
                className="text-[20px] sm:text-[22px] font-extralight text-white tracking-[0.03em]"
              >
                Personaliza tu suscripción
              </h2>
              <p className="text-[12px] text-white/40 font-light mt-2 max-w-xs mx-auto leading-relaxed">
                Elige qué tipo de contenido deseas recibir en{" "}
                <span className="text-white/60">{email}</span>
              </p>
            </>
          ) : (
            <>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: accentColor }}
              >
                <Check className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-[20px] font-extralight text-white tracking-[0.03em]">
                ¡Suscripción confirmada!
              </h2>
              <p className="text-[12px] text-white/40 font-light mt-2">
                Recibirás contenido seleccionado en tu bandeja de entrada
              </p>
            </>
          )}
        </div>

        {!submitted ? (
          <div className="px-6 sm:px-8 py-6">
            {/* Categories */}
            <div className="space-y-2.5 mb-6">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = preferences[cat.key];
                return (
                  <button
                    key={cat.key}
                    onClick={() => togglePref(cat.key)}
                    className="w-full flex items-start gap-3.5 p-3.5 rounded-sm text-left transition-all duration-200 group"
                    style={{
                      border: `1px solid ${isActive ? accentColor : "#e5e5e5"}`,
                      background: isActive ? `${accentColor}06` : "transparent",
                    }}
                  >
                    {/* Checkbox */}
                    <div
                      className="w-5 h-5 rounded-sm flex-shrink-0 flex items-center justify-center mt-0.5 transition-all duration-200"
                      style={{
                        background: isActive ? accentColor : "transparent",
                        border: `1.5px solid ${isActive ? accentColor : "#d4d4d4"}`,
                      }}
                    >
                      {isActive && <Check className="w-3 h-3 text-white" strokeWidth={2.5} />}
                    </div>

                    {/* Icon */}
                    <div
                      className="w-8 h-8 rounded-sm flex-shrink-0 flex items-center justify-center transition-colors duration-200"
                      style={{
                        background: isActive ? `${accentColor}15` : "#f5f5f5",
                      }}
                    >
                      <Icon
                        className="w-4 h-4 transition-colors duration-200"
                        strokeWidth={1.5}
                        style={{ color: isActive ? accentColor : "#a3a3a3" }}
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[13px] font-medium transition-colors duration-200"
                        style={{ color: isActive ? "#1e1c1a" : "#525252" }}
                      >
                        {cat.title}
                      </p>
                      <p className="text-[11px] font-light text-neutral-400 leading-relaxed mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Terms */}
            <div className="mb-6">
              <button
                onClick={() => {
                  setTermsAccepted(!termsAccepted);
                  setTermsError(false);
                }}
                className="flex items-start gap-3 w-full text-left"
              >
                <div
                  className="w-[18px] h-[18px] rounded-sm flex-shrink-0 flex items-center justify-center mt-0.5 transition-all duration-200"
                  style={{
                    background: termsAccepted ? "#1e1c1a" : "transparent",
                    border: `1.5px solid ${termsError ? "#ef4444" : termsAccepted ? "#1e1c1a" : "#d4d4d4"}`,
                  }}
                >
                  {termsAccepted && <Check className="w-3 h-3 text-white" strokeWidth={2.5} />}
                </div>
                <div className="flex-1">
                  <p
                    className="text-[11px] font-light leading-relaxed"
                    style={{ color: termsError ? "#ef4444" : "#737373" }}
                  >
                    Acepto la{" "}
                    <span className="underline underline-offset-2 cursor-pointer hover:text-neutral-900 transition-colors">
                      Política de Privacidad
                    </span>{" "}
                    y los{" "}
                    <span className="underline underline-offset-2 cursor-pointer hover:text-neutral-900 transition-colors">
                      Términos y Condiciones
                    </span>
                  </p>
                  {termsError && (
                    <p className="text-[10px] text-red-500 mt-1 font-light">
                      Debes aceptar los términos para continuar
                    </p>
                  )}
                </div>
              </button>
            </div>

            {/* Summary + CTA */}
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] text-neutral-400 font-light">
                {selectedCount} {selectedCount === 1 ? "categoría seleccionada" : "categorías seleccionadas"}
              </p>
              <button
                onClick={handleConfirm}
                disabled={!hasAnySelected}
                className="text-[11px] tracking-[0.15em] uppercase font-medium px-7 py-3 transition-all duration-300 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white"
                style={{ background: hasAnySelected ? accentColor : "#a3a3a3" }}
              >
                Confirmar
              </button>
            </div>
          </div>
        ) : (
          /* Success summary */
          <div className="px-6 sm:px-8 py-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.filter((c) => preferences[c.key]).map((cat) => {
                const Icon = cat.icon;
                return (
                  <span
                    key={cat.key}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-light rounded-sm"
                    style={{ background: `${accentColor}10`, color: accentColor, border: `1px solid ${accentColor}25` }}
                  >
                    <Icon className="w-3 h-3" strokeWidth={1.5} />
                    {cat.title}
                  </span>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-2 mt-5 text-[11px] text-neutral-400">
              <Shield className="w-3 h-3" strokeWidth={1.5} />
              <span className="font-light">Puedes cancelar en cualquier momento</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97) }
          to { opacity: 1; transform: translateY(0) scale(1) }
        }
      `}</style>
    </div>
  );
}
