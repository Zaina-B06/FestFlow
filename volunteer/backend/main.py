from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base

from models import volunteer, event, task, application, shift, notification

from routes.volunteers import router as volunteers_router
from routes.events import router as events_router
from routes.applications import router as applications_router
from routes.tasks import router as tasks_router
from routes.schedule import router as schedule_router
from routes.notifications import router as notifications_router
from whatsapp.webhook import router as webhook_router

app = FastAPI(title="FestFlow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(volunteers_router)
app.include_router(events_router)
app.include_router(applications_router)
app.include_router(tasks_router)
app.include_router(schedule_router)
app.include_router(notifications_router)
app.include_router(webhook_router)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/")
async def root():
    return {"message": "FestFlow API is running"}