from app.datasource.user_profile_gateway import UserProfileGateway
from app.common.user_model import User

# import service class needed
# import gateway class needed

class UserProfileService():
    def __init__(self):
        pass

    def retrive_profile(self, db, userId):
        # retrive customer data
        return UserProfileGateway().retrive_profile(db, userId)

