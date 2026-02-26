from fastapi import HTTPException
from models.notes import NoteCreate, NoteResponse, NoteUpdate
from db_models.notes import Note
from sqlalchemy.orm import Session

def create_note(data: NoteCreate, db: Session):
    note = Note(
        title=data.title,
        desc=data.desc,
        priority=data.priority,
        status=data.status
    )
    db.add(note)
    db.commit()
    db.refresh(note)
    return NoteResponse(
        id=note.id,
        title=note.title,
        desc=note.desc,
        priority=note.priority,
        status=note.status,
        created_at=note.created_at
    )

def get_note(note_id: int, db: Session):
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return NoteResponse(
        id=note.id,
        title=note.title,
        desc=note.desc,
        priority=note.priority,
        status=note.status,
        created_at=note.created_at
    )

def get_notes(db: Session):
    notes = db.query(Note).all()
    return [
        NoteResponse(
            id=note.id,
            title=note.title,
            desc=note.desc,
            priority=note.priority,
            status=note.status,
            created_at=note.created_at
        )
        for note in notes
    ]

def edit_note(note_id: int, data: NoteUpdate, db: Session):
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    if data.title is not None:
        note.title = data.title
    if data.desc is not None:
        note.desc = data.desc
    if data.priority is not None:
        note.priority = data.priority
    if data.status is not None:
        note.status = data.status
    db.commit()
    db.refresh(note)
    return NoteResponse(
        id=note.id,
        title=note.title,
        desc=note.desc,
        priority=note.priority,
        status=note.status,
        created_at=note.created_at
    )

def delete_note(note_id: int, db: Session):
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(note)
    db.commit()
    return {"message": f"Note {note_id} deleted"}