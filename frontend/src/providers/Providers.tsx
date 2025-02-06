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
      <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COPILOT_CLOUD_API_KEY}>
        {children}
      </CopilotKit>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
