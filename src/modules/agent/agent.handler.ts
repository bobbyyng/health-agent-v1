import { getChatProvider } from "../../common/utils/chat-provider.util";
import { HumanMessage } from "@langchain/core/messages";

/**
 * Agent chat route handler
 * @param c - Hono context with validated request data
 */
export async function agentChatHandler(c: any) {
  try {
    const { message, provider, modelName } = c.req.valid("json");

    const modelProvider = getChatProvider({
      provider,
      modelName,
    });

    const result = await modelProvider.invoke([new HumanMessage(message)]);

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
