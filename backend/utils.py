from current_datetime import current_datetime
from notes import create_note, delete_note, edit_note, view_notes
from weather import get_current_weather
from web_search import web_search

system_message = {
        "role": "system",
        "content": "You are a friendly personal assistant."
    }

tools = [
    {
        "type": "function",
        "function": {
            "name": "current_datetime",
            "description": "Get the current date and time, e.g. format: DD/MM/YYYY HH:MM:SS.",
            "parameters": {
                "type": "object",
                "properties": {
                    "current_date": {
                        "type": "boolean",
                        "description": "Set to true to retrieve only the current date."
                    },
                    "current_time": {
                        "type": "boolean",
                        "description": "Set to true to retrieve only the current time."
                    }
                },
                "required": []
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "Fetch current weather for a city. Use for ANY weather query.",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "City name, e.g., 'Madrid' or 'London'."
                    }
                },
                "required": ["city"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "create_note",
            "description": "Create a new note (title, description, priority, status).",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "Title of the provided note"
                    },
                    "desc": {
                        "type": "string",
                        "description": "Description of the provided note"
                    },
                    "priority": {
                        "type": "string",
                        "enum": ["low", "medium", "high"],
                        "description": "Priority of the provided note"
                    },
                    "status": {
                        "type": "string",
                        "enum": ["pending", "in progress", "completed"],
                        "description": "Status of the provided note"
                    },
                },
                "required": ["title", "desc", "priority", "status"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "edit_note",
            "description": "Update an existing note using optional arguments (title, description, priority, status)",
            "parameters": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "description": "ID to identify the task"
                    },
                    "title": {
                        "type": "string",
                        "description": "Title of the provided note (optional)"
                    },
                    "desc": {
                        "type": "string",
                        "description": "Description of the provided note (optional)"
                    },
                    "priority": {
                        "type": "string",
                        "enum": ["low", "medium", "high"],
                        "description": "Priority of the provided note (optional)"
                    },
                    "status": {
                        "type": "string",
                        "enum": ["pending", "in progress", "completed"],
                        "description": "Status of the provided note (optional)"
                    },
                },
                "required": ["id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "delete_note",
            "description": "Delete an existing note using the note ID",
            "parameters": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "description": "ID to identify the task"
                    }
                },
                "required": ["id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "view_notes",
            "description": "Output the full table of existing notes",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "web_search",
            "description": "Searches the web using a query input and returns search results",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Query provided by the user for the search"
                    }
                },
                "required": ["query"]
            }
        }
    },
]

function_map = {
    "web_search": web_search,
    "current_datetime": current_datetime,
    "create_note": create_note,
    "get_current_weather": get_current_weather,
    "edit_note": edit_note,
    "delete_note": delete_note,
    "view_notes": view_notes
}