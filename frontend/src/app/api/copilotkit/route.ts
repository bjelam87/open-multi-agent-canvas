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
      deploymentUrl:
        "https://coagents-travel-python-efcd09921b465eb199d6233827f8ecfd.default.us.langgraph.app",
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
      deploymentUrl:
        "https://matcopvili-demo-bf2f52e9a3445590abfe0919fc8dcd1c.default.us.langgraph.app",
      agents: [
        {
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
