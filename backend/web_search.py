from tavily import TavilyClient
from dotenv import load_dotenv
import os

load_dotenv()
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

tavily_client = TavilyClient(api_key=TAVILY_API_KEY)

def web_search(query: str, max_results: int = 3):
    try:
        output = ""
        response = tavily_client.search(query, max_results=max_results)
        if not len(response["results"]):
            return "No search results found"
        for idx, result in enumerate(response["results"]):
            output += f"\n{idx}. {result["title"]}\n{result["url"]}\n{result["content"][:200]}..."
        return output
    except Exception as e:
        return f"Error: {e}"

