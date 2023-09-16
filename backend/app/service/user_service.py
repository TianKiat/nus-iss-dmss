from app.datasource.user_gateway import UserGateway
from app.common.user_model import Customer, Vendor

# import service class needed
# import gateway class needed

class UserService():
    def __init__(self):
        pass

    def register_customer(self, db, customer: Customer):
        # validate customer data
        return UserGateway().insert_customer_data(db, customer)

    def register_vendor(self, db, vendor: Vendor):
        #validate vendor data
        return UserGateway().insert_vendor_data(db, vendor)

    def login_user(self, user_data):
        return True
