import { useState } from "react";
import { Play, X, Clock, Eye, MapPin, ArrowUpRight, Film, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout";
import SEOHead from "@/components/shared/SEOHead";
import FadeIn from "@/components/shared/FadeIn";
import { brand, palette, fonts } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";

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
  description: "An immersive cinematic journey through the most extraordinary homes along Spain's sun-drenched coastline. Discover the lifestyle, the architecture, and the stories behind our most iconic properties.",
  youtubeId: "dQw4w9WgXcQ",
  category: "Lifestyle",
  date: "Mar 2026",
  duration: "8:24",
  views: "42.8K",
  location: "Costa Blanca, Spain",
};

const VIDEOS: Video[] = [
  { id: "1", title: "Villa Blanca — Cinematic Tour", description: "A private walkthrough of this stunning 6-bedroom Jávea estate with infinity pool and panoramic Mediterranean views.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Feb 2026", duration: "6:15", views: "8.7K", location: "Jávea" },
  { id: "2", title: "Penthouse Living in Altea", description: "The most exclusive penthouse on the coast — 420m² of pure elegance with floor-to-ceiling glass above the sea.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Jan 2026", duration: "5:23", views: "9.3K", location: "Altea" },
  { id: "3", title: "Market Insights Q1 2026", description: "Our analysts break down the luxury property market trends across Spain's prime coastal regions.", youtubeId: "dQw4w9WgXcQ", category: "Market Insights", date: "Jan 2026", duration: "12:08", views: "5.2K" },
  { id: "4", title: "Behind the Brand: Our Story", description: "How we became the most trusted name in luxury real estate on the Costa Blanca.", youtubeId: "dQw4w9WgXcQ", category: "Company", date: "Dec 2025", duration: "8:44", views: "15.1K" },
  { id: "5", title: "The Skyline Penthouse — Full Tour", description: "Step inside this coveted address. Five bedrooms, 420m² of curated luxury above the coastline.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Nov 2025", duration: "7:32", views: "22.4K", location: "Altea" },
  { id: "6", title: "Investment Guide: Costa Blanca", description: "Everything you need to know about investing in Spanish luxury real estate in 2026.", youtubeId: "dQw4w9WgXcQ", category: "Market Insights", date: "Oct 2025", duration: "15:30", views: "7.8K" },
  { id: "7", title: "Moraira: The Hidden Gem", description: "An in-depth area guide to one of Spain's best-kept secrets for luxury living.", youtubeId: "dQw4w9WgXcQ", category: "Area Guides", date: "Sep 2025", duration: "7:12", views: "6.1K", location: "Moraira" },
  { id: "8", title: "Modern Villa in Benissa", description: "An architectural masterpiece perched above the Mediterranean with seamless indoor-outdoor living.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Aug 2025", duration: "4:55", views: "11.2K", location: "Benissa" },
];

