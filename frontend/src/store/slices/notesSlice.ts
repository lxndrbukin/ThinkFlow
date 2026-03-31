import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Notes, NoteProps } from "./types";
import {
  getNote,
  getNotes,
  createNote,
  editNote,
  deleteNote,
} from "../thunks/notes";

const initialState: Notes = {
  list: [],
  currentNote: {
    id: null,
    title: null,
    desc: null,
    status: null,
    priority: null,
    created_at: null,
  },
  isLoading: false,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotes.pending, (state: Notes) => {
      state.isLoading = true;
    });
    builder.addCase(getNotes.rejected, (state: Notes) => {
      state.isLoading = false;
    });
    builder.addCase(
      getNotes.fulfilled,
      (state: Notes, action: PayloadAction<Array<NoteProps>>) => {
        state.list = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(
      getNote.fulfilled,
      (state: Notes, action: PayloadAction<NoteProps>) => {
        state.currentNote = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getNote.pending, (state: Notes) => {
      state.isLoading = true;
    });
    builder.addCase(getNote.rejected, (state: Notes) => {
      state.isLoading = false;
    });
    builder.addCase(
      createNote.fulfilled,
      (state: Notes, action: PayloadAction<NoteProps>) => {
        state.list.push(action.payload);
        state.isLoading = false;
      },
    );
    builder.addCase(createNote.pending, (state: Notes) => {
      state.isLoading = true;
    });
    builder.addCase(createNote.rejected, (state: Notes) => {
      state.isLoading = false;
    });

    builder.addCase(
      editNote.fulfilled,
      (state: Notes, action: PayloadAction<NoteProps>) => {
        const index = state.list.findIndex(
          (note) => note.id === action.payload.id,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.isLoading = false;
      },
    );
    builder.addCase(editNote.pending, (state: Notes) => {
      state.isLoading = true;
    });
    builder.addCase(editNote.rejected, (state: Notes) => {
      state.isLoading = false;
    });

    builder.addCase(
      deleteNote.fulfilled,
      (state: Notes, action: PayloadAction<number>) => {
        state.list = state.list.filter((note) => note.id !== action.payload);
        state.isLoading = false;
      },
    );
    builder.addCase(deleteNote.pending, (state: Notes) => {
      state.isLoading = true;
    });
    builder.addCase(deleteNote.rejected, (state: Notes) => {
      state.isLoading = false;
    });
  },
});

export default notesSlice.reducer;
