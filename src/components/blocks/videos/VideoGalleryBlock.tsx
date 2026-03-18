import { useState } from "react";
import { Play, X, Clock, Eye, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/shared/FadeIn";
import { palette, fonts } from "@/config/template";

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  youtubeId: string;
  thumbnail?: string;
  category?: string;
  date?: string;
  duration?: string;
  views?: string;
}

interface VideoGalleryBlockProps {
  label?: string;
  title?: string;
  subtitle?: string;
  videos?: VideoItem[];
  maxVisible?: number;
  showViewAll?: boolean;
  viewAllHref?: string;
  viewAllText?: string;
}

const DEFAULT_VIDEOS: VideoItem[] = [
  { id: "1", title: "The Art of Coastal Living", description: "Discover our exclusive beachfront portfolio on the Costa Blanca — from Jávea's hidden coves to Altea's panoramic clifftops.", youtubeId: "dQw4w9WgXcQ", category: "Lifestyle", date: "Mar 2026", duration: "4:32", views: "12.4K" },
  { id: "2", title: "Villa Blanca — Cinematic Tour", description: "A private walkthrough of this stunning 6-bedroom Jávea estate with infinity pool and Mediterranean views.", youtubeId: "dQw4w9WgXcQ", category: "Property Tour", date: "Feb 2026", duration: "6:15", views: "8.7K" },
  { id: "3", title: "Market Insights Q1 2026", description: "Our analysts break down the luxury property market trends across Spain's prime coastal regions.", youtubeId: "dQw4w9WgXcQ", category: "Market", date: "Jan 2026", duration: "12:08", views: "5.2K" },
  { id: "4", title: "Behind the Brand: Our Story", description: "How Prestige Estates became the trusted name in luxury real estate on the Costa Blanca.", youtubeId: "dQw4w9WgXcQ", category: "Company", date: "Dec 2025", duration: "8:44", views: "15.1K" },
];

function getYoutubeThumbnail(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

export default function VideoGalleryBlock({
  label = "Our Channel",
  title = "Latest Videos",
  subtitle = "Property tours, market insights and lifestyle content from our team",
  videos = DEFAULT_VIDEOS,
  maxVisible = 4,
  showViewAll = true,
  viewAllHref = "/videos",
  viewAllText = "View All Videos",
}: VideoGalleryBlockProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const visible = videos.slice(0, maxVisible);

  return (
    <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <FadeIn>
          <div className="flex items-end justify-between mb-12 sm:mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>{label}</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>{title}</h2>
              {subtitle && <p className="text-sm font-light mt-3 max-w-lg" style={{ color: palette.textMuted }}>{subtitle}</p>}
            </div>
            {showViewAll && (
              <Link to={viewAllHref} className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                {viewAllText} <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {visible.map((video, i) => (
            <FadeIn key={video.id} delay={i * 0.08}>
              <div className="group">
                {/* Thumbnail */}
                <button
                  onClick={() => setPlayingId(video.youtubeId)}
                  className="relative overflow-hidden w-full block aspect-[16/10]"
                >
                  <img
                    src={video.thumbnail || getYoutubeThumbnail(video.youtubeId)}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 50%)" }} />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 backdrop-blur-sm"
                      style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)" }}
                    >
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  {video.duration && (
                    <span className="absolute bottom-2.5 right-2.5 text-[10px] text-white/90 font-medium px-2 py-0.5 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.55)" }}>
                      {video.duration}
                    </span>
                  )}
                  {/* Category */}
                  {video.category && (
                    <span className="absolute top-2.5 left-2.5 text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 font-medium backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.25)" }}>
                      {video.category}
                    </span>
                  )}
                </button>

                {/* Card info — property-card style */}
                <div className="pt-4 space-y-2">
                  <h3 className="text-[15px] font-light tracking-wide leading-tight" style={{ fontFamily: fonts.heading, color: palette.text }}>
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-[13px] font-light leading-[1.55] line-clamp-2" style={{ color: palette.textMuted }}>
                      {video.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 pt-1 text-[12px] font-light" style={{ color: palette.textLight }}>
                    {video.date && <span>{video.date}</span>}
                    {video.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {video.duration}
                      </span>
                    )}
                    {video.views && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {video.views}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {showViewAll && (
          <FadeIn delay={0.2}>
            <div className="text-center mt-10 sm:mt-14 sm:hidden">
              <Link
                to={viewAllHref}
                className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-normal px-8 py-3.5 transition-all duration-300 hover:opacity-80"
                style={{ border: `1px solid ${palette.accent}`, color: palette.accent }}
              >
                {viewAllText}
              </Link>
            </div>
          </FadeIn>
        )}
      </div>

      {/* Lightbox */}
      {playingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm" onClick={() => setPlayingId(null)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors z-10" onClick={() => setPlayingId(null)}>
            <X className="w-7 h-7" />
          </button>
          <div className="w-full max-w-4xl aspect-video mx-4" onClick={(e) => e.stopPropagation()}>
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
    </section>
  );
}
