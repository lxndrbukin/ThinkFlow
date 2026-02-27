from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.chat import chats_router
from routers.notes import notes_router

app = FastAPI(title="ThinkFlow")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://thinkflow-eosin.vercel.app/"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chats_router)
app.include_router(notes_router)

