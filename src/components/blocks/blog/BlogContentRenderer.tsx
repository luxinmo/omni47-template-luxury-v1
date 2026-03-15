/**
 * BLOG CONTENT RENDERER
 * Article body with styled HTML content, tags, and author box.
 * Origin: BlogDetailPage
 */

import { Tag, User } from "lucide-react";

interface BlogContentRendererProps {
  content?: string;
  tags?: string[];
  authorName?: string;
  authorRole?: string;
}

const defaultContent = `
  <p>The Mediterranean coast has evolved from a seasonal destination into a strategic lifestyle hub for international buyers seeking year-round luxury.</p>
  <h2>A New Era of Coastal Living</h2>
  <p>From Ibiza's bohemian energy to the Costa Blanca's understated elegance, discerning buyers are making the move to these sun-drenched shores for reasons that go far beyond holiday homes.</p>
  <h2>Investment Potential</h2>
  <p>Properties in prime Mediterranean locations have shown consistent appreciation of 8–12% annually over the past decade, outperforming many traditional investment vehicles.</p>
`;

const BlogContentRenderer = ({
  content = defaultContent,
  tags = ["Mediterranean", "Coastal", "Lifestyle"],
  authorName = "Alexandra Morel",
  authorRole = "Senior Editor",
}: BlogContentRendererProps) => (
  <article className="max-w-[720px]">
    <div
      className="blog-article-content text-[15px] leading-[1.9] font-light text-neutral-500
        [&_h2]:text-[22px] [&_h2]:font-light [&_h2]:tracking-[0.02em] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-neutral-900
        [&_p]:mb-5
        [&_a]:text-amber-700/70 [&_a]:underline
        [&_img]:w-full [&_img]:aspect-[16/9] [&_img]:object-cover [&_img]:my-6
        [&_.img-caption]:block [&_.img-caption]:text-[11px] [&_.img-caption]:text-neutral-400 [&_.img-caption]:mt-1.5 [&_.img-caption]:font-light"
      dangerouslySetInnerHTML={{ __html: content }}
    />

    {/* Tags */}
    {tags.length > 0 && (
      <div className="mt-12 pt-6 flex flex-wrap items-center gap-2 border-t border-neutral-200">
        <Tag className="w-3.5 h-3.5 text-neutral-400" />
        {tags.map((tag) => (
          <span key={tag} className="px-3 py-1 text-[11px] font-light border border-neutral-200 text-neutral-500">{tag}</span>
        ))}
      </div>
    )}

    {/* Author box */}
    <div className="mt-8 p-6 flex items-start gap-4 bg-neutral-50">
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-light bg-neutral-200 text-neutral-900">
        {authorName.split(" ").map((n) => n[0]).join("")}
      </div>
      <div>
        <p className="text-[13px] font-medium text-neutral-900">{authorName}</p>
        <p className="text-[12px] font-light mt-0.5 text-neutral-500">{authorRole}</p>
      </div>
    </div>
  </article>
);

export default BlogContentRenderer;
