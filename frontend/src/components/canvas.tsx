"use client";

import { Suspense } from "react";
import { ChatWindow } from "./chat-window";
import { useCoAgents } from "./coagents-provider";

export default function Canvas() {
  const coAgents = useCoAgents();

  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-12">
      <div className="order-last md:order-first md:col-span-4 p-4 border-r h-screen overflow-y-auto">
        <ChatWindow />
      </div>

      <div className="order-first md:order-last md:col-span-8 bg-white p-8 overflow-y-auto">
        <div className="space-y-8">
          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-row gap-4">
              <pre>{JSON.stringify(coAgents, null, 2)}</pre>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
