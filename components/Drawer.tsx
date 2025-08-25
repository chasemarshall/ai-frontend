import { useEffect } from "react";

export default function Drawer({ 
  open, 
  onClose, 
  children 
}: { 
  open: boolean; 
  onClose: () => void; 
  children: React.ReactNode; 
}) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [open, onClose]);

  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200" 
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-[420px] bg-white border-l border-black/10 shadow-2xl animate-in slide-in-from-right duration-300 ease-out">
        <div className="p-6 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
