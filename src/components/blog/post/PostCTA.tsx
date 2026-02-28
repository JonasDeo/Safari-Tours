import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PostCTA = () => (
  <aside
    className="my-14 relative overflow-hidden rounded-2xl bg-dark-overlay border border-sand/10 p-8 sm:p-10"
    aria-label="Book your safari"
  >
    {/* Subtle background glow */}
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    </div>

    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div>
        <p className="font-body text-xs uppercase tracking-[0.2em] text-primary mb-2">
          Ready to go?
        </p>
        <h3 className="font-display text-2xl sm:text-3xl text-sand leading-tight mb-2">
          Plan Your Migration Safari
        </h3>
        <p className="font-body text-sm text-sand/50 max-w-sm">
          Our guides have witnessed hundreds of crossings. Let us help you plan a trip
          that gives you the best possible chance of witnessing one.
        </p>
      </div>

      <Link
        to="/quote"
        className="group flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5
          bg-primary text-primary-foreground font-body text-sm font-semibold
          tracking-widest uppercase rounded-full shadow-lg shadow-primary/25
          hover:bg-primary/90 transition-all duration-200"
      >
        Get a Free Quote
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  </aside>
);

export default PostCTA;