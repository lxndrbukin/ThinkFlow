import json
import os
from datetime import datetime
from tabulate import tabulate

def load_notes():
    if not os.path.exists("notes.json"):
        return []
    with open("notes.json", "r") as file:
        data = json.load(file)
    return data

def save_notes(notes):
    with open("notes.json", "w") as file:
        json.dump(notes, file, indent=4)

def create_note(title, desc, priority, status):
    notes = load_notes()
    new_id = max(notes, key=lambda x: x.get("id", 0))["id"] + 1 if notes else 1
    notes.append({
        "id": new_id,
        "title": title,
        "desc": desc,
        "priority": priority,
        "status": status,
        "created_at": datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    })
    save_notes(notes)
    return f"Note '{title}' created with ID {new_id}"

def edit_note(id, title=None, desc=None, priority=None, status=None):
    notes = load_notes()
    found = False
    for note in notes:
        if note["id"] == id:
            found = True
            if title is not None:
                note["title"] = title
            if desc is not None:
                note["desc"] = desc
            if priority is not None:
                note["priority"] = priority
            if status is not None:
                note["status"] = status
    if not found:
        return f"Note with ID {id} not found"
    save_notes(notes)
    return f"Note with ID {id} updated"

def delete_note(id):
    notes = load_notes()
    filtered = [note for note in notes if note["id"] != id]
    if len(filtered) == len(notes):
        return f"Note with ID {id} not found"
    save_notes(filtered)
    return f"Note with ID {id} deleted"

def view_notes():
    notes = load_notes()
    if not len(notes):
        return "Task list is empty"
    return f"Full notes list:\n{tabulate(notes, headers="keys", tablefmt="grid")}"