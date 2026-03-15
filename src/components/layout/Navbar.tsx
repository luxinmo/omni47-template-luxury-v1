import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, X, Menu } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { brand, palette, fonts, navLeft, navRight, languages, currencies, areaUnits } from "@/config/template";

interface NavbarProps {
  variant?: "transparent" | "solid";
  scrolled?: boolean;
  showLanguage?: boolean;
  activePath?: string;
}

const Navbar = ({
  variant = "solid",
  scrolled = false,
  showLanguage = false,
  activePath,
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [currentCurrency, setCurrentCurrency] = useState("EUR");
  const [currentUnit, setCurrentUnit] = useState("m2");

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isTransparent = variant === "transparent" && !scrolled;
  const textColor = isTransparent ? "#fff" : palette.text;
  const mutedColor = isTransparent ? "rgba(255,255,255,0.5)" : palette.textLight;

  return (
    <>
      <nav
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          background: isTransparent ? "transparent" : `${palette.white}f0`,
          backdropFilter: isTransparent ? "none" : "blur(16px)",
          boxShadow: !isTransparent ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
          marginBottom: variant === "transparent" && !scrolled ? "-80px" : 0,
          borderBottom: variant === "solid" ? `1px solid ${palette.border}` : "none",
        }}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12 h-[64px] sm:h-[80px]">
          {/* Left: hamburger on mobile/tablet, language + nav on desktop */}
          <div className="flex items-center gap-6 lg:gap-8 flex-1">
            <button
              className="lg:hidden transition-colors duration-300"
              style={{ color: isTransparent ? "#fff" : palette.text }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop language selector */}
            {showLanguage && (
              <div className="hidden lg:flex items-center">
                <button
                  onClick={() => setLangOpen(true)}
                  className="flex items-center gap-1.5 transition-colors duration-300"
                  style={{ color: mutedColor }}
                >
                  <img src={`https://flagcdn.com/20x15/${languages.find(l => l.code === currentLang)?.flag}.png`} alt="" className="w-5 h-[15px] object-cover rounded-[2px]" />
                  <span className="text-[11px] tracking-[0.1em] font-medium">{currentLang}</span>
                  <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Desktop left nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLeft.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-[13px] tracking-[0.12em] uppercase font-light transition-colors duration-300 hover:opacity-60"
                  style={{ color: activePath === item.href ? textColor : (isTransparent ? "#fff" : palette.textMuted) }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Center logo */}
          <Link to="/" className="flex flex-col items-center shrink-0">
            <span
              className="text-[22px] sm:text-[26px] tracking-[0.4em] font-light transition-colors duration-300"
              style={{ fontFamily: fonts.brand, color: textColor }}
            >
              {brand.name}
            </span>
            <span
              className="text-[8px] tracking-[0.45em] uppercase font-light transition-colors duration-300 -mt-0.5"
              style={{ color: mutedColor }}
            >
              {brand.subtitle}
            </span>
          </Link>

          {/* Right nav links (desktop only) */}
          <div className="flex items-center justify-end gap-8 flex-1">
            <div className="hidden lg:flex items-center gap-8">
              {navRight.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-[13px] tracking-[0.12em] uppercase font-light transition-colors duration-300 hover:opacity-60"
                  style={{ color: activePath === item.href ? textColor : (isTransparent ? "#fff" : palette.textMuted) }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Language Dialog */}
      <Dialog open={langOpen} onOpenChange={setLangOpen}>
        <DialogContent className="max-w-md p-6 rounded-md border-2 border-neutral-300 overflow-hidden shadow-xl">
          <DialogTitle className="text-[11px] tracking-[0.15em] uppercase font-medium text-luxury-black/40 mb-5">Select Language</DialogTitle>
          <DialogDescription className="sr-only">Choose your preferred language</DialogDescription>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setCurrentLang(lang.code); setLangOpen(false); }}
                className={`flex flex-col items-center gap-2 px-3 py-4 rounded-sm text-[13px] border transition-colors ${currentLang === lang.code ? "bg-neutral-50 border-neutral-300 font-medium" : "border-transparent font-light hover:bg-neutral-50"}`}
                style={{ color: currentLang === lang.code ? palette.text : palette.textMuted }}
              >
                <img src={`https://flagcdn.com/40x30/${lang.flag}.png`} alt="" className="w-10 h-[30px] object-cover rounded-[3px] shadow-sm" />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>

          {/* Currency */}
          <p className="text-[11px] tracking-[0.15em] uppercase font-medium mb-3" style={{ color: `${palette.text}66` }}>Currency</p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {currencies.map((cur) => (
              <button
                key={cur.code}
                onClick={() => setCurrentCurrency(cur.code)}
                className={`px-3 py-3 text-[13px] rounded-sm border transition-colors ${currentCurrency === cur.code ? "bg-neutral-50 border-neutral-300 font-medium" : "border-transparent font-light hover:bg-neutral-50"}`}
                style={{ color: currentCurrency === cur.code ? palette.text : palette.textMuted }}
              >
                {cur.label}
              </button>
            ))}
          </div>

          {/* Units */}
          <p className="text-[11px] tracking-[0.15em] uppercase font-medium mb-3" style={{ color: `${palette.text}66` }}>Units</p>
          <div className="grid grid-cols-2 gap-2">
            {areaUnits.map((u) => (
              <button
                key={u.code}
                onClick={() => setCurrentUnit(u.code)}
                className={`px-3 py-3 text-[13px] rounded-sm border transition-colors ${currentUnit === u.code ? "bg-neutral-50 border-neutral-300 font-medium" : "border-transparent font-light hover:bg-neutral-50"}`}
                style={{ color: currentUnit === u.code ? palette.text : palette.textMuted }}
              >
                {u.label}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 h-[64px] sm:h-[80px] border-b border-neutral-100 shrink-0">
            <button className="text-luxury-black/70" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
            <Link to="/" className="flex flex-col items-center justify-center" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-[22px] sm:text-[26px] tracking-[0.4em] font-light" style={{ fontFamily: fonts.brand, color: palette.text }}>
                {brand.name}
              </span>
              <span className="text-[8px] tracking-[0.45em] uppercase font-light -mt-0.5" style={{ color: palette.textLight }}>
                {brand.subtitle}
              </span>
            </Link>
            <div className="w-6" />
          </div>

          {/* Nav links centered */}
          <div className="flex-1 flex flex-col justify-center px-10">
            {[...navLeft, ...navRight].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-[18px] tracking-[0.15em] uppercase font-light py-4 border-b border-neutral-100 last:border-b-0 hover:text-luxury-black transition-colors text-center"
                style={{ color: palette.textMuted }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language selector */}
          {showLanguage && (
            <div className="px-10 py-6 border-t border-neutral-100 shrink-0">
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3 text-center" style={{ color: palette.textLight }}>Language</p>
              <div className="flex flex-wrap justify-center gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-[12px] tracking-[0.05em] rounded-sm border transition-colors ${currentLang === lang.code ? "border-neutral-400 bg-neutral-50 font-medium" : "border-neutral-200 font-light hover:bg-neutral-50"}`}
                    style={{ color: currentLang === lang.code ? palette.text : palette.textMuted }}
                  >
                    <img src={`https://flagcdn.com/20x15/${lang.flag}.png`} alt="" className="w-5 h-[15px] object-cover rounded-[2px]" />
                    {lang.code}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="px-10 pb-8 flex flex-col items-center gap-4 shrink-0">
            <a href={`tel:${"+34 600 000 000"}`} className="w-full flex items-center justify-center gap-2 text-[13px] tracking-[0.1em] uppercase py-3.5 transition-colors" style={{ background: palette.text, color: palette.white }}>
              <Phone className="w-4 h-4" /> Call Us
            </a>
            <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: palette.textLight }}>{brand.fullName}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
