import { Link } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { BlogPost } from "./Blog";

interface FeaturedPostProps {
  post: BlogPost;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });

const FeaturedPost = ({ post }: FeaturedPostProps) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    className="group relative overflow-hidden rounded-2xl bg-card border border-border"
  >
    <Link to={`/blog/${post.slug}`} className="grid lg:grid-cols-[1.2fr_1fr] min-h-[480px]">

      {/* Image */}
      <div className="relative overflow-hidden order-1">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover
            transition-transform duration-700 ease-out group-hover:scale-105"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20" />

        {/* Category badge */}
        <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-body
          uppercase tracking-widest bg-primary text-primary-foreground shadow-lg">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="order-2 flex flex-col justify-between p-8 lg:p-10 xl:p-12">
        {/* Top */}
        <div>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Featured Article
          </p>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-foreground
            leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h2>

          <p className="font-body text-muted-foreground leading-relaxed text-sm lg:text-base line-clamp-4">
            {post.excerpt}
          </p>
        </div>

        {/* Bottom — meta + CTA */}
        <div>
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-body mt-6 mb-6 pb-6 border-b border-border">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary/60" />
              {post.author}
            </span>
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary/60" />
              {post.readingTime} min read
            </span>
          </div>

          {/* CTA */}
          <span className="inline-flex items-center gap-2 text-sm font-body font-semibold
            tracking-widest uppercase text-primary group/cta">
            Read Article
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  </motion.article>
);

export default FeaturedPost;