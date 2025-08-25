import type React from "react";
import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input(props, ref) {
    const { className = "", ...rest } = props;
    
    const baseClasses = "flex h-11 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-30 transition-all duration-200 hover:border-black/20";
    
    const classes = `${baseClasses} ${className}`.trim();
    
    return <input ref={ref} {...rest} className={classes} />;
  }
);

export default Input;
