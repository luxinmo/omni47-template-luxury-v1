/**
 * DETAIL PRICE ALERT MODAL
 * Modal for subscribing to price drop alerts with property mini-card.
 */

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BellRing, Mail, Eye, EyeOff } from "lucide-react";

interface DetailPriceAlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyRef?: string;
  propertyTitle?: string;
  priceFormatted?: string;
  propertyImage?: string;
  propertyLocation?: string;
}

const DetailPriceAlertModal: React.FC<DetailPriceAlertModalProps> = ({
  open,
  onOpenChange,
  propertyRef = "PE-IBZ-2847",
  propertyTitle = "Luxury Villa in Ibiza",
  priceFormatted = "€4,650,000",
  propertyImage,
  propertyLocation,
}) => {
  const [mode, setMode] = useState<"email" | "login">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleGoogleSignIn = () => {
    setSubmitted(true);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setMode("email");
      setEmail("");
      setPassword("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[420px] p-0 border-none bg-white overflow-hidden gap-0">
        {/* Property mini-card header */}
        <div className="relative">
          {propertyImage && (
            <div className="relative h-[120px] overflow-hidden">
              <img src={propertyImage} alt={propertyTitle} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-neutral-900/20" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <BellRing className="w-4 h-4 text-amber-400" strokeWidth={1.5} />
                  <DialogTitle className="text-[13px] tracking-[0.12em] uppercase text-white font-medium">
                    Price Alert
                  </DialogTitle>
                </div>
                <p className="text-[14px] font-medium text-white leading-tight line-clamp-1">{propertyTitle}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[15px] text-white/90 font-medium">{priceFormatted}</span>
                  <span className="text-[11px] text-white/40 font-mono tracking-[0.05em]">REF-{propertyRef}</span>
                </div>
                {propertyLocation && (
                  <p className="text-[11px] text-white/50 font-light mt-0.5">{propertyLocation}</p>
                )}
              </div>
            </div>
          )}
          {!propertyImage && (
            <div className="bg-neutral-900 px-6 py-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <BellRing className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
                <DialogTitle className="text-[14px] tracking-[0.12em] uppercase text-white font-medium">
                  Price Alert
                </DialogTitle>
              </div>
              <DialogDescription className="text-[12px] text-white/50 font-light tracking-wide">
                REF-{propertyRef}
              </DialogDescription>
            </div>
          )}
        </div>

        {submitted ? (
          <div className="px-6 py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <BellRing className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-[16px] font-medium text-neutral-900 mb-2">¡Alerta activada!</h3>
            <p className="text-[13px] text-neutral-500 font-light leading-relaxed max-w-[300px] mx-auto">
              Te notificaremos si el precio de <span className="font-medium text-neutral-700">{propertyTitle}</span> baja de <span className="font-medium text-neutral-700">{priceFormatted}</span>.
            </p>
            <button onClick={handleClose} className="mt-6 text-[12px] tracking-[0.08em] uppercase text-neutral-500 hover:text-neutral-800 font-medium transition-colors">
              Cerrar
            </button>
          </div>
        ) : (
          <div className="px-6 py-6">
            <p className="text-[13px] text-neutral-600 font-light text-center leading-relaxed mb-6">
              Recibe una notificación cuando el precio de esta propiedad baje.
            </p>

            {mode === "email" ? (
              <>
                <form onSubmit={handleSubmitEmail} className="space-y-3">
                  <div>
                    <label className="text-[11px] tracking-[0.08em] uppercase text-neutral-500 font-medium mb-1.5 block">Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com"
                      className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white text-[12px] tracking-[0.1em] uppercase py-3.5 hover:bg-neutral-800 transition-all font-medium">
                    <BellRing className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Activar alerta
                  </button>
                </form>

                <div className="flex items-center gap-3 my-5">
                  <span className="flex-1 h-px bg-neutral-200" />
                  <span className="text-[11px] text-neutral-400 tracking-wide uppercase">o</span>
                  <span className="flex-1 h-px bg-neutral-200" />
                </div>

                <button onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 border border-neutral-200 bg-white text-neutral-700 text-[13px] py-3 hover:bg-neutral-50 transition-all font-medium">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continuar con Google
                </button>

                <button onClick={() => setMode("login")} className="w-full text-center text-[12px] text-neutral-400 hover:text-neutral-600 font-light mt-4 transition-colors">
                  ¿Ya tienes cuenta? <span className="underline underline-offset-2">Inicia sesión</span>
                </button>
              </>
            ) : (
              <>
                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  <div>
                    <label className="text-[11px] tracking-[0.08em] uppercase text-neutral-500 font-medium mb-1.5 block">Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com"
                      className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[11px] tracking-[0.08em] uppercase text-neutral-500 font-medium mb-1.5 block">Contraseña</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                        className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 pr-10 text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white text-[12px] tracking-[0.1em] uppercase py-3.5 hover:bg-neutral-800 transition-all font-medium">
                    <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Iniciar sesión y activar alerta
                  </button>
                </form>
                <button onClick={() => setMode("email")} className="w-full text-center text-[12px] text-neutral-400 hover:text-neutral-600 font-light mt-4 transition-colors">
                  ← Volver
                </button>
              </>
            )}

            <p className="text-[10px] text-neutral-300 text-center mt-5 leading-relaxed">
              Al activar la alerta aceptas recibir notificaciones por email. Puedes cancelar en cualquier momento.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailPriceAlertModal;
