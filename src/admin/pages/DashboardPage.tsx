import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageSquare, CalendarCheck, TrendingUp,
  DollarSign, ArrowRight, Clock,
} from "lucide-react";
import { adminApi, ApiError } from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Stats {
  quotes:          { total: number; pending: number; converted: number };
  bookings:        { total: number; confirmed: number; pending: number };
  revenue:         { total_usd: number };
  conversion_rate: number;
  recent_quotes:   {
    id: number; first_name: string; last_name: string;
    destinations: string[]; status: string; created_at: string;
  }[];
}

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  PENDING:   { bg: "hsl(38 90% 55% / 0.12)",   color: "hsl(38 90% 55%)",    label: "Pending"   },
  REVIEWED:  { bg: "hsl(210 80% 60% / 0.12)",  color: "hsl(210 80% 60%)",   label: "Reviewed"  },
  RESPONDED: { bg: "hsl(142 70% 50% / 0.12)",  color: "hsl(142 70% 50%)",   label: "Responded" },
  CONVERTED: { bg: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))", label: "Converted" },
  CLOSED:    { bg: "hsl(0 0% 50% / 0.12)",     color: "hsl(0 0% 55%)",      label: "Closed"    },
};

// ── Skeleton loader ───────────────────────────────────────────────────────────

const Skeleton = ({ className }: { className: string }) => (
  <div className={`rounded-lg animate-pulse ${className}`}
    style={{ background: "hsl(var(--muted)/0.6)" }} />
);

// ── Page ──────────────────────────────────────────────────────────────────────

const DashboardPage = () => {
  const [stats,   setStats]   = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    adminApi.getStats()
      .then(data => setStats(data as Stats))
      .catch(err => setError(err instanceof ApiError ? err.message : 'Failed to load stats.'))
      .finally(() => setLoading(false));
  }, []);

  const STAT_CARDS = stats ? [
    { label: "Total Quotes",    value: String(stats.quotes.total),      delta: `${stats.quotes.pending} pending`,   icon: MessageSquare, color: "hsl(var(--primary))"  },
    { label: "Active Bookings", value: String(stats.bookings.confirmed), delta: `${stats.bookings.pending} pending`, icon: CalendarCheck, color: "hsl(142 70% 50%)"    },
    { label: "Conversion Rate", value: `${stats.conversion_rate}%`,     delta: "quote → booking",                   icon: TrendingUp,    color: "hsl(210 80% 60%)"    },
    { label: "Est. Revenue",    value: `$${Math.round(stats.revenue.total_usd / 1000)}k`, delta: "USD collected",  icon: DollarSign,    color: "hsl(38 90% 55%)"     },
  ] : [];

  return (
    <div className="space-y-8 max-w-6xl">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl text-foreground mb-1">Good morning 👋</h1>
        <p className="font-body text-sm text-muted-foreground">
          Here's what's happening with Balbina Safaris today.
        </p>
      </motion.div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm font-body"
          style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 65%)", border: "1px solid hsl(0 70% 50%/0.2)" }}>
          {error}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))
          : STAT_CARDS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl p-5 flex flex-col gap-4"
                style={{ background: "hsl(var(--muted)/0.4)", border: "1px solid hsl(var(--border)/0.6)" }}>
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                    <s.icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <span className="text-xs font-body px-2 py-1 rounded-full"
                    style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                    {s.delta}
                  </span>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-foreground mb-0.5">{s.value}</p>
                  <p className="text-xs font-body uppercase tracking-widest text-muted-foreground">{s.label}</p>
                </div>
              </motion.div>
            ))
        }
      </div>

      {/* Recent quotes */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid hsl(var(--border)/0.6)" }}>

        <div className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid hsl(var(--border)/0.5)", background: "hsl(var(--muted)/0.3)" }}>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-body font-semibold text-sm text-foreground">Recent Quotes</h2>
          </div>
          <Link to="/admin/quotes"
            className="flex items-center gap-1 text-xs font-body"
            style={{ color: "hsl(var(--primary))" }}>
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid hsl(var(--border)/0.4)" }}>
                {["Client", "Destination", "Received", "Status", ""].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-body uppercase tracking-widest"
                    style={{ color: "hsl(var(--muted-foreground))" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <Skeleton className="h-4 w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                : stats?.recent_quotes.map((q, i) => {
                    const ss = STATUS_STYLES[q.status] ?? STATUS_STYLES.PENDING;
                    return (
                      <motion.tr key={q.id}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.05 }}
                        className="group transition-colors duration-150"
                        style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "hsl(var(--muted)/0.3)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center
                              text-xs font-bold font-body flex-shrink-0"
                              style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                              {q.first_name.charAt(0)}
                            </div>
                            <span className="font-body text-sm text-foreground">
                              {q.first_name} {q.last_name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-body text-sm text-muted-foreground">
                            {q.destinations?.[0] ?? '—'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-body text-xs text-muted-foreground">
                            {new Date(q.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-body px-2.5 py-1 rounded-full font-medium"
                            style={{ background: ss.bg, color: ss.color }}>
                            {ss.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link to={`/admin/quotes/${q.id}`}
                            className="text-xs font-body opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: "hsl(var(--primary))" }}>
                            View →
                          </Link>
                        </td>
                      </motion.tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/admin/tours/new"
          className="flex items-center justify-between p-5 rounded-2xl transition-all duration-200 group"
          style={{ background: "hsl(var(--primary)/0.08)", border: "1px solid hsl(var(--primary)/0.2)" }}>
          <div>
            <p className="font-body font-semibold text-sm text-foreground mb-0.5">Add New Tour</p>
            <p className="font-body text-xs text-muted-foreground">Publish a new safari package</p>
          </div>
          <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1 duration-200" />
        </Link>
        <Link to="/admin/quotes"
          className="flex items-center justify-between p-5 rounded-2xl transition-all duration-200 group"
          style={{ background: "hsl(var(--muted)/0.4)", border: "1px solid hsl(var(--border)/0.6)" }}>
          <div>
            <p className="font-body font-semibold text-sm text-foreground mb-0.5">Review Pending Quotes</p>
            <p className="font-body text-xs text-muted-foreground">
              {stats ? `${stats.quotes.pending} quote${stats.quotes.pending !== 1 ? 's' : ''} awaiting response` : '…'}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1 duration-200" />
        </Link>
      </motion.div>
    </div>
  );
};

export default DashboardPage;