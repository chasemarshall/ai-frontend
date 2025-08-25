export function Card({ 
  children, 
  className,
  hover = false 
}: { 
  children: React.ReactNode; 
  className?: string;
  hover?: boolean;
}) {
  const baseClasses = "rounded-3xl border border-black/5 bg-white/50 backdrop-blur-sm shadow-sm transition-all duration-200";
  const hoverClasses = hover ? "hover:shadow-md hover:scale-[1.02] hover:border-black/10" : "";
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className ?? ""}`}>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default Card;
