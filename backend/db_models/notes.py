from sqlalchemy import Column, Integer, String, Text, DateTime
from backend.db import Base
from datetime import datetime, timezone

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    desc = Column(Text)
    priority = Column(String(10), nullable=False)
    status = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))