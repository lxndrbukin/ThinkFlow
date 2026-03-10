from typing import Generator
from dotenv import load_dotenv
from os import getenv
from json import loads
from openai import OpenAI
from history import save_history, load_history, trim_history
from utils import tools, function_map
from models.chat import ChatMessageCreate, Role

load_dotenv()
API_KEY = getenv("OPENAI_API_KEY")

client = OpenAI(api_key=API_KEY)

def ai_chat(chat_id: int, message: str | list) -> Generator[str, None, None]:
    if isinstance(message, list):
        text_content = message[0]["text"]
        image_data = message[1]["image"] if len(message) > 1 else None
    else:
        text_content = message
        image_data = None
    max_tokens = 2048 if image_data else 1024
    messages = trim_history(load_history(chat_id))
    message = ChatMessageCreate(
        role=Role.user,
        content=text_content,
        extra=None,
        chat_id=chat_id
    )
    content = [{"type": "text", "text": text_content}]
    if image_data:
        content.append({
            "type": "image_url",
            "image_url": {"url": f"data:{image_data['mediaType']};base64,{image_data['data']}"}
        })
    model = "gpt-4o" if image_data else "gpt-4o-mini"
    messages.append({"role": "user", "content": content})
    save_history(chat_id, message)
    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            tools=tools,
            max_completion_tokens=max_tokens,
            stream=False
        )
        choice = response.choices[0]
        if choice.message.tool_calls:
            message = ChatMessageCreate(
                role=Role.assistant,
                content=None,
                extra={"tool_calls": choice.message.model_dump()["tool_calls"]},
                chat_id=chat_id
            )
            messages.append({k: v for k, v in {
                "role": "assistant",
                "content": None,
                **(message.extra or {})
            }.items() if v is not None})
            save_history(chat_id, message)
            for tool_call in choice.message.tool_calls:
                function_name = tool_call.function.name
                function_args = loads(tool_call.function.arguments)
                result = function_map[function_name](**function_args)
                message = ChatMessageCreate(
                    role=Role.tool,
                    content=str(result),
                    extra={"tool_call_id": tool_call.id, "name": function_name},
                    chat_id=chat_id
                )
                messages.append({k: v for k, v in {
                    "role": "tool",
                    "content": str(result),
                    **(message.extra or {})
                }.items() if v is not None})
                save_history(chat_id, message)
            response = client.chat.completions.create(
                model=model,
                messages=messages,
                tools=tools,
                max_completion_tokens=max_tokens,
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
                model=model,
                messages=messages,
                tools=tools,
                max_completion_tokens=max_tokens,
                stream=True
            )
            output = ""
            for chunk in response:
                if chunk.choices[0].delta.content is not None:
                    text = chunk.choices[0].delta.content
                    output += text
                    yield text
        message = ChatMessageCreate(
            role=Role.assistant,
            content=output,
            extra=None,
            chat_id=chat_id
        )
        save_history(chat_id, message)
    except Exception as e:
        yield f"Ooops, {e}"