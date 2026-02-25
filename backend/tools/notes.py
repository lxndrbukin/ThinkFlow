from models.notes import NoteCreate, NoteUpdate, Priority, Status
from crud.notes import (
    create_note as create_note_crud,
    edit_note as edit_note_crud,
    delete_note as delete_note_crud,
    get_note as get_note_crud,
    get_notes as get_notes_crud
)
from db import SessionLocal

def get_notes():
    db = SessionLocal()
    try:
        notes = get_notes_crud(db)
        if not notes:
            return "No notes found"
        return "\n\n".join([
            f"**ID {n.id}: {n.title}**\n- Priority: {n.priority}\n- Status: {n.status}\n- {n.desc}"
            for n in notes
        ])
    finally:
        db.close()

def get_note(note_id: int):
    db = SessionLocal()
    try:
        note = get_note_crud(note_id, db)
        return f"**ID {note.id}: {note.title}**\n- Priority: {note.priority}\n- Status: {note.status}\n- {note.desc}"
    except Exception:
        return f"Note with ID {note_id} not found"
    finally:
        db.close()

def create_note(title: str, desc: str, priority: Priority, status: Status):
    db = SessionLocal()
    try:
        data = NoteCreate(
            title=title,
            desc=desc,
            priority=priority,
            status=status
        )
        result = create_note_crud(data, db)
        return f"Note {title} created with ID {result.id}"
    finally:
        db.close()

def edit_note(
        note_id: int,
        title: str = None,
        desc: str = None,
        priority: Priority = None,
        status: Status = None
    ):
    db = SessionLocal()
    try:
        data = NoteUpdate(
            title=title,
            desc=desc,
            priority=priority,
            status=status
        )
        result = edit_note_crud(note_id, data, db)
        return f"Note with ID {result.id} updated"
    except Exception:
        return f"Note with ID {note_id} not found"
    finally:
        db.close()

def delete_note(note_id: int):
    db = SessionLocal()
    try:
        return delete_note_crud(note_id, db)
    except Exception:
        return f"Note with ID {note_id} not found"
    finally:
        db.close()