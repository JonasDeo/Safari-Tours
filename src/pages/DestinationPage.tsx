import { useParams, Link, Navigate } from "react-router-dom";
import {
  MapPin, Clock, Calendar, ChevronRight, ArrowLeft,
  // highlight icons
  Footprints, Mountain, TrendingUp, Trees,
  Crosshair, Camera, Waves, Users,
  Binoculars, Search, Droplets, SunMedium,
  Umbrella, Fish, Landmark, Wind,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { getDestination, DESTINATIONS } from "@/data/destinationData";

//   Icon resolver    ─

const ICON_MAP: Record<string, LucideIcon> = {
  Footprints, Mountain, TrendingUp, Trees,
  Crosshair, Camera, Waves, Users,
  Binoculars, Search, Droplets, SunMedium,
  Umbrella, Fish, Landmark, Wind,
};

const HighlightIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = ICON_MAP[name] ?? MapPin;
  return <Icon className={className ?? "w-5 h-5"} />;
};

//   Animations      

const FADE_UP = {
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const },
};

//   Page   ─

const DestinationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const dest = getDestination(slug ?? "");

  if (!dest) return <Navigate to="/destinations" replace />;

  const others = DESTINATIONS.filter((d) => d.slug !== dest.slug);

  return (
    <PageLayout>

      {/*   Hero   */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ height: "clamp(320px, 55vh, 600px)", paddingTop: "var(--nav-total-h, 64px)" }}
      >
        <img src={dest.image} alt={dest.name}
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-[calc(var(--nav-total-h,64px)+16px)] left-0 right-0 z-10">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-2 text-xs font-body text-sand/55">
              <Link to="/" className="hover:text-sand transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/destinations" className="hover:text-sand transition-colors">Destinations</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-sand/80">{dest.country}</span>
            </div>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 container mx-auto px-6 pb-10 sm:pb-14">
          <motion.p {...FADE_UP} transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xs tracking-[0.28em] uppercase font-body text-primary mb-3">
            {dest.country} · East Africa
          </motion.p>
          <motion.h1 {...FADE_UP} transition={{ duration: 0.5, delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-sand
              leading-tight mb-3 text-shadow-hero max-w-2xl">
            {dest.name}
          </motion.h1>
          <motion.p {...FADE_UP} transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-sand/65 text-base sm:text-lg max-w-xl italic">
            {dest.tagline}
          </motion.p>
        </div>
      </section>

      {/*   Quick facts bar                       ─ */}
      <div className="bg-muted/60 border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-0 py-4">

            {[
              { icon: <Calendar className="w-4 h-4 text-primary flex-shrink-0" />, label: "Best Time",  value: dest.bestTime   },
              { icon: <Clock    className="w-4 h-4 text-primary flex-shrink-0" />, label: "Duration",   value: dest.duration   },

            ].map((item, i) => (
              <div key={item.label}
                className={`flex items-center gap-2.5 py-1
                  ${i > 0 ? "pl-6 ml-6 border-l border-border/50" : ""}`}>
                {item.icon}
                <div>
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider leading-none mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm font-body text-foreground">{item.value}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/*   Main content                          */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left column */}
            <div className="lg:col-span-2 space-y-14">

              {/* About */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <p className="text-xs tracking-[0.2em] uppercase font-body text-primary mb-3">About</p>
                <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-5 leading-snug">
                  Why {dest.country}?
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {dest.longDesc}
                </p>
              </motion.div>

              {/* Highlights */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <p className="text-xs tracking-[0.2em] uppercase font-body text-primary mb-3">
                  Highlights
                </p>
                <h2 className="font-display text-2xl text-foreground mb-6">What to Expect</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dest.highlights.map((h, i) => (
                    <motion.div key={h.title}
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="flex gap-4 p-5 rounded-2xl border border-border/60
                        bg-muted/30 hover:border-primary/30 hover:bg-muted/50
                        transition-all duration-200">
                      {/* Icon badge */}
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center
                        justify-center flex-shrink-0 mt-0.5">
                        <HighlightIcon name={h.icon} className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-body font-semibold text-foreground text-sm mb-1">{h.title}</p>
                        <p className="font-body text-muted-foreground text-sm leading-relaxed">{h.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Parks */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <p className="text-xs tracking-[0.2em] uppercase font-body text-primary mb-3">
                  Parks & Regions
                </p>
                <h2 className="font-display text-2xl text-foreground mb-5">Where We Take You</h2>
                <div className="flex flex-wrap gap-2">
                  {dest.parks.map((park) => (
                    <span key={park}
                      className="flex items-center gap-1.5 font-body text-sm
                        bg-muted border border-border/50 px-4 py-2 rounded-full
                        text-foreground/80 hover:border-primary/40 hover:text-foreground
                        transition-all duration-200">
                      <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {park}
                    </span>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-[calc(var(--nav-total-h,64px)+24px)] space-y-4">

                <div className="rounded-2xl border border-border/60 bg-muted/30 p-6 space-y-4">
                  <p className="font-display text-lg text-foreground">
                    Ready to visit {dest.country}?
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Our safari specialists will craft a personalised itinerary tailored to your dates, group, and budget.
                  </p>
                  <Link to={`/quote?destination=${dest.slug}`}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5
                      bg-primary text-dark text-xs font-semibold tracking-widest uppercase
                      rounded-full hover:bg-primary/90 transition-all duration-200
                      shadow-lg shadow-primary/20">
                    Request a Quote
                  </Link>
                  <Link to="/contact"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5
                      border border-border text-foreground/70 text-xs font-semibold
                      tracking-widest uppercase rounded-full hover:border-primary/40
                      hover:text-foreground transition-all duration-200">
                    Talk to a Specialist
                  </Link>
                </div>

                <div className="rounded-2xl border border-border/40 bg-muted/20 p-5 space-y-3">
                  <p className="text-xs uppercase tracking-widest font-body text-muted-foreground">
                    Quick Info
                  </p>
                  <div className="space-y-2.5 font-body text-sm divide-y divide-border/30">
                    {[
                      { label: "Best time",  value: dest.bestTime   },
                      { label: "Duration",   value: dest.duration   },

                      { label: "Regions",    value: `${dest.parks.length} parks & areas` },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between pt-2.5 first:pt-0">
                        <span className="text-muted-foreground">{row.label}</span>
                        <span className="text-foreground text-right max-w-[55%]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/*   Also explore                        ─ */}
      <section className="py-16 bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-6">
          <p className="text-xs tracking-[0.2em] uppercase font-body text-primary mb-2">
            Keep Exploring
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-8">
            Other Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {others.map((other, i) => (
              <motion.div key={other.slug}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <Link to={`/destinations/${other.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl mb-3">
                    <img src={other.image} alt={other.name} loading="lazy"
                      className="w-full h-48 object-cover group-hover:scale-105
                        transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <p className="font-display text-sand text-lg font-bold">{other.country}</p>
                      <p className="font-body text-sand/65 text-xs italic">{other.tagline}</p>
                    </div>
                  </div>
                  <p className="font-body text-xs text-primary flex items-center gap-1
                    group-hover:gap-2 transition-all duration-200">
                    Explore <ChevronRight className="w-3 h-3" />
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*   Back link                          ─ */}
      <div className="py-8 bg-background border-t border-border/40">
        <div className="container mx-auto px-6">
          <Link to="/destinations"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground
              hover:text-foreground transition-colors duration-200 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
            All Destinations
          </Link>
        </div>
      </div>

    </PageLayout>
  );
};

export default DestinationPage;