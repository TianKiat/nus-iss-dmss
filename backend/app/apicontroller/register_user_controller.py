from app.service.user_service import RegisterFactory, UserService

class RegisterUserController():
    def __init__(self):
        pass

    def register(self, db, user):
        service = RegisterFactory().create_register(user.role)
        return service.register(db, user)
    
    def generate_otp(self, db, email):
        return UserService().generate_otp_email(db, email)
    
    def verify_otp(self, db, otp, email):
        return UserService().verify_otp(db, otp, email)
    
    def delete_record(self, db, id):
        return UserService().delete_record(db, id)
    