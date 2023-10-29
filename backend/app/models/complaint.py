from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from app.models import Base
from app.models.role import Role
from app.models.user import User

class Complaint(Base):
    __tablename__ = 'complaint'

    complaintID = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    description = Column(String(100), nullable=False)
    comment = Column(String(100), nullable=True)
    userID = Column(Integer, ForeignKey(User.userID), nullable=False)
    roleID = Column(Integer, ForeignKey(Role.roleID), nullable=False)
    status = Column(String(100), nullable=False)
    createdtime = Column(DateTime, nullable=False)