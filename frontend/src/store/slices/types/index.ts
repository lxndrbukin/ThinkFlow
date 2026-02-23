export type MessageProps = {
  role: "user" | "assistant" | "tool" | "system";
  content: string;
};

export type ChatProps = {
  messages: Array<MessageProps>;
  streamingContent: string;
  isLoading: boolean;
};
