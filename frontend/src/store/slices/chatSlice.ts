import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Chats, MessageProps, ChatResponse } from "./types";
import {
  getMessages,
  deleteChat,
  streamMessage,
  createChat,
  getChats,
} from "../thunks/chat";

const initialState: Chats = {
  list: [],
  currentChat: {
    chatId: null,
    messages: [],
    streamingContent: "",
    isLoading: false,
  },
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addMessage(state: Chats, action: PayloadAction<MessageProps>) {
      state.currentChat.messages.push(action.payload);
    },
    appendChunk(state: Chats, action: PayloadAction<string>) {
      state.currentChat.streamingContent += action.payload;
    },
    finaliseMessage(state: Chats) {
      state.currentChat.messages.push({
        role: "assistant",
        content: state.currentChat.streamingContent,
      });
      state.currentChat.streamingContent = "";
      state.currentChat.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getMessages.fulfilled,
      (state: Chats, action: PayloadAction<Array<MessageProps>>) => {
        state.currentChat.messages = action.payload;
        state.currentChat.isLoading = false;
      },
    );
    builder.addCase(getMessages.pending, (state: Chats) => {
      state.currentChat.isLoading = true;
    });
    builder.addCase(getMessages.rejected, (state: Chats) => {
      state.currentChat.isLoading = false;
    });
    builder.addCase(streamMessage.pending, (state: Chats) => {
      state.currentChat.isLoading = true;
    });
    builder.addCase(streamMessage.rejected, (state: Chats) => {
      state.currentChat.isLoading = false;
      state.currentChat.messages.push({
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      });
    });
    builder.addCase(deleteChat.fulfilled, (state: Chats) => {
      state.currentChat.chatId = null;
      state.currentChat.messages = [];
    });
    builder.addCase(
      createChat.fulfilled,
      (state: Chats, action: PayloadAction<ChatResponse>) => {
        state.currentChat.chatId = action.payload.id;
      },
    );
    builder.addCase(
      getChats.fulfilled,
      (state: Chats, action: PayloadAction<Array<ChatResponse>>) => {
        state.list = action.payload;
      },
    );
  },
});

export const { addMessage, appendChunk, finaliseMessage } = chatSlice.actions;
export default chatSlice.reducer;
