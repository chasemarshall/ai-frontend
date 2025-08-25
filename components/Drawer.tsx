export default function Drawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50">
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="absolute right-0 top-0 h-full w-[380px] bg-gray-900 border-l border-gray-800 shadow-xl">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
