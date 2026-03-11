import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type AuthProps, type UserProps } from "./types";
import { register, login, getMe } from "../thunks/auth";

const initialState: AuthProps = {
  token: localStorage.getItem("token"),
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state: AuthProps) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    setError(state: AuthProps, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      register.fulfilled,
      (state: AuthProps, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.isLoading = false;
        localStorage.setItem("token", action.payload);
      },
    );
    builder.addCase(register.pending, (state: AuthProps) => {
      state.isLoading = true;
    });
    builder.addCase(register.rejected, (state: AuthProps, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(
      login.fulfilled,
      (state: AuthProps, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.isLoading = false;
        localStorage.setItem("token", action.payload);
      },
    );
    builder.addCase(login.pending, (state: AuthProps) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state: AuthProps, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(
      getMe.fulfilled,
      (state: AuthProps, action: PayloadAction<UserProps>) => {
        state.user = action.payload;
        state.isLoading = false;
      },
    );
  },
});

export default authSlice.reducer;
export const { logout, setError } = authSlice.actions;
