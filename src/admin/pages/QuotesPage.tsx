import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight, ChevronDown } from "lucide-react";

// ── Mock data ─────────────────────────────────────────────────────────────────

const ALL_QUOTES = [
  { id: "q_001", firstName: "Sarah",   lastName: "Mitchell", email: "sarah@example.com",  destination: "Tanzania", date: "2026-03-05", adults: 2, children: 0, status: "PENDING"   },
  { id: "q_002", firstName: "James",   lastName: "Okonkwo",  email: "james@example.com",  destination: "Kenya",    date: "2026-03-05", adults: 4, children: 2, status: "REVIEWED"  },
  { id: "q_003", firstName: "Lena",    lastName: "Brandt",   email: "lena@example.com",   destination: "Uganda",   date: "2026-03-04", adults: 2, children: 0, status: "RESPONDED" },
  { id: "q_004", firstName: "Carlos",  lastName: "Mendes",   email: "carlos@example.com", destination: "Zanzibar", date: "2026-03-04", adults: 2, children: 1, status: "PENDING"   },
  { id: "q_005", firstName: "Amara",   lastName: "Diallo",   email: "amara@example.com",  destination: "Tanzania", date: "2026-03-03", adults: 3, children: 0, status: "CONVERTED" },
  { id: "q_006", firstName: "Tobias",  lastName: "Wolf",     email: "tobias@example.com", destination: "Kenya",    date: "2026-03-02", adults: 2, children: 0, status: "CLOSED"    },
  { id: "q_007", firstName: "Priya",   lastName: "Sharma",   email: "priya@example.com",  destination: "Tanzania", date: "2026-03-01", adults: 6, children: 3, status: "RESPONDED" },
  { id: "q_008", firstName: "Michael", lastName: "Chen",     email: "michael@example.com",destination: "Zanzibar", date: "2026-02-28", adults: 2, children: 0, status: "PENDING"   },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  PENDING:   { bg: "hsl(38 90% 55% / 0.12)",   color: "hsl(38 90% 55%)"   },
  REVIEWED:  { bg: "hsl(210 80% 60% / 0.12)",  color: "hsl(210 80% 60%)"  },
  RESPONDED: { bg: "hsl(142 70% 50% / 0.12)",  color: "hsl(142 70% 50%)"  },
  CONVERTED: { bg: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))"},
  CLOSED:    { bg: "hsl(0 0% 50% / 0.12)",     color: "hsl(0 0% 55%)"     },
};

const STATUSES = ["ALL", "PENDING", "REVIEWED", "RESPONDED", "CONVERTED", "CLOSED"];

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
  const [search,     setSearch]     = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [destFilter, setDestFilter] = useState("ALL");

  const destinations = ["ALL", ...Array.from(new Set(ALL_QUOTES.map(q => q.destination)))];

  const filtered = ALL_QUOTES.filter(q => {
    const matchSearch = `${q.firstName} ${q.lastName} ${q.email}`
      .toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || q.status === statusFilter;
    const matchDest   = destFilter   === "ALL" || q.destination === destFilter;
    return matchSearch && matchStatus && matchDest;
  });

  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-foreground mb-1">Quotes</h1>
          <p className="font-body text-sm text-muted-foreground">
            {filtered.length} quote{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </motion.div>

      {/* Filters bar */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-3">

        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "hsl(var(--muted-foreground))" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-body outline-none
              transition-all duration-200"
            style={{
              background: "hsl(var(--muted)/0.5)",
              border: "1px solid hsl(var(--border)/0.6)",
              color: "hsl(var(--foreground))",
            }}
            onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
            onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"}
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
            style={{ color: "hsl(var(--muted-foreground))" }} />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="pl-8 pr-8 py-2.5 rounded-xl text-sm font-body outline-none
              appearance-none cursor-pointer transition-all duration-200"
            style={{
              background: "hsl(var(--muted)/0.5)",
              border: "1px solid hsl(var(--border)/0.6)",
              color: "hsl(var(--foreground))",
            }}>
            {STATUSES.map(s => <option key={s} value={s}>{s === "ALL" ? "All Status" : s.charAt(0) + s.slice(1).toLowerCase()}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
            style={{ color: "hsl(var(--muted-foreground))" }} />
        </div>

        {/* Destination filter */}
        <div className="relative">
          <select
            value={destFilter}
            onChange={e => setDestFilter(e.target.value)}
            className="pl-4 pr-8 py-2.5 rounded-xl text-sm font-body outline-none
              appearance-none cursor-pointer transition-all duration-200"
            style={{
              background: "hsl(var(--muted)/0.5)",
              border: "1px solid hsl(var(--border)/0.6)",
              color: "hsl(var(--foreground))",
            }}>
            {destinations.map(d => <option key={d} value={d}>{d === "ALL" ? "All Destinations" : d}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
            style={{ color: "hsl(var(--muted-foreground))" }} />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid hsl(var(--border)/0.6)" }}>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "hsl(var(--muted)/0.4)", borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
                {["Client", "Destination", "Group", "Date", "Status", ""].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-body uppercase tracking-widest"
                    style={{ color: "hsl(var(--muted-foreground))" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center font-body text-sm text-muted-foreground">
                    No quotes match your filters.
                  </td>
                </tr>
              ) : filtered.map((q, i) => (
                <motion.tr key={q.id}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="transition-colors duration-150 group"
                  style={{ borderBottom: "1px solid hsl(var(--border)/0.3)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "hsl(var(--muted)/0.3)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center
                        text-xs font-bold font-body flex-shrink-0"
                        style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                        {q.firstName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-body text-sm text-foreground">{q.firstName} {q.lastName}</p>
                        <p className="font-body text-xs text-muted-foreground">{q.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-body text-sm text-muted-foreground">{q.destination}</span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-body text-sm text-muted-foreground">
                      {q.adults}A {q.children > 0 ? `· ${q.children}C` : ""}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-body text-xs text-muted-foreground">{q.date}</span>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={q.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link to={`/admin/quotes/${q.id}`}
                      className="inline-flex items-center gap-1 text-xs font-body
                        opacity-0 group-hover:opacity-100 transition-all duration-200"
                      style={{ color: "hsl(var(--primary))" }}>
                      View <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default QuotesPage;
