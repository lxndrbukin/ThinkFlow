import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api";

export const register = createAsyncThunk(
  "auth/register",
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      return response.data.access_token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Something went wrong");
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      return response.data.access_token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Something went wrong");
    }
  },
);

export const getMe = createAsyncThunk("auth/getMe", async () => {
  const response = await axios.get(`${API_URL}/auth/me`);
  return response.data;
});
