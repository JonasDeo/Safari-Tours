import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search, Filter, ArrowRight, ChevronDown,
  MessageSquare, Clock, CheckCircle, TrendingUp,
} from "lucide-react";
import { adminApi, ApiError } from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Quote {
  id: number; first_name: string; last_name: string;
  email: string; destinations: string[]; created_at: string;
  adults: number; children: number; status: string;
}

interface Paginated { data: Quote[]; total: number; current_page: number; last_page: number; }

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  PENDING:   { bg: "hsl(38 90% 55% / 0.12)",   color: "hsl(38 90% 55%)"    },
  REVIEWED:  { bg: "hsl(210 80% 60% / 0.12)",  color: "hsl(210 80% 60%)"   },
  RESPONDED: { bg: "hsl(142 70% 50% / 0.12)",  color: "hsl(142 70% 50%)"   },
  CONVERTED: { bg: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" },
  CLOSED:    { bg: "hsl(0 0% 50% / 0.12)",     color: "hsl(0 0% 55%)"      },
};

const STATUSES  = ["ALL", "PENDING", "REVIEWED", "RESPONDED", "CONVERTED", "CLOSED"];
const Skeleton = ({ className }: { className: string }) => (
  <div className={`rounded animate-pulse ${className}`}
    style={{ background: "hsl(var(--muted)/0.6)" }} />
);
const StatusBadge = ({ status }: { status: string }) => {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.PENDING;
  return (
    <span className="text-xs font-body px-2.5 py-1 rounded-full font-medium capitalize"
      style={{ background: s.bg, color: s.color }}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const QuotesPage = () => {
  const [result,       setResult]       = useState<Paginated | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [destFilter,   setDestFilter]   = useState("ALL");
  const [page,         setPage]         = useState(1);

  const SUMMARY = result ? [
    { label: "Total",     value: result.total, icon: MessageSquare, color: "hsl(210 80% 60%)"    },
    { label: "Pending",   value: result.data.filter(q => q.status === "PENDING").length,   icon: Clock,         color: "hsl(38 90% 55%)"     },
    { label: "Responded", value: result.data.filter(q => ["RESPONDED","REVIEWED"].includes(q.status)).length, icon: CheckCircle, color: "hsl(142 70% 50%)" },
    { label: "Converted", value: result.data.filter(q => q.status === "CONVERTED").length, icon: TrendingUp,    color: "hsl(var(--primary))" },
  ] : [];

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    const params: Record<string, string> = { page: String(page) };
    if (statusFilter !== "ALL") params.status      = statusFilter;
    if (destFilter   !== "ALL") params.destination  = destFilter;
    if (search.trim())          params.search       = search.trim();

    adminApi.getQuotes(params)
      .then(data => setResult(data as Paginated))
      .catch(err => setError(err instanceof ApiError ? err.message : 'Failed to load quotes.'))
      .finally(() => setLoading(false));
  }, [page, statusFilter, destFilter, search]);

  useEffect(() => { load(); }, [load]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); load(); }, 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-foreground mb-1">Quotes</h1>
          <p className="font-body text-sm text-muted-foreground">
            {result ? `${result.total} total` : '…'}
          </p>
        </div>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {loading && !result
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)
          : SUMMARY.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl p-4 flex items-center gap-3"
                style={{ border: "1px solid hsl(var(--border)/0.5)", background: "hsl(var(--muted)/0.4)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-foreground leading-none mb-0.5">
                    {s.value}
                  </p>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                </div>
              </motion.div>
            ))
        }
      </div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm font-body"
          style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 65%)", border: "1px solid hsl(0 70% 50%/0.2)" }}>
          {error}
        </div>
      )}

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }} className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "hsl(var(--muted-foreground))" }} />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name or email…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-body outline-none transition-all duration-200"
            style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border)/0.6)", color: "hsl(var(--foreground))" }}
            onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
            onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
            style={{ color: "hsl(var(--muted-foreground))" }} />
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="pl-8 pr-8 py-2.5 rounded-xl text-sm font-body outline-none appearance-none cursor-pointer"
            style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border)/0.6)", color: "hsl(var(--foreground))" }}>
            {STATUSES.map(s => (
              <option key={s} value={s}>{s === "ALL" ? "All Status" : s.charAt(0) + s.slice(1).toLowerCase()}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
            style={{ color: "hsl(var(--muted-foreground))" }} />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }} className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid hsl(var(--border)/0.6)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "hsl(var(--muted)/0.4)", borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
                {["Client", "Destination", "Group", "Date", "Status", ""].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-body uppercase tracking-widest"
                    style={{ color: "hsl(var(--muted-foreground))" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="px-5 py-4"><Skeleton className="h-4 w-full" /></td>
                      ))}
                    </tr>
                  ))
                : result?.data.length === 0
                  ? <tr><td colSpan={6} className="px-5 py-12 text-center font-body text-sm text-muted-foreground">
                      No quotes found.
                    </td></tr>
                  : result?.data.map((q, i) => (
                      <motion.tr key={q.id}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="group transition-colors duration-150"
                        style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "hsl(var(--muted)/0.3)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center
                              text-xs font-bold font-body flex-shrink-0"
                              style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                              {q.first_name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-body text-sm text-foreground">{q.first_name} {q.last_name}</p>
                              <p className="font-body text-xs text-muted-foreground">{q.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-body text-sm text-muted-foreground">
                            {q.destinations?.[0] ?? '—'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-body text-sm text-muted-foreground">
                            {q.adults}A{q.children > 0 ? ` · ${q.children}C` : ''}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-body text-xs text-muted-foreground">
                            {new Date(q.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </td>
                        <td className="px-5 py-4"><StatusBadge status={q.status} /></td>
                        <td className="px-5 py-4 text-right">
                          <Link to={`/admin/quotes/${q.id}`}
                            className="inline-flex items-center gap-1 text-xs font-body
                              opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: "hsl(var(--primary))" }}>
                            View <ArrowRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </motion.tr>
                    ))
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {result && result.last_page > 1 && (
          <div className="flex items-center justify-between px-5 py-3"
            style={{ borderTop: "1px solid hsl(var(--border)/0.4)", background: "hsl(var(--muted)/0.2)" }}>
            <p className="font-body text-xs text-muted-foreground">
              Page {result.current_page} of {result.last_page}
            </p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-body disabled:opacity-40 transition-all duration-200"
                style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}>
                ← Prev
              </button>
              <button onClick={() => setPage(p => Math.min(result.last_page, p + 1))}
                disabled={page === result.last_page}
                className="px-3 py-1.5 rounded-lg text-xs font-body disabled:opacity-40 transition-all duration-200"
                style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}>
                Next →
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default QuotesPage;