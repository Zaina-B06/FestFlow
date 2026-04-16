from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from database import get_db
from models.volunteer import Volunteer, VolunteerSkill
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/volunteers", tags=["Volunteers"])

class ProfileUpdate(BaseModel):
    availability: Optional[str] = None
    skills: Optional[str] = None

@router.get("/{id}/profile")
async def get_profile(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Volunteer).where(Volunteer.id == id))
    volunteer = result.scalar_one_or_none()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
        
    skills_res = await db.execute(select(VolunteerSkill).where(VolunteerSkill.volunteer_id == id))
    skills_rec = skills_res.scalar_one_or_none()
    
    # We serialize the full profile
    return {
        "id": volunteer.id,
        "name": volunteer.name,
        "email": volunteer.email,
        "phone": volunteer.phone,
        "role": volunteer.role,
        "availability": volunteer.availability,
        "radio_channel": volunteer.radio_channel,
        "skills": skills_rec.skills if skills_rec else "[]"
    }

@router.put("/{id}/profile")
async def update_profile(id: int, profile_update: ProfileUpdate, db: AsyncSession = Depends(get_db)):
    if profile_update.availability is not None:
        await db.execute(update(Volunteer).where(Volunteer.id == id).values(availability=profile_update.availability))
        
    if profile_update.skills is not None:
        skills_res = await db.execute(select(VolunteerSkill).where(VolunteerSkill.volunteer_id == id))
        if skills_res.scalar_one_or_none():
            await db.execute(update(VolunteerSkill).where(VolunteerSkill.volunteer_id == id).values(skills=profile_update.skills))
        else:
            db.add(VolunteerSkill(volunteer_id=id, skills=profile_update.skills))
            
    await db.commit()
    return {"message": "Profile updated successfully"}

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