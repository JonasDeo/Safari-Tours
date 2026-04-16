import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, SlidersHorizontal, X } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { publicApi } from "@/lib/api";
import { FALLBACK_TOURS, type Tour } from "@/data/toursData";
import tour1 from "@/assets/guided-safari.jpg";

const TYPE_LABELS: Record<string, string> = {
  GUIDED:     "Guided Safari",
  SELF_DRIVE: "Self-Drive",
  MOUNTAIN:   "Mountain",
  BEACH:      "Beach",
};

const TYPE_FILTERS = ["All", "GUIDED", "SELF_DRIVE", "MOUNTAIN", "BEACH"];
const DEST_FILTERS = ["All", "Tanzania", "Kenya", "Uganda", "Zanzibar"];

// ── Tour card ─────────────────────────────────────────────────────────────────

const TourCard = ({ tour, i }: { tour: Tour; i: number }) => {
  const imgUrl = (() => {
    if (tour.cover_image) return tour.cover_image;
    const first = tour.images?.[0];
    if (!first) return "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800";
    return typeof first === "string" ? first : (first as any)?.url ?? "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800";
  })();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.07, ease: [0.32, 0.72, 0, 1] }}
      className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300
        hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
      style={{ borderColor: "hsl(var(--border)/0.6)", background: "hsl(var(--background))" }}
    >
      <Link to={`/tours/${tour.slug}`} className="flex flex-col flex-1">
        <div className="relative overflow-hidden h-52 flex-shrink-0">
          <img src={imgUrl} alt={tour.title} loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute top-3 left-3 text-xs font-body px-2.5 py-1 rounded-full font-medium"
            style={{ background: "hsl(var(--primary)/0.9)", color: "hsl(var(--dark))" }}>
            {TYPE_LABELS[tour.type] ?? tour.type}
          </span>
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs font-body text-white/90">
            <Clock className="w-3 h-3" />
            {tour.duration_days} days
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5 gap-3">
          <div className="flex items-center gap-1.5 text-xs font-body capitalize"
            style={{ color: "hsl(var(--primary))" }}>
            <MapPin className="w-3 h-3" />
            {tour.destination}
          </div>

          <h3 className="font-display text-lg text-foreground leading-snug group-hover:underline
            decoration-primary underline-offset-2 transition-colors duration-200">
            {tour.title}
          </h3>

          {tour.excerpt && (
            <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
              {tour.excerpt}
            </p>
          )}

          {(tour.tags ?? []).length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {(tour.tags ?? []).slice(0, 3).map(tag => (
                <span key={tag} className="text-xs font-body px-2.5 py-1 rounded-full"
                  style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 mt-1"
            style={{ borderTop: "1px solid hsl(var(--border)/0.5)" }}>
            <div>
              <p className="text-xs font-body text-muted-foreground">From</p>
              <p className="font-display text-xl font-bold text-foreground">
                {tour.currency} {tour.price.toLocaleString()}
                <span className="text-xs font-body font-normal text-muted-foreground ml-1">/ person</span>
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-body font-semibold"
              style={{ color: "hsl(var(--primary))" }}>
              View Tour <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const ToursPage = () => {
  const [searchParams] = useSearchParams();
  const [typeFilter,  setTypeFilter]  = useState(searchParams.get("type")?.toUpperCase() ?? "All");
  const [destFilter,  setDestFilter]  = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [tours,       setTours]       = useState<Tour[]>([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    publicApi
      .getTours()
      .then((data: any) => {
        const list = Array.isArray(data) ? data : (data?.data ?? []);
        setTours(list.length > 0 ? list : FALLBACK_TOURS);
      })
      .catch(() => setTours(FALLBACK_TOURS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = tours.filter(t => {
    const matchType = typeFilter === "All" || t.type === typeFilter;
    const matchDest = destFilter === "All" ||
      t.destination.toLowerCase() === destFilter.toLowerCase();
    return matchType && matchDest;
  });

  const hasActiveFilters = typeFilter !== "All" || destFilter !== "All";

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center overflow-hidden"
        style={{ height: "clamp(320px, 50vh, 520px)", marginTop: "calc(-1 * var(--nav-total-h, 64px))", paddingTop: "var(--nav-total-h, 64px)" }}>
        <img src={tour1} alt="Safari tours"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-dark-overlay/65" />
        <div className="relative z-10 text-center px-4">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs tracking-[0.28em] uppercase font-body mb-3"
            style={{ color: "hsl(var(--primary))" }}>
            East Africa · Handcrafted Journeys
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-sand mb-3"
            style={{ fontFamily: '"Yeseva One", serif' }}>
            Our Safari Tours
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="font-body text-sand/65 text-base max-w-md mx-auto">
            From the Serengeti to the shores of Zanzibar — every journey crafted to order
          </motion.p>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className="sticky top-[var(--nav-total-h,64px)] z-30 bg-background/95 backdrop-blur-sm"
        style={{ borderBottom: "1px solid hsl(var(--border)/0.5)" }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 py-3 overflow-x-auto scrollbar-none">
            <button onClick={() => setShowFilters(v => !v)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full text-xs
                font-body font-semibold uppercase tracking-wider flex-shrink-0 transition-all duration-200"
              style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}>
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--primary))" }} />
              )}
            </button>

            <div className="hidden lg:flex items-center gap-2">
              {TYPE_FILTERS.map(f => (
                <button key={f} onClick={() => setTypeFilter(f)}
                  className="px-4 py-2 rounded-full text-xs font-body font-semibold
                    uppercase tracking-wider flex-shrink-0 transition-all duration-200"
                  style={typeFilter === f
                    ? { background: "hsl(var(--primary))", color: "hsl(var(--dark))" }
                    : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                  {f === "All" ? "All Types" : TYPE_LABELS[f]}
                </button>
              ))}
            </div>

            <div className="hidden lg:block w-px h-5 flex-shrink-0"
              style={{ background: "hsl(var(--border))" }} />

            <div className="hidden lg:flex items-center gap-2">
              {DEST_FILTERS.map(d => (
                <button key={d} onClick={() => setDestFilter(d)}
                  className="px-4 py-2 rounded-full text-xs font-body font-semibold
                    uppercase tracking-wider flex-shrink-0 transition-all duration-200"
                  style={destFilter === d
                    ? { background: "hsl(var(--foreground))", color: "hsl(var(--background))" }
                    : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                  {d === "All" ? "All Destinations" : d}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button onClick={() => { setTypeFilter("All"); setDestFilter("All"); }}
                className="ml-auto flex items-center gap-1 text-xs font-body flex-shrink-0
                  transition-colors duration-200"
                style={{ color: "hsl(var(--muted-foreground))" }}>
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden pb-4 space-y-3 overflow-hidden">
              <div className="flex flex-wrap gap-2">
                {TYPE_FILTERS.map(f => (
                  <button key={f} onClick={() => setTypeFilter(f)}
                    className="px-3 py-1.5 rounded-full text-xs font-body font-semibold
                      uppercase tracking-wider transition-all duration-200"
                    style={typeFilter === f
                      ? { background: "hsl(var(--primary))", color: "hsl(var(--dark))" }
                      : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                    {f === "All" ? "All Types" : TYPE_LABELS[f]}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {DEST_FILTERS.map(d => (
                  <button key={d} onClick={() => setDestFilter(d)}
                    className="px-3 py-1.5 rounded-full text-xs font-body font-semibold
                      uppercase tracking-wider transition-all duration-200"
                    style={destFilter === d
                      ? { background: "hsl(var(--foreground))", color: "hsl(var(--background))" }
                      : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                    {d === "All" ? "All Destinations" : d}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Tour grid ── */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <p className="font-body text-sm text-muted-foreground mb-8">
            Showing <strong className="text-foreground">{filtered.length}</strong> tour{filtered.length !== 1 ? "s" : ""}
            {hasActiveFilters && " matching your filters"}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden animate-pulse"
                  style={{ border: "1px solid hsl(var(--border)/0.5)" }}>
                  <div className="h-52" style={{ background: "hsl(var(--muted)/0.7)" }} />
                  <div className="p-5 space-y-3">
                    <div className="h-3 rounded w-1/3" style={{ background: "hsl(var(--muted))" }} />
                    <div className="h-5 rounded w-3/4" style={{ background: "hsl(var(--muted))" }} />
                    <div className="h-3 rounded w-full" style={{ background: "hsl(var(--muted)/0.6)" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-foreground mb-3">No tours found</p>
              <p className="font-body text-muted-foreground mb-6">Try adjusting your filters</p>
              <button onClick={() => { setTypeFilter("All"); setDestFilter("All"); }}
                className="px-6 py-3 rounded-full text-sm font-body font-semibold uppercase tracking-wider transition-all duration-200"
                style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((tour, i) => <TourCard key={tour.id} tour={tour} i={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-16 bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl text-foreground mb-4"
            style={{ fontFamily: '"Yeseva One", serif' }}>
            Can't find what you're looking for?
          </h2>
          <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
            Every Native Kilimanjaro safari is built from scratch. Tell us your dream trip and we'll make it happen.
          </p>
          <Link to="/quote"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-body
              font-semibold tracking-widest uppercase transition-all duration-200
              shadow-lg shadow-primary/20"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
            Plan a Custom Safari <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default ToursPage;