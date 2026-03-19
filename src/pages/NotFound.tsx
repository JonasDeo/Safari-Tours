import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Compass, MapPin } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import heroImg from "@/assets/tour-1.jpg";

const NAV_LINKS = [
  { label: "Home",         href: "/"            },
  { label: "Tours",        href: "/tours"       },
  { label: "Destinations", href: "/destinations"},
  { label: "Blog",         href: "/blog"        },
  { label: "Contact",      href: "/contact"     },
];

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/*   Full-viewport hero section                ─ */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: "100vh",
          paddingTop: "var(--nav-total-h, 80px)",
          paddingBottom: "3rem",
        }}
      >
        {/* Background image */}
        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Layered overlays — dark vignette + warm tint */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(8,6,4,0.55) 0%, rgba(8,6,4,0.72) 60%, rgba(8,6,4,0.88) 100%)" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">

          {/* Compass icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="mb-8"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
              style={{
                background: "hsl(var(--primary)/0.12)",
                border: "1px solid hsl(var(--primary)/0.35)",
                backdropFilter: "blur(8px)",
              }}>
              <Compass className="w-9 h-9" style={{ color: "hsl(var(--primary))" }} />
            </div>
          </motion.div>

          {/* 404 */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-body text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: "hsl(var(--primary))" }}
          >
            Error 404 · Page Not Found
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="font-display font-bold text-sand mb-5 leading-tight"
            style={{
              fontFamily: '"Yeseva One", serif',
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            }}
          >
            Lost in the Wild
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="font-body text-base sm:text-lg leading-relaxed mb-10"
            style={{ color: "hsl(var(--sand)/0.6)" }}
          >
            Even the best safari guides take a wrong turn sometimes.
            The page you're looking for has wandered off the trail.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex flex-col sm:flex-row items-center gap-3 mb-14"
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                text-xs font-semibold tracking-widest uppercase font-body
                transition-all duration-200 group"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--dark))" }}
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 duration-200" />
              Go Back
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                text-xs font-semibold tracking-widest uppercase font-body
                transition-all duration-200"
              style={{
                background: "hsl(var(--sand)/0.08)",
                border: "1px solid hsl(var(--sand)/0.2)",
                color: "hsl(var(--sand)/0.85)",
                backdropFilter: "blur(8px)",
              }}
            >
              Back to Home
            </Link>
          </motion.div>

          {/* Quick nav */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-full"
          >
            <p className="font-body text-xs uppercase tracking-[0.2em] mb-4"
              style={{ color: "hsl(var(--sand)/0.3)" }}>
              Or explore
            </p>

            {/* Divider line */}
            <div className="w-16 h-px mx-auto mb-5"
              style={{ background: "hsl(var(--sand)/0.15)" }} />

            <div className="flex flex-wrap items-center justify-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.55 + i * 0.06 }}
                >
                  <Link
                    to={link.href}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full
                      font-body text-xs uppercase tracking-widest
                      transition-all duration-200 group"
                    style={{
                      background: "hsl(var(--sand)/0.06)",
                      border: "1px solid hsl(var(--sand)/0.12)",
                      color: "hsl(var(--sand)/0.55)",
                      backdropFilter: "blur(6px)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "hsl(var(--primary)/0.12)";
                      e.currentTarget.style.borderColor = "hsl(var(--primary)/0.3)";
                      e.currentTarget.style.color = "hsl(var(--primary))";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "hsl(var(--sand)/0.06)";
                      e.currentTarget.style.borderColor = "hsl(var(--sand)/0.12)";
                      e.currentTarget.style.color = "hsl(var(--sand)/0.55)";
                    }}
                  >
                    <MapPin className="w-3 h-3 opacity-60" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>


      </section>
    </PageLayout>
  );
};

export default NotFound;