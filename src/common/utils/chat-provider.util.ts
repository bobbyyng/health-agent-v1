import { ChatOpenAI } from "@langchain/openai";

export enum ChatProvider {
  QWEN = "qwen",
}

export function getChatProvider({
  provider,
  modelName,
}: {
  provider: ChatProvider;
  modelName: string;
}): ChatOpenAI {
  switch (provider) {
    case ChatProvider.QWEN:
      return createQwenChatProvider({
        modelName,
      });
  }
}

function createQwenChatProvider({ modelName }: { modelName: string }) {
  console.log('Creating Qwen chat provider with model:', modelName);
  return new ChatOpenAI({
    apiKey: process.env.AI_PROVIDER_ALIBABA_API_KEY,
    configuration: {
      baseURL: process.env.AI_PROVIDER_ALIBABA_BASE_URL,
    },
    model: modelName,
  });
}
