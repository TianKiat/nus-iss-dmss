from app.service.user_service import BasicUserAuthenticator, AccessControlDecorator

from app.common.user_model import Login

class LoginUserController():
    # comment for demo
    def __init__(self):
        pass

    def login_user(self, db, user: Login):
        authenticator =  BasicUserAuthenticator()  
        # Wrap with access control decorator
        authenticator_with_access_control = AccessControlDecorator(authenticator)  
        # Authenticate the user, and access control information will be added
        user_data = authenticator_with_access_control.get_access_control_list(db, user)
        return user_data