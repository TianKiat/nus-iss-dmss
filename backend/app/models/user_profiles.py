from sqlalchemy import Column, String
from sqlalchemy.types import BINARY
from app.models import Base

class UserProfile(Base):
    __tablename__ = 'user_profiles'

    profileID = Column(BINARY(16), primary_key=True)
    profileName = Column(String(100), nullable=False)