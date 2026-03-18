import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, DollarSign, CalendarCheck, Clock, XCircle, Plus, X, Save } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { adminApi, ApiError } from "@/lib/api";

// ── Types  ─────────────

interface Booking {
  id: number; client_name: string; client_email: string;
  tour?: { title: string; destination: string };
  arrival_date: string | null; total_amount: number; currency: string;
  paid: boolean; status: string;
}

interface Paginated { data: Booking[]; total: number; current_page: number; last_page: number; }

const STATUS_STYLES: Record<string, { bg: string; color: string; icon: any }> = {
  PENDING:   { bg: "hsl(38 90% 55% / 0.12)",   color: "hsl(38 90% 55%)",    icon: Clock        },
  CONFIRMED: { bg: "hsl(142 70% 50% / 0.12)",  color: "hsl(142 70% 50%)",   icon: CalendarCheck },
  COMPLETED: { bg: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))", icon: DollarSign   },
  CANCELLED: { bg: "hsl(0 70% 50% / 0.1)",    color: "hsl(0 70% 65%)",      icon: XCircle      },
};

const STATUSES = ["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
const Skeleton = ({ className }: { className: string }) => (
  <div className={`rounded animate-pulse ${className}`} style={{ background: "hsl(var(--muted)/0.6)" }} />
);

// ── Page  ──────────────

const BookingsPage = () => {
  const [result,       setResult]       = useState<Paginated | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page,         setPage]         = useState(1);
  const [showModal,    setShowModal]    = useState(false);
  const [creating,     setCreating]     = useState(false);
  const [newBooking,   setNewBooking]   = useState({
    client_name: "", client_email: "", client_phone: "",
    arrival_date: "", adults: "1", children: "0",
    total_amount: "", currency: "USD", notes: "",
  });


  const load = useCallback(() => {
    setLoading(true);
    const params: Record<string, string> = { page: String(page) };
    if (statusFilter !== "ALL") params.status = statusFilter;
    if (search.trim())          params.search = search.trim();

    adminApi.getBookings(params)
      .then(data => setResult(data as Paginated))
      .catch(err => setError(err instanceof ApiError ? err.message : "Failed to load bookings."))
      .finally(() => setLoading(false));
  }, [page, statusFilter, search]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (booking: Booking, status: string) => {
    try {
      await adminApi.updateBooking(String(booking.id), { status });
      setResult(prev => prev ? {
        ...prev,
        data: prev.data.map(b => b.id === booking.id ? { ...b, status } : b),
      } : prev);
    } catch { alert("Failed to update status."); }
  };

  const markPaid = async (booking: Booking) => {
    try {
      await adminApi.updateBooking(String(booking.id), { paid: true });
      setResult(prev => prev ? {
        ...prev,
        data: prev.data.map(b => b.id === booking.id ? { ...b, paid: true } : b),
      } : prev);
    } catch { alert("Failed to mark as paid."); }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await adminApi.createBooking({
        ...newBooking,
        adults:       Number(newBooking.adults),
        children:     Number(newBooking.children),
        total_amount: Number(newBooking.total_amount),
      });
      setShowModal(false);
      setNewBooking({ client_name:"",client_email:"",client_phone:"",arrival_date:"",adults:"1",children:"0",total_amount:"",currency:"USD",notes:"" });
      load();
    } catch { alert("Failed to create booking."); }
    finally { setCreating(false); }
  };

  const nb = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setNewBooking(v => ({ ...v, [k]: e.target.value }));

  const iStyle = { background:"hsl(var(--muted)/0.5)", border:"1px solid hsl(var(--border)/0.6)", color:"hsl(var(--foreground))" };
  const iCls = "w-full px-3 py-2.5 rounded-xl text-sm font-body outline-none transition-all duration-200";
  const onF = (e: React.FocusEvent<any>) => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)";
  const onB = (e: React.FocusEvent<any>) => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)";

  const bookings = result?.data ?? [];
  const totalRevenue = bookings.filter(b => b.paid).reduce((acc, b) => acc + b.total_amount, 0);
  const confirmed    = bookings.filter(b => b.status === "CONFIRMED").length;
  const pending      = bookings.filter(b => b.status === "PENDING").length;
  const completed    = bookings.filter(b => b.status === "COMPLETED").length;

  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl text-foreground mb-1">Bookings</h1>
          <p className="font-body text-sm text-muted-foreground">
            {loading ? '…' : `${result?.total ?? 0} total · $${totalRevenue.toLocaleString()} collected`}
          </p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body font-semibold"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
          <Plus className="w-4 h-4" /> New Booking
        </button>
      </motion.div>

      {/* ── Create Booking Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
            <motion.div initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16 }}
              className="w-full max-w-lg rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border)/0.6)" }}>
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">New Booking</p>
                <button onClick={() => setShowModal(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs uppercase tracking-widest font-body text-muted-foreground">Client Name *</label>
                    <input value={newBooking.client_name} onChange={nb("client_name")} required className={iCls} style={iStyle} onFocus={onF} onBlur={onB} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest font-body text-muted-foreground">Email *</label>
                    <input type="email" value={newBooking.client_email} onChange={nb("client_email")} required className={iCls} style={iStyle} onFocus={onF} onBlur={onB} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest font-body text-muted-foreground">Phone</label>
                    <input value={newBooking.client_phone} onChange={nb("client_phone")} className={iCls} style={iStyle} onFocus={onF} onBlur={onB} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest font-body text-muted-foreground">Arrival Date</label>
                    <input type="date" value={newBooking.arrival_date} onChange={nb("arrival_date")} className={iCls} style={iStyle} onFocus={onF} onBlur={onB} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest font-body text-muted-foreground">Currency</label>
                    <select value={newBooking.currency} onChange={nb("currency")} className={`${iCls} appearance-none`} style={iStyle} onFocus={onF} onBlur={onB}>
                      {["USD","EUR","GBP","TZS"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest font-body text-muted-foreground">Total Amount *</label>
                    <input type="number" min="0" value={newBooking.total_amount} onChange={nb("total_amount")} required className={iCls} style={iStyle} onFocus={onF} onBlur={onB} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest font-body text-muted-foreground">Adults *</label>
                    <input type="number" min="1" value={newBooking.adults} onChange={nb("adults")} required className={iCls} style={iStyle} onFocus={onF} onBlur={onB} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest font-body text-muted-foreground">Children</label>
                    <input type="number" min="0" value={newBooking.children} onChange={nb("children")} className={iCls} style={iStyle} onFocus={onF} onBlur={onB} />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs uppercase tracking-widest font-body text-muted-foreground">Notes</label>
                    <textarea value={newBooking.notes} onChange={nb("notes")} rows={2}
                      className={`${iCls} resize-none`} style={iStyle} onFocus={onF} onBlur={onB} />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-body text-muted-foreground">Cancel</button>
                  <button type="submit" disabled={creating}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body font-semibold"
                    style={{ background: creating ? "hsl(var(--primary)/0.5)" : "hsl(var(--primary))", color: "hsl(var(--dark))", cursor: creating ? "not-allowed" : "pointer" }}>
                    {creating ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                    {creating ? "Creating…" : "Create Booking"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm font-body"
          style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 65%)", border: "1px solid hsl(0 70% 50%/0.2)" }}>
          {error}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Confirmed", value: loading ? '…' : confirmed,                         color: "hsl(142 70% 50%)"    },
          { label: "Pending",   value: loading ? '…' : pending,                           color: "hsl(38 90% 55%)"     },
          { label: "Completed", value: loading ? '…' : completed,                         color: "hsl(var(--primary))" },
          { label: "Revenue",   value: loading ? '…' : `$${(totalRevenue/1000).toFixed(0)}k`, color: "hsl(210 80% 60%)" },
        ].map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl p-4"
            style={{ background: "hsl(var(--muted)/0.4)", border: "1px solid hsl(var(--border)/0.5)" }}>
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }} className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "hsl(var(--muted-foreground))" }} />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search client or tour…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-body outline-none transition-all duration-200"
            style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border)/0.6)", color: "hsl(var(--foreground))" }}
            onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
            onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="pl-4 pr-8 py-2.5 rounded-xl text-sm font-body outline-none appearance-none cursor-pointer"
            style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border)/0.6)", color: "hsl(var(--foreground))" }}>
            {STATUSES.map(s => <option key={s} value={s}>{s === "ALL" ? "All Status" : s.charAt(0) + s.slice(1).toLowerCase()}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
            style={{ color: "hsl(var(--muted-foreground))" }} />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }} className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid hsl(var(--border)/0.6)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "hsl(var(--muted)/0.4)", borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
                {["Client", "Tour", "Arrival", "Total", "Paid", "Status", ""].map(h => (
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
                : bookings.length === 0
                  ? <tr><td colSpan={7} className="px-5 py-12 text-center font-body text-sm text-muted-foreground">
                      No bookings found.
                    </td></tr>
                  : bookings.map((b, i) => {
                      const ss = STATUS_STYLES[b.status] ?? STATUS_STYLES.PENDING;
                      const StatusIcon = ss.icon;
                      return (
                        <motion.tr key={b.id}
                          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                          className="group transition-colors duration-150"
                          style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}
                          onMouseEnter={e => e.currentTarget.style.background = "hsl(var(--muted)/0.3)"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center
                                text-xs font-bold font-body flex-shrink-0"
                                style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                                {b.client_name.charAt(0)}
                              </div>
                              <div>
                                <span className="font-body text-sm text-foreground whitespace-nowrap">{b.client_name}</span>
                                <p className="font-body text-xs text-muted-foreground">{b.client_email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <p className="font-body text-sm text-muted-foreground max-w-[180px] truncate">
                              {b.tour?.title ?? '—'}
                            </p>
                            <p className="font-body text-xs text-muted-foreground/60">{b.tour?.destination ?? ''}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-body text-xs text-muted-foreground whitespace-nowrap">
                              {b.arrival_date ? new Date(b.arrival_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-body text-sm font-semibold text-foreground">
                              {b.currency} {b.total_amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            {b.paid
                              ? <span className="text-xs font-body px-2 py-1 rounded-full font-medium"
                                  style={{ background: "hsl(142 70% 50% / 0.12)", color: "hsl(142 70% 50%)" }}>Paid</span>
                              : <button onClick={() => markPaid(b)}
                                  className="text-xs font-body px-2 py-1 rounded-full font-medium transition-all duration-150"
                                  style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}
                                  title="Click to mark as paid">
                                  Unpaid
                                </button>
                            }
                          </td>
                          <td className="px-5 py-4">
                            <select value={b.status}
                              onChange={e => updateStatus(b, e.target.value)}
                              className="text-xs font-body px-2.5 py-1 rounded-full font-medium
                                outline-none appearance-none cursor-pointer border-0"
                              style={{ background: ss.bg, color: ss.color }}>
                              {["PENDING","CONFIRMED","COMPLETED","CANCELLED"].map(s => (
                                <option key={s} value={s}
                                  style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>
                                  {s.charAt(0) + s.slice(1).toLowerCase()}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-5 py-4">
                            <StatusIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity"
                              style={{ color: ss.color }} />
                          </td>
                        </motion.tr>
                      );
                    })
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {result && result.last_page > 1 && (
          <div className="flex items-center justify-between px-5 py-3"
            style={{ borderTop: "1px solid hsl(var(--border)/0.4)", background: "hsl(var(--muted)/0.2)" }}>
            <p className="font-body text-xs text-muted-foreground">Page {result.current_page} of {result.last_page}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-body disabled:opacity-40"
                style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}>← Prev</button>
              <button onClick={() => setPage(p => Math.min(result.last_page, p + 1))} disabled={page === result.last_page}
                className="px-3 py-1.5 rounded-lg text-xs font-body disabled:opacity-40"
                style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}>Next →</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookingsPage;