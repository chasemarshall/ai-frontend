export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-lg ${className ?? ""}`}>
      <div className="p-6">{children}</div>
    </div>
  );
}
export default Card;
