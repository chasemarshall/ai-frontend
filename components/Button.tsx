import type React from "react";

type ButtonTone = "default" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-30 active:scale-95";

const toneClasses: Record<ButtonTone, string> = {
  default: "bg-black text-white hover:bg-black/80 rounded-2xl shadow-sm hover:shadow-md",
  secondary: "bg-black/5 text-black hover:bg-black/10 rounded-2xl",
  ghost: "text-black/60 hover:text-black hover:bg-black/5 rounded-2xl",
  outline: "border border-black/10 text-black hover:bg-black/5 hover:border-black/20 rounded-2xl backdrop-blur-sm"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base"
};

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ButtonTone;
  size?: ButtonSize;
}) {
  const { className = "", tone = "default", size = "md", ...rest } = props;
  const classes = `${baseClasses} ${toneClasses[tone]} ${sizeClasses[size]} ${className}`.trim();
  return <button className={classes} {...rest} />;
}

export default Button;
