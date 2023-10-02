import uuid
import mysql.connector
from sqlalchemy.orm import Session
from app.common.user_model import User, Vendor, Login
from app.models import user, user_profile, vendor_profile
from app.common.constants import DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE

sqldb = mysql.connector.connect(host = DB_HOST, user = DB_USERNAME, password = DB_PASSWORD, database = DB_DATABASE)

class UserGateway():
    def __init__(self):
        pass

    def retrieve_user_data(self, db: Session):
        try:
            return db.query(user.User).all()
        except Exception as e:
            print(f"Error: {e}")

    def retrieve_customer_data(self, db: Session):
        try:
            return db.query(user_profile.UserProfile).all()
        except Exception as e:
            print(f"Error: {e}")

    def retrieve_vendor_data(self, db: Session):
        try:
            return db.query(vendor_profile.VendorProfile).all()
        except Exception as e:
            print(f"Error: {e}")

    def insert_customer_data(self, db: Session, customer: User):
        try:
            user_data = {
                'username': customer.username,
                'userPassword': customer.password,
                'roleID': customer.role
            }
            user_table = user.User(**user_data)
            db.add(user_table)
            db.commit()

            user_id_object = db.query(user.User).filter(user.User.username == customer.username).first()

            if user_id_object:
                user_id = user_id_object.userID

            user_profile_data = {
                'profileName': customer.name,
                'email': customer.email,
                'phone': customer.phone,
                'userID': user_id
            }
            user_profile_table = user_profile.UserProfile(**user_profile_data)
            db.add(user_profile_table)
            db.commit()

            return user_id

        except Exception as e:
            print(f"Error: {e}")

    def insert_vendor_data(self, db: Session, vendor: Vendor):
        try:
            user_data = {
                'username': vendor.username,
                'userPassword': vendor.password,
                'roleID': vendor.role
            }
            user_table = user.User(**user_data)
            db.add(user_table)
            db.commit()

            user_id_object = db.query(user.User).filter(user.User.username == vendor.username).first()
            if user_id_object:
                user_id = user_id_object.userID

            vendor_profile_data = {
                'profileName': vendor.name,
                'address': vendor.address,
                'email': vendor.email,
                'phone': vendor.phone,
                'status': vendor.status,
                'userID': user_id
            }
            vendor_profile_table = vendor_profile.VendorProfile(**vendor_profile_data)
            db.add(vendor_profile_table)
            db.commit()

            return user_id

        except Exception as e:
            print(f"Error: {e}")

    # login authentication
    def auth(self, db: Session, login: Login):
        try:
            user_session_data = {}

            user_object = db.query(user.User).filter(user.User.username == login.username)\
                                             .filter(user.User.userPassword == login.password).first()
            if user_object:
                if str(user_object.roleID) == '2': #vendor_profile
                    user_profile_object = db.query(vendor_profile.VendorProfile).filter(vendor_profile.VendorProfile.userID == user_object.userID).first()
                else:
                    user_profile_object = db.query(user_profile.UserProfile).filter(user_profile.UserProfile.userID == user_object.userID).first()
                
                user_session_data['userID'] = user_object.userID
                user_session_data['roleID'] = user_object.roleID
                user_session_data['profileName'] = user_profile_object.profileName
                print ('Logged In UserID: {0} | roleID: {1}'.format(user_session_data['userID'], user_session_data['roleID']))

            return user_session_data

        except Exception as e:
            print(f"Error: {e}")
