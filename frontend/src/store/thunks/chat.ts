import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { MessageProps } from "../slices/types";
import { appendChunk, finaliseMessage } from "../slices/chatSlice";

export const getMessages = createAsyncThunk("chat/getMessages", async () => {
  const response = await axios.get("/history");
  return response.data;
});

export const streamMessage = createAsyncThunk(
  "chat/streamMessage",
  async (
    data: { message: string; history: Array<MessageProps> },
    { dispatch },
  ) => {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value);
      const lines = text.split("\n\n").filter(Boolean);
      for (const line of lines) {
        const chunk = line.replace("data: ", "");
        const decoded = chunk.replace(/\\n/g, "\n");
        if (decoded && decoded !== "[DONE]") {
          dispatch(appendChunk(decoded));
        } else if (decoded === "[DONE]") {
          dispatch(finaliseMessage());
          return;
        }
      }
    }
  },
);
