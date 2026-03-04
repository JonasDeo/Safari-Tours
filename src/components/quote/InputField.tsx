import type { ChangeEvent } from "react";

interface InputFieldProps {
  label:        string;
  name:         string;
  value:        string;
  onChange:     (e: ChangeEvent<HTMLInputElement>) => void;
  type?:        string;
  placeholder?: string;
  required?:    boolean;
  error?:       string;
}

const InputField = ({
  label, name, value, onChange,
  type = "text", placeholder, required = false, error,
}: InputFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={name}
      className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-body">
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
      className={`w-full bg-background border rounded-xl px-4 py-3 sm:py-3.5
        text-foreground placeholder-muted-foreground/50 text-sm font-body
        focus:outline-none focus:ring-1 transition-all duration-200
        ${error
          ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/20"
          : "border-border focus:border-primary focus:ring-primary/20"
        }`}
    />

    {error && (
      <p className="text-xs text-red-400 font-body flex items-center gap-1.5 mt-0.5">
        <span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
        {error}
      </p>
    )}
  </div>
);

export default InputField;