import { OpenAPIHono } from "@hono/zod-openapi";
import { agentChatRoute } from "./agent.route";
import { agentChatHandler } from "./agent.handler";

/**
 * Create and configure the agent Hono app
 */
export function createAgentApp(): OpenAPIHono {
  const app = new OpenAPIHono();

  // Register agent routes
  app.openapi(agentChatRoute, agentChatHandler);

  return app;
}
