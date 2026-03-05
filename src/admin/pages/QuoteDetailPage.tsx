import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Users, Calendar, Tag, Send, ChevronDown } from "lucide-react";

// ── Mock data — replace with API call ─────────────────────────────────────────

const MOCK_QUOTE = {
  id:            "q_001",
  firstName:     "Sarah",
  lastName:      "Mitchell",
  email:         "sarah@example.com",
  phone:         "+1 555 234 5678",
  country:       "United States",
  tripTypes:     ["Guided Safari"],
  destinations:  ["Tanzania"],
  experiences:   ["Big Five", "Sunrise Drive", "Bush Walk"],
  occasions:     ["Honeymoon"],
  accommodation: "Luxury Tented Camp",
  adults:        2,
  children:      0,
  arrivalDate:   "2026-07-15",
  message:       "We're celebrating our honeymoon and would love a romantic, private experience. Very interested in the Serengeti during the Migration season if possible.",
  status:        "PENDING",
  createdAt:     "2026-03-05T08:32:00Z",
};

const STATUSES = ["PENDING", "REVIEWED", "RESPONDED", "CONVERTED", "CLOSED"];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  PENDING:   { bg: "hsl(38 90% 55% / 0.12)",   color: "hsl(38 90% 55%)"    },
  REVIEWED:  { bg: "hsl(210 80% 60% / 0.12)",  color: "hsl(210 80% 60%)"   },
  RESPONDED: { bg: "hsl(142 70% 50% / 0.12)",  color: "hsl(142 70% 50%)"   },
  CONVERTED: { bg: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" },
  CLOSED:    { bg: "hsl(0 0% 50% / 0.12)",     color: "hsl(0 0% 55%)"      },
};

// ── Sub-components ─────────────────────────────────────────────────────────────

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-start gap-3 py-3"
    style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}>
    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
      style={{ background: "hsl(var(--primary)/0.08)" }}>
      <Icon className="w-3.5 h-3.5" style={{ color: "hsl(var(--primary))" }} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-0.5">{label}</p>
      <p className="font-body text-sm text-foreground break-words">{value}</p>
    </div>
  </div>
);

const PillList = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-1">
    {items.map(item => (
      <span key={item} className="text-xs font-body px-3 py-1.5 rounded-full"
        style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground)/0.7)",
          border: "1px solid hsl(var(--border)/0.5)" }}>
        {item}
      </span>
    ))}
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

const QuoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quote = MOCK_QUOTE; // Replace: const { data: quote } = useQuery(["quote", id], ...)

  const [status, setStatus] = useState(quote.status);
  const [saved,  setSaved]  = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    // TODO: PATCH /api/admin/quotes/:id { status: newStatus }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const ss = STATUS_STYLES[status] ?? STATUS_STYLES.PENDING;

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Back + header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-body mb-5 transition-colors group"
          style={{ color: "hsl(var(--muted-foreground))" }}>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
          Back to Quotes
        </button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl text-foreground mb-1">
              {quote.firstName} {quote.lastName}
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              Quote #{quote.id} · Submitted {new Date(quote.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          {/* Status selector */}
          <div className="flex items-center gap-3">
            {saved && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs font-body" style={{ color: "hsl(142 70% 50%)" }}>
                Saved ✓
              </motion.span>
            )}
            <div className="relative">
              <select
                value={status}
                onChange={e => handleStatusChange(e.target.value)}
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
          </div>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left — trip details */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-5">

          {/* Trip summary card */}
          <div className="rounded-2xl p-6"
            style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
            <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-4">
              Trip Details
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 divide-y divide-border/20">
              <InfoRow icon={MapPin}    label="Destinations"   value={quote.destinations.join(", ")} />
              <InfoRow icon={Calendar}  label="Arrival Date"   value={new Date(quote.arrivalDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} />
              <InfoRow icon={Users}     label="Group Size"     value={`${quote.adults} adults${quote.children ? `, ${quote.children} children` : ""}`} />
              <InfoRow icon={Tag}       label="Accommodation"  value={quote.accommodation} />
            </div>

            <div className="pt-4 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-2">Trip Types</p>
                <PillList items={quote.tripTypes} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-2">Experiences</p>
                <PillList items={quote.experiences} />
              </div>
              {quote.occasions.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-2">Occasion</p>
                  <PillList items={quote.occasions} />
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          {quote.message && (
            <div className="rounded-2xl p-6"
              style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
              <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-3">
                Client Message
              </p>
              <p className="font-body text-sm text-foreground/80 leading-relaxed italic">
                "{quote.message}"
              </p>
            </div>
          )}
        </motion.div>

        {/* Right — client + actions */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }} className="space-y-4">

          {/* Client card */}
          <div className="rounded-2xl p-5"
            style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
            <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-4">
              Client
            </p>

            {/* Avatar */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center
                text-sm font-bold font-body"
                style={{ background: "hsl(var(--primary)/0.15)", color: "hsl(var(--primary))" }}>
                {quote.firstName.charAt(0)}
              </div>
              <div>
                <p className="font-body font-semibold text-sm text-foreground">
                  {quote.firstName} {quote.lastName}
                </p>
                <p className="font-body text-xs text-muted-foreground">{quote.country}</p>
              </div>
            </div>

            <div className="space-y-3">
              <a href={`mailto:${quote.email}`}
                className="flex items-center gap-2.5 text-sm font-body transition-colors group"
                style={{ color: "hsl(var(--muted-foreground))" }}>
                <Mail className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-primary transition-colors" />
                <span className="truncate group-hover:text-foreground transition-colors">{quote.email}</span>
              </a>
              <a href={`tel:${quote.phone}`}
                className="flex items-center gap-2.5 text-sm font-body transition-colors group"
                style={{ color: "hsl(var(--muted-foreground))" }}>
                <Phone className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-primary transition-colors" />
                <span className="group-hover:text-foreground transition-colors">{quote.phone}</span>
              </a>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2.5">
            <a href={`mailto:${quote.email}?subject=Your Balbina Safaris Quote&body=Dear ${quote.firstName},`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                text-xs font-semibold tracking-widest uppercase font-body transition-all duration-200"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
              <Send className="w-3.5 h-3.5" /> Reply via Email
            </a>
            <a href={`https://wa.me/${quote.phone.replace(/\D/g, "")}`}
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                text-xs font-semibold tracking-widest uppercase font-body transition-all duration-200"
              style={{ background: "hsl(142 70% 50% / 0.12)", color: "hsl(142 70% 50%)",
                border: "1px solid hsl(142 70% 50% / 0.25)" }}>
              WhatsApp Client
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuoteDetailPage;
