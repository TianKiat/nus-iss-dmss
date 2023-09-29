from app.service.user_profile_service import UserProfileService

# import service class needed

class UserProfileController():
    def __init__(self):
        pass

    def get_user_profile(self, db, userId: str):
        return UserProfileService.retrive_profile(self, db, userId)
