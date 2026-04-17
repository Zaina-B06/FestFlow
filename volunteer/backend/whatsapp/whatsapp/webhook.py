from fastapi import APIRouter, Request
from fastapi.responses import PlainTextResponse
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/webhook", tags=["WhatsApp Webhook"])

@router.get("/")
async def verify(request: Request):
    params = dict(request.query_params)
    if params.get("hub.verify_token") == os.getenv("WA_VERIFY_TOKEN"):
        return PlainTextResponse(content=params.get("hub.challenge"))
    return {"error": "Invalid token"}

@router.post("/")
async def receive(request: Request):
    data = await request.json()
    try:
        messages = data["entry"][0]["changes"][0]["value"]["messages"]
        for msg in messages:
            phone = msg["from"]
            text  = msg["text"]["body"]
            await handle_incoming(phone, text)
    except Exception:
        pass
    return {"status": "ok"}

async def handle_incoming(phone: str, text: str):
    from groq.prompts import answer_volunteer_query
    from whatsapp.client import send_free_message

    context = {
        "event_name": "Crescendo 2024",
        "volunteer_lounge": "Seminar Hall B, Ground Floor",
        "medical_tent": "Gate 2",
        "hotline": "EXT-204",
        "radio": "CH-09"
    }

    answer = await answer_volunteer_query(text, context)
    await send_free_message(phone, answer)