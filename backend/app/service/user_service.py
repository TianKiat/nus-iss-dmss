from os import getenv
from dotenv import load_dotenv
import smtplib
import random
import string
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import bcrypt
from typing_extensions import override
from app.datasource.user_gateway import UserGateway
from app.common.user_model import User, Vendor, Login
from app.service.access_control_service import AccessControlService

# Get parameters from env file
load_dotenv()
OTP_EMAIL = getenv('OTP_EMAIL')
OTP_EMAIL_PASSWORD = getenv('OTP_EMAIL_PASSWORD')

class UserService():
    def __init__(self):
        pass

    def generate_otp(self, length):
        characters = string.digits
        otp = ''.join(random.choice(characters) for _ in range(length))
        return otp

    def send_otp_email(self, otp, email):
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587
        smtp_username = OTP_EMAIL
        smtp_password = OTP_EMAIL_PASSWORD

        subject = 'Your OTP Code'
        body = f'Your OTP code is: {otp}'

        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))
        message = msg.as_string()

        try:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(smtp_username, email, message)
            server.quit()
            return True
        except Exception as e:
            print(f'Error: {e}')

    def generate_otp_email(self, db, data):
        otp = self.generate_otp(6)
        print(otp)
        if self.send_otp_email(otp, data.email):
            # save otp and email to db for check
            hashed_otp = bcrypt.hashpw(otp.encode('utf-8'), bcrypt.gensalt())
            UserGateway().modify_otp_data(db, hashed_otp, data.email)
            return {"otp": 1}
        return {"otp": 0}

    def verify_otp(self, db, otp, email):
        # retrieve
        otps_data = UserGateway().retrieve_otp_data(db)
        filtered_otp = next(filter(lambda x: x.email.lower() == email.lower(), otps_data))
        valid_otp = bcrypt.checkpw(otp.encode('utf-8'), filtered_otp.otp.encode("utf-8"))
        if valid_otp:
            return True
        return False

    def update_user_is_disabled(self, db, user_id, is_disabled):
        return UserGateway().update_user_is_disabled(db, user_id, is_disabled)
    
    def retrieve_user_control(self, db):
        total = UserGateway().retrieve_user_details(db)
        total_count = 0
        customer_count = 0
        vendor_count = 0
        if total == None:
            total = []
        else:
            for item in total:
                if item['roleID'] == 2:
                    vendor_count = vendor_count + 1
                if item['roleID'] == 3:
                    customer_count = customer_count + 1
                total_count = total_count + 1
                
        #customer = UserGateway().retrieve_customer_data(db)
        #vendor = UserGateway().retrieve_vendor_data(db)
        try:
            # total_user = len(total)
            # total_customer = len(customer)
            # total_vendor = len(vendor)
            return {"total":total_count,"customer":customer_count,"vendor":vendor_count,"user_list":total}
        except():
            return {"total":0,"customer":0,"vendor":0,"user_list":total}
        
        
    
    def retrieve_user_control_by_id(self, db, userID):
        return UserGateway().retrieve_user_control_by_id(db, userID)

    
class UserAuthenticator:
    def authenticate(self):
        pass

class BasicUserAuthenticator(UserAuthenticator):
    def authenticate(self, db, user):
        auth_user = UserGateway().auth(db, user)
        return auth_user
    
class AccessControlDecorator(UserAuthenticator):
    def __init__(self, component):
        self.component = component

    def get_access_control_list(self, db, user):
        auth_user = self.component.authenticate(db, user)
        if auth_user:
            access_control_list = AccessControlService().get_access_control_list(db,auth_user['roleID'])
            auth_user["access"] = access_control_list
        return auth_user

class Register:
    def register(self):
        pass

class CustomerRegister(Register):
    @override
    def register(self, db, customer: User):
        # hash password
        hashed_password = bcrypt.hashpw(customer.password.encode('utf-8'), bcrypt.gensalt())
        customer.password = hashed_password
        user_id = UserGateway().register_customer_data(db, customer)
        return {"id": user_id}

class VendorRegister(Register):
    @override
    def register(self, db, vendor: Vendor):
        # hash password
        hashed_password = bcrypt.hashpw(vendor.password.encode('utf-8'), bcrypt.gensalt())
        vendor.password = hashed_password
        user_id = UserGateway().register_vendor_data(db, vendor)
        return {"id": user_id}

class RegisterFactory:
    def create_register(self, role):
        if role == 2: # vendor
            return VendorRegister()
        if role == 3: # customer
            return CustomerRegister()


class ValidateFieldsOTP:
    def validate_fields_otp(self):
        pass

class CustomerValidateFieldsOTP(ValidateFieldsOTP):
    @override
    def validate_fields_otp(self, db, customer: User):
        response_dict = {}
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

        if response_dict:
            response_dict['otp'] = 0

        return response_dict

class VendorValidateFieldsOTP(ValidateFieldsOTP):
    @override
    def validate_fields_otp(self, db, vendor: Vendor):
        response_dict = {}
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

        if response_dict:
            response_dict['otp'] = 0

        return response_dict

class ValidateFieldOTPFactory:
    def create_validate(self, role):
        if role == 2: # vendor
            return VendorValidateFieldsOTP()
        if role == 3: # customer
            return CustomerValidateFieldsOTP()
