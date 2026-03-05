import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, ImagePlus, Eye, EyeOff, X, Plus } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface BlogForm {
  title:     string;
  slug:      string;
  category:  string;
  tags:      string[];
  excerpt:   string;
  content:   string;
  coverImage:string;
  published: boolean;
  tagInput:  string;
}

const EMPTY: BlogForm = {
  title: "", slug: "", category: "", tags: [], excerpt: "",
  content: "", coverImage: "", published: false, tagInput: "",
};

const MOCK_POST: BlogForm = {
  title:      "The Best Time to Visit the Serengeti",
  slug:       "best-time-serengeti",
  category:   "Tanzania",
  tags:       ["Migration", "Tips", "Serengeti"],
  excerpt:    "Planning a Serengeti safari? The season you choose will transform the experience entirely. Here's what you need to know.",
  content:    `# The Best Time to Visit the Serengeti\n\nThe Serengeti's wildlife is spectacular year-round, but timing your visit around the Great Migration transforms a great safari into an unforgettable one.\n\n## Dry Season: June – October\n\nThis is peak safari season. The grass is short, animals congregate around water sources, and the wildebeest river crossings in the northern Serengeti hit their dramatic peak in July and August.\n\n## Green Season: November – May\n\nThe landscape turns lush and beautiful. Calving season in January–February brings thousands of newborn wildebeest — and the predators that follow them.`,
  coverImage: "",
  published:  true,
  tagInput:   "",
};

