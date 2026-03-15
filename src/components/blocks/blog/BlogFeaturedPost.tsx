import { ArrowRight } from "lucide-react";

interface BlogFeaturedPostProps {
  image?: string;
  category?: string;
  date?: string;
  readTime?: number;
  title?: string;
  excerpt?: string;
  author?: string;
  href?: string;
  accentColor?: string;
}

export default function BlogFeaturedPost({
  image = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  category = "Lifestyle",
  date = "26 Feb 2026",
  readTime = 8,
  title = "An Insider's Guide to Coastal Living in the Mediterranean",
  excerpt = "The Mediterranean coast has evolved from a seasonal destination into a strategic lifestyle hub for international buyers seeking year-round luxury.",
  author = "Alexandra Morel",
  href = "#",
  accentColor = "#8b6f47",
}: BlogFeaturedPostProps) {
  return (
    <div className="pb-12 md:pb-16 border-b border-[#e8e4df]">
      <a href={href} className="group block">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div className="relative overflow-hidden aspect-[4/3]">
            <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[9px] tracking-[0.18em] uppercase font-medium px-3 py-1 bg-[#2C2825] text-white">Featured</span>
              <span className="text-[10px] tracking-[0.18em] uppercase font-medium text-[#b0aaa3]">{category}</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-[2.2rem] font-extralight tracking-[0.02em] leading-[1.2] group-hover:opacity-70 transition-opacity duration-300 text-[#2C2825]">
              {title}
            </h2>
            <p className="text-[13.5px] font-light mt-4 leading-[1.8] line-clamp-3 lg:line-clamp-4 text-[#8a8580]">{excerpt}</p>
            <div className="flex items-center gap-3 mt-6 text-[11px] font-light text-[#b0aaa3]">
              <span>{author}</span>
              <span className="w-[3px] h-[3px] rounded-full bg-[#e8e4df]" />
              <span>{date}</span>
              <span className="w-[3px] h-[3px] rounded-full bg-[#e8e4df]" />
              <span>{readTime} min read</span>
            </div>
            <div className="mt-7">
              <span className="text-[11px] tracking-[0.15em] uppercase font-medium inline-flex items-center gap-2 pb-0.5 group-hover:opacity-70 transition-opacity duration-300" style={{ color: accentColor, borderBottom: `1px solid ${accentColor}40` }}>
                Read More <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
