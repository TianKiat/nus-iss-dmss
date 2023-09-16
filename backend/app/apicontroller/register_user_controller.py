from app.service.user_service import UserService
from app.common.user_model import Customer, Vendor

# import service class needed

class RegisterUserController():
    def __init__(self):
        pass

    def register_customer(self, db, customer: Customer):
        return UserService().register_customer(db, customer)
    
    def register_vendor(self, db, vendor: Vendor):
        return UserService().register_vendor(db, vendor)