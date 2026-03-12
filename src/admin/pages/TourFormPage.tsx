import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Save, ImagePlus, X, Eye, EyeOff, Plus, Trash2,
} from "lucide-react";
import { adminApi, ApiError } from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ItineraryDay {
  day:   number;
  title: string;
  desc:  string;
}

interface TourForm {
  title:              string;
  slug:               string;
  destination:        string;
  type:               string;
  duration:           string;
  price:              string;
  currency:           string;
  excerpt:            string;
  description:        string;
  departure_location: string;
  return_location:    string;
  published:          boolean;
  images:             string[];
  included:           string[];
  excluded:           string[];
  highlights:         string[];
  itinerary:          ItineraryDay[];
  tags:               string[];
}

const EMPTY_FORM: TourForm = {
  title: "", slug: "", destination: "", type: "GUIDED",
  duration: "", price: "", currency: "USD",
  excerpt: "", description: "",
  departure_location: "", return_location: "",
  published: false,
  images: [], included: [""], excluded: [""],
  highlights: [""],
  itinerary: [{ day: 1, title: "", desc: "" }],
  tags: [""],
};


const DESTINATIONS = ["Tanzania", "Kenya", "Uganda", "Zanzibar"];
const TOUR_TYPES   = [
  { value: "GUIDED",     label: "Guided Safari"   },
  { value: "SELF_DRIVE", label: "Self-Drive"       },
  { value: "MOUNTAIN",   label: "Mountain Climb"  },
  { value: "BEACH",      label: "Beach Holiday"   },
];
const CURRENCIES = ["USD", "EUR", "TZS"];

// ── Helpers ───────────────────────────────────────────────────────────────────

const slugify = (str: string) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ── Sub-components ─────────────────────────────────────────────────────────────

const Field = ({
  label, required = false, hint, children,
}: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-body"
      style={{ color: "hsl(var(--muted-foreground))" }}>
      {label}
      {required && <span style={{ color: "hsl(var(--primary))" }}>*</span>}
    </label>
    {children}
    {hint && <p className="text-xs font-body" style={{ color: "hsl(var(--muted-foreground)/0.6)" }}>{hint}</p>}
  </div>
);

const inputCls = `w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200`;
const inputStyle = {
  background: "hsl(var(--muted)/0.5)",
  border:     "1px solid hsl(var(--border)/0.6)",
  color:      "hsl(var(--foreground))",
};
const focusStyle  = { borderColor: "hsl(var(--primary)/0.5)" };
const blurStyle   = { borderColor: "hsl(var(--border)/0.6)"  };

const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={inputCls} style={inputStyle}
    onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
    onBlur={e  => Object.assign(e.currentTarget.style, blurStyle)} />
);

const SelectInput = (props: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) => (
  <select {...props} className={`${inputCls} appearance-none cursor-pointer`} style={inputStyle}
    onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
    onBlur={e  => Object.assign(e.currentTarget.style, blurStyle)}>
    {props.children}
  </select>
);

// ── List editor (included / excluded) ────────────────────────────────────────

