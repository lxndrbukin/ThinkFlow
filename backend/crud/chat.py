from fastapi import HTTPException
from db_models.chat import Chat, ChatMessage
from models.chat import ChatMessageResponse, ChatResponse
from sqlalchemy.orm import Session

def create_chat(db: Session, title: str = "New Chat"):
    chat = Chat(
        title=title
    )
    db.add(chat)
    db.commit()
    db.refresh(chat)
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