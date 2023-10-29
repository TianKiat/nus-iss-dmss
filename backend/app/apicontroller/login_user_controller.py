from app.service.user_service import UserService
from app.common.user_model import Login

class LoginUserController():
    def __init__(self):
        pass

    def login_user(self, db, user: Login):
        return UserService().login_user(db, user)