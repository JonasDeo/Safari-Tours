import { OCCASIONS } from "@/constants/quoteData";
import { toggleItem } from "@/hooks/use-quote-wizard";
import MultiSelect from "../quote/MultiSelect";


interface StepOccasionProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

const StepOccasion = ({ selected, onChange }: StepOccasionProps) => (
  <MultiSelect
    options={OCCASIONS}
    selected={selected}
    onToggle={(id) => onChange(toggleItem(selected, id))}
  />
);

export default StepOccasion;