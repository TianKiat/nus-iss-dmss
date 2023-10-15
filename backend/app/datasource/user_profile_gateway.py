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

    def get_user_name_by_user(db: Session, userID: int):
        try:
            return db.query(User).filter(User.userID == userID).first().username
        except Exception as e:
            print(f"Error: {e}")
    