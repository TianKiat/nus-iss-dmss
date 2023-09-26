from typing_extensions import override
from app.datasource.user_gateway import UserGateway
from app.common.user_model import User, Vendor, Login
import bcrypt

# import service class needed
# import gateway class needed

class UserService():
    def __init__(self):
        pass

    def login_user(self, db, user: Login):
        return UserGateway().auth(db, user)

class Register:
    def register(self):
        pass

class CustomerRegister(Register):
    @override
    def register(self, db, customer: User):
        response_dict = {
            'id': 0,
            'username': 0,
            'email': 0,
            'phone': 0 
        }
        # check for duplicate username
        users_data = UserGateway().retrieve_user_data(db)
        filtered_users = list(filter(lambda x: x.username.lower() == customer.username.lower(), users_data))
        if len(filtered_users) != 0:
            response_dict['username'] = 1
        # check for duplicate email
        customers_data = UserGateway().retrieve_customer_data(db)
        filtered_customers = list(filter(lambda x: x.email.lower() == customer.email.lower(), customers_data))
        if len(filtered_customers) != 0:
            response_dict['email'] = 1
        
        #check for duplicate phone
        filtered_phone = list(filter(lambda x: x.phone == customer.phone, customers_data))
        if len(filtered_phone) != 0:
            response_dict['phone'] = 1

        if len(filtered_users) == 0 and len(filtered_customers) == 0 and len(filtered_phone) == 0:
            # hash password
            hashed_password = bcrypt.hashpw(customer.password.encode('utf-8'), bcrypt.gensalt())
            customer.password = hashed_password
            user_id = UserGateway().register_customer_data(db, customer)
            response_dict['id'] = user_id

        return response_dict

class VendorRegister(Register):
    @override
    def register(self, db, vendor: Vendor):
        response_dict = {
            'id': 0,
            'username': 0,
            'email': 0,
            'phone': 0,
            'shopName': 0,
            'shopAddr': 0
        }
        # check for duplicate username
        users_data = UserGateway().retrieve_user_data(db)
        filtered_users = list(filter(lambda x: x.username.lower() == vendor.username.lower(), users_data))
        if len(filtered_users) != 0:
            response_dict['username'] = 1

        # check for duplicate email
        vendor_data = UserGateway().retrieve_vendor_data(db)
        filtered_vendor_email = list(filter(lambda x: x.email.lower() == vendor.email.lower(), vendor_data))
        if len(filtered_vendor_email) != 0:
            response_dict['email'] = 1

        #check for duplicate phone
        filtered_phone = list(filter(lambda x: x.phone == vendor.phone, vendor_data))
        if len(filtered_phone) != 0:
            response_dict['phone'] = 1

        # check for duplicate shop name
        filtered_vendor_shop_name = list(filter(lambda x: x.profileName.lower() == vendor.shopName.lower(), vendor_data))
        if len(filtered_vendor_shop_name) != 0:
            response_dict['shopName'] = 1

        filtered_vendor_shop_addr = list(filter(lambda x: x.address.lower() == vendor.shopAddr.lower(), vendor_data))
        if len(filtered_vendor_shop_addr) != 0:
            response_dict['shopAddr'] = 1

        if len(filtered_users) == 0 and len(filtered_vendor_email) == 0 and len(filtered_phone) == 0 \
            and len(filtered_vendor_shop_name) == 0 and len(filtered_vendor_shop_addr) == 0:
            
            # hash password
            hashed_password = bcrypt.hashpw(vendor.password.encode('utf-8'), bcrypt.gensalt())
            vendor.password = hashed_password

            user_id = UserGateway().register_vendor_data(db, vendor)
            response_dict['id'] = user_id

        return response_dict

class RegisterFactory:
    def create_register(self, role):
        if role == 2: # vendor
            return VendorRegister()
        elif role == 3: # customer
            return CustomerRegister()
        else:
            pass
