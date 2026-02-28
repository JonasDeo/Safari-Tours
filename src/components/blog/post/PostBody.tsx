import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { ContentBlock } from "./types/blogPost";
import PullQuote from "./PullQuote";

// Inline text formatter 
// Converts **bold** and _italic_ markers in plain strings to React elements.

const parseInline = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("_") && part.endsWith("_")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

// Individual block renderers 

const Paragraph = ({ content }: { content: string }) => (
  <p className="font-body text-base sm:text-lg text-foreground/85 leading-relaxed mb-6">
    {parseInline(content)}
  </p>
);

const Heading = ({
  level,
  id,
  content,
}: {
  level: 2 | 3;
  id: string;
  content: string;
}) => {
  if (level === 2) {
    return (
      <h2
        id={id}
        className="font-display text-2xl sm:text-3xl text-foreground mt-12 mb-5
          scroll-mt-24 leading-tight"
      >
        {content}
      </h2>
    );
  }
  return (
    <h3
      id={id}
      className="font-display text-xl sm:text-2xl text-foreground mt-8 mb-4
        scroll-mt-24 leading-tight"
    >
      {content}
    </h3>
  );
};

const BlockImage = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) => (
  <figure className="my-10 -mx-4 sm:mx-0">
    <div className="overflow-hidden rounded-xl sm:rounded-2xl">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full object-cover max-h-[520px]"
      />
    </div>
    {caption && (
      <figcaption className="mt-3 text-sm font-body text-muted-foreground text-center italic">
        {caption}
      </figcaption>
    )}
  </figure>
);

const BlockList = ({
  style,
  items,
}: {
  style: "bullet" | "numbered";
  items: string[];
}) => {
  const Tag = style === "numbered" ? "ol" : "ul";
  return (
    <Tag
      className={`mb-6 space-y-3 font-body text-base sm:text-lg text-foreground/80 leading-relaxed
        ${style === "numbered" ? "list-decimal list-outside pl-5" : "list-none"}`}
    >
      {items.map((item, i) => (
        <li key={i} className={style === "bullet" ? "flex gap-3" : ""}>
          {style === "bullet" && (
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
          )}
          <span>{parseInline(item)}</span>
        </li>
      ))}
    </Tag>
  );
};

const TipBlock = ({ label, content }: { label: string; content: string }) => (
  <aside className="my-8 flex gap-4 p-5 rounded-2xl bg-primary/8 border border-primary/20">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
      <Lightbulb className="w-4 h-4 text-primary" aria-hidden="true" />
    </div>
    <div>
      <p className="font-body text-xs uppercase tracking-widest text-primary mb-1.5">{label}</p>
      <p className="font-body text-sm sm:text-base text-foreground/80 leading-relaxed">{content}</p>
    </div>
  </aside>
);

//  Main renderer 

interface PostBodyProps {
  blocks: ContentBlock[];
}

const PostBody = ({ blocks }: PostBodyProps) => (
  <div>
    {blocks.map((block, i) => {
      switch (block.type) {
        case "paragraph":
          return <Paragraph key={i} content={block.content} />;

        case "heading":
          return (
            <Heading key={i} level={block.level} id={block.id} content={block.content} />
          );

        case "pullquote":
          return (
            <PullQuote key={i} content={block.content} attribution={block.attribution} />
          );

        case "image":
          return (
            <BlockImage key={i} src={block.src} alt={block.alt} caption={block.caption} />
          );

        case "list":
          return <BlockList key={i} style={block.style} items={block.items} />;

        case "tip":
          return <TipBlock key={i} label={block.label} content={block.content} />;

        default:
          return null;
      }
    })}
  </div>
);

export default PostBody;