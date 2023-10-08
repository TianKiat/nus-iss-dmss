from app.models.user_profile import UserProfile
from sqlalchemy.orm import Session

class UserProfileGateway():
    def __init__(self):
        pass

    def retrive_profile(self, db: Session, userId):
        try:
            return db.query(UserProfile).filter(UserProfile.userID == userId).first()
        except RuntimeError as exception:
            print(f"Error: {exception}")
            