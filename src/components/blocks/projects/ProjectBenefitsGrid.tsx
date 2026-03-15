import { Star, Shield, Sparkles, Users, CheckCircle, TrendingUp, Home, LucideIcon } from "lucide-react";

interface Benefit {
  icon?: LucideIcon;
  title?: string;
  description?: string;
}

interface ProjectBenefitsGridProps {
  sectionLabel?: string;
  title?: string;
  benefits?: Benefit[];
  accentColor?: string;
}

export default function ProjectBenefitsGrid({
  sectionLabel = "Why Choose",
  title = "The Branded Residence Advantage",
  benefits = [
    { icon: Star, title: "Five-Star Services", description: "Enjoy hotel-grade concierge, housekeeping, dining and spa services in the comfort of your own home." },
    { icon: Shield, title: "Strong Investment", description: "Branded residences typically command 25–35% premium over comparable non-branded properties." },
    { icon: Sparkles, title: "World-Class Amenities", description: "Private pools, fitness centres, fine dining, beach clubs and wellness spas at your doorstep." },
    { icon: Users, title: "Global Community", description: "Join an exclusive community of like-minded owners who appreciate the finer things in life." },
  ],
  accentColor = "#8b6f47",
}: ProjectBenefitsGridProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#f8f6f3]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.04em" }}>{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon || Star;
            return (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 bg-white">
                  <Icon className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <h3 className="text-base font-light tracking-wide mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{b.title}</h3>
                <p className="text-[13px] leading-[1.8] font-light text-[#8a8580]">{b.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
