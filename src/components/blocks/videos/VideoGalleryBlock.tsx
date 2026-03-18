import { useState } from "react";
import { Play, X } from "lucide-react";
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
  { id: "1", title: "The Art of Coastal Living", description: "Discover our exclusive beachfront portfolio on the Costa Blanca", youtubeId: "dQw4w9WgXcQ", category: "Lifestyle", date: "Mar 2026" },
  { id: "2", title: "Villa Blanca — Cinematic Tour", description: "A private walkthrough of this stunning 6-bedroom Jávea estate", youtubeId: "dQw4w9WgXcQ", category: "Property Tour", date: "Feb 2026" },
  { id: "3", title: "Market Insights Q1 2026", description: "Our analysts break down the luxury property market trends", youtubeId: "dQw4w9WgXcQ", category: "Market", date: "Jan 2026" },
  { id: "4", title: "Behind the Brand: Our Story", description: "How Prestige Estates became the trusted name in luxury real estate", youtubeId: "dQw4w9WgXcQ", category: "Company", date: "Dec 2025" },
  { id: "5", title: "Penthouse Living in Altea", description: "Explore the most exclusive penthouse on the Mediterranean coast", youtubeId: "dQw4w9WgXcQ", category: "Property Tour", date: "Nov 2025" },
  { id: "6", title: "Investment Guide: Costa Blanca", description: "Everything you need to know about investing in Spanish luxury real estate", youtubeId: "dQw4w9WgXcQ", category: "Market", date: "Oct 2025" },
];

function getYoutubeThumbnail(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

export default function VideoGalleryBlock({
  label = "Our Videos",
  title = "Watch & Explore",
  subtitle = "Property tours, market insights and lifestyle content from our team",
  videos = DEFAULT_VIDEOS,
  maxVisible = 4,
  showViewAll = true,
  viewAllHref = "/videos",
  viewAllText = "Ver Todos los Videos",
}: VideoGalleryBlockProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const visible = videos.slice(0, maxVisible);
  const featured = visible[0];
  const rest = visible.slice(1);

  return (
    <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>{label}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>{title}</h2>
            {subtitle && <p className="text-sm font-light mt-3 max-w-lg mx-auto" style={{ color: palette.textMuted }}>{subtitle}</p>}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Featured large video */}
            {featured && (
              <div className="lg:row-span-2">
                <VideoCard video={featured} large playingId={playingId} onPlay={setPlayingId} />
              </div>
            )}
            {/* Smaller grid */}
            {rest.map((v, i) => (
              <VideoCard key={v.id} video={v} playingId={playingId} onPlay={setPlayingId} />
            ))}
          </div>
        </FadeIn>

        {showViewAll && (
          <FadeIn delay={0.2}>
            <div className="text-center mt-10 sm:mt-14">
              <a
                href={viewAllHref}
                className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-normal px-8 py-3.5 transition-all duration-300 hover:opacity-80"
                style={{ border: `1px solid ${palette.accent}`, color: palette.accent }}
              >
                {viewAllText}
              </a>
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

function VideoCard({
  video,
  large,
  playingId,
  onPlay,
}: {
  video: VideoItem;
  large?: boolean;
  playingId: string | null;
  onPlay: (id: string) => void;
}) {
  const thumb = video.thumbnail || getYoutubeThumbnail(video.youtubeId);

  return (
    <button
      onClick={() => onPlay(video.youtubeId)}
      className="group relative overflow-hidden text-left w-full block"
      style={{ aspectRatio: large ? "16/10" : "16/9" }}
    >
      <img
        src={thumb}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.15) 100%)" }}
      />

      {/* Play icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
        >
          <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
        </div>
      </div>

      {/* Category badge */}
      {video.category && (
        <span
          className="absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-medium backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          {video.category}
        </span>
      )}

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <h3 className={`font-light text-white leading-tight mb-1 ${large ? "text-lg sm:text-xl" : "text-sm sm:text-base"}`} style={{ fontFamily: fonts.heading, letterSpacing: "0.02em" }}>
          {video.title}
        </h3>
        {video.description && large && (
          <p className="text-xs text-white/60 font-light line-clamp-2 mt-1">{video.description}</p>
        )}
        {video.date && (
          <span className="text-[10px] tracking-[0.1em] uppercase text-white/40 font-light mt-2 block">{video.date}</span>
        )}
      </div>
    </button>
  );
}
