import { useState, useEffect, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import { BlogCategory } from "@/components/blog/Blog";
import BlogHero from "@/components/blog/BlogHero";
import CategoryFilter from "@/components/blog/CategoryFilter";
import FeaturedPost from "@/components/blog/FeaturedPost";
import PostGrid from "@/components/blog/Postgrid";
import { publicApi } from "@/lib/api";
import { BLOG_POSTS } from "@/constants/blogData"; // fallback if API empty

//   Map API response → BlogPost shape FeaturedPost/PostGrid expect       ─

const mapPost = (p: any) => ({
  id:          String(p.id),
  slug:        p.slug,
  title:       p.title,
  excerpt:     p.excerpt ?? "",
  category:    p.category as BlogCategory,
  author:      p.author  ?? "Native Kilimanjaro",
  date:        p.created_at ?? new Date().toISOString(),
  readingTime: p.read_time ?? 5,
  image:       p.cover_image ?? "",
  featured:    p.featured ?? false,
  tags:        p.tags ?? [],
  content:     p.content ?? "",
});

//   Page         

const BlogPage = () => {
  const [posts,           setPosts]           = useState<any[]>([]);
  const [loading,         setLoading]         = useState(true);
  const [activeCategory,  setActiveCategory]  = useState<BlogCategory>("All");

  useEffect(() => {
    publicApi.getBlogPosts()
      .then((data: any) => {
        // API may return paginated { data: [...] } or a plain array
        const raw = Array.isArray(data) ? data : (data?.data ?? []);
        if (raw.length > 0) {
          setPosts(raw.map(mapPost));
        } else {
          // No posts yet — fall back to static data so page isn't empty
          setPosts(BLOG_POSTS as any[]);
        }
      })
      .catch(() => {
        // Network error — show static data rather than blank page
        setPosts(BLOG_POSTS as any[]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Featured = first post marked featured, or just the first post
  const featuredPost = useMemo(
    () => posts.find(p => p.featured) ?? posts[0],
    [posts]
  );

  // Grid = everything except the featured post, filtered by category
  const gridPosts = useMemo(() => {
    if (!featuredPost) return [];
    const rest = posts.filter(p => p.id !== featuredPost.id);
    if (activeCategory === "All") return rest;
    return rest.filter(p => p.category === activeCategory);
  }, [posts, featuredPost, activeCategory]);

  // Category counts from live data
  const categoryCounts = useMemo(() =>
    posts.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
      return acc;
    }, {}),
  [posts]);

  return (
    <PageLayout>
      <BlogHero />

      <section className="py-14 lg:py-20 bg-background">
        <div className="container mx-auto px-4 space-y-12 lg:space-y-16">

          {loading ? (
            // Skeleton while loading
            <div className="space-y-6">
              <div className="h-[480px] rounded-2xl animate-pulse"
                style={{ background: "hsl(var(--muted)/0.5)" }} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                  <div key={i} className="h-72 rounded-2xl animate-pulse"
                    style={{ background: "hsl(var(--muted)/0.5)" }} />
                ))}
              </div>
            </div>
          ) : !featuredPost ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-foreground mb-2"
                style={{ fontFamily: '"Yeseva One", serif' }}>
                No posts yet
              </p>
              <p className="font-body text-muted-foreground">
                Check back soon for safari stories and travel tips.
              </p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              <div className="space-y-3">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-primary">
                  Editor's Pick
                </p>
                <FeaturedPost post={featuredPost} />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border" />
                <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground px-2">
                  All Stories
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Category filter */}
              <CategoryFilter
                active={activeCategory}
                onChange={setActiveCategory}
                counts={categoryCounts}
              />

              {/* Post grid */}
              <PostGrid posts={gridPosts} />
            </>
          )}

        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPage;