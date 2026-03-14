import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { brand, palette, fonts, navLeft, navRight, languages } from "@/config/template";

interface NavbarProps {
  /** "transparent" overlays on hero images; "solid" is standard white bg */
  variant?: "transparent" | "solid";
  scrolled?: boolean;
  /** Show language selector */
  showLanguage?: boolean;
  /** Active page path for highlighting */
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

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isTransparent = variant === "transparent" && !scrolled;
  const textColor = isTransparent ? "#fff" : palette.text;
  const mutedColor = isTransparent ? "rgba(255,255,255,0.5)" : palette.textLight;

  return (
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
        {/* Language selector (optional) */}
        {showLanguage && (
          <div className="hidden lg:flex items-center relative mr-6">
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

        {/* Language Dialog */}
        <Dialog open={langOpen} onOpenChange={setLangOpen}>
          <DialogContent className="max-w-md p-6 rounded-md border-2 border-neutral-300 overflow-hidden shadow-xl">
            <DialogTitle className="text-[11px] tracking-[0.15em] uppercase font-medium text-luxury-black/40 mb-5">Select Language</DialogTitle>
            <DialogDescription className="sr-only">Choose your preferred language</DialogDescription>
            <div className="grid grid-cols-3 gap-2">
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
          </DialogContent>
        </Dialog>

        {/* Left nav links */}
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

        {/* Center logo */}
        <Link to="/" className="flex flex-col items-center">
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

        {/* Right nav links */}
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

        {/* Mobile hamburger */}
        <button
          className="lg:hidden transition-colors duration-300"
          style={{ color: isTransparent ? "#fff" : palette.text }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden animate-in slide-in-from-top-2 duration-200" style={{ background: palette.white, borderTop: `1px solid ${palette.border}` }}>
          <div className="px-6 py-6 flex flex-col gap-1">
            {[...navLeft, ...navRight].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-[14px] tracking-[0.08em] font-light py-3"
                style={{ color: palette.text, borderBottom: `1px solid ${palette.border}40` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {showLanguage && (
              <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${palette.border}` }}>
                <p className="text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: palette.textLight }}>Language</p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setCurrentLang(lang.code)}
                      className="px-3 py-1.5 text-[11px] tracking-[0.1em] transition-colors"
                      style={{
                        border: `1px solid ${currentLang === lang.code ? palette.text : palette.border}`,
                        background: currentLang === lang.code ? palette.text : "transparent",
                        color: currentLang === lang.code ? palette.white : palette.textLight,
                      }}
                    >
                      {lang.code}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
