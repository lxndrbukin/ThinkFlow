import uvicorn
from db import engine, Base
from db_models.chat import Chat, ChatMessage
from db_models.notes import Note

Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    uvicorn.run("api:app", reload=True)