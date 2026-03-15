import { Heart, ArrowRight } from "lucide-react";

interface FavoritesEmptyStateProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  accentColor?: string;
}

export default function FavoritesEmptyState({
  title = "No Saved Properties Yet",
  description = "Browse our luxury collection and tap the heart icon to save properties you love. They'll appear here for easy access.",
  ctaText = "Explore Properties",
  ctaHref = "#",
  accentColor = "#8b6f47",
}: FavoritesEmptyStateProps) {
  return (
    <div className="text-center max-w-md mx-auto py-20">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: `${accentColor}10` }}>
        <Heart className="w-7 h-7" style={{ color: accentColor }} strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-light mb-2 text-[#2C2825]" style={{ fontFamily: "'Playfair Display', serif" }}>
        {title}
      </h2>
      <p className="text-[14px] font-light mb-8 leading-relaxed text-[#8a8580]">
        {description}
      </p>
      <a
        href={ctaHref}
        className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase font-medium px-8 py-3.5 transition-all duration-300 hover:opacity-85 bg-[#2C2825] text-white"
      >
        {ctaText} <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}
