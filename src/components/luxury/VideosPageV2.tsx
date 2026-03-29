import { useState } from "react";
import { Play, X, Clock, Eye, ArrowUpRight, MapPin } from "lucide-react";
import { Layout } from "@/components/layout";
import SEOHead from "@/components/shared/SEOHead";
import FadeIn from "@/components/shared/FadeIn";
import { brand, palette, fonts } from "@/config/template";

/* ─── Types ─── */
interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  date: string;
  duration: string;
  views: string;
  location?: string;
}

/* ─── Data ─── */
const CATEGORIES = ["All", "Property Tours", "Lifestyle", "Market Insights", "Area Guides", "Company"];

const FEATURED: Video = {
  id: "featured",
  title: "The Art of Mediterranean Living",
  description: "An immersive cinematic journey through the most extraordinary homes along Spain's sun-drenched coastline. Discover the lifestyle, the architecture, and the stories behind our most iconic properties — from secluded Jávea estates to the panoramic clifftops of Altea.",
  youtubeId: "dQw4w9WgXcQ",
  category: "Lifestyle",
  date: "Mar 2026",
  duration: "8:24",
  views: "42.8K",
  location: "Costa Blanca, Spain",
};

const VIDEOS: Video[] = [
  { id: "1", title: "Villa Blanca — Cinematic Tour", description: "A private walkthrough of this stunning 6-bedroom Jávea estate with infinity pool and panoramic Mediterranean views stretching to the horizon.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Feb 2026", duration: "6:15", views: "8.7K", location: "Jávea, Alicante" },
  { id: "2", title: "Penthouse Living in Altea", description: "Explore the most exclusive penthouse on the Mediterranean coast — 420m² of pure elegance with floor-to-ceiling glass above the sea.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Jan 2026", duration: "5:23", views: "9.3K", location: "Altea, Alicante" },
  { id: "3", title: "Market Insights Q1 2026", description: "Our analysts break down the luxury property market trends across Spain's prime coastal regions, with data-driven predictions for the year ahead.", youtubeId: "dQw4w9WgXcQ", category: "Market Insights", date: "Jan 2026", duration: "12:08", views: "5.2K" },
  { id: "4", title: "Behind the Brand: Our Story", description: "How Prestige Estates became the most trusted name in luxury real estate on the Costa Blanca — a decade of vision, discretion and excellence.", youtubeId: "dQw4w9WgXcQ", category: "Company", date: "Dec 2025", duration: "8:44", views: "15.1K" },
  { id: "5", title: "The Skyline Penthouse — Full Tour", description: "Step inside Manhattan's most coveted address. Five bedrooms, 420m² of curated luxury above the city skyline with Central Park views.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Nov 2025", duration: "7:32", views: "22.4K", location: "Manhattan, New York" },
  { id: "6", title: "Investment Guide: Costa Blanca", description: "Everything you need to know about investing in Spanish luxury real estate in 2026 — from tax frameworks to the most promising micro-markets.", youtubeId: "dQw4w9WgXcQ", category: "Market Insights", date: "Oct 2025", duration: "15:30", views: "7.8K" },
  { id: "7", title: "Moraira: The Hidden Gem", description: "An in-depth area guide to one of Spain's best-kept secrets for luxury living — charming coves, Michelin restaurants and world-class privacy.", youtubeId: "dQw4w9WgXcQ", category: "Area Guides", date: "Sep 2025", duration: "7:12", views: "6.1K", location: "Moraira, Alicante" },
  { id: "8", title: "Modern Villa in Benissa", description: "Step inside this architectural masterpiece perched above the Mediterranean, designed by an award-winning studio with seamless indoor-outdoor living.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Aug 2025", duration: "4:55", views: "11.2K", location: "Benissa, Alicante" },
  { id: "9", title: "Coastal Living: Season Review", description: "The highlights, trends and landmark sales that defined our 2025 season along the coast — narrated by our senior advisors.", youtubeId: "dQw4w9WgXcQ", category: "Lifestyle", date: "Jul 2025", duration: "6:30", views: "18.9K" },
  { id: "10", title: "Jávea: Complete Area Guide", description: "Everything you need to know before buying property in this coveted coastal town — neighbourhoods, schools, lifestyle and market data.", youtubeId: "dQw4w9WgXcQ", category: "Area Guides", date: "Jun 2025", duration: "10:22", views: "8.4K", location: "Jávea, Alicante" },
];

