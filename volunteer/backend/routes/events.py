from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models.event import Event, EventRole

router = APIRouter(prefix="/events", tags=["Events"])

@router.get("/")
async def get_events(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Event))
    events = result.scalars().all()
    return events

@router.get("/{id}")
async def get_event(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Event).where(Event.id == id))
    event = result.scalar_one_or_none()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    roles = await db.execute(select(EventRole).where(EventRole.event_id == id))
    return {
        "event": event,
        "roles": roles.scalars().all()
    }

@router.post("/")
async def create_event(data: dict, db: AsyncSession = Depends(get_db)):
    event = Event(**data)
    db.add(event)
    await db.commit()
    await db.refresh(event)
    return event

@router.put("/{id}")
async def update_event(id: int, data: dict, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Event).where(Event.id == id))
    event = result.scalar_one_or_none()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    for key, value in data.items():
        setattr(event, key, value)
    await db.commit()
    return event