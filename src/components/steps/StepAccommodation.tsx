import { ACCOMMODATION } from "@/constants/QuoteData";
import RadioSelect from "../quote/RadioSelect";

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