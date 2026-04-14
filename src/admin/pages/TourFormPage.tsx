import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, ImagePlus, X, Eye, EyeOff } from "lucide-react";
import { adminApi, ApiError } from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ItineraryDay { day: number; title: string; desc: string; }

interface TourImage { url: string; public_id: string; }

interface TourForm {
  title: string; slug: string; destination: string; type: string;
  duration: string; price: string; currency: string;
  excerpt: string; description: string;
  departure_location: string; return_location: string;
  published: boolean;
  images: TourImage[];      // array of {url, public_id}
  cover_image: string | null; // URL of the thumbnail
  included: string[]; excluded: string[];
  highlights: string[]; itinerary: ItineraryDay[]; tags: string[];
}

const EMPTY: TourForm = {
  title: "", slug: "", destination: "", type: "GUIDED",
  duration: "", price: "", currency: "USD",
  excerpt: "", description: "",
  departure_location: "", return_location: "",
  published: false, images: [], cover_image: null,
  included: [""], excluded: [""],
  highlights: [""], itinerary: [{ day: 1, title: "", desc: "" }], tags: [""],
};

// Extract URL from image object or plain string
const imgUrl = (img: TourImage | string | null | undefined): string => {
  if (!img) return "";
  if (typeof img === "string") return img;
  return img.url ?? "";
};

const DESTINATIONS = ["Tanzania", "Kenya", "Uganda", "Zanzibar"];
const TOUR_TYPES = [
  { value: "GUIDED",     label: "Guided Safari"  },
  { value: "SELF_DRIVE", label: "Self-Drive"      },
  { value: "MOUNTAIN",   label: "Mountain Climb" },
  { value: "BEACH",      label: "Beach Holiday"  },
  { value: "CAR_RENTAL", label: "Car Rental"     },
];
const CURRENCIES = ["USD", "EUR", "TZS"];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ── Shared input styles ───────────────────────────────────────────────────────

const iCls = "w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200";
const iStyle = {
  background: "hsl(var(--muted)/0.5)",
  border: "1px solid hsl(var(--border)/0.6)",
  color: "hsl(var(--foreground))",
};
const onF = (e: React.FocusEvent<any>) =>
  (e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)");
const onB = (e: React.FocusEvent<any>) =>
  (e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)");

const Input = (p: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...p} className={iCls} style={iStyle} onFocus={onF} onBlur={onB} />
);
const Textarea = (p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...p} className={`${iCls} resize-none`} style={iStyle} onFocus={onF} onBlur={onB} />
);
const Select = (p: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) => (
  <select {...p} className={`${iCls} appearance-none cursor-pointer`} style={iStyle} onFocus={onF} onBlur={onB}>
    {p.children}
  </select>
);

// ── Field wrapper ─────────────────────────────────────────────────────────────

