import requests

weather_descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Light snow",
    80: "Rain showers",
    95: "Thunderstorm"
}

def get_current_weather(city=None):
    coord_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1"
    coord_res = requests.get(coord_url)
    coord_data = coord_res.json()
    if not coord_data.get("results"):
        return f"City '{city}' not found"
    lat = coord_data["results"][0]["latitude"]
    lon = coord_data["results"][0]["longitude"]
    res_url = f"https://api.open-meteo.com/v1/forecast"
    weather_res = requests.get(res_url, params={
        "latitude": lat,
        "longitude": lon,
        "current": "temperature_2m,wind_speed_10m,weather_code"
    })
    weather_data = weather_res.json()
    temp = weather_data["current"]["temperature_2m"]
    wind = weather_data["current"]["wind_speed_10m"]
    code = weather_data["current"]["weather_code"]
    return f"Current temperature in {city}:\n- Temperature: {temp}°C\n- Wind Speed: {wind}km/h\n- Weather Conditions: {weather_descriptions.get(code, "Unknown conditions")}"