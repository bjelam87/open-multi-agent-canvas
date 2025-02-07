"use client";

import { Suspense } from "react";
import { ChatWindow } from "./chat-window";
import * as Skeletons from "@/components/skeletons";
import Map from "@/components/map";

export default function Canvas() {
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-12">
      <div className="order-last md:order-first md:col-span-4 p-4 border-r h-screen overflow-y-auto">
        <ChatWindow />
      </div>

      <div className="order-first md:order-last md:col-span-8 bg-white p-8 overflow-y-auto">
        <div className="space-y-8">
          <Suspense fallback={<Skeletons.EmailListSkeleton />}>
            <div className="flex flex-row gap-4"></div>
          </Suspense>
          <div className="flex flex-row gap-4">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}
