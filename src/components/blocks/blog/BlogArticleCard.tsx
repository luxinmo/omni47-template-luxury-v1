import { ArrowRight } from "lucide-react";

interface BlogArticleCardProps {
  image?: string;
  category?: string;
  date?: string;
  readTime?: number;
  title?: string;
  excerpt?: string;
  author?: string;
  href?: string;
}

export default function BlogArticleCard({
  image = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  category = "Lifestyle",
  date = "26 Feb 2026",
  readTime = 8,
  title = "An Insider's Guide to Coastal Living in the Mediterranean",
  excerpt = "The Mediterranean coast has evolved from a seasonal destination into a strategic lifestyle hub for international buyers.",
  author = "Alexandra Morel",
  href = "#",
}: BlogArticleCardProps) {
  return (
    <a href={href} className="group block">
      <div className="relative overflow-hidden aspect-[16/10]">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-3 left-3">
          <span className="backdrop-blur-sm text-[9px] tracking-[0.15em] uppercase font-medium px-2.5 py-1 bg-white/90 text-[#2C2825]">
            {category}
          </span>
        </div>
      </div>
      <div className="pt-4 space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-light text-[#b0aaa3]">
          <span>{date}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-[#e8e4df]" />
          <span>{readTime} min read</span>
        </div>
        <h3 className="text-[15px] md:text-[16px] font-normal leading-[1.35] group-hover:opacity-70 transition-opacity duration-300 line-clamp-2 text-[#2C2825]">
          {title}
        </h3>
        <p className="text-[12px] font-light leading-relaxed line-clamp-2 text-[#8a8580]">{excerpt}</p>
        <p className="text-[11px] font-light pt-1 text-[#b0aaa3]">{author}</p>
      </div>
    </a>
  );
}
