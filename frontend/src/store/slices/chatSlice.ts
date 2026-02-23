import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatProps, MessageProps } from "./types";
import { getMessages, streamMessage } from "../thunks/chat";

const initialState: ChatProps = {
  messages: [],
  streamingContent: "",
  isLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state: ChatProps, action: PayloadAction<MessageProps>) {
      state.messages.push(action.payload);
    },
    appendChunk(state: ChatProps, action: PayloadAction<string>) {
      state.streamingContent += action.payload;
    },
    finaliseMessage(state: ChatProps) {
      state.messages.push({
        role: "assistant",
        content: state.streamingContent,
      });
      state.streamingContent = "";
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getMessages.fulfilled,
      (state: ChatProps, action: PayloadAction<Array<MessageProps>>) => {
        state.messages = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getMessages.pending, (state: ChatProps) => {
      state.isLoading = true;
    });
    builder.addCase(getMessages.rejected, (state: ChatProps) => {
      state.isLoading = false;
    });
    builder.addCase(streamMessage.pending, (state: ChatProps) => {
      state.isLoading = true;
    });
    builder.addCase(streamMessage.rejected, (state: ChatProps) => {
      state.isLoading = false;
      state.messages.push({
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      });
    });
  },
});

export const { addMessage, appendChunk, finaliseMessage } = chatSlice.actions;
export default chatSlice.reducer;
