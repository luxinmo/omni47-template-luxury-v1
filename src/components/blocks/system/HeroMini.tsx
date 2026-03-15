/**
 * HERO MINI
 * Compact page header with accent label, title, subtitle and divider.
 * Used for system pages (About, Terms, Privacy) and section intros.
 * Origin: SystemPage, BlogListingPage
 */

interface HeroMiniProps {
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
  showDivider?: boolean;
}

const HeroMini = ({
  sectionLabel = "Information",
  title = "About Us",
  subtitle = "A curated luxury real estate advisory specialising in the most exclusive properties across the Mediterranean.",
  showDivider = true,
}: HeroMiniProps) => (
  <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 md:pt-20 pb-6 text-center">
    <p className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4 text-amber-700/70">{sectionLabel}</p>
    <h1 className="text-[28px] md:text-[40px] font-extralight leading-[1.15] tracking-[0.01em] text-neutral-900">{title}</h1>
    {subtitle && (
      <p className="text-[14px] font-light leading-[1.7] mt-4 max-w-xl mx-auto text-neutral-500">{subtitle}</p>
    )}
    {showDivider && <div className="w-12 h-[1px] mx-auto mt-8 bg-amber-700/60" />}
  </header>
);

export default HeroMini;
