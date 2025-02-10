import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
  langGraphPlatformEndpoint,
} from "@copilotkit/runtime";
import { AvailableAgents } from "@/lib/available-agents";
const langsmithApiKey = (process.env.LANGSMITH_API_KEY as string) || "";

import { NextRequest } from "next/server";

const serviceAdapter = new OpenAIAdapter();

const runtime = new CopilotRuntime({
  remoteEndpoints: [
    langGraphPlatformEndpoint({
      deploymentUrl: process.env.TRAVEL_AGENT_URL as string,
      langsmithApiKey,
      agents: [
        {
          name: AvailableAgents.TRAVEL_AGENT,
          description: "This agent helps the user plan and manage their trips",
        },
      ],
    }),
    langGraphPlatformEndpoint({
      deploymentUrl: process.env.RESEARCH_AGENT_URL as string,
      langsmithApiKey,
      agents: [
        {
          name: AvailableAgents.RESEARCH_AGENT,
          description: "Research agent for the user to find information",
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
