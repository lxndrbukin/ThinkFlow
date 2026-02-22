import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatProps, Message } from "./types";
import { getMessages } from "../thunks/chat";

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
      (state: ChatProps, action: PayloadAction<Array<Message>>) => {
        state.messages = action.payload;
      },
    );
  },
});

export default chatSlice.reducer;
