import { Link } from "react-router-dom";
import { Clock, User, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { BlogPost } from "./Blog";

interface PostCardProps {
  post:  BlogPost;
  index: number;       // for staggered entrance animation
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });

const PostCard = ({ post, index }: PostCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.45,
      delay:    index * 0.07,
      ease:     [0.32, 0.72, 0, 1],
    }}
    className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden
      hover:border-primary/30 transition-colors duration-300"
  >
    <Link to={`/blog/${post.slug}`} className="flex flex-col flex-1">

      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] flex-shrink-0">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out
            group-hover:scale-105"
        />

        {/* Terracotta overlay on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10
          transition-colors duration-500" />

        {/* Category chip */}
        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-body
          uppercase tracking-widest bg-dark-overlay/80 text-sand backdrop-blur-sm
          border border-sand/10">
          {post.category}
        </span>

        {/* Arrow icon — appears on hover */}
        <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary
          flex items-center justify-center opacity-0 group-hover:opacity-100
          translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="font-display text-lg sm:text-xl text-foreground leading-snug mb-2.5
          group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground
          font-body pt-4 border-t border-border">
          <span className="flex items-center gap-1.5">
            <User className="w-3 h-3 text-primary/50" />
            {post.author}
          </span>
          <span className="text-border">·</span>
          <span>{formatDate(post.date)}</span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-primary/50" />
            {post.readingTime} min
          </span>
        </div>
      </div>
    </Link>
  </motion.article>
);

export default PostCard;