import type { ChangeEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { QuoteState } from "../quote/Quote";

interface StepMessageProps {
  message:   string;
  onChange:  (value: string) => void;
  state:     QuoteState;           // for the summary preview
}

const SummaryRow = ({ label, value }: { label: string; value: string }) =>
  value ? (
    <div className="flex gap-3 text-sm">
      <span className="text-sand/35 w-28 flex-shrink-0 font-body">{label}</span>
      <span className="text-sand/70">{value}</span>
    </div>
  ) : null;

const StepMessage = ({ message, onChange, state }: StepMessageProps) => {
  const { tripTypes, destinations, accommodation, form } = state;

  return (
    <div className="space-y-6">
      <textarea
        value={message}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        rows={4}
        placeholder="Any special requests, dietary needs, mobility considerations, or wishes…"
        className="w-full bg-white/3 border border-sand/12 rounded-xl px-4 py-3.5
          text-sand/80 placeholder-sand/20 text-sm font-body resize-none
          focus:outline-none focus:border-primary/60 focus:bg-primary/5
          transition-all duration-200"
      />

      {/* Summary card */}
      <div className="rounded-2xl border border-sand/8 bg-white/2 p-5 space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 text-primary/70" />
          <span className="text-xs uppercase tracking-widest text-sand/40 font-body">Your summary</span>
        </div>

        <SummaryRow label="Trip type"      value={tripTypes.join(", ")}    />
        <SummaryRow label="Destinations"   value={destinations.join(", ")} />
        <SummaryRow label="Accommodation"  value={accommodation}           />
        <SummaryRow label="Travellers"     value={form.adults ? `${form.adults} adults, ${form.children} children` : ""} />
        <SummaryRow label="Arrival"        value={form.arrivalDate}        />
        <SummaryRow label="Name"           value={`${form.firstName} ${form.lastName}`.trim()} />
        <SummaryRow label="Email"          value={form.email}              />
      </div>
    </div>
  );
};

export default StepMessage;