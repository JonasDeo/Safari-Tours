import { Check } from "lucide-react";
import { TripTypeOption } from "./Quote";

// Option can be a plain string (destinations, experiences, occasions)
// or a TripTypeOption with a LucideIcon
type Option = string | TripTypeOption;

interface MultiSelectProps {
  options:  Option[];
  selected: string[];
  onToggle: (id: string) => void;
}

const MultiSelect = ({ options, selected, onToggle }: MultiSelectProps) => (
  <div className="flex flex-wrap gap-2.5">
    {options.map((opt) => {
      const id     = typeof opt === "string" ? opt : opt.id;
      const label  = typeof opt === "string" ? opt : opt.label;
      const Icon   = typeof opt === "string" ? null : opt.icon;
      const active = selected.includes(id);

      return (
        <button
          key={id}
          type="button"
          onClick={() => onToggle(id)}
          className={`group flex items-center gap-2 px-4 py-2.5 rounded-full text-sm border
            transition-all duration-200 font-body select-none
            ${active
              ? "bg-primary/15 border-primary text-primary shadow-sm shadow-primary/10"
              : "bg-white/3 border-sand/15 text-sand/60 hover:border-sand/35 hover:text-sand/85 hover:bg-white/5"
            }`}
        >
          {Icon && (
            <Icon
              className={`w-3.5 h-3.5 flex-shrink-0 transition-colors duration-200 ${
                active ? "text-primary" : "text-sand/40 group-hover:text-sand/60"
              }`}
            />
          )}
          {active
            ? <Check className="w-3 h-3 flex-shrink-0" />
            : <span className="w-3 h-3 flex-shrink-0 rounded-full border border-sand/20 group-hover:border-sand/40 transition-colors" />
          }
          {label}
        </button>
      );
    })}
  </div>
);

export default MultiSelect;