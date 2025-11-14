import { MessagesState } from "../state/basic.state";
import { AIMessage } from "@langchain/core/messages";
import * as z from "zod";
import { ChatProvider, getChatProvider } from "../../utils/chat-provider.util";

export async function chat(state: z.infer<typeof MessagesState>) {
  const modelProvider = getChatProvider({
    provider: ChatProvider.QWEN,
    modelName: "qwen-flash",
  });

  const result = await modelProvider.invoke(state.messages);

  return {
    messages: [...state.messages, new AIMessage(result.content)],
  };
}
