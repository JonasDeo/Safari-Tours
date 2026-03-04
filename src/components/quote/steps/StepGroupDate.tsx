import type { ChangeEvent } from "react";
import InputField from "../InputField";
import { QuoteFormFields } from "../Quote";

interface StepGroupDateProps {
  form:          QuoteFormFields;
  onFieldChange: (key: keyof QuoteFormFields, value: string) => void;
  errors?:       Record<string, string>;
}

const StepGroupDate = ({ form, onFieldChange, errors = {} }: StepGroupDateProps) => {
  const handle = (e: ChangeEvent<HTMLInputElement>) =>
    onFieldChange(e.target.name as keyof QuoteFormFields, e.target.value);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <InputField
          label="Adults"
          type="number"
          name="adults"
          value={form.adults}
          onChange={handle}
          placeholder="2"
          error={errors.groupSize}
        />
        <InputField
          label="Children (under 12)"
          type="number"
          name="children"
          value={form.children}
          onChange={handle}
          placeholder="0"
        />
      </div>

      <InputField
        label="Preferred Arrival Date"
        type="date"
        name="arrivalDate"
        value={form.arrivalDate}
        onChange={handle}
        error={errors.startDate}
      />
    </div>
  );
};

export default StepGroupDate;