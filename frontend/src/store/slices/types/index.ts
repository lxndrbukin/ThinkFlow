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
  model: string;
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

export const Priority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

export const Status = {
  PENDING: "pending",
  IN_PROGRESS: "in progress",
  COMPLETED: "completed",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export type NoteProps = {
  id: number | null;
  title: string | null;
  desc: string | null;
  status: Status | null;
  priority: Priority | null;
  created_at: string | null;
};

export type Notes = {
  list: Array<NoteProps>;
  currentNote: NoteProps;
  isLoading: boolean;
};
