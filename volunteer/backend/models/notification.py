from sqlalchemy import Column, Integer, String, Text, Boolean, Enum, DateTime
from sqlalchemy.sql import func
from database import Base

class Notification(Base):
    __tablename__ = "notifications"

    id           = Column(Integer, primary_key=True, index=True)
    volunteer_id = Column(Integer, nullable=False)
    type         = Column(Enum("emergency", "alert", "info", "success", "weather"), default="info")
    title        = Column(String(200), nullable=False)
    body         = Column(Text, nullable=False)
    is_read      = Column(Boolean, default=False)
    wa_sent      = Column(Boolean, default=False)
    created_at   = Column(DateTime, server_default=func.now())