from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from database import get_db
from models.volunteer import Volunteer

router = APIRouter(prefix="/volunteers", tags=["Volunteers"])

@router.get("/{id}/profile")
async def get_profile(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Volunteer).where(Volunteer.id == id))
    volunteer = result.scalar_one_or_none()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    return volunteer

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

    tasks = await db.execute(
        select(Task).where(Task.volunteer_id == id, Task.status == "done")
    )
    done_tasks = len(tasks.scalars().all())

    shifts = await db.execute(
        select(Shift).where(Shift.volunteer_id == id, Shift.status == "done")
    )
    done_shifts = shifts.scalars().all()
    hours = sum(
        (s.end_time - s.start_time).seconds // 3600
        for s in done_shifts
    )

    impact_score = (done_tasks * 10) + (hours * 2)

    return {
        "tasks_completed": done_tasks,
        "hours_volunteered": hours,
        "shifts_completed": len(done_shifts),
        "impact_score": impact_score
    }