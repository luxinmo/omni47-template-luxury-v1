import React, { useState, useRef, useCallback } from "react";
import {
  ChevronLeft, ChevronRight, X, Grid3X3, Play, View, Share2,
  Heart, FileDown, Phone, MessageCircle, Mail,
} from "lucide-react";

import heroImg from "@/assets/luxury-hero.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";

interface DetailGalleryProps {
  images?: string[];
  title?: string;
  ref?: string;
  price?: string;
  hasVideo?: boolean;
  hasVirtualTour?: boolean;
  phone?: string;
  whatsapp?: string;
  brandName?: string;
  onEnquiry?: () => void;
}

const DEFAULTS = {
  images: [heroImg, detail1, detail2, detail3, prop1, prop2, prop3],
  title: "Luxury Villa for Sale in Santa Eulalia del Río, Ibiza",
  ref: "PE-IBZ-2847",
  price: "€4,650,000",
  hasVideo: true,
  hasVirtualTour: true,
  phone: "+34 600 123 456",
  whatsapp: "34600123456",
  brandName: "PRESTIGE ESTATES",
};

const DetailGallery: React.FC<DetailGalleryProps> = (props) => {
  const images = props.images ?? DEFAULTS.images;
  const title = props.title ?? DEFAULTS.title;
  const refCode = props.ref ?? DEFAULTS.ref;
  const price = props.price ?? DEFAULTS.price;
  const hasVideo = props.hasVideo ?? DEFAULTS.hasVideo;
  const hasVirtualTour = props.hasVirtualTour ?? DEFAULTS.hasVirtualTour;
  const phone = props.phone ?? DEFAULTS.phone;
  const whatsapp = props.whatsapp ?? DEFAULTS.whatsapp;
  const brandName = props.brandName ?? DEFAULTS.brandName;
  const onEnquiry = props.onEnquiry;

  const [heroSlide, setHeroSlide] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [gridView, setGridView] = useState(false);
  const [liked, setLiked] = useState(false);

  // Touch swipe
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) setHeroSlide((s) => Math.min(s + 1, images.length - 1));
      else setHeroSlide((s) => Math.max(s - 1, 0));
    }
    touchStart.current = null;
  }, [images.length]);

  // Lightbox swipe
  const lbTouch = useRef<{ x: number; y: number } | null>(null);
  const handleLbTouchStart = useCallback((e: React.TouchEvent) => {
    lbTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const handleLbTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!lbTouch.current) return;
    const dx = e.changedTouches[0].clientX - lbTouch.current.x;
    const dy = e.changedTouches[0].clientY - lbTouch.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) setLightbox((prev) => prev !== null ? Math.min(prev + 1, images.length) : null);
      else setLightbox((prev) => prev !== null ? Math.max(prev - 1, 0) : null);
    }
    lbTouch.current = null;
  }, [images.length]);

  return (
    <>
      {/* ═══ HERO GALLERY ═══ */}
      <section aria-label="Property photos">
        {/* Mobile swipeable */}
        <div className="lg:hidden relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${heroSlide * 100}%)` }}>
            {images.map((img, i) => (
              <div key={i} className="w-full shrink-0 aspect-[4/3] sm:aspect-[16/10]" onClick={() => setLightbox(i)}>
                <img src={img} alt={`${title} — photo ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-[12px] font-medium px-3 py-1 rounded-full">
            {heroSlide + 1} / {images.length}
          </div>
        </div>

        {/* Mobile actions bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-neutral-100">
          <div className="flex items-center gap-3.5">
            {hasVideo && (
              <button className="flex items-center gap-1.5 text-[13px] text-neutral-700 font-medium">
                <Play className="w-4 h-4" /> Video
              </button>
            )}
            <button className="flex items-center gap-1.5 text-[13px] text-neutral-700 font-medium">
              <FileDown className="w-4 h-4" /> PDF
            </button>
          </div>
          <div className="flex items-center gap-3.5">
            <button className="text-neutral-500 hover:text-neutral-900 transition-colors" aria-label="Share">
              <Share2 className="w-[18px] h-[18px]" />
            </button>
            <button onClick={() => setLiked(!liked)} className={`transition-colors ${liked ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"}`} aria-label={liked ? "Unsave" : "Save"}>
              <Heart className="w-[18px] h-[18px]" fill={liked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Desktop mosaic */}
        <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-1.5 h-[620px]">
          <div className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(0)}>
            <img src={images[0]} alt={title} loading="eager" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <span className="text-[11px] tracking-[0.2em] font-medium text-neutral-900 uppercase">{brandName}</span>
            </div>
          </div>
          {images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative overflow-hidden cursor-pointer group" onClick={() => setLightbox(i + 1)}>
              <img src={img} alt={`${title} — ${i + 2}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {i === 1 && (
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-neutral-900 text-[12px] font-medium px-3.5 py-2 rounded-full shadow-sm hover:bg-white transition-all">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} className={`flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-full shadow-sm transition-all ${liked ? "bg-neutral-900 text-white" : "bg-white/90 backdrop-blur-sm text-neutral-900 hover:bg-white"}`}>
                    <Heart className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} /> Save
                  </button>
                </div>
              )}
              {i === 2 && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  {hasVideo && (
                    <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-neutral-900 text-[12px] font-medium px-3 py-2 rounded-full shadow-sm hover:bg-white transition-all">
                      <Play className="w-3.5 h-3.5" /> Video
                    </button>
                  )}
                  {hasVirtualTour && (
                    <button onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-neutral-900 text-[12px] font-medium px-3 py-2 rounded-full shadow-sm hover:bg-white transition-all">
                      <View className="w-3.5 h-3.5" /> 3D Tour
                    </button>
                  )}
                </div>
              )}
              {i === 3 && (
                <button onClick={(e) => { e.stopPropagation(); setGridView(true); }} className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-neutral-900 text-[13px] font-medium px-4 py-2.5 rounded-lg shadow-md hover:bg-white transition-all">
                  <Grid3X3 className="w-4 h-4" /> Show all photos
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FULLSCREEN LIGHTBOX ═══ */}
      {lightbox !== null && !gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col" role="dialog" aria-label="Photo gallery">
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <span className="text-white/50 text-[13px] font-light">
              {lightbox < images.length ? `${lightbox + 1} / ${images.length}` : "Contact"}
            </span>
            <div className="flex items-center gap-3">
              <button onClick={() => setGridView(true)} className="text-white/50 hover:text-white transition-colors"><Grid3X3 className="w-5 h-5" /></button>
              <button onClick={() => setLightbox(null)} className="text-white/50 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
            </div>
          </div>

          <div className="flex-1 relative flex items-center justify-center min-h-0" onTouchStart={handleLbTouchStart} onTouchEnd={handleLbTouchEnd}>
            {lightbox < images.length ? (
              <>
                <div className="hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 cursor-w-resize" onClick={() => setLightbox(Math.max(lightbox - 1, 0))} />
                <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 cursor-e-resize" onClick={() => setLightbox(lightbox + 1)} />
                {lightbox > 0 && (
                  <button onClick={() => setLightbox(lightbox - 1)} className="hidden lg:flex absolute left-4 z-20 text-white/30 hover:text-white transition-colors"><ChevronLeft className="w-8 h-8" strokeWidth={1} /></button>
                )}
                <img src={images[lightbox]} alt={`${title} — photo ${lightbox + 1}`} className="max-w-[90vw] max-h-full object-contain relative z-0" />
                <button onClick={() => setLightbox(lightbox + 1)} className="hidden lg:flex absolute right-4 z-20 text-white/30 hover:text-white transition-colors"><ChevronRight className="w-8 h-8" strokeWidth={1} /></button>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={images[0]} alt="" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30" />
                <div className="relative z-10 text-center px-6 max-w-lg">
                  <h3 className="text-[22px] sm:text-[28px] font-light text-white tracking-[0.04em] uppercase mb-2 leading-tight">{title}</h3>
                  <p className="text-[13px] text-white/35 font-mono tracking-[0.05em] mb-2">REF-{refCode}</p>
                  <p className="text-[24px] font-light text-white/90 mb-8">{price}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href={`tel:${phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-neutral-900 text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-white/90 transition-all">
                      <Phone className="w-3.5 h-3.5" /> Call
                    </a>
                    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-[#22bf5b] transition-all">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                    <button onClick={() => { setLightbox(null); onEnquiry?.(); }} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-white/10 transition-all">
                      <Mail className="w-3.5 h-3.5" /> Enquiry
                    </button>
                  </div>
                  <button onClick={() => setLightbox(lightbox - 1)} className="mt-8 text-white/30 hover:text-white/60 text-[12px] tracking-[0.1em] uppercase transition-colors flex items-center gap-1 mx-auto">
                    <ChevronLeft className="w-3.5 h-3.5" /> Back to photos
                  </button>
                </div>
              </div>
            )}
          </div>

          {lightbox < images.length && (
            <div className="shrink-0 px-2 py-3 flex gap-1.5 overflow-x-auto justify-center">
              {images.map((img, i) => (
                <button key={i} onClick={() => setLightbox(i)} className={`w-[56px] h-[40px] shrink-0 overflow-hidden transition-all ${i === lightbox ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-70"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ GRID VIEW ═══ */}
      {gridView && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col overflow-y-auto" role="dialog" aria-label="All photos">
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-sm shrink-0">
            <span className="text-white/50 text-[13px] font-light">{images.length} Photos</span>
            <button onClick={() => setGridView(false)} className="text-white/50 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 p-2 sm:p-4">
            {images.map((img, i) => (
              <button key={i} onClick={() => { setGridView(false); setLightbox(i); }} className="relative aspect-[4/3] overflow-hidden group">
                <img src={img} alt={`${title} — photo ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <span className="absolute bottom-2 left-2 text-white/70 text-[11px] font-light">{i + 1}</span>
              </button>
            ))}
          </div>
          <div className="px-4 sm:px-8 py-10 text-center shrink-0">
            <h3 className="text-[18px] sm:text-[22px] font-light text-white/90 tracking-[0.04em] uppercase mb-2">{title}</h3>
            <p className="text-[13px] text-white/40 font-mono tracking-[0.05em] mb-6">REF-{refCode}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a href={`tel:${phone}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-neutral-900 text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-white/90 transition-all">
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-[#22bf5b] transition-all">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <button onClick={() => { setGridView(false); onEnquiry?.(); }} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/30 text-white text-[12px] tracking-[0.1em] uppercase px-8 py-3 hover:bg-white/10 transition-all">
                <Mail className="w-3.5 h-3.5" /> Enquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailGallery;
