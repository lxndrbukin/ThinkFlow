from pydantic import BaseModel
from enum import Enum

class Role(str, Enum):
    user = "user"
    assistant = "assistant"
    system = "system"
    tool = "tool"

class ChatRequest(BaseModel):
    message: str
    chat_id: int

class ChatResponse(BaseModel):
    pass

class ChatMessageCreate(BaseModel):
    content: str | None
    role: Role
    extra: dict | None = None
    chat_id: int