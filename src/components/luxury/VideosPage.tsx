import { useState } from "react";
import { Play, X, Search, Filter } from "lucide-react";
import { Layout } from "@/components/layout";
import SEOHead from "@/components/shared/SEOHead";
import FadeIn from "@/components/shared/FadeIn";
import { palette, fonts, brand } from "@/config/template";

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  date: string;
  duration: string;
  views?: string;
}

const CATEGORIES = ["All", "Property Tours", "Lifestyle", "Market Insights", "Company", "Area Guides"];

const VIDEOS: Video[] = [
  { id: "1", title: "The Art of Coastal Living", description: "Discover our exclusive beachfront portfolio along the Costa Blanca — from Jávea's hidden coves to Altea's panoramic clifftops.", youtubeId: "dQw4w9WgXcQ", category: "Lifestyle", date: "Mar 2026", duration: "4:32", views: "12.4K" },
  { id: "2", title: "Villa Blanca — Cinematic Tour", description: "A private walkthrough of this stunning 6-bedroom Jávea estate with infinity pool and Mediterranean views.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Feb 2026", duration: "6:15", views: "8.7K" },
  { id: "3", title: "Market Insights Q1 2026", description: "Our analysts break down the luxury property market trends across Spain's prime coastal regions.", youtubeId: "dQw4w9WgXcQ", category: "Market Insights", date: "Jan 2026", duration: "12:08", views: "5.2K" },
  { id: "4", title: "Behind the Brand: Our Story", description: "How Prestige Estates became the most trusted name in luxury real estate on the Costa Blanca.", youtubeId: "dQw4w9WgXcQ", category: "Company", date: "Dec 2025", duration: "8:44", views: "15.1K" },
  { id: "5", title: "Penthouse Living in Altea", description: "Explore the most exclusive penthouse on the Mediterranean coast — 420m² of pure elegance.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Nov 2025", duration: "5:23", views: "9.3K" },
  { id: "6", title: "Investment Guide: Costa Blanca", description: "Everything you need to know about investing in Spanish luxury real estate in 2026.", youtubeId: "dQw4w9WgXcQ", category: "Market Insights", date: "Oct 2025", duration: "15:30", views: "7.8K" },
  { id: "7", title: "Moraira: The Hidden Gem", description: "An in-depth area guide to one of Spain's best-kept secrets for luxury living.", youtubeId: "dQw4w9WgXcQ", category: "Area Guides", date: "Sep 2025", duration: "7:12", views: "6.1K" },
  { id: "8", title: "Modern Villa in Benissa — Tour", description: "Step inside this architectural masterpiece perched above the Mediterranean.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Aug 2025", duration: "4:55", views: "11.2K" },
  { id: "9", title: "Why Clients Choose Us", description: "Hear directly from our clients about their experience buying luxury property with Prestige.", youtubeId: "dQw4w9WgXcQ", category: "Company", date: "Jul 2025", duration: "3:48", views: "4.5K" },
  { id: "10", title: "Ibiza Luxury Living 2025", description: "A showcase of the finest properties available on the White Island this season.", youtubeId: "dQw4w9WgXcQ", category: "Lifestyle", date: "Jun 2025", duration: "6:30", views: "18.9K" },
  { id: "11", title: "Costa Blanca Year in Review", description: "The highlights, trends and landmark sales that defined our 2025.", youtubeId: "dQw4w9WgXcQ", category: "Market Insights", date: "May 2025", duration: "9:15", views: "3.7K" },
  { id: "12", title: "Jávea: Complete Area Guide", description: "Everything you need to know before buying property in this coveted coastal town.", youtubeId: "dQw4w9WgXcQ", category: "Area Guides", date: "Apr 2025", duration: "10:22", views: "8.4K" },
];

