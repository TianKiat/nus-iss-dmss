from sqlalchemy import Column, String, Integer, DateTime, Double, Boolean, ForeignKey
from app.models import Base
from app.models.user_profile import UserProfile
from app.models.vendor_profile import VendorProfile

class Invoice(Base):
    __tablename__ = "invoice"

    invoiceID = Column(Integer, primary_key=True)
    date = Column(DateTime, nullable=False)
    totalPrice = Column(Double, nullable=False)
    discount = Column(Double, nullable=False)
    status = Column(String(16), nullable=False)
    isFavorite = Column(Boolean, nullable=False)
    customerProfileID = Column(Integer, ForeignKey(UserProfile.userProfileID), nullable=False)
    vendorProfileID = Column(Integer, ForeignKey(VendorProfile.vendorProfileID), nullable=False)