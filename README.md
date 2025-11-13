# health-agent-v1

Restructure health agent with Langchain V1 for improved reliability, security, and efficiency. Features modular workflow architecture for diagnosis, symptom classification, and action recommendations with structured outputs, strict validation, guardrails, and optimized performance.

## API Server

This project includes a Hono API server with OpenAPI documentation.

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

The server will start on `http://localhost:3000`

### Production

```bash
bun start
```

### API Documentation

- **Scalar API Reference UI**: http://localhost:3000/api-docs
- **OpenAPI JSON**: http://localhost:3000/openapi.json
