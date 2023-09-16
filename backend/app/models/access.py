from sqlalchemy import Column, Integer, String, ForeignKey
from app.models import Base

class Access(Base):
    __tablename__ = 'access'

    accessID = Column(Integer, primary_key=True)
    accessName = Column(String(64), nullable=False)
    accessURL = Column(String(128), nullable=False)