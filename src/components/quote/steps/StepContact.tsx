import type { ChangeEvent } from "react";
import { QuoteFormFields } from "../Quote";
import InputField from "../InputField";

interface StepContactProps {
  form:          QuoteFormFields;
  onFieldChange: (key: keyof QuoteFormFields, value: string) => void;
  errors?:       Record<string, string>;
}

const StepContact = ({ form, onFieldChange, errors = {} }: StepContactProps) => {
  const handle = (e: ChangeEvent<HTMLInputElement>) =>
    onFieldChange(e.target.name as keyof QuoteFormFields, e.target.value);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField label="First Name" name="firstName" value={form.firstName}
        onChange={handle} placeholder="Jane"            required error={errors.firstName} />
      <InputField label="Last Name"  name="lastName"  value={form.lastName}
        onChange={handle} placeholder="Smith"           required error={errors.lastName} />
      <InputField label="Country"    name="country"   value={form.country}
        onChange={handle} placeholder="United States"   required error={errors.country} />
      <InputField label="Email" type="email" name="email" value={form.email}
        onChange={handle} placeholder="jane@example.com" required error={errors.email} />
      <InputField label="Phone / WhatsApp" type="tel" name="phone" value={form.phone}
        onChange={handle} placeholder="+1 555 000 0000"  required error={errors.phone}
        // span full width on sm when odd count
        // achieved via className on wrapper — InputField handles it internally
      />
    </div>
  );
};

export default StepContact;