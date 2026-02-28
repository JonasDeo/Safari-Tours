import { TRIP_TYPES } from "@/constants/QuoteData";
import { toggleItem } from "@/hooks/use-quote-wizard";
import MultiSelect from "../MultiSelect";


interface StepTripTypeProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

const StepTripType = ({ selected, onChange }: StepTripTypeProps) => (
  <MultiSelect
    options={TRIP_TYPES}
    selected={selected}
    onToggle={(id) => onChange(toggleItem(selected, id))}
  />
);

export default StepTripType;