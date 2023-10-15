from app.datasource.user_profile_gateway import UserProfileGateway

class UserProfileService():
    def __init__(self):
        pass

    def get_user_profile_by_user(db, userID):
        return UserProfileGateway.get_user_profile_by_user(db, userID)
    
    def get_user_name_by_user(db, userID):
        return UserProfileGateway.get_user_name_by_user(db, userID)
    