from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.types import BINARY
from app.models.roles import Role
from app.models.user_profiles import UserProfile
from app.models import Base

class User(Base):
    __tablename__ = 'users'

    userID = Column(BINARY(16), primary_key=True)
    username = Column(String(25), unique=True, nullable=False)
    userPassword = Column(String(50), nullable=False)
    roleID = Column(Integer, ForeignKey(Role.roleID), nullable=False)
    profileID = Column(BINARY(16), ForeignKey(UserProfile.profileID), nullable=False)