const Field = ({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1 text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
      {label}{required && <span className="text-primary">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs font-body text-muted-foreground/60">{hint}</p>}
  </div>
);

// ── List editor ───────────────────────────────────────────────────────────────

const ListEditor = ({ label, items, onChange, placeholder }: {
  label: string; items: string[]; onChange: (v: string[]) => void; placeholder?: string;
}) => (
  <div className="space-y-2">
    {items.map((item, i) => (
      <div key={i} className="flex items-center gap-2">
        <Input value={item ?? ""} placeholder={placeholder ?? `${label}…`}
          onChange={e => { const a = [...items]; a[i] = e.target.value; onChange(a); }} />
        <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
          style={{ color: "hsl(var(--muted-foreground))" }}
          onMouseEnter={e => { e.currentTarget.style.color = "hsl(0 70% 65%)"; e.currentTarget.style.background = "hsl(0 70% 50%/0.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "hsl(var(--muted-foreground))"; e.currentTarget.style.background = "transparent"; }}>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    ))}
    <button type="button" onClick={() => onChange([...items, ""])}
      className="flex items-center gap-1.5 text-xs font-body px-3 py-2 rounded-lg transition-colors"
      style={{ color: "hsl(var(--primary))", background: "hsl(var(--primary)/0.06)" }}
      onMouseEnter={e => (e.currentTarget.style.background = "hsl(var(--primary)/0.12)")}
      onMouseLeave={e => (e.currentTarget.style.background = "hsl(var(--primary)/0.06)")}>
      + Add {label}
    </button>
  </div>
);

// ── Card wrapper ──────────────────────────────────────────────────────────────

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl p-6 space-y-5"
    style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
    <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">{title}</p>
    {children}
  </div>
);

// ── Image uploader ────────────────────────────────────────────────────────────

const ImageUploader = ({ tourId, images, coverImage, onAdd, onRemove, onSetCover }: {
  tourId: string; images: TourImage[]; coverImage: string | null;
  onAdd: (img: TourImage) => void;
  onRemove: (i: number) => void;
  onSetCover: (url: string) => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const res = await adminApi.uploadTourImage(tourId, file) as any;
      const newImg: TourImage = { url: res.url, public_id: res.public_id ?? "" };
      onAdd(newImg);
      // Auto-set as cover if no cover yet
      if (!coverImage) onSetCover(newImg.url);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Upload failed.";
      setError(msg);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <Card title="Images">
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img, i) => {
            const url = imgUrl(img);
            const isCover = url === coverImage;
            return (
              <div key={i} className="relative group rounded-xl overflow-hidden aspect-video"
                style={{ outline: isCover ? "2px solid hsl(var(--primary))" : "none", outlineOffset: 2 }}>
                <img src={url} alt="" className="w-full h-full object-cover" />
                {/* Cover badge */}
                {isCover && (
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px]
                    font-body font-semibold uppercase tracking-wider"
                    style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                    Cover
                  </div>
                )}
                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                  transition-opacity flex items-center justify-center gap-2">
                  {!isCover && (
                    <button type="button" onClick={() => onSetCover(url)}
                      className="px-2 py-1 rounded text-[10px] font-body font-semibold"
                      style={{ background: "hsl(var(--primary))", color: "white" }}>
                      Set Cover
                    </button>
                  )}
                  <button type="button" onClick={async () => {
                    if (img.public_id) {
                      try { await adminApi.deleteTourImage(tourId, img.public_id); } catch {}
                    }
                    onRemove(i);
                  }}
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(0 70% 50%/0.9)" }}>
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="text-xs font-body" style={{ color: "hsl(0 70% 65%)" }}>{error}</p>}

      {/* Visually hidden input — positioned off-screen so it never causes navigation */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={handleChange}
        style={{ position: "fixed", top: -9999, left: -9999, opacity: 0 }}
      />

      <button
        type="button"
        disabled={uploading}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); fileRef.current?.click(); }}
        className="w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center
          justify-center gap-3 transition-all duration-200"
        style={{ borderColor: "hsl(var(--border)/0.5)" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "hsl(var(--border)/0.5)")}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "hsl(var(--primary)/0.08)" }}>
          {uploading
            ? <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            : <ImagePlus className="w-5 h-5 text-primary" />}
        </div>
        <p className="font-body text-sm font-medium text-foreground">
          {uploading ? "Uploading…" : "Click to upload image"}
        </p>
        <p className="font-body text-xs text-muted-foreground">PNG or JPG, max 10MB</p>
      </button>
    </Card>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const TourFormPage = () => {
  const { id }   = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit   = Boolean(id);

  const [form,    setForm]    = useState<TourForm>(EMPTY);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState("");

  // Load existing tour
  useEffect(() => {
    if (!isEdit || !id) return;
    adminApi.getTour(id).then((data: any) => {
      setForm({
        title:              data.title              ?? "",
        slug:               data.slug               ?? "",
        destination:        data.destination        ?? "",
        type:               data.type               ?? "GUIDED",
        duration:           data.duration_days != null ? String(data.duration_days) : "",
        price:              data.price        != null ? String(data.price)        : "",
        currency:           data.currency           ?? "USD",
        excerpt:            data.excerpt            ?? "",
        description:        data.description        ?? "",
        departure_location: data.departure_location ?? "",
        return_location:    data.return_location    ?? "",
        published:          data.published          ?? false,
        images:             Array.isArray(data.images)
          ? data.images.map((img: any) =>
              typeof img === "string" ? { url: img, public_id: "" } : { url: img.url ?? "", public_id: img.public_id ?? "" }
            ).filter((img: TourImage) => img.url)
          : [],
        cover_image:        data.cover_image ?? (data.images?.[0]?.url ?? data.images?.[0] ?? null),
        included:           data.included?.length   ? data.included   : [""],
        excluded:           data.excluded?.length   ? data.excluded   : [""],
        highlights:         data.highlights?.length ? data.highlights : [""],
        itinerary:          data.itinerary?.length
          ? data.itinerary.map((d: any) => ({ day: d.day ?? 1, title: d.title ?? "", desc: d.desc ?? "" }))
          : [{ day: 1, title: "", desc: "" }],
        tags: data.tags?.length ? data.tags : [""],
      });
    }).catch(e => setError(e instanceof ApiError ? e.message : "Failed to load tour."));
  }, [id, isEdit]);

  // Auto-slug on create
  useEffect(() => {
    if (!isEdit) setForm(f => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, isEdit]);

  const set = (k: keyof TourForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        title:              form.title,
        slug:               form.slug || undefined,
        destination:        form.destination,
        type:               form.type,
        duration_days:      Number(form.duration),
        price:              Number(form.price),
        currency:           form.currency,
        excerpt:            form.excerpt || undefined,
        description:        form.description,
        departure_location: form.departure_location || undefined,
        return_location:    form.return_location    || undefined,
        published:          form.published,
        cover_image:        form.cover_image || undefined,
        included:           form.included.filter(Boolean),
        excluded:           form.excluded.filter(Boolean),
        highlights:         form.highlights.filter(Boolean),
        itinerary:          form.itinerary.filter(d => d.title || d.desc),
        tags:               form.tags.filter(Boolean),
      };

      if (isEdit && id) {
        await adminApi.updateTour(id, payload);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500); // stay on page
      } else {
        const result: any = await adminApi.createTour(payload);
        const newId = result?.id;
        if (newId) {
          navigate(`/admin/tours/${newId}/edit`, { replace: true });
        } else {
          navigate("/admin/tours");
        }
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate("/admin/tours")}
          className="flex items-center gap-2 text-sm font-body mb-5 text-muted-foreground
            hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Tours
        </button>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-2xl text-foreground mb-1">
              {isEdit ? "Edit Tour" : "New Tour"}
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              {isEdit ? form.title : "Fill in the details to create a new tour"}
            </p>
          </div>
          <button type="button"
            onClick={() => setForm(f => ({ ...f, published: !f.published }))}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-body
              font-semibold tracking-wider uppercase transition-all duration-200"
            style={form.published
              ? { background: "hsl(var(--olive)/0.12)", color: "hsl(var(--olive))", border: "1px solid hsl(var(--olive)/0.25)" }
              : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border)/0.5)" }}>
            {form.published ? <><Eye className="w-3.5 h-3.5" /> Published</> : <><EyeOff className="w-3.5 h-3.5" /> Draft</>}
          </button>
        </div>
      </motion.div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm font-body"
          style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 65%)", border: "1px solid hsl(0 70% 50%/0.2)" }}>
          {error}
        </div>
      )}

      <motion.form onSubmit={handleSubmit} className="space-y-6"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>

        {/* Basic info */}
        <Card title="Basic Info">
          <Field label="Title" required>
            <Input value={form.title} onChange={set("title")} placeholder="e.g. Serengeti Migration Safari" required />
          </Field>
          <Field label="URL Slug" hint="Auto-generated. Edit if needed.">
            <Input value={form.slug} onChange={set("slug")} placeholder="serengeti-migration-safari" />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Destination" required>
              <Select value={form.destination} onChange={set("destination")} required>
                <option value="">Select…</option>
                {DESTINATIONS.map(d => <option key={d} value={d.toLowerCase()}>{d}</option>)}
              </Select>
            </Field>
            <Field label="Tour Type" required>
              <Select value={form.type} onChange={set("type")} required>
                {TOUR_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Duration (days)" required>
              <Input type="number" min="1" max="60" value={form.duration} onChange={set("duration")} placeholder="7" required />
            </Field>
            <Field label="Price" required>
              <Input type="number" min="0" value={form.price} onChange={set("price")} placeholder="3200" required />
            </Field>
            <Field label="Currency">
              <Select value={form.currency} onChange={set("currency")}>
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </Select>
            </Field>
          </div>
        </Card>

        {/* Description */}
        <Card title="Description">
          <Field label="Excerpt" hint="Short summary shown on cards">
            <Input value={form.excerpt} onChange={set("excerpt")} placeholder="A brief, enticing summary…" />
          </Field>
          <Field label="Full Description" required>
            <Textarea value={form.description} onChange={set("description")} rows={5}
              placeholder="Describe the tour experience…" required />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Departure Location">
              <Input value={form.departure_location} onChange={set("departure_location")} placeholder="e.g. Arusha, Tanzania" />
            </Field>
            <Field label="Return Location">
              <Input value={form.return_location} onChange={set("return_location")} placeholder="Same as departure" />
            </Field>
          </div>
        </Card>

        {/* Highlights */}
        <Card title="Highlights">
          <ListEditor label="Highlight" items={form.highlights.length ? form.highlights : [""]}
            onChange={v => setForm(f => ({ ...f, highlights: v }))} />
        </Card>

        {/* Itinerary */}
        <Card title="Itinerary">
          {form.itinerary.map((day, i) => (
            <div key={i} className="rounded-xl p-4 space-y-3"
              style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border)/0.4)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-body font-semibold text-foreground">Day {day.day}</span>
                {form.itinerary.length > 1 && (
                  <button type="button"
                    onClick={() => setForm(f => ({
                      ...f,
                      itinerary: f.itinerary.filter((_, j) => j !== i).map((d, k) => ({ ...d, day: k + 1 }))
                    }))}
                    className="text-xs font-body px-2 py-0.5 rounded"
                    style={{ color: "hsl(0 70% 60%)" }}>Remove</button>
                )}
              </div>
              <Input value={day.title ?? ""}
                onChange={e => setForm(f => { const a = [...f.itinerary]; a[i] = { ...a[i], title: e.target.value }; return { ...f, itinerary: a }; })}
                placeholder="Day title e.g. Arrive Arusha, drive to Serengeti" />
              <Textarea value={day.desc ?? ""} rows={2}
                onChange={e => setForm(f => { const a = [...f.itinerary]; a[i] = { ...a[i], desc: e.target.value }; return { ...f, itinerary: a }; })}
                placeholder="What happens this day…" />
            </div>
          ))}
          <button type="button"
            onClick={() => setForm(f => ({ ...f, itinerary: [...f.itinerary, { day: f.itinerary.length + 1, title: "", desc: "" }] }))}
            className="text-xs font-body px-3 py-1.5 rounded-lg"
            style={{ background: "hsl(var(--muted)/0.5)", color: "hsl(var(--primary))" }}>
            + Add Day
          </button>
        </Card>

        {/* Included / Excluded */}
        <Card title="What's Included">
          <ListEditor label="Included item" items={form.included.length ? form.included : [""]}
            onChange={v => setForm(f => ({ ...f, included: v }))} />
          <div className="border-t pt-5" style={{ borderColor: "hsl(var(--border)/0.4)" }}>
            <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground mb-4">Excluded</p>
            <ListEditor label="Excluded item" items={form.excluded.length ? form.excluded : [""]}
              onChange={v => setForm(f => ({ ...f, excluded: v }))} />
          </div>
        </Card>

        {/* Tags */}
        <Card title="Tags">
          <p className="text-xs font-body text-muted-foreground -mt-3">
            Short labels shown on tour cards (e.g. "Big Five", "Family", "Migration")
          </p>
          <ListEditor label="Tag" items={form.tags.length ? form.tags : [""]}
            onChange={v => setForm(f => ({ ...f, tags: v }))} />
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          <button type="button" onClick={() => navigate("/admin/tours")}
            className="px-5 py-3 rounded-xl text-sm font-body text-muted-foreground
              hover:text-foreground transition-colors">
            Cancel
          </button>
          <div className="flex items-center gap-3">
            {saved && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-sm font-body" style={{ color: "hsl(var(--olive))" }}>
                Saved ✓
              </motion.span>
            )}
            <motion.button type="submit" disabled={saving}
              whileHover={!saving ? { scale: 1.01 } : {}}
              whileTap={!saving ? { scale: 0.98 } : {}}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-body
                font-semibold transition-all duration-200"
              style={{
                background: saving ? "hsl(var(--primary)/0.5)" : "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                cursor: saving ? "not-allowed" : "pointer",
              }}>
              {saving
                ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                : <Save className="w-4 h-4" />}
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Tour"}
            </motion.button>
          </div>
        </div>

      </motion.form>

      {/* Image uploader — outside form entirely */}
      {isEdit && id ? (
        <ImageUploader
          tourId={id}
          images={form.images}
          coverImage={form.cover_image}
          onAdd={img => setForm(f => ({ ...f, images: [...f.images, img] }))}
          onRemove={i => setForm(f => {
            const newImages = f.images.filter((_, j) => j !== i);
            const removedUrl = imgUrl(f.images[i]);
            return {
              ...f,
              images: newImages,
              cover_image: f.cover_image === removedUrl
                ? (newImages.length > 0 ? imgUrl(newImages[0]) : null)
                : f.cover_image,
            };
          })}
          onSetCover={url => setForm(f => ({ ...f, cover_image: url }))}
        />
      ) : (
        <div className="rounded-2xl p-5 text-center"
          style={{ border: "1px dashed hsl(var(--border)/0.5)", background: "hsl(var(--muted)/0.15)" }}>
          <p className="font-body text-xs text-muted-foreground">
            Create the tour first, then you can upload images.
          </p>
        </div>
      )}

    </div>
  );
};

export default TourFormPage;