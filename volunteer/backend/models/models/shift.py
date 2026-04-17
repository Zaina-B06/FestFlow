from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.sql import func
from database import Base

class Shift(Base):
    __tablename__ = "shifts"

    id           = Column(Integer, primary_key=True, index=True)
    volunteer_id = Column(Integer, nullable=False)
    event_id     = Column(Integer, nullable=False)
    title        = Column(String(150), nullable=False)
    zone         = Column(String(100), nullable=True)
    start_time   = Column(DateTime, nullable=False)
    end_time     = Column(DateTime, nullable=False)
    status       = Column(Enum("active", "upcoming", "done", "break"), default="upcoming")