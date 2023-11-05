import uuid, bcrypt
from sqlalchemy.orm import Session
from app.common.user_model import User, Vendor, Login
from app.models import user, user_profile, vendor_profile, otp
from sqlalchemy import update

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

    def retrieve_otp_data(self, db: Session):
        try:
            return db.query(otp.Otp).all()
        except Exception as e:
            print(f"Error: {e}")

    def modify_otp_data(self, db: Session, otp2, email):
        try:
            data_to_update = db.query(otp.Otp).filter(otp.Otp.email == email).first()
            if data_to_update:
                data_to_update.otp = otp2
            else:
                otp_data = {
                    'otp': otp2,
                    'email': email
                }
                otp_table = otp.Otp(**otp_data)
                db.add(otp_table)
            db.commit()
        except Exception as e:
            print(f"Error: {e}")

    def register_customer_data(self, db: Session, customer: User):
        try:
            user_data = {
                'username': customer.username,
                'userPassword': customer.password,
                'roleID': customer.role,
                'isDisabled': 0
            }
            user_table = user.User(**user_data)
            db.add(user_table)
            db.commit()

            user_id_object = db.query(user.User).filter(user.User.username == user_data['username']).first()

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

    def register_vendor_data(self, db: Session, vendor: Vendor):
        try:
            user_data = {
                'username': vendor.username,
                'userPassword': vendor.password,
                'roleID': vendor.role,
                'isDisabled': 0
            }
            user_table = user.User(**user_data)
            db.add(user_table)
            db.commit()

            user_id_object = db.query(user.User).filter(user.User.username == user_data['username']).first()
            if user_id_object:
                user_id = user_id_object.userID

            vendor_profile_data = {
                'profileName': vendor.shopName,
                'address': vendor.shopAddr,
                'email': vendor.email,
                'phone': vendor.phone,
                'status': vendor.status,
                'userID': user_id,
                'shopDesc':vendor.shopDesc
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
            checkpw = False

            user_object = db.query(user.User).filter(user.User.isDisabled==False,user.User.username == login.username).first()
            if user_object:
                checkpw = bcrypt.checkpw(login.password.encode('utf-8'), (user_object.userPassword).encode('utf-8'))

            if user_object and checkpw:
                if str(user_object.roleID) == '2': #vendor_profile
                    user_profile_object = db.query(vendor_profile.VendorProfile).filter(vendor_profile.VendorProfile.userID == user_object.userID).first()
                else:
                    user_profile_object = db.query(user_profile.UserProfile).filter(user_profile.UserProfile.userID == user_object.userID).first()
                
                user_session_data['userID'] = user_object.userID
                user_session_data['roleID'] = user_object.roleID
                user_session_data['profileName'] = user_profile_object.profileName
                print ('Logged In UserID: {0} | roleID: {1}'.format(user_session_data['userID'], user_session_data['roleID']))
            else:
                print ("Login failed.")

            return user_session_data

        except Exception as e:
            print(f"Error: {e}")

    def update_user_is_disabled(self, db: Session, user_id: int, is_disabled: int):
        db.execute(update(user.User).where(user.User.userID == user_id).values(isDisabled = is_disabled))
        db.commit()
        result = db.query(user.User).filter(user.User.userID == user_id).first()
        status = ""
        if result:
            status = result.isDisabled
            
        return {'status': status}
        
    def retrieve_user_details(self, db: Session):
        try:
            user_list = []
            result = db.query(user.User).all()
            if result:
                for items in result:
                    temp_list = {}
                    temp_list['userID'] = items.userID
                    temp_list['username'] = items.username
                    temp_list['roleID'] = items.roleID
                    temp_list['isDisabled'] = items.isDisabled
                    user_list.append(temp_list)
            return user_list


        except Exception as e:
            print(f"Error: {e}")

    def retrieve_user_control_by_id(self, db:Session, userID: int):
        try:
            result = db.query(user.User).filter(user.User.userID == userID).first()
            if result:
                temp_list = {}
                temp_list['userID'] = result.userID
                temp_list['username'] = result.username
                temp_list['roleID'] = result.roleID
                temp_list['isDisabled'] = result.isDisabled
                return temp_list 

        except Exception as e:
            print(f"Error: {e}")