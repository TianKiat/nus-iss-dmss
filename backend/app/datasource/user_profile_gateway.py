import bcrypt
from sqlalchemy.orm import Session
from app.models.user_profile import UserProfile
from app.models.user import User

class UserProfileGateway():
    def __init__():
        pass

    def get_user_profile_by_user(db: Session, userID: int):
        try:
            return db.query(UserProfile).filter(UserProfile.userID == userID).first()
        except Exception as e:
            print(f"Error: {e}")

    def get_user_data_by_user(db: Session, userID: int):
        try:
            return db.query(User).filter(User.userID == userID).first()
        except Exception as e:
            print(f"Error: {e}")

    def check_password(db: Session, userID: int, password: str):
        try:
            fetchedPassword = db.query(User).filter(User.userID == userID).first().userPassword.encode('utf-8')
            hashed_password = password.encode('utf-8')
            return bcrypt.checkpw(hashed_password,fetchedPassword)
            
        except Exception as e:
            print(f"Error: {e}")    

    def save_user_profile(db: Session, userData: UserProfile):
        try:
            print(userData)
            existing_user = db.query(UserProfile).filter(UserProfile.userProfileID == userData.userProfileID).first()
            if existing_user:
                existing_user.profileName = userData.profileName
                existing_user.phone = userData.phone
                existing_user.email = userData.email

            db.commit()
            return True
            
        except Exception as e:
            print(f"Error: {e}")    

    def save_username(db: Session, username: str, userID: int):
        try:
            existing_user = db.query(User).filter(User.userID == userID).first()
            if existing_user:
                existing_user.username = username

            db.commit()
            return True
            
        except Exception as e:
            print(f"Error: {e}")    
            