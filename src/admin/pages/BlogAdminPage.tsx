import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Tag } from "lucide-react";
import { adminApi, ApiError } from "@/lib/api";

interface BlogPost {
  id: number; title: string; slug: string; category: string;
  tags: string[]; published: boolean; created_at: string; read_count: number;
}

const CATEGORIES = ["All", "Tanzania", "Kenya", "Uganda", "Zanzibar", "Tips"];
const Skeleton = ({ className }: { className: string }) => (
  <div className={`rounded animate-pulse ${className}`} style={{ background: "hsl(var(--muted)/0.6)" }} />
);

const BlogAdminPage = () => {
  const [posts,     setPosts]     = useState<BlogPost[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");
  const [search,    setSearch]    = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const load = useCallback(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (catFilter !== "All") params.category = catFilter;
    if (search.trim())       params.search   = search.trim();
    adminApi.getBlogPosts(params)
      .then(data => setPosts((data as any).data ?? data))
      .catch(err => setError(err instanceof ApiError ? err.message : "Failed to load posts."))
      .finally(() => setLoading(false));
  }, [catFilter, search]);

  useEffect(() => { load(); }, [load]);

  const toggle = async (post: BlogPost) => {
    try {
      await adminApi.toggleBlogPublish(String(post.id));
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
    } catch { alert("Failed to update."); }
  };

  const remove = async (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}" permanently?`)) return;
    try {
      await adminApi.deleteBlogPost(String(post.id));
      setPosts(prev => prev.filter(p => p.id !== post.id));
    } catch { alert("Failed to delete post."); }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl text-foreground mb-1">Blog Posts</h1>
          <p className="font-body text-sm text-muted-foreground">
            {loading ? '…' : `${posts.filter(p => p.published).length} published · ${posts.filter(p => !p.published).length} draft`}
          </p>
        </div>
        <Link to="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-widest uppercase font-body transition-all duration-200"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
          <Plus className="w-3.5 h-3.5" /> New Post
        </Link>
      </motion.div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm font-body"
          style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 65%)", border: "1px solid hsl(0 70% 50%/0.2)" }}>
          {error}
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }} className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "hsl(var(--muted-foreground))" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-body outline-none transition-all duration-200"
            style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border)/0.6)", color: "hsl(var(--foreground))" }}
            onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
            onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className="px-3 py-2 rounded-xl text-xs font-body font-semibold uppercase tracking-wider transition-all duration-200"
              style={catFilter === c
                ? { background: "hsl(var(--primary))", color: "hsl(var(--dark))" }
                : { background: "hsl(var(--muted)/0.5)", color: "hsl(var(--muted-foreground))" }}>
              {c}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }} className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid hsl(var(--border)/0.6)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "hsl(var(--muted)/0.4)", borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
                {["Title", "Category", "Tags", "Date", "Reads", "Status", ""].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-body uppercase tracking-widest"
                    style={{ color: "hsl(var(--muted-foreground))" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="px-5 py-4"><Skeleton className="h-4 w-full" /></td>
                      ))}
                    </tr>
                  ))
                : posts.length === 0
                  ? <tr><td colSpan={7} className="px-5 py-12 text-center font-body text-sm text-muted-foreground">No posts found.</td></tr>
                  : posts.map((post, i) => (
                      <motion.tr key={post.id}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="group transition-colors duration-150"
                        style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "hsl(var(--muted)/0.3)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td className="px-5 py-4 max-w-[260px]">
                          <p className="font-body text-sm text-foreground truncate">{post.title}</p>
                          <p className="font-body text-xs text-muted-foreground truncate">/{post.slug}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs font-body px-2.5 py-1 rounded-full"
                            style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}>
                            {post.category}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 flex-wrap">
                            {(post.tags ?? []).slice(0, 2).map(t => (
                              <span key={t} className="flex items-center gap-0.5 text-xs font-body px-2 py-0.5 rounded-full"
                                style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                                <Tag className="w-2.5 h-2.5" />{t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-body text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-body text-sm text-muted-foreground">
                            {post.read_count > 0 ? post.read_count.toLocaleString() : "—"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs font-body px-2.5 py-1 rounded-full font-medium"
                            style={post.published
                              ? { background: "hsl(142 70% 50%/0.12)", color: "hsl(142 70% 50%)" }
                              : { background: "hsl(var(--muted))",      color: "hsl(var(--muted-foreground))" }}>
                            {post.published ? "Live" : "Draft"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link to={`/admin/blog/${post.id}/edit`}
                              className="p-1.5 rounded-lg transition-colors duration-150"
                              style={{ color: "hsl(var(--muted-foreground))" }}
                              onMouseEnter={e => { e.currentTarget.style.color = "hsl(var(--foreground))"; e.currentTarget.style.background = "hsl(var(--muted))"; }}
                              onMouseLeave={e => { e.currentTarget.style.color = "hsl(var(--muted-foreground))"; e.currentTarget.style.background = "transparent"; }}>
                              <Edit2 className="w-3.5 h-3.5" />
                            </Link>
                            <button onClick={() => toggle(post)}
                              className="p-1.5 rounded-lg transition-colors duration-150"
                              style={{ color: "hsl(var(--muted-foreground))" }}
                              onMouseEnter={e => { e.currentTarget.style.color = "hsl(var(--foreground))"; e.currentTarget.style.background = "hsl(var(--muted))"; }}
                              onMouseLeave={e => { e.currentTarget.style.color = "hsl(var(--muted-foreground))"; e.currentTarget.style.background = "transparent"; }}>
                              {post.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button onClick={() => remove(post)}
                              className="p-1.5 rounded-lg transition-colors duration-150"
                              style={{ color: "hsl(var(--muted-foreground))" }}
                              onMouseEnter={e => { e.currentTarget.style.color = "hsl(0 70% 65%)"; e.currentTarget.style.background = "hsl(0 70% 50%/0.1)"; }}
                              onMouseLeave={e => { e.currentTarget.style.color = "hsl(var(--muted-foreground))"; e.currentTarget.style.background = "transparent"; }}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
              }
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogAdminPage;