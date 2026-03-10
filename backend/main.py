import uvicorn
from db import engine, Base
from db_models.chat import Chat, ChatMessage
from db_models.notes import Note
from db_models.auth import User

Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000)