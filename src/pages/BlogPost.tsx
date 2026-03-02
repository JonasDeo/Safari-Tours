import { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import AuthorCard from "@/components/blog/post/AuthorCard";
import { getPostBySlug, getRelatedPosts } from "@/components/blog/post/data/blogPostData";
import PostBody from "@/components/blog/post/PostBody";
import PostCTA from "@/components/blog/post/PostCTA";
import PostHero from "@/components/blog/post/PostHero";
import ReadingProgress from "@/components/blog/post/ReadingProgress";
import RelatedPosts from "@/components/blog/post/RelatedPosts";
import TableOfContents  from "@/components/blog/post/TableOfContents";
import { TOCItem } from "@/components/blog/post/types/blogPost";
import { BLOG_POSTS } from "@/constants/blogData";



// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Extract H2/H3 heading blocks to build the TOC */
const extractTOC = (
  body: { type: string; id?: string; level?: number; content?: string }[]
): TOCItem[] =>
  body
    .filter((b) => b.type === "heading")
    .map((b) => ({
      id:    b.id    as string,
      label: b.content as string,
      level: b.level  as 2 | 3,
    }));

// ─── Page ─────────────────────────────────────────────────────────────────────

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  // 404 — redirect to blog index for any unknown slug
  if (!post) return <Navigate to="/blog" replace />;

  const toc = useMemo(() => extractTOC(post.body), [post.body]);

  const relatedPosts = useMemo(
    () => getRelatedPosts(post.slug, post.category, BLOG_POSTS),
    [post.slug, post.category]
  );

  return (
    <PageLayout>
      {/* Sticky reading progress bar */}
      <ReadingProgress />

      {/* Hero — full-bleed image fading into page */}
      <PostHero post={post} />

      {/* Body layout: narrow prose + sticky sidebar */}
      <div className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_300px] gap-12 xl:gap-16 max-w-6xl mx-auto">

            {/* Main article column */}
            <article className="min-w-0 max-w-2xl">
              <PostBody blocks={post.body} />

              {/* In-article CTA — inserted after body content */}
              <PostCTA />

              {/* Author bio */}
              <AuthorCard name={post.author} bio={post.authorBio} />

              {/* Related posts */}
              <RelatedPosts posts={relatedPosts as any} />
            </article>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                <TableOfContents items={toc} />

                {/* Sidebar CTA nudge */}
                <div className="p-5 rounded-2xl bg-dark-overlay/60 border border-sand/8">
                  <p className="font-body text-xs uppercase tracking-widest text-primary mb-2">
                    Plan your trip
                  </p>
                  <p className="font-display text-base text-sand leading-snug mb-4">
                    Ready to witness this for yourself?
                  </p>
                  <a
                    href="/quote"
                    className="block text-center w-full px-4 py-2.5 bg-primary text-primary-foreground
                      font-body text-xs font-semibold tracking-widest uppercase rounded-full
                      hover:bg-primary/90 transition-colors duration-200"
                  >
                    Get a Quote
                  </a>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPostPage;