from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models.shift import Shift
from datetime import date

router = APIRouter(tags=["Schedule"])

@router.get("/volunteers/{volunteer_id}/schedule")
async def get_schedule(volunteer_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Shift).where(Shift.volunteer_id == volunteer_id)
    )
    return result.scalars().all()

@router.get("/volunteers/{volunteer_id}/schedule/today")
async def get_today(volunteer_id: int, db: AsyncSession = Depends(get_db)):
    today = date.today()
    result = await db.execute(
        select(Shift).where(
            Shift.volunteer_id == volunteer_id,
            Shift.start_time >= f"{today} 00:00:00",
            Shift.start_time <= f"{today} 23:59:59"
        )
    )
    return result.scalars().all()