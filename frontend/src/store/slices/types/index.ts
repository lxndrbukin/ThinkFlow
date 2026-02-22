export type Message = {
  role: "user" | "assistant" | "tool" | "system";
  content: string;
};

export type ChatProps = {
  messages: Array<Message>;
  isLoading: boolean;
};
