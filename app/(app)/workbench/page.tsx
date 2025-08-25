"use client";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Drawer from "@/components/Drawer";
import StylePicker from "@/components/StylePicker";
import { useState } from "react";

export default function Workbench() {
  const [drawer, setDrawer] = useState(false);
  const [styleSlug, setStyleSlug] = useState("normal");
  
  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">AI Workbench</h1>
            <p className="text-sm text-gray-400">Build something amazing with AI</p>
          </div>
          <Button tone="secondary" onClick={() => setDrawer(true)}>
            View Artifacts
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main Chat Area */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white">Project · Conversation</h2>
              <div className="flex gap-2">
                <StylePicker conversationId="demo-convo" onChange={setStyleSlug} />
                <Button size="sm">Run</Button>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                    <span className="text-xs font-medium text-white">AI</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">
                      I can help you build AI applications with a clean, modern interface. What would you like to create today?
                    </p>
                    <p className="mt-2 text-xs text-gray-500">Claude · Just now</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600">
                    <span className="text-xs font-medium text-white">You</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">
                      Help me create a modern chat interface with dark mode styling.
                    </p>
                    <p className="mt-2 text-xs text-gray-500">2m ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="flex items-center gap-3">
              <Input placeholder="Ask me anything..." className="flex-1" />
              <Button>Send</Button>
            </div>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-sm font-medium text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: "Updated design system", time: "2m ago", color: "blue" },
                  { action: "Created new components", time: "5m ago", color: "green" },
                  { action: "Deployed to production", time: "1h ago", color: "gray" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className={`h-2 w-2 rounded-full bg-${item.color}-500`} />
                    <span className="flex-1 text-gray-300">{item.action}</span>
                    <span className="text-gray-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-white">Artifacts</h2>
          <Button tone="ghost" onClick={() => setDrawer(false)}>Close</Button>
        </div>
        <div className="space-y-3">
          {["Design System v3", "Component Library v2", "Landing Page v1"].map((item, i) => (
            <div key={i} className="rounded-lg border border-gray-700 bg-gray-800/50 p-3">
              <div className="font-medium text-white">{item}</div>
              <div className="text-xs text-gray-400">Updated recently</div>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
