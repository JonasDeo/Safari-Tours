import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { DESTINATIONS } from "@/data/destinationData";
import tour1 from "@/assets/tour-1.jpg";

const DestinationsPage = () => (
  <PageLayout>
    {/* ── Hero ── */}
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "clamp(220px, 40vh, 420px)", paddingTop: "var(--nav-total-h, 64px)" }}
    >
      <img src={tour1} alt="Safari destinations"
        className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-dark-overlay/65" />
      <div className="relative z-10 text-center px-4">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-sand mb-3 text-shadow-hero">
          Destinations
        </h1>
        <p className="font-body text-sand/70 text-base md:text-lg">
          Explore East Africa's most spectacular safari regions
        </p>
      </div>
    </section>

    {/* ── Destination list ── */}
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 space-y-20">
        {DESTINATIONS.map((dest, i) => (
          <motion.div
            key={dest.slug}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            {/* Image */}
            <div className={`overflow-hidden rounded-2xl ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <Link to={`/destinations/${dest.slug}`} className="block group">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                    className="w-full h-[320px] sm:h-[380px] object-cover
                      group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay label on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20
                    transition-all duration-500 flex items-end p-6">
                    <span className="translate-y-4 opacity-0 group-hover:translate-y-0
                      group-hover:opacity-100 transition-all duration-300
                      flex items-center gap-2 text-sand text-sm font-body tracking-widest uppercase">
                      View destination <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Content */}
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              {/* Country label */}
              <p className="text-xs tracking-[0.25em] uppercase font-body text-primary mb-2">
                {dest.country}
              </p>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                {dest.name}
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6 text-base">
                {dest.desc}
              </p>

              {/* Park pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {dest.parks.slice(0, 4).map((park) => (
                  <span key={park}
                    className="flex items-center gap-1.5 font-body text-xs bg-muted
                      px-3 py-1.5 rounded-full text-foreground/80">
                    <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                    {park}
                  </span>
                ))}
                {dest.parks.length > 4 && (
                  <span className="font-body text-xs bg-muted px-3 py-1.5 rounded-full
                    text-muted-foreground">
                    +{dest.parks.length - 4} more
                  </span>
                )}
              </div>

              {/* Quick facts row */}
              <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-border/50">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-0.5">Best Time</p>
                  <p className="text-sm font-body text-foreground">{dest.bestTime}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-0.5">Duration</p>
                  <p className="text-sm font-body text-foreground">{dest.duration}</p>
                </div>

              </div>

              {/* CTA */}
              <div className="flex items-center gap-4">
                <Link
                  to={`/destinations/${dest.slug}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-dark
                    text-xs font-semibold tracking-widest uppercase rounded-full
                    hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20
                    group"
                >
                  Explore {dest.country}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 text-xs font-body tracking-widest
                    uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  Request a quote
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default DestinationsPage;