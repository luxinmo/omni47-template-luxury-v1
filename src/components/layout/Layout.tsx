import { useRef } from "react";
import { ChevronUp } from "lucide-react";
import { palette, fonts } from "@/config/template";
import { useContainerScrolled } from "@/hooks/use-scroll";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  /** "transparent" for home hero overlay; "solid" for inner pages */
  navVariant?: "transparent" | "solid";
  /** Show the shared navbar (set false if page has custom nav) */
  showNavbar?: boolean;
  /** Show the shared footer */
  showFooter?: boolean;
  /** Show language selector in navbar */
  showLanguage?: boolean;
  /** Show back-to-top button */
  showBackToTop?: boolean;
  /** Active path for nav highlighting */
  activePath?: string;
  /** Background color override */
  background?: string;
}

const Layout = ({
  children,
  navVariant = "solid",
  showNavbar = true,
  showFooter = true,
  showLanguage = true,
  showBackToTop = true,
  activePath,
  background = palette.bg,
}: LayoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrolled = useContainerScrolled(containerRef);

  const scrollToTop = () => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-auto relative"
      style={{ background, color: palette.text, fontFamily: fonts.body }}
    >
      {showNavbar && (
        <Navbar
          variant={navVariant}
          scrolled={scrolled}
          showLanguage={showLanguage}
          activePath={activePath}
        />
      )}

      {children}

      {showFooter && <Footer />}

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all hover:scale-110"
          style={{ background: palette.text, color: palette.white }}
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Layout;
