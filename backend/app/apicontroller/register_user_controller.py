from app.service.user_service import UserService

# import service class needed

class RegisterUserController():
    def __init__(self):
        pass

    def register_user(user_data):
        result = UserService.register_user(user_data)
        return result
