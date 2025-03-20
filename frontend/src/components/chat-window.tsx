"use client";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import {
  ActivityIcon,
  Loader2,
  RotateCw,
  SendIcon,
  Square,
} from "lucide-react";
import { FC } from "react";

export const ChatWindow: FC = () => {
  return (
    <CopilotChat
      className="h-full flex flex-col"
      instructions="You are a multi-agent chat system that dynamically selects the most appropriate agent based on the user's query, which is provided separately. Your available agents are:

Travel Agent: Specializes in planning trips, creating itineraries, and providing travel recommendations.
Research Agent: Focuses on assisting with the research and writing of academic papers on a wide range of topics.
AI Research Agent: Provides specialized support for research and writing, with an emphasis on AI-related subjects.
MCP Agent: A general-purpose agent equipped to handle any tasks not clearly covered by the other agents.
Evaluate the content of the user's query and delegate it to the agent whose expertise best matches the task. If the query doesn't align with any specialized category, default to the MCP Agent."
      labels={{
        placeholder: "Type your message here...",
        regenerateResponse: "Try another response",
      }}
      icons={{
        sendIcon: (
          <SendIcon className="w-4 h-4 hover:scale-110 transition-transform" />
        ),
        activityIcon: <ActivityIcon className="w-4 h-4 animate-pulse" />,
        spinnerIcon: <Loader2 className="w-4 h-4 animate-spin" />,
        stopIcon: (
          <Square className="w-4 h-4 hover:text-red-500 transition-colors" />
        ),
        regenerateIcon: (
          <RotateCw className="w-4 h-4 hover:rotate-180 transition-transform duration-300" />
        ),
      }}
    />
  );
};
