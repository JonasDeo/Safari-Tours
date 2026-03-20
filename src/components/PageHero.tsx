import { motion } from "framer-motion";

interface PageHeroProps {
  image:       string;
  imageAlt?:   string;
  eyebrow?:    string;
  title:       string;
  subtitle?:   string;
  height?:     string;
}

const PageHero = ({
  image,
  imageAlt = "",
  eyebrow,
  title,
  subtitle,
  height = "clamp(280px, 42vh, 480px)",
}: PageHeroProps) => (
  <section
    className="relative flex items-center overflow-hidden"
    style={{ minHeight: height, paddingTop: "var(--nav-total-h, 100px)" }}
  >
    {/* Image */}
    <img
      src={image}
      alt={imageAlt}
      className="absolute inset-0 w-full h-full object-cover"
      loading="eager"
    />

    {/* Single flat dark overlay — no gradient fade */}
    <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.52)" }} />

    {/* Content — vertically centered, left-aligned */}
    <div className="relative z-10 w-full">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          {eyebrow && (
            <p className="font-body text-xs tracking-[0.35em] uppercase text-primary mb-3">
              {eyebrow}
            </p>
          )}

          <h1
            className="font-display text-sand text-shadow-hero"
            style={{
              fontSize:   "clamp(2rem, 5vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="font-body text-sand/60 text-sm leading-relaxed mt-4"
              style={{ maxWidth: "36rem" }}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  </section>
);

export default PageHero;