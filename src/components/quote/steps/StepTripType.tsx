import { TRIP_TYPES } from "@/constants/QuoteData";
import { toggleItem } from "@/hooks/use-quote-wizard";
import MultiSelect from "../MultiSelect";
import { StepErrors } from "../Quote";


interface StepTripTypeProps {
  selected: string[];
  onChange: (ids: string[]) => void;
  errors?: StepErrors;
}

const StepTripType = ({ selected, onChange }: StepTripTypeProps) => (
  <MultiSelect
    options={TRIP_TYPES}
    selected={selected}
    onToggle={(id) => onChange(toggleItem(selected, id))}
  />
);

export default StepTripType;