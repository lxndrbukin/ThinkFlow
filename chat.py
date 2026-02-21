from dotenv import load_dotenv
from os import getenv
from openai import OpenAI
from history import save_history

load_dotenv()
API_KEY = getenv("OPENAI_API_KEY")

client = OpenAI(api_key=API_KEY)

def chat(history):
    messages = history.copy()
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
            messages.append({
                "role": "assistant",
                "content": output
            })
            save_history(messages)
        except Exception as e:
            output = f"Ooops, {e}"
            print(output)
