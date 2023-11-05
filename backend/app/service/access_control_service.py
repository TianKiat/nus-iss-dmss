from app.datasource.access_control_gateway import AccessControlGateway

class AccessControlService():
    def __init__(self):
        pass
    
    def get_access_control(self, db, roleID):
        return AccessControlGateway().get_access_control(db, roleID)
    
    def get_access_control_list(self, db, roleID):
        return AccessControlGateway().get_access_control_list(db, roleID)
    
    def update_access_list(self, db, roleID, access_list):
        original_list = AccessControlGateway().get_access_control_list(db,roleID)
        add_list = []
        remove_list = []

        add_list = access_list.copy()
        remove_list = original_list.copy()

        for access_id in remove_list:
            AccessControlGateway().delete_access_control(db,roleID, access_id)

        for new_access_id in add_list:
            AccessControlGateway().insert_access_control(db,roleID, new_access_id)

        return {"status":"completed"}