import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageSquare, CalendarCheck, TrendingUp,
  DollarSign, ArrowRight, Clock, Zap,
  MapPin, Timer, PlusCircle, BarChart2,
  AlertTriangle, AlertCircle,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import { adminApi, ApiError } from "@/lib/api";

// ── Types  ──

interface Stats {
  quotes:          { total: number; pending: number; responded: number; converted: number; closed: number };
  bookings:        { total: number; confirmed: number; pending: number; trend?: { date: string; count: number }[] };
  revenue:         { total_usd: number; this_month_usd?: number };
  conversion_rate: number;
  tours:           { total: number; published: number };
  blog:            { total: number; published: number };
  avg_response_minutes?: number;
  pipeline_value_usd?:   number;
  top_destination?:      { name: string; bookings: number };
  avg_booking_value_usd?: number;
  recent_quotes:   {
    id: number; first_name: string; last_name: string;
    destinations: string[]; status: string; created_at: string;
  }[];
}

type StatCardDef = {
  label: string; value: string | number; delta: string;
  icon: React.ElementType; color: string;
};

type PipelineCardDef = {
  label: string; value: string; sub: string;
  icon: React.ElementType; color: string; empty?: boolean;
};

// ── Constants  ─────────

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  PENDING:   { bg: "hsl(38 90% 55% / 0.12)",   color: "hsl(38 90% 55%)",    label: "Pending"   },
  REVIEWED:  { bg: "hsl(210 80% 60% / 0.12)",  color: "hsl(210 80% 60%)",   label: "Reviewed"  },
  RESPONDED: { bg: "hsl(142 70% 50% / 0.12)",  color: "hsl(142 70% 50%)",   label: "Responded" },
  CONVERTED: { bg: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))", label: "Converted" },
  CLOSED:    { bg: "hsl(0 0% 50% / 0.12)",     color: "hsl(0 0% 55%)",      label: "Closed"    },
};

// ── Pure builder functions ────────────────────────────────────────────────────

const buildStatCards = (stats: Stats): StatCardDef[] => [
  {
    label: "Total Quotes",
    value: stats.quotes.total,
    delta: `${stats.quotes.pending} pending`,
    icon:  MessageSquare,
    color: "hsl(var(--primary))",
  },
  {
    label: "Active Bookings",
    value: stats.bookings.confirmed,
    delta: `${stats.bookings.pending} pending`,
    icon:  CalendarCheck,
    color: "hsl(142 70% 50%)",
  },
  {
    label: "Conversion Rate",
    value: `${stats.conversion_rate}%`,
    delta: "quote → booking",
    icon:  TrendingUp,
    color: "hsl(210 80% 60%)",
  },
  {
    label: "Revenue This Month",
    value: `$${((stats.revenue.this_month_usd ?? stats.revenue.total_usd) / 1000).toFixed(1)}k`,
    delta: "confirmed",
    icon:  DollarSign,
    color: "hsl(38 90% 55%)",
  },
];

const buildPipelineCards = (stats: Stats): PipelineCardDef[] => [
  {
    label: "Quote Pipeline",
    value: stats.pipeline_value_usd != null
      ? `$${(stats.pipeline_value_usd / 1000).toFixed(1)}k`
      : " -",
    sub:   stats.pipeline_value_usd != null
      ? `${stats.quotes.pending} pending quotes`
      : "No quotes received",
    icon:  Zap,
    color: "hsl(var(--primary))",
    empty: stats.pipeline_value_usd == null,
  },
  {
    label: "Avg Response Time",
    value: stats.avg_response_minutes != null
      ? formatMinutes(stats.avg_response_minutes)
      : " -",
    sub:   stats.avg_response_minutes != null ? "to first reply" : "No responses recorded",
    icon:  Timer,
    color: "hsl(142 70% 50%)",
    empty: stats.avg_response_minutes == null,
  },
  {
    label: "Top Destination",
    value: stats.top_destination?.name ?? " -",
    sub:   stats.top_destination
      ? `${stats.top_destination.bookings} bookings`
      : "No bookings yet",
    icon:  MapPin,
    color: "hsl(210 80% 60%)",
    empty: stats.top_destination == null,
  },
  {
    label: "Avg Booking Value",
    value: stats.avg_booking_value_usd != null
      ? `$${(stats.avg_booking_value_usd / 1000).toFixed(1)}k`
      : " -",
    sub:   stats.avg_booking_value_usd != null ? "per confirmed tour" : "No bookings yet",
    icon:  BarChart2,
    color: "hsl(38 90% 55%)",
    empty: stats.avg_booking_value_usd == null,
  },
];

// ── Helpers  

const formatMinutes = (mins: number) => {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
};

const formatTrendDate = (raw: string) =>
  new Date(raw).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

