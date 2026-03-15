import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { palette, fonts } from "@/config/template";
import { Layout } from "@/components/layout";
import SEOHead from "@/components/shared/SEOHead";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import propertyDetail1 from "@/assets/property-detail-1.jpg";

const p = {
  bg: palette.bg, white: palette.white, text: palette.text,
  muted: palette.textMuted, light: palette.textLight,
  accent: palette.accent, border: palette.border,
};

const PAGE_TITLE = "The Journal";
const PAGE_SUBTITLE = "Insights, guides and stories from the world of luxury real estate";
const SEARCH_PLACEHOLDER = "Search articles...";
const ALL_CATEGORIES_LABEL = "All";
const READ_MORE = "Read More";
const FEATURED_LABEL = "Featured";
const MIN_READ_SUFFIX = "min read";
const NEWSLETTER_TITLE = "The Private List";
const NEWSLETTER_SUBTITLE = "Stay Informed";
const NEWSLETTER_DESC = "Receive exclusive off-market listings, market insights and invitations to private viewings — delivered discreetly to your inbox.";
const NEWSLETTER_PLACEHOLDER = "Your email address";
const NEWSLETTER_BUTTON = "Subscribe";
const NEWSLETTER_PRIVACY = "We respect your privacy. Unsubscribe at any time.";
const LOAD_MORE = "Load More Articles";
const NO_RESULTS = "No articles found matching your criteria.";

const CATEGORIES = [
  { slug: "all", label: ALL_CATEGORIES_LABEL },
  { slug: "market-insights", label: "Market Insights" },
  { slug: "lifestyle", label: "Lifestyle" },
  { slug: "architecture", label: "Architecture & Design" },
  { slug: "investment", label: "Investment" },
  { slug: "destinations", label: "Destinations" },
  { slug: "guides", label: "Guides" },
];

const BLOG_POSTS = [
  { id: "1", image: propertyDetail1, date: "26 Feb 2026", category: "lifestyle", title: "An Insider's Guide to Coastal Living in the Mediterranean", excerpt: "The Mediterranean coast has evolved from a seasonal destination into a strategic lifestyle hub for international buyers seeking year-round luxury. From Ibiza's bohemian energy to the Costa Blanca's understated elegance, discover why discerning buyers are making the move.", author: "Alexandra Morel", readTime: 8, featured: true },
  { id: "2", image: prop1, date: "25 Feb 2026", category: "market-insights", title: "Dual Demand Drives Dubai: The Emirate Welcomes Fresh Buyers Without Losing Its Ultra-Prime Edge", excerpt: "Key Insights: The $500K–$1M segment grew 70% year-over-year, emerging as a primary entry point for international investors looking at Dubai's thriving market.", author: "James Harrington", readTime: 6, featured: false },
  { id: "3", image: prop3, date: "25 Feb 2026", category: "architecture", title: "A Majestic Alpine Estate Spanning 130 Hectares of Private Parkland Near Zermatt", excerpt: "This remarkable historic estate stands as one of Europe's most captivating properties, where centuries of heritage meet contemporary luxury in a breathtaking mountain setting.", author: "Sofia Engström", readTime: 5, featured: false },
  { id: "4", image: heroImg, date: "24 Feb 2026", category: "destinations", title: "Caribbean Paradise: Explore Exceptional Properties Across the Region's Most Coveted Islands", excerpt: "The Caribbean's appeal extends beyond its white-sand beaches. Spanning more than 7,000 islands across a turquoise expanse, the region offers an extraordinary range of luxury living opportunities.", author: "Marcus Chen", readTime: 7, featured: false },
  { id: "5", image: prop2, date: "22 Feb 2026", category: "investment", title: "Why European Waterfront Properties Remain the Safest Long-Term Investment", excerpt: "As global markets fluctuate, European waterfront real estate continues to demonstrate exceptional resilience. We analyse the data behind this enduring asset class.", author: "Alexandra Morel", readTime: 10, featured: false },
  { id: "6", image: prop1, date: "20 Feb 2026", category: "guides", title: "The Complete Guide to Buying Property in Spain as a Non-Resident", excerpt: "Navigating Spain's property market as an international buyer requires careful planning. From NIE numbers to tax implications, here's everything you need to know.", author: "James Harrington", readTime: 12, featured: false },
  { id: "7", image: prop3, date: "18 Feb 2026", category: "lifestyle", title: "The Rise of Wellness-Centric Luxury Homes: A New Standard in Premium Living", excerpt: "Today's ultra-high-net-worth buyers aren't just looking for square footage — they're seeking spaces that actively enhance physical and mental well-being.", author: "Sofia Engström", readTime: 6, featured: false },
  { id: "8", image: heroImg, date: "15 Feb 2026", category: "market-insights", title: "Ibiza Property Market Report Q1 2026: Record Demand Meets Limited Supply", excerpt: "Our quarterly analysis reveals that Ibiza's luxury segment has reached unprecedented price levels, driven by a surge in international demand and a constrained supply pipeline.", author: "Marcus Chen", readTime: 9, featured: false },
];

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
};

const BlogListingPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((pp) => pp.featured);
  const regularPosts = filteredPosts.filter((pp) => !pp.featured).slice(0, visibleCount);
  const hasMore = filteredPosts.filter((pp) => !pp.featured).length > visibleCount;
  const getCategoryLabel = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;

  return (
    <Layout activePath="/blog">
      <SEOHead
        title="The Journal — Blog"
        description="Insights, guides and stories from the world of luxury real estate. Market analysis, lifestyle features, architecture and investment advice."
      />

      {/* ─── PAGE HEADER ─── */}
      <section className="py-10 md:py-16" style={{ background: p.bg }}>
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-10">
          <FadeIn>
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: p.accent }}>Journal</p>
              <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.04em]">{PAGE_TITLE}</h1>
              <p className="text-[13px] md:text-[14px] font-light mt-3 max-w-lg mx-auto" style={{ color: p.light }}>{PAGE_SUBTITLE}</p>
              <div className="w-12 h-[1px] mx-auto mt-6" style={{ background: p.accent }} />
            </div>
          </FadeIn>

          {/* Search */}
          <FadeIn delay={0.1}>
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: p.light }} strokeWidth={1.5} />
                <input
                  type="text" value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6); }}
                  placeholder={SEARCH_PLACEHOLDER}
                  className="w-full pl-10 pr-4 py-3 text-[13px] focus:outline-none transition-colors duration-300"
                  style={{ border: `1px solid ${p.border}`, background: p.white, color: p.text }}
                />
              </div>
            </div>
          </FadeIn>

          {/* Categories */}
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => { setActiveCategory(cat.slug); setVisibleCount(6); }}
                  className="px-4 py-2 text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-300"
                  style={{
                    border: `1px solid ${activeCategory === cat.slug ? p.text : p.border}`,
                    background: activeCategory === cat.slug ? p.text : "transparent",
                    color: activeCategory === cat.slug ? p.white : p.light,
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* ─── FEATURED POST ─── */}
          {featuredPost && activeCategory === "all" && searchQuery === "" && (
            <FadeIn delay={0.2}>
              <div className="mb-12 md:mb-16 pb-12 md:pb-16" style={{ borderBottom: `1px solid ${p.border}` }}>
                <Link to={`/blog/${featuredPost.id}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img src={featuredPost.image} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[9px] tracking-[0.18em] uppercase font-medium px-3 py-1" style={{ background: p.text, color: p.white }}>{FEATURED_LABEL}</span>
                        <span className="text-[10px] tracking-[0.18em] uppercase font-medium" style={{ color: p.light }}>{getCategoryLabel(featuredPost.category)}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-[2.2rem] font-extralight tracking-[0.02em] leading-[1.2] group-hover:opacity-70 transition-opacity duration-300">
                        {featuredPost.title}
                      </h2>
                      <p className="text-[13.5px] font-light mt-4 leading-[1.8] line-clamp-3 lg:line-clamp-4" style={{ color: p.muted }}>{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-3 mt-6 text-[11px] font-light" style={{ color: p.light }}>
                        <span>{featuredPost.author}</span>
                        <span className="w-[3px] h-[3px] rounded-full" style={{ background: p.border }} />
                        <span>{featuredPost.date}</span>
                        <span className="w-[3px] h-[3px] rounded-full" style={{ background: p.border }} />
                        <span>{featuredPost.readTime} {MIN_READ_SUFFIX}</span>
                      </div>
                      <div className="mt-7">
                        <span className="text-[11px] tracking-[0.15em] uppercase font-medium inline-flex items-center gap-2 pb-0.5 group-hover:opacity-70 transition-opacity duration-300" style={{ color: p.accent, borderBottom: `1px solid ${p.accent}40` }}>
                          {READ_MORE} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </FadeIn>
          )}

          {/* ─── POSTS GRID ─── */}
          {regularPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                {regularPosts.map((post, i) => (
                  <FadeIn key={post.id} delay={i * 0.08}>
                    <Link to={`/blog/${post.id}`} className="group block">
                      <div className="relative overflow-hidden aspect-[16/10]">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-3 left-3">
                          <span className="backdrop-blur-sm text-[9px] tracking-[0.15em] uppercase font-medium px-2.5 py-1" style={{ background: `${p.white}e6`, color: p.text }}>
                            {getCategoryLabel(post.category)}
                          </span>
                        </div>
                      </div>
                      <div className="pt-4 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-light" style={{ color: p.light }}>
                          <span>{post.date}</span>
                          <span className="w-0.5 h-0.5 rounded-full" style={{ background: p.border }} />
                          <span>{post.readTime} {MIN_READ_SUFFIX}</span>
                        </div>
                        <h3 className="text-[15px] md:text-[16px] font-normal leading-[1.35] group-hover:opacity-70 transition-opacity duration-300 line-clamp-2" style={{ color: p.text }}>
                          {post.title}
                        </h3>
                        <p className="text-[12px] font-light leading-relaxed line-clamp-2" style={{ color: p.muted }}>{post.excerpt}</p>
                        <p className="text-[11px] font-light pt-1" style={{ color: p.light }}>{post.author}</p>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>

              {hasMore && (
                <FadeIn delay={0.2}>
                  <div className="text-center mt-12">
                    <button onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="text-[11px] tracking-[0.15em] uppercase px-9 py-3 transition-all duration-300 hover:opacity-80"
                      style={{ border: `1px solid ${p.border}`, color: p.muted }}
                    >{LOAD_MORE}</button>
                  </div>
                </FadeIn>
              )}
            </>
          ) : (
            <FadeIn>
              <div className="text-center py-16">
                <p className="text-[14px] font-light" style={{ color: p.light }}>{NO_RESULTS}</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-14 md:py-20" style={{ background: p.white }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: p.accent }}>{NEWSLETTER_SUBTITLE}</p>
            <h2 className="text-2xl md:text-3xl font-extralight tracking-[0.04em]">{NEWSLETTER_TITLE}</h2>
            <p className="text-[13px] font-light mt-3 mb-8 leading-relaxed" style={{ color: p.muted }}>{NEWSLETTER_DESC}</p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder={NEWSLETTER_PLACEHOLDER}
                className="flex-1 px-4 py-3 text-[13px] focus:outline-none transition-colors duration-300"
                style={{ border: `1px solid ${p.border}`, background: p.white, color: p.text }} />
              <button type="submit" className="text-[11px] tracking-[0.15em] uppercase px-8 py-3 transition-all duration-300 whitespace-nowrap hover:opacity-90"
                style={{ background: p.accent, color: p.white }}>{NEWSLETTER_BUTTON}</button>
            </form>
            <p className="text-[10px] mt-4 font-light" style={{ color: p.light }}>{NEWSLETTER_PRIVACY}</p>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default BlogListingPage;
