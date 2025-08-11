

<div align="center">

# Open Multi-Agent Canvas
   
![CopilotKit-Banner](https://github.com/user-attachments/assets/8167c845-0381-45d9-ad1c-83f995d48290)
</div>


![multi-agent-canvas](https://github.com/user-attachments/assets/5953a5a6-5686-4722-9477-5279b67b3dba)


Open Multi-Agent Canvas, created by [CopilotKit](https://github.com/CopilotKit/CopilotKit) is an open-source multi-agent chat interface that lets you manage multiple agents in one dynamic conversation. It's built with Next.js, LangGraph, and CopilotKit to help with travel planning, research, and general-purpose tasks through MCP servers.

## Existing Agents

Check out these awesome agents (they live in separate repositories). You can run them separately or deploy them on LangSmith:
- [CoAgents Travel Agent](https://github.com/CopilotKit/CopilotKit/tree/main/examples/coagents-travel/agent)
- [CoAgents AI Researcher](https://github.com/CopilotKit/CopilotKit/tree/main/examples/coagents-ai-researcher/agent)

Additionally, this project now includes a built-in MCP (Multi-Channel Protocol) Agent:
- **MCP Agent**: A general-purpose agent capable of handling various tasks through configurable MCP servers.

## Copilot Cloud is required to run this project: 




## Quick Start 🚀

### 1. Prerequisites

Make sure you have:

- Node.js (LTS recommended)
- [pnpm](https://pnpm.io/installation)
- Python 3.10–3.12 (for the optional MCP Agent backend)
   - Optional: [Poetry](https://python-poetry.org/docs/#installation)

### 2. API Keys

- Copilot Cloud API key from <https://cloud.copilotkit.ai>

## Running the Frontend

Create (or edit) `frontend/.env` with your Copilot Cloud public key:

```sh
NEXT_PUBLIC_COPILOT_CLOUD_API_KEY=...
```

Install dependencies and run (PowerShell on Windows):

```powershell
cd frontend
pnpm install
pnpm dev
```

Production build + start (optional):

```powershell
pnpm build
$env:PORT=3010; pnpm start
```
If port 3000 is busy, Next.js will fall back to 3001 in dev or you can set a custom port for prod as shown above.

## MCP Agent Setup

![mcp-demo](./agent/demo/mcp-demo.gif)

The MCP Agent allows you to connect to various MCP-compatible servers:

1. **Configuring Custom MCP Servers**:
   - Click the "MCP Servers" button in the top right of the interface
   - Add servers via the configuration panel:
     - **Standard IO**: Run commands locally (e.g., Python scripts)
     - **SSE**: Connect to external MCP-compatible servers (via Server-Sent Events)

2. **Public MCP Servers**:
   - You can connect to public MCP servers like [mcp.composio.dev](https://mcp.composio.dev/) and [mcp.run](https://www.mcp.run/)

## Running the MCP Agent Backend (Optional)

Copy `agent/example.env` to `agent/.env` and set:

```sh
OPENAI_API_KEY=...       # required for the agent LLM
LANGSMITH_API_KEY=...    # optional
```

Run using Poetry (recommended):

```powershell
cd agent
poetry install
poetry run langgraph dev --host localhost --port 8123 --no-browser
```

Run using a virtual environment (alternative):

```powershell
cd agent
python -m venv .venv
.\.venv\Scripts\Activate
python -m pip install -U pip
python -m pip install "langgraph-cli[inmem]==0.1.64" fastmcp "langchain-openai>=0.2.1" "langchain-mcp-adapters>=0.0.3" "langchain>=0.3.1" uvicorn "python-dotenv>=1.0.1" "copilotkit==0.1.39"
.\.venv\Scripts\langgraph.exe dev --host localhost --port 8123 --no-browser --config "c:\\Users\\<you>\\path\\to\\repo\\agent\\langgraph.json"
```

Quick helper (PowerShell):

```powershell
# from repo root
./run-agent.ps1 -Port 8123 -Host localhost
```

To use the built-in math MCP server over STDIO instead of SSE, you can add:

```powershell
Command: python
Args: agent/math_server.py
```

## Connect from the UI (MCP Servers)

In the app (top-right), open “MCP Servers” and add either:

- SSE: URL <http://localhost:8123>
- STDIO: Command python, Args `agent/math_server.py`

## Running a tunnel (optional)

Add another terminal and select Remote Endpoint.
Then select Local Development.
Once this is done, copy the command into your terminal and change the port to match the LangGraph server `8123`

## Troubleshooting

- ChunkLoadError or stale assets in dev: close the dev server, delete `frontend/.next`, then `pnpm build` and `pnpm start` (use a clean port like 3010). Hard refresh the browser (Ctrl+F5).
- Frontend env var: the correct var is `NEXT_PUBLIC_COPILOT_CLOUD_API_KEY`.
- MCP server not reachable: confirm <http://localhost:8123> responds and re-add the SSE server in “MCP Servers”. If you start outside the `agent` folder, pass `--config agent/langgraph.json`.
![image](https://github.com/user-attachments/assets/6bf41042-9529-4470-8baf-dd076aad31a1)


## Documentation

- [CopilotKit Docs](https://docs.copilotkit.ai/coagents)
- [LangGraph Platform Docs](https://langchain-ai.github.io/langgraph/cloud/deployment/cloud/)
- [Model Context Protocol (MCP) Docs](https://github.com/langchain-ai/langgraph/tree/main/examples/mcp)

## License

Distributed under the MIT License. See LICENSE for more info.
