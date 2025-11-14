# Health Agent v1

A project to migrate the health agent from LangGraph v0 to LangGraph v1. Restructured health agent built with TypeScript and LangGraph v1, featuring improved reliability, security, and efficiency. Provides diagnosis, symptom classification, and action recommendations with structured outputs, strict validation, guardrails, and optimized performance.

## 📋 Project Background

This project aims to migrate the health agent originally built with LangGraph v0 to LangGraph v1. Through this migration, we can:

- Leverage new features and improvements in LangGraph v1
- Enhance system reliability and security
- Optimize performance
- Adopt a modular workflow architecture

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Framework**: [Hono](https://hono.dev) - Lightweight web framework
- **AI Framework**: [LangGraph v1](https://github.com/langchain-ai/langgraph) - For building state machine workflows
- **LLM**: 
  - LangChain Core
  - LangChain Community (supports multiple LLM providers)
- **Validation**: [Zod](https://zod.dev) - TypeScript-first schema validation
- **API Documentation**: 
  - OpenAPI 3.0
  - Scalar API Reference UI

## 📁 Project Structure

```
src/
├── index.ts                    # Application entry point
├── modules/
│   ├── agent/                  # Health agent module
│   │   ├── agent.ts           # Agent application configuration
│   │   ├── agent.handler.ts   # Agent request handler
│   │   └── agent.route.ts     # Agent API route definitions
│   └── api/                    # General API module
│       ├── api.ts
│       ├── api.handler.ts
│       └── api.route.ts
└── common/
    ├── utils/
    │   └── chat-provider.util.ts  # LLM provider utilities
    └── workflow/
        ├── graph/
        │   └── basic.graph.ts     # LangGraph workflow definition
        ├── node/
        │   └── chat.node.ts       # Chat node implementation
        └── state/
            └── basic.state.ts     # State definition
```

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) - Install from https://bun.sh

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

The server will start on `http://localhost:3000` with hot reload support.

### Production

```bash
bun start
```

## 📚 API Documentation

The project includes complete OpenAPI documentation:

- **Scalar API Reference UI**: http://localhost:3000/api-docs
- **OpenAPI JSON**: http://localhost:3000/openapi.json

## 🏗️ Architecture

### LangGraph Workflow

The project uses LangGraph v1's `StateGraph` to build the health agent workflow:

- **State Management**: Uses Zod schema to define state structure, supporting message history and LLM call counting
- **Nodes**: Modular node implementations, currently includes basic chat node
- **Checkpointing**: Uses `MemorySaver` for conversation persistence

### Modular Design

- **Agent Module**: Handles health agent-related API requests
- **API Module**: Handles general API endpoints
- **Workflow**: Reusable LangGraph workflow definitions
- **Utilities**: Shared utility functions, such as LLM provider configuration

## 🔄 Migration Notes

This project migrates from LangGraph v0 to v1, with major changes including:

1. **State Definition**: Uses new Zod-based state definition approach
2. **Graph Construction**: Uses `StateGraph` and `Annotation` API
3. **Checkpointing**: Uses new checkpoint system
4. **Type Safety**: Improved TypeScript type support

## 📝 Development Guide

### Adding New Workflow Nodes

1. Create a new node file in `src/common/workflow/node/`
2. Implement the node function that receives state and returns updated state
3. Add the node to the graph definition in `src/common/workflow/graph/`

### Adding New API Endpoints

1. Define the OpenAPI route in the corresponding `*.route.ts`
2. Implement the handler logic in the corresponding `*.handler.ts`
3. Register the route in the module's `*.ts` file

## 🔐 Environment Variables

The project currently supports configuration through environment variables:

- `PORT`: Server port (default: 3000)
- LLM API keys: Configure corresponding environment variables based on the provider used

## 📄 License

ISC

## 🤝 Contributing

Issues and Pull Requests are welcome!
