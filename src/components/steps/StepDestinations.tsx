import { DESTINATIONS } from "@/constants/quoteData";
import { toggleItem } from "@/hooks/use-quote-wizard";
import MultiSelect from "../quote/MultiSelect";


interface StepDestinationsProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

const StepDestinations = ({ selected, onChange }: StepDestinationsProps) => (
  <MultiSelect
    options={DESTINATIONS}
    selected={selected}
    onToggle={(id) => onChange(toggleItem(selected, id))}
  />
);

export default StepDestinations;