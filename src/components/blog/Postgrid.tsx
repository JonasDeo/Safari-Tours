import { AnimatePresence, motion } from "framer-motion";
import { FileSearch } from "lucide-react";
import { BlogPost } from "./Blog";
import PostCard from "./Postcard";

interface PostGridProps {
  posts: BlogPost[];
}

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="col-span-full flex flex-col items-center justify-center py-20 text-center"
  >
    <FileSearch className="w-12 h-12 text-muted-foreground/30 mb-4" />
    <h3 className="font-display text-xl text-foreground mb-2">No articles found</h3>
    <p className="font-body text-sm text-muted-foreground">
      Try a different category to explore more stories.
    </p>
  </motion.div>
);

const PostGrid = ({ posts }: PostGridProps) => (
  <AnimatePresence mode="wait">
    {posts.length === 0 ? (
      <EmptyState key="empty" />
    ) : (
      <motion.div
        key="grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
      >
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

export default PostGrid;