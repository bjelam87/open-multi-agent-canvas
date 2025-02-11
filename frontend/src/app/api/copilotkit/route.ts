import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
  langGraphPlatformEndpoint,
  // copilotKitEndpoint,
} from "@copilotkit/runtime";

const langsmithApiKey = (process.env.LANGSMITH_API_KEY as string) || "";

import { NextRequest } from "next/server";

const serviceAdapter = new OpenAIAdapter();

const runtime = new CopilotRuntime({
  remoteEndpoints: [
    // copilotKitEndpoint({
    //   url: process.env.COPILOTKIT_END_POINT_URL as string,
    // }),
    langGraphPlatformEndpoint({
      deploymentUrl: process.env.TRAVEL_AGENT_URL as string,
      langsmithApiKey,
      agents: [
        {
          name: "travel",
          description: "This agent helps the user plan and manage their trips",
        },
      ],
    }),
    langGraphPlatformEndpoint({
      langsmithApiKey,
      deploymentUrl: "http://localhost:8002",
      agents: [
        {
          // This name is important, it will be used to identify the agent in the chat window
          name: "agent",
          description: "Research assistant",
        },
      ],
    }),
  ],
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
