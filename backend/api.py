from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from models.chat import ChatRequest
from history import load_history, delete_history
from chat import chat

app = FastAPI(title="AI Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/chats/{chat_id}")
def chat_history(chat_id: int):
    try:
        return load_history(chat_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=(str(e)))

@app.delete("/chats/{chat_id}")
def del_chat(chat_id: int):
    return delete_history(chat_id)

@app.post("/chats/{chat_id}")
def post_chat(chat_id: int, request: ChatRequest):
    def stream_generator(message):
        for chunk in chat(message=message, chat_id=chat_id):
            yield f"data: {chunk.replace(chr(10), '\\n')}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        stream_generator(request.message),
        media_type="text/event-stream"
    )