from sqlalchemy.orm import Session
from app.models.vendor_profile import VendorProfile

class VendorProfileGateway():
    def __init__():
        pass

    def get_all_vendor_profile(db: Session):
        try:
            return db.query(VendorProfile).all()
        except Exception as e:
            print(f"Error: {e}")

    def get_vendor_profile(db: Session, userID: int):
        try:
            return db.query(VendorProfile).filter(VendorProfile.userID == userID).first()
        except Exception as e:
            print(f"Error: {e}")