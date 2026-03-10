export type MessageProps = {
  role: "user" | "assistant" | "tool" | "system";
  content: string | Array<any>;
};

export type ImageProps = {
  type: "url" | "file";
  data: string;
  mediaType?: string;
};

export type PromptProps = {
  input: string;
  image: ImageProps | null;
};

export type ChatProps = {
  chatId: number | null;
  messages: Array<MessageProps>;
  streamingContent: string;
  isLoading: boolean;
};

export type ChatResponse = {
  id: number;
  title: string;
  created_at: Date;
};

export type Chats = {
  list: Array<ChatResponse>;
  currentChat: ChatProps;
  prompt: PromptProps;
};

export type UserProps = {
  id: number;
  username: string;
  created_at: string;
};

export type AuthProps = {
  token: string | null;
  user: UserProps | null;
  isLoading: boolean;
  error: string | null;
};
