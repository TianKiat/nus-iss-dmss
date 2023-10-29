from app.datasource.access_control_gateway import AccessControlGateway

class AccessControlService():
    def __init__(self):
        pass
    
    def get_access_control(db, roleID):
        return AccessControlGateway.get_access_control(db, roleID)
    
    def get_access_control_list(db, roleID):
        return AccessControlGateway.get_access_control_list(db, roleID)