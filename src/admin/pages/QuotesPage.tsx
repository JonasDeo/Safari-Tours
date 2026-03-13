import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search, SlidersHorizontal, ArrowRight, ChevronDown,
  MessageSquare, Clock, CheckCircle, TrendingUp, Plus, MapPin, X,
} from "lucide-react";
import { adminApi, ApiError } from "@/lib/api";

// ── Types   ──

interface Quote {
  id: number; first_name: string; last_name: string;
  email: string; destinations: string[];
  adults: number; children: number;
  status: string; created_at: string;
}
interface ApiResult {
  data: Quote[]; total: number;
  current_page: number; last_page: number;
  // Extra stats the backend returns at top level
  total_pending?: number; total_responded?: number; total_converted?: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { bg: string; dot: string; label: string }> = {
  PENDING:   { bg: "hsl(38 90% 55%/0.1)",         dot: "hsl(38 90% 55%)",    label: "Pending"   },
  REVIEWED:  { bg: "hsl(210 80% 60%/0.1)",        dot: "hsl(210 80% 60%)",   label: "Reviewed"  },
  RESPONDED: { bg: "hsl(142 70% 48%/0.1)",        dot: "hsl(142 70% 48%)",   label: "Responded" },
  CONVERTED: { bg: "hsl(var(--primary)/0.1)",     dot: "hsl(var(--primary))", label: "Converted" },
  CLOSED:    { bg: "hsl(220 12% 48%/0.1)",        dot: "hsl(220 12% 48%)",   label: "Closed"    },
};
const STATUSES = ["ALL", ...Object.keys(STATUS_CONFIG)];

// ── Helpers   

const Sk = ({ w = "full", h = 3.5 }: { w?: string | number; h?: number }) => (
  <div className={`rounded animate-pulse w-${w}`}
    style={{ height: `${h * 4}px`, background: "hsl(var(--muted)/0.55)" }} />
);

const Badge = ({ status }: { status: string }) => {
  const c = STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDING;
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-medium px-2 py-0.5 rounded-md"
      style={{ background: c.bg, color: c.dot }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.dot }} />
      {c.label}
    </span>
  );
};

// ── Page   ───

