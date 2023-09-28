from sqlalchemy.orm import Session
from app.models.vendor_profile import VendorProfile

class VendorProfileGateway():
    def __init__():
        pass

    def get_vendor_profile(db: Session, vendorProfileID: int):
        try:
            return db.query(VendorProfile).filter(VendorProfile.vendorProfileID == vendorProfileID).first()
        except Exception as e:
            print(f"Error: {e}")