const ListEditor = ({
  label, items, onChange,
}: { label: string; items: string[]; onChange: (items: string[]) => void }) => {
  const update = (i: number, val: string) => {
    const next = [...items]; next[i] = val; onChange(next);
  };
  const add    = () => onChange([...items, ""]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <Field label={label}>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <TextInput value={item} placeholder={`${label} item…`}
              onChange={e => update(i, e.target.value)} />
            <button type="button" onClick={() => remove(i)}
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                transition-colors duration-200"
              style={{ color: "hsl(var(--muted-foreground))" }}
              onMouseEnter={e => { e.currentTarget.style.color = "hsl(0 70% 65%)"; e.currentTarget.style.background = "hsl(0 70% 50%/0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "hsl(var(--muted-foreground))"; e.currentTarget.style.background = "transparent"; }}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button type="button" onClick={add}
          className="flex items-center gap-2 text-xs font-body px-3 py-2 rounded-lg
            transition-all duration-200"
          style={{ color: "hsl(var(--primary))", background: "hsl(var(--primary)/0.06)" }}
          onMouseEnter={e => e.currentTarget.style.background = "hsl(var(--primary)/0.12)"}
          onMouseLeave={e => e.currentTarget.style.background = "hsl(var(--primary)/0.06)"}>
          <Plus className="w-3.5 h-3.5" /> Add item
        </button>
      </div>
    </Field>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const TourFormPage = () => {
  const { id }   = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit   = Boolean(id);

  const [form,           setForm]           = useState<TourForm>(EMPTY_FORM);
  const [saving,         setSaving]         = useState(false);
  const [saved,          setSaved]          = useState(false);
  const [error,          setError]          = useState("");
  const [savedId,        setSavedId]        = useState<string | null>(null);
  const [uploadingImg,   setUploadingImg]   = useState(false);
  const [uploadError,    setUploadError]    = useState("");

  // Load existing tour in edit mode
  useEffect(() => {
    if (!isEdit || !id) return;
    adminApi.getTour(id)
      .then(data => {
        const t = data as any;
        setForm({
          title:              t.title              ?? "",
          slug:               t.slug               ?? "",
          destination:        t.destination        ?? "",
          type:               t.type               ?? "GUIDED",
          duration:           String(t.duration_days ?? ""),
          price:              String(t.price         ?? ""),
          currency:           t.currency           ?? "USD",
          excerpt:            t.excerpt            ?? "",
          description:        t.description        ?? "",
          departure_location: t.departure_location ?? "",
          return_location:    t.return_location    ?? "",
          published:          t.published          ?? false,
          images:             t.images             ?? [],
          included:           t.included?.length   ? t.included   : [""],
          excluded:           t.excluded?.length   ? t.excluded   : [""],
          highlights:         t.highlights?.length ? t.highlights : [""],
          itinerary:          t.itinerary?.length  ? t.itinerary  : [{ day: 1, title: "", desc: "" }],
          tags:               t.tags?.length       ? t.tags       : [""],
        });
      })
      .catch(err => setError(err instanceof ApiError ? err.message : "Failed to load tour."));
  }, [id, isEdit]);

  // Auto-generate slug from title (only when creating)
  useEffect(() => {
    if (!isEdit) setForm(f => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, isEdit]);

  const set = (key: keyof TourForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
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
      included:           form.included.filter(Boolean),
      excluded:           form.excluded.filter(Boolean),
      highlights:         form.highlights.filter(Boolean),
      itinerary:          form.itinerary.filter(d => d.title || d.desc),
      tags:               form.tags.filter(Boolean),
    };
    try {
      let result: any;
      if (isEdit && id) {
        result = await adminApi.updateTour(id, payload);
      } else {
        result = await adminApi.createTour(payload);
      }
      setSaved(true);
      if (!isEdit) {
        // After create, ID comes back — stay on page so images can be uploaded
        const newId = (result as any)?.id;
        if (newId) setSavedId(String(newId));
        else setTimeout(() => { setSaved(false); navigate("/admin/tours"); }, 1200);
      } else {
        setTimeout(() => { setSaved(false); navigate("/admin/tours"); }, 1200);
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
          Back to Tours
        </button>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-2xl text-foreground mb-1">
              {isEdit ? "Edit Tour" : "New Tour"}
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              {isEdit ? `Editing: ${form.title}` : "Fill in the details to create a new tour package"}
            </p>
          </div>

          {/* Publish toggle */}
          <button type="button"
            onClick={() => setForm(f => ({ ...f, published: !f.published }))}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-body
              font-semibold tracking-wider uppercase transition-all duration-200"
            style={form.published
              ? { background: "hsl(142 70% 50% / 0.12)", color: "hsl(142 70% 50%)", border: "1px solid hsl(142 70% 50% / 0.25)" }
              : { background: "hsl(var(--muted))",        color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border)/0.5)" }}>
            {form.published
              ? <><Eye    className="w-3.5 h-3.5" /> Published</>
              : <><EyeOff className="w-3.5 h-3.5" /> Draft</>}
          </button>
        </div>
      </motion.div>

      {/* Form */}
      {error && (
        <div className="rounded-xl px-4 py-3 text-sm font-body"
          style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 65%)", border: "1px solid hsl(0 70% 50%/0.2)" }}>
          {error}
        </div>
      )}

      <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="space-y-6">

        {/* ── Section: Basic info ── */}
        <div className="rounded-2xl p-6 space-y-5"
          style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
          <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">
            Basic Info
          </p>

          <Field label="Tour Title" required>
            <TextInput value={form.title} onChange={set("title")}
              placeholder="e.g. Serengeti Migration Safari" required />
          </Field>

          <Field label="URL Slug" hint="Auto-generated from title. Edit if needed.">
            <TextInput value={form.slug} onChange={set("slug")}
              placeholder="serengeti-migration-safari" />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Destination" required>
              <SelectInput value={form.destination} onChange={set("destination")} required>
                <option value="">Select destination…</option>
                {DESTINATIONS.map(d => (
                  <option key={d} value={d.toLowerCase()}>{d}</option>
                ))}
              </SelectInput>
            </Field>

            <Field label="Tour Type" required>
              <SelectInput value={form.type} onChange={set("type")} required>
                {TOUR_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </SelectInput>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Duration (days)" required>
              <TextInput type="number" min="1" max="60"
                value={form.duration} onChange={set("duration")}
                placeholder="7" required />
            </Field>

            <Field label="Price" required>
              <TextInput type="number" min="0"
                value={form.price} onChange={set("price")}
                placeholder="3200" required />
            </Field>

            <Field label="Currency">
              <SelectInput value={form.currency} onChange={set("currency")}>
                {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
              </SelectInput>
            </Field>
          </div>
        </div>

        {/* ── Section: Description ── */}
        <div className="rounded-2xl p-6 space-y-5"
          style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
          <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">
            Description
          </p>

          <Field label="Short Excerpt" hint="1–2 sentence summary shown on tour cards">
            <TextInput
              value={form.excerpt} onChange={set("excerpt")}
              placeholder="A brief, enticing summary of the tour…" />
          </Field>

          <Field label="Full Description" required>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={5}
              required
              placeholder="Describe the tour experience in detail…"
              className="w-full px-4 py-3 rounded-xl text-sm font-body outline-none
                transition-all duration-200 resize-none"
              style={inputStyle}
              onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
              onBlur={e  => Object.assign(e.currentTarget.style, blurStyle)}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Departure Location">
              <TextInput value={form.departure_location} onChange={set("departure_location")}
                placeholder="e.g. Arusha, Tanzania" />
            </Field>
            <Field label="Return Location">
              <TextInput value={form.return_location} onChange={set("return_location")}
                placeholder="Same as departure if same" />
            </Field>
          </div>
        </div>

        {/* ── Section: Highlights ── */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
          <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">
            Highlights
          </p>
          {form.highlights.map((h, i) => (
            <div key={i} className="flex gap-2">
              <TextInput value={h}
                onChange={e => setForm(f => { const a = [...f.highlights]; a[i] = e.target.value; return { ...f, highlights: a }; })}
                placeholder={`Highlight ${i + 1}…`} />
              {form.highlights.length > 1 && (
                <button type="button"
                  onClick={() => setForm(f => ({ ...f, highlights: f.highlights.filter((_, j) => j !== i) }))}
                  className="px-2 rounded-lg text-xs font-body flex-shrink-0"
                  style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 60%)" }}>✕</button>
              )}
            </div>
          ))}
          <button type="button"
            onClick={() => setForm(f => ({ ...f, highlights: [...f.highlights, ""] }))}
            className="text-xs font-body px-3 py-1.5 rounded-lg"
            style={{ background: "hsl(var(--muted)/0.5)", color: "hsl(var(--primary))" }}>
            + Add Highlight
          </button>
        </div>

        {/* ── Section: Itinerary ── */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
          <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">
            Itinerary
          </p>
          {form.itinerary.map((day, i) => (
            <div key={i} className="rounded-xl p-4 space-y-3"
              style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border)/0.4)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-body font-semibold text-foreground">Day {day.day}</span>
                {form.itinerary.length > 1 && (
                  <button type="button"
                    onClick={() => setForm(f => ({ ...f, itinerary: f.itinerary.filter((_, j) => j !== i).map((d, k) => ({ ...d, day: k + 1 })) }))}
                    className="text-xs font-body px-2 py-0.5 rounded"
                    style={{ color: "hsl(0 70% 60%)" }}>Remove</button>
                )}
              </div>
              <TextInput value={day.title}
                onChange={e => setForm(f => { const a = [...f.itinerary]; a[i] = { ...a[i], title: e.target.value }; return { ...f, itinerary: a }; })}
                placeholder="Day title e.g. Arrive Arusha, transfer to Serengeti" />
              <textarea value={day.desc} rows={2}
                onChange={e => setForm(f => { const a = [...f.itinerary]; a[i] = { ...a[i], desc: e.target.value }; return { ...f, itinerary: a }; })}
                placeholder="What happens this day…"
                className="w-full px-4 py-3 rounded-xl text-sm font-body outline-none resize-none transition-all"
                style={inputStyle}
                onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
                onBlur={e  => Object.assign(e.currentTarget.style, blurStyle)} />
            </div>
          ))}
          <button type="button"
            onClick={() => setForm(f => ({ ...f, itinerary: [...f.itinerary, { day: f.itinerary.length + 1, title: "", desc: "" }] }))}
            className="text-xs font-body px-3 py-1.5 rounded-lg"
            style={{ background: "hsl(var(--muted)/0.5)", color: "hsl(var(--primary))" }}>
            + Add Day
          </button>
        </div>

        {/* ── Section: Includes & Excludes ── */}

        {/* ── Section: Images ── */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
          <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">
            Images
          </p>

          {/* Existing images */}
          {form.images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-3">
              {form.images.map((url, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden aspect-video">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button type="button"
                    onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "hsl(0 70% 50%/0.9)" }}>
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploadError && (
            <p className="text-xs font-body mb-2" style={{ color: "hsl(0 70% 65%)" }}>{uploadError}</p>
          )}

          {(!isEdit && !savedId) ? (
            <p className="text-xs font-body text-muted-foreground p-4 rounded-xl text-center"
              style={{ background: "hsl(var(--muted)/0.4)", border: "1px dashed hsl(var(--border)/0.5)" }}>
              Save the tour first, then you can upload images.
            </p>
          ) : (
            <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center
              justify-center gap-3 cursor-pointer transition-all duration-200 text-center block"
              style={{ borderColor: uploadingImg ? "hsl(var(--primary)/0.6)" : "hsl(var(--border)/0.5)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--primary)/0.4)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = uploadingImg ? "hsl(var(--primary)/0.6)" : "hsl(var(--border)/0.5)"}>
              <input type="file" accept="image/*" className="sr-only" disabled={uploadingImg}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const tourId = savedId ?? id;
                  if (!tourId) return;
                  setUploadingImg(true);
                  setUploadError("");
                  try {
                    const res = await adminApi.uploadTourImage(tourId, file) as any;
                    setForm(f => ({ ...f, images: [...f.images, res.url] }));
                  } catch {
                    setUploadError("Upload failed. Check file size (max 10MB) and try again.");
                  } finally {
                    setUploadingImg(false);
                    e.target.value = "";
                  }
                }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(var(--primary)/0.08)" }}>
                {uploadingImg
                  ? <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  : <ImagePlus className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />}
              </div>
              <div>
                <p className="font-body text-sm text-foreground font-medium">
                  {uploadingImg ? "Uploading…" : "Click to upload images"}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  PNG, JPG up to 10MB — uploads to Cloudinary
                </p>
              </div>
            </label>
          )}
        </div>

        {/* ── Section: Included / Excluded ── */}
        <div className="rounded-2xl p-6 space-y-6"
          style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
          <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">
            What's Included
          </p>

          <ListEditor label="Included"
            items={form.included}
            onChange={items => setForm(f => ({ ...f, included: items }))} />

          <div className="border-t pt-5" style={{ borderColor: "hsl(var(--border)/0.4)" }}>
            <ListEditor label="Excluded"
              items={form.excluded}
              onChange={items => setForm(f => ({ ...f, excluded: items }))} />
          </div>
        </div>

        {/* ── Section: Tags ── */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
          <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">
            Tags
          </p>
          <p className="text-xs font-body text-muted-foreground -mt-2">
            Short labels shown on tour cards (e.g. "Wildlife", "Big Five", "Family")
          </p>
          {form.tags.map((tag, i) => (
            <div key={i} className="flex gap-2">
              <TextInput value={tag}
                onChange={e => setForm(f => { const a = [...f.tags]; a[i] = e.target.value; return { ...f, tags: a }; })}
                placeholder={`Tag ${i + 1}…`} />
              {form.tags.length > 1 && (
                <button type="button"
                  onClick={() => setForm(f => ({ ...f, tags: f.tags.filter((_, j) => j !== i) }))}
                  className="px-2 rounded-lg text-xs font-body flex-shrink-0"
                  style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 60%)" }}>✕</button>
              )}
            </div>
          ))}
          <button type="button"
            onClick={() => setForm(f => ({ ...f, tags: [...f.tags, ""] }))}
            className="text-xs font-body px-3 py-1.5 rounded-lg"
            style={{ background: "hsl(var(--muted)/0.5)", color: "hsl(var(--primary))" }}>
            + Add Tag
          </button>
        </div>

        {/* ── Submit ── */}
        <div className="flex items-center justify-between pt-2">
          <button type="button" onClick={() => navigate(-1)}
            className="px-5 py-3 rounded-xl text-sm font-body transition-colors duration-200"
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
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={!saving ? { scale: 1.01 } : {}}
              whileTap={!saving ? { scale: 0.98 } : {}}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-body
                font-semibold tracking-wide transition-all duration-200"
              style={{
                background: saving ? "hsl(var(--primary)/0.5)" : "hsl(var(--primary))",
                color: "hsl(var(--dark))",
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
    </div>
  );
};

export default TourFormPage;