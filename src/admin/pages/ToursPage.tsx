import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, EyeOff } from "lucide-react";

// ── Mock data ─────────────────────────────────────────────────────────────────

const INITIAL_TOURS = [
  { id: "t_001", title: "Serengeti Migration Safari", destination: "Tanzania", type: "GUIDED",     duration: 7,  price: 3200, published: true  },
  { id: "t_002", title: "Maasai Mara Big Cat Safari", destination: "Kenya",    type: "GUIDED",     duration: 6,  price: 2800, published: true  },
  { id: "t_003", title: "Gorilla Trekking Uganda",    destination: "Uganda",   type: "GUIDED",     duration: 8,  price: 4100, published: true  },
  { id: "t_004", title: "Zanzibar Beach Escape",      destination: "Zanzibar", type: "BEACH",      duration: 5,  price: 1900, published: false },
  { id: "t_005", title: "Ngorongoro Crater Drive",    destination: "Tanzania", type: "SELF_DRIVE", duration: 4,  price: 1600, published: true  },
  { id: "t_006", title: "Kilimanjaro Trek — Lemosho", destination: "Tanzania", type: "MOUNTAIN",   duration: 10, price: 3800, published: false },
];

const TYPE_LABELS: Record<string, string> = {
  GUIDED:     "Guided",
  SELF_DRIVE: "Self-Drive",
  MOUNTAIN:   "Mountain",
  BEACH:      "Beach",
};

// ── Page ──────────────────────────────────────────────────────────────────────

const ToursPage = () => {
  const [tours, setTours]   = useState(INITIAL_TOURS);
  const [search, setSearch] = useState("");

  const togglePublish = (id: string) => {
    setTours(prev => prev.map(t => t.id === id ? { ...t, published: !t.published } : t));
    // TODO: PATCH /api/admin/tours/:slug/publish
  };

  const deleteTour = (id: string) => {
    if (!confirm("Delete this tour? This cannot be undone.")) return;
    setTours(prev => prev.filter(t => t.id !== id));
    // TODO: DELETE /api/admin/tours/:slug
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
            {tours.filter(t => t.published).length} published · {tours.filter(t => !t.published).length} draft
          </p>
        </div>
        <Link to="/admin/tours/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
            text-xs font-semibold tracking-widest uppercase font-body transition-all duration-200"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
          <Plus className="w-3.5 h-3.5" /> New Tour
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }} className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "hsl(var(--muted-foreground))" }} />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search tours…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-body outline-none
            transition-all duration-200"
          style={{
            background: "hsl(var(--muted)/0.5)",
            border: "1px solid hsl(var(--border)/0.6)",
            color: "hsl(var(--foreground))",
          }}
          onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
          onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
      </motion.div>

      {/* Tours grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((tour, i) => (
          <motion.div key={tour.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="rounded-2xl p-5 flex flex-col gap-4 transition-all duration-200"
            style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>

            {/* Top row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-sm text-foreground leading-snug mb-1 truncate">
                  {tour.title}
                </p>
                <p className="font-body text-xs text-muted-foreground">{tour.destination}</p>
              </div>
              {/* Published badge */}
              <span className="text-xs font-body px-2 py-1 rounded-full flex-shrink-0 font-medium"
                style={tour.published
                  ? { background: "hsl(142 70% 50% / 0.12)", color: "hsl(142 70% 50%)" }
                  : { background: "hsl(var(--muted))",        color: "hsl(var(--muted-foreground))" }}>
                {tour.published ? "Live" : "Draft"}
              </span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs font-body text-muted-foreground">
              <span>{TYPE_LABELS[tour.type]}</span>
              <span>·</span>
              <span>{tour.duration} days</span>
              <span>·</span>
              <span className="font-semibold" style={{ color: "hsl(var(--foreground)/0.8)" }}>
                ${tour.price.toLocaleString()}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1"
              style={{ borderTop: "1px solid hsl(var(--border)/0.4)" }}>
              <Link to={`/admin/tours/${tour.id}/edit`}
                className="flex items-center gap-1.5 text-xs font-body px-3 py-2 rounded-lg
                  transition-all duration-200"
                style={{ color: "hsl(var(--muted-foreground))" }}
                onMouseEnter={e => { e.currentTarget.style.background = "hsl(var(--muted))"; e.currentTarget.style.color = "hsl(var(--foreground))"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}>
                <Edit2 className="w-3 h-3" /> Edit
              </Link>

              <button onClick={() => togglePublish(tour.id)}
                className="flex items-center gap-1.5 text-xs font-body px-3 py-2 rounded-lg
                  transition-all duration-200"
                style={{ color: "hsl(var(--muted-foreground))" }}
                onMouseEnter={e => { e.currentTarget.style.background = "hsl(var(--muted))"; e.currentTarget.style.color = "hsl(var(--foreground))"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}>
                {tour.published
                  ? <><EyeOff className="w-3 h-3" /> Unpublish</>
                  : <><Eye    className="w-3 h-3" /> Publish</>}
              </button>

              <button onClick={() => deleteTour(tour.id)}
                className="flex items-center gap-1.5 text-xs font-body px-3 py-2 rounded-lg
                  transition-all duration-200 ml-auto"
                style={{ color: "hsl(var(--muted-foreground))" }}
                onMouseEnter={e => { e.currentTarget.style.background = "hsl(0 70% 50% / 0.1)"; e.currentTarget.style.color = "hsl(0 70% 65%)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}>
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToursPage;
