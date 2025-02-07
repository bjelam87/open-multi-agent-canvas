"use client";
import { CopilotChat } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core";
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
  // useCopilotAction({
  //   name: ""
  // })
  return (
    <CopilotChat
      className="h-full flex flex-col"
      instructions="You are a multi-agent chat system with specialized agents:
          - Travel Agent: Expert in planning trips, itineraries and travel recommendations
          - Research Agent: Specialized in conducting thorough research on any topic
          - Email Agent: Assists with drafting and composing professional emails
          Please identify which agent would be most helpful for the user's request and respond accordingly."
      labels={{
        placeholder: "Type your message here...",
        regenerateResponse: "Try another response",
      }}
      icons={{
        sendIcon: <SendIcon className="w-4 h-4" />,
        activityIcon: <ActivityIcon className="w-4 h-4" />,
        spinnerIcon: <Loader2 className="w-4 h-4 animate-spin" />,
        stopIcon: <Square className="w-4 h-4" />,
        regenerateIcon: <RotateCw className="w-4 h-4" />,
      }}
    />
  );
};
