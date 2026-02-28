export type BlogCategory =
  | "All"
  | "Safari Tips"
  | "Wildlife"
  | "Destinations"
  | "Culture"
  | "Planning";

export interface BlogPost {
  id:          string;
  title:       string;
  excerpt:     string;
  category:    Exclude<BlogCategory, "All">;
  author:      string;
  date:        string;          // ISO string
  readingTime: number;          // minutes
  image:       string;          // asset import or URL
  slug:        string;
  featured?:   boolean;
}