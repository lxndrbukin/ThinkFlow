from chat import chat
from utils import system_message
from json import JSONDecodeError
from history import load_history

if __name__ == "__main__":
    messages = [system_message]
    try:
        messages = load_history()
    except FileNotFoundError:
        pass
    except JSONDecodeError:
        print("History file corrupted")
    chat(messages)