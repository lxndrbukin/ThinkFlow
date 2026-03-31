import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { NoteCreate, NoteEdit } from "./types";
import { API_URL } from "../../api";

export const getNotes = createAsyncThunk("notes/getNotes", async () => {
  const response = await axios.get(`${API_URL}/notes`);
  return response.data;
});

export const getNote = createAsyncThunk(
  "notes/getNote",
  async (noteId: number) => {
    const response = await axios.get(`${API_URL}/notes/${noteId}`);
    return response.data;
  },
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (data: NoteCreate) => {
    const response = await axios.post(`${API_URL}/notes`, data);
    return response.data;
  },
);

export const editNote = createAsyncThunk(
  "notes/editNote",
  async (data: NoteEdit) => {
    const response = await axios.put(`${API_URL}/notes/${data.id}`, data);
    return response.data;
  },
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId: number) => {
    await axios.delete(`${API_URL}/notes/${noteId}`);
    return noteId;
  },
);
