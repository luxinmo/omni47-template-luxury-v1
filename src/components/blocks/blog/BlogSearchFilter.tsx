/**
 * BLOG SEARCH FILTER
 * Search input + category chip filters for blog listing.
 * Origin: BlogListingPage
 */

import { useState } from "react";
import { Search } from "lucide-react";

interface Category {
  slug: string;
  label: string;
}

interface BlogSearchFilterProps {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  categories?: Category[];
  onSearch?: (query: string) => void;
  onCategoryChange?: (slug: string) => void;
}

const defaultCategories: Category[] = [
  { slug: "all", label: "All" },
  { slug: "market-insights", label: "Market Insights" },
  { slug: "lifestyle", label: "Lifestyle" },
  { slug: "architecture", label: "Architecture & Design" },
  { slug: "investment", label: "Investment" },
  { slug: "destinations", label: "Destinations" },
  { slug: "guides", label: "Guides" },
];

const BlogSearchFilter = ({
  title = "The Journal",
  subtitle = "Insights, guides and stories from the world of luxury real estate",
  searchPlaceholder = "Search articles...",
  categories = defaultCategories,
  onSearch,
  onCategoryChange,
}: BlogSearchFilterProps) => {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  return (
    <section className="py-10 md:py-16 bg-neutral-50">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-10">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal text-amber-700/70">Journal</p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.04em] text-neutral-900">{title}</h2>
          <p className="text-[13px] md:text-[14px] font-light mt-3 max-w-lg mx-auto text-neutral-400">{subtitle}</p>
          <div className="w-12 h-[1px] mx-auto mt-6 bg-amber-700/60" />
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" strokeWidth={1.5} />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); onSearch?.(e.target.value); }}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 text-[13px] border border-neutral-200 bg-white text-neutral-900 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => { setActive(cat.slug); onCategoryChange?.(cat.slug); }}
              className="px-4 py-2 text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-300 border"
              style={{
                borderColor: active === cat.slug ? "rgb(38,38,38)" : "rgb(229,229,229)",
                background: active === cat.slug ? "rgb(38,38,38)" : "transparent",
                color: active === cat.slug ? "white" : "rgb(163,163,163)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSearchFilter;
