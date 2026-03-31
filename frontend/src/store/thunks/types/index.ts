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

export type NoteCreate = {
  title: string;
  desc: string | undefined;
  priority: Priority;
  status: Status;
};

export type NoteEdit = {
  id: number;
  title: string | undefined;
  desc: string | undefined;
  priority: Priority | undefined;
  status: Status | undefined;
};
