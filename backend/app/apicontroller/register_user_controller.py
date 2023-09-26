from app.service.user_service import RegisterFactory

class RegisterUserController():
    def __init__(self):
        pass

    def register(self, db, user):
        service = RegisterFactory().create_register(user.role)
        return service.register(db, user)
    