import { clsx } from "clsx";
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input {...rest}
      className={clsx("w-full rounded-2xl border border-black/10 bg-white/60 backdrop-blur px-4 py-3 placeholder:text-black/40 focus-visible:outline-none focus:ring-0 focus:border-black/40", className)}
    />
  );
}
export default Input;
