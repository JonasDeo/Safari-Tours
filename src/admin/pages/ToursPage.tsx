import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { adminApi, ApiError } from "@/lib/api";

// ── Types  ──

interface Tour {
  id: number; title: string; destination: string;
  type: string; duration_days: number; price: number;
  currency: string; published: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  GUIDED: "Guided", SELF_DRIVE: "Self-Drive", MOUNTAIN: "Mountain", BEACH: "Beach",
};

const Skeleton = ({ className }: { className: string }) => (
  <div className={`rounded animate-pulse ${className}`} style={{ background: "hsl(var(--muted)/0.6)" }} />
);

// ── Page  ───

const ToursPage = () => {
  const [tours,   setTours]   = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
  const [search,  setSearch]  = useState("");

  const load = useCallback(() => {
    setLoading(true);
    adminApi.getTours()
      .then(data => setTours((data as any).data ?? data))
      .catch(err => setError(err instanceof ApiError ? err.message : "Failed to load tours."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const togglePublish = async (tour: Tour) => {
    try {
      await adminApi.toggleTourPublish(String(tour.id));
      setTours(prev => prev.map(t => t.id === tour.id ? { ...t, published: !t.published } : t));
    } catch {
      alert("Failed to update publish status.");
    }
  };

  const deleteTour = async (tour: Tour) => {
    if (!confirm(`Delete "${tour.title}"? This cannot be undone.`)) return;
    try {
      await adminApi.deleteTour(String(tour.id));
      setTours(prev => prev.filter(t => t.id !== tour.id));
    } catch {
      alert("Failed to delete tour.");
    }
  };

  const filtered = tours.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-foreground mb-1">Tours</h1>
          <p className="font-body text-sm text-muted-foreground">
            {loading ? '…' : `${tours.length} tour${tours.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Link to="/admin/tours/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-body
            font-semibold transition-all duration-200"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
          <Plus className="w-4 h-4" /> New Tour
        </Link>
      </motion.div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm font-body"
          style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 65%)", border: "1px solid hsl(0 70% 50%/0.2)" }}>
          {error}
        </div>
      )}

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }} className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "hsl(var(--muted-foreground))" }} />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search tours…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-body outline-none"
          style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border)/0.6)", color: "hsl(var(--foreground))" }}
          onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
          onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }} className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid hsl(var(--border)/0.6)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "hsl(var(--muted)/0.4)", borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
                {["Tour", "Destination", "Type", "Duration", "Price", "Status", ""].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-body uppercase tracking-widest"
                    style={{ color: "hsl(var(--muted-foreground))" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="px-5 py-4"><Skeleton className="h-4 w-full" /></td>
                      ))}
                    </tr>
                  ))
                : filtered.length === 0
                  ? <tr><td colSpan={7} className="px-5 py-12 text-center font-body text-sm text-muted-foreground">
                      {search ? "No tours match your search." : "No tours yet. Create your first one!"}
                    </td></tr>
                  : filtered.map((tour, i) => (
                      <motion.tr key={tour.id}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="group transition-colors duration-150"
                        style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "hsl(var(--muted)/0.3)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td className="px-5 py-4">
                          <p className="font-body text-sm font-medium text-foreground">{tour.title}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-body text-sm text-muted-foreground">{tour.destination}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs font-body px-2.5 py-1 rounded-full"
                            style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border)/0.5)" }}>
                            {TYPE_LABELS[tour.type] ?? tour.type}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-body text-sm text-muted-foreground">{tour.duration_days}d</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-body text-sm text-foreground font-medium">
                            {tour.currency} {tour.price.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs font-body px-2.5 py-1 rounded-full font-medium"
                            style={tour.published
                              ? { background: "hsl(142 70% 50%/0.12)", color: "hsl(142 70% 50%)" }
                              : { background: "hsl(var(--muted))",      color: "hsl(var(--muted-foreground))" }}>
                            {tour.published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                            <button onClick={() => togglePublish(tour)} title={tour.published ? "Unpublish" : "Publish"}
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                              style={{ background: "hsl(var(--muted))" }}>
                              {tour.published
                                ? <EyeOff className="w-3.5 h-3.5" style={{ color: "hsl(var(--muted-foreground))" }} />
                                : <Eye    className="w-3.5 h-3.5" style={{ color: "hsl(142 70% 50%)" }} />}
                            </button>
                            <Link to={`/admin/tours/${tour.id}/edit`}
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                              style={{ background: "hsl(var(--muted))" }}>
                              <Edit2 className="w-3.5 h-3.5" style={{ color: "hsl(var(--muted-foreground))" }} />
                            </Link>
                            <button onClick={() => deleteTour(tour)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                              style={{ background: "hsl(0 70% 50%/0.08)" }}>
                              <Trash2 className="w-3.5 h-3.5" style={{ color: "hsl(0 70% 60%)" }} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
              }
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ToursPage;