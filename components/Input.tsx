import type React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  const baseClasses =
    "w-full rounded-2xl border border-black/10 bg-white/60 backdrop-blur px-4 py-3 placeholder:text-black/40 focus-visible:outline-none focus:ring-0 focus:border-black/40";
  const classes = `${baseClasses} ${className}`.trim();
  return <input {...rest} className={classes} />;
}

export default Input;
