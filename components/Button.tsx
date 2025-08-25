import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const button = cva(
  "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold " +
  "transition-transform duration-150 ease-smooth active:scale-95 select-none border",
  {
    variants: {
      tone: { solid: "bg-ink text-paper border-black", glass: "bg-white/20 text-ink border-black/10 backdrop-blur", ghost: "bg-transparent text-ink border-black/10" },
      size: { sm: "h-9", md: "h-10", lg: "h-12 text-base px-5" }
    },
    defaultVariants: { tone: "solid", size: "md" }
  }
);
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>) {
  const { className, tone, size, ...rest } = props;
  return <button className={clsx(button({ tone, size }), className)} {...rest} />;
}
export default Button;
