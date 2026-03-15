/**
 * BLOG COMBO — Blog Listing + Detail Preview
 * Search Filter + Featured Post + Article Cards + Content Renderer + FAQ + Social Share + Trending
 */
import BlogSearchFilter from "@/components/blocks/blog/BlogSearchFilter";
import BlogFeaturedPost from "@/components/blocks/blog/BlogFeaturedPost";
import BlogArticleCard from "@/components/blocks/blog/BlogArticleCard";
import BlogContentRenderer from "@/components/blocks/blog/BlogContentRenderer";
import BlogFaqAccordion from "@/components/blocks/blog/BlogFaqAccordion";
import BlogSocialShare from "@/components/blocks/blog/BlogSocialShare";
import BlogTrendingGrid from "@/components/blocks/blog/BlogTrendingGrid";
import NewsletterCentered from "@/components/blocks/cta/NewsletterCentered";

const BlogCombo = () => (
  <div>
    <BlogSearchFilter />
    <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-10">
      <BlogFeaturedPost />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <BlogArticleCard />
        <BlogArticleCard
          title="European Waterfront Properties as Safe Investment"
          category="Investment"
          author="James Harrington"
          readTime={10}
        />
        <BlogArticleCard
          title="The Rise of Wellness-Centric Luxury Homes"
          category="Lifestyle"
          author="Sofia Engström"
          readTime={6}
        />
      </div>
    </div>
    <div className="border-t border-neutral-200" />
    <div className="max-w-5xl mx-auto px-5 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_60px] gap-8">
      <div>
        <BlogContentRenderer />
        <BlogFaqAccordion />
      </div>
      <div className="hidden lg:block sticky top-[160px] self-start">
        <BlogSocialShare />
      </div>
    </div>
    <BlogTrendingGrid />
    <NewsletterCentered />
  </div>
);

export default BlogCombo;
