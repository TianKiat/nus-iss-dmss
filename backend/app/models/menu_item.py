from sqlalchemy import Column, String, Integer, Double, BLOB, Boolean, ForeignKey, UniqueConstraint
from app.models import Base
from app.models.vendor_profile import VendorProfile

class MenuItem(Base):
    __tablename__ = "menuitem"

    menuItemID = Column(Integer, primary_key=True)
    menuItemName = Column(String(50), nullable=False)
    price = Column(Double, nullable=False)
    menuItemImage = Column(String(500), nullable=True)
    menuItemDesc = Column(String(250), nullable=True)
    isValid = Column(Boolean, nullable=False)
    vendorProfileID = Column(Integer, ForeignKey(VendorProfile.vendorProfileID))

    __table_args__ = tuple(UniqueConstraint(menuItemName, vendorProfileID))