import type { ReactNode } from "react";
export function Card({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl border border-black/10 bg-white/60 backdrop-blur-[var(--backdrop-blur)] shadow-soft ${className ?? ""}`}>
      <div className="p-6 sm:p-8">{children}</div>
    </section>
  );
}
export default Card;
