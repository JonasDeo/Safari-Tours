import type { ChangeEvent } from "react";

interface InputFieldProps {
  label:        string;
  name:         string;
  value:        string;
  onChange:     (e: ChangeEvent<HTMLInputElement>) => void;
  type?:        string;
  placeholder?: string;
  required?:    boolean;
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: InputFieldProps) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={name}
      className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body"
    >
      {label}
      {required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
    </label>

    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-background border border-border rounded-xl px-4 py-3.5
        text-foreground placeholder-muted-foreground/50 text-sm font-body
        focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
        transition-all duration-200"
    />
  </div>
);

export default InputField;