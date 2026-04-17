from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from database import get_db
from models.volunteer import Volunteer

router = APIRouter(prefix="/volunteers", tags=["Volunteers"])

@router.get("/")
async def get_all_volunteers(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Volunteer))
    return result.scalars().all()

@router.get("/applications")
async def get_applications_by_event(event_id: int, db: AsyncSession = Depends(get_db)):
    from models.application import Application
    result = await db.execute(
        select(Application).where(Application.event_id == event_id)
    )
    return result.scalars().all()

@router.get("/{id}/profile")
async def get_profile(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Volunteer).where(Volunteer.id == id))
    volunteer = result.scalar_one_or_none()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    return {
        "id":           volunteer.id,
        "name":         volunteer.name,
        "email":        volunteer.email,
        "phone":        volunteer.phone,
        "role":         volunteer.role,
        "availability": volunteer.availability,
        "radio_channel":volunteer.radio_channel,
        "skills":       volunteer.skills or "[]",
        "time_slot":    volunteer.time_slot or "",
        "created_at":   volunteer.created_at,
    }

@router.put("/{id}/profile")
async def update_profile(id: int, data: dict, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Volunteer).where(Volunteer.id == id))
    volunteer = result.scalar_one_or_none()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    if "skills"       in data: volunteer.skills       = data["skills"]
    if "time_slot"    in data: volunteer.time_slot    = data["time_slot"]
    if "name"         in data: volunteer.name         = data["name"]
    if "phone"        in data: volunteer.phone        = data["phone"]
    if "availability" in data: volunteer.availability = data["availability"]
    await db.commit()
    await db.refresh(volunteer)
    return {
        "id":           volunteer.id,
        "name":         volunteer.name,
        "email":        volunteer.email,
        "phone":        volunteer.phone,
        "role":         volunteer.role,
        "availability": volunteer.availability,
        "radio_channel":volunteer.radio_channel,
        "skills":       volunteer.skills or "[]",
        "time_slot":    volunteer.time_slot or "",
    }

@router.put("/{id}/availability")
async def update_availability(id: int, status: str, db: AsyncSession = Depends(get_db)):
    await db.execute(
        update(Volunteer).where(Volunteer.id == id).values(availability=status)
    )
    await db.commit()
    return {"message": "Availability updated"}

@router.get("/{id}/stats")
async def get_stats(id: int, db: AsyncSession = Depends(get_db)):
    from models.task import Task
    from models.shift import Shift

    tasks_result = await db.execute(
        select(Task).where(Task.volunteer_id == id, Task.status == "done")
    )
    done_tasks = len(tasks_result.scalars().all())

    shifts_result = await db.execute(
        select(Shift).where(Shift.volunteer_id == id, Shift.status == "done")
    )
    done_shifts = shifts_result.scalars().all()
    hours = sum(
        (s.end_time - s.start_time).seconds // 3600
        for s in done_shifts
    )
    impact_score = (done_tasks * 10) + (hours * 2)

    return {
        "tasks_completed":  done_tasks,
        "hours_volunteered": hours,
        "shifts_completed": len(done_shifts),
        "impact_score":     impact_score,
    }