import { useState } from "react";
import { mockNavItems, mockLanguages } from "@/data/mock-data";

interface NavbarLuxuryProps {
  brandName?: string;
  brandSubtitle?: string;
  navLeft?: { label: string; href: string }[];
  navRight?: { label: string; href: string }[];
  showLanguage?: boolean;
  languages?: { code: string; label: string }[];
  variant?: "transparent" | "solid";
  scrolled?: boolean;
}

export default function NavbarLuxury({
  brandName = "PRESTIGE",
  brandSubtitle = "ESTATES",
  navLeft = mockNavItems.left,
  navRight = mockNavItems.right,
  showLanguage = false,
  languages = mockLanguages,
  variant = "solid",
  scrolled = false,
}: NavbarLuxuryProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("ES");

  const isTransparent = variant === "transparent" && !scrolled;

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: isTransparent ? "transparent" : "rgba(255,255,255,0.97)",
        backdropFilter: isTransparent ? "none" : "blur(12px)",
        boxShadow: !isTransparent ? "0 1px 3px rgba(0,0,0,0.04)" : "none",
      }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-5 sm:px-6 lg:px-12 h-[70px] lg:h-[80px]">
        {/* Left nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLeft.map((item) => (
            <a key={item.label} href={item.href} className="text-[11px] tracking-[0.18em] uppercase font-light transition-colors hover:opacity-60" style={{ color: isTransparent ? "rgba(255,255,255,0.7)" : "#666" }}>
              {item.label}
            </a>
          ))}
        </div>

        {/* Logo */}
        <a href="/" className="flex flex-col items-center">
          <span className="text-[16px] tracking-[0.5em] font-light" style={{ color: isTransparent ? "#fff" : "#2D2926" }}>{brandName}</span>
          <span className="text-[7px] tracking-[0.4em] uppercase font-light" style={{ color: isTransparent ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)" }}>{brandSubtitle}</span>
        </a>

        {/* Right nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navRight.map((item) => (
            <a key={item.label} href={item.href} className="text-[11px] tracking-[0.18em] uppercase font-light transition-colors hover:opacity-60" style={{ color: isTransparent ? "rgba(255,255,255,0.7)" : "#666" }}>
              {item.label}
            </a>
          ))}
          {showLanguage && (
            <button onClick={() => setLangOpen(!langOpen)} className="text-[11px] tracking-[0.15em] uppercase font-light" style={{ color: isTransparent ? "rgba(255,255,255,0.5)" : "#999" }}>
              {currentLang}
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: isTransparent ? "#fff" : "#2D2926" }}>
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100 px-5 py-6 space-y-1">
          {[...navLeft, ...navRight].map((item) => (
            <a key={item.label} href={item.href} className="block text-[13px] tracking-[0.1em] uppercase font-light py-3 text-neutral-600 border-b border-neutral-50" onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
