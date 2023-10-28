from app.datasource.vendor_profile_gateway import VendorProfileGateway

class VendorProfileService():
    def __init__(self):
        pass

    def get_all_vendor_profile(db):
        return VendorProfileGateway.get_all_vendor_profile(db)

    def get_vendor_profile(db, userId):
        return VendorProfileGateway.get_vendor_profile(db, userId)
    
    def save_vendor_profile(db, vendorData):
        return VendorProfileGateway.save_vendor_profile(db, vendorData)