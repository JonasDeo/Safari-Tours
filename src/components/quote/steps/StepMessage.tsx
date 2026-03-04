import type { ChangeEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { QuoteState } from "../Quote";

interface StepMessageProps {
  message:  string;
  onChange: (value: string) => void;
  state:    QuoteState;
  errors?:  Record<string, string>;
}

const SummaryRow = ({ label, value }: { label: string; value: string }) =>
  value ? (
    <div className="flex gap-3 text-sm">
      <span className="text-muted-foreground w-24 sm:w-28 flex-shrink-0 font-body text-xs sm:text-sm">
        {label}
      </span>
      <span className="text-foreground/80 text-xs sm:text-sm break-words min-w-0">{value}</span>
    </div>
  ) : null;

const StepMessage = ({ message, onChange, state }: StepMessageProps) => {
  const { tripTypes, destinations, accommodation, form } = state;

  return (
    <div className="space-y-5">
      <textarea
        value={message}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        rows={4}
        placeholder="Any special requests, dietary needs, mobility considerations, or wishes…"
        className="w-full bg-background border border-border rounded-xl px-4 py-3.5
          text-foreground placeholder-muted-foreground/50 text-sm font-body resize-none
          focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
          transition-all duration-200"
      />

      {/* Summary card */}
      <div className="rounded-2xl border border-border bg-muted/30 p-4 sm:p-5 space-y-2.5">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 text-primary/70 flex-shrink-0" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-body">
            Your summary
          </span>
        </div>
        <SummaryRow label="Trip type"     value={tripTypes.join(", ")} />
        <SummaryRow label="Destinations"  value={destinations.join(", ")} />
        <SummaryRow label="Accommodation" value={accommodation} />
        <SummaryRow label="Travellers"
          value={form.adults ? `${form.adults} adults${form.children ? `, ${form.children} children` : ""}` : ""} />
        <SummaryRow label="Arrival"       value={form.arrivalDate} />
        <SummaryRow label="Name"          value={`${form.firstName} ${form.lastName}`.trim()} />
        <SummaryRow label="Email"         value={form.email} />
      </div>
    </div>
  );
};

export default StepMessage;