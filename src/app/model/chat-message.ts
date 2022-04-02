import { CustomFunctionItem } from "./function-item";

export interface ChatMessage {
  conversationId?: string;
    message: {
        content: CustomFunctionItem[];
    }
}
