import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatProps, MessageProps, ChatResponse } from "./types";
import { getMessages, sendMessage } from "../thunks/chat";

const initialState: ChatProps = {
  messages: [],
  isLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
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
    builder.addCase(sendMessage.pending, (state: ChatProps) => {
      state.isLoading = true;
    });
    builder.addCase(
      sendMessage.fulfilled,
      (state: ChatProps, action: PayloadAction<ChatResponse>) => {
        state.messages = action.payload.history;
        state.isLoading = false;
      },
    );
    builder.addCase(sendMessage.rejected, (state: ChatProps) => {
      state.isLoading = false;
    });
  },
});

export default chatSlice.reducer;
