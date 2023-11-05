from app.service.user_service import UserService

class UpdateUserStatusController():
    def __init__(self):
        pass

    def update_user_is_disabled(self, db, user_id, is_disabled):
        return UserService().update_user_is_disabled(db, user_id, is_disabled)