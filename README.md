# Open Multi-Agent Canvas

![multi-agent-canvas](https://github.com/user-attachments/assets/5953a5a6-5686-4722-9477-5279b67b3dba)

Open Multi-Agent Canvas is an open-source multi-agent chat interface that lets you manage multiple agents in one dynamic conversation. It’s built with Next.js, LangGraph, and CopilotKit to help with travel planning and research.

## Existing Agents

Check out these awesome agents (they live in separate repos). You can run them separately or deploy them on LangSmith:
- [CoAgents Travel Agent](https://github.com/CopilotKit/CopilotKit/tree/main/examples/coagents-travel/agent)
- [CoAgents AI Researcher](https://github.com/CopilotKit/CopilotKit/tree/main/examples/coagents-ai-researcher/agent)

## Copilot Cloud is required to run this project: 

Add 2 new remote endpoints, one for each agent.
![CleanShot 2025-02-20 at 14 16 42@2x](https://github.com/user-attachments/assets/da415736-c862-481f-b9c2-2ca63297ac5d)

## Quick Start 🚀

### 1. Prerequisites
Make sure you have:
- [pnpm](https://pnpm.io/installation)

### 2. API Keys
- [Copilot Cloud](https://cloud.copilotkit.ai)

## Running the Frontend

Install dependencies:

```sh
cd frontend
pnpm i
```

## Create a .env file in the frontend folder with:
```
NEXT_PUBLIC_CPK_PUBLIC_API_KEY=...
```

Need a CopilotKit API key? Get one [here](https://cloud.copilotkit.ai/).

Then, fire up the Next.js project:

```
pnpm run dev
```

## Documentation 📚
- [CopilotKit Docs](https://docs.copilotkit.ai/coagents)
- [LangGraph Platform Docs](https://langchain-ai.github.io/langgraph/cloud/deployment/cloud/)

## License
Distributed under the MIT License. See LICENSE for more info.
