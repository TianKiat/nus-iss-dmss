from app.datasource.vendor_profile_gateway import VendorProfileGateway

class VendorProfileService():
    def __init__(self):
        pass

    def get_all_vendor_profile(db):
        return VendorProfileGateway.get_all_vendor_profile(db)

    def get_vendor_profile(db, userID):
        return VendorProfileGateway.get_vendor_profile(db, userID)
    
    def get_vendor_profile_by_profile_ID(db, vendorProfileID):
        return VendorProfileGateway.get_vendor_profile_by_profile_ID(db, vendorProfileID)
    
    def save_vendor_profile(db, vendorData):
        return VendorProfileGateway.save_vendor_profile(db, vendorData)
    