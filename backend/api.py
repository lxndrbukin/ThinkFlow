from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.chat import ChatRequest
from history import load_history
from chat import chat

app = FastAPI(title="AI Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/history")
def history():
    try:
        return load_history()
    except Exception as e:
        raise HTTPException(status_code=500, detail=(str(e)))

@app.post("/chat")
def post_chat(request: ChatRequest):
    try:
        return chat(message=request.message, history=request.history)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))