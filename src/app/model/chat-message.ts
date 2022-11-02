import { CustomFunctionItem } from './function-item';

export interface ChatMessage {
  id?: string;
  value: CustomFunctionItem[];
}
