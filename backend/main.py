import uvicorn
from backend.db import engine, Base
from backend.db_models.chat import Chat, ChatMessage
from backend.db_models.notes import Note

Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    uvicorn.run("api:app", reload=True)