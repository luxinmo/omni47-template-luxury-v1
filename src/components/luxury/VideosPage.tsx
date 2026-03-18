import { useState } from "react";
import { Play, X, Search, Clock, Eye, ArrowUpRight, TrendingUp } from "lucide-react";
import { Layout } from "@/components/layout";
import SEOHead from "@/components/shared/SEOHead";
import FadeIn from "@/components/shared/FadeIn";
import { palette, fonts, brand } from "@/config/template";

/* ─── Types ─── */
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

interface Short {
  id: string;
  title: string;
  youtubeId: string;
  views?: string;
  thumbnail?: string;
}

/* ─── Data ─── */
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

const SHORTS: Short[] = [
  { id: "s1", title: "Villa reveal in 30 seconds 🏡", youtubeId: "dQw4w9WgXcQ", views: "45K" },
  { id: "s2", title: "Sea view morning routine ☀️", youtubeId: "dQw4w9WgXcQ", views: "32K" },
  { id: "s3", title: "€3M penthouse walkthrough", youtubeId: "dQw4w9WgXcQ", views: "67K" },
  { id: "s4", title: "Infinity pool at sunset 🌅", youtubeId: "dQw4w9WgXcQ", views: "28K" },
  { id: "s5", title: "Before & after renovation", youtubeId: "dQw4w9WgXcQ", views: "51K" },
  { id: "s6", title: "Inside a €12M Ibiza estate", youtubeId: "dQw4w9WgXcQ", views: "89K" },
  { id: "s7", title: "The view you wake up to", youtubeId: "dQw4w9WgXcQ", views: "22K" },
  { id: "s8", title: "Moraira's hidden gem 💎", youtubeId: "dQw4w9WgXcQ", views: "38K" },
];

function getThumb(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

/* ─── Sub-components ─── */
function VideoCard({ video, onPlay }: { video: Video; onPlay: (id: string) => void }) {
  return (
    <div className="group">
      <button
        onClick={() => onPlay(video.youtubeId)}
        className="relative w-full overflow-hidden block"
        style={{ aspectRatio: "16/10" }}
      >
        <img src={getThumb(video.youtubeId)} alt={video.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 50%)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)" }}>
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          </div>
        </div>
        <span className="absolute top-2.5 left-2.5 text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 font-medium backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.25)" }}>
          {video.category}
        </span>
        <span className="absolute bottom-2.5 right-2.5 text-[10px] text-white/90 font-medium px-2 py-0.5 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.55)" }}>
          {video.duration}
        </span>
      </button>

      {/* Card body — property-card style info area */}
      <div className="py-4 px-0.5 space-y-2" style={{ borderBottom: `1px solid ${palette.border}` }}>
        <h3 className="text-[15px] font-light tracking-wide leading-tight group-hover:opacity-70 transition-opacity" style={{ fontFamily: fonts.heading, color: palette.text }}>
          {video.title}
        </h3>
        <p className="text-[13px] font-light leading-[1.55] line-clamp-2" style={{ color: palette.textMuted }}>
          {video.description}
        </p>
        <div className="flex items-center gap-4 pt-1 text-[12px] font-light" style={{ color: palette.textLight }}>
          <span>{video.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {video.duration}</span>
          {video.views && <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {video.views}</span>}
        </div>
      </div>
    </div>
  );
}

function ShortCard({ short, onPlay }: { short: Short; onPlay: (id: string) => void }) {
  return (
    <button
      onClick={() => onPlay(short.youtubeId)}
      className="group relative overflow-hidden flex-shrink-0 w-[160px] sm:w-[180px]"
      style={{ aspectRatio: "9/16" }}
    >
      <img src={getThumb(short.youtubeId)} alt={short.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 40%)" }} />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)" }}>
          <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-[12px] font-light text-white leading-tight line-clamp-2">{short.title}</p>
        {short.views && (
          <span className="text-[10px] text-white/50 mt-1 flex items-center gap-1">
            <Eye className="w-2.5 h-2.5" /> {short.views}
          </span>
        )}
      </div>
    </button>
  );
}

/* ─── Page ─── */
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

      {/* Hero */}
      <section className="pt-28 pb-10 sm:pt-36 sm:pb-14" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12 text-center">
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

      {/* ═══ SHORTS ═══ */}
      <section style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12 pb-12 sm:pb-16">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: palette.accent }} />
                <h2 className="text-lg font-light tracking-wide" style={{ fontFamily: fonts.heading }}>Shorts</h2>
              </div>
              <div className="flex-1 h-px" style={{ background: palette.border }} />
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
              {SHORTS.map((s) => (
                <ShortCard key={s.id} short={s} onPlay={setPlayingId} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FILTERS ═══ */}
      <section style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12 pb-8">
          <FadeIn delay={0.05}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
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

      {/* ═══ FEATURED + GRID ═══ */}
      <section className="pb-20 sm:pb-28" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm font-light" style={{ color: palette.textMuted }}>No videos found matching your criteria.</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <FadeIn>
                  <div className="group mb-8">
                    <button
                      onClick={() => setPlayingId(featured.youtubeId)}
                      className="relative w-full overflow-hidden text-left"
                      style={{ aspectRatio: "21/9" }}
                    >
                      <img src={getThumb(featured.youtubeId)} alt={featured.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)" }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </div>
                      </div>
                      <span className="absolute top-4 left-4 text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-medium backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}>{featured.category}</span>
                    </button>
                    {/* Featured card body */}
                    <div className="py-5 space-y-2" style={{ borderBottom: `1px solid ${palette.border}` }}>
                      <h2 className="text-xl sm:text-2xl font-light" style={{ fontFamily: fonts.heading, color: palette.text }}>{featured.title}</h2>
                      <p className="text-sm font-light max-w-2xl" style={{ color: palette.textMuted }}>{featured.description}</p>
                      <div className="flex items-center gap-4 pt-1 text-[12px] font-light" style={{ color: palette.textLight }}>
                        <span>{featured.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.duration}</span>
                        {featured.views && <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {featured.views}</span>}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
                {rest.map((v, i) => (
                  <FadeIn key={v.id} delay={0.05 * i}>
                    <VideoCard video={v} onPlay={setPlayingId} />
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