const CATEGORIES = ["Tanzania", "Kenya", "Uganda", "Zanzibar", "Tips", "Wildlife", "Culture", "Food"];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ── Shared input styles ───────────────────────────────────────────────────────
const iStyle = {
  background: "hsl(var(--muted)/0.5)",
  border:     "1px solid hsl(var(--border)/0.6)",
  color:      "hsl(var(--foreground))",
};
const onF = (e: React.FocusEvent<any>) => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)";
const onB = (e: React.FocusEvent<any>) => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)";
const inputCls = "w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200";

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl p-6 space-y-5"
    style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
    <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">{title}</p>
    {children}
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const BlogFormPage = () => {
  const { id }   = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit   = Boolean(id);

  const [form,    setForm]    = useState<BlogForm>(EMPTY);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  useEffect(() => {
    if (isEdit) setForm(MOCK_POST); // TODO: fetch(`/api/admin/blog/${id}`)
  }, [id, isEdit]);

  useEffect(() => {
    if (!isEdit) setForm(f => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, isEdit]);

  const set = (key: keyof BlogForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));

  const addTag = () => {
    const t = form.tagInput.trim();
    if (t && !form.tags.includes(t)) setForm(f => ({ ...f, tags: [...f.tags, t], tagInput: "" }));
  };

  const removeTag = (tag: string) =>
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));

  const handleTagKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // TODO: POST /api/admin/blog  OR  PATCH /api/admin/blog/:id
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate("/admin/blog"); }, 1200);
  };

  return (
    <div className="max-w-3xl space-y-8">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-body mb-5 transition-colors group"
          style={{ color: "hsl(var(--muted-foreground))" }}>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
          Back to Posts
        </button>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-2xl text-foreground mb-1">
              {isEdit ? "Edit Post" : "New Post"}
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              {isEdit ? `Editing: ${form.title}` : "Write a new blog post"}
            </p>
          </div>

          {/* Publish toggle */}
          <button type="button" onClick={() => setForm(f => ({ ...f, published: !f.published }))}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-body
              font-semibold tracking-wider uppercase transition-all duration-200"
            style={form.published
              ? { background: "hsl(142 70% 50%/0.12)", color: "hsl(142 70% 50%)", border: "1px solid hsl(142 70% 50%/0.25)" }
              : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border)/0.5)" }}>
            {form.published
              ? <><Eye    className="w-3.5 h-3.5" /> Published</>
              : <><EyeOff className="w-3.5 h-3.5" /> Draft</>}
          </button>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">

        {/* Basic info */}
        <SectionCard title="Post Details">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
              Title <span style={{ color: "hsl(var(--primary))" }}>*</span>
            </label>
            <input value={form.title} onChange={set("title")} required
              placeholder="e.g. The Best Time to Visit the Serengeti"
              className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
              URL Slug
            </label>
            <input value={form.slug} onChange={set("slug")}
              placeholder="best-time-serengeti"
              className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                Category <span style={{ color: "hsl(var(--primary))" }}>*</span>
              </label>
              <select value={form.category} onChange={set("category")} required
                className={`${inputCls} appearance-none cursor-pointer`} style={iStyle} onFocus={onF} onBlur={onB}>
                <option value="">Select…</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                Tags
              </label>
              <div className="flex gap-2">
                <input value={form.tagInput} onChange={set("tagInput")} onKeyDown={handleTagKey}
                  placeholder="Type & press Enter"
                  className={`${inputCls} flex-1`} style={iStyle} onFocus={onF} onBlur={onB} />
                <button type="button" onClick={addTag}
                  className="px-3 rounded-xl transition-colors"
                  style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {form.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-xs font-body
                      px-2.5 py-1 rounded-full"
                      style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))",
                        border: "1px solid hsl(var(--primary)/0.2)" }}>
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}
                        className="hover:opacity-70 transition-opacity">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
              Excerpt <span style={{ color: "hsl(var(--primary))" }}>*</span>
            </label>
            <textarea value={form.excerpt} onChange={set("excerpt")} required rows={2}
              placeholder="A short summary shown in the blog grid and search results…"
              className={`${inputCls} resize-none`} style={iStyle} onFocus={onF} onBlur={onB} />
          </div>
        </SectionCard>

        {/* Cover image */}
        <SectionCard title="Cover Image">
          <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center
            justify-center gap-3 cursor-pointer transition-all duration-200 text-center"
            style={{ borderColor: "hsl(var(--border)/0.5)" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.4)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "hsl(var(--border)/0.5)"}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "hsl(var(--primary)/0.08)" }}>
              <ImagePlus className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
            </div>
            <div>
              <p className="font-body text-sm text-foreground font-medium">Upload cover image</p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                Recommended: 1200 × 630px · PNG or JPG · Cloudinary in backend phase
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Content */}
        <SectionCard title="Content (Markdown)">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                Body <span style={{ color: "hsl(var(--primary))" }}>*</span>
              </label>
              <span className="text-xs font-body text-muted-foreground">Markdown supported</span>
            </div>
            <textarea value={form.content} onChange={set("content")} required rows={18}
              placeholder={"# Post Title\n\nWrite your post content here. Markdown is supported.\n\n## Section Heading\n\nYour paragraph text..."}
              className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
              style={{ ...iStyle, minHeight: "320px" }} onFocus={onF} onBlur={onB} />
            <p className="text-xs font-body text-muted-foreground">
              {form.content.trim().split(/\s+/).filter(Boolean).length} words
            </p>
          </div>
        </SectionCard>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2">
          <button type="button" onClick={() => navigate(-1)}
            className="px-5 py-3 rounded-xl text-sm font-body transition-colors"
            style={{ color: "hsl(var(--muted-foreground))" }}>
            Cancel
          </button>
          <div className="flex items-center gap-3">
            {saved && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-sm font-body" style={{ color: "hsl(142 70% 50%)" }}>
                Saved ✓
              </motion.span>
            )}
            <motion.button type="submit" disabled={saving}
              whileHover={!saving ? { scale: 1.01 } : {}}
              whileTap={!saving ? { scale: 0.98 } : {}}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-body
                font-semibold tracking-wide transition-all duration-200"
              style={{
                background: saving ? "hsl(var(--primary)/0.5)" : "hsl(var(--primary))",
                color: "hsl(var(--dark))", cursor: saving ? "not-allowed" : "pointer",
              }}>
              {saving
                ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                : <Save className="w-4 h-4" />}
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Publish Post"}
            </motion.button>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default BlogFormPage;