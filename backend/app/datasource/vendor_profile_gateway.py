from sqlalchemy.orm import Session
from app.models.vendor_profile import VendorProfile

class VendorProfileGateway():
    def __init__():
        pass

    def get_all_vendor_profile(db: Session):
        try:
            return db.query(VendorProfile).filter(VendorProfile.status).all()
        except Exception as e:
            print(f"Error: {e}")

    def get_vendor_profile(db: Session, userID: int):
        try:
            return db.query(VendorProfile).filter(VendorProfile.userID == userID).first()
        except Exception as e:
            print(f"Error: {e}")

    def get_vendor_profile_by_profile_ID(db: Session, vendorProfileID: int):
        try:
            return db.query(VendorProfile).filter(VendorProfile.vendorProfileID == vendorProfileID).first()
        except Exception as e:
            print(f"Error: {e}")

    def save_vendor_profile(db: Session, vendorData: VendorProfile):
        try:
            print(vendorData)
            existing_user = db.query(VendorProfile).filter(VendorProfile.vendorProfileID == vendorData.vendorProfileID).first()
            if existing_user:
                existing_user.profileName = vendorData.profileName
                existing_user.address = vendorData.address
                existing_user.email = vendorData.email
                existing_user.phone = vendorData.phone
                existing_user.shopDesc = vendorData.shopDesc

            db.commit()
            return True
            
        except Exception as e:
            print(f"Error: {e}")    