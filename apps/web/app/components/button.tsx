import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-md px-4 py-2 font-medium bg-black text-white hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}