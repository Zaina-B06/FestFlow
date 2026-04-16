from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models.notification import Notification
from models.volunteer import Volunteer

router = APIRouter(tags=["Notifications"])

@router.get("/volunteers/{volunteer_id}/notifications")
async def get_notifications(volunteer_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Notification)
        .where(Notification.volunteer_id == volunteer_id)
        .order_by(Notification.created_at.desc())
    )
    return result.scalars().all()

@router.put("/notifications/{id}/read")
async def mark_read(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Notification).where(Notification.id == id))
    notif = result.scalar_one_or_none()
    if notif:
        notif.is_read = True
        await db.commit()
    return {"message": "Marked as read"}

@router.post("/notifications/broadcast")
async def broadcast(data: dict, db: AsyncSession = Depends(get_db)):
    from groq.prompts import craft_emergency_message
    from whatsapp.templates import send_emergency_alert

    # Groq crafts the message
    polished = await craft_emergency_message(data["message"])

    # get all volunteers for this event
    from models.application import Application
    result = await db.execute(
        select(Application).where(
            Application.event_id == data["event_id"],
            Application.status == "confirmed"
        )
    )
    applications = result.scalars().all()

    for app in applications:
        # create notification row
        notif = Notification(
            volunteer_id=app.volunteer_id,
            type="emergency",
            title=data.get("title", "Emergency Alert"),
            body=polished,
        )
        db.add(notif)

        # get volunteer phone for WhatsApp
        vol = await db.execute(
            select(Volunteer).where(Volunteer.id == app.volunteer_id)
        )
        volunteer = vol.scalar_one_or_none()
        if volunteer:
            await send_emergency_alert(volunteer.phone, data.get("event_name", ""), polished)

    await db.commit()
    return {"message": f"Broadcast sent to {len(applications)} volunteers", "content": polished}