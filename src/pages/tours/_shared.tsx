// Shared across all category pages 

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { publicApi } from "@/lib/api";

export interface Tour {
  id: number;
  slug: string;
  title: string;
  destination: string;
  type: string;
  duration_days: number;
  price: number;
  currency: string;
  images: any[] | null;
  excerpt: string | null;
  tags: string[] | null;
}

export const getTourImg = (tour: Tour, fallback: string) => {
  const first = tour.images?.[0];
  if (!first) return fallback;
  return typeof first === "string" ? first : (first?.url ?? fallback);
};

export const useTours = (type: string) => {
  const [tours, setTours]   = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    publicApi
      .getTours()
      .then((data: any) =>
        setTours((data as Tour[]).filter((t) => t.type === type))
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [type]);

  return { tours, loading };
};

// Simple tour card — matches the Private Explorers card style
export const TourCard = ({
  tour,
  accent = "hsl(var(--primary))",
  accentText = "hsl(var(--dark))",
  fallbackImg = "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
}: {
  tour: Tour;
  accent?: string;
  accentText?: string;
  fallbackImg?: string;
}) => (
  <Link
    to={`/quote?tour=${tour.slug}`}
    className="group flex flex-col rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
    style={{ borderColor: "hsl(var(--border)/0.7)", background: "hsl(var(--background))" }}
  >
    <div className="relative overflow-hidden" style={{ height: 210 }}>
      <img
        src={getTourImg(tour, fallbackImg)}
        alt={tour.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      {/* Category badge */}
      <span
        className="absolute top-3 left-3 text-xs font-body px-2.5 py-1 rounded-full font-medium"
        style={{ background: accent, color: accentText }}
      >
        {tour.type.replace(/_/g, " ")}
      </span>
    </div>

    <div className="flex flex-col flex-1 p-4 gap-2">
      <div
        className="flex items-center gap-1 text-xs font-body"
        style={{ color: accent }}
      >
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
        {tour.duration_days} Days {tour.duration_days - 1} Nights &nbsp;·&nbsp; {tour.destination}
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
            ${tour.price.toLocaleString()}
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

// Grid of tour cards with loading + empty states
export const PackagesGrid = ({
  tours,
  loading,
  accent = "hsl(var(--primary))",
  accentText = "hsl(var(--dark))",
  fallbackImg,
  emptyLabel = "packages",
}: {
  tours: Tour[];
  loading: boolean;
  accent?: string;
  accentText?: string;
  fallbackImg?: string;
  emptyLabel?: string;
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
          border: "1px dashed hsl(var(--border)/0.6)",
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
