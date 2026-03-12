import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Users, Calendar, Tag, Send, ChevronDown } from "lucide-react";
import { adminApi, ApiError } from "@/lib/api";

// ── Types  ──

interface Quote {
  id: number; first_name: string; last_name: string;
  email: string; phone: string; country: string;
  trip_types: string[]; destinations: string[]; experiences: string[];
  occasions: string[]; accommodation: string;
  adults: number; children: number; arrival_date: string | null;
  message: string; status: string; admin_notes: string; created_at: string;
}

const STATUSES = ["PENDING", "REVIEWED", "RESPONDED", "CONVERTED", "CLOSED"];
const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  PENDING:   { bg: "hsl(38 90% 55% / 0.12)",   color: "hsl(38 90% 55%)"    },
  REVIEWED:  { bg: "hsl(210 80% 60% / 0.12)",  color: "hsl(210 80% 60%)"   },
  RESPONDED: { bg: "hsl(142 70% 50% / 0.12)",  color: "hsl(142 70% 50%)"   },
  CONVERTED: { bg: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" },
  CLOSED:    { bg: "hsl(0 0% 50% / 0.12)",     color: "hsl(0 0% 55%)"      },
};

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-start gap-3 py-3" style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}>
    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
      style={{ background: "hsl(var(--primary)/0.08)" }}>
      <Icon className="w-3.5 h-3.5" style={{ color: "hsl(var(--primary))" }} />
    </div>
    <div>
      <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-0.5">{label}</p>
      <p className="font-body text-sm text-foreground">{value}</p>
    </div>
  </div>
);

const PillList = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-1">
    {items.map(item => (
      <span key={item} className="text-xs font-body px-3 py-1.5 rounded-full"
        style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground)/0.7)", border: "1px solid hsl(var(--border)/0.5)" }}>
        {item}
      </span>
    ))}
  </div>
);

const Skeleton = ({ className }: { className: string }) => (
  <div className={`rounded animate-pulse ${className}`} style={{ background: "hsl(var(--muted)/0.6)" }} />
);

// ── Page  ───

