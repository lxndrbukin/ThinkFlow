from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
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
    def stream_generator(message, history):
        for chunk in chat(message=message, history=history):
            yield f"data: {chunk.replace(chr(10), '\\n')}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        stream_generator(request.message, request.history),
        media_type="text/event-stream"
    )