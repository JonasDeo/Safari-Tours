// Shared across all category pages

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { publicApi } from "@/lib/api";
import { FALLBACK_TOURS } from "@/data/toursData";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Tour {
  id:            number;
  slug:          string;
  title:         string;
  destination:   string;
  type:          string;
  duration_days: number;
  duration?:     string;
  price:         number;
  price_from?:   number;
  currency:      string;
  cover_image:   string | null;
  hover_image?:  string | null;   // shown on card hover (route map for mountain tours)
  images:        any[] | null;
  excerpt:       string | null;
  tags:          string[] | null;
  published?:    boolean;
}

// ─── Image helpers ────────────────────────────────────────────────────────────

export const getImgUrl = (img: any): string => {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object" && img.url) return String(img.url);
  return "";
};

export const getTourImg = (tour: Tour, fallback: string): string =>
  getImgUrl(tour.cover_image) || getImgUrl(tour.images?.[0]) || fallback;

// ─── useTours ─────────────────────────────────────────────────────────────────

export const useTours = (type: string) => {
  const [tours,   setTours]   = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    publicApi
      .getTours()
      .then((data: any) => {
        const all      = data as Tour[];
        const filtered = all.filter((t) => t.type === type);

        // Empty API response → fall back to static data
        if (filtered.length === 0) {
          setTours(
            FALLBACK_TOURS.filter(
              (t) => t.type === type && t.published !== false
            ) as Tour[]
          );
        } else {
          setTours(filtered);
        }
      })
      .catch(() => {
        // API unreachable → fall back
        setTours(
          FALLBACK_TOURS.filter(
            (t) => t.type === type && t.published !== false
          ) as Tour[]
        );
      })
      .finally(() => setLoading(false));
  }, [type]);

  return { tours, loading };
};

// ─── TourCard ─────────────────────────────────────────────────────────────────
//
// For MOUNTAIN tours that have a hover_image (route map), hovering the photo
// area crossfades to the map — giving the client an instant route preview.
// For all other tours the card behaves exactly as before.

export const TourCard = ({
  tour,
  accent      = "hsl(var(--primary))",
  accentText  = "hsl(var(--dark))",
  fallbackImg = "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
}: {
  tour:        Tour;
  accent?:     string;
  accentText?: string;
  fallbackImg?: string;
}) => {
  const [hovered, setHovered] = useState(false);

  const mainImg  = getTourImg(tour, fallbackImg);
  const hoverImg = getImgUrl(tour.hover_image);
  const hasHover = Boolean(hoverImg && hoverImg !== mainImg);

  return (
    <Link
      to={`/tours/${tour.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      style={{ borderColor: "hsl(var(--border)/0.7)", background: "hsl(var(--background))" }}
    >
      {/* ── Image area ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: 210 }}
        onMouseEnter={() => hasHover && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Primary image */}
        <img
          src={mainImg}
          alt={tour.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          style={{
            transform: hasHover && hovered ? "scale(1.03)" : "scale(1)",
            opacity:   hasHover && hovered ? 0 : 1,
          }}
        />

        {/* Hover image (route map) — crossfades in */}
        {hasHover && (
          <img
            src={hoverImg}
            alt={`${tour.title} route map`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: hovered ? 1 : 0 }}
          />
        )}

        {/* Gradient overlay — only on primary image */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-500"
          style={{ opacity: hovered ? 0 : 1 }}
        />

        {/* "Route map" hint badge — appears on hover */}
        {hasHover && (
          <span
            className="absolute top-3 right-3 text-[10px] font-body font-semibold px-2.5 py-1 rounded-full
              transition-all duration-300 pointer-events-none"
            style={{
              background: "rgba(0,0,0,0.6)",
              color:      "rgba(255,255,255,0.9)",
              opacity:    hovered ? 1 : 0,
              transform:  hovered ? "translateY(0)" : "translateY(-4px)",
            }}
          >
            Route map
          </span>
        )}

        {/* Type badge */}
        <span
          className="absolute top-3 left-3 text-xs font-body px-2.5 py-1 rounded-full font-medium
            transition-opacity duration-300"
          style={{
            background: accent,
            color:      accentText,
            opacity:    hovered ? 0 : 1,
          }}
        >
          {tour.type.replace(/_/g, " ")}
        </span>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center gap-1 text-xs font-body" style={{ color: accent }}>
          <MapPin className="w-3 h-3 flex-shrink-0" />
          {tour.destination}
        </div>

        <h3
          className="font-display text-base text-foreground leading-snug group-hover:underline"
          style={{ fontFamily: '"Yeseva One", serif' }}
        >
          {tour.title}
        </h3>

        <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {tour.duration
            ? tour.duration
            : `${tour.duration_days} Days ${tour.duration_days - 1} Nights`}
          &nbsp;·&nbsp;{tour.destination}
        </p>

        <div
          className="flex items-center justify-between pt-3 mt-1"
          style={{ borderTop: "1px solid hsl(var(--border)/0.5)" }}
        >
          <div>
            <span className="font-body text-xs text-muted-foreground">From </span>
            <span
              className="font-display text-lg font-bold text-foreground"
              style={{ fontFamily: '"Yeseva One", serif' }}
            >
              ${(tour.price_from ?? tour.price).toLocaleString()}
            </span>
          </div>
          <span
            className="flex items-center gap-1 text-xs font-body font-semibold"
            style={{ color: accent }}
          >
            View Tour <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
};

// ─── PackagesGrid ─────────────────────────────────────────────────────────────

export const PackagesGrid = ({
  tours,
  loading,
  accent      = "hsl(var(--primary))",
  accentText  = "hsl(var(--dark))",
  fallbackImg,
  emptyLabel  = "packages",
}: {
  tours:        Tour[];
  loading:      boolean;
  accent?:      string;
  accentText?:  string;
  fallbackImg?: string;
  emptyLabel?:  string;
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-72 rounded-xl animate-pulse"
            style={{ background: "hsl(var(--muted)/0.5)" }}
          />
        ))}
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div
        className="text-center py-14 rounded-xl"
        style={{
          background: "hsl(var(--muted)/0.2)",
          border:     "1px dashed hsl(var(--border)/0.6)",
        }}
      >
        <p className="font-body text-muted-foreground mb-5">
          No {emptyLabel} listed yet — new packages added regularly.
        </p>
        <Link
          to="/quote"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-body font-semibold uppercase tracking-widest"
          style={{ background: accent, color: accentText }}
        >
          Request Custom Trip <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <TourCard
          key={tour.id}
          tour={tour}
          accent={accent}
          accentText={accentText}
          fallbackImg={fallbackImg}
        />
      ))}
    </div>
  );
};