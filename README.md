# Open Multi-Agent Canvas

Open Multi-Agent Canvas is an open-source multi-agent chat interface that leverages agents to assist with travel planning, research. Built with Next.js, React, and CopilotKit, this project offers an interactive, unified experience by managing multiple agents within one dynamic conversation.

## Key Features

- **Multi-Agent Chat Interface:**  
  Chat with a range of specialized agents:
  - **Travel Agent:** Plan trips, create itineraries, and view travel recommendations on an interactive map powered by Leaflet.
  - **Research Agent:** Conduct research with real-time logs and progress updates.
  - **Email Agent:** Draft and compose professional emails seamlessly.
- **Real-Time Interactivity:**  
  Enjoy a live chat powered by `@copilotkit/react-ui` that orchestrates dynamic state changes and agent responses.

- **State Management & Agent Coordination:**  
  Leverages `@copilotkit/react-core` for robust agent state management and smooth integration of travel and research functionalities.

- **Responsive & Modern UI:**  
  Designed with Tailwind CSS to ensure your experience is smooth and adaptive across all devices.

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org)
- **UI Library:** React, [CopilotKit UI](https://www.npmjs.com/package/@copilotkit/react-ui)
- **State Management:** [CopilotKit React Core](https://www.npmjs.com/package/@copilotkit/react-core)
- **Mapping:** [Leaflet](https://leafletjs.com) with [React Leaflet](https://react-leaflet.js.org)
- **Styling:** Tailwind CSS

## Setup Instructions

1. **Prerequisites:**

   - [Node.js](https://nodejs.org) (LTS version recommended)
   - npm or yarn

2. **Installation:**

   ```bash
   # Clone the repository
   git clone <repository-url>

   # Navigate to the frontend directory
   cd frontend

   # Install dependencies
   pnpm install
   ```

3. **Running the Development Server:**
   ```bash
   pnpm dev
   ```
   Then, open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- **/src/app:**  
  Contains Next.js page components, layouts, and global styles.

- **/src/components:**  
  Houses reusable components including agent interfaces (Travel, Research, Chat, Map, Sidebar) and UI elements.

- **/providers:**  
  Wraps the global state providers responsible for managing agent states.

- **/lib:**  
  Contains utility functions and configuration files (like available agents configuration).

## Langgraph Agents

This project assumes you have working langgraph agents for the travel and research agents. If not, you can use the following links to deploy your own:

- [Travel Agent](https://github.com/CopilotKit/CopilotKit/tree/main/examples/coagents-travel)
- [Research Agent](https://github.com/CopilotKit/CopilotKit/tree/main/examples/coagents-ai-researcher)

## CopilotKit Cloud

This project uses CopilotKit Cloud to manage the agents and Copilot Runtime. If you don't have a CopilotKit Cloud account, you can sign up [here](https://cloud.copilotkit.ai/sign-up).

## Contributing

Contributions are welcome! Fork the repository and submit a pull request with any improvements, bug fixes, or new features.

## License

Distributed under the MIT License. See `LICENSE` for more information.
