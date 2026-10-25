import os
from dotenv import load_dotenv

load_dotenv()
key = os.getenv("GEMINI_API_KEY")

try:
    from google import genai
    client = genai.Client(api_key=key)
    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents="Where is Silicon City, Rau and what are typical real estate prices per sq ft there in INR?"
    )
    print("New SDK Success:\n", response.text)
except Exception as e:
    print("New SDK Error:", e)
