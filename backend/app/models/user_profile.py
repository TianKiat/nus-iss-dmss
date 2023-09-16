from sqlalchemy import Column, String, Integer, CHAR, ForeignKey
from app.models import Base
from app.models.user import User

class UserProfile(Base):
    __tablename__ = 'user_profile'

    userProfileID = Column(Integer, primary_key=True)
    profileName = Column(String(100), nullable=False)
    email = Column(String(64), unique=True, nullable=False)
    phone = Column(CHAR(8), unique=True, nullable=False)
    userID = Column(Integer, ForeignKey(User.userID), unique=True, nullable=False)