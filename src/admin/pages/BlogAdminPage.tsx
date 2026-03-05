import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Tag } from "lucide-react";

// ── Mock data — replace with API ──────────────────────────────────────────────
const INITIAL_POSTS = [
  { id: "b_001", title: "The Best Time to Visit the Serengeti",         slug: "best-time-serengeti",         category: "Tanzania",    tags: ["Migration", "Tips"],          published: true,  date: "2026-02-18", reads: 1240 },
  { id: "b_002", title: "Gorilla Trekking: What to Expect",             slug: "gorilla-trekking-guide",      category: "Uganda",      tags: ["Gorillas", "Guide"],          published: true,  date: "2026-02-10", reads: 890  },
  { id: "b_003", title: "Self-Drive Safari: Pros and Cons",             slug: "self-drive-safari",           category: "Tanzania",    tags: ["Self-Drive", "Tips"],         published: false, date: "2026-01-30", reads: 0    },
  { id: "b_004", title: "Zanzibar: Beach & Culture in 7 Days",         slug: "zanzibar-7-days",             category: "Zanzibar",    tags: ["Beach", "Itinerary"],         published: true,  date: "2026-01-22", reads: 2100 },
  { id: "b_005", title: "Packing List for an East Africa Safari",      slug: "safari-packing-list",         category: "Tips",        tags: ["Packing", "Preparation"],     published: true,  date: "2026-01-15", reads: 3450 },
  { id: "b_006", title: "Maasai Culture: A Visitor's Guide",           slug: "maasai-culture-guide",        category: "Kenya",       tags: ["Culture", "Kenya"],           published: false, date: "2026-01-08", reads: 0    },
];

const CATEGORIES = ["All", "Tanzania", "Kenya", "Uganda", "Zanzibar", "Tips"];

const BlogAdminPage = () => {
  const [posts,      setPosts]      = useState(INITIAL_POSTS);
  const [search,     setSearch]     = useState("");
  const [catFilter,  setCatFilter]  = useState("All");

  const toggle = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, published: !p.published } : p));
    // TODO: PATCH /api/admin/blog/:id/publish
  };

  const remove = (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    setPosts(prev => prev.filter(p => p.id !== id));
    // TODO: DELETE /api/admin/blog/:id
  };

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter === "All" || p.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl text-foreground mb-1">Blog Posts</h1>
          <p className="font-body text-sm text-muted-foreground">
            {posts.filter(p => p.published).length} published · {posts.filter(p => !p.published).length} draft
          </p>
        </div>
        <Link to="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
            text-xs font-semibold tracking-widest uppercase font-body transition-all duration-200"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
          <Plus className="w-3.5 h-3.5" /> New Post
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }} className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "hsl(var(--muted-foreground))" }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search posts…"
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

      {/* Posts table */}
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
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center font-body text-sm text-muted-foreground">
                  No posts found.
                </td></tr>
              ) : filtered.map((post, i) => (
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
                      {post.tags.slice(0, 2).map(t => (
                        <span key={t} className="flex items-center gap-0.5 text-xs font-body px-2 py-0.5 rounded-full"
                          style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                          <Tag className="w-2.5 h-2.5" />{t}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-body text-xs text-muted-foreground whitespace-nowrap">{post.date}</span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-body text-sm text-muted-foreground">
                      {post.reads > 0 ? post.reads.toLocaleString() : "—"}
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
                      <button onClick={() => toggle(post.id)}
                        className="p-1.5 rounded-lg transition-colors duration-150"
                        style={{ color: "hsl(var(--muted-foreground))" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "hsl(var(--foreground))"; e.currentTarget.style.background = "hsl(var(--muted))"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "hsl(var(--muted-foreground))"; e.currentTarget.style.background = "transparent"; }}>
                        {post.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => remove(post.id)}
                        className="p-1.5 rounded-lg transition-colors duration-150"
                        style={{ color: "hsl(var(--muted-foreground))" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "hsl(0 70% 65%)"; e.currentTarget.style.background = "hsl(0 70% 50%/0.1)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "hsl(var(--muted-foreground))"; e.currentTarget.style.background = "transparent"; }}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogAdminPage;