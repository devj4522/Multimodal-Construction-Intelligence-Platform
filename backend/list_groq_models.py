import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
groq_key = os.getenv("GROQ_API_KEY")

try:
    client = Groq(api_key=groq_key)
    models = client.models.list()
    for m in models.data:
        print(m.id)
except Exception as e:
    print("GROQ ERROR:", e)
