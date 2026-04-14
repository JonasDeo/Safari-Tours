import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ImagePlus, Star, GripVertical, X, Save, Edit2 } from "lucide-react";
import { adminApi, ApiError } from "@/lib/api";

interface Testimonial {
  id:       number;
  name:     string;
  location: string;
  avatar:   string | null;
  text:     string;
  rating:   number;
  featured: boolean;
  sort_order: number;
}

const EMPTY = { name: "", location: "", text: "", rating: 5, featured: true };

const iStyle = {
  background: "hsl(var(--muted)/0.5)",
  border:     "1px solid hsl(var(--border)/0.6)",
  color:      "hsl(var(--foreground))",
};
const onF = (e: React.FocusEvent<any>) => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)";
const onB = (e: React.FocusEvent<any>) => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)";
const cls = "w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200";

const nameToColor = (name: string) => {
  const p = ["#b6552a", "#414a26", "#c46a42", "#5b6334", "#a74f2f", "#6d7440", "#8f4228"];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return p[Math.abs(h) % p.length];
};
const initials = (name: string) =>
  name.split(/[\s&]+/).filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join("");

const Stars = ({ value, onChange }: { value: number; onChange?: (n: number) => void }) => (
  <div className="flex gap-1">
    {[1,2,3,4,5].map(n => (
      <Star key={n}
        className={`w-4 h-4 transition-colors ${onChange ? "cursor-pointer" : ""}`}
        onClick={() => onChange?.(n)}
        style={{ fill: n <= value ? "hsl(var(--primary))" : "transparent",
                 color: n <= value ? "hsl(var(--primary))" : "hsl(var(--border))" }} />
    ))}
  </div>
);

const TestimonialsPage = () => {
  const [items,      setItems]      = useState<Testimonial[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [showForm,   setShowForm]   = useState(false);
  const [editing,    setEditing]    = useState<Testimonial | null>(null);
  const [form,       setForm]       = useState({ ...EMPTY });
  const [saving,     setSaving]     = useState(false);
  const [uploading,  setUploading]  = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    (adminApi as any).getTestimonials?.()
      .then((data: any) => setItems(Array.isArray(data) ? data : (data?.data ?? [])))
      .catch((e: any) => setError(e instanceof ApiError ? e.message : "Failed to load."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...EMPTY });
    setShowForm(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ name: t.name, location: t.location, text: t.text, rating: t.rating, featured: t.featured });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editing) {
        const updated = await (adminApi as any).updateTestimonial(editing.id, form) as Testimonial;
        setItems(prev => prev.map(t => t.id === editing.id ? updated : t));
      } else {
        const created = await (adminApi as any).createTestimonial(form) as Testimonial;
        setItems(prev => [...prev, created]);
      }
      setShowForm(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await (adminApi as any).deleteTestimonial(id);
      setItems(prev => prev.filter(t => t.id !== id));
    } catch {
      setError("Delete failed.");
    }
  };

  const handleAvatar = async (id: number, file: File) => {
    setUploading(id);
    try {
      const res = await (adminApi as any).uploadTestimonialAvatar(id, file) as { url: string };
      setItems(prev => prev.map(t => t.id === id ? { ...t, avatar: res.url } : t));
    } catch {
      setError("Avatar upload failed.");
    } finally {
      setUploading(null);
    }
  };

  const s = (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl text-foreground mb-1">Testimonials</h1>
          <p className="font-body text-sm text-muted-foreground">
            {items.length} testimonial{items.length !== 1 ? "s" : ""} — displayed on the homepage
          </p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body font-semibold"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </motion.div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm font-body"
          style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 65%)",
            border: "1px solid hsl(0 70% 50%/0.2)" }}>
          {error}
        </div>
      )}

      {/* Form drawer */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-2xl p-6"
            style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">
                {editing ? "Edit Testimonial" : "New Testimonial"}
              </p>
              <button onClick={() => setShowForm(false)}
                className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                    Name *
                  </label>
                  <input value={form.name} onChange={s("name")} required
                    placeholder="e.g. Sophie & Daniel"
                    className={cls} style={iStyle} onFocus={onF} onBlur={onB} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                    Location
                  </label>
                  <input value={form.location} onChange={s("location")}
                    placeholder="e.g. Germany"
                    className={cls} style={iStyle} onFocus={onF} onBlur={onB} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                  Testimonial *
                </label>
                <textarea value={form.text} onChange={s("text")} required rows={3}
                  placeholder="What did they say about their experience?"
                  className={`${cls} resize-none`} style={iStyle} onFocus={onF} onBlur={onB} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <p className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground mb-1">
                    Rating
                  </p>
                  <Stars value={form.rating} onChange={n => setForm(f => ({ ...f, rating: n }))} />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only"
                      checked={form.featured}
                      onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
                    <div className="w-9 h-5 rounded-full transition-all duration-200"
                      style={{ background: form.featured ? "hsl(var(--primary))" : "hsl(var(--border))" }}>
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200"
                        style={{ transform: form.featured ? "translateX(16px)" : "translateX(0)" }} />
                    </div>
                  </div>
                  <span className="text-xs font-body text-muted-foreground">Show on homepage</span>
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-body text-muted-foreground">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body font-semibold"
                  style={{ background: saving ? "hsl(var(--primary)/0.5)" : "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))", cursor: saving ? "not-allowed" : "pointer" }}>
                  {saving
                    ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    : <Save className="w-4 h-4" />}
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="h-24 rounded-2xl animate-pulse"
              style={{ background: "hsl(var(--muted)/0.4)" }} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-body text-muted-foreground text-sm">No testimonials yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((t, i) => {
            const color = nameToColor(t.name);
            return (
              <motion.div key={t.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-4 rounded-2xl p-5"
                style={{ border: "1px solid hsl(var(--border)/0.5)",
                  background: "hsl(var(--muted)/0.15)" }}>

                {/* Drag handle */}
                <GripVertical className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0 cursor-grab" />

                {/* Avatar + upload */}
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden"
                      style={{ border: "2px solid hsl(var(--border)/0.6)" }}>
                      {t.avatar ? (
                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ background: color, fontFamily: '"Playfair Display", serif' }}>
                          {initials(t.name)}
                        </div>
                      )}
                    </div>
                    {/* Spinner overlay when uploading */}
                    {uploading === t.id && (
                      <div className="absolute inset-0 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.5)" }}>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  {/* Always-visible upload button */}
                  <label className="flex items-center gap-1 px-2 py-1 rounded-lg cursor-pointer
                    font-body text-xs transition-colors duration-200"
                    style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "hsl(var(--primary)/0.1)"; e.currentTarget.style.color = "hsl(var(--primary))"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "hsl(var(--muted))"; e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}>
                    <input type="file" accept="image/*" className="sr-only"
                      disabled={uploading === t.id}
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleAvatar(t.id, f); e.target.value = ""; }} />
                    <ImagePlus className="w-3 h-3" />
                    {t.avatar ? "Change" : "Upload"}
                  </label>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-body font-semibold text-sm text-foreground">{t.name}</span>
                    {t.location && (
                      <span className="font-body text-xs text-muted-foreground">· {t.location}</span>
                    )}
                    <Stars value={t.rating} />
                    {!t.featured && (
                      <span className="text-xs font-body px-2 py-0.5 rounded-full"
                        style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {t.text}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => openEdit(t)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "hsl(var(--muted))")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(t.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "hsl(0 70% 50%/0.1)"; e.currentTarget.style.color = "hsl(0 70% 60%)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;