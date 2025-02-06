import { Suspense } from "react";
import * as Skeletons from "./skeletons";

export default function Canvas() {
  // Select the component without calling it immediately
  const RandomSkeleton = [
    Skeletons.XKCDSkeleton,
    Skeletons.EmailSkeleton,
    Skeletons.EmailListSkeleton,
    Skeletons.ResearchPaperSkeleton,
    Skeletons.ChatSkeleton,
  ][Math.floor(Math.random() * 5)];

  return (
    <div className="h-full w-full flex">
      <div className="w-[30%] p-4 border-r h-screen">
        <Skeletons.ChatSkeleton />
      </div>

      <div className="flex-1 bg-white p-8">
        <div className="space-y-8">
          <Suspense fallback={<div>Loading...</div>}>
            <RandomSkeleton />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
