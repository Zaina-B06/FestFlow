from sqlalchemy import Column, Integer, String, Text, Enum, DateTime, Boolean
from sqlalchemy.sql import func
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id           = Column(Integer, primary_key=True, index=True)
    event_id     = Column(Integer, nullable=False)
    volunteer_id = Column(Integer, nullable=False)
    title        = Column(String(150), nullable=False)
    location     = Column(String(200), nullable=True)
    due_time     = Column(String(20), nullable=True)
    status       = Column(Enum("active", "pending", "upcoming", "done"), default="pending")
    notes        = Column(Text, nullable=True)
    created_at   = Column(DateTime, server_default=func.now())

class TaskChecklist(Base):
    __tablename__ = "task_checklist"

    id      = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, nullable=False)
    label   = Column(String(200), nullable=False)
    is_done = Column(Boolean, default=False)

class IncidentReport(Base):
    __tablename__ = "incident_reports"

    id              = Column(Integer, primary_key=True, index=True)
    volunteer_id    = Column(Integer, nullable=False)
    task_id         = Column(Integer, nullable=True)
    raw_description = Column(Text, nullable=False)
    groq_summary    = Column(Text, nullable=True)
    groq_severity   = Column(String(20), nullable=True)
    groq_category   = Column(String(100), nullable=True)
    groq_action     = Column(Text, nullable=True)
    created_at      = Column(DateTime, server_default=func.now())