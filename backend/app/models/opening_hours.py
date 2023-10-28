from sqlalchemy import Column, String, Integer, DateTime, BLOB, Boolean, ForeignKey, UniqueConstraint
from app.models import Base
from app.models.vendor_profile import VendorProfile

class OpeningHours(Base):
    __tablename__ = "openinghours"

    openingHoursID = Column(Integer, primary_key=True)
    vendorProfileID = Column(Integer, ForeignKey(VendorProfile.vendorProfileID))
    day = Column(Integer)
    openTime = Column(DateTime)
    closingtTime = Column(DateTime)
    isOpen = Column(Boolean)