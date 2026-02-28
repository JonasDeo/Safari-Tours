import { Quote } from "lucide-react";

interface PullQuoteProps {
  content:      string;
  attribution?: string;
}

const PullQuote = ({ content, attribution }: PullQuoteProps) => (
  <blockquote
    className="relative my-10 pl-6 border-l-2 border-primary"
    aria-label="Pull quote"
  >
    <Quote
      className="absolute -top-1 -left-1 w-5 h-5 text-primary/40 rotate-180"
      aria-hidden="true"
    />

    <p className="font-display text-xl sm:text-2xl text-foreground leading-snug italic mb-3">
      "{content}"
    </p>

    {attribution && (
      <footer className="font-body text-sm text-muted-foreground">
        — {attribution}
      </footer>
    )}
  </blockquote>
);

export default PullQuote;