const QuoteDetailPage = () => {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quote,   setQuote]   = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
  const [status,  setStatus]  = useState("");
  const [notes,   setNotes]   = useState("");
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  useEffect(() => {
    if (!id) return;
    adminApi.getQuote(id)
      .then(data => {
        const q = data as Quote;
        setQuote(q);
        setStatus(q.status);
        setNotes(q.admin_notes ?? '');
      })
      .catch(err => setError(err instanceof ApiError ? err.message : 'Failed to load quote.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    if (!id) return;
    setSaving(true);
    try {
      await adminApi.updateQuote(id, { status, admin_notes: notes });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="max-w-5xl space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-24 rounded-2xl" />
        </div>
      </div>
    </div>
  );

  if (error || !quote) return (
    <div className="max-w-5xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-body mb-5"
        style={{ color: "hsl(var(--muted-foreground))" }}>
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <p className="font-body text-sm" style={{ color: "hsl(0 70% 65%)" }}>{error || 'Quote not found.'}</p>
    </div>
  );

  const ss = STATUS_STYLES[status] ?? STATUS_STYLES.PENDING;

  return (
    <div className="space-y-6 max-w-5xl">

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-body mb-5 group transition-colors"
          style={{ color: "hsl(var(--muted-foreground))" }}>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Quotes
        </button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl text-foreground mb-1">
              {quote.first_name} {quote.last_name}
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              Quote #{quote.id} · {new Date(quote.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {saved && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs font-body" style={{ color: "hsl(142 70% 50%)" }}>
                Saved ✓
              </motion.span>
            )}
            <div className="relative">
              <select value={status} onChange={e => setStatus(e.target.value)}
                className="pl-3 pr-8 py-2 rounded-xl text-xs font-body font-semibold
                  outline-none appearance-none cursor-pointer transition-all duration-200"
                style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.color}30` }}>
                {STATUSES.map(s => (
                  <option key={s} value={s}
                    style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                style={{ color: ss.color }} />
            </div>
            <button onClick={handleSave} disabled={saving}
              className="px-4 py-2 rounded-xl text-xs font-body font-semibold
                tracking-wider uppercase transition-all duration-200"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))", opacity: saving ? 0.5 : 1 }}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-5">

          <div className="rounded-2xl p-6"
            style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
            <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-4">Trip Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 divide-y divide-border/20">
              <InfoRow icon={MapPin}   label="Destinations"  value={(quote.destinations ?? []).join(', ') || '—'} />
              <InfoRow icon={Calendar} label="Arrival Date"  value={quote.arrival_date ? new Date(quote.arrival_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'} />
              <InfoRow icon={Users}    label="Group Size"    value={`${quote.adults} adult${quote.adults !== 1 ? 's' : ''}${quote.children ? `, ${quote.children} child${quote.children !== 1 ? 'ren' : ''}` : ''}`} />
              <InfoRow icon={Tag}      label="Accommodation" value={quote.accommodation || '—'} />
            </div>
            <div className="pt-4 space-y-4">
              {(quote.trip_types ?? []).length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-2">Trip Types</p>
                  <PillList items={quote.trip_types} />
                </div>
              )}
              {(quote.experiences ?? []).length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-2">Experiences</p>
                  <PillList items={quote.experiences} />
                </div>
              )}
              {(quote.occasions ?? []).length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-2">Occasion</p>
                  <PillList items={quote.occasions} />
                </div>
              )}
            </div>
          </div>

          {quote.message && (
            <div className="rounded-2xl p-6"
              style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
              <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-3">Client Message</p>
              <p className="font-body text-sm text-foreground/80 leading-relaxed italic">"{quote.message}"</p>
            </div>
          )}

          {/* Admin notes */}
          <div className="rounded-2xl p-6"
            style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
            <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-3">Admin Notes</p>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4}
              placeholder="Internal notes about this quote…"
              className="w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200 resize-none"
              style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border)/0.6)", color: "hsl(var(--foreground))" }}
              onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
              onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
          </div>
        </motion.div>

        {/* Right */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }} className="space-y-4">

          <div className="rounded-2xl p-5"
            style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
            <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-4">Client</p>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-body"
                style={{ background: "hsl(var(--primary)/0.15)", color: "hsl(var(--primary))" }}>
                {quote.first_name.charAt(0)}
              </div>
              <div>
                <p className="font-body font-semibold text-sm text-foreground">
                  {quote.first_name} {quote.last_name}
                </p>
                <p className="font-body text-xs text-muted-foreground">{quote.country || '—'}</p>
              </div>
            </div>
            <div className="space-y-3">
              <a href={`mailto:${quote.email}`}
                className="flex items-center gap-2.5 text-sm font-body group transition-colors"
                style={{ color: "hsl(var(--muted-foreground))" }}>
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate group-hover:text-foreground transition-colors">{quote.email}</span>
              </a>
              {quote.phone && (
                <a href={`tel:${quote.phone}`}
                  className="flex items-center gap-2.5 text-sm font-body group transition-colors"
                  style={{ color: "hsl(var(--muted-foreground))" }}>
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="group-hover:text-foreground transition-colors">{quote.phone}</span>
                </a>
              )}
            </div>
          </div>

          <div className="space-y-2.5">
            <a href={`mailto:${quote.email}?subject=Your Balbina Safaris Quote&body=Dear ${quote.first_name},`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                text-xs font-semibold tracking-widest uppercase font-body transition-all duration-200"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
              <Send className="w-3.5 h-3.5" /> Reply via Email
            </a>
            {quote.phone && (
              <a href={`https://wa.me/${quote.phone.replace(/\D/g, '')}`}
                target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                  text-xs font-semibold tracking-widest uppercase font-body transition-all duration-200"
                style={{ background: "hsl(142 70% 50%/0.12)", color: "hsl(142 70% 50%)", border: "1px solid hsl(142 70% 50%/0.25)" }}>
                WhatsApp Client
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuoteDetailPage;