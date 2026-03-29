import { useState, useEffect } from "react";
import { Play, X, Clock, Eye, ArrowUpRight, Film, MapPin } from "lucide-react";
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

const HERO_VIDEO: Video = {
  id: "hero",
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
  { id: "1", title: "Villa Blanca — Cinematic Tour", description: "A private walkthrough of this stunning 6-bedroom Jávea estate with infinity pool and panoramic Mediterranean views.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Feb 2026", duration: "6:15", views: "8.7K", location: "Jávea, Alicante" },
  { id: "2", title: "Penthouse Living in Altea", description: "Explore the most exclusive penthouse on the Mediterranean coast — 420m² of pure elegance above the sea.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Jan 2026", duration: "5:23", views: "9.3K", location: "Altea, Alicante" },
  { id: "3", title: "Market Insights Q1 2026", description: "Our analysts break down the luxury property market trends across Spain's prime coastal regions.", youtubeId: "dQw4w9WgXcQ", category: "Market Insights", date: "Jan 2026", duration: "12:08", views: "5.2K" },
  { id: "4", title: "Behind the Brand: Our Story", description: "How Prestige Estates became the most trusted name in luxury real estate on the Costa Blanca.", youtubeId: "dQw4w9WgXcQ", category: "Company", date: "Dec 2025", duration: "8:44", views: "15.1K" },
  { id: "5", title: "The Skyline Penthouse — Full Tour", description: "Step inside Manhattan's most coveted address. 5 bedrooms, 420m² of curated luxury above the city.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Nov 2025", duration: "7:32", views: "22.4K", location: "Manhattan, New York" },
  { id: "6", title: "Investment Guide: Costa Blanca", description: "Everything you need to know about investing in Spanish luxury real estate in 2026.", youtubeId: "dQw4w9WgXcQ", category: "Market Insights", date: "Oct 2025", duration: "15:30", views: "7.8K" },
  { id: "7", title: "Moraira: The Hidden Gem", description: "An in-depth area guide to one of Spain's best-kept secrets for luxury living.", youtubeId: "dQw4w9WgXcQ", category: "Area Guides", date: "Sep 2025", duration: "7:12", views: "6.1K", location: "Moraira, Alicante" },
  { id: "8", title: "Modern Villa in Benissa", description: "Step inside this architectural masterpiece perched above the Mediterranean, designed by award-winning studio.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Aug 2025", duration: "4:55", views: "11.2K", location: "Benissa, Alicante" },
  { id: "9", title: "Coastal Living: A Season in Review", description: "The highlights, trends and landmark sales that defined our 2025 season along the coast.", youtubeId: "dQw4w9WgXcQ", category: "Lifestyle", date: "Jul 2025", duration: "6:30", views: "18.9K" },
  { id: "10", title: "Jávea: Complete Area Guide", description: "Everything you need to know before buying property in this coveted coastal town.", youtubeId: "dQw4w9WgXcQ", category: "Area Guides", date: "Jun 2025", duration: "10:22", views: "8.4K", location: "Jávea, Alicante" },
  { id: "11", title: "Why Clients Choose Prestige", description: "Hear directly from our clients about their experience buying luxury property with us.", youtubeId: "dQw4w9WgXcQ", category: "Company", date: "May 2025", duration: "3:48", views: "4.5K" },
  { id: "12", title: "Alpine Glass Retreat Tour", description: "A cinematic exploration of this remarkable 7-bedroom mountain sanctuary in Zermatt.", youtubeId: "dQw4w9WgXcQ", category: "Property Tours", date: "Apr 2025", duration: "9:15", views: "13.6K", location: "Zermatt, Switzerland" },
];

const STATS = [
  { value: "85+", label: "Videos Published" },
  { value: "2.4M", label: "Total Views" },
  { value: "34K", label: "Subscribers" },
  { value: "Weekly", label: "New Content" },
];

