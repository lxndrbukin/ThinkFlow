# AI Personal Assistant

A full-stack **AI-powered personal assistant** built with Python and React. Features **real-time streaming responses**, **tool calling** (weather, notes, web search, datetime), **persistent chat history**, and a polished web interface.

---

## Features

- **Real-Time Streaming**: Responses stream word-by-word via Server-Sent Events (SSE)
- **Tool Calling**: The assistant can use tools autonomously based on user requests
  - **Current Date & Time**: Get the current date, time, or both
  - **Weather**: Live weather data for any city via Open-Meteo (no API key required)
  - **Notes**: Create, edit, delete, and view personal notes with priority and status tracking
  - **Web Search**: Search the web in real time via Tavily API
- **Persistent Chat History**: Conversation history saved across sessions
- **Markdown Rendering**: Assistant responses render with full markdown and syntax-highlighted code blocks
- **Clear History**: Reset the conversation with one click

---

## Tech Stack

**Backend**
- Python 3.11+
- FastAPI + Uvicorn
- OpenAI API (`gpt-4o-mini`)
- Tavily API (web search)
- Open-Meteo API (weather, free — no key required)

**Frontend**
- React 18 + TypeScript
- Redux Toolkit
- Vite
- `react-markdown` + `react-syntax-highlighter`

---

## Requirements

- Python 3.11+
- Node.js 18+
- OpenAI API key
- Tavily API key

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ai-personal-assistant.git
cd ai-personal-assistant
```

### 2. Backend setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key
TAVILY_API_KEY=your_tavily_api_key
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

---

## Usage

### Start the backend

```bash
cd backend
uvicorn api:app --reload
```

The API will be available at `http://localhost:8000`.
Interactive API docs available at `http://localhost:8000/docs`.

### Start the frontend

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
ai-personal-assistant/
│
├── backend/
│   ├── api.py                  # FastAPI endpoints
│   ├── chat.py                 # Core chat logic + streaming generator
│   ├── history.py              # Chat history management
│   ├── notes.py                # Notes CRUD operations
│   ├── weather.py              # Weather tool (Open-Meteo)
│   ├── web_search.py           # Web search tool (Tavily)
│   ├── current_datetime.py     # Datetime tool
│   ├── utils.py                # Tool definitions + function map
│   └── models/
│       └── chat.py             # Pydantic request models
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── ChatHeader.tsx
│       │   ├── ChatWindow.tsx
│       │   ├── MessagesList.tsx
│       │   ├── MessageInput.tsx
│       │   └── Message.tsx
│       └── store/
│           ├── slices/
│           │   ├── chatSlice.ts
│           │   └── types.ts
│           └── thunks/
│               └── chat.ts
│
├── data/
│   ├── chat_history.json       # Persisted conversation (auto-created)
│   └── notes.json              # Persisted notes (auto-created)
│
├── .env                        # API keys (never commit this)
├── .gitignore
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/history` | Load existing chat history |
| `POST` | `/chat` | Send a message, receive SSE stream |
| `DELETE` | `/history` | Clear chat history |

---

## Notes Structure

Each note contains the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Auto-incremented unique identifier |
| `title` | string | Note title |
| `desc` | string | Note description |
| `priority` | string | `low`, `medium`, or `high` |
| `status` | string | `pending`, `in progress`, or `completed` |
| `created_at` | string | Creation timestamp (DD/MM/YYYY HH:MM:SS) |

---

## How Streaming Works

1. The frontend sends a `POST /chat` request with the message and conversation history
2. The backend processes any tool calls (weather, notes, etc.) synchronously
3. The final response is streamed back chunk-by-chunk via Server-Sent Events
4. The frontend accumulates chunks in Redux state, rendering them in real time
5. On completion, the full message is finalised and history is saved server-side

---

## Future Improvements

- [ ] PostgreSQL database for production-ready persistence
- [ ] User authentication
- [ ] Multiple conversation threads
- [ ] Multi-provider support (Anthropic Claude, xAI Grok, OpenAI GPT)
- [ ] Adjustable model parameters (temperature, max tokens)
- [ ] Deployable to Render (backend) + Vercel (frontend)
- [ ] Additional tools (calendar, reminders, file upload)

---

## License

This project is open source and available for personal and educational use.
