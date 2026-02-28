import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { BlogPost } from "../Blog";

interface RelatedPostsProps {
  posts: BlogPost[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <p className="font-body text-xs uppercase tracking-[0.2em] text-primary mb-2">
        Continue Reading
      </p>
      <h2 className="font-display text-2xl text-foreground mb-8">Related Articles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.32, 0.72, 0, 1] }}
            className="group bg-card border border-border rounded-2xl overflow-hidden
              hover:border-primary/30 transition-colors duration-300"
          >
            <Link to={`/blog/${post.slug}`}>
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/9]">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700
                    group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/8
                  transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="inline-block font-body text-xs uppercase tracking-widest
                  text-primary mb-2">
                  {post.category}
                </span>
                <h3 className="font-display text-base text-foreground leading-snug mb-3
                  group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-xs font-body text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-primary/50" />
                    {post.readingTime} min
                  </span>
                  <span className="flex items-center gap-1 text-primary opacity-0
                    group-hover:opacity-100 transition-opacity duration-200">
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;