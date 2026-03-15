/**
 * DETAIL BREADCRUMB
 * Navigation breadcrumb for property detail pages.
 * Origin: PropertyDetail V2–V6
 */

import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DetailBreadcrumbProps {
  items?: BreadcrumbItem[];
}

const defaults: BreadcrumbItem[] = [
  { label: "Home", href: "#" },
  { label: "Ibiza", href: "#" },
  { label: "Santa Eulalia del Río", href: "#" },
  { label: "Luxury Villa" },
];

const DetailBreadcrumb = ({ items = defaults }: DetailBreadcrumbProps) => (
  <nav aria-label="Breadcrumb" className="mb-3">
    <ol className="flex items-center gap-2 text-[13px] text-neutral-400 font-light flex-wrap">
      {items.map((crumb, i) => (
        <li key={i} className="flex items-center gap-2">
          {crumb.href ? (
            <a href={crumb.href} className="hover:text-neutral-800 transition-colors">{crumb.label}</a>
          ) : (
            <span className="text-neutral-600 font-normal">{crumb.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="w-3 h-3 text-neutral-300" />}
        </li>
      ))}
    </ol>
  </nav>
);

export default DetailBreadcrumb;
