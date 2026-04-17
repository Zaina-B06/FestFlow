from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models.organizer import Organizer

router = APIRouter(prefix="/organizers", tags=["Organizers"])

@router.get("/")
async def get_all(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Organizer))
    return result.scalars().all()

@router.get("/{id}")
async def get_organizer(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Organizer).where(Organizer.id == id))
    org = result.scalar_one_or_none()
    if not org:
        raise HTTPException(status_code=404, detail="Organizer not found")
    return org