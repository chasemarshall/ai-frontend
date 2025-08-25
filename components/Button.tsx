import type React from "react";

type ButtonTone = "default" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const toneClasses: Record<ButtonTone, string> = {
  default: "bg-white text-gray-900 hover:bg-gray-100",
  secondary: "bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700",
  ghost: "text-gray-400 hover:text-gray-100 hover:bg-gray-800",
  outline: "border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 py-2",
  lg: "h-11 px-8"
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
