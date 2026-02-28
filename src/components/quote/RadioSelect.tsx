import { AccommodationOption } from "./Quote";

interface RadioSelectProps {
  options:  AccommodationOption[];
  selected: string;
  onSelect: (id: string) => void;
}

const RadioSelect = ({ options, selected, onSelect }: RadioSelectProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
    {options.map((opt) => {
      const active = selected === opt.id;
      return (
        <button
          key={opt.id}
          type="button"
          onClick={() => onSelect(opt.id)}
          className={`flex items-start gap-3.5 p-4 rounded-2xl border text-left
            transition-all duration-200 group
            ${active
              ? "bg-primary/10 border-primary shadow-sm shadow-primary/10"
              : "bg-white/3 border-sand/10 hover:border-sand/25 hover:bg-white/5"
            }`}
        >
          {/* Custom radio */}
          <span className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0
            flex items-center justify-center transition-all duration-200
            ${active ? "border-primary" : "border-sand/30 group-hover:border-sand/50"}`}
          >
            {active && <span className="w-2 h-2 rounded-full bg-primary" />}
          </span>

          <span>
            <span className={`block text-sm font-medium transition-colors duration-200
              ${active ? "text-sand" : "text-sand/65 group-hover:text-sand/80"}`}>
              {opt.label}
            </span>
            {opt.sub && (
              <span className="block text-xs text-sand/35 mt-0.5 font-body">{opt.sub}</span>
            )}
          </span>
        </button>
      );
    })}
  </div>
);

export default RadioSelect;