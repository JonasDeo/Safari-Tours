import { DESTINATIONS } from "@/data/quoteData";
import MultiSelect from "../MultiSelect";
import toggleItem from "@/lib/toggleItem";


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