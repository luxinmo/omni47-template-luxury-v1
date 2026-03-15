/**
 * BREADCRUMB BAR
 * Simple horizontal breadcrumb with chevron separators.
 * Origin: SystemPage, BlogDetailPage
 */

import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbBarProps {
  items?: BreadcrumbItem[];
}

const defaultItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/page/about" },
  { label: "Our Team" },
];

const BreadcrumbBar = ({ items = defaultItems }: BreadcrumbBarProps) => (
  <nav className="py-3 border-b border-neutral-200 bg-white" aria-label="Breadcrumb">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
      <ol className="flex items-center gap-1.5 text-[12px] font-light">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3 text-neutral-300" />}
            {item.href && i < items.length - 1 ? (
              <a href={item.href} className="text-neutral-500 hover:text-neutral-900 transition-colors">{item.label}</a>
            ) : (
              <span className="text-neutral-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  </nav>
);

export default BreadcrumbBar;
