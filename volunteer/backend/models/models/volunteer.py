from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.sql import func
from database import Base

class Volunteer(Base):
    __tablename__ = "volunteers"

    id            = Column(Integer, primary_key=True, index=True)
    name          = Column(String(100), nullable=False)
    email         = Column(String(100), unique=True, nullable=False)
    phone         = Column(String(20), nullable=False)
    role          = Column(String(50), default="volunteer")
    availability  = Column(Enum("active", "busy"), default="active")
    radio_channel = Column(String(20), default="CH-09")
    skills        = Column(String(500), default="[]")
    time_slot     = Column(String(50), default="9am-12pm")
    created_at    = Column(DateTime, server_default=func.now())