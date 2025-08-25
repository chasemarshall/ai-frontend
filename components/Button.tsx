import type React from "react";

type ButtonTone = "solid" | "glass" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold " +
  "transition-transform duration-150 ease-smooth active:scale-95 select-none border";

const toneClasses: Record<ButtonTone, string> = {
  solid: "bg-ink text-paper border-black",
  glass: "bg-white/20 text-ink border-black/10 backdrop-blur",
  ghost: "bg-transparent text-ink border-black/10"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9",
  md: "h-10",
  lg: "h-12 text-base px-5"
};

function composeButtonClass({ tone, size }: { tone: ButtonTone; size: ButtonSize }) {
  return [baseClasses, toneClasses[tone], sizeClasses[size]].join(" ");
}

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: ButtonTone;
    size?: ButtonSize;
  }
) {
  const { className = "", tone = "solid", size = "md", ...rest } = props;
  const classes = `${composeButtonClass({ tone, size })} ${className}`.trim();
  return <button className={classes} {...rest} />;
}

export default Button;
