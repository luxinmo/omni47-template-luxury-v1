/**
 * PROPERTY STORIES
 * Instagram-style story circles for property highlights.
 * Each circle represents a category (trending, best €/m², beachfront, new listing, etc.)
 * Clicking opens a fullscreen story viewer with property cards.
 */

import { useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Bed, Maximize, TrendingUp, Waves, Sparkles, BarChart3, Eye } from "lucide-react";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";
import detail2 from "@/assets/property-detail-2.jpg";
import detail3 from "@/assets/property-detail-3.jpg";

interface StoryProperty {
  id: number;
  image: string;
  location: string;
  title: string;
  price: string;
  beds: number;
  sqm: number;
  reason: string;
}

interface StoryGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  coverImage: string;
  gradient: string;
  properties: StoryProperty[];
  viewed?: boolean;
}

const STORY_GROUPS: StoryGroup[] = [
  {
    id: "trending",
    label: "Trending",
    icon: <TrendingUp className="w-4 h-4" />,
    coverImage: heroImg,
    gradient: "from-rose-500 via-orange-500 to-amber-400",
    properties: [
      { id: 1, image: heroImg, location: "Santa Eulalia · Ibiza", title: "Contemporary Villa with Sea Views", price: "€4,650,000", beds: 5, sqm: 420, reason: "324 views this week" },
      { id: 2, image: prop1, location: "Marina Botafoch · Ibiza", title: "Luxury Penthouse with Harbour Views", price: "€3,100,000", beds: 3, sqm: 210, reason: "278 views this week" },
      { id: 6, image: detail2, location: "Jávea · Costa Blanca", title: "Frontline Golf Estate", price: "€3,750,000", beds: 5, sqm: 520, reason: "195 views this week" },
    ],
  },
  {
    id: "best-value",
    label: "Best €/m²",
    icon: <BarChart3 className="w-4 h-4" />,
    coverImage: detail1,
    gradient: "from-emerald-500 via-teal-500 to-cyan-400",
    properties: [
      { id: 5, image: detail1, location: "Sant Antoni · Ibiza", title: "Modern Ibiza-Style Flat", price: "€530,000", beds: 1, sqm: 70, reason: "€7,571/m² — 22% below area avg" },
      { id: 4, image: prop3, location: "Altea · Costa Blanca", title: "Modern Villa with Infinity Pool", price: "€2,950,000", beds: 4, sqm: 350, reason: "€8,429/m² — 15% below area avg" },
      { id: 2, image: prop1, location: "Marina Botafoch · Ibiza", title: "Luxury Penthouse", price: "€3,100,000", beds: 3, sqm: 210, reason: "€14,762/m² — 10% below area avg" },
    ],
  },
  {
    id: "beachfront",
    label: "1ª Línea",
    icon: <Waves className="w-4 h-4" />,
    coverImage: prop2,
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    properties: [
      { id: 1, image: heroImg, location: "Santa Eulalia · Ibiza", title: "Contemporary Villa — Beachfront", price: "€4,650,000", beds: 5, sqm: 420, reason: "Direct beach access · 50m to shore" },
      { id: 6, image: detail2, location: "Jávea · Costa Blanca", title: "Frontline Estate", price: "€3,750,000", beds: 5, sqm: 520, reason: "First line · Unobstructed sea views" },
      { id: 4, image: prop3, location: "Altea · Costa Blanca", title: "Mediterranean View Villa", price: "€2,950,000", beds: 4, sqm: 350, reason: "Elevated beachfront · Panoramic views" },
    ],
  },
  {
    id: "new-listing",
    label: "New Listing",
    icon: <Sparkles className="w-4 h-4" />,
    coverImage: prop3,
    gradient: "from-fuchsia-500 via-pink-500 to-rose-400",
    properties: [
      { id: 3, image: prop2, location: "San José · Ibiza", title: "Traditional Finca with Pool", price: "€5,800,000", beds: 6, sqm: 480, reason: "Listed 2 days ago" },
      { id: 5, image: detail1, location: "Sant Antoni · Ibiza", title: "Modern Flat with Terrace", price: "€530,000", beds: 1, sqm: 70, reason: "Listed 3 days ago" },
      { id: 4, image: prop3, location: "Altea · Costa Blanca", title: "Villa with Infinity Pool", price: "€2,950,000", beds: 4, sqm: 350, reason: "Listed 5 days ago" },
    ],
  },
  {
    id: "most-saved",
    label: "Most Saved",
    icon: <Eye className="w-4 h-4" />,
    coverImage: detail3,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    properties: [
      { id: 3, image: prop2, location: "San José · Ibiza", title: "Traditional Finca Restored", price: "€5,800,000", beds: 6, sqm: 480, reason: "Saved 89 times this month" },
      { id: 1, image: heroImg, location: "Santa Eulalia · Ibiza", title: "Contemporary Sea View Villa", price: "€4,650,000", beds: 5, sqm: 420, reason: "Saved 76 times this month" },
      { id: 6, image: detail2, location: "Jávea · Costa Blanca", title: "Golf Estate with Views", price: "€3,750,000", beds: 5, sqm: 520, reason: "Saved 64 times this month" },
    ],
  },
];

