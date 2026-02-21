from current_datetime import current_datetime

system_message = {
        "role": "system",
        "content": [
            {
                "type": "text",
                "text": "You are a friendly personal assistant."
            }
        ]
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
]

function_map = {
    "current_datetime": current_datetime
}