from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class Role(str, Enum):
    user = "user"
    assistant = "assistant"
    system = "system"
    tool = "tool"

class ImageData(BaseModel):
    type: str
    data: str
    mediaType: str | None = None

class ChatRequest(BaseModel):
    input: str
    image: ImageData | None = None
    model: str = "gpt-4o-mini"

class ChatResponse(BaseModel):
    id: int
    title: str
    created_at: datetime

class ChatMessageCreate(BaseModel):
    content: str | None
    role: Role
    extra: dict | None = None
    chat_id: int

class ChatMessageResponse(BaseModel):
    id: int
    content: str | None = None
    role: Role
    extra: dict | None = None
    chat_id: int
    created_at: datetime

    model_config = {"use_enum_values": True}