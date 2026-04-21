import requests
from os import getenv
from dotenv import load_dotenv

load_dotenv()
OPENWEATHER_API_KEY = getenv("OPENWEATHER_API_KEY")

def get_current_weather(city=None):
    res = requests.get("https://api.openweathermap.org/data/2.5/weather", params={
        "q": city,
        "appid": OPENWEATHER_API_KEY,
        "units": "metric"
    })
    data = res.json()
    if res.status_code == 404 or data.get("cod") == "404":
        return f"City '{city}' not found"
    if res.status_code != 200:
        return f"Weather service error: {data.get('message', 'Unknown error')}"
    temp = data["main"]["temp"]
    wind = data["wind"]["speed"]
    description = data["weather"][0]["description"].capitalize()
    return f"Current weather in {city}:\n- Temperature: {temp}°C\n- Wind Speed: {wind}m/s\n- Conditions: {description}"