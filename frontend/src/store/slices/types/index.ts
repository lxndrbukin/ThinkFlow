export type MessageProps = {
  role: "user" | "assistant" | "tool" | "system";
  content: string;
};

export type ChatProps = {
  chatId: number | null;
  messages: Array<MessageProps>;
  streamingContent: string;
  isLoading: boolean;
  model: string;
};

export type ChatResponse = {
  id: number;
  title: string;
  created_at: Date;
};

export type Chats = {
  list: Array<ChatResponse>;
  currentChat: ChatProps;
};
