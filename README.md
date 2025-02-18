# Open Multi-Agent Canvas

![multi-agent-canvas](https://github.com/user-attachments/assets/5953a5a6-5686-4722-9477-5279b67b3dba)

Open Multi-Agent Canvas is an open-source multi-agent chat interface that leverages agents to assist with travel planning and research. Built with Next.js LangGraph, and CopilotKit, this project offers an interactive, unified experience by managing multiple agents within one dynamic conversation.

## Quick Start 🚀

### 1. Prerequisites
This projects uses the following tools:

- [pnpm](https://pnpm.io/installation)

### 2. API Keys Needed
Running locally, you'll need the following API keys:

- [OpenAI](https://platform.openai.com/api-keys)
- [LangSmith](https://docs.smith.langchain.com/administration/how_to_guides/organization_management/create_account_api_key)
- [Copilot Cloud](https://cloud.copilotkit.ai)


## Running the Agent

This agent is already hosted in the LangGraph Platform. However, if you'd like to run it
yourself first, install the dependencies:

```sh
cd agent
poetry install
```

IMPORTANT:
Make sure the OpenAI API Key you provide, supports gpt-4o.

Then, run the demo:

```sh
poetry run demo
```

## Running the UI

First, install the dependencies:

```sh
cd ./ui
pnpm i
```

Then, create a `.env` file inside `./ui` with the following:

```
OPENAI_API_KEY=...
NEXT_PUBLIC_CPK_PUBLIC_API_KEY=...
```

If you need a CopilotKit API key, you can get one [here](https://cloud.copilotkit.ai)

Then, run the Next.js project:

```sh
pnpm run dev
```

## Documentation 📚
- [CopilotKit Docs](https://docs.copilotkit.ai/coagents)
- [LangGraph Platform Docs](https://langchain-ai.github.io/langgraph/cloud/deployment/cloud/)

## License

Distributed under the MIT License. See `LICENSE` for more information.
