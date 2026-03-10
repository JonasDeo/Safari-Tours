import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, ImagePlus, Eye, EyeOff, X, Plus } from "lucide-react";
import { adminApi, ApiError } from "@/lib/api";

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

  const [form,          setForm]          = useState<BlogForm>(EMPTY);
  const [saving,        setSaving]        = useState(false);
  const [saved,         setSaved]         = useState(false);
  const [error,         setError]         = useState("");
  const [savedId,       setSavedId]       = useState<string | null>(null);
  const [uploadingCover,setUploadingCover]= useState(false);
  const [uploadError,   setUploadError]   = useState("");

  useEffect(() => {
    if (!isEdit || !id) return;
    adminApi.getBlogPost(id)
      .then(data => {
        const p = data as any;
        setForm({
          title:      p.title       ?? "",
          slug:       p.slug        ?? "",
          category:   p.category    ?? "",
          tags:       p.tags        ?? [],
          excerpt:    p.excerpt     ?? "",
          content:    p.content     ?? "",
          coverImage: p.cover_image ?? "",
          published:  p.published   ?? false,
          tagInput:   "",
        });
      })
      .catch(err => setError(err instanceof ApiError ? err.message : "Failed to load post."));
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
    setError("");
    const payload = {
      title:       form.title,
      slug:        form.slug || undefined,
      category:    form.category,
      tags:        form.tags,
      excerpt:     form.excerpt,
      content:     form.content,
      cover_image: form.coverImage || undefined,
      published:   form.published,
    };
    try {
      let result: any;
      if (isEdit && id) {
        result = await adminApi.updateBlogPost(id, payload);
      } else {
        result = await adminApi.createBlogPost(payload);
      }
      setSaved(true);
      if (!isEdit) {
        const newId = (result as any)?.id;
        if (newId) setSavedId(String(newId));
        else setTimeout(() => { setSaved(false); navigate("/admin/blog"); }, 1200);
      } else {
        setTimeout(() => { setSaved(false); navigate("/admin/blog"); }, 1200);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
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

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm font-body"
          style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 65%)", border: "1px solid hsl(0 70% 50%/0.2)" }}>
          {error}
        </div>
      )}

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
          {form.coverImage && (
            <div className="relative group rounded-xl overflow-hidden mb-3 aspect-video max-h-48">
              <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
              <button type="button"
                onClick={() => setForm(f => ({ ...f, coverImage: "" }))}
                className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center
                  opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "hsl(0 70% 50%/0.9)" }}>
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          )}
          {uploadError && (
            <p className="text-xs font-body mb-2" style={{ color: "hsl(0 70% 65%)" }}>{uploadError}</p>
          )}
          {(!isEdit && !savedId) ? (
            <p className="text-xs font-body text-muted-foreground p-4 rounded-xl text-center"
              style={{ background: "hsl(var(--muted)/0.4)", border: "1px dashed hsl(var(--border)/0.5)" }}>
              Save the post first, then you can upload a cover image.
            </p>
          ) : (
            <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center
              justify-center gap-3 cursor-pointer transition-all duration-200 text-center block"
              style={{ borderColor: uploadingCover ? "hsl(var(--primary)/0.6)" : "hsl(var(--border)/0.5)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--primary)/0.4)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = uploadingCover ? "hsl(var(--primary)/0.6)" : "hsl(var(--border)/0.5)"}>
              <input type="file" accept="image/*" className="sr-only" disabled={uploadingCover}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const postId = savedId ?? id;
                  if (!postId) return;
                  setUploadingCover(true);
                  setUploadError("");
                  try {
                    const res = await adminApi.uploadBlogCover(postId, file) as any;
                    setForm(f => ({ ...f, coverImage: res.url }));
                  } catch {
                    setUploadError("Upload failed. Check file size (max 10MB) and try again.");
                  } finally {
                    setUploadingCover(false);
                    e.target.value = "";
                  }
                }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(var(--primary)/0.08)" }}>
                {uploadingCover
                  ? <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  : <ImagePlus className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />}
              </div>
              <div>
                <p className="font-body text-sm text-foreground font-medium">
                  {uploadingCover ? "Uploading…" : "Click to upload cover image"}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  Recommended: 1200 × 630px · PNG or JPG — uploads to Cloudinary
                </p>
              </div>
            </label>
          )}
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