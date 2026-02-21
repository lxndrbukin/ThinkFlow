from dotenv import load_dotenv
from os import getenv
from openai import OpenAI
from utils import system_message

load_dotenv()
API_KEY = getenv("OPENAI_API_KEY")

client = OpenAI(api_key=API_KEY)

def chat(history=[system_message]):
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
                max_completion_tokens=250
            )
            output = response.choices[0].message.content
            messages.append({
                "role": "assistant",
                "content": output
            })
            print(f"Bot:\n{output}")
        except Exception as e:
            output = f"Ooops, {e}"
            print(output)
