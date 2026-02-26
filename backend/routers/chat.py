from fastapi import APIRouter, status, Depends
from fastapi.responses import StreamingResponse
from models.chat import ChatRequest
from ai_chat import ai_chat
from crud.chat import (
    create_chat as create_chat_crud,
    get_chat as get_chat_crud,
    get_chats as get_chats_crud,
    get_chat_messages as get_chat_msgs_crud,
    delete_chat as delete_chat_crud
)
from db import get_db
from sqlalchemy.orm import Session

chats_router = APIRouter(prefix="/chats")

@chats_router.post("/", status_code=status.HTTP_201_CREATED)
def create_chat(db: Session = Depends(get_db)):
    return create_chat_crud(db)

@chats_router.get("/{chat_id}/messages", status_code=status.HTTP_200_OK)
def get_chat_messages(chat_id: int, db: Session = Depends(get_db)):
    return get_chat_msgs_crud(chat_id, db)

@chats_router.get("/{chat_id}", status_code=status.HTTP_200_OK)
def get_chat(chat_id: int, db: Session = Depends(get_db)):
    return get_chat_crud(chat_id, db)

@chats_router.get("/", status_code=status.HTTP_200_OK)
def get_chats(db: Session = Depends(get_db)):
    return get_chats_crud(db)

@chats_router.delete("/{chat_id}")
def delete_chat(chat_id: int, db: Session = Depends(get_db)):
    return delete_chat_crud(chat_id, db)

@chats_router.post("/{chat_id}")
def post_message(chat_id: int, request: ChatRequest):
    def stream_generator(message):
        for chunk in ai_chat(message=message, chat_id=chat_id):
            yield f"data: {chunk.replace(chr(10), '\\n')}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        stream_generator(request.message),
        media_type="text/event-stream"
    )