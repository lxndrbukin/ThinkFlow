from fastapi import FastAPI, HTTPException
from history import load_history

app = FastAPI(title="AI Assistant")

@app.get("/history")
def history():
    try:
        return load_history()
    except Exception as e:
        raise HTTPException(status_code=500, detail=(str(e)))

@app.post("/chat")
def chat():
    pass