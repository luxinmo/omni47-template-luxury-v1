import { mockBlogPosts } from "@/data/mock-data";
import { ArrowUpRight } from "lucide-react";

interface JournalEditorialProps {
  sectionLabel?: string;
  title?: string;
  viewAllText?: string;
  viewAllHref?: string;
  posts?: { image: string; date: string; title: string; excerpt: string; href: string }[];
  accentColor?: string;
}

export default function JournalEditorial({
  sectionLabel = "Insights",
  title = "The Journal",
  viewAllText = "Todos los Artículos",
  viewAllHref = "#",
  posts = mockBlogPosts,
  accentColor = "#c9a96e",
}: JournalEditorialProps) {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-neutral-50">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="flex items-end justify-between mb-10 sm:mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ letterSpacing: "0.04em" }}>{title}</h2>
          </div>
          <a href={viewAllHref} className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: accentColor }}>
            {viewAllText} <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {posts[0] && (
            <div className="md:col-span-7">
              <a href={posts[0].href} className="group block">
                <div className="overflow-hidden aspect-[16/10]">
                  <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-105" />
                </div>
                <div className="pt-5 space-y-2">
                  <span className="text-xs tracking-[0.15em] uppercase font-light text-neutral-400">{posts[0].date}</span>
                  <h4 className="text-xl font-light leading-[1.35] group-hover:opacity-70 transition-opacity tracking-wide">{posts[0].title}</h4>
                  <p className="text-sm leading-[1.7] font-light text-neutral-400">{posts[0].excerpt}</p>
                </div>
              </a>
            </div>
          )}
          <div className="md:col-span-5 flex flex-col gap-6 lg:gap-8">
            {posts.slice(1).map((post, i) => (
              <a key={i} href={post.href} className="group flex gap-4">
                <div className="overflow-hidden aspect-square w-28 shrink-0">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs tracking-[0.15em] uppercase font-light text-neutral-400">{post.date}</span>
                  <h4 className="text-[15px] font-light leading-[1.4] group-hover:opacity-70 transition-opacity">{post.title}</h4>
                  <p className="text-sm leading-[1.5] font-light line-clamp-2 text-neutral-400">{post.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