function getThumb(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

/* ═══ Page ═══ */
export default function VideosPageV3() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = VIDEOS.filter((v) => activeCategory === "All" || v.category === activeCategory);

  return (
    <Layout activePath="/videos3" showLanguage={true}>
      <SEOHead title={`Films — ${brand.name}`} description="Cinematic property tours, market analysis and lifestyle content." />

      {/* ═══ HERO — Cinematic Featured Video ═══ */}
      <section className="relative h-[70vh] sm:h-[80vh] min-h-[500px] flex items-end overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(15,13,11,0.92) 0%, rgba(15,13,11,0.4) 40%, rgba(15,13,11,0.15) 100%)" }} />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 pb-14 sm:pb-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-5">
              <Film className="w-4 h-4" style={{ color: palette.offMarketAccent }} />
              <span className="text-[10px] tracking-[0.35em] uppercase font-normal" style={{ color: palette.offMarketAccent }}>Featured Film</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-8 lg:gap-16 items-end">
              <div>
                {FEATURED.location && (
                  <div className="flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3 h-3 text-white/40" />
                    <span className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-light">{FEATURED.location}</span>
                  </div>
                )}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extralight text-white leading-[1.15] mb-5" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
                  {FEATURED.title}
                </h1>
                <p className="text-[14px] sm:text-[15px] font-light leading-[1.8] max-w-xl" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {FEATURED.description}
                </p>
                <div className="flex items-center gap-5 mt-5 text-[11px] font-light" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <span>{FEATURED.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {FEATURED.duration}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {FEATURED.views}</span>
                </div>
              </div>

              {/* Play CTA */}
              <button
                onClick={() => setPlayingId(FEATURED.youtubeId)}
                className="group flex items-center gap-4 self-end cursor-pointer"
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 backdrop-blur-sm"
                  style={{ border: "1.5px solid rgba(201,169,110,0.4)", background: "rgba(201,169,110,0.06)" }}
                >
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1" style={{ color: palette.offMarketAccent }} fill="rgba(201,169,110,0.2)" />
                </div>
                <span className="hidden sm:block text-[11px] tracking-[0.2em] uppercase font-light transition-opacity group-hover:opacity-70" style={{ color: palette.offMarketAccent }}>
                  Play Film
                </span>
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Category Filters ═══ */}
      <section style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex gap-1 sm:gap-2 flex-wrap py-5 sm:py-6" style={{ borderBottom: `1px solid ${palette.border}` }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-[10px] sm:text-[11px] tracking-[0.14em] uppercase px-4 sm:px-5 py-2 transition-all duration-300 font-normal relative"
                style={{
                  color: activeCategory === cat ? palette.white : palette.textMuted,
                  background: activeCategory === cat ? palette.accent : "transparent",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Video Grid — Featured + 2-Column ═══ */}
      <section className="py-14 sm:py-20 md:py-28" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-sm font-light" style={{ color: palette.textMuted }}>No videos found in this category.</p>
            </div>
          ) : (
            <>
              {/* ── First video: Featured (full width) ── */}
              <FadeIn>
                <article className="group cursor-pointer mb-14 sm:mb-20" onClick={() => setPlayingId(filtered[0].youtubeId)}>
                  <div className="grid grid-cols-1 lg:grid-cols-[1.3fr,1fr] gap-6 lg:gap-10 items-center">
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={getThumb(filtered[0].youtubeId)}
                        alt={filtered[0].title}
                        className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center" style={{ background: "rgba(15,13,11,0.3)" }}>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
                          <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                        </div>
                      </div>
                      <span className="absolute bottom-3 right-3 text-[10px] text-white/90 font-medium px-2 py-0.5 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.5)" }}>
                        {filtered[0].duration}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <span className="text-[9px] tracking-[0.18em] uppercase font-medium px-2.5 py-1 inline-block" style={{ color: palette.accent, background: palette.bgAlt }}>
                        {filtered[0].category}
                      </span>
                      {filtered[0].location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" style={{ color: palette.textLight }} />
                          <span className="text-[11px] tracking-[0.12em] uppercase font-light" style={{ color: palette.textLight }}>{filtered[0].location}</span>
                        </div>
                      )}
                      <h3 className="text-xl sm:text-2xl font-extralight tracking-wide leading-snug group-hover:opacity-70 transition-opacity" style={{ fontFamily: fonts.heading, color: palette.text }}>
                        {filtered[0].title}
                      </h3>
                      <p className="text-[13px] sm:text-[14px] font-light leading-[1.7]" style={{ color: palette.textMuted }}>
                        {filtered[0].description}
                      </p>
                      <div className="flex items-center gap-5 pt-2 text-[11px] font-light" style={{ color: palette.textLight }}>
                        <span>{filtered[0].date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {filtered[0].duration}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {filtered[0].views}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeIn>

              {/* ── Rest: 2-column grid ── */}
              {filtered.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-12 lg:gap-y-16">
                  {filtered.slice(1).map((video, i) => (
                    <FadeIn key={video.id} delay={i * 0.06}>
                      <article className="group cursor-pointer" onClick={() => setPlayingId(video.youtubeId)}>
                        <div className="relative overflow-hidden aspect-[16/10] mb-5">
                          <img
                            src={getThumb(video.youtubeId)}
                            alt={video.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                          />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-600 flex items-center justify-center" style={{ background: "rgba(15,13,11,0.35)" }}>
                            <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform duration-500 scale-90 group-hover:scale-100" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
                              <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                            </div>
                          </div>
                          <span className="absolute bottom-2.5 right-2.5 text-[10px] text-white/90 font-medium px-2 py-0.5 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.5)" }}>
                            {video.duration}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] tracking-[0.18em] uppercase font-medium px-2.5 py-1" style={{ color: palette.accent, background: palette.bgAlt }}>
                              {video.category}
                            </span>
                            {video.location && (
                              <span className="flex items-center gap-1 text-[10px] tracking-[0.1em] uppercase font-light" style={{ color: palette.textLight }}>
                                <MapPin className="w-3 h-3" /> {video.location}
                              </span>
                            )}
                          </div>
                          <h3 className="text-[15px] sm:text-base font-light tracking-wide leading-snug group-hover:opacity-70 transition-opacity" style={{ fontFamily: fonts.heading, color: palette.text }}>
                            {video.title}
                          </h3>
                          <p className="text-[13px] font-light leading-[1.65] line-clamp-2" style={{ color: palette.textMuted }}>
                            {video.description}
                          </p>
                          <div className="flex items-center gap-4 pt-1 text-[11px] font-light" style={{ color: palette.textLight }}>
                            <span>{video.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {video.duration}</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {video.views}</span>
                          </div>
                        </div>
                      </article>
                    </FadeIn>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <section className="py-14 sm:py-20" style={{ background: palette.bg, borderTop: `1px solid ${palette.border}` }}>
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Stay Updated</p>
            <h2 className="text-2xl sm:text-3xl font-extralight mb-4" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
              Subscribe to Our Channel
            </h2>
            <p className="text-[14px] font-light leading-[1.8] mb-8" style={{ color: palette.textMuted }}>
              New cinematic property tours, market analysis and lifestyle content every week.
            </p>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase font-medium px-8 py-4 transition-all duration-300 hover:opacity-90"
              style={{ background: palette.accent, color: "#fff" }}
            >
              Visit YouTube <ArrowUpRight className="w-4 h-4" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Lightbox ═══ */}
      {playingId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-sm" onClick={() => setPlayingId(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10" onClick={() => setPlayingId(null)} aria-label="Close">
            <X className="w-7 h-7" />
          </button>
          <div className="w-full max-w-5xl aspect-video mx-4" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${playingId}?autoplay=1&rel=0&modestbranding=1`}
              title="Video"
              allow="autoplay; encrypted-media; fullscreen"
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
