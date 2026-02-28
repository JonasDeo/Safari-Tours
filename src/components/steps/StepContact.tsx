import type { ChangeEvent } from "react";
import { QuoteFormFields } from "../quote/Quote";
import InputField from "../quote/InputField";

interface StepContactProps {
  form:          QuoteFormFields;
  onFieldChange: (key: keyof QuoteFormFields, value: string) => void;
}

const StepContact = ({ form, onFieldChange }: StepContactProps) => {
  const handle = (e: ChangeEvent<HTMLInputElement>) =>
    onFieldChange(e.target.name as keyof QuoteFormFields, e.target.value);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField label="First Name"       name="firstName" value={form.firstName} onChange={handle} placeholder="Jane"             required />
      <InputField label="Last Name"        name="lastName"  value={form.lastName}  onChange={handle} placeholder="Smith"            required />
      <InputField label="Country"          name="country"   value={form.country}   onChange={handle} placeholder="United States"     required />
      <InputField label="Email" type="email" name="email"   value={form.email}     onChange={handle} placeholder="jane@example.com" required />
      <InputField label="Phone / WhatsApp" type="tel" name="phone" value={form.phone} onChange={handle} placeholder="+1 555 000 0000" required />
    </div>
  );
};

export default StepContact;