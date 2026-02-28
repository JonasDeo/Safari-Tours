import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import { BlogCategory } from "@/components/blog/Blog";
import BlogHero from "@/components/blog/BlogHero";
import CategoryFilter from "@/components/blog/CategoryFilter";
import FeaturedPost from "@/components/blog/FeaturedPost";
import PostGrid from "@/components/blog/Postgrid";
import { BLOG_POSTS } from "@/constants/blogData";

/** Count posts per category for the filter badges */
const buildCounts = () =>
  BLOG_POSTS.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1;
    return acc;
  }, {});

const CATEGORY_COUNTS = buildCounts();


const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");

  // Featured post
  const featuredPost = useMemo(
    () => BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0],
    []
  );

  // Filtered grid posts
  const gridPosts = useMemo(() => {
    const withoutFeatured = BLOG_POSTS.filter((p) => p.id !== featuredPost.id);
    if (activeCategory === "All") return withoutFeatured;
    return withoutFeatured.filter((p) => p.category === activeCategory);
  }, [activeCategory, featuredPost.id]);

  return (
    <PageLayout>

      {/* Hero — matches DestinationsPage pattern */}
      <BlogHero />

      {/* Main content */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="container mx-auto px-4 space-y-12 lg:space-y-16">

          {/* Featured post — always shown */}
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
            counts={CATEGORY_COUNTS}
          />

          {/* Post grid */}
          <PostGrid posts={gridPosts} />

        </div>
      </section>

    </PageLayout>
  );
};

export default BlogPage;