"use client";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function StylePicker({ conversationId, onChange }: { conversationId: string; onChange?: (slug: string) => void; }) {
  const [styles, setStyles] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("normal");

  useEffect(() => { 
    fetch("/api/styles").then(r => r.json()).then(d => setStyles(d.items || [])); 
  }, []);

  async function apply(slug: string) {
    setActive(slug);
    await fetch(`/api/conversations/${conversationId}/style`, { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ styleSlug: slug }) 
    });
    onChange?.(slug);
    setOpen(false);
  }

  return (
    <div className="relative">
      <Button tone="outline" onClick={() => setOpen(v => !v)}>
        Style: {active}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-lg border border-gray-700 bg-gray-800 shadow-lg p-1 z-50">
          {styles.map((s: any) => (
            <button 
              key={s.slug} 
              onClick={() => apply(s.slug)} 
              className={`w-full text-left p-3 rounded-md transition-colors hover:bg-gray-700 ${
                active === s.slug ? "bg-gray-700" : ""
              }`}
            >
              <div className="font-medium text-white">{s.name}</div>
              <div className="text-xs text-gray-400 line-clamp-2">{s.toneSys}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
