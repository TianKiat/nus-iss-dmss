from sqlalchemy.orm import Session
from app.service.user_profile_service import UserProfileService

# import service class needed

class UserProfileController():
    def __init__(self):
        pass

    def get_user_profile(self, db: Session, userId: str):
        return UserProfileService.get_user_profile_by_user(db, userId)
    
    def get_user_name(self, db: Session, userId: str):
        return UserProfileService.get_user_name_by_user(db, userId)
    
