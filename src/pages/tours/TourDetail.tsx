import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Clock, Users, ArrowRight, ArrowLeft,
  Check, X, ChevronDown, ChevronUp, Camera,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { publicApi } from "@/lib/api";

// Types 

interface ItineraryDay { day: number; title: string; desc: string; }

interface Tour {
  id: number;
  slug: string;
  title: string;
  destination: string;
  type: string;
  duration_days: number;
  price: number;
  currency: string;
  excerpt: string | null;
  description: string | null;
  departure_location: string | null;
  return_location: string | null;
  highlights: string[] | null;
  included: string[] | null;
  excluded: string[] | null;
  itinerary: ItineraryDay[] | null;
  images: any[] | null;
  tags: string[] | null;
  published: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getImgUrl = (img: any): string =>
  typeof img === "string" ? img : img?.url ?? "";

const TYPE_LABELS: Record<string, string> = {
  GUIDED:     "Guided Safari",
  SELF_DRIVE: "Self-Drive",
  MOUNTAIN:   "Mountain Trek",
  BEACH:      "Beach Holiday",
  CAR_RENTAL: "Car Rental",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

// Sticky book bar that appears after scrolling past the hero
const BookBar = ({ tour }: { tour: Tour }) => (
  <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
    style={{ background: "hsl(var(--background))", borderTop: "1px solid hsl(var(--border)/0.5)" }}>
    <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
      <div>
        <p className="font-body text-xs text-muted-foreground">From</p>
        <p className="font-display text-xl font-bold text-foreground"
          style={{ fontFamily: '"Yeseva One", serif' }}>
          {tour.currency} {tour.price.toLocaleString()}
          <span className="font-body text-xs font-normal text-muted-foreground ml-1">/ person</span>
        </p>
      </div>
      <Link to={`/quote?tour=${tour.slug}`}
        className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-body font-semibold uppercase tracking-widest"
        style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}>
        Book This Tour
      </Link>
    </div>
  </div>
);

// Itinerary day accordion
const ItineraryAccordion = ({ days }: { days: ItineraryDay[] }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {days.map((day, i) => (
        <div key={day.day} className="rounded-xl overflow-hidden"
          style={{ border: "1px solid hsl(var(--border)/0.6)" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
            style={{ background: open === i ? "hsl(var(--primary)/0.06)" : "hsl(var(--background))" }}>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}>
                {day.day}
              </span>
              <span className="font-body text-sm font-semibold text-foreground">{day.title || `Day ${day.day}`}</span>
            </div>
            {open === i
              ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--muted-foreground))" }} />
              : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--muted-foreground))" }} />}
          </button>
          <AnimatePresence>
            {open === i && day.desc && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                transition={{ duration: 0.2 }} style={{ overflow: "hidden" }}>
                <p className="px-5 pb-4 pt-1 font-body text-sm text-muted-foreground leading-relaxed">
                  {day.desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

// Photo gallery — main + thumbnails
const Gallery = ({ images, title }: { images: any[]; title: string }) => {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const urls = images.map(getImgUrl).filter(Boolean);
  if (!urls.length) return null;

  return (
    <div>
      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl cursor-zoom-in mb-3"
        style={{ aspectRatio: "16/9" }}
        onClick={() => setLightbox(true)}>
        <motion.img key={active} src={urls[active]} alt={title}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          className="w-full h-full object-cover" />
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-body text-white"
          style={{ background: "rgba(0,0,0,0.5)" }}>
          <Camera className="w-3 h-3" /> {urls.length} photos
        </div>
      </div>

      {/* Thumbnails */}
      {urls.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {urls.map((url, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="flex-shrink-0 rounded-lg overflow-hidden transition-all"
              style={{
                width: 72, height: 52,
                outline: i === active ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                outlineOffset: 2,
              }}>
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setLightbox(false)}>
            <img src={urls[active]} alt={title}
              className="max-w-full max-h-full rounded-xl object-contain"
              onClick={e => e.stopPropagation()} />
            <button onClick={() => setLightbox(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}>
              <X className="w-5 h-5 text-white" />
            </button>
            {urls.length > 1 && (
              <>
                <button onClick={e => { e.stopPropagation(); setActive(a => (a - 1 + urls.length) % urls.length); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.12)" }}>
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <button onClick={e => { e.stopPropagation(); setActive(a => (a + 1) % urls.length); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.12)" }}>
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Page  ──

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;
    publicApi.getTour(slug)
      .then(data => setTour(data as Tour))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 max-w-5xl"
          style={{ paddingTop: "calc(var(--nav-total-h, 72px) + 2.5rem)", paddingBottom: "4rem" }}>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 rounded-xl animate-pulse"
                style={{ background: "hsl(var(--muted)/0.5)" }} />
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  if (notFound || !tour) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
          style={{ paddingTop: "var(--nav-total-h, 72px)" }}>
          <h1 className="font-display text-2xl text-foreground" style={{ fontFamily: '"Yeseva One", serif' }}>
            Tour not found
          </h1>
          <Link to="/tours" className="flex items-center gap-2 font-body text-sm"
            style={{ color: "hsl(var(--primary))" }}>
            <ArrowLeft className="w-4 h-4" /> Back to all tours
          </Link>
        </div>
      </PageLayout>
    );
  }

  const images    = tour.images ?? [];
  const highlights = (tour.highlights ?? []).filter(Boolean);
  const included  = (tour.included  ?? []).filter(Boolean);
  const excluded  = (tour.excluded  ?? []).filter(Boolean);
  const itinerary = (tour.itinerary ?? []).filter(d => d.title || d.desc);
  const tags      = (tour.tags      ?? []).filter(Boolean);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 md:px-8 max-w-5xl"
        style={{ paddingTop: "calc(var(--nav-total-h, 72px) + 2rem)", paddingBottom: "6rem" }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-body mb-6"
          style={{ color: "hsl(var(--muted-foreground))" }}>
          <Link to="/tours" className="hover:underline">All Tours</Link>
          <span>/</span>
          <span style={{ color: "hsl(var(--primary))" }}>{tour.title}</span>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left: main content ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Title + meta */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-body px-2.5 py-1 rounded-full"
                  style={{ background: "hsl(var(--primary)/0.1)", color: "hsl(var(--primary))" }}>
                  {TYPE_LABELS[tour.type] ?? tour.type}
                </span>
                {tags.map(tag => (
                  <span key={tag} className="text-xs font-body px-2.5 py-1 rounded-full"
                    style={{ background: "hsl(var(--muted)/0.5)", color: "hsl(var(--muted-foreground))" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-3"
                style={{ fontFamily: '"Yeseva One", serif', lineHeight: 1.1 }}>
                {tour.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 font-body text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" style={{ color: "hsl(var(--primary))" }} />
                  {tour.destination}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" style={{ color: "hsl(var(--primary))" }} />
                  {tour.duration_days} Days {tour.duration_days - 1} Nights
                </span>
                {(tour.departure_location || tour.return_location) && (
                  <span className="flex items-center gap-1.5">
                    <span style={{ color: "hsl(var(--primary))" }}>↗</span>
                    {tour.departure_location}
                    {tour.return_location && tour.return_location !== tour.departure_location
                      ? ` → ${tour.return_location}` : ""}
                  </span>
                )}
              </div>
            </div>

            {/* Gallery */}
            {images.length > 0 && (
              <Gallery images={images} title={tour.title} />
            )}

            {/* Overview */}
            {tour.description && (
              <div>
                <h2 className="font-display text-xl text-foreground mb-4"
                  style={{ fontFamily: '"Yeseva One", serif' }}>
                  Tour Overview
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-line">
                  {tour.description}
                </p>
              </div>
            )}

            {/* Highlights */}
            {highlights.length > 0 && (
              <div>
                <h2 className="font-display text-xl text-foreground mb-4"
                  style={{ fontFamily: '"Yeseva One", serif' }}>
                  Highlights
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {highlights.map((h, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2.5 font-body text-sm text-foreground">
                      <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                        style={{ background: "hsl(var(--primary)/0.12)" }}>
                        <Check className="w-3 h-3" style={{ color: "hsl(var(--primary))" }} />
                      </span>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Itinerary */}
            {itinerary.length > 0 && (
              <div>
                <h2 className="font-display text-xl text-foreground mb-4"
                  style={{ fontFamily: '"Yeseva One", serif' }}>
                  Itinerary
                </h2>
                <ItineraryAccordion days={itinerary} />
              </div>
            )}

            {/* Includes & Excludes */}
            {(included.length > 0 || excluded.length > 0) && (
              <div>
                <h2 className="font-display text-xl text-foreground mb-4"
                  style={{ fontFamily: '"Yeseva One", serif' }}>
                  Includes &amp; Excludes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {included.length > 0 && (
                    <div>
                      <p className="font-body text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: "hsl(142 70% 50%/0.12)" }}>
                          <Check className="w-3 h-3" style={{ color: "hsl(142 70% 50%)" }} />
                        </span>
                        What's Included
                      </p>
                      <ul className="space-y-2">
                        {included.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                            <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "hsl(142 70% 50%)" }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {excluded.length > 0 && (
                    <div>
                      <p className="font-body text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: "hsl(0 70% 55%/0.1)" }}>
                          <X className="w-3 h-3" style={{ color: "hsl(0 70% 60%)" }} />
                        </span>
                        Not Included
                      </p>
                      <ul className="space-y-2">
                        {excluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                            <X className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "hsl(0 70% 60%)" }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: sticky booking sidebar ── */}
          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl p-6 space-y-5"
              style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>

              {/* Price */}
              <div>
                <p className="font-body text-xs text-muted-foreground mb-1">From</p>
                <p className="font-display text-3xl font-bold text-foreground"
                  style={{ fontFamily: '"Yeseva One", serif' }}>
                  {tour.currency} {tour.price.toLocaleString()}
                </p>
                <p className="font-body text-xs text-muted-foreground">per person</p>
              </div>

              {/* Quick facts */}
              <div className="space-y-2.5 py-4"
                style={{ borderTop: "1px solid hsl(var(--border)/0.4)", borderBottom: "1px solid hsl(var(--border)/0.4)" }}>
                {[
                  { label: "Duration",   value: `${tour.duration_days} Days` },
                  { label: "Destination", value: tour.destination },
                  ...(tour.departure_location ? [{ label: "Departs From", value: tour.departure_location }] : []),
                  ...(tour.return_location    ? [{ label: "Returns To",   value: tour.return_location   }] : []),
                  { label: "Type",       value: TYPE_LABELS[tour.type] ?? tour.type },
                ].map(row => (
                  <div key={row.label} className="flex items-start justify-between gap-2">
                    <span className="font-body text-xs text-muted-foreground">{row.label}</span>
                    <span className="font-body text-xs font-semibold text-foreground text-right">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Book button */}
              <Link to={`/quote?tour=${tour.slug}`}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-body
                  font-semibold uppercase tracking-widest transition-all duration-200"
                style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))",
                  boxShadow: "0 4px 20px hsl(var(--primary)/0.3)" }}>
                Book This Tour <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="font-body text-xs text-center text-muted-foreground">
                No payment required — we'll send a detailed quote within 24 hours.
              </p>

              {/* Call us */}
              <a href="tel:+255623880844"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-body
                  font-semibold border transition-all duration-200"
                style={{ borderColor: "hsl(var(--border)/0.6)", color: "hsl(var(--foreground))" }}>
                Or Call Us
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile sticky book bar */}
      <BookBar tour={tour} />
    </PageLayout>
  );
};

export default TourDetail;