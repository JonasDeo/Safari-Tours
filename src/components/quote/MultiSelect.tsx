import { Check } from "lucide-react";
import { TripTypeOption } from "./Quote";

type Option = string | TripTypeOption;

interface MultiSelectProps {
  options:  Option[];
  selected: string[];
  onToggle: (id: string) => void;
  errors?:  Record<string, string>;
}

const MultiSelect = ({ options, selected, onToggle, errors }: MultiSelectProps) => {
  // Find the first error value if any
  const errorMsg = errors ? Object.values(errors)[0] : undefined;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 sm:gap-3">
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
              className={`group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5
                rounded-full text-xs sm:text-sm border
                transition-all duration-200 font-body select-none
                ${active
                  ? "bg-primary/15 border-primary text-primary shadow-sm shadow-primary/10"
                  : "bg-background border-border text-foreground/70 hover:border-primary/50 hover:text-foreground hover:bg-muted/60"
                }`}
            >
              {Icon && (
                <Icon className={`w-3.5 h-3.5 flex-shrink-0 transition-colors duration-200
                  ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
              )}
              {active
                ? <Check className="w-3 h-3 flex-shrink-0 text-primary" />
                : <span className="w-3 h-3 flex-shrink-0 rounded-full border border-border
                    group-hover:border-primary/40 transition-colors" />
              }
              {label}
            </button>
          );
        })}
      </div>

      {errorMsg && (
        <p className="text-xs text-red-400 font-body flex items-center gap-1.5 mt-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default MultiSelect;