/* ─── Story Viewer (fullscreen) ─── */
const StoryViewer = ({
  groups,
  initialGroupIndex,
  onClose,
  onMarkViewed,
}: {
  groups: StoryGroup[];
  initialGroupIndex: number;
  onClose: () => void;
  onMarkViewed: (id: string) => void;
}) => {
  const [groupIdx, setGroupIdx] = useState(initialGroupIndex);
  const [propIdx, setPropIdx] = useState(0);
  const group = groups[groupIdx];
  const property = group.properties[propIdx];
  const total = group.properties.length;

  const goNext = () => {
    if (propIdx < total - 1) {
      setPropIdx(propIdx + 1);
    } else if (groupIdx < groups.length - 1) {
      onMarkViewed(group.id);
      setGroupIdx(groupIdx + 1);
      setPropIdx(0);
    } else {
      onMarkViewed(group.id);
      onClose();
    }
  };

  const goPrev = () => {
    if (propIdx > 0) {
      setPropIdx(propIdx - 1);
    } else if (groupIdx > 0) {
      setGroupIdx(groupIdx - 1);
      setPropIdx(groups[groupIdx - 1].properties.length - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] bg-black flex items-center justify-center">
      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4 z-50 text-white/80 hover:text-white">
        <X className="w-6 h-6" />
      </button>

      {/* Background image */}
      <img
        src={property.image}
        alt={property.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

      {/* Progress bars */}
      <div className="absolute top-3 left-3 right-3 flex gap-1 z-50">
        {group.properties.map((_, i) => (
          <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/25">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                i < propIdx ? "bg-white w-full" : i === propIdx ? "bg-white w-full" : "w-0"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Header: group info */}
      <div className="absolute top-8 left-3 right-12 flex items-center gap-2.5 z-50">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${group.gradient} flex items-center justify-center text-white`}>
          {group.icon}
        </div>
        <span className="text-white text-[14px] font-medium">{group.label}</span>
        <span className="text-white/50 text-[12px]">{propIdx + 1}/{total}</span>
      </div>

      {/* Tap zones */}
      <button onClick={goPrev} className="absolute left-0 top-0 w-1/3 h-full z-40" />
      <button onClick={goNext} className="absolute right-0 top-0 w-2/3 h-full z-40" />

      {/* Property info card */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 z-40">
        {/* Reason badge */}
        <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white text-[12px] font-medium px-3 py-1.5 rounded-full mb-3">
          {group.icon}
          <span>{property.reason}</span>
        </div>

        <p className="text-white/70 text-[13px] tracking-[0.12em] uppercase mb-1">
          <MapPin className="w-3 h-3 inline mr-1" />
          {property.location}
        </p>
        <h3 className="text-white text-[20px] font-medium leading-tight mb-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-4 mb-3">
          <span className="text-white/70 text-[13px] flex items-center gap-1">
            <Bed className="w-3.5 h-3.5" /> {property.beds} beds
          </span>
          <span className="text-white/70 text-[13px] flex items-center gap-1">
            <Maximize className="w-3.5 h-3.5" /> {property.sqm} m²
          </span>
        </div>

        <p className="text-white text-[22px] font-semibold tracking-tight mb-3">
          {property.price}
        </p>

        <a
          href={`/property/${property.id}`}
          onClick={(e) => e.stopPropagation()}
          className="block w-full text-center bg-white text-luxury-black text-[14px] font-medium py-3 rounded-lg hover:bg-white/90 transition-colors relative z-50"
        >
          View Property
        </a>
      </div>
    </div>
  );
};

/* ─── Main Stories Strip ─── */
const PropertyStories = () => {
  const [viewedGroups, setViewedGroups] = useState<Set<string>>(new Set());
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const markViewed = (id: string) => {
    setViewedGroups((prev) => new Set(prev).add(id));
  };

  const openStory = (index: number) => {
    setActiveStory(index);
  };

  return (
    <>
      {/* Horizontally scrollable strip */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 py-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {STORY_GROUPS.map((group, idx) => {
          const isViewed = viewedGroups.has(group.id);
          return (
            <button
              key={group.id}
              onClick={() => openStory(idx)}
              className="flex flex-col items-center gap-1.5 shrink-0"
            >
              {/* Ring + avatar */}
              <div
                className={`w-[68px] h-[68px] rounded-full p-[3px] ${
                  isViewed
                    ? "bg-neutral-300"
                    : `bg-gradient-to-br ${group.gradient}`
                }`}
              >
                <div className="w-full h-full rounded-full border-[2.5px] border-white overflow-hidden">
                  <img
                    src={group.coverImage}
                    alt={group.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span
                className={`text-[11px] max-w-[72px] truncate ${
                  isViewed ? "text-luxury-black/40 font-normal" : "text-luxury-black/80 font-medium"
                }`}
              >
                {group.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Story viewer */}
      {activeStory !== null && (
        <StoryViewer
          groups={STORY_GROUPS}
          initialGroupIndex={activeStory}
          onClose={() => setActiveStory(null)}
          onMarkViewed={markViewed}
        />
      )}
    </>
  );
};

export default PropertyStories;
