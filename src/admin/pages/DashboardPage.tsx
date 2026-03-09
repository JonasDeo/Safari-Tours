import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageSquare, CalendarCheck, TrendingUp,
  DollarSign, ArrowRight, Clock,
} from "lucide-react";

// ── Mock data — replace with API calls ───────────────────────────────────────

const STATS = [
  { label: "Total Quotes",    value: "48",    delta: "+12 this month", icon: MessageSquare, color: "hsl(var(--primary))"   },
  { label: "Active Bookings", value: "9",     delta: "+3 this week",   icon: CalendarCheck, color: "hsl(142 70% 50%)"     },
  { label: "Conversion Rate", value: "18.7%", delta: "+2.1% vs last",  icon: TrendingUp,    color: "hsl(210 80% 60%)"     },
  { label: "Est. Revenue",    value: "$24k",  delta: "USD this month", icon: DollarSign,    color: "hsl(38 90% 55%)"      },
];

const RECENT_QUOTES = [
  { id: "q_001", name: "Sarah Mitchell",  destination: "Tanzania",       date: "2 hours ago",   status: "PENDING"   },
  { id: "q_002", name: "James Okonkwo",   destination: "Kenya",          date: "5 hours ago",   status: "REVIEWED"  },
  { id: "q_003", name: "Lena Brandt",     destination: "Uganda",         date: "1 day ago",     status: "RESPONDED" },
  { id: "q_004", name: "Carlos Mendes",   destination: "Zanzibar",       date: "1 day ago",     status: "PENDING"   },
  { id: "q_005", name: "Amara Diallo",    destination: "Tanzania",       date: "2 days ago",    status: "CONVERTED" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  PENDING:   { bg: "hsl(38 90% 55% / 0.12)",  color: "hsl(38 90% 55%)",  label: "Pending"   },
  REVIEWED:  { bg: "hsl(210 80% 60% / 0.12)", color: "hsl(210 80% 60%)", label: "Reviewed"  },
  RESPONDED: { bg: "hsl(142 70% 50% / 0.12)", color: "hsl(142 70% 50%)", label: "Responded" },
  CONVERTED: { bg: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))", label: "Converted" },
  CLOSED:    { bg: "hsl(0 0% 50% / 0.12)",    color: "hsl(0 0% 55%)",    label: "Closed"    },
};

// ── Components ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, delta, icon: Icon, color, delay }: typeof STATS[0] & { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.32, 0.72, 0, 1] }}
    className="rounded-2xl p-5 flex flex-col gap-4"
    style={{ background: "hsl(var(--muted)/0.4)", border: "1px solid hsl(var(--border)/0.6)" }}
  >
    <div className="flex items-start justify-between">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <span className="text-xs font-body px-2 py-1 rounded-full"
        style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
        {delta}
      </span>
    </div>
    <div>
      <p className="font-display text-3xl font-bold text-foreground mb-0.5">{value}</p>
      <p className="text-xs font-body uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  </motion.div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.PENDING;
  return (
    <span className="text-xs font-body px-2.5 py-1 rounded-full font-medium"
      style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const DashboardPage = () => (
  <div className="space-y-8 max-w-6xl">

    {/* Header */}
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      <h1 className="font-display text-2xl text-foreground mb-1">
        Good morning!
      </h1>
      <p className="font-body text-sm text-muted-foreground">
        Here's what's happening with Balbina Safaris today.
      </p>
    </motion.div>

    {/* Stats grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.07} />)}
    </div>

    {/* Recent quotes table */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid hsl(var(--border)/0.6)" }}>

      {/* Table header */}
      <div className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid hsl(var(--border)/0.5)", background: "hsl(var(--muted)/0.3)" }}>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-body font-semibold text-sm text-foreground">Recent Quotes</h2>
        </div>
        <Link to="/admin/quotes"
          className="flex items-center gap-1 text-xs font-body transition-colors duration-200"
          style={{ color: "hsl(var(--primary))" }}>
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid hsl(var(--border)/0.4)" }}>
              {["Client", "Destination", "Received", "Status", ""].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-body uppercase tracking-widest"
                  style={{ color: "hsl(var(--muted-foreground))" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_QUOTES.map((q, i) => (
              <motion.tr key={q.id}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                className="transition-colors duration-150 group"
                style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}
                onMouseEnter={e => e.currentTarget.style.background = "hsl(var(--muted)/0.3)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center
                      text-xs font-bold font-body flex-shrink-0"
                      style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                      {q.name.charAt(0)}
                    </div>
                    <span className="font-body text-sm text-foreground">{q.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-body text-sm text-muted-foreground">{q.destination}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-body text-xs text-muted-foreground">{q.date}</span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={q.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/quotes/${q.id}`}
                    className="text-xs font-body transition-colors duration-200 opacity-0
                      group-hover:opacity-100"
                    style={{ color: "hsl(var(--primary))" }}>
                    View →
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>

    {/* Quick actions */}
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
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
          <p className="font-body text-xs text-muted-foreground">4 quotes awaiting response</p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1 duration-200" />
      </Link>
    </motion.div>

  </div>
);

export default DashboardPage;
