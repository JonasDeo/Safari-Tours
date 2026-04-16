import { useState, useEffect, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, User, Clock, ChevronDown } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import AuthorCard from "@/components/blog/post/AuthorCard";
import PostBody from "@/components/blog/post/PostBody";
import PostCTA from "@/components/blog/post/PostCTA";
import PostHero from "@/components/blog/post/PostHero";
import ReadingProgress from "@/components/blog/post/ReadingProgress";
import TableOfContents from "@/components/blog/post/TableOfContents";
import { TOCItem } from "@/components/blog/post/types/blogPost";
import type { ContentBlock } from "@/components/blog/post/types/blogPost";
import { BLOG_POSTS } from "@/data/blogData";
import { publicApi } from "@/lib/api";

//   Helpers       ─

const extractTOC = (
  body: { type: string; id?: string; level?: number; content?: string }[]
): TOCItem[] =>
  body
    .filter((b) => b.type === "heading")
    .map((b) => ({ id: b.id as string, label: b.content as string, level: b.level as 2 | 3 }));

const contentToBlocks = (content: string): ContentBlock[] => {
  const paragraphs = content.split(/\n\n+/);
  let headingIdx = 0;
  return paragraphs
    .map((p): ContentBlock | null => {
      const h3 = p.match(/^###\s+(.+)/);
      const h2 = p.match(/^##\s+(.+)/);
      if (h3) return { type: "heading", level: 3, id: `h-${headingIdx++}`, content: h3[1] };
      if (h2) return { type: "heading", level: 2, id: `h-${headingIdx++}`, content: h2[1] };
      const trimmed = p.trim();
      return trimmed ? { type: "paragraph", content: trimmed } : null;
    })
    .filter((b): b is ContentBlock => b !== null);
};

const mapApiPost = (p: any) => ({
  id:          String(p.id ?? p.slug),
  slug:        p.slug,
  title:       p.title,
  excerpt:     p.excerpt    ?? "",
  category:    p.category   ?? "Tips",
  author:      p.author     ?? "Native Kilimanjaro",
  authorBio:   p.author_bio ?? "Expert safari guide and travel writer sharing insights about East Africa.",
  date:        p.created_at ?? new Date().toISOString(),
  readingTime: Number(p.read_time ?? p.readingTime ?? 5),
  image:       p.cover_image ?? p.image ?? "",
  featured:    p.featured   ?? false,
  body: Array.isArray(p.body)
    ? (p.body as ContentBlock[])
    : contentToBlocks(p.content ?? ""),
});

//   Comment types    ─

interface Comment {
  id:        number;
  name:      string;
  body:      string;
  created_at:string;
}

//   Comments section   

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

const CommentsSection = ({ postSlug }: { postSlug: string }) => {
  const [comments,    setComments]    = useState<Comment[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [showForm,    setShowForm]    = useState(false);
  const [name,        setName]        = useState("");
  const [body,        setBody]        = useState("");
  const [error,       setError]       = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:8000"}/api/blog/${postSlug}/comments`)
      .then(r => r.json())
      .then(data => setComments(Array.isArray(data) ? data : (data?.data ?? [])))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [postSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL ?? "http://localhost:8000"}/api/blog/${postSlug}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ name: name.trim(), body: body.trim() }),
        }
      );
      if (!res.ok) throw new Error("Failed to submit");
      const newComment = await res.json();
      setComments(c => [newComment, ...c]);
      setName(""); setBody("");
      setSubmitted(true);
      setShowForm(false);
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError("Couldn't submit your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    background: "hsl(var(--muted)/0.4)",
    border: "1px solid hsl(var(--border)/0.6)",
    color: "hsl(var(--foreground))",
  };

  return (
    <div className="mt-12 pt-10" style={{ borderTop: "1px solid hsl(var(--border)/0.5)" }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-display text-xl text-foreground flex items-center gap-2"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          <MessageCircle className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
          {loading ? "Comments" : `${comments.length} Comment${comments.length !== 1 ? "s" : ""}`}
        </h3>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body
            font-semibold tracking-wider uppercase transition-all duration-200"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
          {showForm ? "Cancel" : "Leave a Comment"}
        </button>
      </div>

      {/* Success message */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-6 px-4 py-3 rounded-xl text-sm font-body"
            style={{ background: "hsl(142 70% 50%/0.1)", color: "hsl(142 70% 45%)",
              border: "1px solid hsl(142 70% 50%/0.2)" }}>
            Thanks for your comment! It will appear once approved.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comment form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            className="mb-8 rounded-2xl p-6 space-y-4 overflow-hidden"
            style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
            <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">
              Your Comment
            </p>
            <input
              value={name} onChange={e => setName(e.target.value)} required
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all"
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
              onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
            <textarea
              value={body} onChange={e => setBody(e.target.value)} required rows={4}
              placeholder="Share your thoughts, questions, or experiences…"
              className="w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all resize-none"
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
              onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
            {error && (
              <p className="text-xs font-body" style={{ color: "hsl(0 70% 60%)" }}>{error}</p>
            )}
            <div className="flex justify-end">
              <button type="submit" disabled={submitting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body
                  font-semibold transition-all duration-200"
                style={{ background: submitting ? "hsl(var(--primary)/0.5)" : "hsl(var(--primary))",
                  color: "hsl(var(--dark))", cursor: submitting ? "not-allowed" : "pointer" }}>
                {submitting
                  ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  : <Send className="w-4 h-4" />}
                {submitting ? "Posting…" : "Post Comment"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Comments list */}
      {loading ? (
        <div className="space-y-4">
          {[1,2].map(i => (
            <div key={i} className="rounded-xl p-5 animate-pulse"
              style={{ background: "hsl(var(--muted)/0.3)", height: 96 }} />
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10">
          <p className="font-body text-sm text-muted-foreground">
            No comments yet. Be the first to share your thoughts.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c, i) => (
            <motion.div key={c.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl p-5"
              style={{ background: "hsl(var(--muted)/0.25)", border: "1px solid hsl(var(--border)/0.4)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                    {c.name[0].toUpperCase()}
                  </div>
                  <span className="font-body text-sm font-semibold text-foreground">{c.name}</span>
                </div>
                <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(c.created_at)}
                </span>
              </div>
              <p className="font-body text-sm text-foreground/80 leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

//   Related posts from API                           

const RelatedPostsLive = ({ currentSlug, category }: { currentSlug: string; category: string }) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    publicApi.getBlogPosts({ category })
      .then((data: any) => {
        const all = Array.isArray(data) ? data : (data?.data ?? []);
        const related = all
          .filter((p: any) => p.slug !== currentSlug)
          .slice(0, 3)
          .map(mapApiPost);
        setPosts(related);
      })
      .catch(() => {
        // fallback to static
        const related = BLOG_POSTS
          .filter(p => p.slug !== currentSlug && p.category === category)
          .slice(0, 3);
        setPosts(related.map(mapApiPost));
      });
  }, [currentSlug, category]);

  if (!posts.length) return null;

  return (
    <div className="mt-12 pt-10" style={{ borderTop: "1px solid hsl(var(--border)/0.5)" }}>
      <h3 className="font-display text-xl text-foreground mb-6"
        style={{ fontFamily: '"Yeseva One", serif' }}>
        More from {category}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((p, i) => (
          <motion.a key={p.slug} href={`/blog/${p.slug}`}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group rounded-xl overflow-hidden"
            style={{ border: "1px solid hsl(var(--border)/0.5)" }}>
            {p.image && (
              <div className="h-32 overflow-hidden">
                <img src={p.image} alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}
            <div className="p-4">
              <span className="text-xs font-body uppercase tracking-wider"
                style={{ color: "hsl(var(--primary))" }}>{p.category}</span>
              <p className="font-body text-sm font-semibold text-foreground mt-1 line-clamp-2
                group-hover:underline decoration-primary underline-offset-2">
                {p.title}
              </p>
              <p className="font-body text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {p.readingTime} min read
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

//   Page         

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const [post,     setPost]     = useState<ReturnType<typeof mapApiPost> | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [notFound, setNotFound] = useState(false);

  // All hooks before any conditional returns
  const toc = useMemo(
    () => post ? extractTOC(post.body) : [],
    [post]
  );

  useEffect(() => {
    if (!slug) return;
    window.scrollTo(0, 0);
    publicApi.getBlogPost(slug)
      .then(data => setPost(mapApiPost(data)))
      .catch(() => {
        const staticPost = BLOG_POSTS.find(p => p.slug === slug);
        if (staticPost) setPost(mapApiPost(staticPost));
        else setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <div className="animate-pulse">
          <div className="h-[60vh]" style={{ background: "hsl(var(--muted)/0.5)" }} />
          <div className="container mx-auto px-4 py-12 max-w-2xl space-y-4">
            {[3/4, 1, 5/6, 4/6].map((w, i) => (
              <div key={i} className="h-4 rounded" style={{ width: `${w*100}%`, background: "hsl(var(--muted)/0.5)" }} />
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  if (notFound || !post) return <Navigate to="/blog" replace />;

  return (
    <PageLayout>
      <ReadingProgress />
      <PostHero post={post} />

      <div className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_300px] gap-12 xl:gap-16 max-w-6xl mx-auto">

            {/* Main article */}
            <article className="min-w-0 max-w-2xl">
              <PostBody blocks={post.body} />
              <PostCTA />
              <AuthorCard name={post.author} bio={post.authorBio} />

              {/* Related posts — live from API */}
              <RelatedPostsLive currentSlug={post.slug} category={post.category} />

              {/* Comments */}
              <CommentsSection postSlug={post.slug} />
            </article>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {toc.length > 0 && <TableOfContents items={toc} />}
                <div className="p-5 rounded-2xl bg-dark-overlay/60 border border-sand/8">
                  <p className="font-body text-xs uppercase tracking-widest text-primary mb-2">
                    Plan your trip
                  </p>
                  <p className="font-display text-base text-sand leading-snug mb-4">
                    Ready to witness this for yourself?
                  </p>
                  <a href="/quote"
                    className="block text-center w-full px-4 py-2.5 bg-primary text-primary-foreground
                      font-body text-xs font-semibold tracking-widest uppercase rounded-full
                      hover:bg-primary/90 transition-colors duration-200">
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