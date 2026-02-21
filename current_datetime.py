from datetime import datetime, date

def current_datetime(
        current_date: bool = None,
        current_time: bool = None
    ):
    if current_date:
        now = date.today().strftime("%d/%m/%Y")
    elif current_time:
        now = datetime.now().strftime("%H:%M:%S")
    else:
        now = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    return f"The current date and time: {now}"