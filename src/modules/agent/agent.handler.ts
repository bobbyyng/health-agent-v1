import { HumanMessage } from "@langchain/core/messages";
import { basicGraph } from "../../common/workflow/graph/basic.graph";
import { MemorySaver } from "@langchain/langgraph";

const checkpointer = new MemorySaver();
/**
 * Agent chat route handler
 * @param c - Hono context with validated request data
 */
export async function agentChatHandler(c: any) {
  try {
    const { message, provider, modelName } = c.req.valid("json");

    const result = await basicGraph(checkpointer).invoke(
      {
        messages: [new HumanMessage(message)],
      },
      {
        configurable: {
          thread_id: crypto.randomUUID(),
        },
      }
    );

    return c.json(result);
  } catch (error) {
    console.error("Agent error:", error);
    return c.json(
      {
        error: "Failed to process agent request",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
}
