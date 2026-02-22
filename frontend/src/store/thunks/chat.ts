import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { MessageProps } from "../slices/types";

export const getMessages = createAsyncThunk("chat/getMessages", async () => {
  const response = await axios.get("/history");
  return response.data;
});

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (data: { message: string; history: Array<MessageProps> }) => {
    const response = await axios.post("/chat", data);
    return response.data;
  },
);
