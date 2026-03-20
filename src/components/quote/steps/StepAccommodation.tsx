import { ACCOMMODATION } from "@/constants/quoteData";
import RadioSelect from "../RadioSelect";

interface StepAccommodationProps {
  selected: string;
  onChange: (id: string) => void;
}

const StepAccommodation = ({ selected, onChange }: StepAccommodationProps) => (
  <RadioSelect
    options={ACCOMMODATION}
    selected={selected}
    onSelect={onChange}
  />
);

export default StepAccommodation;