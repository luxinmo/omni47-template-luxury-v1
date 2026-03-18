import { useState, useRef } from "react";
import { Play, X, Search, Clock, Eye, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
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
}

/* ─── Data ─── */
const CATEGORIES = ["All", "Property Tours", "Lifestyle", "Market Insights", "Company", "Area Guides"];

const VIDEOS: Video[] = [
  { id: "1", title: "The Art of Coastal Living", description: "Discover our exclusive beachfront portfolio along the Costa Blanca — from Jávea's hidden coves to Altea's panoramic clifftops.", youtubeId: "dQw4w9WgXcQ", category: "Lifestyle", date: "15 mar 2026", duration: "4:32", views: "12,4 K" },
  { id: "2", title: "Villa Blanca — Cinematic Tour", description: "A private walkthrough of this stunning 6-bedroom Jávea estate with infinity pool and Mediterranean views.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "28 feb 2026", duration: "6:15", views: "8,7 K" },
  { id: "3", title: "Market Insights Q1 2026", description: "Our analysts break down the luxury property market trends across Spain's prime coastal regions.", youtubeId: "dQw4w9WgXcQ", category: "Market Insights", date: "10 ene 2026", duration: "12:08", views: "5,2 K" },
  { id: "4", title: "Behind the Brand: Our Story", description: "How Prestige Estates became the most trusted name in luxury real estate on the Costa Blanca.", youtubeId: "dQw4w9WgXcQ", category: "Company", date: "5 dic 2025", duration: "8:44", views: "15,1 K" },
  { id: "5", title: "Penthouse Living in Altea", description: "Explore the most exclusive penthouse on the Mediterranean coast — 420m² of pure elegance.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "18 nov 2025", duration: "5:23", views: "9,3 K" },
  { id: "6", title: "Investment Guide: Costa Blanca", description: "Everything you need to know about investing in Spanish luxury real estate in 2026.", youtubeId: "dQw4w9WgXcQ", category: "Market Insights", date: "2 oct 2025", duration: "15:30", views: "7,8 K" },
  { id: "7", title: "Moraira: The Hidden Gem", description: "An in-depth area guide to one of Spain's best-kept secrets for luxury living.", youtubeId: "dQw4w9WgXcQ", category: "Area Guides", date: "14 sep 2025", duration: "7:12", views: "6,1 K" },
  { id: "8", title: "Modern Villa in Benissa — Tour", description: "Step inside this architectural masterpiece perched above the Mediterranean.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "22 ago 2025", duration: "4:55", views: "11,2 K" },
  { id: "9", title: "Why Clients Choose Us", description: "Hear directly from our clients about their experience buying luxury property with Prestige.", youtubeId: "dQw4w9WgXcQ", category: "Company", date: "8 jul 2025", duration: "3:48", views: "4,5 K" },
  { id: "10", title: "Ibiza Luxury Living 2025", description: "A showcase of the finest properties available on the White Island this season.", youtubeId: "dQw4w9WgXcQ", category: "Lifestyle", date: "30 jun 2025", duration: "6:30", views: "18,9 K" },
  { id: "11", title: "Costa Blanca Year in Review", description: "The highlights, trends and landmark sales that defined our 2025.", youtubeId: "dQw4w9WgXcQ", category: "Market Insights", date: "15 may 2025", duration: "9:15", views: "3,7 K" },
  { id: "12", title: "Jávea: Complete Area Guide", description: "Everything you need to know before buying property in this coveted coastal town.", youtubeId: "dQw4w9WgXcQ", category: "Area Guides", date: "3 abr 2025", duration: "10:22", views: "8,4 K" },
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

/* ─── Shorts Section (YouTube-style) ─── */
function ShortsSection({ onPlay }: { onPlay: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 220;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative group/shorts">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#FF0000" }}>
            <Play className="w-3 h-3 text-white ml-0.5" fill="white" />
          </div>
          <h2 className="text-lg font-light tracking-wide" style={{ fontFamily: fonts.heading, color: palette.text }}>Shorts</h2>
        </div>
        <div className="flex-1 h-px" style={{ background: palette.border }} />
      </div>

      {/* Scroll arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/shorts:opacity-100 transition-opacity duration-300 -translate-x-3"
        style={{ background: palette.white, border: `1px solid ${palette.border}` }}
      >
        <ChevronLeft className="w-5 h-5" style={{ color: palette.text }} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/shorts:opacity-100 transition-opacity duration-300 translate-x-3"
        style={{ background: palette.white, border: `1px solid ${palette.border}` }}
      >
        <ChevronRight className="w-5 h-5" style={{ color: palette.text }} />
      </button>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-3"
        style={{ scrollbarWidth: "none" }}
      >
        {SHORTS.map((s) => (
          <button
            key={s.id}
            onClick={() => onPlay(s.youtubeId)}
            className="group flex-shrink-0 text-left"
            style={{ width: "140px" }}
          >
            {/* Thumbnail — rounded like YouTube shorts */}
            <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "9/16" }}>
              <img
                src={getThumb(s.youtubeId)}
                alt={s.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 45%)" }} />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}>
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </div>
              </div>
            </div>
            {/* Title + views below like YouTube */}
            <div className="mt-2.5 px-0.5">
              <p className="text-[13px] font-normal leading-tight line-clamp-2" style={{ color: palette.text }}>{s.title}</p>
              {s.views && (
                <span className="text-[11px] mt-1 block" style={{ color: palette.textLight }}>{s.views} visualizaciones</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Horizontal Video Row (YouTube-style) ─── */
function VideoRow({ video, onPlay }: { video: Video; onPlay: (id: string) => void }) {
  return (
    <div className="group flex gap-4 sm:gap-5">
      {/* Thumbnail */}
      <button
        onClick={() => onPlay(video.youtubeId)}
        className="relative flex-shrink-0 overflow-hidden rounded-lg w-[160px] sm:w-[260px] lg:w-[360px]"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src={getThumb(video.youtubeId)}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="white" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 text-[10px] text-white font-medium px-1.5 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.7)" }}>
          {video.duration}
        </span>
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0 py-0.5 sm:py-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-[14px] sm:text-[16px] font-normal leading-snug line-clamp-2 group-hover:opacity-70 transition-opacity cursor-pointer"
            style={{ fontFamily: fonts.heading, color: palette.text }}
            onClick={() => onPlay(video.youtubeId)}
          >
            {video.title}
          </h3>
          <div className="flex items-center gap-3 mt-1.5 text-[11px] sm:text-[12px]" style={{ color: palette.textLight }}>
            {video.views && <span>{video.views} visualizaciones</span>}
            <span>·</span>
            <span>{video.date}</span>
          </div>
          <p className="text-[12px] sm:text-[13px] font-light leading-[1.55] line-clamp-2 mt-2 hidden sm:block" style={{ color: palette.textMuted }}>
            {video.description}
          </p>
        </div>
        <div className="mt-2">
          <span
            className="text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 font-medium"
            style={{ background: palette.bgAlt, color: palette.textMuted, border: `1px solid ${palette.border}` }}
          >
            {video.category}
          </span>
        </div>
      </div>
    </div>
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

  return (
    <Layout>
      <SEOHead title={`Videos — ${brand.name}`} description="Watch property tours, market insights and lifestyle content from our team." />

      {/* Hero */}
      <section className="pt-28 pb-8 sm:pt-36 sm:pb-10" style={{ background: palette.bg }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8 text-center">
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
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <FadeIn>
            <ShortsSection onPlay={setPlayingId} />
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="h-px" style={{ background: palette.border }} />
      </div>

      {/* ═══ FILTERS ═══ */}
      <section style={{ background: palette.bg }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8 py-8">
          <FadeIn delay={0.05}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="text-[11px] tracking-[0.1em] uppercase px-4 py-2 rounded-full transition-all duration-300"
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
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: palette.textLight }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar videos…"
                  className="w-full pl-10 pr-4 py-2.5 text-sm font-light rounded-full focus:outline-none transition-colors"
                  style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text }}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ VIDEO LIST (horizontal rows) ═══ */}
      <section className="pb-20 sm:pb-28" style={{ background: palette.bg }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm font-light" style={{ color: palette.textMuted }}>No se encontraron videos.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((v, i) => (
                <FadeIn key={v.id} delay={0.03 * i}>
                  <div className="pb-6" style={{ borderBottom: `1px solid ${palette.border}` }}>
                    <VideoRow video={v} onPlay={setPlayingId} />
                  </div>
                </FadeIn>
              ))}
            </div>
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
