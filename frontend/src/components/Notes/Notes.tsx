import { type JSX, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  type AppDispatch,
  type RootState,
  getNotes,
  deleteNote,
} from "../../store";
import { formatDate } from "./utils";
import NoteForm from "./NoteForm";

export default function Notes(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.notes);

  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get("edit");

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const handleEdit = (noteId: number) => {
    setSearchParams({ edit: String(noteId) });
  };

  const handleDelete = (noteId: number) => {
    if (!noteId) return;
    if (window.confirm(`Delete note with ID ${noteId}?`)) {
      dispatch(deleteNote(noteId));
    }
  };

  return (
    <div className="notes-page">
      <div className="notes-page-header">
        <h2>Notes</h2>
        <button onClick={() => setSearchParams({ create: "1" })}>
          <i className="fa-solid fa-plus"></i> New Note
        </button>
      </div>
      <div className="notes-table">
        <div className="notes-table-header">
          <span>Title</span>
          <span>Priority</span>
          <span>Status</span>
          <span>Created</span>
          <span>Actions</span>
        </div>
        {list.map((note) => (
          <div className="notes-table-row" key={note.id}>
            <span>{note.title}</span>
            <span className={`priority-${note.priority}`}>{note.priority}</span>
            <span>{note.status}</span>
            <span>{formatDate(note.created_at!)}</span>
            <div className="notes-table-actions">
              <button onClick={() => handleEdit(note.id!)}>Edit</button>
              <button onClick={() => handleDelete(note.id!)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {(noteId || searchParams.get("create")) && <NoteForm />}
    </div>
  );
}
