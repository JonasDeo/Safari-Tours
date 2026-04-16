import { useState, useEffect } from "react";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { publicApi } from "@/lib/api";
import { FALLBACK_TOURS, type Tour } from "@/data/toursData";

import tour1 from "@/assets/guided-safari.jpg";
import tour2 from "@/assets/beach.jpg";
import tour3 from "@/assets/tour-4.jpg";

const FALLBACK_IMAGES: Record<number, string> = {
  0: tour1,
  1: tour3,
  2: tour3,
  3: tour2,
};

// ── Skeleton card ─────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="rounded-lg overflow-hidden border border-border animate-pulse">
    <div className="aspect-[16/10] bg-muted" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-1/2" />
      <div className="h-4 bg-muted rounded w-1/4 mt-4" />
    </div>
  </div>
);

// ── Tour card ─────────────────────────────────────────────────────────────────

const extractUrl = (img: unknown): string | null => {
  if (!img) return null;
  if (typeof img === "string" && (img.startsWith("http") || img.startsWith("/"))) return img;
  if (typeof img === "object" && img !== null && "url" in img) return (img as any).url ?? null;
  return null;
};

const TourCard = ({ tour, idx }: { tour: Tour; idx: number }) => {
  const image =
    extractUrl(tour.cover_image) ??
    extractUrl(tour.images?.[0]) ??
    FALLBACK_IMAGES[idx % Object.keys(FALLBACK_IMAGES).length];

  return (
    <Link
      to={`/tours/${tour.slug}`}
      className="group bg-card rounded-lg overflow-hidden border border-border
        hover:shadow-xl transition-all duration-300 block"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {(tour.tags ?? []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-primary/90 text-primary-foreground text-[10px] uppercase
                tracking-wider font-body px-2.5 py-1 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3
          className="font-display text-base font-semibold text-foreground mb-3
          line-clamp-2 group-hover:text-primary transition-colors duration-200"
        >
          {tour.title}
        </h3>

        <div className="flex items-center gap-4 text-muted-foreground text-xs font-body mb-3">
          {(tour.duration_days || tour.duration) && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {tour.duration_days
                ? `${tour.duration_days} Day${tour.duration_days !== 1 ? "s" : ""} ${tour.duration_days - 1} Night${tour.duration_days - 1 !== 1 ? "s" : ""}`
                : tour.duration}
            </span>
          )}
          {tour.destination && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {tour.destination}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <div>
            <span className="font-body text-xs text-muted-foreground">From </span>
            <span className="font-display text-xl font-bold text-primary">
              {tour.currency ?? "USD"}{" "}
              {Number(tour.price ?? tour.price_from ?? 0).toLocaleString()}
            </span>
          </div>
          <ArrowRight
            className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100
            group-hover:translate-x-0.5 transition-all duration-200"
          />
        </div>
      </div>
    </Link>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

const ToursSection = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi
      .getTours()
      .then((data: any) => {
        const list = Array.isArray(data) ? data : (data?.data ?? []);
        setTours(list.length > 0 ? list.slice(0, 4) : FALLBACK_TOURS.slice(0, 4));
      })
      .catch(() => setTours(FALLBACK_TOURS.slice(0, 4)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="tours" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
            Self Tested Itineraries
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Signature Safari Experiences
          </h2>
          <Link
            to="/quote"
            className="font-body text-sm text-muted-foreground hover:text-foreground
              transition-colors underline underline-offset-4"
          >
            Request a Custom Plan
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : tours.map((tour, i) => <TourCard key={tour.id} tour={tour} idx={i} />)}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/tours"
            className="group inline-flex items-center gap-3 font-body text-xs tracking-[0.2em]
              uppercase font-semibold px-10 py-4 rounded-full border border-foreground
              text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            View All Safari Experiences
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToursSection;