/**
 * CONTACT REASONS GRID
 * Icon + title + description cards for contact motivations.
 * Origin: ContactPageV2 (left hero overlay)
 */

import { Globe, MessageCircle, Send } from "lucide-react";
import { getIcon } from "@/components/blocks/_utils/get-icon";

interface Reason {
  iconName: string;
  title: string;
  description: string;
}

interface ContactReasonsGridProps {
  reasons?: Reason[];
  variant?: "light" | "dark";
}

const defaultReasons: Reason[] = [
  { iconName: "Globe", title: "Buy or Sell", description: "Expert guidance for luxury transactions" },
  { iconName: "MessageCircle", title: "Valuation", description: "Complimentary market appraisal" },
  { iconName: "Send", title: "Investment", description: "Portfolio & advisory services" },
];

const ContactReasonsGrid = ({
  reasons = defaultReasons,
  variant = "dark",
}: ContactReasonsGridProps) => {
  const isDark = variant === "dark";

  return (
    <div className="flex flex-col gap-4">
      {reasons.map((r) => {
        const Icon = getIcon(r.iconName);
        return (
          <div key={r.title} className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: isDark ? "rgba(139,111,71,0.2)" : "rgba(139,111,71,0.08)",
                border: isDark ? "1px solid rgba(139,111,71,0.3)" : "1px solid rgba(139,111,71,0.15)",
              }}
            >
              <Icon className="w-4 h-4 text-amber-700/70" />
            </div>
            <div>
              <p className={`text-[13px] font-medium tracking-[0.02em] ${isDark ? "text-white" : "text-neutral-900"}`}>{r.title}</p>
              <p className={`text-[11px] font-light ${isDark ? "text-white/50" : "text-neutral-500"}`}>{r.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactReasonsGrid;
