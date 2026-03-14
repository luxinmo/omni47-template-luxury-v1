import { icons, type LucideIcon } from "lucide-react";

/**
 * Safely resolve a Lucide icon by name string.
 * Returns the icon component or a fallback.
 */
export function getIcon(name: string, fallback: LucideIcon = icons.Circle): LucideIcon {
  return (icons as Record<string, LucideIcon>)[name] ?? fallback;
}
