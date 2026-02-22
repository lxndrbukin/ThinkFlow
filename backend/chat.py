import time
from dotenv import load_dotenv
from os import getenv
from json import loads
from openai import OpenAI
from history import save_history, trim_history
from utils import tools, function_map

load_dotenv()
API_KEY = getenv("OPENAI_API_KEY")

client = OpenAI(api_key=API_KEY)

def chat(history):
    messages = trim_history(history.copy())
    while True:
        prompt = input("You:\n")
        messages.append({
            "role": "user",
            "content": prompt
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
                print(f"\nBot:")
                output = ""
                for chunk in response:
                    if chunk.choices[0].delta.content is not None:
                        text = chunk.choices[0].delta.content
                        print(text, end="", flush=True)
                        output += text
                print("\n")
            else:
                output = choice.message.content
                print(f"\nBot:\n", end="", flush=True)
                for char in output:
                    print(char, end="", flush=True)
                    time.sleep(0.005)
                print("\n")
            messages.append({
                "role": "assistant",
                "content": output
            })
            save_history(messages)
        except Exception as e:
            output = f"Ooops, {e}"
            print(output)
