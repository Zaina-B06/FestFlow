from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class Organizer(Base):
    __tablename__ = "organizers"

    id           = Column(Integer, primary_key=True, index=True)
    name         = Column(String(100), nullable=False)
    email        = Column(String(100), unique=True, nullable=False)
    phone        = Column(String(20), nullable=True)
    organisation = Column(String(200), nullable=True)
    role         = Column(String(100), default="organizer")
    created_at   = Column(DateTime, server_default=func.now())