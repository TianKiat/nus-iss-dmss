from app.datasource.user_profile_gateway import UserProfileGateway

class UserProfileService():
    def __init__(self):
        pass

    def get_user_profile_by_user(db, userID):
        return UserProfileGateway.get_user_profile_by_user(db, userID)
    
    def get_user_data_by_user(db, userID):
        return UserProfileGateway.get_user_data_by_user(db, userID)
    
    def check_password(db, userID, password):
        return UserProfileGateway.check_password(db, userID, password)
    
    def save_user_profile(db, userData):
        return UserProfileGateway.save_user_profile(db, userData)
    
    def save_username(db, username, userID):
        return UserProfileGateway.save_username(db, username, userID)
    
    