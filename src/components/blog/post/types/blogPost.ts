// Re-export base types so consumers only need one import path
export type { BlogPost, BlogCategory } from "../../Blog";

// ─── Content blocks  ───
// Structured content model — swap for a CMS (Sanity, Contentful, etc.) later.

export interface ParagraphBlock {
  type:    "paragraph";
  content: string;          // plain text, supports **bold** and _italic_ markers
}

export interface HeadingBlock {
  type:    "heading";
  level:   2 | 3;
  content: string;
  id:      string;          // anchor id for TOC links
}

export interface PullQuoteBlock {
  type:      "pullquote";
  content:   string;
  attribution?: string;
}

export interface ImageBlock {
  type:    "image";
  src:     string;
  alt:     string;
  caption?: string;
}

export interface ListBlock {
  type:    "list";
  style:   "bullet" | "numbered";
  items:   string[];
}

export interface TipBlock {
  type:    "tip";
  label:   string;
  content: string;
}

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | PullQuoteBlock
  | ImageBlock
  | ListBlock
  | TipBlock;

// ─── Full post (list post + body) ────────────────────────────────────────────

export interface FullBlogPost {
  id:          string;
  slug:        string;
  title:       string;
  excerpt:     string;
  category:    string;
  author:      string;
  authorBio:   string;
  date:        string;
  readingTime: number;
  image:       string;
  featured?:   boolean;
  body:        ContentBlock[];
}

// ─── TOC item (derived from HeadingBlocks) ───────────────────────────────────

export interface TOCItem {
  id:    string;
  label: string;
  level: 2 | 3;
}