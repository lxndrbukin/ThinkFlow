import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { appendChunk, finaliseMessage } from "../slices/chatSlice";
import { API_URL } from "../../api";

export const createChat = createAsyncThunk("/chats/createChat", async () => {
  const response = await axios.post(`${API_URL}/chats`);
  return response.data;
});

export const getChats = createAsyncThunk("/chats/getChats", async () => {
  const response = await axios.get(`${API_URL}/chats`);
  return response.data;
});

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (chatId: number) => {
    const response = await axios.get(`${API_URL}/chats/${chatId}/messages`);
    return response.data.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));
  },
);

export const deleteChat = createAsyncThunk(
  "chat/deleteHistory",
  async (chatId: number) => {
    await axios.delete(`${API_URL}/chats/${chatId}`);
    return chatId;
  },
);

export const streamMessage = createAsyncThunk(
  "chat/streamMessage",
  async (data: { chatId: number; message: string, model: string}, { dispatch }) => {
    const response = await fetch(`${API_URL}/chats/${data.chatId}`, {
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
