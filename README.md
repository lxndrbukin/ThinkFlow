# ThinkFlow — AI Personal Assistant

A full-stack **AI-powered personal assistant** built with Python and React. Features **real-time streaming responses**, **tool calling** (weather, notes, web search, datetime), **multiple conversation threads**, and a polished web interface.

🔗 **Live Demo**: [thinkflow-eosin.vercel.app](https://thinkflow-eosin.vercel.app)

---

## Features

- **Real-Time Streaming**: Responses stream word-by-word via Server-Sent Events (SSE)
- **Multiple Conversation Threads**: Create, switch between, and delete conversations via a collapsible sidebar
- **Tool Calling**: The assistant autonomously uses tools based on user requests
  - **Current Date & Time**: Get the current date, time, or both
  - **Weather**: Live weather data for any city via Open-Meteo (no API key required)
  - **Notes**: Create, edit, delete, and view personal notes with priority and status tracking
  - **Web Search**: Search the web in real time via Tavily API
- **Persistent Chat History**: Conversation history saved to PostgreSQL across sessions
- **Markdown Rendering**: Assistant responses render with full markdown and syntax-highlighted code blocks
- **Collapsible Sidebar**: Navigate between conversations with a clean, toggleable sidebar

---

## Tech Stack

**Backend**
- Python 3.11+
- FastAPI + Uvicorn
- SQLAlchemy + PostgreSQL (Neon)
- OpenAI API (`gpt-4o-mini`)
- Tavily API (web search)
- Open-Meteo API (weather, free — no key required)

**Frontend**
- React 18 + TypeScript
- Redux Toolkit
- React Router v6
- Vite
- `react-markdown` + `react-syntax-highlighter`

**Deployment**
- Backend → Render
- Frontend → Vercel
- Database → Neon (serverless PostgreSQL)

---

## Requirements

- Python 3.11+
- Node.js 18+
- OpenAI API key
- Tavily API key
- PostgreSQL database (Neon recommended)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/thinkflow.git
cd thinkflow
```

### 2. Backend setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory:

```env
OPENAI_API_KEY=your_openai_api_key
TAVILY_API_KEY=your_tavily_api_key
DATABASE_URL=your_postgresql_connection_string
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:8000
```

---

## Usage

### Start the backend

```bash
cd backend
python main.py
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
thinkflow/
│
├── backend/
│   ├── main.py                 # App entry point + DB table creation
│   ├── api.py                  # FastAPI app + middleware
│   ├── ai_chat.py              # Core chat logic + SSE streaming generator
│   ├── history.py              # Chat history DB operations
│   ├── notes.py                # Notes tool functions (AI adapter layer)
│   ├── weather.py              # Weather tool (Open-Meteo)
│   ├── web_search.py           # Web search tool (Tavily)
│   ├── current_datetime.py     # Datetime tool
│   ├── utils.py                # Tool definitions + function map
│   ├── db.py                   # SQLAlchemy engine + session
│   ├── db_models/
│   │   ├── chat.py             # Chat + ChatMessage SQLAlchemy models
│   │   └── notes.py            # Note SQLAlchemy model
│   ├── models/
│   │   ├── chat.py             # Pydantic request/response schemas
│   │   └── notes.py            # Pydantic request/response schemas
│   ├── crud/
│   │   ├── chat.py             # Chat CRUD operations
│   │   └── notes.py            # Notes CRUD operations
│   └── routers/
│       ├── chat.py             # Chat API routes
│       └── notes.py            # Notes API routes
│
├── frontend/
│   └── src/
│       ├── api.ts              # API base URL config
│       ├── router/             # React Router configuration
│       ├── components/
│       │   ├── App.tsx         # Root layout with sidebar
│       │   ├── Home/
│       │   │   └── Home.tsx    # Home page with new message input
│       │   ├── ChatWindow/
│       │   │   ├── ChatWindow.tsx
│       │   │   ├── ChatHeader.tsx
│       │   │   ├── MessagesList.tsx
│       │   │   ├── MessageInput.tsx
│       │   │   └── Message.tsx
│       │   └── ChatsList/
│       │       ├── ChatsList.tsx
│       │       └── ChatsListItem.tsx
│       └── store/
│           ├── slices/
│           │   ├── chatSlice.ts
│           │   └── types.ts
│           └── thunks/
│               └── chat.ts
│
├── .env.example                # Environment variable template
├── vercel.json                 # Vercel routing config
└── README.md
```

---

## API Endpoints

### Chats

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/chats` | Create a new chat |
| `GET` | `/chats` | Get all chats |
| `GET` | `/chats/{chat_id}` | Get a specific chat |
| `GET` | `/chats/{chat_id}/messages` | Get all messages for a chat |
| `POST` | `/chats/{chat_id}` | Send a message, receive SSE stream |
| `DELETE` | `/chats/{chat_id}` | Delete a chat |

### Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/notes` | Create a note |
| `GET` | `/notes` | Get all notes |
| `GET` | `/notes/{note_id}` | Get a specific note |
| `PUT` | `/notes/{note_id}` | Edit a note |
| `DELETE` | `/notes/{note_id}` | Delete a note |

---

## Database Schema

### `chats`
| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Primary key |
| `title` | string | Chat title |
| `created_at` | datetime | Creation timestamp |

### `chat_messages`
| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Primary key |
| `role` | string | `user`, `assistant`, `system`, or `tool` |
| `content` | text | Message content |
| `extra` | JSON | Tool call metadata (tool_calls, tool_call_id, name) |
| `chat_id` | integer | Foreign key → chats |
| `created_at` | datetime | Creation timestamp |

### `notes`
| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Primary key |
| `title` | string | Note title |
| `desc` | text | Note description |
| `priority` | string | `low`, `medium`, or `high` |
| `status` | string | `pending`, `in progress`, or `completed` |
| `created_at` | datetime | Creation timestamp |

---

## How Streaming Works

1. Frontend sends `POST /chats/{chat_id}` with the user message
2. Backend loads conversation history from PostgreSQL
3. If tool calls are needed (weather, notes, etc.), they are processed synchronously first
4. The final response streams back chunk-by-chunk via Server-Sent Events
5. Frontend accumulates chunks in Redux state, rendering them in real time
6. On stream completion, the full message is saved to PostgreSQL

---

## Future Improvements
- [ ] User authentication — required for proper per-user data isolation
- [ ] Multi-provider support (Anthropic Claude, xAI Grok, Google Gemini)
- [ ] Model selection and adjustable parameters (temperature, max tokens)
- [ ] User-provided API keys with secure client-side storage
- [ ] Dedicated notes UI alongside chat-based note management
- [ ] Additional tools (calendar, reminders, file upload)

---

## License

This project is open source and available for personal and educational use.
