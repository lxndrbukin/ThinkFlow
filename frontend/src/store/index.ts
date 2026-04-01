import { configureStore } from "@reduxjs/toolkit";
import chats from "./slices/chatSlice";
import auth from "./slices/authSlice";
import notes from "./slices/notesSlice";

export const store = configureStore({
  reducer: {
    auth,
    chats,
    notes,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./slices/types";
export * from "./slices/chatSlice";
export * from "./slices/authSlice";
export * from "./slices/notesSlice";
export * from "./thunks/chat";
export * from "./thunks/auth";
export * from "./thunks/notes";
