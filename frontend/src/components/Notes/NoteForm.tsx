import { type JSX, type FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  type AppDispatch,
  type RootState,
  type Priority,
  type Status,
  createNote,
  editNote,
  getNote,
  clearCurrentNote,
} from "../../store";

export default function NoteForm(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { currentNote } = useSelector((state: RootState) => state.notes);

  const [searchParams, setSearchParams] = useSearchParams();
  const isCreating = searchParams.get("create") === "1";
  const noteId = searchParams.get("edit");

  const [title, setTitle] = useState(currentNote.title || "");
  const [desc, setDesc] = useState(currentNote.desc || "");
  const [priority, setPriority] = useState(currentNote.priority || "low");
  const [status, setStatus] = useState(currentNote.status || "pending");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!isCreating) {
      dispatch(getNote(Number(noteId)));
    }
  }, [dispatch, noteId]);

  useEffect(() => {
    if (currentNote.id) {
      setTitle(currentNote.title || "");
      setDesc(currentNote.desc || "");
      setPriority(currentNote.priority || "low");
      setStatus(currentNote.status || "pending");
    }
  }, [currentNote]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    const priority = formData.get("priority") as Priority;
    const status = formData.get("status") as Status;

    if (isCreating) {
      await dispatch(createNote({ title, desc, priority, status })).unwrap();
    } else {
      await dispatch(
        editNote({ id: currentNote.id!, title, desc, priority, status }),
      ).unwrap();
    }
    dispatch(clearCurrentNote());
    setSearchParams({});
  };

  const handleClose = () => {
    dispatch(clearCurrentNote());
    setSearchParams({});
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <form onSubmit={handleSubmit} className="note-form">
          <div className="note-form-input">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
            />
          </div>
          <div className="note-form-input">
            <label>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              name="desc"
            />
          </div>
          <div className="note-form-input">
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              name="priority"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="note-form-input">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              name="status"
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
