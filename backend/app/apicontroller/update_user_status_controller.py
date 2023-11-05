from app.service.user_service import UserService

class UpdateUserStatusController():
    def __init__(self):
        pass

    def update_user_is_disabled(self, db, user_id, is_disabled):
        return UserService().update_user_is_disabled(db, user_id, is_disabled)
    
    def retrieve_user_control(self, db):
        return UserService().retrieve_user_control(db)
    
    def retrieve_user_control_by_id(self, db, userID):
        return UserService().retrieve_user_control_by_id(db, userID)