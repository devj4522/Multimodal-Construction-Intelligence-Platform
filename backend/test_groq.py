import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
groq_key = os.getenv("GROQ_API_KEY")

try:
    client = Groq(api_key=groq_key)
    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{"role": "user", "content": "What is the typical property rate per sq ft in Silicon City, Rau, Indore in INR? Answer in 2 lines."}]
    )
    print("GROQ 120B SUCCESS:")
    print(completion.choices[0].message.content.encode('ascii', 'ignore').decode('ascii'))
except Exception as e:
    print("GROQ 120B ERROR:", e)
