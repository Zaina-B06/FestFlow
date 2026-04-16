from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.sql import func
from database import Base

class Application(Base):
    __tablename__ = "applications"

    id              = Column(Integer, primary_key=True, index=True)
    volunteer_id    = Column(Integer, nullable=False)
    event_id        = Column(Integer, nullable=False)
    role_preference = Column(String(100), nullable=True)
    status          = Column(Enum("pending", "confirmed", "rejected"), default="pending")
    applied_at      = Column(DateTime, server_default=func.now())
    updated_at      = Column(DateTime, onupdate=func.now())