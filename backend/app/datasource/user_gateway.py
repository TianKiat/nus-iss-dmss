from mysql.connector import Error
from sqlalchemy.orm import Session
from app.common.user_model import Customer, Vendor
from app.models import user, user_profile, vendor_profile

class UserGateway():
    def __init__(self):
        pass
    
    def insert_customer_data(self, db: Session, customer: Customer):
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

            return {"id" : user_id}
        
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

            return {"id" : user_id}
        
        except Exception as e:
            print(f"Error: {e}")      
        