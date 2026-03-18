import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { FullBlogPost } from "./types/blogPost";

interface PostHeroProps {
  post: FullBlogPost;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });

const PostHero = ({ post }: PostHeroProps) => (
  <header
    className="relative min-h-[55vh] md:min-h-[65vh] flex items-end overflow-hidden"
    style={{ paddingTop: "var(--nav-total-h, 100px)" }}
  >
    <img
      src={post.image}
      alt={post.title}
      className="absolute inset-0 w-full h-full object-cover"
      loading="eager"
    />

    {/* Gradient — fades down, heavy at bottom for text legibility */}
    <div className="absolute inset-0 bg-gradient-to-b from-dark-overlay/20 via-dark-overlay/45 to-dark-overlay/85" />

    {/* Back link */}
    <div className="absolute left-0 right-0 z-10" style={{ top: "var(--nav-total-h, 100px)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-body text-sand/70
            hover:text-sand transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Travel Journal
        </Link>
      </div>
    </div>

    {/* Title block */}
    <div className="relative z-10 w-full pb-10 md:pb-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
            text-xs font-body uppercase tracking-widest bg-primary text-primary-foreground
            mb-4 shadow-lg">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-sand
            leading-tight text-shadow-hero mb-4 max-w-3xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm font-body text-sand/60">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary/70" />
              {post.author}
            </span>
            <span className="text-sand/30">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-sand/30">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary/70" />
              {post.readingTime} min read
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  </header>
);

export default PostHero;