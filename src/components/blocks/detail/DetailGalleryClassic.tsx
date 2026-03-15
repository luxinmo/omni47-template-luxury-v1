import React, { useState } from "react";
import {
  ChevronLeft, ChevronRight, Play, View, Share2, Heart,
  FileDown, Grid3X3, X, Phone, MessageCircle, Mail,
} from "lucide-react";

import heroImg from "@/assets/luxury-hero.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";

interface DetailGalleryClassicProps {
  images?: string[];
  title?: string;
  hasVideo?: boolean;
  hasVirtualTour?: boolean;
  brandName?: string;
}

/**
 * DetailGalleryClassic — V2 layout: large main image (7 cols) + thumbnail strip below.
 * Different from the V6 mosaic 4-column grid.
 */
const DetailGalleryClassic: React.FC<DetailGalleryClassicProps> = ({
  images = [heroImg, detail1, detail2, detail3, prop1, prop2, prop3],
  title = "Stunning Contemporary Villa with Panoramic Sea Views",
  hasVideo = true,
  hasVirtualTour = true,
  brandName = "PRESTIGE ESTATES",
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Main image */}
        <div className="col-span-12 lg:col-span-7">
          <div className="relative overflow-hidden aspect-[16/10] bg-neutral-100 cursor-pointer group">
            <img src={images[currentImage]} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />

            {/* Video / 3D Tour badges */}
            <div className="absolute bottom-3 right-3 flex gap-1.5">
              {hasVideo && (
                <button className="flex items-center gap-1 bg-neutral-900/60 backdrop-blur-sm text-white text-[11px] tracking-[0.1em] uppercase px-3 py-1.5">
                  <Play className="w-3 h-3" fill="currentColor" /> Video
                </button>
              )}
              {hasVirtualTour && (
                <button className="flex items-center gap-1 bg-neutral-900/60 backdrop-blur-sm text-white text-[11px] tracking-[0.1em] uppercase px-3 py-1.5">
                  <View className="w-3 h-3" /> 360°
                </button>
              )}
            </div>

            {/* Counter */}
            <span className="absolute bottom-3 left-3 bg-neutral-900/60 text-white text-[12px] px-2 py-1 font-light">
              {currentImage + 1}/{images.length}
            </span>

            {/* Nav arrows */}
            <button
              onClick={() => setCurrentImage((currentImage - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentImage((currentImage + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Share / Save */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-neutral-900 text-[12px] font-medium px-3.5 py-2 rounded-full shadow-sm">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-2 rounded-full shadow-sm ${liked ? "bg-neutral-900 text-white" : "bg-white/90 text-neutral-900"}`}
              >
                <Heart className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} /> Save
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-1.5 mt-1.5 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`shrink-0 w-[72px] h-[52px] overflow-hidden transition-all ${i === currentImage ? "ring-2 ring-neutral-900 opacity-100" : "opacity-50 hover:opacity-80"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right side placeholder (for price card in context) */}
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-6 h-full flex items-center justify-center text-neutral-400 text-[13px] font-light">
            <Grid3X3 className="w-5 h-5 mr-2 text-neutral-300" /> Price Card / Summary area
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailGalleryClassic;
