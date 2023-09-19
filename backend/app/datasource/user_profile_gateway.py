from app.common.user_model import User
class UserProfileGateway():
    def __init__(self):
        pass

    def retrive_profile(self):
        new_user = User(
            name="John Doe",
            username="johndoe",
            password="secure_password",
            email="johndoe@example.com",
            phone="123-456-7890",
            role=1  # Set the role as needed
        )
        
        return new_user
    