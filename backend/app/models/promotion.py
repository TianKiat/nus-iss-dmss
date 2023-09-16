from sqlalchemy import Column, String, Integer, Double, Boolean
from app.models import Base

class Promotion(Base):
    __tablename__ = "promotion"

    promotionID = Column(Integer, primary_key=True)
    promoCode = Column(String(16), unique=True, nullable=False)
    discount = Column(Double, nullable=False)
    minimumSpending = Column(Double, nullable=False)
    isValid = Column(Boolean, nullable=False)