import type { Priority, Status } from "../../slices/types";

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
