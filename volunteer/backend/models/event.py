from sqlalchemy import Column, Integer, String, Text, Date, Enum, DateTime
from sqlalchemy.sql import func
from database import Base

class Event(Base):
    __tablename__ = "events"

    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String(150), nullable=False)
    date        = Column(Date, nullable=False)
    location    = Column(String(200), nullable=False)
    category    = Column(String(50), nullable=False)
    description = Column(Text)
    total_spots = Column(Integer, nullable=False)
    spots_left  = Column(Integer, nullable=False)
    status      = Column(Enum("open", "full", "closed"), default="open")
    created_by  = Column(Integer, nullable=True)
    created_at  = Column(DateTime, server_default=func.now())

class EventRole(Base):
    __tablename__ = "event_roles"

    id              = Column(Integer, primary_key=True, index=True)
    event_id        = Column(Integer, nullable=False)
    role_name       = Column(String(100), nullable=False)
    spots_available = Column(Integer, nullable=False)