from app.datasource.vendor_profile_gateway import VendorProfileGateway

class VendorProfileService():
    def __init__(self):
        pass

    def get_vendor_profile(db, vendorProfileID):
        return VendorProfileGateway.get_vendor_profile(db, vendorProfileID)