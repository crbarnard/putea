import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label && <span className="text-sm font-medium">{label}</span>}
      <input
        id={id}
        className={`rounded-md border px-3 py-2 ${className}`}
        {...props}
      />
    </label>
  );
}