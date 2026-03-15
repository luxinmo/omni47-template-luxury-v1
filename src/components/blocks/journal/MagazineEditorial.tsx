import { ArrowUpRight } from "lucide-react";
import magazineMain from "@/assets/magazine-main.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";

/**
 * MagazineEditorial — Portal-style magazine section
 * Layout: 1 large article (4/3) left + 3 horizontal cards right
 * Includes category badges and read time — differs from JournalEditorial.
 */

interface Article {
  image: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
}

interface MagazineEditorialProps {
  sectionLabel?: string;
  title?: string;
  viewAllText?: string;
  viewAllHref?: string;
  articles?: Article[];
}

const DEFAULT_ARTICLES: Article[] = [
  { image: magazineMain, category: "Investment", date: "Feb 2026", readTime: "8 min read", title: "Mediterranean Real Estate: A Safe Haven for Global Investors" },
  { image: prop1, category: "Lifestyle", date: "Jan 2026", readTime: "5 min read", title: "The Rise of Branded Residences in Southern Europe" },
  { image: prop2, category: "Architecture", date: "Jan 2026", readTime: "6 min read", title: "Sustainable Luxury: The New Standard in Villa Design" },
  { image: prop3, category: "Market", date: "Dec 2025", readTime: "4 min read", title: "Costa del Sol Market Report: Trends & Forecasts 2026" },
];

export default function MagazineEditorial({
  sectionLabel = "Editorial",
  title = "The Magazine",
  viewAllText = "All articles",
  viewAllHref = "#",
  articles = DEFAULT_ARTICLES,
}: MagazineEditorialProps) {
  const [main, ...rest] = articles;

  return (
    <section className="bg-neutral-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 sm:py-32">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-neutral-300" />
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light">{sectionLabel}</p>
            </div>
            <h2 className="text-[32px] sm:text-[42px] font-extralight tracking-[-0.01em] text-neutral-900 leading-[1.1]">
              The<br />
              <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>{title.replace("The ", "")}</span>
            </h2>
          </div>
          <a
            href={viewAllHref}
            className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors font-light group"
          >
            {viewAllText}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Grid: 1 large + small list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Large article */}
          {main && (
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden mb-6">
                <img
                  src={main.image}
                  alt={main.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-900 font-medium bg-neutral-200 px-2.5 py-1">
                  {main.category}
                </span>
                <span className="text-[11px] tracking-[0.1em] text-neutral-400 font-light">{main.date}</span>
                <span className="text-neutral-200">·</span>
                <span className="text-[11px] tracking-[0.1em] text-neutral-400 font-light">{main.readTime}</span>
              </div>
              <h3 className="text-[24px] sm:text-[28px] font-extralight text-neutral-900 leading-[1.3] group-hover:text-neutral-500 transition-colors duration-300">
                {main.title}
              </h3>
            </div>
          )}

          {/* Small articles */}
          <div className="flex flex-col gap-8 lg:gap-10">
            {rest.map((a, i) => (
              <div key={i} className="group cursor-pointer flex gap-5 sm:gap-6">
                <div className="w-[130px] sm:w-[180px] flex-shrink-0 aspect-[4/3] overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-900 font-medium bg-neutral-200 px-2 py-0.5">
                      {a.category}
                    </span>
                    <span className="text-[10px] tracking-[0.1em] text-neutral-400 font-light">{a.readTime}</span>
                  </div>
                  <h3 className="text-[15px] sm:text-[17px] font-light text-neutral-900 leading-snug group-hover:text-neutral-500 transition-colors duration-300">
                    {a.title}
                  </h3>
                  <span className="text-[11px] text-neutral-300 font-light mt-2">{a.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
