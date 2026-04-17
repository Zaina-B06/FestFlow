from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models.application import Application
from models.event import Event

router = APIRouter(tags=["Applications"])

@router.get("/applications/event/{event_id}")
async def get_applications_for_event(event_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Application).where(Application.event_id == event_id)
    )
    return result.scalars().all()

@router.post("/events/{event_id}/apply")
async def apply(event_id: int, data: dict, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Event).where(Event.id == event_id))
    event = result.scalar_one_or_none()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    if event.status == "full":
        raise HTTPException(status_code=400, detail="Event is full")

    application = Application(
        volunteer_id=data["volunteer_id"],
        event_id=event_id,
        role_preference=data.get("role_preference")
    )
    db.add(application)
    event.spots_left -= 1
    if event.spots_left <= 0:
        event.status = "full"

    await db.commit()
    await db.refresh(application)
    return application

@router.delete("/events/{event_id}/withdraw")
async def withdraw(event_id: int, data: dict, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Application).where(
            Application.event_id == event_id,
            Application.volunteer_id == data["volunteer_id"]
        )
    )
    application = result.scalar_one_or_none()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    await db.delete(application)

    event_result = await db.execute(select(Event).where(Event.id == event_id))
    event = event_result.scalar_one_or_none()
    if event:
        event.spots_left += 1
        if event.status == "full":
            event.status = "open"

    await db.commit()
    return {"message": "Application withdrawn"}

@router.get("/volunteers/{volunteer_id}/applications")
async def get_applications(volunteer_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Application).where(Application.volunteer_id == volunteer_id)
    )
    return result.scalars().all()

@router.put("/applications/{id}/status")
async def update_status(id: int, data: dict, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Application).where(Application.id == id))
    application = result.scalar_one_or_none()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    application.status = data["status"]
    await db.commit()
    return application