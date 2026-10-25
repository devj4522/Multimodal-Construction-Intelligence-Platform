import os, json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
groq_key = os.getenv("GROQ_API_KEY")

try:
    client = Groq(api_key=groq_key)
    prompt = """
You are ConstructAI. Calculate real estate valuation for:
Location: Silicon City, Rau, Indore
Area: 3000 sq ft
Building Age: 3 years
Property Type: Residential
Amenities: none

Return ONLY valid JSON with keys:
"location", "estimated_market_value", "price_per_sqft", "rental_yield", "monthly_rental_potential", "appreciation_outlook", "factors" (list of strings).
"""
    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {"role": "system", "content": "You are a professional civil engineer. Output ONLY valid JSON."},
            {"role": "user", "content": prompt}
        ],
        response_format={"type": "json_object"}
    )
    res = json.loads(completion.choices[0].message.content)
    print("PARSED JSON SUCCESS:")
    print("Market Value:", res.get("estimated_market_value"))
    print("Rate:", res.get("price_per_sqft"))
    print("Factors:", res.get("factors"))
except Exception as e:
    print("GROQ JSON ERROR:", e)
