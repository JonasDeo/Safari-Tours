import { User } from "lucide-react";

interface AuthorCardProps {
  name: string;
  bio:  string;
}

const AuthorCard = ({ name, bio }: AuthorCardProps) => (
  <div className="flex gap-5 p-6 rounded-2xl bg-muted/40 border border-border mt-10">
    {/* Avatar placeholder */}
    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/15 border border-primary/25
      flex items-center justify-center">
      <User className="w-6 h-6 text-primary/70" />
    </div>

    <div>
      <p className="font-body text-xs uppercase tracking-widest text-primary mb-1">
        Written by
      </p>
      <p className="font-display text-lg text-foreground mb-1">{name}</p>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{bio}</p>
    </div>
  </div>
);

export default AuthorCard;