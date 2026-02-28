import { EXPERIENCES } from "@/constants/quoteData";
import { toggleItem } from "@/hooks/use-quote-wizard";
import MultiSelect from "../MultiSelect";


interface StepExperiencesProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

const StepExperiences = ({ selected, onChange }: StepExperiencesProps) => (
  <MultiSelect
    options={EXPERIENCES}
    selected={selected}
    onToggle={(id) => onChange(toggleItem(selected, id))}
  />
);

export default StepExperiences;