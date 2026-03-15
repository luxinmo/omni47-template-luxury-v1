/**
 * PROJECT GALLERY MOSAIC
 * 4-col mosaic grid (1 large + 4 small) with optional ROI badge.
 * Mobile: swipeable carousel with counter.
 * Origin: BrandedResidenceDetailPage, NewDevelopmentDetailPage
 */

import { useState, useRef, useCallback } from "react";
import { Grid3X3, ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "@/assets/luxury-property-1.jpg";
import img2 from "@/assets/property-detail-1.jpg";
import img3 from "@/assets/property-detail-2.jpg";
import img4 from "@/assets/property-detail-3.jpg";
import img5 from "@/assets/luxury-property-2.jpg";

interface ProjectGalleryMosaicProps {
  images?: string[];
  projectName?: string;
  estimatedROI?: string;
  onImageClick?: (index: number) => void;
}

const ProjectGalleryMosaic = ({
  images = [img1, img2, img3, img4, img5],
  projectName = "Luxury Development",
  estimatedROI,
  onImageClick,
}: ProjectGalleryMosaicProps) => {
  const [heroSlide, setHeroSlide] = useState(0);
  const touchStart = useRef<{ x: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    if (Math.abs(dx) > 50) {
      if (dx < 0) setHeroSlide((s) => Math.min(s + 1, images.length - 1));
      else setHeroSlide((s) => Math.max(s - 1, 0));
    }
    touchStart.current = null;
  }, [images.length]);

  const handleClick = (i: number) => onImageClick?.(i);

  return (
    <section aria-label="Project photos">
      {/* Mobile carousel */}
      <div className="lg:hidden relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${heroSlide * 100}%)` }}>
          {images.map((img, i) => (
            <div key={i} className="w-full shrink-0 aspect-[4/3] sm:aspect-[16/10] cursor-pointer" onClick={() => handleClick(i)}>
              <img src={img} alt={`${projectName} — photo ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-[12px] font-medium px-3 py-1 rounded-full">
          {heroSlide + 1} / {images.length}
        </div>
        {estimatedROI && (
          <div className="absolute bottom-3 left-4 z-20 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-sm">
            <p className="text-[8px] tracking-[0.2em] uppercase font-medium text-white/60 mb-0.5">Est. ROI</p>
            <p className="text-sm font-light text-white">{estimatedROI}</p>
          </div>
        )}
      </div>

      {/* Desktop mosaic */}
      <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-1.5 h-[620px]">
        <div className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group" onClick={() => handleClick(0)}>
          <img src={images[0]} alt={projectName} loading="eager" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          {estimatedROI && (
            <div className="absolute bottom-4 left-4 z-20 px-4 py-3 bg-black/50 backdrop-blur-sm rounded-sm">
              <p className="text-[9px] tracking-[0.2em] uppercase font-medium text-white/60 mb-0.5">Est. ROI</p>
              <p className="text-lg font-light text-white">{estimatedROI}</p>
            </div>
          )}
        </div>
        {images.slice(1, 5).map((img, i) => (
          <div key={i} className="relative overflow-hidden cursor-pointer group" onClick={() => handleClick(i + 1)}>
            <img src={img} alt={`${projectName} — photo ${i + 2}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectGalleryMosaic;
