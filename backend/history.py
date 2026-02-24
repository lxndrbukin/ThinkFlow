from backend.models.chat import ChatMessageCreate
from db import SessionLocal
from db_models.chat import ChatMessage

def save_history(chat_id: int, data: ChatMessageCreate):
    db = SessionLocal()
    try:
        chat_message = ChatMessage(
            content=data.content,
            role=data.role,
            extra=data.extra,
            chat_id=chat_id
        )
        db.add(chat_message)
        db.commit()
    finally:
        db.close()

def load_history(chat_id: int):
    db = SessionLocal()
    try:
        messages = db.query(ChatMessage).filter(ChatMessage.chat_id == chat_id).all()
        return [
            {
                "role": msg.role,
                "content": msg.content,
                **(msg.extra or {})
            }
            for msg in messages
        ]
    finally:
        db.close()

def delete_history(chat_id: int):
    db = SessionLocal()
    try:
        db.query(ChatMessage).filter(ChatMessage.chat_id == chat_id).delete()
        db.commit()
        return {"message": "History cleared"}
    finally:
        db.close()

def trim_history(messages, max_count=20):
    if len(messages) <= max_count:
        return messages

    system_message = messages[0]
    conversation = messages[1:]

    turns = find_complete_turns(conversation)

    def count_messages():
        count = 1
        for turn in turns:
            count += len(turn)
        return count

    while count_messages() > max_count:
        if turns:
            turns.pop(0)
        else:
            break

    result = [system_message]
    for turn in turns:
        result.extend(turn)

    return result

def find_complete_turns(messages):
    turns = []
    current_turn = []

    for msg in messages:
        current_turn.append(msg)

        if msg["role"] == "assistant" and "tool_calls" not in msg:
            turns.append(current_turn)
            current_turn = []

    if current_turn:
        turns.append(current_turn)

    return turns