function getThumb(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

/* ═══ Page ═══ */
export default function VideosPageV2() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroScale, setHeroScale] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setHeroScale(1.04), 100);
    return () => clearTimeout(timer);
  }, []);

  const filtered = VIDEOS.filter((v) => activeCategory === "All" || v.category === activeCategory);

  return (
    <Layout navVariant="transparent" activePath="/videos2" showBackToTop={false} showLanguage={true}>
      <SEOHead title={`Cinematic Videos — ${brand.name}`} description="Property tours, market analysis, area guides and behind-the-scenes cinematic content." />

      {/* ─── HERO — Full-screen featured video ─── */}
      <section className="relative h-[60vh] sm:h-[75vh] lg:h-[90vh] min-h-[420px] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt={HERO_VIDEO.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8s] ease-out"
          style={{ transform: `scale(${heroScale})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.75) 0%, rgba(26,23,20,0.15) 40%, rgba(26,23,20,0.25) 100%)" }} />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
          <FadeIn>
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.offMarketAccent }}>
              <Film className="w-3.5 h-3.5 inline-block mr-2 -mt-0.5" />
              Featured Film
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extralight leading-[1.15] mb-4 max-w-3xl" style={{ color: "#fff", fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
              {HERO_VIDEO.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-sm sm:text-[15px] font-light leading-relaxed max-w-xl mb-6 sm:mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              {HERO_VIDEO.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <button
                onClick={() => setPlayingId(HERO_VIDEO.youtubeId)}
                className="flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.15em] uppercase font-medium px-7 sm:px-8 py-3.5 transition-all duration-300 hover:opacity-90"
                style={{ background: "#fff", color: palette.text }}
              >
                <Play className="w-4 h-4" fill={palette.text} />
                Watch Film
              </button>
              <div className="flex items-center gap-5 text-[11px] sm:text-xs font-light" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {HERO_VIDEO.duration}</span>
                <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {HERO_VIDEO.views}</span>
                {HERO_VIDEO.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {HERO_VIDEO.location}</span>}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── STATS RIBBON ─── */}
      <section className="py-10 sm:py-14" style={{ background: palette.white, borderBottom: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
              {STATS.map((s, i) => (
                <div key={i} className="text-center" style={{ borderRight: i < 3 ? `1px solid ${palette.border}` : "none" }}>
                  <p className="text-3xl sm:text-4xl font-extralight" style={{ fontFamily: fonts.heading, color: palette.accent, letterSpacing: "0.04em" }}>{s.value}</p>
                  <p className="text-[10px] sm:text-xs tracking-[0.18em] uppercase mt-2 font-normal" style={{ color: palette.textLight }}>{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CATEGORY FILTERS ─── */}
      <section className="py-10 sm:py-14" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Our Channel</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Latest Videos</h2>
              </div>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60"
                style={{ color: palette.accent }}
              >
                Subscribe <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="flex gap-2 sm:gap-3 flex-wrap mt-8 sm:mt-10 pb-2" style={{ borderBottom: `1px solid ${palette.border}` }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-[10px] sm:text-[11px] tracking-[0.14em] uppercase px-4 sm:px-5 py-2.5 transition-all duration-300 font-normal relative"
                  style={{
                    color: activeCategory === cat ? palette.accent : palette.textMuted,
                    background: "transparent",
                  }}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-[2px]" style={{ background: palette.accent }} />
                  )}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── VIDEO GRID — Property-card style ─── */}
      <section className="pb-20 sm:pb-28 md:pb-36" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm font-light" style={{ color: palette.textMuted }}>No videos found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
              {filtered.map((video, i) => (
                <FadeIn key={video.id} delay={i * 0.06}>
                  <div className="group cursor-pointer">
                    {/* Thumbnail — cinematic aspect ratio */}
                    <button
                      onClick={() => setPlayingId(video.youtubeId)}
                      className="relative overflow-hidden w-full block aspect-[16/10]"
                    >
                      <img
                        src={getThumb(video.youtubeId)}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]"
                      />
                      {/* Hover overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center"
                        style={{ background: "rgba(26,23,20,0.35)" }}
                      >
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                          style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)" }}
                        >
                          <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                        </div>
                      </div>
                      {/* Duration */}
                      <span
                        className="absolute bottom-2.5 right-2.5 text-[10px] text-white/90 font-medium px-2 py-0.5 backdrop-blur-sm"
                        style={{ background: "rgba(0,0,0,0.55)" }}
                      >
                        {video.duration}
                      </span>
                      {/* Category badge */}
                      <span
                        className="absolute top-2.5 left-2.5 text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 font-medium backdrop-blur-sm"
                        style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}
                      >
                        {video.category}
                      </span>
                      {/* Bottom gradient */}
                      <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.5) 0%, transparent 100%)" }} />
                    </button>

                    {/* Card info — editorial style */}
                    <div className="pt-5 space-y-2">
                      {video.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" style={{ color: palette.textLight }} />
                          <p className="text-xs tracking-[0.12em] uppercase font-light" style={{ color: palette.textLight }}>{video.location}</p>
                        </div>
                      )}
                      <h3
                        className="text-[15px] sm:text-lg font-light tracking-wide leading-tight"
                        style={{ fontFamily: fonts.heading, color: palette.text }}
                        onClick={() => setPlayingId(video.youtubeId)}
                      >
                        {video.title}
                      </h3>
                      <p className="text-[13px] font-light leading-[1.55] line-clamp-2" style={{ color: palette.textMuted }}>
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

      {/* ─── NEWSLETTER / CTA ─── */}
      <section className="py-20 sm:py-28" style={{ background: palette.white, borderTop: `1px solid ${palette.border}` }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-6 text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Stay Updated</p>
            <h2 className="text-2xl sm:text-3xl font-extralight mb-4" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
              Never Miss a New Film
            </h2>
            <p className="text-sm font-light mb-8" style={{ color: palette.textMuted }}>
              Subscribe to our channel for weekly property tours, market analysis and lifestyle content from the Mediterranean coast.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-3.5 transition-all duration-300 hover:opacity-90"
                style={{ background: palette.accent, color: "#fff" }}
              >
                <Play className="w-4 h-4" fill="#fff" />
                Subscribe on YouTube
              </a>
            </div>
          </FadeIn>
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
