"use client";
import { useCoAgent } from "@copilotkit/react-core";
import { createContext, useContext, useState } from "react";

/**
 * Travel Agent Types
 */
export type Place = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  description?: string;
};

export type Trip = {
  id: string;
  name: string;
  center_latitude: number;
  center_longitude: number;
  zoom_level?: number | 13;
  places: Place[];
};

export type SearchProgress = {
  query: string;
  done: boolean;
};

export type TravelAgentState = {
  trips: Trip[];
  selected_trip_id: string | null;
  search_progress?: SearchProgress[];
};

/**
 * Research Agent Types
 */
export interface Section {
  title: string;
  content: string;
  idx: number;
  footer?: string;
  id: string;
}

export interface Source {
  content: string;
  published_date: string;
  score: number;
  title: string;
  url: string;
}
export type Sources = Record<string, Source>;

export interface Log {
  message: string;
  done: boolean;
}

export interface ProposalSection {
  title: string;
  description: string;
  approved: boolean;
}

export enum ProposalSectionName {
  Sections = "sections",
}

export type IProposalItem = Record<string, ProposalSection>;

export interface Proposal {
  [ProposalSectionName.Sections]: IProposalItem;
  timestamp: string;
  approved: boolean;
  remarks?: string;
}

export interface ResearchAgentState {
  title: string;
  outline: Record<string, unknown>;
  proposal: Proposal;
  // structure: Record<string, unknown>;
  sections: Section[]; // Array of objects with 'title', 'content', and 'idx'
  sources: Sources; // Dictionary with string keys and nested dictionaries
  tool: string;
  messages: { [key: string]: unknown }[]; // Array of AnyMessage objects with potential additional properties
  logs: Log[];
}

export const AgentsContext = createContext<
  | {
      agents: Record<AvailableAgents, TravelAgentState | ResearchAgentState>;
      setAgents: (
        agents: Record<AvailableAgents, TravelAgentState | ResearchAgentState>
      ) => void;
    }
  | undefined
>(undefined);

enum AvailableAgents {
  TRAVEL_AGENT = "travel",
  RESEARCH_AGENT = "agent",
}

/**
 * This provider wraps state from all agents
 */
export const CoAgentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [agents, setAgents] = useState<
    Record<AvailableAgents, TravelAgentState | ResearchAgentState>
  >({
    [AvailableAgents.TRAVEL_AGENT]: {
      trips: [],
      selected_trip_id: null,
      search_progress: [],
    },
    [AvailableAgents.RESEARCH_AGENT]: {
      title: "",
      outline: {},
      proposal: {
        [ProposalSectionName.Sections]: {},
        timestamp: "",
        approved: false,
      },
      sections: [],
      sources: {},
      tool: "",
      messages: [],
      logs: [],
    },
  });

  useCoAgent({
    name: AvailableAgents.TRAVEL_AGENT,
    state: agents[AvailableAgents.TRAVEL_AGENT],
    setState: (state) =>
      setAgents((prevAgents) => ({
        ...prevAgents,
        [AvailableAgents.TRAVEL_AGENT]:
          typeof state === "function"
            ? state(prevAgents[AvailableAgents.TRAVEL_AGENT])
            : state,
      })),
  });

  useCoAgent({
    name: AvailableAgents.RESEARCH_AGENT,
    state: agents[AvailableAgents.RESEARCH_AGENT],
    setState: (state) =>
      setAgents((prevAgents) => ({
        ...prevAgents,
        [AvailableAgents.RESEARCH_AGENT]:
          typeof state === "function"
            ? state(prevAgents[AvailableAgents.RESEARCH_AGENT])
            : state,
      })),
  });

  return (
    <AgentsContext.Provider value={{ agents, setAgents }}>
      {children}
    </AgentsContext.Provider>
  );
};

export const useCoAgents = () => {
  const context = useContext(AgentsContext);
  if (!context) {
    throw new Error("useAgents must be used within an AgentsProvider");
  }
  return context;
};
