from app.common.user_model import UserProfile
from app.service.user_profile_service import UserProfileService

# import service class needed

class UserProfileController():
    def __init__(self):
        pass

    def get_user_profile(self, db, userId: str):
        return UserProfileService.get_user_profile_by_user(db, userId)
    
    def get_user_data(self, db, userId: str):
        return UserProfileService.get_user_data_by_user(db, userId)
    
    def check_password(self, db, userId: str, password: str):
        return UserProfileService.check_password(db, userId, password)

    def save_user_profile(self, db, userData: UserProfile):
        return UserProfileService.save_user_profile(db, userData)
    
    def save_username(self, db, username: str, userID: str):
        return UserProfileService.save_username(db, username, userID)