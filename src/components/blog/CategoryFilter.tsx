import { CATEGORIES } from "@/data/blogData";
import { motion } from "framer-motion";
import { BlogCategory } from "./Blog";

interface CategoryFilterProps {
  active:   BlogCategory;
  onChange: (cat: BlogCategory) => void;
  counts:   Record<string, number>;
}

const CategoryFilter = ({ active, onChange, counts }: CategoryFilterProps) => (
  <div className="flex flex-wrap gap-2">
    {CATEGORIES.map((cat) => {
      const isActive = cat === active;
      return (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body
            transition-all duration-200 border
            ${isActive
              ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
              : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
        >
          {cat}
          {cat !== "All" && counts[cat] !== undefined && (
            <span
              className={`text-xs tabular-nums ${
                isActive ? "text-primary-foreground/70" : "text-muted-foreground/60"
              }`}
            >
              {counts[cat]}
            </span>
          )}
          {/* Active underline pill indicator */}
          {isActive && (
            <motion.span
              layoutId="category-pill"
              className="absolute inset-0 rounded-full bg-primary -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
        </button>
      );
    })}
  </div>
);

export default CategoryFilter;