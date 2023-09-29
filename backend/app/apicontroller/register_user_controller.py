from app.service.user_service import RegisterFactory, ValidateFieldOTPFactory, UserService

class RegisterUserController():
    def __init__(self):
        pass

    def validate_fields_otp(self, db, data):
        service = ValidateFieldOTPFactory().create_validate(data.role)
        validate_val = service.validate_fields_otp(db, data)
        if validate_val:
            return validate_val
        return UserService().generate_otp_email(db, data)

    def register(self, db, user):
        verify_otp = UserService().verify_otp(db, user.otp, user.email)
        if verify_otp:
            service = RegisterFactory().create_register(user.role)
            return service.register(db, user)
        return {'id': -1}
    