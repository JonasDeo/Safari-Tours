import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Save, ImagePlus, X, Eye, EyeOff, Plus, Trash2,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface TourForm {
  title:       string;
  slug:        string;
  destination: string;
  type:        string;
  duration:    string;
  price:       string;
  currency:    string;
  description: string;
  published:   boolean;
  images:      string[];
  included:    string[];
  excluded:    string[];
}

const EMPTY_FORM: TourForm = {
  title: "", slug: "", destination: "", type: "GUIDED",
  duration: "", price: "", currency: "USD",
  description: "", published: false,
  images: [], included: [""], excluded: [""],
};

// Mock existing tour for edit mode — replace with API fetch
const MOCK_TOUR: TourForm = {
  title:       "Serengeti Migration Safari",
  slug:        "serengeti-migration-safari",
  destination: "tanzania",
  type:        "GUIDED",
  duration:    "7",
  price:       "3200",
  currency:    "USD",
  description: "Witness the greatest wildlife spectacle on earth. Seven days tracking the Great Migration across the endless Serengeti plains, with expert guides and luxury tented camp accommodation.",
  published:   true,
  images:      [],
  included:    ["All park fees", "Professional guide", "Luxury tented accommodation", "All meals"],
  excluded:    ["International flights", "Travel insurance", "Personal items"],
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

  const [form,    setForm]    = useState<TourForm>(EMPTY_FORM);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  // Load existing tour in edit mode
  useEffect(() => {
    if (isEdit) {
      // TODO: fetch(`/api/admin/tours/${id}`) then setForm(data)
      setForm(MOCK_TOUR);
    }
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
    // TODO: POST /api/admin/tours  OR  PATCH /api/admin/tours/:id
    await new Promise(r => setTimeout(r, 800)); // mock delay
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate("/admin/tours"); }, 1200);
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

          <Field label="Tour Description" required>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={5}
              required
              placeholder="Describe the tour experience, highlights, and what makes it special…"
              className="w-full px-4 py-3 rounded-xl text-sm font-body outline-none
                transition-all duration-200 resize-none"
              style={inputStyle}
              onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
              onBlur={e  => Object.assign(e.currentTarget.style, blurStyle)}
            />
          </Field>
        </div>

        {/* ── Section: Images ── */}
        <div className="rounded-2xl p-6 space-y-4"
          style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
          <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">
            Images
          </p>

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
              <p className="font-body text-sm text-foreground font-medium">Upload images</p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                PNG, JPG up to 10MB · Cloudinary integration coming in backend phase
              </p>
            </div>
          </div>
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