from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from database import get_db
from models.task import Task, TaskChecklist, IncidentReport

router = APIRouter(tags=["Tasks"])

@router.get("/volunteers/{volunteer_id}/tasks")
async def get_tasks(volunteer_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Task).where(Task.volunteer_id == volunteer_id)
    )
    tasks = result.scalars().all()
    response = []
    for task in tasks:
        checklist = await db.execute(
            select(TaskChecklist).where(TaskChecklist.task_id == task.id)
        )
        response.append({
            "task": task,
            "checklist": checklist.scalars().all()
        })
    return response

@router.put("/tasks/{id}/status")
async def update_task_status(id: int, data: dict, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Task).where(Task.id == id))
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.status = data["status"]
    await db.commit()
    return task

@router.put("/tasks/{task_id}/checklist/{item_id}")
async def toggle_checklist(task_id: int, item_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(TaskChecklist).where(
            TaskChecklist.id == item_id,
            TaskChecklist.task_id == task_id
        )
    )
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Checklist item not found")
    item.is_done = not item.is_done
    await db.commit()
    return item

@router.post("/tasks/{task_id}/report")
async def submit_report(task_id: int, data: dict, db: AsyncSession = Depends(get_db)):
    from groq.prompts import summarize_incident
    
    raw = data["description"]
    groq_result = await summarize_incident(raw)

    import json
    try:
        parsed = json.loads(groq_result)
    except:
        parsed = {}

    report = IncidentReport(
        volunteer_id=data["volunteer_id"],
        task_id=task_id,
        raw_description=raw,
        groq_summary=parsed.get("summary"),
        groq_severity=parsed.get("severity"),
        groq_category=parsed.get("category"),
        groq_action=parsed.get("suggested_action")
    )
    db.add(report)
    await db.commit()
    await db.refresh(report)
    return report