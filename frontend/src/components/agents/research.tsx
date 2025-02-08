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
import { useCoAgent, useCopilotAction } from "@copilotkit/react-core";
import { useCallback, useRef, useState } from "react";

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
        className="border border-black/10 data-[state=checked]:text-[var(--primary)]"
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
          className="text-red-500"
          disabled={!reviewedProposal.remarks?.length}
        >
          Reject Proposal
        </Button>
        <Button
          onClick={() => handleSubmit(true)}
          className="bg-[var(--primary)] text-white hover:bg-[#68330d]"
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

  const isResearchInProgress = useRef(false);

  useCopilotAction({
    name: "review_proposal",
    description:
      "Prompt the user to review structure proposal. Right after proposal generation",
    available: "remote",
    renderAndWaitForResponse({ args, status, respond }) {
      console.log("status", status);
      console.log("args", args);

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
  });

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
        <h1 className="text-2xl font-bold">Research Agent</h1>
        <pre className="bg-black/10 p-4 rounded-md">
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>
    </div>
  );
};
