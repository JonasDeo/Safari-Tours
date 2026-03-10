import { OCCASIONS } from "@/constants/quoteData";
import MultiSelect from "../MultiSelect";
import toggleItem from "@/lib/toggleItem";


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