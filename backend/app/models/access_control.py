from sqlalchemy import Column, Integer, ForeignKey
from app.models import Base
from app.models.access import Access
from app.models.role import Role

class AccessControl(Base):
    __tablename__ = 'access_control'

    accessControlID = Column(Integer, primary_key=True)
    accessID = Column(Integer, ForeignKey(Access.accessID), nullable=False)
    roleID = Column(Integer, ForeignKey(Role.roleID), nullable=False)