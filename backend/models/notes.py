from pydantic import BaseModel
from enum import Enum
from datetime import datetime

class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Status(str, Enum):
    pending = "pending"
    in_progress = "in progress"
    completed = "completed"

class NoteCreate(BaseModel):
    title: str
    desc: str | None = None
    priority: Priority
    status: Status

class NoteResponse(BaseModel):
    id: int
    title: str
    desc: str | None = None
    priority: Priority
    status: Status
    created_at: datetime

    model_config = {"use_enum_values": True}

class NoteUpdate(BaseModel):
    title: str | None = None
    desc: str | None = None
    priority: Priority | None = None
    status: Status | None = None