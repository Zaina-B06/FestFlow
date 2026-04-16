import httpx
import os
from dotenv import load_dotenv

load_dotenv()

WA_URL = f"https://graph.facebook.com/v19.0/{os.getenv('WA_PHONE_NUMBER_ID')}/messages"
HEADERS = {
    "Authorization": f"Bearer {os.getenv('WA_TOKEN')}",
    "Content-Type": "application/json"
}

async def send_message(to: str, template: str, params: list):
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "template",
        "template": {
            "name": template,
            "language": {"code": "en"},
            "components": [{
                "type": "body",
                "parameters": [{"type": "text", "text": p} for p in params]
            }]
        }
    }
    async with httpx.AsyncClient() as client:
        res = await client.post(WA_URL, json=payload, headers=HEADERS)
        return res.json()

async def send_free_message(to: str, message: str):
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": message}
    }
    async with httpx.AsyncClient() as client:
        res = await client.post(WA_URL, json=payload, headers=HEADERS)
        return res.json()