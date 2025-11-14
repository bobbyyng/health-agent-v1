import { createRoute, z } from "@hono/zod-openapi";

/**
 * Agent chat route definition with OpenAPI schema
 */
export const agentChatRoute = createRoute({
  method: "post",
  path: "/chat",
  tags: ["Agent"],
  summary: "Chat with AI agent",
  description: "Send a message to the AI agent and get a response",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              message: z.string().min(1).openapi({
                example: "What is the weather in Tokyo?",
                description: "The message to send to the agent",
              }),
              provider: z.enum(["qwen"]).optional().openapi({
                example: "qwen",
                description: "The chat provider to use",
              }),
              modelName: z.string().optional().openapi({
                example: "qwen-flash",
                description: "The model name to use",
              }),
            })
            .openapi({
              type: "object",
              description: "Agent chat request body",
              example: {
                message: "What is the weather in Tokyo?",
                provider: "qwen",
                modelName: "qwen-flash"
              }
            }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z
            .object({
              content: z.string().openapi({
                description: "The response content from the agent",
              }),
              timestamp: z.string().openapi({
                description: "The timestamp when the response was generated",
              }),
            })
            .openapi({
              type: "object",
              description: "Agent response",
            }),
        },
      },
      description: "Agent response",
    },
    400: {
      description: "Invalid request",
    },
    500: {
      description: "Internal server error",
    },
  },
});
