"use client";
import { useEffect, useState, useRef } from "react";
import Button from "./Button";

export default function StylePicker({ 
  conversationId, 
  onChange 
}: { 
  conversationId: string; 
  onChange?: (slug: string) => void; 
}) {
  const [styles, setStyles] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("normal");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    fetch("/api/styles")
      .then(r => r.json())
      .then(d => setStyles(d.items || [])); 
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function apply(slug: string) {
    setActive(slug);
    
    try {
      await fetch(`/api/conversations/${conversationId}/style`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ styleSlug: slug }) 
      });
      onChange?.(slug);
    } catch (error) {
      console.error('Failed to apply style:', error);
    }
    
    setOpen(false);
  }

  const activeStyle = styles.find(s => s.slug === active);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        tone="outline" 
        onClick={() => setOpen(v => !v)}
        className="hover:scale-105 transition-transform"
      >
        Style: {activeStyle?.name || active}
      </Button>
      
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-3xl border border-black/10 bg-white/95 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="p-2">
            {styles.map((style: any) => (
              <button 
                key={style.slug} 
                onClick={() => apply(style.slug)} 
                className={`w-full text-left p-4 rounded-2xl transition-all duration-200 hover:bg-black/5 active:scale-98 ${
                  active === style.slug ? "bg-black/5 ring-1 ring-black/10" : ""
                }`}
              >
                <div className="font-medium text-black mb-1">{style.name}</div>
                <div className="text-sm text-black/60 line-clamp-2">
                  {style.toneSys || "Default system behavior"}
                </div>
                {style.paramsJson && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {Object.entries(style.paramsJson).map(([key, value]) => (
                      <span 
                        key={key} 
                        className="px-2 py-1 text-xs bg-black/10 text-black/70 rounded-lg"
                      >
                        {key}: {String(value)}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