const ageMinutes = (created_at: string) =>
  Math.floor((Date.now() - new Date(created_at).getTime()) / 60_000);

const getUrgency = (status: string, created_at: string) => {
  if (status?.toUpperCase() !== "PENDING") return null;
  const age = ageMinutes(created_at);
  if (age <= 30)  return { icon: AlertCircle,   color: "hsl(0 80% 60%)",   label: "Reply urgently" };
  if (age <= 120) return { icon: AlertTriangle,  color: "hsl(38 90% 55%)", label: "Waiting for response" };
  return null;
};

const formatAge = (created_at: string) => {
  const mins = ageMinutes(created_at);
  if (mins < 60)        return `${mins}m ago`;
  if (mins < 60 * 24)  return `${Math.floor(mins / 60)}h ago`;
  return new Date(created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

// ── Shared components  ─

const Skeleton = ({ className }: { className: string }) => (
  <div className={`rounded-lg animate-pulse ${className}`}
    style={{ background: "hsl(var(--muted)/0.6)" }} />
);

const StatCard = ({ label, value, delta, icon: Icon, color, delay }: StatCardDef & { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="rounded-2xl p-5 flex flex-col gap-3"
    style={{ background: "hsl(var(--muted)/0.4)", border: "1px solid hsl(var(--border)/0.6)" }}>
    <div className="flex items-center justify-between">
      <p className="text-xs font-body uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ background: `${color}18` }}>
        <Icon className="w-3.5 h-3.5" style={{ color }} />
      </div>
    </div>
    <p className="font-display text-3xl font-bold text-foreground">{value}</p>
    <span className="text-xs font-body px-2 py-0.5 rounded-full w-fit"
      style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
      {delta}
    </span>
  </motion.div>
);

const PipelineCard = ({ label, value, sub, icon: Icon, color, empty, delay }: PipelineCardDef & { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="rounded-2xl p-4 flex items-center gap-4"
    style={{ background: "hsl(var(--muted)/0.25)", border: "1px solid hsl(var(--border)/0.4)" }}>
    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}18`, border: `1px solid ${color}28` }}>
      <Icon className="w-4 h-4" style={{ color: empty ? "hsl(var(--muted-foreground))" : color }} />
    </div>
    <div className="min-w-0">
      <p className="font-body text-xs text-muted-foreground truncate">{label}</p>
      <p className={`font-display text-lg font-bold leading-tight truncate ${empty ? "text-muted-foreground" : "text-foreground"}`}>
        {value}
      </p>
      <p className="font-body text-xs text-muted-foreground truncate">{sub}</p>
    </div>
  </motion.div>
);

// ── Section components  

const QuoteStatusBar = ({ stats }: { stats: Stats }) => {
  const total = stats.quotes.total || 1;
  const bars = [
    { label: "Pending",   count: stats.quotes.pending,    color: "hsl(38 90% 55%)"     },
    { label: "Responded", count: stats.quotes.responded,   color: "hsl(142 70% 50%)"    },
    { label: "Converted", count: stats.quotes.converted,   color: "hsl(var(--primary))" },
    { label: "Closed",    count: stats.quotes.closed ?? 0, color: "hsl(0 0% 50%)"       },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="rounded-2xl p-5"
      style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.3)" }}>
      <h2 className="font-body font-semibold text-sm text-foreground mb-4">Quote Status Breakdown</h2>
      <div className="space-y-3">
        {bars.map(b => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="font-body text-xs text-muted-foreground w-20 shrink-0">{b.label}</span>
            <div className="flex-1 h-2 rounded-full overflow-hidden"
              style={{ background: "hsl(var(--muted))" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(b.count / total) * 100}%` }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: b.color }} />
            </div>
            <span className="font-body text-xs font-semibold text-foreground w-6 text-right">{b.count}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const BookingsTrendChart = ({ trend }: { trend: { date: string; count: number }[] }) => {
  const formatted = useMemo(
    () => trend.map(d => ({ ...d, date: formatTrendDate(d.date) })),
    [trend],
  );
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl p-5"
      style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.3)" }}>
      <h2 className="font-body font-semibold text-sm text-foreground mb-4">Bookings — Last 30 Days</h2>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={formatted} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.3)" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8, fontSize: 12, fontFamily: "inherit",
            }}
            labelStyle={{ color: "hsl(var(--muted-foreground))" }}
            itemStyle={{ color: "hsl(var(--primary))" }}
          />
          <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))"
            strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

// ── Page  ───

