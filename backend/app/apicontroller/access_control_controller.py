from app.service.access_control_service import AccessControlService
from app.service.access_service import AccessService

class AccessControlContoller():
    def __init__(self):
        pass

    def get_access_control(self, db, roleID):
        accessControl = AccessControlService().get_access_control(db, roleID)
        if accessControl is None:
            return []
        access = []
        for acl in accessControl:
            access.append(AccessService.get_access(db, acl.accessID))
        return access

    def get_full_access_list(self, db):
        return AccessService.get_full_access_list(db)

    def get_access_control_by_role(self, db, roleID):
        return AccessControlService().get_access_control_list(db, roleID)

    def update_access_list(self, db, roleID, access_list):
        return AccessControlService().update_access_list(db, roleID, access_list)
    