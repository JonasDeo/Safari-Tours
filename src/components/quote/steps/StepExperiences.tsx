import { EXPERIENCES } from "@/data/quoteData";
import MultiSelect from "../MultiSelect";
import toggleItem from "@/lib/toggleItem";


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