import { StateGraph, Annotation } from "@langchain/langgraph";
import { MessagesState } from "../state/basic.state";
import { chat } from "../node/chat.node";

export const basicGraph = new StateGraph(MessagesState)
  .addNode("chat", chat)
  .addEdge("__start__", "chat")
  .addEdge("chat", "__end__")
  .compile();
