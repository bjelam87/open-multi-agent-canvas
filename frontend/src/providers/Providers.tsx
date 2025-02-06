"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CopilotKit } from "@copilotkit/react-core";

// Create a client instance
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CopilotKit runtimeUrl="/api/copilotkit" showDevConsole={false}>
        {children}
      </CopilotKit>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
