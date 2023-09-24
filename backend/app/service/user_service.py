from app.datasource.user_gateway import UserGateway
from app.common.user_model import User, Vendor, Login
import bcrypt

# import service class needed
# import gateway class needed

class UserService():
    def __init__(self):
        pass

    def register_customer(self, db, customer: User):
        response_dict = {
            'id': 0,
            'username': 0,
            'email': 0
        }
        # check for duplicate username
        users_data = UserGateway().retrieve_user_data(db)
        filtered_users = list(filter(lambda x: x.username == customer.username, users_data))
        if len(filtered_users) != 0:
            response_dict['username']  = 1
        # check for duplicate email
        customers_data = UserGateway().retrieve_customer_data(db)
        filtered_customers = list(filter(lambda x: x.email == customer.email, customers_data))
        if len(filtered_customers) != 0:
            response_dict['email']  = 1

        if len(filtered_users) == 0 and len(filtered_customers) == 0:
            # hash password
            hashed_password = bcrypt.hashpw(customer.password.encode('utf-8'), bcrypt.gensalt())
            customer.password = hashed_password
            # if customer data validated, hash password, save to db
            user_id = UserGateway().insert_customer_data(db, customer)
            response_dict['id'] = user_id

        return response_dict

    def register_vendor(self, db, vendor: Vendor):
        response_dict = {
            'id': 0,
            'username': 0,
            'email': 0
        }
        # check for duplicate username
        users_data = UserGateway().retrieve_user_data(db)
        filtered_users = list(filter(lambda x: x.username == vendor.username, users_data))
        if len(filtered_users) != 0:
            response_dict['username']  = 1
        # check for duplicate email
        vendor_data = UserGateway().retrieve_vendor_data(db)
        filtered_vendor = list(filter(lambda x: x.email == vendor.email, vendor_data))
        if len(filtered_vendor) != 0:
            response_dict['email']  = 1

        if len(filtered_users) == 0 and len(filtered_vendor) == 0:
            # hash password
            hashed_password = bcrypt.hashpw(vendor.password.encode('utf-8'), bcrypt.gensalt())
            vendor.password = hashed_password
            # if vendor data validated, hash password, save to db
            user_id = UserGateway().insert_vendor_data(db, vendor)
            response_dict['id'] = user_id

        return response_dict


    def login_user(self, db, user: Login):
        return UserGateway().auth(db, user)
