import {
  AvailableAgents,
  Proposal,
  ProposalSection,
  ProposalSectionName,
  ResearchAgentState,
} from "@/components/coagents-provider";
import { ResearchPaperSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  useCoAgent,
  useCoAgentStateRender,
  useCopilotAction,
} from "@copilotkit/react-core";
import { useCallback, useEffect, useRef, useState } from "react";
// import ReactMarkdown from "react-markdown";
interface ResearchLogsProps {
  logs: { message: string; done: boolean }[];
}

const ResearchLogs: React.FC<ResearchLogsProps> = ({ logs }) => {
  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-md">
      <section aria-labelledby="research-logs-title">
        <ol className="relative border-l border-gray-200 ml-3">
          {logs?.map((log, index) => (
            <li key={index} className="mb-6 ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white">
                {log.done && (
                  <div className="w-2 h-2 bg-green-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
              <p className="text-sm font-normal text-gray-700">{log.message}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

function ProposalItem({
  proposalItemKey,
  proposal,
  renderSection,
  title,
}: {
  proposal: Proposal;
  proposalItemKey: ProposalSectionName;
  renderSection: (
    name: ProposalSectionName,
    title: string,
    section: ProposalSection
  ) => React.ReactNode;
  title: string;
}) {
  const proposalItem = proposal[proposalItemKey];

  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {Object.entries(proposalItem).map(([key, section]) =>
        typeof section === "string"
          ? null
          : renderSection(proposalItemKey, key, section)
      )}
    </div>
  );
}

export function ProposalViewer({
  onSubmit,
  proposal,
}: {
  onSubmit: (approved: boolean, proposal: Proposal) => void;
  proposal: Proposal;
}) {
  const [reviewedProposal, setReviewedProposal] = useState(proposal);

  const handleCheckboxChange = (
    sectionType: ProposalSectionName,
    sectionKey: string,
    checked: boolean
  ) => {
    setReviewedProposal((prev) => {
      const newStructure = { ...prev };
      newStructure[sectionType][sectionKey].approved = checked;
      return newStructure;
    });
  };

  const handleRemarksChange = (remarks: string) => {
    setReviewedProposal((prev) => ({
      ...prev,
      remarks,
    }));
  };

  const handleSubmit = useCallback(
    (approved: boolean) => {
      onSubmit(approved, reviewedProposal);
    },
    [onSubmit, reviewedProposal]
  );

  const renderSection = (
    sectionType: ProposalSectionName,
    sectionKey: string,
    section: ProposalSection
  ) => (
    <div
      key={`${sectionType}-${sectionKey}`}
      className="flex items-start space-x-2 mb-2"
    >
      <Checkbox
        id={`${sectionType}-${sectionKey}`}
        checked={section.approved}
        onCheckedChange={(checked) =>
          handleCheckboxChange(sectionType, sectionKey, checked as boolean)
        }
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={`${sectionType}-${sectionKey}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {section.title}
        </label>
        <p className="text-sm text-muted-foreground">{section.description}</p>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto border-black/10 shadow-none rounded-none">
      <CardHeader>
        <CardTitle>Research Paper Proposal</CardTitle>
        <CardDescription>
          I&apos;ve prepared a proposal for structuring your research. Feel free
          to modify any sections or points to better match your needs - we can
          adjust until it&apos;s exactly what you&apos;re looking for.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {ProposalItem({
            title: "Sections",
            proposalItemKey: ProposalSectionName.Sections,
            proposal: reviewedProposal,
            renderSection,
          })}
          <div className="space-y-2">
            <label htmlFor="remarks" className="text-sm font-medium">
              Additional Remarks
            </label>
            <Textarea
              id="remarks"
              placeholder="Enter any additional feedback or remarks..."
              className="min-h-[100px] border-black/10 resize-none"
              onChange={(e) => handleRemarksChange(e.target.value)}
              value={reviewedProposal.remarks}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => handleSubmit(false)}
          variant="destructive"
          disabled={!reviewedProposal.remarks?.length}
        >
          Reject Proposal
        </Button>
        <Button
          onClick={() => handleSubmit(true)}
          variant="default"
          disabled={
            !Object.values(reviewedProposal.sections).some(
              (section) => section.approved
            )
          }
        >
          Approve Proposal
        </Button>
      </CardFooter>
    </Card>
  );
}

export const ResearchAgent = () => {
  const {
    running: researchAgentRunning,
    nodeName: researchAgentNodeName,
    state,
  } = useCoAgent<ResearchAgentState>({
    name: AvailableAgents.RESEARCH_AGENT,
  });

  const [logs, setLogs] = useState<Array<{ message: string; done: boolean }>>(
    []
  );

  useEffect(() => {
    if (state?.logs?.length > 0) {
      setLogs((prev) => {
        // Update done status for existing logs
        // Count logs with done status
        const doneCount = prev.filter((log) => log.done).length;
        const shouldMarkAllDone = doneCount >= 4;

        const updatedPrev = prev.map((existingLog) => {
          const matchingNewLog = state.logs.find(
            (newLog) => newLog.message === existingLog.message
          );
          return {
            ...existingLog,
            done: shouldMarkAllDone
              ? true
              : matchingNewLog?.done || existingLog.done,
          };
        });

        // Add new unique logs
        const newLogs = state.logs
          .filter(
            (newLog) =>
              !prev.some(
                (existingLog) => existingLog.message === newLog.message
              )
          )
          .map((log) => ({
            ...log,
            done: shouldMarkAllDone ? true : log.done,
          }));

        return [...updatedPrev, ...newLogs];
      });
    }
  }, [state?.logs]);

  const isResearchInProgress = useRef(false);

  useCopilotAction({
    name: "review_proposal",
    description:
      "Prompt the user to review structure proposal. Right after proposal generation",
    // available: "remote",
    parameters: [],
    renderAndWaitForResponse({ status, respond }) {
      if (status === "complete") {
        isResearchInProgress.current = false;
      }

      if (status !== "complete") {
        isResearchInProgress.current = true;
        return (
          <ProposalViewer
            proposal={state?.proposal}
            onSubmit={(approved, proposal) =>
              respond?.({
                ...proposal,
                approved,
              })
            }
          />
        );
      }
      return <></>;
    },
    followUp: false,
  });

  useCoAgentStateRender<ResearchAgentState>(
    {
      name: AvailableAgents.RESEARCH_AGENT,
      render: () => {
        return <ResearchLogs logs={logs} />;
      },
    },
    [state]
  );

  if (isResearchInProgress.current) {
    return (
      <div className="flex flex-col gap-4 h-full z-[999]">
        <ResearchPaperSkeleton />
      </div>
    );
  }
  if (!researchAgentRunning || !researchAgentNodeName) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 h-full z-[999]">
      <div className="flex flex-col gap-2">
        {state.title && (
          <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-6">{state.title}</h1>
          </div>
        )}
        {/* {state.outline && (
          <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Outline</h2>
            <div className="pl-4">
              <ReactMarkdown>{JSON.stringify(state.outline)}</ReactMarkdown>
            </div>
          </div>
        )} */}
        {state.sections?.map((section, i) => (
          <div key={i} className="prose max-w-none">
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              {section.title}
            </h2>
            <div className="text-gray-700">{section.content}</div>
          </div>
        ))}
        {state.sources && (
          <div className="prose max-w-none mt-8 pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Sources</h2>
            <div className="space-y-4">
              {Object.keys(state.sources).map((url) => (
                <div key={url} className="text-gray-600">
                  <a
                    href={state.sources[url].url}
                    className="font-medium hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {state.sources[url].title}
                  </a>
                  <p className="mt-1">{state.sources[url].content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