const DashboardPage = () => {
  const [stats,   setStats]   = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    adminApi.getStats()
      .then(data => setStats(data as Stats))
      .catch(err => setError(err instanceof ApiError ? err.message : "Failed to load stats."))
      .finally(() => setLoading(false));
  }, []);

  // Memoized — rebuilt only when stats changes, not on every render
  const statCards     = useMemo(() => stats ? buildStatCards(stats)    : [], [stats]);
  const pipelineCards = useMemo(() => stats ? buildPipelineCards(stats) : [], [stats]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8 max-w-6xl">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl text-foreground mb-1">{greeting}!</h1>
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

      {/* Primary stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)
          : statCards.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.07} />)
        }
      </div>

      {/* Pipeline / intelligence cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
          : pipelineCards.map((s, i) => <PipelineCard key={s.label} {...s} delay={0.28 + i * 0.07} />)
        }
      </div>

      {/* Chart + Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {loading
          ? <><Skeleton className="h-52 rounded-2xl" /><Skeleton className="h-52 rounded-2xl" /></>
          : <>
              {stats?.bookings?.trend?.length
                ? <BookingsTrendChart trend={stats.bookings.trend} />
                : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="rounded-2xl p-5 flex items-center justify-center"
                    style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.3)" }}>
                    <p className="font-body text-sm text-muted-foreground">No trend data yet.</p>
                  </motion.div>
                )
              }
              {stats && <QuoteStatusBar stats={stats} />}
            </>
        }
      </div>

      {/* Recent quotes */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
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
                        <td key={j} className="px-6 py-4"><Skeleton className="h-4 w-full" /></td>
                      ))}
                    </tr>
                  ))
                : !stats?.recent_quotes?.length
                  ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center font-body text-sm text-muted-foreground">
                        No quotes yet.
                      </td>
                    </tr>
                  )
                  : stats.recent_quotes.map((q, i) => {
                      const ss      = STATUS_STYLES[q.status?.toUpperCase()] ?? STATUS_STYLES.PENDING;
                      const urgency = getUrgency(q.status, q.created_at);
                      return (
                        <motion.tr key={q.id}
                          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.55 + i * 0.05 }}
                          className="group transition-colors duration-150"
                          style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "hsl(var(--muted)/0.3)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>

                          {/* Client */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center
                                text-xs font-bold font-body flex-shrink-0"
                                style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                                {q.first_name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-body text-sm text-foreground">
                                {q.first_name} {q.last_name}
                              </span>
                            </div>
                          </td>

                          {/* Destination */}
                          <td className="px-6 py-4">
                            <span className="font-body text-sm text-muted-foreground">
                              {q.destinations?.[0] ?? "—"}
                            </span>
                          </td>

                          {/* Received + urgency aging indicator */}
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-1.5">
                              {urgency && (
                                <urgency.icon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                                  style={{ color: urgency.color }} />
                              )}
                              <div>
                                <span className="font-body text-xs text-muted-foreground block">
                                  {formatAge(q.created_at)}
                                </span>
                                {urgency && (
                                  <span className="font-body text-xs font-medium leading-tight"
                                    style={{ color: urgency.color }}>
                                    {urgency.label}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <span className="text-xs font-body px-2.5 py-1 rounded-full font-medium"
                              style={{ background: ss.bg, color: ss.color }}>
                              {ss.label}
                            </span>
                          </td>

                          {/* Action */}
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
        transition={{ delay: 0.65 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <Link to="/admin/tours/new"
          className="flex items-center justify-between p-5 rounded-2xl transition-all duration-200 group"
          style={{ background: "hsl(var(--primary)/0.08)", border: "1px solid hsl(var(--primary)/0.2)" }}>
          <div>
            <p className="font-body font-semibold text-sm text-foreground mb-0.5">Add New Tour</p>
            <p className="font-body text-xs text-muted-foreground">Publish a safari package</p>
          </div>
          <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1 duration-200" />
        </Link>

        <Link
            to="/quotes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl transition-all duration-200 group"
            style={{ background: "hsl(142 70% 50% / 0.08)", border: "1px solid hsl(142 70% 50% / 0.2)" }}
          >
            <div>
              <p className="font-body font-semibold text-sm text-foreground mb-0.5">Create Quote</p>
              <p className="font-body text-xs text-muted-foreground">From WhatsApp, email or call</p>
            </div>

            <PlusCircle
              className="w-4 h-4 transition-transform group-hover:scale-110 duration-200"
              style={{ color: "hsl(142 70% 50%)" }}
            />
          </Link>

        <Link to="/admin/quotes"
          className="flex items-center justify-between p-5 rounded-2xl transition-all duration-200 group"
          style={{ background: "hsl(var(--muted)/0.4)", border: "1px solid hsl(var(--border)/0.6)" }}>
          <div>
            <p className="font-body font-semibold text-sm text-foreground mb-0.5">Review Pending Quotes</p>
            <p className="font-body text-xs text-muted-foreground">
              {stats
                ? `${stats.quotes.pending} quote${stats.quotes.pending !== 1 ? "s" : ""} awaiting response`
                : "…"}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1 duration-200" />
        </Link>

      </motion.div>

    </div>
  );
};

export default DashboardPage;