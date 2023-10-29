from sqlalchemy import Column, Integer, String
from app.models import Base

class Otp(Base):
    __tablename__ = 'otp'

    otpID = Column(Integer, primary_key=True)
    otp = Column(String(255), nullable=False)
    email = Column(String(64), nullable=False)
