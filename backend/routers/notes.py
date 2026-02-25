from fastapi import APIRouter, status, Depends
from models.notes import NoteCreate, NoteUpdate
from crud.notes import (
    create_note as create_note_crud,
    get_note as get_note_crud,
    get_notes as get_notes_crud,
    edit_note as edit_note_crud,
    delete_note as delete_note_crud
)
from db import get_db
from sqlalchemy.orm import Session

notes_router = APIRouter(prefix="/notes")

@notes_router.post("/", status_code=status.HTTP_201_CREATED)
def create_note(data: NoteCreate, db: Session = Depends(get_db)):
    return create_note_crud(data, db)

@notes_router.get("/", status_code=status.HTTP_200_OK)
def get_notes(db: Session = Depends(get_db)):
    return get_notes_crud(db)

@notes_router.get("/{note_id}", status_code=status.HTTP_200_OK)
def get_note(note_id: int, db: Session = Depends(get_db)):
    return get_note_crud(note_id, db)

@notes_router.put("/{note_id}")
def edit_note(
        note_id: int,
        data: NoteUpdate,
        db: Session = Depends(get_db)
    ):
    return edit_note_crud(note_id, data, db)

@notes_router.delete("/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    return delete_note_crud(note_id, db)