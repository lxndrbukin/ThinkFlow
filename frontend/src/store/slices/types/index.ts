export type MessageProps = {
  role: "user" | "assistant" | "tool" | "system";
  content: string;
};

export type ChatProps = {
  messages: Array<MessageProps>;
  isLoading: boolean;
};

export type ChatResponse = {
  response: string;
  history: Array<MessageProps>;
};
