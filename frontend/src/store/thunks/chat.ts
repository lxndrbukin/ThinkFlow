import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMessages = createAsyncThunk("chat/getMessages", async () => {
  const response = await axios.get("/history");
  return response.data;
});
