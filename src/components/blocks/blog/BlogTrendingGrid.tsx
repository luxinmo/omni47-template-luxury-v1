interface TrendingArticle {
  image?: string;
  title?: string;
  category?: string;
  date?: string;
  href?: string;
}

interface BlogTrendingGridProps {
  title?: string;
  articles?: TrendingArticle[];
  accentColor?: string;
}

export default function BlogTrendingGrid({
  title = "Trending in The Journal",
  articles = [
    { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80", title: "Dual Demand Drives Dubai", category: "Market Insights", date: "25 Feb 2026", href: "#" },
    { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80", title: "A Majestic Alpine Estate Near Zermatt", category: "Architecture", date: "25 Feb 2026", href: "#" },
    { image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80", title: "Caribbean Paradise: Explore Exceptional Properties", category: "Destinations", date: "24 Feb 2026", href: "#" },
    { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80", title: "European Waterfront Properties as Safe Investment", category: "Investment", date: "22 Feb 2026", href: "#" },
  ],
  accentColor = "#8b6f47",
}: BlogTrendingGridProps) {
  return (
    <section className="py-14 md:py-20 bg-[#f8f6f3]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <h2 className="text-[13px] tracking-[0.15em] uppercase font-medium mb-8 text-[#2C2825]">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {articles.map((r, i) => (
            <a key={i} href={r.href || "#"} className="group block">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={r.image} alt={r.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="pt-3 space-y-1">
                <p className="text-[9px] tracking-[0.15em] uppercase font-medium" style={{ color: accentColor }}>{r.category}</p>
                <h3 className="text-[13px] font-normal leading-[1.35] group-hover:opacity-70 transition-opacity line-clamp-2 text-[#2C2825]">{r.title}</h3>
                <p className="text-[10px] font-light text-[#b0aaa3]">{r.date}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