const QuotesPage = () => {
  const [result,       setResult]       = useState<ApiResult | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [destFilter,   setDestFilter]   = useState("");
  const [page,         setPage]         = useState(1);
  const searchTimer                     = useRef<ReturnType<typeof setTimeout>>();
  const destTimer                       = useRef<ReturnType<typeof setTimeout>>();

  const hasFilters = search.trim() || statusFilter !== "ALL" || destFilter.trim();

  const load = useCallback((overrides?: { p?: number; s?: string; sf?: string; df?: string }) => {
    setLoading(true);
    setError("");
    const p  = overrides?.p  ?? page;
    const s  = overrides?.s  ?? search;
    const sf = overrides?.sf ?? statusFilter;
    const df = overrides?.df ?? destFilter;
    const params: Record<string, string> = { page: String(p) };
    if (sf !== "ALL")  params.status      = sf;
    if (s.trim())      params.search      = s.trim();
    if (df.trim())     params.destination = df.trim();
    adminApi.getQuotes(params)
      .then(d => setResult(d as ApiResult))
      .catch(e => setError(e instanceof ApiError ? e.message : "Failed to load."))
      .finally(() => setLoading(false));
  }, [page, search, statusFilter, destFilter]);

  useEffect(() => { load(); }, [load]);

  const handleSearch = (val: string) => {
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => { setPage(1); load({ p: 1, s: val }); }, 380);
  };

  const handleDest = (val: string) => {
    setDestFilter(val);
    clearTimeout(destTimer.current);
    destTimer.current = setTimeout(() => { setPage(1); load({ p: 1, df: val }); }, 380);
  };

  const handleStatus = (val: string) => {
    setStatusFilter(val);
    setPage(1);
    load({ p: 1, sf: val });
  };

  const clearFilters = () => {
    setSearch(""); setDestFilter(""); setStatusFilter("ALL"); setPage(1);
    load({ p: 1, s: "", df: "", sf: "ALL" });
  };

  // Stats — use backend totals when available, otherwise derive from total
  const total     = result?.total     ?? 0;
  const pending   = result?.total_pending   ?? 0;
  const responded = result?.total_responded ?? 0;
  const converted = result?.total_converted ?? 0;

  const CARDS = [
    { label: "Total Quotes", val: total,     icon: MessageSquare, color: "hsl(210 80% 60%)"    },
    { label: "Pending",       val: pending,   icon: Clock,         color: "hsl(38 90% 55%)"     },
    { label: "Responded",     val: responded, icon: CheckCircle,   color: "hsl(142 70% 48%)"    },
    { label: "Converted",     val: converted, icon: TrendingUp,    color: "hsl(var(--primary))" },
  ];

  return (
    <div className="space-y-4 max-w-5xl">

      {/* ── Stat strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CARDS.map((c, i) => (
          <motion.div key={c.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="rounded-xl p-3.5 flex items-center gap-3"
            style={{ border: "1px solid hsl(var(--border)/0.45)", background: "hsl(var(--muted)/0.25)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `color-mix(in srgb, ${c.color} 10%, transparent)` }}>
              <c.icon style={{ width: 15, height: 15, color: c.color }} />
            </div>
            <div className="min-w-0">
              {loading && !result
                ? <Sk w={10} h={5} />
                : <p className="text-xl font-bold text-foreground leading-none tabular-nums mb-0.5"
                    style={{ fontFamily: '"Yeseva One", serif' }}>{c.val}</p>
              }
              <p className="text-[10px] font-body uppercase tracking-[0.14em]"
                style={{ color: "hsl(var(--muted-foreground))" }}>{c.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {error && (
        <p className="text-sm font-body px-4 py-2.5 rounded-lg"
          style={{ background: "hsl(0 70% 50%/0.08)", color: "hsl(0 70% 60%)", border: "1px solid hsl(0 70% 50%/0.18)" }}>
          {error}
        </p>
      )}

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Name / email search */}
        <label className="relative flex-1 min-w-36">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: 13, height: 13, color: "hsl(var(--muted-foreground))" }} />
          <input
            value={search} onChange={e => handleSearch(e.target.value)}
            placeholder="Name or email…"
            className="w-full pl-8 pr-3 py-[7px] text-[13px] font-body rounded-lg outline-none transition-colors"
            style={{ background: "hsl(var(--muted)/0.35)", border: "1px solid hsl(var(--border)/0.5)", color: "hsl(var(--foreground))" }}
            onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.45)"}
            onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.5)"}
          />
        </label>

        {/* Destination search */}
        <label className="relative flex-1 min-w-36">
          <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: 13, height: 13, color: "hsl(var(--muted-foreground))" }} />
          <input
            value={destFilter} onChange={e => handleDest(e.target.value)}
            placeholder="Destination…"
            className="w-full pl-8 pr-3 py-[7px] text-[13px] font-body rounded-lg outline-none transition-colors"
            style={{ background: "hsl(var(--muted)/0.35)", border: "1px solid hsl(var(--border)/0.5)", color: "hsl(var(--foreground))" }}
            onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.45)"}
            onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.5)"}
          />
        </label>

        {/* Status filter */}
        <div className="relative">
          <SlidersHorizontal className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: 12, height: 12, color: "hsl(var(--muted-foreground))" }} />
          <select
            value={statusFilter} onChange={e => handleStatus(e.target.value)}
            className="pl-7 pr-7 py-[7px] text-[13px] font-body rounded-lg outline-none appearance-none cursor-pointer"
            style={{ background: "hsl(var(--muted)/0.35)", border: "1px solid hsl(var(--border)/0.5)", color: "hsl(var(--foreground))" }}
          >
            {STATUSES.map(s => (
              <option key={s} value={s}>{s === "ALL" ? "All status" : STATUS_CONFIG[s]?.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: 11, height: 11, color: "hsl(var(--muted-foreground))" }} />
        </div>

        {/* Clear filters */}
        {hasFilters && (
          <button onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-[7px] rounded-lg text-[12px] font-body transition-colors"
            style={{ background: "hsl(var(--muted)/0.5)", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border)/0.5)" }}>
            <X style={{ width: 11, height: 11 }} /> Clear
          </button>
        )}

        {result && (
          <p className="text-[12px] font-body ml-auto tabular-nums"
            style={{ color: "hsl(var(--muted-foreground))" }}>
            {result.total} result{result.total !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* ── Table ── */}
      <div className="rounded-xl overflow-hidden"
        style={{ border: "1px solid hsl(var(--border)/0.45)" }}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr style={{ background: "hsl(var(--muted)/0.3)", borderBottom: "1px solid hsl(var(--border)/0.4)" }}>
                {["Client", "Destination", "Group", "Received", "Status", ""].map(h => (
                  <th key={h}
                    className="text-left px-4 py-2.5 text-[10px] font-body font-semibold uppercase tracking-[0.12em] whitespace-nowrap"
                    style={{ color: "hsl(var(--muted-foreground))" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 7 }).map((_, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid hsl(var(--border)/0.2)" }}>
                      {[1,2,3,4,5,6].map(j => (
                        <td key={j} className="px-4 py-3.5">
                          <div className="h-3.5 rounded animate-pulse"
                            style={{ background: "hsl(var(--muted)/0.5)", width: `${[80,55,30,50,55,20][j-1]}%` }} />
                        </td>
                      ))}
                    </tr>
                  ))

                : !result?.data.length
                  ? (
                    <tr><td colSpan={6}>
                      <div className="flex flex-col items-center justify-center py-16 gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ background: "hsl(var(--muted)/0.4)" }}>
                          <MessageSquare style={{ width: 18, height: 18, color: "hsl(var(--muted-foreground))" }} />
                        </div>
                        <p className="text-sm font-body" style={{ color: "hsl(var(--muted-foreground))" }}>
                          {search || statusFilter !== "ALL" ? "No quotes match your filters." : "No quotes yet."}
                        </p>
                      </div>
                    </td></tr>
                  )

                  : result.data.map((q, i) => (
                      <motion.tr key={q.id}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.025 }}
                        className="group transition-colors duration-100"
                        style={{ borderBottom: "1px solid hsl(var(--border)/0.2)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "hsl(var(--muted)/0.22)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        {/* Client */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center
                              text-[11px] font-bold font-body"
                              style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}>
                              {q.first_name[0]}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-medium font-body text-foreground leading-none mb-0.5 truncate">
                                {q.first_name} {q.last_name}
                              </p>
                              <p className="text-[11px] font-body truncate"
                                style={{ color: "hsl(var(--muted-foreground))" }}>
                                {q.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Destination */}
                        <td className="px-4 py-3">
                          <span className="text-[13px] font-body capitalize"
                            style={{ color: "hsl(var(--muted-foreground))" }}>
                            {q.destinations?.[0] ?? "—"}
                          </span>
                        </td>

                        {/* Group */}
                        <td className="px-4 py-3">
                          <span className="text-[12px] font-body tabular-nums"
                            style={{ color: "hsl(var(--muted-foreground))" }}>
                            {q.adults}A{q.children > 0 ? ` +${q.children}` : ""}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-[12px] font-body tabular-nums"
                            style={{ color: "hsl(var(--muted-foreground))" }}>
                            {new Date(q.created_at).toLocaleDateString("en-GB", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <Badge status={q.status} />
                        </td>

                        {/* Action */}
                        <td className="px-4 py-3 text-right">
                          <Link to={`/admin/quotes/${q.id}`}
                            className="inline-flex items-center gap-1 text-[12px] font-body font-medium
                              opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: "hsl(var(--primary))" }}>
                            Open <ArrowRight style={{ width: 11, height: 11 }} />
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
          <div className="flex items-center justify-between px-4 py-2"
            style={{ borderTop: "1px solid hsl(var(--border)/0.3)", background: "hsl(var(--muted)/0.15)" }}>
            <p className="text-[11px] font-body tabular-nums" style={{ color: "hsl(var(--muted-foreground))" }}>
              Page {result.current_page} / {result.last_page}
            </p>
            <div className="flex gap-1.5">
              {[
                { label: "← Prev", disabled: page <= 1, action: () => { setPage(p => p - 1); load({ p: page - 1 }); } },
                { label: "Next →", disabled: page >= result.last_page, action: () => { setPage(p => p + 1); load({ p: page + 1 }); } },
              ].map(btn => (
                <button key={btn.label} onClick={btn.action} disabled={btn.disabled}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-body disabled:opacity-30 transition-colors"
                  style={{ background: "hsl(var(--muted)/0.5)", color: "hsl(var(--foreground))" }}>
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesPage;