import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, X, Menu } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { brand, palette, fonts, languages, currencies, areaUnits, contact } from "@/config/template";

/* ─── Visible nav links (desktop/tablet) ─── */
const NAV_LEFT = [
  { label: "For Sale", href: "/properties" },
  { label: "For Rent", href: "#" },
  { label: "New Build", href: "/new-developments" },
];

const NAV_RIGHT = [
  { label: "Branded", href: "/branded-residences" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/* ─── All links inside hamburger menu ─── */
const MENU_LINKS = [
  { label: "For Sale", href: "/properties" },
  { label: "For Rent", href: "#" },
  { label: "New Developments", href: "/new-developments" },
  { label: "Branded Residences", href: "/branded-residences" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Favorites", href: "/favorites" },
  { label: "About", href: "/page/about" },
];

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("ES");
  const [currentCurrency, setCurrentCurrency] = useState("EUR");
  const [currentUnit, setCurrentUnit] = useState("m2");

  const isTransparent = variant === "transparent" && !scrolled;
  const textColor = isTransparent ? "#fff" : palette.text;
  const mutedColor = isTransparent ? "rgba(255,255,255,0.55)" : palette.textLight;
  const linkColor = isTransparent ? "rgba(255,255,255,0.75)" : palette.textMuted;

  const linkClass = "text-[12px] tracking-[0.12em] uppercase font-normal transition-opacity hover:opacity-60";

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
          {/* Left section */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            {/* Hamburger — always visible */}
            <button
              className="transition-colors duration-300 shrink-0"
              style={{ color: textColor }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Desktop left links */}
            <div className="hidden lg:flex items-center gap-6 ml-4">
              {NAV_LEFT.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={linkClass}
                  style={{ color: activePath === item.href ? textColor : linkColor }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Center: logo */}
          <Link to="/" className="flex flex-col items-center shrink-0">
            <span
              className="text-[20px] sm:text-[24px] lg:text-[26px] tracking-[0.4em] font-light transition-colors duration-300"
              style={{ fontFamily: fonts.brand, color: textColor }}
            >
              {brand.name}
            </span>
            <span
              className="text-[7px] sm:text-[8px] tracking-[0.45em] uppercase font-light transition-colors duration-300 -mt-0.5"
              style={{ color: mutedColor }}
            >
              {brand.subtitle}
            </span>
          </Link>

          {/* Right section */}
          <div className="flex items-center justify-end gap-6 flex-1">
            {/* Desktop right links */}
            <div className="hidden lg:flex items-center gap-6">
              {NAV_RIGHT.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={linkClass}
                  style={{ color: activePath === item.href ? textColor : linkColor }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Language code */}
            {showLanguage && (
              <button
                onClick={() => setLangOpen(true)}
                className="text-[11px] tracking-[0.1em] font-medium transition-colors duration-300"
                style={{ color: mutedColor }}
              >
                {currentLang}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Language/Currency/Units Dialog */}
      <Dialog open={langOpen} onOpenChange={setLangOpen}>
        <DialogContent className="max-w-md p-6 rounded-md border-2 border-neutral-300 overflow-hidden shadow-xl">
          <DialogTitle className="text-[11px] tracking-[0.15em] uppercase font-medium text-luxury-black/40 mb-5">Select Language</DialogTitle>
          <DialogDescription className="sr-only">Choose your preferred language</DialogDescription>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setCurrentLang(lang.code); setLangOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-sm text-[13px] border transition-all ${currentLang === lang.code ? "bg-neutral-50 border-neutral-300 font-medium" : "border-transparent font-light hover:bg-neutral-50"}`}
                style={{ color: currentLang === lang.code ? palette.text : palette.textMuted }}
              >
                <img
                  src={`https://flagcdn.com/24x18/${lang.flag}.png`}
                  srcSet={`https://flagcdn.com/48x36/${lang.flag}.png 2x`}
                  alt=""
                  className="w-5 h-[15px] object-cover rounded-[2px] opacity-80 shrink-0"
                />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
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

      {/* Fullscreen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 h-[64px] sm:h-[80px] border-b border-neutral-100 shrink-0">
            <button style={{ color: palette.text }} aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
            <Link to="/" className="flex flex-col items-center justify-center" onClick={() => setMenuOpen(false)}>
              <span className="text-[22px] sm:text-[26px] tracking-[0.4em] font-light" style={{ fontFamily: fonts.brand, color: palette.text }}>
                {brand.name}
              </span>
              <span className="text-[8px] tracking-[0.45em] uppercase font-light -mt-0.5" style={{ color: palette.textLight }}>
                {brand.subtitle}
              </span>
            </Link>
            <div className="w-6" />
          </div>

          {/* Links — centered, scrollable */}
          <div className="flex-1 overflow-auto flex flex-col items-center justify-center px-10">
            {MENU_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-[18px] tracking-[0.15em] uppercase font-light py-4 border-b border-neutral-100 last:border-b-0 hover:opacity-70 transition-colors text-center w-full max-w-md"
                style={{ color: activePath === item.href ? palette.text : palette.textMuted }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Bottom CTA — constrained width */}
          <div className="shrink-0 border-t border-neutral-100 px-4 py-5 flex flex-col items-center gap-3">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center justify-center gap-2 text-[12px] tracking-[0.1em] uppercase py-3 px-8 w-full max-w-xs transition-colors"
              style={{ background: palette.text, color: palette.white }}
            >
              <Phone className="w-4 h-4" /> Call Us
            </a>
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: palette.textLight }}>{brand.fullName}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
