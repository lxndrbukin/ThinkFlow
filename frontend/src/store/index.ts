import { configureStore } from "@reduxjs/toolkit";
import chats from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    chats,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./slices/types";
export * from "./slices/chatSlice";
export * from "./thunks/chat";