function getThumb(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

export default function VideosPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = VIDEOS.filter((v) => {
    const matchCategory = activeCategory === "All" || v.category === activeCategory;
    const matchSearch = !search || v.title.toLowerCase().includes(search.toLowerCase()) || v.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <Layout>
      <SEOHead title={`Videos — ${brand.name}`} description="Watch property tours, market insights and lifestyle content from our team." />

      {/* Hero mini */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16" style={{ background: palette.bg }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Video Channel</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight mb-4" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
              Our Videos
            </h1>
            <p className="text-sm font-light max-w-xl mx-auto" style={{ color: palette.textMuted }}>
              Property tours, market analysis, area guides and a behind-the-scenes look at {brand.name}.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section style={{ background: palette.bg }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 pb-8">
          <FadeIn delay={0.05}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Categories */}
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="text-[11px] tracking-[0.12em] uppercase px-4 py-2 transition-all duration-300"
                    style={{
                      background: activeCategory === cat ? palette.accent : "transparent",
                      color: activeCategory === cat ? "#fff" : palette.textMuted,
                      border: `1px solid ${activeCategory === cat ? palette.accent : palette.border}`,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: palette.textLight }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search videos…"
                  className="w-full pl-10 pr-4 py-2.5 text-sm font-light focus:outline-none transition-colors"
                  style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Video Grid */}
      <section className="pb-20 sm:pb-28" style={{ background: palette.bg }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm font-light" style={{ color: palette.textMuted }}>No videos found matching your criteria.</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <FadeIn>
                  <button
                    onClick={() => setPlayingId(featured.youtubeId)}
                    className="group relative w-full overflow-hidden mb-6 text-left"
                    style={{ aspectRatio: "21/9" }}
                  >
                    <img src={getThumb(featured.youtubeId)} alt={featured.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                    <span className="absolute top-4 left-4 text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-medium backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}>{featured.category}</span>
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-2" style={{ fontFamily: fonts.heading, letterSpacing: "0.02em" }}>{featured.title}</h2>
                      <p className="text-sm text-white/60 font-light max-w-xl">{featured.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-[10px] tracking-[0.1em] uppercase text-white/40">{featured.date}</span>
                        <span className="text-[10px] tracking-[0.1em] uppercase text-white/40">{featured.duration}</span>
                        {featured.views && <span className="text-[10px] tracking-[0.1em] uppercase text-white/40">{featured.views} views</span>}
                      </div>
                    </div>
                  </button>
                </FadeIn>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {rest.map((v, i) => (
                  <FadeIn key={v.id} delay={0.05 * i}>
                    <button
                      onClick={() => setPlayingId(v.youtubeId)}
                      className="group relative w-full overflow-hidden text-left"
                    >
                      <div className="relative" style={{ aspectRatio: "16/9" }}>
                        <img src={getThumb(v.youtubeId)} alt={v.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 50%)" }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
                            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                          </div>
                        </div>
                        <span className="absolute top-2.5 left-2.5 text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 font-medium backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}>{v.category}</span>
                        <span className="absolute bottom-2.5 right-2.5 text-[10px] text-white/80 font-medium px-2 py-0.5 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.5)" }}>{v.duration}</span>
                      </div>
                      <div className="pt-3 pb-1">
                        <h3 className="text-sm font-light leading-tight mb-1" style={{ fontFamily: fonts.heading, color: palette.text }}>{v.title}</h3>
                        <p className="text-xs font-light line-clamp-2" style={{ color: palette.textMuted }}>{v.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] tracking-[0.08em] uppercase" style={{ color: palette.textLight }}>{v.date}</span>
                          {v.views && <span className="text-[10px] tracking-[0.08em] uppercase" style={{ color: palette.textLight }}>{v.views} views</span>}
                        </div>
                      </div>
                    </button>
                  </FadeIn>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {playingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm" onClick={() => setPlayingId(null)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors z-10" onClick={() => setPlayingId(null)}>
            <X className="w-7 h-7" />
          </button>
          <div className="w-full max-w-5xl aspect-video mx-4" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${playingId}?autoplay=1&rel=0`}
              title="Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
              style={{ border: 0 }}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