function getThumb(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

/* ═══ Page ═══ */
export default function VideosPageV2() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = VIDEOS.filter((v) => activeCategory === "All" || v.category === activeCategory);

  return (
    <Layout activePath="/videos2" showLanguage={true}>
      <SEOHead title={`Videos — ${brand.name}`} description="Cinematic property tours, market analysis and lifestyle content." />

      {/* ─── Page Header ─── */}
      <section className="pt-28 sm:pt-36 pb-10 sm:pb-14" style={{ background: palette.bg }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Video Channel</p>
            <div className="flex items-end justify-between">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
                Our Films
              </h1>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60"
                style={{ color: palette.accent }}
              >
                YouTube <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FEATURED VIDEO — Full width ─── */}
      <section style={{ background: palette.bg }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8 pb-14 sm:pb-20">
          <FadeIn>
            <div className="group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Thumbnail */}
              <button
                onClick={() => setPlayingId(FEATURED.youtubeId)}
                className="relative overflow-hidden w-full block aspect-[16/10]"
              >
                <img
                  src={getThumb(FEATURED.youtubeId)}
                  alt={FEATURED.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center" style={{ background: "rgba(26,23,20,0.3)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)" }}>
                    <Play className="w-7 h-7 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 text-[11px] text-white/90 font-medium px-2.5 py-1 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.55)" }}>
                  {FEATURED.duration}
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-20" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.45) 0%, transparent 100%)" }} />
              </button>

              {/* Info */}
              <div className="flex flex-col justify-center py-2">
                <span className="text-[10px] tracking-[0.2em] uppercase font-medium px-3 py-1 self-start mb-4" style={{ background: palette.bgAlt, color: palette.textMuted, border: `1px solid ${palette.border}` }}>
                  {FEATURED.category}
                </span>
                {FEATURED.location && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3.5 h-3.5" style={{ color: palette.textLight }} />
                    <p className="text-xs tracking-[0.12em] uppercase font-light" style={{ color: palette.textLight }}>{FEATURED.location}</p>
                  </div>
                )}
                <h2 className="text-xl sm:text-2xl lg:text-[1.7rem] font-extralight tracking-wide leading-snug mb-4" style={{ fontFamily: fonts.heading, color: palette.text }}>
                  {FEATURED.title}
                </h2>
                <p className="text-[13px] sm:text-sm font-light leading-[1.7] mb-6" style={{ color: palette.textMuted }}>
                  {FEATURED.description}
                </p>
                <div className="flex items-center gap-5 text-[12px] font-light" style={{ color: palette.textLight }}>
                  <span>{FEATURED.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {FEATURED.duration}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {FEATURED.views}</span>
                </div>
                <button
                  onClick={() => setPlayingId(FEATURED.youtubeId)}
                  className="mt-6 sm:mt-8 self-start flex items-center gap-2.5 text-[11px] tracking-[0.15em] uppercase font-medium px-7 py-3.5 transition-all duration-300 hover:opacity-90"
                  style={{ background: palette.accent, color: "#fff" }}
                >
                  <Play className="w-4 h-4" fill="#fff" /> Watch Now
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Divider + Filters ─── */}
      <section style={{ background: palette.bg }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex gap-2 sm:gap-3 flex-wrap pb-2" style={{ borderBottom: `1px solid ${palette.border}` }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-[10px] sm:text-[11px] tracking-[0.14em] uppercase px-4 sm:px-5 py-2.5 transition-all duration-300 font-normal relative"
                style={{ color: activeCategory === cat ? palette.accent : palette.textMuted }}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[2px]" style={{ background: palette.accent }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIDEO GRID — 2 columns ─── */}
      <section className="py-12 sm:py-16 pb-20 sm:pb-28" style={{ background: palette.bg }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm font-light" style={{ color: palette.textMuted }}>No videos found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-10 lg:gap-y-14">
              {filtered.map((video, i) => (
                <FadeIn key={video.id} delay={i * 0.05}>
                  <div className="group">
                    {/* Thumbnail */}
                    <button
                      onClick={() => setPlayingId(video.youtubeId)}
                      className="relative overflow-hidden w-full block aspect-[16/10]"
                    >
                      <img
                        src={getThumb(video.youtubeId)}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center" style={{ background: "rgba(26,23,20,0.3)" }}>
                        <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)" }}>
                          <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                        </div>
                      </div>
                      <span className="absolute bottom-2.5 right-2.5 text-[10px] text-white/90 font-medium px-2 py-0.5 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.55)" }}>
                        {video.duration}
                      </span>
                      <span className="absolute top-2.5 left-2.5 text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 font-medium backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}>
                        {video.category}
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.45) 0%, transparent 100%)" }} />
                    </button>

                    {/* Info */}
                    <div className="pt-4 sm:pt-5 space-y-2">
                      {video.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" style={{ color: palette.textLight }} />
                          <p className="text-xs tracking-[0.12em] uppercase font-light" style={{ color: palette.textLight }}>{video.location}</p>
                        </div>
                      )}
                      <h3
                        className="text-[15px] sm:text-lg font-light tracking-wide leading-tight cursor-pointer"
                        style={{ fontFamily: fonts.heading, color: palette.text }}
                        onClick={() => setPlayingId(video.youtubeId)}
                      >
                        {video.title}
                      </h3>
                      <p className="text-[13px] font-light leading-[1.6] line-clamp-3" style={{ color: palette.textMuted }}>
                        {video.description}
                      </p>
                      <div className="flex items-center gap-4 pt-1 text-[12px] font-light" style={{ color: palette.textLight }}>
                        <span>{video.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {video.duration}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {video.views}</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Lightbox ─── */}
      {playingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setPlayingId(null)}>
          <button className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors z-10" onClick={() => setPlayingId(null)}>
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
