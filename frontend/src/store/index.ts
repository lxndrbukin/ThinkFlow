import { configureStore } from "@reduxjs/toolkit";
import chats from "./slices/chatSlice";
import auth from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth,
    chats,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./slices/types";
export * from "./slices/chatSlice";
export * from "./slices/authSlice";
export * from "./thunks/chat";
export * from "./thunks/auth";
