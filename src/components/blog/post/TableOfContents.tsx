import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TOCItem } from "./types/blogPost";

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="space-y-1">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body mb-4">
        In this article
      </p>

      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`group relative flex items-start gap-3 py-1.5 text-sm font-body
              transition-colors duration-200 rounded-sm
              ${item.level === 3 ? "pl-4" : ""}
              ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {/* Active indicator */}
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full
                transition-all duration-300
                ${isActive ? "bg-primary opacity-100" : "bg-transparent opacity-0"}`}
            />
            <span className="leading-snug">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
};

export default TableOfContents;