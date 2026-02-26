from fastapi import HTTPException
from db_models.chat import Chat, ChatMessage
from models.chat import ChatMessageResponse, ChatResponse
from sqlalchemy.orm import Session
from utils import system_message

def create_chat(db: Session, title: str = "New Chat"):
    chat = Chat(
        title=title
    )
    db.add(chat)
    db.flush()
    system_msg = ChatMessage(
        content=system_message["content"],
        role=system_message["role"],
        extra=None,
        chat_id=chat.id
    )
    db.add(system_msg)
    db.commit()
    return ChatResponse(id=chat.id, title=chat.title, created_at=chat.created_at)

def get_chats(db: Session):
    chats = db.query(Chat).all()
    return [
        ChatResponse(id=c.id, title=c.title, created_at=c.created_at)
        for c in chats
    ]

def get_chat(chat_id: int, db: Session):
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return ChatResponse(id=chat.id, title=chat.title, created_at=chat.created_at)

def get_chat_messages(chat_id: int, db: Session):
    db_messages = db.query(ChatMessage).filter(ChatMessage.chat_id == chat_id).all()
    messages = [
        ChatMessageResponse(
            id=msg.id,
            content=msg.content,
            role=msg.role,
            extra=msg.extra,
            chat_id=msg.chat_id,
            created_at=msg.created_at
        )
        for msg in db_messages
    ]
    return messages

def delete_chat(chat_id: int, db: Session):
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    db.delete(chat)
    db.commit()
    return {"message": f"Chat {chat_id} deleted"}