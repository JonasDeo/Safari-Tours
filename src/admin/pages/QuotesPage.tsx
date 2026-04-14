import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Eye, Filter, Search, Trash2 } from "lucide-react";
import { adminApi, ApiError } from "@/lib/api";

type QuoteStatus = "PENDING" | "REVIEWED" | "RESPONDED" | "CONVERTED" | "CLOSED";

interface Quote {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  destinations: string[];
  adults: number;
  children: number;
  status: QuoteStatus;
  created_at: string;
}

interface QuotesResponse {
  data: Quote[];
  current_page: number;
  last_page: number;
  total: number;
}

const STATUSES: QuoteStatus[] = ["PENDING", "REVIEWED", "RESPONDED", "CONVERTED", "CLOSED"];
const STATUS_STYLES: Record<QuoteStatus, { bg: string; color: string }> = {
  PENDING: { bg: "hsl(var(--terracotta-light)/0.22)", color: "hsl(var(--terracotta))" },
  REVIEWED: { bg: "hsl(var(--olive-light)/0.22)", color: "hsl(var(--olive))" },
  RESPONDED: { bg: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" },
  CONVERTED: { bg: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" },
  CLOSED: { bg: "hsl(0 0% 50% / 0.12)", color: "hsl(0 0% 55%)" },
};

const Skeleton = ({ className }: { className: string }) => (
  <div className={`rounded animate-pulse ${className}`} style={{ background: "hsl(var(--muted)/0.6)" }} />
);

const prettyStatus = (status: QuoteStatus) => status.charAt(0) + status.slice(1).toLowerCase();

const QuotesPage = () => {
  const [items, setItems] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | QuoteStatus>("ALL");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadQuotes = useCallback(() => {
    setLoading(true);
    setError("");

    const params: Record<string, string> = {
      page: String(page),
      per_page: "12",
    };
    if (search.trim()) params.search = search.trim();
    if (status !== "ALL") params.status = status;

    adminApi.getQuotes(params)
      .then((res) => {
        const payload = res as QuotesResponse;
        setItems(payload.data ?? []);
        setPage(payload.current_page ?? 1);
        setLastPage(payload.last_page ?? 1);
        setTotal(payload.total ?? 0);
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load quotes."))
      .finally(() => setLoading(false));
  }, [page, search, status]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      loadQuotes();
    }, 250);
    return () => clearTimeout(t);
  }, [search, status, loadQuotes]);

  useEffect(() => {
    loadQuotes();
  }, [page, loadQuotes]);

  const counts = useMemo(() => {
    const base = { PENDING: 0, REVIEWED: 0, RESPONDED: 0, CONVERTED: 0, CLOSED: 0 };
    for (const q of items) base[q.status] += 1;
    return base;
  }, [items]);

  const updateStatus = async (quoteId: number, nextStatus: QuoteStatus) => {
    try {
      await adminApi.updateQuote(String(quoteId), { status: nextStatus });
      setItems((prev) => prev.map((q) => (q.id === quoteId ? { ...q, status: nextStatus } : q)));
    } catch {
      alert("Failed to update quote status.");
    }
  };

  const deleteQuote = async (quote: Quote) => {
    if (!confirm(`Delete quote #${quote.id} from ${quote.first_name} ${quote.last_name}?`)) return;
    try {
      await adminApi.deleteQuote(String(quote.id));
      setItems((prev) => prev.filter((q) => q.id !== quote.id));
      setTotal((v) => Math.max(0, v - 1));
    } catch {
      alert("Failed to delete quote.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl text-foreground mb-1">Quotes</h1>
          <p className="font-body text-sm text-muted-foreground">
            {loading ? "Loading..." : `${total} total quote${total !== 1 ? "s" : ""}`}
          </p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {STATUSES.map((s) => (
          <div key={s} className="rounded-xl px-4 py-3"
            style={{ background: "hsl(var(--muted)/0.35)", border: "1px solid hsl(var(--border)/0.5)" }}>
            <p className="text-[11px] uppercase tracking-widest font-body text-muted-foreground">{prettyStatus(s)}</p>
            <p className="font-display text-2xl text-foreground leading-tight">{counts[s]}</p>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name or email..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-body outline-none"
            style={{ background: "hsl(var(--muted)/0.45)", border: "1px solid hsl(var(--border)/0.6)", color: "hsl(var(--foreground))" }}
          />
        </div>

        <div className="relative w-full md:w-[220px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value as "ALL" | QuoteStatus); setPage(1); }}
            className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm font-body outline-none appearance-none"
            style={{ background: "hsl(var(--muted)/0.45)", border: "1px solid hsl(var(--border)/0.6)", color: "hsl(var(--foreground))" }}
          >
            <option value="ALL">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{prettyStatus(s)}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </motion.div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm font-body"
          style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 65%)", border: "1px solid hsl(0 70% 50%/0.2)" }}>
          {error}
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }} className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid hsl(var(--border)/0.6)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "hsl(var(--muted)/0.35)", borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
                {["Client", "Trip", "Submitted", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-body uppercase tracking-widest text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}>
                    {Array.from({ length: 5 }).map((__, j) => (
                      <td key={j} className="px-5 py-4"><Skeleton className="h-4 w-full" /></td>
                    ))}
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center text-sm font-body text-muted-foreground">
                    No quotes found for the current filter.
                  </td>
                </tr>
              ) : (
                items.map((quote) => (
                  <tr key={quote.id} style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}>
                    <td className="px-5 py-4 align-top">
                      <p className="font-body text-sm font-semibold text-foreground">{quote.first_name} {quote.last_name}</p>
                      <p className="font-body text-xs text-muted-foreground">{quote.email}</p>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <p className="font-body text-sm text-foreground">{(quote.destinations ?? []).slice(0, 2).join(", ") || "-"}</p>
                      <p className="font-body text-xs text-muted-foreground">
                        {quote.adults} adult{quote.adults !== 1 ? "s" : ""}
                        {quote.children ? `, ${quote.children} children` : ""}
                      </p>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <p className="font-body text-sm text-foreground">
                        {new Date(quote.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="relative max-w-[180px]">
                        <select
                          value={quote.status}
                          onChange={(e) => updateStatus(quote.id, e.target.value as QuoteStatus)}
                          className="w-full pl-3 pr-8 py-2 rounded-lg text-xs font-body font-semibold outline-none appearance-none"
                          style={{
                            background: STATUS_STYLES[quote.status].bg,
                            color: STATUS_STYLES[quote.status].color,
                            border: `1px solid ${STATUS_STYLES[quote.status].color}33`,
                          }}
                        >
                          {STATUSES.map((s) => <option key={s} value={s}>{prettyStatus(s)}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                          style={{ color: STATUS_STYLES[quote.status].color }} />
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/quotes/${quote.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-semibold"
                          style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}>
                          <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                        <button
                          onClick={() => deleteQuote(quote)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-semibold"
                          style={{ background: "hsl(0 70% 50%/0.08)", color: "hsl(0 70% 58%)" }}
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="flex items-center justify-between pt-1">
        <p className="font-body text-xs text-muted-foreground">
          Page {page} of {lastPage}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
            className="px-3 py-2 rounded-lg text-xs font-body font-semibold disabled:opacity-50"
            style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
            disabled={page >= lastPage || loading}
            className="px-3 py-2 rounded-lg text-xs font-body font-semibold disabled:opacity-50"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotesPage;