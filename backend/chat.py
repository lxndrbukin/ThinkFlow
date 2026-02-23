from typing import Generator
from dotenv import load_dotenv
from os import getenv
from json import loads
from openai import OpenAI
from history import save_history, trim_history
from utils import tools, function_map

load_dotenv()
API_KEY = getenv("OPENAI_API_KEY")

client = OpenAI(api_key=API_KEY)

def chat(message: str, history: list) -> Generator[str, None, None]:
    messages = trim_history(history.copy())
    messages.append({
        "role": "user",
        "content": message
    })
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=tools,
            max_completion_tokens=250,
            stream=False
        )
        choice = response.choices[0]
        if choice.message.tool_calls:
            messages.append(choice.message.model_dump())
            for tool_call in choice.message.tool_calls:
                function_name = tool_call.function.name
                function_args = loads(tool_call.function.arguments)
                result = function_map[function_name](**function_args)
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "name": function_name,
                    "content": str(result)
                })
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                tools=tools,
                max_completion_tokens=250,
                stream=True
            )
            output = ""
            for chunk in response:
                if chunk.choices[0].delta.content is not None:
                    text = chunk.choices[0].delta.content
                    output += text
                    yield text
        else:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                tools=tools,
                max_completion_tokens=250,
                stream=True
            )
            output = ""
            for chunk in response:
                if chunk.choices[0].delta.content is not None:
                    text = chunk.choices[0].delta.content
                    output += text
                    yield text
        messages.append({
            "role": "assistant",
            "content": output
        })
        save_history(messages)
    except Exception as e:
        yield f"Ooops, {e}"