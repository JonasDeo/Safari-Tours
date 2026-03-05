import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, DollarSign, CalendarCheck, Clock, XCircle } from "lucide-react";

// ── Mock data ─────────────────────────────────────────────────────────────────

const BOOKINGS = [
  { id: "b_001", client: "Sarah Mitchell",  tour: "Serengeti Migration Safari", destination: "Tanzania", arrival: "2026-07-15", total: 6400,  paid: true,  status: "CONFIRMED"  },
  { id: "b_002", client: "James Okonkwo",   tour: "Maasai Mara Big Cat Safari", destination: "Kenya",    arrival: "2026-08-02", total: 11200, paid: false, status: "PENDING"    },
  { id: "b_003", client: "Lena Brandt",     tour: "Gorilla Trekking Uganda",    destination: "Uganda",   arrival: "2026-06-20", total: 8200,  paid: true,  status: "CONFIRMED"  },
  { id: "b_004", client: "Carlos Mendes",   tour: "Zanzibar Beach Escape",      destination: "Zanzibar", arrival: "2026-09-10", total: 3800,  paid: false, status: "CANCELLED"  },
  { id: "b_005", client: "Amara Diallo",    tour: "Ngorongoro Crater Drive",    destination: "Tanzania", arrival: "2026-05-18", total: 4800,  paid: true,  status: "COMPLETED"  },
  { id: "b_006", client: "Priya Sharma",    tour: "Serengeti Migration Safari", destination: "Tanzania", arrival: "2026-07-22", total: 22400, paid: true,  status: "CONFIRMED"  },
];

const STATUS_STYLES: Record<string, { bg: string; color: string; icon: any }> = {
  PENDING:   { bg: "hsl(38 90% 55% / 0.12)",   color: "hsl(38 90% 55%)",    icon: Clock       },
  CONFIRMED: { bg: "hsl(142 70% 50% / 0.12)",  color: "hsl(142 70% 50%)",   icon: CalendarCheck},
  COMPLETED: { bg: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))", icon: DollarSign  },
  CANCELLED: { bg: "hsl(0 70% 50% / 0.1)",    color: "hsl(0 70% 65%)",      icon: XCircle     },
};

const STATUSES = ["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

const totalRevenue = BOOKINGS.filter(b => b.paid).reduce((acc, b) => acc + b.total, 0);
const confirmed    = BOOKINGS.filter(b => b.status === "CONFIRMED").length;
const pending      = BOOKINGS.filter(b => b.status === "PENDING").length;

// ── Page ──────────────────────────────────────────────────────────────────────

const BookingsPage = () => {
  const [search,        setSearch]        = useState("");
  const [statusFilter,  setStatusFilter]  = useState("ALL");

  const filtered = BOOKINGS.filter(b => {
    const matchSearch = b.client.toLowerCase().includes(search.toLowerCase()) ||
                        b.tour.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl text-foreground mb-1">Bookings</h1>
        <p className="font-body text-sm text-muted-foreground">
          {confirmed} confirmed · {pending} pending · ${totalRevenue.toLocaleString()} collected
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Confirmed",  value: confirmed,                                      color: "hsl(142 70% 50%)"    },
          { label: "Pending",    value: pending,                                         color: "hsl(38 90% 55%)"    },
          { label: "Completed",  value: BOOKINGS.filter(b => b.status==="COMPLETED").length, color: "hsl(var(--primary))" },
          { label: "Revenue",    value: `$${(totalRevenue/1000).toFixed(0)}k`,           color: "hsl(210 80% 60%)"   },
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
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search client or tour…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-body outline-none transition-all duration-200"
            style={{ background: "hsl(var(--muted)/0.5)", border: "1px solid hsl(var(--border)/0.6)", color: "hsl(var(--foreground))" }}
            onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
            onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
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
        transition={{ delay: 0.2 }}
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid hsl(var(--border)/0.6)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "hsl(var(--muted)/0.4)", borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
                {["Client", "Tour", "Arrival", "Total", "Paid", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-body uppercase tracking-widest"
                    style={{ color: "hsl(var(--muted-foreground))" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => {
                const ss = STATUS_STYLES[b.status] ?? STATUS_STYLES.PENDING;
                const StatusIcon = ss.icon;
                return (
                  <motion.tr key={b.id}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="transition-colors duration-150"
                    style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "hsl(var(--muted)/0.3)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center
                          text-xs font-bold font-body flex-shrink-0"
                          style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                          {b.client.charAt(0)}
                        </div>
                        <span className="font-body text-sm text-foreground whitespace-nowrap">{b.client}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-body text-sm text-muted-foreground max-w-[200px] truncate">{b.tour}</p>
                      <p className="font-body text-xs text-muted-foreground/60">{b.destination}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-body text-xs text-muted-foreground whitespace-nowrap">{b.arrival}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-body text-sm font-semibold text-foreground">
                        ${b.total.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-body px-2 py-1 rounded-full font-medium"
                        style={b.paid
                          ? { background: "hsl(142 70% 50% / 0.12)", color: "hsl(142 70% 50%)" }
                          : { background: "hsl(var(--muted))",        color: "hsl(var(--muted-foreground))" }}>
                        {b.paid ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-body px-2.5 py-1
                        rounded-full font-medium w-fit"
                        style={{ background: ss.bg, color: ss.color }}>
                        <StatusIcon className="w-3 h-3" />
                        {b.status.charAt(0) + b.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingsPage;
