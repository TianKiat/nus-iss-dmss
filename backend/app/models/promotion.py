from sqlalchemy import Column, String, Integer, Double, Boolean, ForeignKey, UniqueConstraint
from app.models import Base
from app.models.vendor_profile import VendorProfile

class Promotion(Base):
    __tablename__ = "promotion"

    promotionID = Column(Integer, primary_key=True)
    promoCode = Column(String(16), nullable=False)
    discount = Column(Double, nullable=False)
    discountType = Column(String(16), nullable=False)
    minimumSpending = Column(Double, nullable=False)
    isValid = Column(Boolean, nullable=False)
    vendorProfileID = Column(Integer, ForeignKey(VendorProfile.vendorProfileID), nullable=False)

    __table_args__ = tuple(UniqueConstraint(promoCode, vendorProfileID))