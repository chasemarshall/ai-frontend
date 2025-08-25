"use client";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Drawer from "@/components/Drawer";
import StylePicker from "@/components/StylePicker";
import { useState } from "react";

export default function Workbench() {
  const [drawer, setDrawer] = useState(true);
  const [styleSlug, setStyleSlug] = useState("normal");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
      <Card>
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Project · Conversation</h1>
          <div className="flex gap-2">
            <StylePicker conversationId="demo-convo" onChange={setStyleSlug} />
            <Button>Run</Button>
          </div>
        </header>
        <div className="mt-6 space-y-4">
          <div className="rounded-3xl border border-black/10 p-4">assistant message…</div>
          <div className="rounded-3xl border border-black/10 p-4">user message…</div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Input placeholder="Type your message…" />
          <Button className="shrink-0">Send</Button>
        </div>
      </Card>

      <Drawer open={drawer} onClose={()=>setDrawer(false)}>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold tracking-tight">Artifact</h2>
          <Button tone="ghost" onClick={()=>setDrawer(false)}>Close</Button>
        </div>
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl border border-black/10 p-3">v3 · summary…</div>
          <div className="rounded-2xl border border-black/10 p-3">v2 · summary…</div>
          <div className="rounded-2xl border border-black/10 p-3">v1 · summary…</div>
        </div>
      </Drawer>
    </div>
  );
}
